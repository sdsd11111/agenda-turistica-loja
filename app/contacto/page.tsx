import type { Metadata } from "next";
import ContactoForm from "@/components/ContactoForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contacto y sugerencias",
  description: "Recomienda un lugar, reporta información incorrecta o solicita la afiliación de tu negocio en agendaturisticaloja.com.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero title="Contacto y sugerencias" lead="Cuéntanos qué lugar falta, qué dato está mal o cómo podemos ayudarte." />
      <section className="py-14">
        <div className="mx-auto w-[min(640px,100%-40px)]">
          <ContactoForm />
        </div>
      </section>
    </>
  );
}
