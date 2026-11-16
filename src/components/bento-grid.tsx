"use client";

export function BentoGrid() {
  return (
    <section className="border-b border-accent-gold/20 bg-bg py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* 3 Boxen nebeneinander in einer Reihe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* BOX 1: Peking-Ente & Wok */}
          <article className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface px-3.5 sm:px-6 py-6 sm:py-7 shadow-sm flex items-center justify-center text-center min-h-[90px] sm:min-h-[105px]">
            {/* Sanfter warmer Schimmer */}
            <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-accent-gold/15 blur-2xl pointer-events-none" />

            <h2 className="font-serif text-[clamp(1rem,4.2vw,1.125rem)] md:text-[0.92rem] lg:text-[1.125rem] xl:text-[1.28rem] 2xl:text-2xl font-bold tracking-tight text-primary whitespace-nowrap">
              Peking-Ente & Wok-Spezialitäten
            </h2>
          </article>

          {/* BOX 2: Gastraum & Terrasse */}
          <article className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface px-3.5 sm:px-6 py-6 sm:py-7 shadow-sm flex items-center justify-center text-center min-h-[90px] sm:min-h-[105px]">
            <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-accent-gold/10 blur-xl pointer-events-none" />

            <h2 className="font-serif text-[clamp(1rem,4.2vw,1.125rem)] md:text-[0.92rem] lg:text-[1.125rem] xl:text-[1.28rem] 2xl:text-2xl font-bold tracking-tight text-primary whitespace-nowrap">
              Gastraum & Terrasse
            </h2>
          </article>

          {/* BOX 3: Feiern & Gruppen */}
          <article className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface px-3.5 sm:px-6 py-6 sm:py-7 shadow-sm flex items-center justify-center text-center min-h-[90px] sm:min-h-[105px]">
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-gold/15 blur-2xl pointer-events-none" />

            <h2 className="font-serif text-[clamp(1rem,4.2vw,1.125rem)] md:text-[0.92rem] lg:text-[1.125rem] xl:text-[1.28rem] 2xl:text-2xl font-bold tracking-tight text-primary whitespace-nowrap">
              Feiern & Gruppen
            </h2>
          </article>
        </div>
      </div>
    </section>
  );
}
