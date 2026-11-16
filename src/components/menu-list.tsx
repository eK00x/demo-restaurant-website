"use client";

import { CallAction, PhoneIcon } from "@/components/call-action";
import { CodeHint } from "@/components/code-hint";
import { jumpSubsections, type MenuItem, type MenuSection } from "@/lib/menu";
import { site } from "@/lib/site";

// Sprung-Chips zu den Unterkategorien, z. B. Huhn · Rind · Ente kross · Schwein
export function SubsectionJumpChips({ section }: { section: MenuSection }) {
  const subs = jumpSubsections(section);
  if (!subs.length) return null;
  return (
    <nav aria-label={`${section.title}: Unterkategorien`} className="-mt-2 mb-2 flex flex-wrap justify-center sm:justify-start gap-2">
      {subs.map((sub) => (
        <a
          key={sub.id}
          href={`#${sub.id}`}
          className="rounded-full border border-border bg-cream px-3.5 py-1.5 font-sans text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          {sub.title}
        </a>
      ))}
    </nav>
  );
}

export function ChiliBadge({ count = 1, className = "ml-2" }: { count?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 align-middle ${className}`}
      title={count > 1 ? `${count}x scharf` : "Pikant / scharf"}
    >
      {Array.from({ length: count }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src="/images/chili.png"
          alt="Scharf"
          width={18}
          height={18}
          className="inline-block h-4.5 w-4.5 shrink-0 object-contain drop-shadow-xs"
        />
      ))}
    </span>
  );
}

function FormattedDescription({ text }: { text: string }) {
  // Findet Zusatzstoff-Referenzen wie (1), (4), (1, 11) und stellt sie ohne Klammern hoch
  const parts = text.split(/(\(\s*\d+(?:\s*,\s*\d+)*\s*\))/g);

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\(\s*(\d+(?:\s*,\s*\d+)*)\s*\)$/);
        if (match) {
          return (
            <CodeHint
              key={index}
              codes={match[1]}
              className="mx-0.5 text-[11px] font-bold text-accent-wine"
            />
          );
        }
        return part;
      })}
    </>
  );
}

// Allergen-Kennbuchstaben wie "A, D, E" hochgestellt und ohne Klammern
function AllergenSup({ codes }: { codes: string }) {
  return (
    <CodeHint
      codes={codes}
      className="ml-1 font-sans text-[11px] font-semibold tracking-tight whitespace-nowrap text-text-muted"
    />
  );
}

function NoteBadge({ note, className }: { note: string; className: string }) {
  return (
    <span
      className={`shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-accent-wine px-2 py-[2px] text-[0.68rem] font-semibold uppercase tracking-[0.04em] text-white shadow-xs font-sans animate-badge-pulse ${className}`}
    >
      <span>★</span>
      <span>{note}</span>
    </span>
  );
}

export function MenuItemRow({ item }: { item: MenuItem }) {
  // Wenn item.size nicht explizit gesetzt ist, prüfen wir, ob description eine reine Größenangabe (wie "0,2 L / 0,4 L") ist
  const isDescriptionPureSize =
    !item.size &&
    Boolean(
      item.description &&
        /^(\d+([,\.]\d+)?\s*(L|cl|ml|Glas|Kännchen))(\s*\/\s*\d+([,\.]\d+)?\s*(L|cl|ml))?$/i.test(
          item.description.trim()
        )
    );

  const displaySize = item.size || (isDescriptionPureSize ? item.description : undefined);
  const displayDescription = isDescriptionPureSize ? undefined : item.description;

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────
          A) Handy (< sm): Zentrierter Aufbau
             1. Zeile: Banner (links falls vorh.) | Nr. (Mitte) | Chili(s) (rechts falls vorh.)
             2. Zeile: Gerichtetitel zentriert
             3. Zeile: Gerichtebeschreibung zentriert
             4. Zeile: Preis zentriert
         ────────────────────────────────────────────────────────────────── */}
      <article className={`sm:hidden group relative py-3.5 ${item.number ? "px-14" : "px-3"} rounded-2xl transition-all duration-200 border-b border-primary/20 [&:nth-last-child(2)]:border-b-0 text-center hover:bg-[#EBF1ED]/60`}>
        {/* Nummerierung der Speise: Links mittig im gesamten Gerichte-Item mit sicherem Abstand */}
        {item.number ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs sm:text-sm font-bold text-accent-wine select-text tracking-tight">
            {item.number}
          </span>
        ) : null}

        {/* 1. Zeile: Banner (und Chili nur wenn Banner vorhanden) zentriert */}
        {item.note ? (
          <div className="flex items-center justify-center gap-2 mb-1.5 flex-wrap">
            <NoteBadge note={item.note} className="inline-flex" />
            {item.spicy ? (
              <ChiliBadge count={item.spicy} className="" />
            ) : null}
          </div>
        ) : null}

        {/* 2. Zeile: Gerichtetitel mit Zusatzstoffen & Allergenen (und Chili(s) rechts nach dem Titel, wenn kein Banner vorhanden) */}
        <h3 className="font-serif text-lg font-bold leading-snug tracking-tight text-text transition-colors duration-200 group-hover:text-primary">
          {item.name}
          {item.additives ? (
            <CodeHint
              codes={item.additives}
              className="ml-1 text-xs font-bold text-accent-wine tracking-tight font-sans"
            />
          ) : null}
          {item.allergens && !displayDescription ? <AllergenSup codes={item.allergens} /> : null}
          {!item.note && item.spicy ? (
            <ChiliBadge count={item.spicy} className="ml-1.5 inline-flex" />
          ) : null}
        </h3>

        {/* 3. Zeile: Gerichtebeschreibung */}
        {displayDescription ? (
          <p className="mt-1 font-sans text-[0.9375rem] leading-[1.5] text-text/85">
            <FormattedDescription text={displayDescription} />
            {item.allergens ? <AllergenSup codes={item.allergens} /> : null}
          </p>
        ) : null}

        {/* 4. Zeile: Preis zentriert */}
        {item.price ? (
          <div className="mt-1.5 flex flex-col items-center">
            <span className="whitespace-nowrap font-mono text-base font-bold text-accent-gold leading-snug">
              {item.price}
            </span>
            {displaySize ? (
              <span className="font-mono text-xs font-semibold text-text-muted">
                {displaySize}
              </span>
            ) : null}
          </div>
        ) : null}
      </article>

      {/* ──────────────────────────────────────────────────────────────────
          B) Desktop (>= sm): Gewohntes linksbündiges Tabellen-Layout
         ────────────────────────────────────────────────────────────────── */}
      <article className="hidden sm:block group -mx-2.5 sm:-mx-3 px-2.5 sm:px-3 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 border-b border-border/70 last:border-b-0 hover:bg-[#EBF1ED]/60">
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2 min-w-0">
            {item.number ? (
              <span className="font-mono text-base font-bold text-accent-wine shrink-0">
                {item.number}
              </span>
            ) : null}
            <div className="flex min-w-0 items-baseline sm:gap-2.5">
              <h3 className="min-w-0 font-serif text-lg font-bold leading-snug sm:font-semibold tracking-tight text-text sm:text-xl transition-colors duration-200 group-hover:text-primary">
                {item.name}
                {item.additives ? (
                  <CodeHint
                    codes={item.additives}
                    className="ml-1 text-xs font-bold text-accent-wine tracking-tight font-sans"
                  />
                ) : null}
                {/* Ohne Beschreibung stehen die Allergene direkt am Namen */}
                {item.allergens && !displayDescription ? <AllergenSup codes={item.allergens} /> : null}
                {item.spicy ? <ChiliBadge count={item.spicy} /> : null}
              </h3>
              {item.note ? <NoteBadge note={item.note} className="hidden sm:inline-flex sm:-translate-y-[3px]" /> : null}
            </div>
          </div>
          {item.price ? (
            <>
              <span className="mx-2 hidden flex-1 border-b border-dotted border-border sm:block transition-colors group-hover:border-primary/30" />
              <div className="flex flex-col items-end shrink-0">
                <span className="whitespace-nowrap font-mono text-base font-bold text-accent-gold sm:text-xl leading-snug transition-transform duration-200 origin-right group-hover:scale-105">
                  {item.price}
                </span>
                {displaySize ? (
                  <span className="font-mono text-xs font-semibold text-text-muted">
                    {displaySize}
                  </span>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
        {displayDescription ? (
          <p className="mt-1 font-sans text-[0.9375rem] leading-[1.5] text-text/85 sm:text-base">
            <FormattedDescription text={displayDescription} />
            {item.allergens ? <AllergenSup codes={item.allergens} /> : null}
          </p>
        ) : null}
      </article>
    </>
  );
}

function MenuItemsGrid({ items, sectionId }: { items: MenuItem[]; sectionId: string }) {
  if (items.length <= 2) {
    return (
      <div className="max-w-2xl">
        {items.map((item) => (
          <MenuItemRow key={`${sectionId}-${item.number ?? item.name}`} item={item} />
        ))}
      </div>
    );
  }

  const half = Math.ceil(items.length / 2);
  const col1 = items.slice(0, half);
  const col2 = items.slice(half);

  return (
    <div className="grid grid-cols-1 items-start">
      <div>
        {col1.map((item) => (
          <MenuItemRow key={`${sectionId}-${item.number ?? item.name}`} item={item} />
        ))}
      </div>
      <div>
        {col2.map((item) => (
          <MenuItemRow key={`${sectionId}-${item.number ?? item.name}`} item={item} />
        ))}
      </div>
    </div>
  );
}

const goldCode = "text-xs text-accent-gold font-bold whitespace-nowrap";

// Ein Gang im Festmenü: Markierung auf der Zeitleiste, Bezeichnung in Gold, darunter das Gericht
function Course({ label, last = false, children }: { label: string; last?: boolean; children: React.ReactNode }) {
  return (
    <li className={`relative pl-8 sm:pl-10 ${last ? "" : "pb-7 sm:pb-8"}`}>
      {last ? null : <span aria-hidden className="absolute left-[7px] top-5 bottom-0 w-px bg-accent-gold/35" />}
      <span aria-hidden className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-accent-gold bg-[#083a2c]" />
      <p className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent-gold">{label}</p>
      <div className="mt-1.5">{children}</div>
    </li>
  );
}

/**
 * Peking-Ente als Aushängeschild, aufgebaut wie die Seite in der gedruckten Karte:
 * oben Titel und Vorbestell-Hinweis, in der Mitte die vier Gänge, unten Preis und Anruf zum Vorbestellen.
 */
export function PekingEnteCard() {
  return (
    <article className="relative rounded-3xl border-2 border-accent-gold/60 bg-gradient-to-br from-primary via-[#083a2c] to-[#041a14] max-sm:from-[#06352a] max-sm:via-[#04251d] max-sm:to-[#021710] max-sm:border-accent-gold/90 max-sm:shadow-black/40 px-5 py-8 sm:px-10 sm:py-12 text-white shadow-2xl">
      {/* Edle goldene Lichtreflexe im Hintergrund; nur diese Ebene schneidet ab, damit Allergen-Erklärungen nicht abgeschnitten werden */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent-gold/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Kopf: Titel und Vorbestell-Hinweis */}
        <div className="text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-accent-gold sm:text-xs">
            ★ Traditionelles Festmenü ★
          </p>
          <h2 className="mt-3 font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl">
            Peking-Ente
          </h2>
          <p className="mt-2 font-serif text-lg text-white/85 sm:text-xl">für 2 Personen · 4 Gänge (Beispielmenü)</p>
          <p className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-accent-gold/60 bg-accent-gold/15 px-4 py-2 font-sans text-sm font-semibold text-accent-gold">
            <svg aria-hidden className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
            </svg>
            Bitte einen Tag im Voraus vorbestellen
          </p>
        </div>

        {/* Die vier Gänge als Zeitleiste */}
        <ol className="mx-auto mt-10 max-w-2xl">
          <Course label="Vorsuppe">
            <p className="font-serif text-lg text-white sm:text-xl">
              <span className="whitespace-nowrap">Miso-Suppe</span> <CodeHint codes="D" className={goldCode} />
              <span className="mx-2 font-sans text-sm italic text-white/60">oder</span>
              <span className="whitespace-nowrap">Wan-Tan-Suppe</span> <CodeHint codes="A, D" className={goldCode} />
            </p>
          </Course>

          <Course label="1. Gang">
            <p className="font-serif text-lg text-white sm:text-xl">
              Peking-Ente nach klassischer Art <CodeHint codes="A, D, E" className={goldCode} />, tranchiert
            </p>
            <p className="mt-1 font-sans text-[0.9375rem] text-white/80 sm:text-base">
              mit Pfannkuchen, Hoisin-Sauce, Gurke und Frühlingszwiebeln
            </p>
          </Course>

          <Course label="2. Gang · zur Wahl">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="border-l-2 border-accent-gold/40 pl-3">
                <p className="font-serif text-lg text-white sm:text-xl">
                  Ente mit Gemüse <CodeHint codes="A, D, E" className={goldCode} />
                </p>
                <p className="mt-1 font-sans text-[0.9375rem] text-white/80 sm:text-base">
                  Entenfleisch mit Wokgemüse in Knoblauchsauce
                </p>
              </div>
              <div className="border-l-2 border-accent-gold/40 pl-3">
                <p className="font-serif text-lg text-white sm:text-xl">
                  Ente süß-sauer <CodeHint codes="A, D, E" className={goldCode} />
                </p>
                <p className="mt-1 font-sans text-[0.9375rem] text-white/80 sm:text-base">
                  Entenfleisch mit Ananas, Paprika und Zwiebeln
                </p>
              </div>
            </div>
          </Course>

          <Course label="Dessert" last>
            <p className="font-serif text-lg text-white sm:text-xl">
              Gebackene Banane <CodeHint codes="A, E, F" className={goldCode} />
            </p>
            <p className="mt-1 font-sans text-[0.9375rem] text-white/80 sm:text-base">
              mit Honig und Sesam
            </p>
          </Course>
        </ol>

        {/* Fuß: Preis und Vorbestellung per Anruf */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 border-t border-accent-gold/30 pt-8 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-mono text-4xl font-bold text-accent-gold">36,50 €</p>
            <p className="mt-1 font-sans text-sm text-white/75">pro Person</p>
          </div>
          <CallAction
            buttonClassName="inline-flex items-center gap-2.5 rounded-full bg-accent-gold px-6 py-3 font-sans text-base font-bold text-[#1B221E] shadow-md transition-all duration-200 hover:bg-accent-gold-hover active:scale-95"
            textLabel="Telefonisch vorbestellen"
            textClassName="font-sans text-base text-accent-gold sm:text-lg"
          >
            <PhoneIcon className="h-5 w-5 shrink-0" />
            <span className="sm:hidden">Vorbestellen:</span>
            <span className="hidden sm:inline">Jetzt vorbestellen:</span>
            <span className="whitespace-nowrap">{site.phone}</span>
          </CallAction>
        </div>
      </div>
    </article>
  );
}

export function MenuSectionBlock({ section }: { section: MenuSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-36 rounded-3xl border border-border bg-surface px-4 py-6 sm:p-8 lg:p-10 shadow-[0_4px_12px_rgba(13,92,70,0.05)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(13,92,70,0.08)]"
    >
      {/* Haupttitel des Abschnitts: Slogan neben der Überschrift mit Gedankenstrich (Handy zentriert, Desktop linksbündig) */}
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

      {/* 1. Direkte Gerichte (ohne Unterkategorie) */}
      {section.items && (
        <MenuItemsGrid items={section.items} sectionId={section.id} />
      )}

      {/* 2. Unterkategorien */}
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
            <MenuItemsGrid items={sub.items} sectionId={sub.id} />
          </div>
        );
      })}
    </section>
  );
}
