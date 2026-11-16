"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LiveStatusBadge } from "@/components/live-status";

interface NavItem {
  href: string;
  label: string;
}

const nav: NavItem[] = [
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/mittagsangebote", label: "Mittagsangebote" },
  { href: "/getraenke", label: "Getränke" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        style={{ height: "var(--header-h)", backgroundColor: "#0D5C46" }}
        className={`sticky top-0 z-50 h-[75px] lg:h-[100px] min-h-[75px] lg:min-h-[100px] w-full transition-colors duration-300 border-b bg-[#0D5C46] ${
          scrolled
            ? "border-accent-gold/25 shadow-md shadow-black/20"
            : "border-accent-gold/15"
        }`}
      >
        <div className="flex h-full min-h-[75px] lg:min-h-[100px] w-full items-center justify-between px-6 sm:px-8 lg:px-12 py-1.5 lg:py-2">
          {/* Links: Goldenes Logo mit transparentem Hintergrund auf Smaragdgrün */}
          <Link
            href="/"
            className="group flex items-center transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0"
            aria-label="Jade Lotus - Zur Startseite"
          >
            <Image
              src="/images/logo-gold.png"
              alt="Jade Lotus (Demo-Logo)"
              width={826}
              height={560}
              className="h-[43px] sm:h-[47px] lg:h-[53px] w-auto object-contain block drop-shadow-sm"
              priority
            />
          </Link>

          {/* Navigation Desktop: Weiß (rgba(255,255,255,0.9)), Hover in Altgold #C59B27 */}
          <nav className="hidden items-center gap-[1.75em] xl:gap-[2.25em] lg:flex font-sans" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-1.5 text-[1.08rem] leading-[1.4] tracking-normal font-medium whitespace-nowrap transition-colors duration-200 ${
                    active
                      ? "text-accent-gold underline underline-offset-6 decoration-1 decoration-accent-gold font-bold"
                      : "text-white/90 hover:text-accent-gold hover:underline underline-offset-6 decoration-1 decoration-accent-gold/50"
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}

            {/* Status-Badge: Dezent abgedunkelter, transparenter Pill-Container */}
            <div className="flex items-center shrink-0 ml-1">
              <LiveStatusBadge compact variant="dark" />
            </div>

            {/* Header-Button „Tisch reservieren“: Fester Altgold-Hintergrund #C59B27 mit dunkler Schrift #1B221E */}
            <Link
              href="/kontakt#reservieren"
              className="inline-flex items-center justify-center rounded-full bg-accent-gold px-5 py-2.5 text-sm font-bold text-[#1B221E] shadow-sm transition-all duration-200 hover:bg-accent-gold-hover hover:scale-105 active:scale-95 ml-2"
            >
              Tisch reservieren
            </Link>
          </nav>

          {/* Rechts Mobil: Live-Status + Hamburger Menü */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <LiveStatusBadge compact variant="dark" />

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200 hover:border-accent-gold hover:text-accent-gold hover:bg-white/10 active:scale-95"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">Menü öffnen</span>
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span className={`h-px w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`h-px w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                <span className={`h-px w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Off-Canvas Drawer (Mobil) mit Backdrop Blur */}
      {open ? (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        id="mobile-nav"
        style={{ backgroundColor: "#0D5C46" }}
        className={`fixed top-0 right-0 bottom-0 z-55 w-full max-w-xs sm:max-w-sm bg-[#0D5C46] border-l border-accent-gold/25 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out lg:hidden text-white ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-label="Mobile Navigation"
      >
        <div>
          {/* Schließen-Button oben rechts */}
          <div className="flex items-center justify-end pb-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white/80 hover:text-accent-gold hover:bg-white/10 transition-colors"
              aria-label="Menü schließen"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="mt-2 flex flex-col gap-1.5 font-sans">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[1.08rem] transition-all duration-200 ${
                      active
                        ? "bg-black/25 font-bold text-accent-gold shadow-2xs border border-accent-gold/30"
                        : "text-white/90 hover:text-accent-gold hover:bg-white/5 hover:pl-5"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-accent-gold/20 pt-6 space-y-4">
          <div className="text-xs text-white/70 space-y-1">
            <p className="font-bold text-accent-gold">Musterstraße 1 · 10115 Berlin</p>
            <p>Mi–So: 12:00–22:00 Uhr · Mo & Di Ruhetag</p>
          </div>
          <Link
            href="/kontakt#reservieren"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-accent-gold py-3 px-4 text-base font-bold text-[#1B221E] shadow-sm transition-all active:scale-95 hover:bg-accent-gold-hover font-sans"
          >
            <span>Tisch reservieren</span>
          </Link>
        </div>
      </div>
    </>
  );
}
