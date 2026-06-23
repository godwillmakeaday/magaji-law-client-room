import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateIntakeReference } from '@/lib/reference-number';

export const dynamic = 'force-dynamic';

const requiredConsentFields = [
  'consentAccepted',
  'aiNoticeAccepted',
  'privacyNoticeAccepted',
  'noClientRelationshipAccepted'
] as const;

const legalDocumentSlugs = [
  'preliminary-intake-notice',
  'no-lawyer-client-relationship',
  'consent-to-review',
  'conflict-check-disclosure',
  'ai-assisted-organisation',
  'privacy-data-protection'
];

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

function databaseErrorResponse(status = 503) {
  return NextResponse.json(
    {
      success: false,
      demoMode: true,
      message: 'Database is not configured. Add DATABASE_URL and run Prisma setup.'
    },
    { status }
  );
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function asBoolean(value: unknown) {
  return value === true || value === 'true';
}

function splitNames(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter(Boolean);
  }

  return asString(value)
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

type ConflictPartyInput = { name: string; role?: string; notes?: string };

function buildConflictParties(body: Record<string, unknown>): ConflictPartyInput[] {
  const explicit = Array.isArray(body.conflictParties) ? body.conflictParties : [];
  const fromExplicit: ConflictPartyInput[] = explicit.reduce<ConflictPartyInput[]>((parties, item) => {
    if (typeof item === 'string') {
      const name = asString(item);
      if (name) parties.push({ name, role: 'Related party' });
      return parties;
    }

    if (item && typeof item === 'object') {
      const record = item as Record<string, unknown>;
      const name = asString(record.name);
      if (name) {
        parties.push({
          name,
          role: asString(record.role) || 'Related party',
          notes: asString(record.notes) || undefined
        });
      }
    }

    return parties;
  }, []);

  const fromOpposing: ConflictPartyInput[] = splitNames(body.opposingParties).map((name) => ({ name, role: 'Opposing party' }));
  const fromWitnesses: ConflictPartyInput[] = splitNames(body.witnesses).map((name) => ({ name, role: 'Witness or related person' }));
  const institutions: ConflictPartyInput[] = [body.institution, body.policeStation, body.courtAgency]
    .map((item) => asString(item))
    .filter(Boolean)
    .map((name) => ({ name, role: 'Institution / agency' }));

  const merged: ConflictPartyInput[] = [...fromExplicit, ...fromOpposing, ...fromWitnesses, ...institutions];
  const seen = new Set<string>();

  return merged.filter((item) => {
    const key = `${item.name.toLowerCase()}::${item.role?.toLowerCase() ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function intakeSummary(record: any) {
  return {
    id: record.id,
    referenceNumber: record.referenceNumber,
    fullName: record.fullName,
    phone: record.phone,
    email: record.email,
    location: record.location,
    matterType: record.matterType,
    urgency: record.urgency,
    status: record.status,
    submittedAt: record.submittedAt,
    conflictPartyCount: record._count?.conflictParties ?? record.conflictParties?.length ?? 0,
    narration: record.narration
  };
}

export async function POST(request: NextRequest) {
  if (databaseNotConfigured()) {
    return databaseErrorResponse();
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const fullName = asString(body.fullName);
    const phone = asString(body.phone);
    const matterType = asString(body.matterType);
    const urgency = asString(body.urgency);

    const missing = [
      ['fullName', fullName],
      ['phone', phone],
      ['matterType', matterType],
      ['urgency', urgency]
    ]
      .filter(([, value]) => !value)
      .map(([field]) => field);

    const rejectedConsents = requiredConsentFields.filter((field) => !asBoolean(body[field]));

    if (missing.length || rejectedConsents.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'Required intake fields or legal consents are missing.',
          missing,
          rejectedConsents
        },
        { status: 400 }
      );
    }

    const referenceNumber = generateIntakeReference();
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const userAgent = request.headers.get('user-agent') ?? undefined;
    const conflictParties = buildConflictParties(body);

    const intake = await prisma.intakeSubmission.create({
      data: {
        referenceNumber,
        fullName,
        phone,
        email: asString(body.email) || null,
        location: asString(body.location) || null,
        matterType,
        narration: asString(body.narration) || null,
        urgency,
        preferredContactMethod: asString(body.preferredContactMethod) || null,
        consentAccepted: true,
        aiNoticeAccepted: true,
        privacyNoticeAccepted: true,
        noClientRelationshipAccepted: true,
        conflictParties: {
          create: conflictParties.map((party) => ({
            name: party.name,
            role: party.role,
            notes: party.notes
          }))
        },
        legalDocumentAcceptances: {
          create: legalDocumentSlugs.map((documentSlug) => ({
            documentSlug,
            ipAddress,
            userAgent
          }))
        }
      },
      include: {
        _count: { select: { conflictParties: true } }
      }
    });

    await prisma.auditLog.create({
      data: {
        action: 'INTAKE_SUBMITTED',
        entityType: 'IntakeSubmission',
        entityId: intake.id,
        metadata: {
          referenceNumber: intake.referenceNumber,
          matterType: intake.matterType,
          urgency: intake.urgency,
          conflictPartyCount: intake._count.conflictParties
        }
      }
    });

    return NextResponse.json({
      success: true,
      id: intake.id,
      referenceNumber: intake.referenceNumber,
      status: intake.status
    });
  } catch (error) {
    console.error('Intake POST failed', error);
    return databaseErrorResponse(500);
  }
}

export async function GET(request: NextRequest) {
  if (databaseNotConfigured()) {
    return databaseErrorResponse();
  }

  try {
    const status = request.nextUrl.searchParams.get('status');
    const where = status ? { status: status as any } : {};

    const records = await prisma.intakeSubmission.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      take: 50,
      include: {
        _count: { select: { conflictParties: true } }
      }
    });

    return NextResponse.json({
      success: true,
      intakes: records.map(intakeSummary)
    });
  } catch (error) {
    console.error('Intake GET failed', error);
    return databaseErrorResponse(500);
  }
}
