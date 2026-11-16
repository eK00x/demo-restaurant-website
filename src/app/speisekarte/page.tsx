import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteractiveMenu } from "@/components/interactive-menu";
import { MenuDisclaimer } from "@/components/menu-disclaimer";
import { menuSections } from "@/lib/menu";

export const metadata: Metadata = {
  alternates: { canonical: "/speisekarte" },
  title: "Speisekarte",
  description:
    "Peking-Ente, Wok-Gerichte, Nudeln, Reis, vegetarische Küche und Desserts im Jade Lotus Berlin.",
};

export default function SpeisekartePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-5 sm:px-6">
      {/* Hinweis auf die Mittagskarte als dezenter Link in der Überschriften-Zeile (Handy: zentriert darunter, ohne Trennstrich) */}
      <div className="mb-6 flex flex-col items-center text-center gap-3 pb-1 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:border-b sm:border-border sm:pb-4 sm:text-left">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-primary max-sm:text-white sm:text-5xl">Speisekarte</h1>
        <Link
          href="/mittagsangebote"
          className="group inline-flex items-center gap-2 py-1.5 font-sans text-sm text-text-muted transition-colors hover:text-primary max-sm:text-white/80 sm:self-auto sm:pb-1.5 sm:text-base"
        >
          <Image src="/images/sun.png" alt="" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" />
          <span>
            <span className="font-semibold text-primary max-sm:text-white">Mittagskarte</span> · Mi–Fr 12–16 Uhr
          </span>
          <span
            aria-hidden="true"
            className="inline-flex items-center text-primary font-bold animate-arrow-x max-sm:text-white"
          >
            <svg
              className="h-4.5 w-4.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Interaktive Speisekarte mit Chip-Filtern und klassischer Kategorien-Navigation */}
      <InteractiveMenu sections={menuSections} footerSlot={<MenuDisclaimer type="food" />} />
    </div>
  );
}
