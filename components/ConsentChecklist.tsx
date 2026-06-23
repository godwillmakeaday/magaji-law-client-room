const consents = [
  'I understand this submission does not automatically make me a client of Magaji Law.',
  'I understand the firm must review the information and check for conflict before accepting the matter.',
  'I consent to the firm reviewing my submitted facts and documents for preliminary assessment.',
  'I understand AI tools may assist in organising my narration, but a lawyer remains responsible for legal review.',
  'I confirm that the information I provide is true to the best of my knowledge.'
];

export function ConsentChecklist() {
  return (
    <div className="space-y-3">
      {consents.map((item) => (
        <label key={item} className="flex gap-3 rounded-2xl border border-ink/10 bg-white/50 p-4 text-sm leading-6 text-ink/75">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#b08d57]" />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}
