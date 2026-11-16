import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import { baseUrl, isPreviewDeploy, site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Nur für Preise und Nummern (siehe globals.css: --font-mono)
const spaceMono = localFont({
  variable: "--font-space-mono",
  src: [
    { path: "../../public/fonts/SpaceMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/SpaceMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  // Basis für absolute URLs (Canonical, Vorschaubild beim Teilen)
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // Vorschau-Deploys (*.netlify.app) nicht in Suchmaschinen aufnehmen
  robots: isPreviewDeploy ? { index: false, follow: false } : undefined,
  // Vorschau beim Teilen (WhatsApp, Facebook …); das Bild liefert app/opengraph-image.jpg
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: `${site.name} · Asiatisches Restaurant (Demo)`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/opengraph-image.jpg`,
  telephone: "+49 30 1234567",
  email: site.email,
  servesCuisine: ["Chinesisch", "Asiatisch"],
  priceRange: "€€",
  acceptsReservations: "True",
  menu: `${site.url}/speisekarte`,
  foundingDate: "2005",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "22:00",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-text">
        {/* Strukturierte Restaurant-Daten für Google (Adresse, Öffnungszeiten, Telefon, Speisekarte) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
