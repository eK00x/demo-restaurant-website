"use client";

import { useEffect, useRef, useState } from "react";
import { jumpSubsections, type MenuSection } from "@/lib/menu";

interface CategoryNavProps {
  sections: Pick<MenuSection, "id" | "title" | "subsections">[];
}

/**
 * Speisekarten-Navigation:
 * - Inaktive Menüpunkte in --color-text-muted (#55695E).
 * - Aktive Kategorie in Bordeauxrot (#6B1D2F) mit dezent hinterlegter Kachel (rgba(107, 29, 47, 0.08)).
 */
export function CategoryNav({ sections }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  // Nach dem Klick den Tastaturfokus in den Zielabschnitt setzen: Sonst scrollen Bild ↑/↓ zuerst die
  // (auf kleinen Bildschirmen selbst scrollbare) Seitenleiste statt der Seite. Das Scrollen übernimmt der Anker-Link.
  const jumpTo = (id: string) => {
    setActiveId(id);
    const target = document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    // Kein Fokusrahmen um die ganze Karte; die Markierung in der Leiste zeigt bereits, wo man ist
    target.style.outline = "none";
    target.focus({ preventScroll: true });
  };

  // Aktiv ist der letzte Abschnitt, dessen Oberkante schon unter Header und Kategorie-Leiste gescrollt ist.
  // (Ein IntersectionObserver meldet nur Änderungen und blieb bei langen Abschnitten auf dem vorherigen hängen.)
  useEffect(() => {
    const OFFSET = 160; // etwas mehr als scroll-mt-36 (144 px), damit ein Sprung den Zielabschnitt aktiviert
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = sections[0]?.id ?? "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = id;
      }
      // Ganz unten angekommen: letzten Abschnitt markieren, auch wenn er zu kurz ist, um nach oben zu rücken
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // Auf Mobilgeräten den aktiven Tab in der horizontalen Leiste automatisch zentrieren
  useEffect(() => {
    const tabButton = scrollRef.current?.querySelector(`[data-tab-id="${activeId}"]`);
    tabButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  // Desktop: Passt die Seitenleiste nicht ganz ins Bild, scrollt sie selbst so weit, dass der aktive Eintrag
  // sichtbar bleibt. Bewusst über scrollTo statt scrollIntoView, damit sich die Seite dabei nicht bewegt;
  // ohne sanftes Scrollen, das beim Weiterscrollen der Seite unterbrochen würde.
  useEffect(() => {
    const aside = asideRef.current;
    const item = aside?.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
    if (!aside || !item) return;
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top < aside.scrollTop) aside.scrollTo({ top });
    else if (bottom > aside.scrollTop + aside.clientHeight)
      aside.scrollTo({ top: bottom - aside.clientHeight });
  }, [activeId]);

  return (
    <>
      {/* 1. MOBIL (< lg): Schlanke, horizontale Wischleiste direkt unter dem Header */}
      <div className="sticky top-[var(--header-h)] z-40 -mx-4 mb-8 border-y border-border bg-[var(--color-header-bg)]/95 px-3 py-2 backdrop-blur-md sm:-mx-6 sm:px-4 lg:hidden">
        <div
          ref={scrollRef}
          className="no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto scroll-smooth py-0.5"
          role="tablist"
          aria-label="Kategorien"
        >
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                data-tab-id={section.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => jumpTo(section.id)}
                className={`inline-flex shrink-0 items-center rounded-lg px-3.5 py-1.5 text-sm font-semibold border transition-all duration-300 ease-out outline-hidden focus:outline-hidden focus-visible:outline-hidden select-none ${
                  isActive
                    ? "bg-accent-gold border-accent-gold text-text shadow-sm font-bold scale-[1.03]"
                    : "text-text bg-white/80 border border-border hover:bg-white hover:text-text"
                }`}
              >
                {section.title}
              </a>
            );
          })}
        </div>
      </div>

      {/* 2. DESKTOP (lg+): Inaktive in #55695E, aktive Kategorie in Bordeauxrot #6B1D2F mit dezent hinterlegter Kachel */}
      <aside
        ref={asideRef}
        className="hidden lg:block sticky top-[calc(var(--header-h)+2rem)] self-start max-h-[calc(100vh-var(--header-h)-3rem)] overflow-y-auto no-scrollbar pr-4 select-none"
        aria-label="Speisekarten-Kategorien"
      >
        <nav role="tablist">
          <ul className="space-y-0.5">
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    data-nav-id={section.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => jumpTo(section.id)}
                    // Bei niedrigen Fenstern (≤ 760 px) enger und ohne Hinweiszeile, damit die Leiste ganz ins Bild passt
                    className={`block rounded-[6px] px-3 py-[5px] text-sm transition-all duration-200 xl:text-base [@media(max-height:760px)]:py-[3px] [@media(max-height:760px)]:text-sm ${
                      isActive
                        ? "font-bold text-accent-wine bg-[rgba(107,29,47,0.08)] shadow-2xs"
                        : "font-medium text-text-muted hover:bg-white/80 hover:text-primary"
                    }`}
                  >
                    <span>{section.title}</span>
                    {/* Hinweis auf die Unterkategorien, ohne eigene Einträge in der Leiste */}
                    {jumpSubsections(section).length ? (
                      <span className="mt-0.5 block text-xs font-normal leading-snug text-text-muted/80 [@media(max-height:760px)]:hidden">
                        {jumpSubsections(section)
                          .map((sub) => sub.title)
                          .join(" · ")}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
