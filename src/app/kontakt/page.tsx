import type { Metadata } from "next";
import { CallAction, PhoneIcon } from "@/components/call-action";
import { MapEmbed } from "@/components/map-embed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/kontakt" },
  title: "Kontakt",
  description: `Adresse, Telefon und Anfahrt von ${site.name} in ${site.address.city}.`,
};

const transitData = [
  {
    lines: ["M11", "X11", "X83", "112", "710", "711"],
    stop: "Musterplatz",
  },
  {
    lines: ["M77"],
    stop: "Beispielweg",
  },
  {
    lines: ["X83"],
    stop: "Lindenallee",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* 1. Kopfbereich: Titel oben über die volle Breite (Handy zentriert) */}
      <div className="mb-8 border-b border-border pb-4 max-sm:border-white/20 text-center sm:text-left">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-primary max-sm:text-white sm:text-5xl">Kontakt</h1>
      </div>

      {/* 2. Raster: Links Adresse & ÖPNV, rechts exakt parallel die Google Maps Karte in gleicher Höhe */}
      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        {/* Karte: Adresse & ÖPNV */}
        <div className="rounded-2xl border border-accent-gold/30 bg-surface p-5 sm:p-6 shadow-xs">
          <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-accent-wine">Adresse</h2>
          <p className="mt-1.5 text-lg sm:text-xl font-bold leading-snug text-text">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>

          <div className="mt-4 border-t border-accent-gold/20 pt-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent-wine flex items-center gap-1.5">
              <svg className="h-4.5 w-4.5 shrink-0 text-accent-wine" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="3" width="16" height="15" rx="2.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8M4 10h16" />
                <circle cx="8" cy="14.5" r="1" fill="currentColor" stroke="none" />
                <circle cx="16" cy="14.5" r="1" fill="currentColor" stroke="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 18v2.5M17.5 18v2.5" />
              </svg>
              <span>Mit dem Bus</span>
            </h3>
            <div className="mt-2.5 space-y-2">
              {transitData.map((item) => (
                <div key={item.stop} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                  <div className="flex flex-wrap gap-1 shrink-0">
                    {item.lines.map((line) => (
                      <span
                        key={line}
                        className="inline-flex items-center rounded-md bg-cream px-1.5 py-0.5 text-[11px] font-sans font-semibold text-primary border border-primary/25 shadow-2xs transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white cursor-default"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-normal text-text/85">{item.stop}</span>
                </div>
              ))}
            </div>
          </div>

          {/* E-Mail bewusst hier statt bei der Reservierung: Reservierungen nur telefonisch */}
          <div className="mt-4 border-t border-accent-gold/20 pt-3.5">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-accent-wine">Allgemeine Anfragen</h3>
            <a
              href={`mailto:${site.email}`}
              className="group mt-0.5 inline-flex items-center gap-2 py-1.5 font-sans text-sm text-text/85 transition-colors duration-200 hover:text-accent-wine sm:text-base"
            >
              <svg className="h-4 w-4 shrink-0 text-accent-wine" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span>{site.email}</span>
            </a>
            <p className="mt-1 font-sans text-xs text-text-muted">Keine Reservierungen per E-Mail.</p>
          </div>
        </div>

        {/* Google Maps Karte: Genau parallel und so groß wie der Adress- und Bus-Container */}
        <div className="h-full min-h-[220px] overflow-hidden rounded-2xl border border-accent-gold/25 bg-surface shadow-sm">
          <MapEmbed />
        </div>
      </div>

      {/* 3. Reservierung (nur telefonisch) und Öffnungszeiten nebeneinander, auf dem Handy untereinander */}
      <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-2">
        {/* Sprungziel für „Tisch reservieren“ im Header (/kontakt#reservieren) */}
        <div
          id="reservieren"
          className="scroll-mt-36 rounded-2xl border border-accent-gold/30 bg-surface p-5 sm:p-6 shadow-xs"
        >
          <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-accent-wine">Reservierung</h2>
          <p className="mt-1.5 font-sans text-sm font-medium text-text/80 sm:text-base">
            Tischreservierungen nehmen wir telefonisch entgegen.
          </p>
          <div className="mt-4">
            <CallAction
              buttonClassName="group inline-flex items-center gap-2.5 rounded-lg bg-accent-gold px-5 py-2.5 text-base font-bold text-text shadow-sm hover:bg-[#d6aa32] hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
              textClassName="font-sans text-lg text-text sm:text-xl"
            >
              <PhoneIcon className="h-4.5 w-4.5 shrink-0 text-text transition-transform duration-200 group-hover:rotate-12" />
              <span>{site.phone}</span>
            </CallAction>
          </div>
        </div>

        <div className="rounded-2xl border border-accent-gold/30 bg-surface p-5 sm:p-6 shadow-xs">
          <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-accent-wine">Öffnungszeiten</h2>
          <ul className="mt-2 space-y-1 font-sans text-sm sm:text-base">
            {site.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span className="text-text">{row.days}</span>
                <span className={row.time === "Ruhetag" ? "text-text-muted" : "font-semibold text-primary"}>{row.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-sans text-xs text-text-muted sm:text-sm">{site.kitchenUntil}</p>
        </div>
      </div>
    </div>
  );
}
