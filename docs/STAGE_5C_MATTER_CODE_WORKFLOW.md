# Stage 5C — Matter Code Creation and Acceptance Workflow

Stage 5C converts a reviewed intake submission into an accepted matter with a controlled matter code.

## Purpose

The Client Room must preserve the professional distinction between a public intake and an accepted matter. A person who submits facts through the public intake page is not automatically a client. The office must first review the intake, check conflict, decide whether consultation or clarification is needed, and expressly accept or decline the matter.

## Intake-to-matter lifecycle

1. Public visitor submits intake.
2. The office reviews facts, parties, urgency, and legal-document acceptances.
3. The office may mark the intake for conflict check, clarification, consultation, or engagement pending.
4. The office may decline the intake.
5. If the office accepts the intake, the system creates a Matter record.
6. A matter code is generated only after acceptance.
7. The matter appears in the protected accepted-matters register.
8. The existing-client room can verify the matter code against the registered phone or email.

## Matter-code rule

A matter code is not a filing confirmation, not proof of court filing, and not a substitute for an engagement letter. It is a controlled matter identity used by the office after acceptance.

## Limited client access

The public matter-code access bridge requires both:

- matter code; and
- registered phone or email.

If both match, the client receives only a limited safe summary:

- matter code;
- title;
- matter type;
- status;
- next office action;
- client action required;
- created date.

The bridge does not return narration, conflict parties, opposing party names, legal acceptances, admin notes, audit logs, or evidence records.

## Security boundary

Admin matter pages and matter listing APIs require the admin session created in Stage 5B. Public users cannot list matters or read full intake records.

## Future stages

Stage 5D should add proper OTP/session client authentication.
Stage 5E should add secure document upload and storage.
Stage 5F should add invoices and payments.
Stage 5G should add notifications and a richer audit trail.
