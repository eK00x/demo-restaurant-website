"use client";

import { CategoryNav } from "@/components/category-nav";
import { MenuItemRow, PekingEnteCard, SubsectionJumpChips } from "@/components/menu-list";
import type { MenuSection } from "@/lib/menu";

interface InteractiveMenuProps {
  sections: MenuSection[];
  footerSlot?: React.ReactNode;
}

export function InteractiveMenu({ sections, footerSlot }: InteractiveMenuProps) {
  return (
    <div>
      {/* Menüansicht: Sticky Sidebar + weiße Menü-Karten mit zartem Schatten */}
      <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-10 xl:gap-12 items-start">
        <CategoryNav sections={sections} />

        <main className="min-w-0 space-y-10 sm:space-y-12">
          {sections.map((section) =>
            // Die Peking-Ente steht als eigenständige Showcase-Karte, ohne weiße Kategorie-Karte drumherum
            section.id === "peking-ente" ? (
              <section key={section.id} id={section.id} aria-label={section.title} className="scroll-mt-36">
                <PekingEnteCard />
              </section>
            ) : (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-36 rounded-3xl border border-border bg-surface px-4 py-6 sm:p-8 lg:p-10 shadow-[0_4px_12px_rgba(13,92,70,0.05)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(13,92,70,0.08)]"
            >
              {/* Slogan neben der Überschrift mit Gedankenstrich (Handy zentriert, Desktop linksbündig) */}
              <div className="mb-6 pb-3.5 border-b border-border flex flex-wrap items-baseline justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary">
                  {section.title}
                </h2>
                {section.tagline ? (
                  <p className="font-serif text-lg font-normal text-accent-wine lg:text-xl flex items-baseline gap-2 sm:gap-3">
                    <span aria-hidden>–</span>
                    <span>{section.tagline}</span>
                  </p>
                ) : null}
              </div>

              <SubsectionJumpChips section={section} />

              {/* Untertext nur bei Kategorien ohne Unterkategorien, sonst steht er an der Unterkategorie */}
              {section.items && section.intro ? (
                <p className="mb-3.5 font-sans text-sm font-medium text-text-muted text-center sm:text-left">{section.intro}</p>
              ) : null}

              {section.items && (
                <div className="grid gap-y-1">
                  {section.items.map((it) => (
                    <MenuItemRow key={`${section.id}-${it.number ?? it.name}`} item={it} />
                  ))}
                </div>
              )}

              {section.subsections?.map((sub) => {
                return (
                  <div key={sub.id} id={sub.id} className="mt-10 scroll-mt-36 first:mt-4">
                    <div className="mb-4 flex items-center justify-center sm:justify-start gap-3">
                      <span className="h-px flex-1 bg-border sm:hidden" />
                      <h3 className="font-serif text-xl font-bold tracking-tight text-primary sm:text-2xl text-center sm:text-left shrink-0">
                        {sub.title}
                      </h3>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    {sub.intro ? (
                      <p className="mb-3.5 font-sans text-sm font-medium text-text-muted text-center sm:text-left">{sub.intro}</p>
                    ) : null}
                    <div className="grid gap-y-1">
                      {sub.items.map((it) => (
                        <MenuItemRow key={`${sub.id}-${it.number ?? it.name}`} item={it} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
            )
          )}
          {footerSlot}
        </main>
      </div>
    </div>
  );
}
