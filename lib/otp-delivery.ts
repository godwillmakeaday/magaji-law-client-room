type SendOtpArgs = {
  contactValue: string;
  code: string;
  matterCode: string;
};

export async function sendOtpCode({ contactValue, code, matterCode }: SendOtpArgs) {
  const mode = process.env.OTP_DELIVERY_MODE ?? 'disabled';

  if (mode === 'disabled') {
    return {
      success: false,
      message: 'OTP delivery is not configured.'
    };
  }

  if (mode === 'dev' && process.env.NODE_ENV !== 'production') {
    console.log(`[Magaji Law Client Room] OTP for ${matterCode} to ${contactValue}: ${code}`);
    return {
      success: true,
      message: 'Development OTP logged on the server.'
    };
  }

  if (mode === 'email-placeholder') {
    // Provider integration placeholder. A real email/SMS provider should be connected
    // before this is relied on for live client access. Do not expose OTP in responses.
    return {
      success: true,
      message: 'OTP delivery provider integration is pending.'
    };
  }

  return {
    success: false,
    message: 'OTP delivery mode is not supported.'
  };
}
