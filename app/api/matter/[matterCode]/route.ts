import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

export async function GET(_request: NextRequest, { params }: { params: { matterCode: string } }) {
  if (databaseNotConfigured()) {
    return NextResponse.json({ success: false, message: 'Database is not configured.' }, { status: 503 });
  }

  try {
    const matter = await prisma.matter.findUnique({
      where: { matterCode: params.matterCode.toUpperCase() },
      include: {
        intakeSubmission: {
          include: {
            conflictParties: true,
            legalDocumentAcceptances: true
          }
        }
      }
    });

    if (!matter) {
      return NextResponse.json({ success: false, message: 'Matter not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, matter });
  } catch (error) {
    console.error('Matter GET failed', error);
    return NextResponse.json({ success: false, message: 'Matter lookup failed.' }, { status: 500 });
  }
}
