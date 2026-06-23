import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const allowedStatuses = new Set([
  'CONFLICT_CHECK_PENDING',
  'CLARIFICATION_REQUESTED',
  'CONSULTATION_REQUIRED',
  'DECLINED',
  'ENGAGEMENT_PENDING',
  'ACCEPTED'
]);

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

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (databaseNotConfigured()) {
    return databaseErrorResponse();
  }

  try {
    const intake = await prisma.intakeSubmission.findUnique({
      where: { id: params.id },
      include: {
        conflictParties: true,
        legalDocumentAcceptances: true,
        matter: true
      }
    });

    if (!intake) {
      return NextResponse.json({ success: false, message: 'Intake submission not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, intake });
  } catch (error) {
    console.error('Single intake GET failed', error);
    return databaseErrorResponse(500);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (databaseNotConfigured()) {
    return databaseErrorResponse();
  }

  try {
    const body = (await request.json()) as { status?: string };
    const nextStatus = body.status;

    if (!nextStatus || !allowedStatuses.has(nextStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid status update.',
          allowedStatuses: Array.from(allowedStatuses)
        },
        { status: 400 }
      );
    }

    const intake = await prisma.intakeSubmission.update({
      where: { id: params.id },
      data: { status: nextStatus as any }
    });

    await prisma.auditLog.create({
      data: {
        action: 'INTAKE_STATUS_UPDATED',
        entityType: 'IntakeSubmission',
        entityId: intake.id,
        metadata: {
          referenceNumber: intake.referenceNumber,
          status: intake.status
        }
      }
    });

    return NextResponse.json({ success: true, intake });
  } catch (error) {
    console.error('Single intake PATCH failed', error);
    return databaseErrorResponse(500);
  }
}
