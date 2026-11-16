export const site = {
  name: "Jade Lotus",
  url: "https://example.com",
  tagline: "Asiatisches Restaurant (Demo-Projekt)",
  description:
    "Fiktives Restaurant für ein Portfolio-Projekt: Wok-Gerichte, Peking-Ente und Mittagsangebote in Berlin.",
  address: {
    street: "Musterstraße 1",
    zip: "10115",
    city: "Berlin",
  },
  phone: "030 1234567",
  phoneHref: "tel:+49301234567",
  email: "kontakt@example.com",
  owner: "Max Mustermann",
  vatId: "DE000000000",
  hours: [
    { days: "Montag", time: "Ruhetag" },
    { days: "Dienstag", time: "Ruhetag" },
    { days: "Mittwoch – Sonntag", time: "12:00 – 22:00" },
    { days: "Feiertage", time: "12:00 – 22:00" },
  ],
  kitchenUntil: "Küche bis 21:00",
  lunchHours: "Mi – Fr, 12:00 – 16:00 Uhr (außer feiertags)",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Berlin",
} as const;

// Netlify setzt beim Build URL auf die Adresse der Seite. Läuft sie (noch) unter *.netlify.app,
// ist es eine Vorschau: dann für Suchmaschinen sperren, damit sie nicht mit der echten Domain konkurriert.
export const isPreviewDeploy = Boolean(process.env.URL?.includes(".netlify.app"));

// Basis für absolute URLs (Vorschaubild beim Teilen, Canonical): in der Vorschau die eigene netlify.app-Adresse,
// sonst würde WhatsApp das Bild auf der echten Domain suchen, wo es noch nicht liegt.
export const baseUrl = isPreviewDeploy && process.env.URL ? process.env.URL : site.url;
