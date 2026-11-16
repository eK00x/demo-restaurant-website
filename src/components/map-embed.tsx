"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const EMBED_SRC =
  "https://maps.google.com/maps?q=Berlin&t=&z=15&ie=UTF8&iwloc=&hl=de&output=embed";

/**
 * Google-Karte erst nach Einwilligung per Klick (DSGVO): Vorher wird keine Verbindung zu Google aufgebaut.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Karte Jade Lotus Berlin"
        className="h-full w-full border-0 min-h-[220px]"
        referrerPolicy="no-referrer-when-downgrade"
        src={EMBED_SRC}
      />
    );
  }

  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 bg-cream px-6 py-8 text-center">
      <svg aria-hidden className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
      <p className="max-w-xs font-sans text-sm text-text/80">
        Beim Laden der Karte werden Daten an Google übertragen. Mehr dazu in der{" "}
        <Link href="/datenschutz" className="font-semibold text-primary underline underline-offset-2">
          Datenschutzerklärung
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-bold text-white transition-colors hover:bg-[#073a2c]"
      >
        Karte laden
      </button>
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block py-1.5 font-sans text-sm font-semibold text-primary underline underline-offset-2"
      >
        In Google Maps öffnen
      </a>
    </div>
  );
}
