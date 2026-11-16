import Image from "next/image";

export function UeberUnsInteractive() {
  return (
    <div className="rounded-3xl border border-accent-gold/30 bg-surface p-6 sm:p-9 text-text shadow-md">
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Linke Seite: Nur der historische Bildausschnitt aus der Speisekarte */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full overflow-hidden rounded-2xl border border-border shadow-xs">
            <Image
              src="/images/demo-banner.jpg"
              alt="Platzhalterbild des fiktiven Restaurants Jade Lotus"
              width={1490}
              height={1070}
              className="w-full h-auto object-contain block"
              priority
            />
          </div>
        </div>

        {/* Rechte Seite: Geschichte */}
        <div className="flex flex-col space-y-6 lg:col-span-7 text-center lg:text-left">
          <div>
            <p className="font-sans text-base sm:text-lg text-text/80">
              Der Anspruch dieses (fiktiven) Restaurants in einem Satz:
            </p>
            <p className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-primary">„Jade Lotus“</p>
          </div>

          {/* Die Legende als Zitatblock */}
          <div className="rounded-2xl border-l-4 border-primary bg-cream/80 p-5 sm:p-6 shadow-2xs text-center lg:text-left">
            <p className="font-sans text-base sm:text-lg leading-relaxed text-text italic">
              „Gutes Essen braucht Zeit: frische Zutaten, bewährte Rezepte und ein Wok, der richtig heiß ist.“
            </p>
          </div>

          {/* Beliebtestes Gericht */}
          <p className="font-sans text-base sm:text-lg leading-relaxed text-text/90">
            Besonders beliebt ist die <strong className="text-accent-wine font-bold">Peking-Ente</strong>, für die Gäste immer wieder ins <strong className="text-primary font-bold">„Jade Lotus“</strong> kommen.
          </p>

          <div className="border-t border-accent-gold/30 pt-5 text-xs font-semibold uppercase tracking-wider text-accent-wine text-center lg:text-left">
            <span>Das Team</span>
          </div>
        </div>
      </div>
    </div>
  );
}
