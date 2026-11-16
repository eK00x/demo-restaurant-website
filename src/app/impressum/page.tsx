import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/impressum" },
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung des Restaurants Jade Lotus in Berlin.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-normal tracking-tight text-primary max-sm:text-white sm:text-5xl">Impressum</h1>
      <div className="mt-8 space-y-7 text-base leading-relaxed text-fg/85 max-sm:rounded-2xl max-sm:bg-surface max-sm:p-5 max-sm:shadow-xs">
        <section>
          <h2 className="text-lg font-semibold text-jade">Diensteanbieter</h2>
          <p className="mt-2 text-fg">
            {site.owner}
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-jade">Kontakt</h2>
          <p className="mt-2 text-fg">
            E-Mail: {site.email}
            <br />
            Telefon: {site.phone}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-jade">Umsatzsteuer-ID</h2>
          <p className="mt-2 text-fg">{site.vatId}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-jade">Aufsichtsbehörde</h2>
          <p className="mt-2 text-fg">Bezirksamt (Beispiel) – Ordnungsamt</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-jade">Haftungshinweis</h2>
          <p className="mt-2 text-fg/80">
            Die Inhalte wurden sorgfältig erstellt, dienen der Information und entfalten keine rechtlich bindende
            Wirkung, soweit es sich nicht um gesetzlich verpflichtende Angaben handelt. Für Inhalte fremder
            Webseiten, auf die wir verlinken, übernehmen wir keine Verantwortung.
          </p>
        </section>
      </div>
    </div>
  );
}
