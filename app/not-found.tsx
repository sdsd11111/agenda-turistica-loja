import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero title="No encontramos esta página" lead="Puede que el enlace haya cambiado. Vuelve al inicio o explora los cantones." />
      <div className="mx-auto flex w-[min(1180px,100%-40px)] gap-3 py-12">
        <Link href="/" className="rounded-full bg-forest px-6 py-3 font-semibold text-white hover:bg-leaf">Ir al inicio</Link>
        <Link href="/cantones" className="rounded-full border border-forest/30 px-6 py-3 font-semibold text-forest">Ver cantones</Link>
      </div>
    </>
  );
}
