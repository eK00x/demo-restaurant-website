import React from "react";

interface MenuDisclaimerProps {
  type: "food" | "lunch" | "drinks";
}

/**
 * Gesetzliche Preishinweise am Ende der Karte.
 * Zusatzstoffe und Allergene erklären die Kürzel direkt am Gericht (CodeHint).
 */
export function MenuDisclaimer({ type }: MenuDisclaimerProps) {
  return (
    <div className="mt-8 border-t border-border pt-3 text-sm text-text-muted text-center sm:text-left max-sm:border-white/20">
      <p className="text-sm font-semibold text-text max-sm:text-white sm:text-base">
        Alle Preise in Euro inkl. gesetzlicher MwSt. und Service.
      </p>
      <p className="mt-0.5 text-sm text-text-muted max-sm:text-white/75">
        Irrtümer und Druckfehler vorbehalten.
        {type === "lunch" && " Mittagsangebote gelten nicht an gesetzlichen Feiertagen."}
      </p>
    </div>
  );
}
