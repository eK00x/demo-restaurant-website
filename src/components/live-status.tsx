"use client";

import { useEffect, useState } from "react";

export interface StatusInfo {
  isOpen: boolean;
  status: "open" | "closing-soon" | "closed";
  badgeText: string;
  subText: string;
}

export function getOpenStatus(): StatusInfo {
  // Aktuelle Zeit in der Zeitzone Berlin ermitteln
  const now = new Date();
  const berlinTimeStr = now.toLocaleString("en-US", { timeZone: "Europe/Berlin" });
  const berlinDate = new Date(berlinTimeStr);

  const day = berlinDate.getDay(); // 0 = So, 1 = Mo, 2 = Di, 3 = Mi, 4 = Do, 5 = Fr, 6 = Sa
  const hours = berlinDate.getHours();
  const minutes = berlinDate.getMinutes();
  const currentTime = hours + minutes / 60;

  // Ruhetage: Montag (1) und Dienstag (2)
  if (day === 1) {
    return {
      isOpen: false,
      status: "closed",
      badgeText: "Montag Ruhetag",
      subText: "Mittwoch ab 12:00 Uhr wieder geöffnet",
    };
  }

  if (day === 2) {
    return {
      isOpen: false,
      status: "closed",
      badgeText: "Dienstag Ruhetag",
      subText: "Mittwoch ab 12:00 Uhr wieder geöffnet",
    };
  }

  // Mittwoch bis Sonntag: 12:00 – 22:00 Uhr (Küche bis 21:00 Uhr)
  if (currentTime < 12) {
    return {
      isOpen: false,
      status: "closed",
      badgeText: "Öffnet um 12:00 Uhr",
      subText: "Heute ab 12:00 Uhr geöffnet",
    };
  }

  if (currentTime >= 12 && currentTime < 21) {
    return {
      isOpen: true,
      status: "open",
      badgeText: "Jetzt geöffnet",
      subText: "Bis 22:00 Uhr geöffnet (Küche 21:00)",
    };
  }

  if (currentTime >= 21 && currentTime < 22) {
    return {
      isOpen: true,
      status: "closing-soon",
      badgeText: "Schließt bald (22:00)",
      subText: "Küche ab 21:00 Uhr beendet",
    };
  }

  // Nach 22:00 Uhr
  return {
    isOpen: false,
    status: "closed",
    badgeText: "Geschlossen",
    subText:
      day === 0 // Sonntagabend -> Mo & Di Ruhetag -> Mittwoch wieder auf
        ? "Mittwoch ab 12:00 Uhr wieder geöffnet"
        : "Morgen ab 12:00 Uhr wieder geöffnet",
  };
}

export function LiveStatusBadge({
  compact = false,
  variant = "light",
  showSubText = false,
  align = "left",
}: {
  compact?: boolean;
  variant?: "light" | "dark";
  showSubText?: boolean;
  align?: "left" | "center" | "right";
}) {
  const [status, setStatus] = useState<StatusInfo | null>(null);

  // Der Status hängt von der aktuellen Uhrzeit ab und wird daher erst im Browser berechnet (sonst Hydration-Fehler).
  // Erste Berechnung im nächsten Frame statt direkt im Effekt, danach jede Minute.
  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    const frame = requestAnimationFrame(update);
    const interval = setInterval(update, 60000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  const alignmentClass =
    align === "right"
      ? "items-end text-right"
      : align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  // SSR-Platzhalter mit neutralem Design
  if (!status) {
    if (showSubText) {
      return (
        <div className={`flex flex-col ${alignmentClass} shrink-0 font-sans`}>
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3 py-1 text-xs font-semibold whitespace-nowrap ${
              variant === "dark"
                ? "border border-white/20 bg-black/25 text-white/80"
                : "border border-gold/30 bg-surface text-fg/70"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-accent-gold/60 shrink-0" />
            <span className="whitespace-nowrap">Öffnungszeiten</span>
          </div>
          <span className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] text-white/70 whitespace-nowrap font-sans font-medium">
            Mi–So ab 12:00 Uhr
          </span>
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap ${
          variant === "dark"
            ? "border border-white/20 bg-black/25 text-white/80"
            : "border border-gold/30 bg-surface text-fg/70"
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-accent-gold/60 shrink-0" />
        <span className="whitespace-nowrap">Öffnungszeiten</span>
      </div>
    );
  }

  const isGreen = status.status === "open";
  const isAmber = status.status === "closing-soon" || status.badgeText.includes("Öffnet");

  if (compact) {
    if (variant === "dark") {
      return (
        <div className={`flex flex-col ${alignmentClass} shrink-0 font-sans`}>
          <div
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shadow-xs shrink-0"
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
            }}
            title={status.subText}
          >
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                isGreen
                  ? "bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400"
                  : isAmber
                  ? "bg-amber-400"
                  : "bg-white/40"
              }`}
            />
            <span className="whitespace-nowrap">{status.badgeText}</span>
          </div>
          {showSubText ? (
            <span className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] text-white/85 whitespace-nowrap font-sans font-medium tracking-tight">
              {status.subText}
            </span>
          ) : null}
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all shadow-2xs shrink-0 ${
          isGreen
            ? "border border-emerald-500/35 bg-emerald-500/10 text-emerald-800"
            : isAmber
            ? "border border-amber-500/35 bg-amber-500/10 text-amber-800"
            : "border border-zinc-400/35 bg-zinc-200/60 text-fg/75"
        }`}
        title={status.subText}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full shrink-0 ${
            isGreen
              ? "bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500"
              : isAmber
              ? "bg-amber-500"
              : "bg-zinc-400"
          }`}
        />
        <span className="whitespace-nowrap">{status.badgeText}</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold tracking-wide uppercase ${
          isGreen
            ? "border border-emerald-600/30 bg-emerald-600/15 text-emerald-900 shadow-2xs"
            : isAmber
            ? "border border-amber-600/30 bg-amber-600/15 text-amber-900 shadow-2xs"
            : "border border-zinc-400/40 bg-black/5 text-fg/75 shadow-2xs"
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isGreen
              ? "bg-emerald-600 animate-pulse shadow-sm shadow-emerald-600/50"
              : isAmber
              ? "bg-amber-600"
              : "bg-zinc-500"
          }`}
        />
        <span>{status.badgeText}</span>
      </div>
      <p className="text-xs font-medium text-fg/75">{status.subText}</p>
    </div>
  );
}
