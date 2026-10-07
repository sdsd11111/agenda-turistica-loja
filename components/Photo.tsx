import Image from "next/image";

type Props = {
  gradient: string;
  src?: string;
  alt?: string;
  emoji?: string;
  className?: string;
};

/** Foto real si hay `src` (ideal: WebP vía Bunny CDN); si no, degradado de marca como placeholder. */
export default function Photo({ gradient, src, alt = "", emoji, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: gradient }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
      ) : emoji ? (
        <span aria-hidden className="absolute inset-0 grid place-items-center text-6xl opacity-80">
          {emoji}
        </span>
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg,transparent 45%,rgba(0,0,0,.32))" }}
      />
    </div>
  );
}
