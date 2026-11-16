import type { Metadata } from "next";
import { CategoryNav } from "@/components/category-nav";
import { MenuDisclaimer } from "@/components/menu-disclaimer";
import { MenuSectionBlock } from "@/components/menu-list";
import { drinkSections } from "@/lib/drinks";

export const metadata: Metadata = {
  alternates: { canonical: "/getraenke" },
  title: "Getränkekarte",
  description: "Cocktails, Softdrinks, Wein und Spirituosen im Jade Lotus Berlin.",
};

export default function DrinksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-5 sm:px-6">
      <div className="mb-6 pb-1 text-center sm:mb-8 sm:border-b sm:border-border sm:pb-4 sm:text-left">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-primary max-sm:text-white sm:text-5xl">
          Getränkekarte
        </h1>
      </div>

      <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-10 xl:gap-12 items-start">
        {/* Links: Auf Desktop als moderne Sticky-Seitenleiste, auf Mobile als schlanke Wischleiste */}
        <CategoryNav sections={drinkSections} />

        {/* Rechts: Die Getränke */}
        <main className="min-w-0 space-y-14">
          {drinkSections.map((section) => (
            <MenuSectionBlock key={section.id} section={section} />
          ))}

          {/* Menü-Hinweise & Allergene innerhalb von main, damit die Seitenleiste bis zum allerletzten Gericht mit nach unten wandert */}
          <MenuDisclaimer type="drinks" />
        </main>
      </div>
    </div>
  );
}
