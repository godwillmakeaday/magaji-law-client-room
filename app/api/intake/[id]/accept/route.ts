import { NextRequest, NextResponse } from 'next/server';
import { generateMatterCode } from '@/lib/matter-code';
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

async function createUniqueMatterCode(matterType: string) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const matterCode = generateMatterCode(matterType);
    const existing = await prisma.matter.findUnique({ where: { matterCode } });
    if (!existing) return matterCode;
  }

  throw new Error('Unable to generate a unique matter code.');
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
          message: 'This intake has already been converted into a matter.',
          matterId: intake.matter.id,
          matterCode: intake.matter.matterCode,
          status: intake.matter.status
        },
        { status: 400 }
      );
    }

    const matterCode = await createUniqueMatterCode(intake.matterType);
    const title = `${intake.matterType} — ${intake.fullName}`;

    const matter = await prisma.$transaction(async (tx: any) => {
      const createdMatter = await tx.matter.create({
        data: {
          matterCode,
          intakeSubmissionId: intake.id,
          title,
          matterType: intake.matterType,
          status: 'MATTER_CODE_ISSUED'
        }
      });

      await tx.intakeSubmission.update({
        where: { id: intake.id },
        data: { status: 'ACCEPTED' }
      });

      await tx.auditLog.create({
        data: {
          action: 'ACCEPT_INTAKE_CREATE_MATTER',
          entityType: 'Matter',
          entityId: createdMatter.id,
          metadata: {
            intakeSubmissionId: intake.id,
            referenceNumber: intake.referenceNumber,
            matterCode: createdMatter.matterCode,
            matterType: createdMatter.matterType
          }
        }
      });

      return createdMatter;
    });

    return NextResponse.json({
      success: true,
      matter: {
        id: matter.id,
        matterCode: matter.matterCode,
        status: matter.status,
        title: matter.title,
        matterType: matter.matterType,
        createdAt: matter.createdAt
      }
    });
  } catch (error) {
    console.error('Accept intake failed', error);
    return NextResponse.json({ success: false, message: 'Matter acceptance failed.' }, { status: 500 });
  }
}
