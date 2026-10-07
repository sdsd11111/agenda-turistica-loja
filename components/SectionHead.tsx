export default function SectionHead({
  title,
  lead,
  tone = "light",
}: {
  title: string;
  lead?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2
        className={`font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl ${
          tone === "dark" ? "text-white" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-3 max-w-[62ch] text-lg ${tone === "dark" ? "text-white/80" : "text-ink/70"}`}>{lead}</p>
      )}
    </div>
  );
}
