# Integration Notes

## Recommended integration with existing Magaji Law intake hub

Do not merge this module immediately into the older intake hub.

First deploy it as:

```txt
/client-room
```

Then connect the broader hub into the Client Room like this:

```txt
Magaji Law Website
  → Client Service Desk
    → Client Room
      → Matter Type Intake
      → Lawyer Review
      → Engagement
      → Existing Client Dashboard
```

## Production database model suggestions

Tables:

- users
- clients
- intake_submissions
- matter_parties
- matter_conflicts
- matter_documents
- matter_messages
- matters
- matter_events
- invoices
- engagement_letters
- audit_logs

## Suggested status sequence

- intake_received
- conflict_check
- consultation_required
- consultation_scheduled
- engagement_pending
- accepted
- declined
- documents_under_review
- drafting
- filing_preparation
- filed
- hearing_or_appearance
- awaiting_client_action
- closed

## Security notes

- Store uploads in private object storage.
- Do not expose document URLs publicly.
- Use signed URLs with expiry.
- Add OTP or passkey login for client matter rooms.
- Add audit logs for all document access.
- Add separate admin roles for lawyer, clerk, reviewer, and billing.
- Never send sensitive matter details in plain notification previews.

## Payment notes

Stage payments carefully:

1. intake review or consultation fee;
2. professional fee after engagement;
3. filing expenses/disbursement deposit after specific instruction.

Avoid collecting filing expenses before the lawyer confirms the matter is accepted and the filing route is clear.
