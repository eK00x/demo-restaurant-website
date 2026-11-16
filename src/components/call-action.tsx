import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function PhoneIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

/**
 * Anruf-Aktion je nach Gerät:
 * - Touch-Geräte (Handy, Tablet): Button, der direkt anruft.
 * - Maus-Geräte (Laptop, Desktop): Nummer als gut lesbarer, markierbarer Text, da ein Telefon-Link dort meist ins Leere führt.
 * Unterschieden wird über die Art der Bedienung (pointer: coarse), nicht über die Bildschirmbreite.
 */
export function CallAction({
  children,
  buttonClassName,
  textLabel,
  textClassName,
}: {
  /** Inhalt des Buttons (Symbol und Beschriftung) */
  children: ReactNode;
  buttonClassName: string;
  /** Text vor der Nummer, z. B. „Telefonisch vorbestellen“; leer lassen für nur die Nummer */
  textLabel?: string;
  textClassName: string;
}) {
  return (
    <>
      <span className="hidden pointer-coarse:contents">
        <a href={site.phoneHref} className={buttonClassName}>
          {children}
        </a>
      </span>
      <span className="contents pointer-coarse:hidden">
        <p className={`inline-flex items-center gap-2.5 ${textClassName}`}>
          <PhoneIcon className="h-5 w-5 shrink-0" />
          <span>
            {textLabel ? `${textLabel}: ` : null}
            <span className="whitespace-nowrap font-bold select-all">{site.phone}</span>
          </span>
        </p>
      </span>
    </>
  );
}
