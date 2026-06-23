import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  if (databaseNotConfigured()) {
    return databaseErrorResponse();
  }

  try {
    const intake = await prisma.intakeSubmission.findUnique({
      where: { id: params.id },
      include: { matter: true }
    });

    if (!intake) {
      return NextResponse.json({ success: false, message: 'Intake submission not found.' }, { status: 404 });
    }

    if (intake.matter) {
      return NextResponse.json(
        {
          success: false,
          message: 'This intake has already been converted into a matter. Decline is not available for opened matters.'
        },
        { status: 400 }
      );
    }

    const updated = await prisma.$transaction(async (tx: any) => {
      const record = await tx.intakeSubmission.update({
        where: { id: intake.id },
        data: { status: 'DECLINED' }
      });

      await tx.auditLog.create({
        data: {
          action: 'DECLINE_INTAKE',
          entityType: 'IntakeSubmission',
          entityId: intake.id,
          metadata: {
            referenceNumber: intake.referenceNumber,
            status: 'DECLINED'
          }
        }
      });

      return record;
    });

    return NextResponse.json({ success: true, status: updated.status, intakeId: updated.id });
  } catch (error) {
    console.error('Decline intake failed', error);
    return NextResponse.json({ success: false, message: 'Decline decision failed.' }, { status: 500 });
  }
}
