export type MenuItem = {
  number?: string;
  name: string;
  description?: string;
  note?: string;
  price?: string;
  size?: string;
  additives?: string;
  allergens?: string;
  spicy?: number;
};

export type MenuSubSection = {
  id: string;
  title: string;
  intro?: string;
  items: MenuItem[];
};

export type MenuSection = {
  id: string;
  title: string;
  /** Kurzer Slogan, steht neben der Überschrift */
  tagline?: string;
  intro?: string;
  items?: MenuItem[];
  subsections?: MenuSubSection[];
};

/**
 * Unterkategorien, die als Sprungziele angezeigt werden (Chips in der Karte, Hinweis in der Seitenleiste).
 * Erst ab drei Unterkategorien, z. B. Fleischgerichte: Huhn, Rind, Ente kross, Schwein.
 */
export function jumpSubsections(section: Pick<MenuSection, "subsections">): MenuSubSection[] {
  const subs = section.subsections ?? [];
  return subs.length >= 3 ? subs : [];
}

// Beispieldaten für die Demo
export const menuSections: MenuSection[] = [
  {
    // Aushängeschild: eigene Showcase-Karte (PekingEnteCard), daher ohne Einträge
    id: "peking-ente",
    title: "Peking-Ente",
  },
  {
    id: "empfehlungen",
    title: "Empfehlungen",
    tagline: "Beliebt bei unseren Gästen",
    intro: "Drei Gerichte, die man bei uns probiert haben sollte. Alle Preise sind Beispielpreise.",
    items: [
      {
        number: "1",
        name: "Knusprige Ente",
        note: "Bestseller",
        description: "Mit Wokgemüse und Hoisin-Sauce",
        price: "19,50 €",
        allergens: "A, D",
      },
      {
        number: "2",
        name: "Ente in rotem Curry",
        description: "Kokosmilch, Bambus, Paprika und Thai-Basilikum",
        price: "19,90 €",
        allergens: "D",
        spicy: 1,
      },
      {
        number: "3",
        name: "Ente mit Orangensauce",
        note: "Fruchtig",
        description: "Mit gebratenem Brokkoli",
        price: "19,90 €",
        allergens: "A, D",
      },
    ],
  },
  {
    id: "suppen",
    title: "Suppen",
    items: [
      { number: "10", name: "Sauer-Scharf-Suppe", description: "Mit Tofu, Bambus und Ei", price: "4,50 €", allergens: "A, D, F", spicy: 1 },
      { number: "11", name: "Wan-Tan-Suppe", description: "Teigtaschen mit Hühnerfüllung in klarer Brühe", price: "4,90 €", allergens: "A, D" },
      { number: "12", name: "Miso-Suppe", description: "Mit Tofu, Seetang und Frühlingszwiebeln", price: "4,20 €", allergens: "D" },
    ],
  },
  {
    id: "vorspeisen",
    title: "Vorspeisen",
    tagline: "Zum Teilen",
    items: [
      { number: "20", name: "Frühlingsrollen", description: "Vier Stück mit Gemüsefüllung und Süß-Sauer-Sauce", price: "5,50 €", allergens: "A, D" },
      { number: "21", name: "Gebackene Garnelen", description: "Im Tempurateig mit Chili-Dip", price: "7,90 €", allergens: "A, F, J" },
      { number: "22", name: "Edamame", description: "Mit Meersalz", price: "4,50 €", allergens: "D" },
    ],
  },
  {
    id: "fleisch",
    title: "Fleischgerichte",
    intro: "Alle Gerichte mit Reis.",
    subsections: [
      {
        id: "huhn",
        title: "Huhn",
        items: [
          { number: "30", name: "Huhn Kung Pao", note: "Erdnussig", description: "Mit Erdnüssen, Paprika und getrockneten Chilis", price: "13,90 €", allergens: "A, B, D", spicy: 2 },
          { number: "31", name: "Huhn süß-sauer", description: "Mit Ananas, Paprika und Zwiebeln", price: "13,50 €", allergens: "A, D" },
        ],
      },
      {
        id: "rind",
        title: "Rind",
        items: [
          { number: "40", name: "Rind mit Brokkoli", description: "In Austernsauce", price: "15,90 €", allergens: "A, D" },
          { number: "41", name: "Rind Szechuan", description: "Mit Sellerie, Karotten und Szechuanpfeffer", price: "15,90 €", allergens: "A, D, H", spicy: 2 },
        ],
      },
      {
        id: "schwein",
        title: "Schwein",
        items: [
          { number: "50", name: "Schweinefleisch mit Knoblauchsauce", description: "Mit Pilzen und Frühlingszwiebeln", price: "13,90 €", allergens: "A, D" },
          { number: "51", name: "Schweinefleisch süß-sauer", description: "Knusprig gebacken, mit Ananas und Paprika", price: "13,90 €", allergens: "A, D, F" },
        ],
      },
    ],
  },
  {
    id: "garnelen",
    title: "Garnelen & Fisch",
    items: [
      { number: "60", name: "Garnelen mit Knoblauch", description: "Mit Zuckerschoten und Reis", price: "17,50 €", allergens: "A, D, J" },
      { number: "61", name: "Lachs vom Grill", description: "Mit Teriyaki-Sauce und Wokgemüse", price: "18,90 €", allergens: "A, D, E, K" },
    ],
  },
  {
    id: "nudeln",
    title: "Nudeln",
    items: [
      { number: "70", name: "Gebratene Nudeln mit Gemüse", description: "Wahlweise mit Huhn oder Tofu", price: "11,50 €", allergens: "A, D" },
      { number: "71", name: "Pad Thai", note: "Thai-Klassiker", description: "Reisnudeln mit Ei, Sojasprossen und Erdnüssen", price: "12,90 €", allergens: "B, D, F, I" },
    ],
  },
  {
    id: "reis",
    title: "Reis",
    items: [
      { number: "80", name: "Gebratener Reis mit Ei", description: "Mit Erbsen und Frühlingszwiebeln", price: "10,50 €", allergens: "D, F" },
      { number: "81", name: "Gebratener Reis mit Garnelen", price: "13,90 €", allergens: "D, F, J" },
    ],
  },
  {
    id: "vegetarisch",
    title: "Vegetarisch & Tofu",
    items: [
      { number: "90", name: "Tofu Mapo", description: "Seidentofu in würziger Bohnensauce", price: "12,50 €", allergens: "A, D", spicy: 1 },
      { number: "91", name: "Wokgemüse", description: "Saisonales Gemüse in heller Sauce", price: "11,50 €", allergens: "A, D" },
      { number: "92", name: "Grünes Curry mit Tofu", description: "Kokosmilch, Aubergine und Basilikum", price: "12,90 €", allergens: "D", spicy: 1 },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { number: "100", name: "Gebackene Banane", description: "Mit Honig und Sesam", price: "5,50 €", allergens: "A, E, F" },
      { number: "101", name: "Mango-Sorbet", note: "Mit Eis perfekt", price: "4,90 €" },
      { number: "102", name: "Grüntee-Eis", description: "Zwei Kugeln", price: "4,90 €", allergens: "G" },
    ],
  },
];
