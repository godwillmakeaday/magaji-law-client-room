import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const allowedStatuses = new Set([
  'CONFLICT_CHECK_PENDING',
  'CLARIFICATION_REQUESTED',
  'CONSULTATION_REQUIRED',
  'ENGAGEMENT_PENDING'
]);

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

function databaseErrorResponse(status = 503) {
  return NextResponse.json(
    {
      success: false,
      message: 'Database is not configured. Add DATABASE_URL and run Prisma setup.'
    },
    { status }
  );
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (databaseNotConfigured()) {
    return databaseErrorResponse();
  }

  try {
    const body = (await request.json()) as {
      decision?: string;
      notes?: string;
      nextOfficeAction?: string;
      clientActionRequired?: string;
    };

    if (!body.decision || !allowedStatuses.has(body.decision)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid decision.',
          allowedDecisions: Array.from(allowedStatuses)
        },
        { status: 400 }
      );
    }

    const updated = await prisma.$transaction(async (tx: any) => {
      const intake = await tx.intakeSubmission.update({
        where: { id: params.id },
        data: { status: body.decision as any }
      });

      await tx.auditLog.create({
        data: {
          action: 'UPDATE_INTAKE_DECISION',
          entityType: 'IntakeSubmission',
          entityId: intake.id,
          metadata: {
            referenceNumber: intake.referenceNumber,
            status: intake.status,
            notes: body.notes ?? null,
            nextOfficeAction: body.nextOfficeAction ?? null,
            clientActionRequired: body.clientActionRequired ?? null
          }
        }
      });

      return intake;
    });

    return NextResponse.json({ success: true, intake: updated });
  } catch (error) {
    console.error('Decision update failed', error);
    return NextResponse.json({ success: false, message: 'Decision update failed.' }, { status: 500 });
  }
}
