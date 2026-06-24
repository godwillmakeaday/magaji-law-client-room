import { isEmailContact, isPhoneContact, maskContactValue } from './otp';

type SendOtpArgs = {
  contactValue: string;
  code: string;
  matterCode: string;
};

type SendOtpResult = {
  success: boolean;
  message: string;
};

function officeSignature() {
  return [
    'Magaji Law Client Room',
    'Office Review and Matter Access Desk',
    'This code is for limited matter-status access only.'
  ].join('\n');
}

function buildOtpEmailText({ code, matterCode }: { code: string; matterCode: string }) {
  return [
    'Your Magaji Law Client Room access code is:',
    '',
    code,
    '',
    `Matter code: ${matterCode}`,
    '',
    'This code expires in 10 minutes. Do not share it with anyone.',
    'This access is limited to matter-status viewing. Formal legal advice, filing steps, commitments, and deadlines must be confirmed by the office.',
    '',
    officeSignature()
  ].join('\n');
}

function buildOtpEmailHtml({ code, matterCode }: { code: string; matterCode: string }) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;margin:0 auto;padding:24px;">
      <p style="font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#8a6a2f;font-weight:700;">Magaji Law Client Room</p>
      <h1 style="font-size:24px;margin:8px 0 16px;">Your matter access code</h1>
      <p>Use the code below to enter your limited matter-status dashboard.</p>
      <div style="font-size:32px;font-weight:800;letter-spacing:0.35em;background:#f7f1e8;border:1px solid #e4d8c4;border-radius:16px;padding:18px 24px;text-align:center;margin:22px 0;">${code}</div>
      <p><strong>Matter code:</strong> ${matterCode}</p>
      <p>This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
      <p>This access is limited to matter-status viewing. Formal legal advice, filing steps, commitments, and deadlines must be confirmed by the office.</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
      <p style="font-size:13px;color:#64748b;">${officeSignature().replace(/\n/g, '<br />')}</p>
    </div>
  `;
}

async function sendWithResend({ contactValue, code, matterCode }: SendOtpArgs): Promise<SendOtpResult> {
  if (!isEmailContact(contactValue)) {
    if (isPhoneContact(contactValue)) {
      return {
        success: false,
        message: 'SMS OTP delivery is not configured yet. Use registered email or contact the office.'
      };
    }

    return {
      success: false,
      message: 'Use the registered email address or contact the office.'
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.OTP_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      success: false,
      message: 'Email OTP delivery is not configured.'
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [contactValue],
        subject: 'Your Magaji Law Client Room access code',
        text: buildOtpEmailText({ code, matterCode }),
        html: buildOtpEmailHtml({ code, matterCode })
      })
    });

    if (!response.ok) {
      let providerMessage = '';
      try {
        const data = await response.json();
        providerMessage = data?.message ? String(data.message) : '';
      } catch {
        providerMessage = await response.text().catch(() => '');
      }

      console.error('Resend OTP delivery failed', {
        status: response.status,
        contact: maskContactValue(contactValue),
        providerMessage: providerMessage.slice(0, 240)
      });

      return {
        success: false,
        message: 'Access code could not be sent. Contact the office or try again later.'
      };
    }

    return {
      success: true,
      message: 'If the details match our records, an access code has been sent.'
    };
  } catch (error) {
    console.error('Resend OTP delivery error', {
      contact: maskContactValue(contactValue),
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    return {
      success: false,
      message: 'Access code could not be sent. Contact the office or try again later.'
    };
  }
}

export async function sendOtpCode({ contactValue, code, matterCode }: SendOtpArgs): Promise<SendOtpResult> {
  const mode = process.env.OTP_DELIVERY_MODE ?? 'disabled';

  if (mode === 'disabled') {
    return {
      success: false,
      message: 'OTP delivery is not configured.'
    };
  }

  if (mode === 'dev' && process.env.NODE_ENV !== 'production') {
    console.log(`[Magaji Law Client Room] OTP for ${matterCode} to ${maskContactValue(contactValue)}: ${code}`);
    return {
      success: true,
      message: 'Development OTP logged on the server.'
    };
  }

  if (mode === 'email-placeholder') {
    return {
      success: true,
      message: 'If the details match our records, an access code has been sent.'
    };
  }

  if (mode === 'resend') {
    return sendWithResend({ contactValue, code, matterCode });
  }

  return {
    success: false,
    message: 'OTP delivery mode is not supported.'
  };
}
