import type { MenuItem, MenuSection } from "./menu";

/** Kurzform für Getränke, die in zwei Größen angeboten werden. */
const sizes = (
  name: string,
  small: string,
  large: string,
  prices: string,
  additives?: string
): MenuItem => ({
  name,
  size: `${small} / ${large}`,
  price: prices,
  ...(additives ? { additives } : {}),
});

// Beispieldaten für die Demo
export const drinkSections: MenuSection[] = [
  {
    id: "cocktails",
    title: "Cocktails",
    subsections: [
      {
        id: "cocktails-alkohol",
        title: "Mit Alkohol",
        items: [
          { name: "Mai Tai", description: "Rum, Orangenlikör, Limette, Mandelsirup", price: "9,50 €" },
          { name: "Lychee Spritz", description: "Lycheelikör, Prosecco, Soda", price: "8,50 €", allergens: "M" },
        ],
      },
      {
        id: "cocktails-alkoholfrei",
        title: "Alkoholfrei",
        items: [
          { name: "Virgin Colada", note: "Fruchtig", description: "Ananas, Kokos, Sahne", price: "6,50 €", allergens: "G" },
          { name: "Ginger Lemonade", note: "Scharf und fruchtig", description: "Ingwer, Limette, Soda", price: "5,50 €" },
        ],
      },
    ],
  },
  {
    id: "softdrinks",
    title: "Softdrinks & Wasser",
    items: [
      sizes("Cola", "0,2 l", "0,4 l", "3,00 € / 4,50 €", "2"),
      sizes("Apfelschorle", "0,2 l", "0,4 l", "3,00 € / 4,50 €"),
      sizes("Mineralwasser", "0,25 l", "0,75 l", "2,80 € / 6,50 €"),
    ],
  },
  {
    id: "tee-kaffee",
    title: "Tee & Kaffee",
    items: [
      { name: "Jasmintee", size: "Kännchen", price: "4,50 €" },
      { name: "Grüner Tee", size: "Kännchen", price: "4,50 €" },
      { name: "Espresso", price: "2,50 €" },
    ],
  },
  {
    id: "bier-wein",
    title: "Bier & Wein",
    items: [
      sizes("Pils vom Fass", "0,3 l", "0,5 l", "3,50 € / 5,00 €"),
      { name: "Tsingtao", size: "0,33 l", price: "4,50 €", allergens: "A" },
      { name: "Weißwein, trocken", size: "0,2 l", price: "6,00 €", allergens: "M" },
    ],
  },
];
