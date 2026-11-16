"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

const slides = [
  {
    src: "/images/hero-1.jpg",
    alt: "Platzhalterbild: Gastraum",
  },
  {
    src: "/images/hero-2.jpg",
    alt: "Gastraum mit traditionellen geschnitzten chinesischen Holzelementen und Deckenmalerei",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "Platzhalterbild: Abendstimmung",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Automatischer Bildwechsel alle 5 Sekunden
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative isolate min-h-[calc(100svh-var(--header-h))] overflow-hidden select-none"
      aria-roledescription="carousel"
      aria-label="Impressionen aus dem Restaurant Jade Lotus"
    >
      {/* 1. Hintergrundbilder mit sanftem Crossfade-Übergang & Ken-Burns-Effekt */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className={`object-cover transition-transform duration-[6500ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* 2. Dunkler Verlauf über den Bildern laut Vorgabe (Smaragdgrün zu tiefem Schwarz) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13, 92, 70, 0.45), rgba(0, 0, 0, 0.65))",
        }}
      />

      {/* 3. Text-Inhalt & Typografie */}
      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-h))] max-w-6xl flex-col justify-center items-center text-center sm:items-start sm:text-left px-4 py-16 sm:px-6 z-20 pointer-events-auto">
        <h1 className="max-w-3xl font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.08] text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
          {site.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg sm:text-xl leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-serif">
          Asiatische Küche mit frischen Zutaten und Zeit für gute Gerichte –
          ein fiktives Restaurant als Demo-Projekt.
        </p>
      </div>

      {/* 4. Diskrete moderne Slide-Rhythmus-Leiste am unteren Rand */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-1.5 px-4 sm:px-6 max-w-6xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="group/bar flex-1 py-3.5 focus:outline-none"
          >
            <span
              className={`block h-1 rounded-full transition-all duration-500 ${
                idx === current
                  ? "bg-sand shadow-sm shadow-gold/50"
                  : "bg-white/30 group-hover/bar:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
