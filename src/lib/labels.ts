// Kennzeichnung laut Speisekarte: Zusatzstoffe als Zahlen, Allergene als Buchstaben

export type Label = { code: string; label: string };

export const additives: Label[] = [
  { code: "1", label: "mit Farbstoff" },
  { code: "2", label: "koffeinhaltig" },
  { code: "3", label: "chininhaltig" },
  { code: "4", label: "mit Konservierungsstoffen" },
  { code: "5", label: "mit Antioxidationsmittel" },
  { code: "6", label: "mit Süßungsmittel" },
  { code: "7", label: "taurinhaltig" },
  { code: "8", label: "geschwärzt" },
  { code: "9", label: "geschwefelt" },
  { code: "11", label: "mit Geschmacksverstärker" },
  { code: "12", label: "hergestellt aus fein zerkleinertem Fleisch" },
  { code: "13", label: "enthält eine Phenylalaninquelle" },
  { code: "14", label: "mit Stickoxydul" },
];

export const allergens: Label[] = [
  { code: "A", label: "Glutenhaltiges Getreide (Weizen, Mehl, Austernsauce, Sojasauce)" },
  { code: "B", label: "Erdnüsse und Erdnussprodukte" },
  { code: "C", label: "Nüsse (Cashewnüsse)" },
  { code: "D", label: "Soja (Sojasprossen, Sojabohnen, Sojasauce, Austernsauce, Tofu)" },
  { code: "E", label: "Sesam, Sesamöl" },
  { code: "F", label: "Eier" },
  { code: "G", label: "Milch" },
  { code: "H", label: "Sellerie" },
  { code: "I", label: "Weichtiere (Tintenfisch, Fischsauce)" },
  { code: "J", label: "Schalen- / Krustentiere (Garnelen)" },
  { code: "K", label: "Fisch" },
  { code: "L", label: "Lupine" },
  { code: "M", label: "Schwefeldioxid und Sulfit" },
];

/** "A, D, E" bzw. "1, 11" → passende Einträge in der Reihenfolge der Angabe */
export function resolveCodes(codes: string): Label[] {
  const all = [...additives, ...allergens];
  return codes
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .map((code) => all.find((l) => l.code === code) ?? { code, label: "" });
}
