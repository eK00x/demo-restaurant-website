"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Footer() {
  // Die Kontaktseite zeigt Adresse, Telefon und Öffnungszeiten selbst; dort nur die schmale untere Zeile
  const showInfo = usePathname() !== "/kontakt";

  return (
    <footer
      style={{ backgroundColor: "#0D5C46" }}
      className="mt-auto border-t border-accent-gold/25 bg-[#0D5C46] text-cream"
    >
      {showInfo ? (
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center md:col-span-2 md:text-left lg:col-span-1">
            <Link href="/" className="inline-block py-1 text-[17px] font-bold text-cream hover:text-white transition-colors">
              {site.name}
            </Link>
            <p className="mt-3 max-w-xs mx-auto md:mx-0 text-base leading-relaxed text-cream/90">
              {site.tagline}. Familiäre Atmosphäre und traditionelle asiatische Küche in Berlin.
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[17px] font-bold text-cream">Besuch & Kontakt</p>
            <p className="mt-3 text-base leading-relaxed text-cream/90">
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </p>
            <div className="mt-3 flex flex-col items-center md:items-start space-y-2.5 text-base">
              <a className="group flex items-center justify-center md:justify-start gap-2.5 text-cream/90 transition-colors hover:text-sand" href={site.phoneHref}>
                <svg className="h-4 w-4 shrink-0 text-sand transition-colors group-hover:text-sand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="font-medium select-text max-lg:active:text-sand">{site.phone}</span>
              </a>
              <a className="group flex items-center justify-center md:justify-start gap-2.5 text-cream/90 transition-colors hover:text-sand" href={`mailto:${site.email}`}>
                <svg className="h-4 w-4 shrink-0 text-sand transition-colors group-hover:text-sand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="font-medium">{site.email}</span>
              </a>
            </div>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[17px] font-bold text-cream">Öffnungszeiten</p>
            <div className="mt-3 inline-grid grid-cols-[auto_auto] gap-x-4 sm:gap-x-5 gap-y-1.5 text-base text-cream/90 text-left">
              {site.hours.map((row) => (
                <div key={row.days} className="contents">
                  <span className="font-medium">{row.days}</span>
                  <span className="whitespace-nowrap font-semibold text-sand text-right">{row.time}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm font-medium text-cream/75">{site.kitchenUntil}</p>
          </div>
        </div>
      ) : null}
      <div className={showInfo ? "border-t border-cream/15" : undefined}>
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-4 py-3 text-sm font-medium text-cream/80 text-center sm:text-left">
          <p className="flex items-center justify-center gap-1.5">
            <span
              className="inline-block text-[1.25em] leading-none font-sans font-normal translate-y-[0.5px] sm:translate-y-[2.5px]"
              aria-hidden="true"
            >
              ©
            </span>
            <span>{site.name} · Demo-Projekt</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/ueber-uns" className="inline-block py-2 hover:text-sand hover:underline">
              Über uns
            </Link>
            <Link href="/impressum" className="inline-block py-2 hover:text-sand hover:underline">
              Impressum
            </Link>
            <Link href="/datenschutz" className="inline-block py-2 hover:text-sand hover:underline">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
