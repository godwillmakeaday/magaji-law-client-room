type NoticeBoxProps = {
  title: string;
  children: React.ReactNode;
  tone?: 'standard' | 'dark' | 'warning';
};

const toneClass = {
  standard: 'notice-card text-ink',
  dark: 'border-l-4 border-brass bg-navy text-vellum',
  warning: 'border-l-4 border-amber-700 bg-amber-50 text-amber-950'
};

export function NoticeBox({ title, children, tone = 'standard' }: NoticeBoxProps) {
  return (
    <div className={`rounded-2xl p-5 ${toneClass[tone]}`}>
      <h3 className="font-display text-lg">{title}</h3>
      <div className="mt-2 text-sm leading-7 opacity-90">{children}</div>
    </div>
  );
}
