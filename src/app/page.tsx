import type { Metadata } from "next";
import { BentoGrid } from "@/components/bento-grid";
import { CallAction, PhoneIcon } from "@/components/call-action";
import { HeroCarousel } from "@/components/hero-carousel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // Ort im Titel: wichtig für lokale Suchen wie „asiatisches Restaurant Berlin“
  title: { absolute: `${site.name} · Asiatisches Restaurant (Demo)` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Modernes Bento-Grid: Peking-Ente, Live-Öffnungszeiten, Mittagsangebote & Gruppen */}
      <BentoGrid />

      <section className="relative overflow-hidden border-t border-accent-gold/20 bg-bg py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-primary via-primary to-[#062c21] p-6 sm:p-10 lg:p-12 text-white shadow-xl text-center border border-accent-gold/30 max-sm:from-[#06352a] max-sm:via-[#04251d] max-sm:to-[#021710] max-sm:border-2 max-sm:border-accent-gold/80 max-sm:shadow-black/40">
            {/* Atmosphärische Licht-Aura */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent-gold/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-serif text-2xl font-normal tracking-tight sm:text-3xl lg:text-4xl text-white">
                Tisch reservieren
              </h2>
              <p className="mx-auto mt-2.5 max-w-lg text-sm sm:text-base leading-relaxed text-white/90 font-sans">
                Reservierungen bitte telefonisch.
                <br />
                Wir freuen uns auf euren Besuch in der Musterstraße.
              </p>
              <div className="mt-6 flex justify-center">
                <CallAction
                  buttonClassName="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent-gold px-4.5 py-2.5 sm:px-7 sm:py-3.5 text-sm sm:text-base font-bold text-text shadow-md transition-all duration-300 hover:bg-[#d6aa32] hover:scale-105 active:scale-95 hover:shadow-xl"
                  textLabel="Telefonisch reservieren"
                  textClassName="font-sans text-base text-white sm:text-lg"
                >
                  <PhoneIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="whitespace-nowrap">
                    <span className="sm:hidden">Reservieren: </span>
                    <span className="hidden sm:inline">Jetzt reservieren: </span>
                    <span className="font-mono">{site.phone}</span>
                  </span>
                </CallAction>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
