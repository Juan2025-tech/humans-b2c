import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import "./globals.css";
import { IMAGES } from "@/content/images.config";

const geist = GeistSans;

const SITE_URL = process.env.NEXTAUTH_URL ?? "https://humans-tech.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HUMANS — Monitorización médica inteligente para el hogar",
    template: "%s | HUMANS",
  },
  description:
    "HUMANS monitoriza los signos vitales de tu familiar de forma continua y te avisa si algo cambia — antes de que los síntomas sean evidentes. Únete a la lista de espera.",
  keywords: [
    "monitorización signos vitales", "cuidado familiar", "pulsioxímetro",
    "saturación de oxígeno periférica SpO₂", "frecuencia cardíaca", "alerta médica hogar",
  ],
  authors: [{ name: "HUMANS" }],
  robots: { index: true, follow: true },
  openGraph: {
    type:        "website",
    locale:      "es_ES",
    url:         SITE_URL,
    siteName:    "HUMANS",
    title:       "HUMANS — Monitorización médica inteligente para el hogar",
    description: "Detecta antes de que los síntomas sean visibles. Acceso limitado — únete a la lista de espera.",
    images: [
      {
        url:    IMAGES.og.placeholder,
        width:  1200,
        height: 630,
        alt:    IMAGES.og.alt,
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "HUMANS — Monitorización médica inteligente para el hogar",
    description: "Detecta antes de que los síntomas sean visibles.",
    images:      [IMAGES.og.placeholder],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-dark-bg text-text-primary">
        {children}
      </body>
    </html>
  );
}
