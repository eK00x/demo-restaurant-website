import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/datenschutz" },
  title: "Datenschutz",
  description: "Datenschutzerklärung des Restaurants Jade Lotus in Berlin.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-normal tracking-tight text-primary max-sm:text-white sm:text-5xl">Datenschutz</h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-fg/85 max-sm:rounded-2xl max-sm:bg-surface max-sm:p-5 max-sm:shadow-xs">
        <p>
          Diese Website stellt Restaurantinformationen für unsere Gäste dar. Es gibt kein Tracking, keine Werbenetzwerke
          und keine Analyse-Cookies. Beim Aufruf speichert der Hosting-Anbieter lediglich technisch notwendige Server-Logs
          (IP-Adresse, Zeitpunkt, aufgerufene Seite).
        </p>
        <p>
          Die Karte auf der Kontaktseite wird von Google Maps bereitgestellt. Sie wird erst geladen, wenn ihr auf
          „Karte laden“ klickt; erst dann werden Daten (u. a. eure IP-Adresse) an Google übermittelt. Ohne diesen Klick
          besteht keine Verbindung zu Google. Alternativ könnt ihr jederzeit unsere Adressangaben direkt nutzen.
        </p>
        <p className="border-t border-jade/15 pt-4">
          <strong className="font-semibold text-fg">Verantwortlich:</strong> {site.owner}, {site.address.street}, {site.address.zip} {site.address.city},{" "}
          <a className="text-jade underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </div>
  );
}
