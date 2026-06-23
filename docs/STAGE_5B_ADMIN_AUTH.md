# Stage 5B — Admin Authentication and Access Control

Stage 5B replaces the temporary browser Basic Auth lock with a proper form-based office login for the Magaji Law Client Room.

## Purpose

The admin dashboard and intake review APIs contain confidential client and matter information. They must not be readable by URL guessing. Stage 5B creates a single-admin bridge while preserving the public intake form.

## Required environment variables

Set these in Vercel Project Settings or with `vercel env add`:

```bash
ADMIN_USER="your-office-username"
ADMIN_PASS="your-strong-password"
ADMIN_SESSION_SECRET="a-long-random-secret"
```

Generate the session secret with:

```bash
openssl rand -base64 32
```

Do not commit real values to GitHub.

## Protected routes

These routes require an authenticated admin session:

- `/client-room/admin`
- `/client-room/admin/*`
- `GET /api/intake`
- `GET /api/intake/[id]`
- `PATCH /api/intake/[id]`

## Public routes

These routes remain public:

- `/client-room`
- `/client-room/new`
- `POST /api/intake`
- `/client-room/legal`
- `/client-room/operations`
- `/client-room/existing`

## Session model

The system creates a signed session token stored in an HttpOnly cookie. The token includes:

- username
- issued timestamp
- expiry timestamp
- HMAC signature

Sessions expire after 8 hours. Logout clears the cookie.

## Security notes

This is a secure single-admin bridge, not a complete staff-account system. Later stages should add:

- staff accounts
- role-based access control
- database-backed users
- audit logs for every admin action
- device/session logs
- password reset or OTP
- stricter rate limiting

## Testing

After deployment:

1. Visit `/client-room/admin` and confirm it redirects to `/client-room/admin/login`.
2. Login with `ADMIN_USER` and `ADMIN_PASS`.
3. Confirm the admin dashboard loads.
4. Visit `/api/intake` without a session using `curl -i` and confirm `401`.
5. Submit a public intake through `/client-room/new` and confirm public POST still works.
