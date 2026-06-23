import Link from 'next/link';

export const consentItems = [
  {
    key: 'noClientRelationshipAccepted',
    title: 'No automatic lawyer-client relationship',
    text: 'I understand this submission does not automatically make me a client of Magaji Law.',
    href: '/client-room/legal/no-lawyer-client-relationship'
  },
  {
    key: 'conflictReviewAccepted',
    title: 'Conflict review before acceptance',
    text: 'I understand the firm must review the information and check for conflict before accepting the matter.',
    href: '/client-room/legal/conflict-check-disclosure'
  },
  {
    key: 'consentAccepted',
    title: 'Consent to preliminary review',
    text: 'I consent to the firm reviewing my submitted facts and documents for preliminary assessment.',
    href: '/client-room/legal/consent-to-review'
  },
  {
    key: 'aiNoticeAccepted',
    title: 'AI-assisted organisation only',
    text: 'I understand AI tools may assist in organising my narration, but legal review remains with a lawyer.',
    href: '/client-room/legal/ai-assisted-organisation'
  },
  {
    key: 'privacyNoticeAccepted',
    title: 'Privacy and data protection',
    text: 'I understand the firm may process my personal data and matter information for intake, conflict check, consultation, engagement, legal service delivery, and record keeping.',
    href: '/client-room/legal/privacy-data-protection'
  },
  {
    key: 'truthAccepted',
    title: 'Truthfulness of information',
    text: 'I confirm that the information I provide is true to the best of my knowledge.',
    href: '/client-room/legal/preliminary-intake-notice'
  }
] as const;

type ConsentKey = (typeof consentItems)[number]['key'];

type ConsentChecklistProps = {
  checked?: Partial<Record<ConsentKey, boolean>>;
  onChange?: (key: ConsentKey, value: boolean) => void;
};

export function ConsentChecklist({ checked, onChange }: ConsentChecklistProps = {}) {
  return (
    <div className="space-y-3">
      {consentItems.map((item) => (
        <label key={item.title} className="flex gap-4 rounded-3xl border border-ink/10 bg-white/65 p-5 text-sm leading-6 text-ink/75 shadow-sm transition hover:border-brass/40 hover:bg-white/90">
          <input
            type="checkbox"
            checked={checked ? Boolean(checked[item.key]) : undefined}
            onChange={(event) => onChange?.(item.key, event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#b08d57]"
          />
          <span>
            <span className="block font-display text-lg text-ink">{item.title}</span>
            <span className="mt-1 block text-sm leading-6 text-ink/58">{item.text}</span>
            <Link href={item.href} className="mt-2 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-brass hover:text-ink">
              Read full document
            </Link>
          </span>
        </label>
      ))}
    </div>
  );
}
