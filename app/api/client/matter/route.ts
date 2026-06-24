import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CLIENT_COOKIE_NAME, verifyClientSessionToken } from '@/lib/client-auth';

export const dynamic = 'force-dynamic';

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

export async function GET(request: NextRequest) {
  if (databaseNotConfigured()) {
    return NextResponse.json({ success: false, message: 'Database is not configured.' }, { status: 503 });
  }

  const session = await verifyClientSessionToken(request.cookies.get(CLIENT_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Client authentication required.' }, { status: 401 });
  }

  try {
    const matter = await prisma.matter.findUnique({
      where: { id: session.matterId },
      include: { intakeSubmission: true }
    });

    if (!matter || matter.matterCode !== session.matterCode) {
      return NextResponse.json({ success: false, message: 'Matter session could not be verified.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      matter: {
        matterCode: matter.matterCode,
        title: matter.title,
        matterType: matter.matterType,
        status: matter.status,
        nextOfficeAction: 'Office review and engagement confirmation will be communicated directly.',
        clientActionRequired: 'Monitor office requests and provide further documents only when requested by the office.',
        createdAt: matter.createdAt,
        acceptedAt: matter.createdAt
      }
    });
  } catch (error) {
    console.error('Client matter lookup failed', error);
    return NextResponse.json({ success: false, message: 'Matter could not be loaded.' }, { status: 500 });
  }
}
