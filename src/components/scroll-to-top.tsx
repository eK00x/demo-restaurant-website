"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  // Um so viele Pixel wird der Button angehoben, wie der Footer ins Bild ragt – er verdeckt so nie die Footer-Links
  const [lift, setLift] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Sichtbar ab ca. 450px Scrolltiefe
      setVisible(window.scrollY > 450);
      const footer = document.querySelector("body > footer, body footer:last-of-type");
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
      setLift(Math.max(0, window.innerHeight - footerTop));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      style={{ transform: `translateY(-${lift}px)` }}
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-accent-gold/40 bg-black/25 text-accent-gold shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:border-accent-gold hover:bg-black/35 hover:scale-105 active:scale-90 focus:outline-hidden focus:ring-2 focus:ring-accent-gold/50 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
