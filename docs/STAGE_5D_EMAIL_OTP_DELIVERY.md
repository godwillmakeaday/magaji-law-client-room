# Stage 5D-Delivery — Email OTP Delivery

This stage connects the Existing Client Room OTP flow to real email delivery through Resend.

## Purpose

Stage 5D created the OTP challenge and secure client session structure. This delivery stage allows an accepted client with a registered email address to receive a one-time access code by email, verify it, and enter the protected matter dashboard.

## Required environment variables

Set these in Vercel Production environment variables:

```txt
RESEND_API_KEY=your-resend-api-key
OTP_FROM_EMAIL=Magaji Law <office@your-verified-domain.com>
OTP_DELIVERY_MODE=resend
```

`RESEND_API_KEY` must never be committed to the repository. `OTP_FROM_EMAIL` should use a verified sender or verified domain.

## Flow

1. Client enters matter code and registered contact.
2. If the contact matches the accepted matter record and is an email address, the server generates a 6-digit OTP.
3. The OTP is hashed and stored in the database.
4. The raw OTP is sent by email and is never returned to the browser in production.
5. The client submits the OTP.
6. On success, the server creates a secure HttpOnly client session cookie.
7. The dashboard returns only safe matter-status data.

## Security rules

- OTP is never returned to the browser in production.
- OTP is stored hashed, not plain text.
- OTP expires after 10 minutes.
- Wrong attempts remain limited.
- The email contains no sensitive matter narration, parties, evidence, legal acceptances, or admin notes.
- The matter dashboard remains limited to matter code, title, type, status, and action notices.

## Phone/SMS limitation

SMS delivery is not active in this stage. Phone-only clients should use their registered email or contact the office. A future SMS delivery stage can add Twilio, Termii, Sendchamp, or another provider.

## Production warning

Do not rely on client OTP access in production until your sending domain is verified, email deliverability is tested, and office staff understand that matter-code access is only a limited status bridge.
