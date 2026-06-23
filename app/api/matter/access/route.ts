import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function normalise(value: string | null | undefined) {
  return (value ?? '').toLowerCase().replace(/\s+/g, '').trim();
}

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

export async function POST(request: NextRequest) {
  if (databaseNotConfigured()) {
    return NextResponse.json({ success: false, message: 'Database is not configured.' }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { matterCode?: string; contactVerification?: string };
    const matterCode = (body.matterCode ?? '').trim().toUpperCase();
    const contactVerification = normalise(body.contactVerification);

    if (!matterCode || !contactVerification) {
      return NextResponse.json({ success: false, message: 'Matter code and registered contact detail are required.' }, { status: 400 });
    }

    const matter = await prisma.matter.findUnique({
      where: { matterCode },
      include: { intakeSubmission: true }
    });

    if (!matter || !matter.intakeSubmission) {
      return NextResponse.json({ success: false, message: 'Matter access could not be verified.' }, { status: 401 });
    }

    const emailMatch = normalise(matter.intakeSubmission.email) === contactVerification;
    const phoneMatch = normalise(matter.intakeSubmission.phone) === contactVerification;

    if (!emailMatch && !phoneMatch) {
      return NextResponse.json({ success: false, message: 'Matter access could not be verified.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      matter: {
        matterCode: matter.matterCode,
        title: matter.title,
        matterType: matter.matterType,
        status: matter.status,
        nextOfficeAction: 'Office review and engagement confirmation will be communicated directly.',
        clientActionRequired: 'Monitor office requests and provide further documents only when requested.',
        createdAt: matter.createdAt
      }
    });
  } catch (error) {
    console.error('Matter access failed', error);
    return NextResponse.json({ success: false, message: 'Matter access failed.' }, { status: 500 });
  }
}
