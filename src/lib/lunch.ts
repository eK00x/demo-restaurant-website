import type { MenuItem, MenuSection } from "./menu";

// Gilt für Vorspeisen und Desserts; steht als Untertext direkt bei diesen Kategorien
const withMainNote = "Preise gelten nur in Verbindung mit einem Hauptgericht.";

// Beispieldaten für die Demo
export const lunchStarters: MenuItem[] = [
  { name: "Miso-Suppe", price: "2,50 €", allergens: "D" },
  { name: "Mini-Frühlingsrollen", price: "2,90 €", allergens: "A, D" },
];

export const lunchMains: MenuItem[] = [
  {
    name: "Gebratene Nudeln",
    note: "Bestseller",
    description: "Mit Gemüse und wahlweise Huhn oder Tofu",
    price: "9,50 €",
    allergens: "A, D",
  },
  {
    name: "Huhn süß-sauer",
    description: "Mit Ananas, Paprika und Reis",
    price: "9,90 €",
    allergens: "A, D",
  },
  {
    name: "Rotes Curry",
    description: "Mit Gemüse, Kokosmilch und Reis, wahlweise Huhn oder Tofu",
    price: "9,90 €",
    allergens: "D",
    spicy: 1,
  },
];

export const lunchDesserts: MenuItem[] = [
  { name: "Gebackene Banane", description: "Mit Honig", price: "3,50 €", allergens: "A, F" },
  { name: "Grüntee-Eis", description: "Eine Kugel", price: "2,50 €", allergens: "G" },
];

export const lunchSections: MenuSection[] = [
  {
    id: "vorspeisen",
    title: "Vorspeisen",
    intro: withMainNote,
    items: lunchStarters,
  },
  {
    id: "hauptgerichte",
    title: "Hauptgerichte",
    items: lunchMains,
  },
  {
    id: "desserts",
    title: "Desserts",
    intro: withMainNote,
    items: lunchDesserts,
  },
];
