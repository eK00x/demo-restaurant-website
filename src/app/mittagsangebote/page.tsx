import type { Metadata } from "next";
import Image from "next/image";
import { CategoryNav } from "@/components/category-nav";
import { MenuDisclaimer } from "@/components/menu-disclaimer";
import { MenuSectionBlock } from "@/components/menu-list";
import { lunchSections } from "@/lib/lunch";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/mittagsangebote" },
  title: "Mittagsangebote",
  description: `Mittagsangebote im Jade Lotus: ${site.lunchHours}.`,
};

export default function LunchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-5 sm:px-6">
      {/* Kopf wie bei der Speisekarte: Überschrift links, Zeiten als gut lesbares Etikett rechts (Handy: zentriert, ohne Trennstrich) */}
      <div className="mb-6 flex flex-col items-center text-center gap-3 pb-1 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:border-b sm:border-border sm:pb-4 sm:text-left">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/images/sun.png"
            alt=""
            width={44}
            height={44}
            className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11 animate-sun-shine"
            priority
          />
          <h1 className="font-serif text-4xl font-normal tracking-tight text-primary max-sm:text-white sm:text-5xl">
            Mittagsangebote
          </h1>
        </div>
        <p className="inline-flex items-center gap-2 self-center rounded-full border border-border bg-surface px-3.5 py-1.5 font-sans text-sm text-text shadow-2xs sm:mb-1 sm:self-auto sm:text-base">
          <svg aria-hidden className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 7v5l3 2" />
          </svg>
          <span>
            <span className="font-semibold">Mi–Fr · 12–16 Uhr</span>
            <span className="text-text-muted"> · außer feiertags</span>
          </span>
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-10 xl:gap-12 items-start">
        {/* Links: Auf Desktop als moderne Sticky-Seitenleiste, auf Mobile als schlanke Wischleiste */}
        <CategoryNav sections={lunchSections} />

        {/* Rechts: Die Mittagsgerichte */}
        <main className="min-w-0 space-y-10 sm:space-y-12">
          {lunchSections.map((section) => (
            <MenuSectionBlock key={section.id} section={section} />
          ))}

          {/* Menü-Hinweise & Allergene innerhalb von main, damit die Seitenleiste stabil bis zum Ende mitwandert */}
          <MenuDisclaimer type="lunch" />
        </main>
      </div>
    </div>
  );
}
