# Stage 5D — Client OTP Authentication and Secure Matter Access

Stage 5D upgrades the Existing Client Room from a simple matter-code lookup into an OTP-backed access flow with a secure server session.

## Why matter code alone is not enough

A matter code can be copied, forwarded, photographed, or guessed. It should identify a matter, but it should not be the only key to the matter room. Stage 5D requires both:

1. the office-issued matter code; and
2. the registered contact detail attached to the matter; and
3. a one-time access code; and
4. a secure HttpOnly client session.

## Access flow

1. Accepted matter already exists with a matter code.
2. Client opens `/client-room/existing`.
3. Client enters matter code and registered phone/email.
4. `POST /api/client/request-otp` verifies the match and creates an OTP challenge.
5. OTP is hashed before storage and expires after 10 minutes.
6. Client submits the 6-digit code to `POST /api/client/verify-otp`.
7. On success, the server creates a signed HttpOnly cookie valid for 4 hours.
8. `/client-room/existing/dashboard` fetches limited matter data from `GET /api/client/matter`.
9. Client can sign out through `POST /api/client/logout`.

## Required environment variables

```env
CLIENT_SESSION_SECRET="generate-a-long-random-secret"
OTP_DELIVERY_MODE="disabled"
EMAIL_FROM=""
EMAIL_PROVIDER_API_KEY=""
```

`CLIENT_SESSION_SECRET` is required for signed client sessions.

## OTP delivery modes

- `disabled`: OTP requests fail safely. Use this until a delivery provider is ready.
- `dev`: logs OTP only outside production. Do not use for live client access.
- `email-placeholder`: prepares the flow but does not actually deliver OTP. It does not expose OTP to the browser.

A real email or SMS provider should be connected before relying on this for live client access.

## Protected routes

- `/client-room/existing/dashboard`
- `GET /api/client/matter`

## Public routes

- `/client-room/existing`
- `POST /api/client/request-otp`
- `POST /api/client/verify-otp`
- `POST /api/client/logout`
- `/client-room/new`
- `POST /api/intake`

## Data returned to client

Client access only returns a safe matter summary:

- matter code
- title
- matter type
- matter status
- next office action
- client action required
- created/accepted dates

It does not return narration, conflict parties, legal-document acceptances, full intake, admin notes, audit logs, or evidence.

## Database change

Stage 5D adds `ClientOtpChallenge` to Prisma. Run Prisma setup after deploying the code:

```bash
npx prisma db push
```

Do not use `--accept-data-loss`. The change is additive.

## Future stages

- Stage 5E: secure file upload and evidence storage
- Stage 5F: payment and invoice flow
- Stage 5G: notification delivery and audit strengthening
