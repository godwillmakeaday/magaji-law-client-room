import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

export async function GET(_request: NextRequest) {
  if (databaseNotConfigured()) {
    return NextResponse.json({ success: false, matters: [], message: 'Database is not configured.' }, { status: 503 });
  }

  try {
    const matters = await prisma.matter.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        intakeSubmission: {
          select: {
            id: true,
            referenceNumber: true,
            fullName: true,
            phone: true,
            email: true,
            matterType: true,
            urgency: true,
            status: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, matters });
  } catch (error) {
    console.error('Matter list failed', error);
    return NextResponse.json({ success: false, matters: [], message: 'Matter list failed.' }, { status: 500 });
  }
}
