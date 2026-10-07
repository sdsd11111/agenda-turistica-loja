export default function PageHero({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-2 pt-28 pb-14 text-white sm:pt-32 sm:pb-20">
      <div aria-hidden className="pattern-andino absolute inset-0 -z-10 opacity-[.08]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 80% at 85% 0%,rgba(242,193,78,.25),transparent 60%),linear-gradient(160deg,#12301f,#1B4332 60%,#245b57)" }}
      />
      <div className="mx-auto w-[min(1180px,100%-40px)]">
        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">{title}</h1>
        {lead && <p className="mt-4 max-w-[60ch] text-lg text-white/85 sm:text-xl">{lead}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
