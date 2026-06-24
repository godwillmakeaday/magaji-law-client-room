import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CLIENT_COOKIE_NAME, createClientSessionToken, getClientSessionMaxAge } from '@/lib/client-auth';
import { verifyOtpCode } from '@/lib/otp';

export const dynamic = 'force-dynamic';

function databaseNotConfigured() {
  return !process.env.DATABASE_URL;
}

export async function POST(request: NextRequest) {
  if (databaseNotConfigured()) {
    return NextResponse.json({ success: false, message: 'Database is not configured.' }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { challengeId?: string; otpCode?: string };
    const challengeId = (body.challengeId ?? '').trim();
    const otpCode = (body.otpCode ?? '').trim();

    if (!challengeId || !/^\d{6}$/.test(otpCode)) {
      return NextResponse.json({ success: false, message: 'Enter the 6-digit access code.' }, { status: 400 });
    }

    const challenge = await (prisma as any).clientOtpChallenge.findUnique({
      where: { id: challengeId },
      include: {
        matter: {
          include: { intakeSubmission: true }
        }
      }
    });

    if (!challenge) {
      return NextResponse.json({ success: false, message: 'Access code could not be verified.' }, { status: 404 });
    }

    if (challenge.usedAt) {
      return NextResponse.json({ success: false, message: 'This access code has already been used.' }, { status: 400 });
    }

    if (challenge.expiresAt < new Date()) {
      return NextResponse.json({ success: false, message: 'This access code has expired. Request a new code.' }, { status: 400 });
    }

    if (challenge.attempts >= challenge.maxAttempts) {
      return NextResponse.json({ success: false, message: 'Too many incorrect attempts. Request a new code.' }, { status: 429 });
    }

    const verified = await verifyOtpCode(otpCode, challenge.otpHash);

    if (!verified) {
      await (prisma as any).clientOtpChallenge.update({
        where: { id: challenge.id },
        data: { attempts: { increment: 1 } }
      });
      return NextResponse.json({ success: false, message: 'Invalid access code.' }, { status: 401 });
    }

    await (prisma as any).clientOtpChallenge.update({
      where: { id: challenge.id },
      data: { usedAt: new Date() }
    });

    const token = await createClientSessionToken({
      matterId: challenge.matter.id,
      matterCode: challenge.matter.matterCode,
      clientDisplayName: challenge.matter.intakeSubmission?.fullName ?? null
    });

    const response = NextResponse.json({ success: true, redirectTo: '/client-room/existing/dashboard' });
    response.cookies.set({
      name: CLIENT_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: getClientSessionMaxAge()
    });

    return response;
  } catch (error) {
    console.error('Client OTP verification failed', error);
    const message = error instanceof Error && error.message.includes('Client session secret')
      ? 'Client session secret is not configured.'
      : 'Access code could not be verified.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
