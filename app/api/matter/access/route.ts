import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: false,
    message: 'Direct matter-code access has been replaced by OTP-backed client access. Use /api/client/request-otp.'
  }, { status: 410 });
}
