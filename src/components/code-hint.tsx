"use client";

import { useEffect, useRef, useState } from "react";
import { resolveCodes } from "@/lib/labels";

const POPOVER_WIDTH = 272; // entspricht max-w-[17rem]
const EDGE = 12; // Mindestabstand zum Bildschirmrand

/**
 * Hochgestellte Kennzeichnung (z. B. "A, D, E" oder "1, 11") mit Erklärung direkt am Gericht:
 * - Maus: öffnet beim Darüberfahren, schließt beim Verlassen.
 * - Touch/Tastatur: öffnet und schließt per Antippen bzw. Enter.
 * - Schließt außerdem bei Tippen daneben, Esc und beim Scrollen.
 */
export function CodeHint({ codes, className }: { codes: string; className: string }) {
  const [open, setOpen] = useState(false);
  // Verschiebung der Sprechblase nach links, damit sie vollständig im Bild bleibt
  const [shiftLeft, setShiftLeft] = useState(0);
  const rootRef = useRef<HTMLSpanElement>(null);
  // Per Hover geöffnet: der folgende Klick soll die Erklärung nicht gleich wieder schließen
  const openedByHover = useRef(false);
  const items = resolveCodes(codes);

  const show = () => {
    // Ragt die Sprechblase rechts aus dem Bild, so weit nach links schieben wie nötig, aber nie über den linken Rand
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const width = Math.min(POPOVER_WIDTH, document.documentElement.clientWidth - 2 * EDGE);
      const overflowRight = rect.left + width - (document.documentElement.clientWidth - EDGE);
      setShiftLeft(Math.max(0, Math.min(overflowRight, rect.left - EDGE)));
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => {
      openedByHover.current = false;
      setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  return (
    <span
      ref={rootRef}
      className="relative"
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          openedByHover.current = false;
          setOpen(false);
        }
      }}
    >
      <sup className={className}>
        <button
          type="button"
          aria-expanded={open}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse" && !open) {
              openedByHover.current = true;
              show();
            }
          }}
          onClick={() => {
            if (openedByHover.current) {
              openedByHover.current = false;
              return;
            }
            if (open) setOpen(false);
            else show();
          }}
          // <sup> hat line-height 0; eigene Zeilenhöhe plus unsichtbar vergrößerte Tippfläche (after:-inset-2)
          className="relative cursor-help leading-[1.2] underline decoration-dotted decoration-1 underline-offset-2 after:absolute after:-inset-2 after:content-['']"
        >
          {codes}
        </button>
      </sup>

      {open && (
        <span
          role="tooltip"
          style={{ left: -shiftLeft }}
          className="absolute top-full z-40 mt-1 flex w-max max-w-[min(17rem,calc(100vw-1.5rem))] flex-col gap-1 rounded-xl border border-border bg-surface p-2.5 text-left font-sans text-xs font-normal normal-case leading-snug tracking-normal text-text shadow-lg"
        >
          {items.map((item) => {
            const isAdditive = /^\d+$/.test(item.code);
            return (
              <span key={item.code} className="flex items-start gap-2">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center text-[11px] font-bold ${
                    isAdditive
                      ? "rounded-full border border-accent-wine/30 bg-surface text-accent-wine"
                      : "rounded-md border border-border bg-cream text-text-muted"
                  }`}
                >
                  {item.code}
                </span>
                <span className="pt-0.5">{item.label || "ohne Angabe"}</span>
              </span>
            );
          })}
        </span>
      )}
    </span>
  );
}
