type NotificationTemplateCardProps = Readonly<{
  title: string;
  subject: string;
  body: string;
}>;

export function NotificationTemplateCard({ title, subject, body }: NotificationTemplateCardProps) {
  return (
    <article className="rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-sm backdrop-blur">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">{title}</p>
      <h3 className="mt-4 font-display text-xl text-ink">{subject}</h3>
      <p className="mt-3 text-sm leading-7 text-ink/55">{body}</p>
    </article>
  );
}
