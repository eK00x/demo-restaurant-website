import type { Metadata } from "next";
import { site } from "@/lib/site";
import { UeberUnsInteractive } from "@/components/ueber-uns-interactive";

export const metadata: Metadata = {
  alternates: { canonical: "/ueber-uns" },
  title: "Über uns",
  description: `Über uns – Die Geschichte und Philosophie von ${site.name} in Berlin. Ein fiktives Restaurant als Demo-Projekt.`,
};

export default function UeberUnsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* 1. Header-Bereich im einheitlichen Stil der anderen Unterseiten (Handy zentriert) */}
      <div className="mb-8 border-b border-border pb-4 max-sm:border-white/20 text-center sm:text-left">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-primary max-sm:text-white sm:text-5xl">
          Über uns
        </h1>
      </div>

      {/* 2. Interaktiver Bereich mit Geschichte & Banner */}
      <UeberUnsInteractive />
    </div>
  );
}
