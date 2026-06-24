import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOtpCode, hashOtpCode, maskContactValue, normaliseContactValue } from '@/lib/otp';
import { sendOtpCode } from '@/lib/otp-delivery';

export const dynamic = 'force-dynamic';

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

function clientSessionNotConfigured() {
  return !process.env.CLIENT_SESSION_SECRET;
}

function genericDenied() {
  return NextResponse.json({ success: false, message: 'Matter access could not be verified.' }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (databaseNotConfigured()) {
    return NextResponse.json({ success: false, message: 'Database is not configured.' }, { status: 503 });
  }

  if (clientSessionNotConfigured()) {
    return NextResponse.json({ success: false, message: 'Client session secret is not configured.' }, { status: 500 });
  }

  try {
    const body = (await request.json()) as { matterCode?: string; contactValue?: string };
    const matterCode = (body.matterCode ?? '').trim().toUpperCase();
    const contactValue = normaliseContactValue(body.contactValue);

    if (!matterCode || !contactValue) {
      return NextResponse.json({ success: false, message: 'Matter code and registered contact detail are required.' }, { status: 400 });
    }

    const matter = await prisma.matter.findUnique({
      where: { matterCode },
      include: { intakeSubmission: true }
    });

    if (!matter || !matter.intakeSubmission) {
      return genericDenied();
    }

    const emailMatch = normaliseContactValue(matter.intakeSubmission.email) === contactValue;
    const phoneMatch = normaliseContactValue(matter.intakeSubmission.phone) === contactValue;

    if (!emailMatch && !phoneMatch) {
      return genericDenied();
    }

    const recentWindow = new Date(Date.now() - 60 * 1000);
    const recentChallenge = await (prisma as any).clientOtpChallenge.findFirst({
      where: {
        matterId: matter.id,
        contactValue,
        createdAt: { gte: recentWindow },
        usedAt: null
      },
      orderBy: { createdAt: 'desc' }
    });

    if (recentChallenge) {
      return NextResponse.json({
        success: false,
        message: 'An access code was recently requested. Please wait briefly before requesting another code.',
        maskedContact: maskContactValue(contactValue)
      }, { status: 429 });
    }

    const code = generateOtpCode();
    const otpHash = await hashOtpCode(code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const challenge = await (prisma as any).clientOtpChallenge.create({
      data: {
        matterId: matter.id,
        matterCode: matter.matterCode,
        contactValue,
        otpHash,
        expiresAt,
        ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
        userAgent: request.headers.get('user-agent') ?? null
      }
    });

    const delivery = await sendOtpCode({ contactValue, code, matterCode: matter.matterCode });

    if (!delivery.success) {
      await (prisma as any).clientOtpChallenge.delete({ where: { id: challenge.id } }).catch(() => undefined);
      return NextResponse.json({
        success: false,
        message: delivery.message,
        maskedContact: maskContactValue(contactValue)
      }, { status: 503 });
    }

    return NextResponse.json({
      success: true,
      challengeId: challenge.id,
      maskedContact: maskContactValue(contactValue),
      expiresInMinutes: 10,
      message: 'If the details match our records, an access code has been sent.'
    });
  } catch (error) {
    console.error('Client OTP request failed', error);
    return NextResponse.json({ success: false, message: 'Matter access could not be verified.' }, { status: 500 });
  }
}
