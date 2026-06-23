# Legal Document Pack Notes

The Legal Document Pack is the legal control layer for the Client Room.

## Why it exists

A legal intake platform must not merely collect facts. It must define:

- what the submission means;
- what the submission does not mean;
- what consent covers;
- how conflict check works;
- what AI is allowed to do;
- when engagement begins;
- how fees and disbursements are separated;
- how accepted clients use the matter room;
- how declined matters are closed.

## Document architecture

The documents are stored in:

`/lib/legal-documents.ts`

The pages render from structured data:

- `/client-room/legal`
- `/client-room/legal/[slug]`

This makes it easier to later connect the documents to:

- version control;
- e-signature;
- PDF generation;
- admin approval;
- matter-specific templates;
- client acknowledgments.

## Production caution

Before live use, review every document against the firm’s real process, data storage, technology vendors, fee policy, and applicable professional duties.
