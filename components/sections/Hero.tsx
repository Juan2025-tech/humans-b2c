import Image from "next/image";
import { IMAGES } from "@/content/images.config";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">

      {/* ── IMAGEN DE FONDO ───────────────────────────────────── */}
      <Image
        src={IMAGES.hero.src}
        alt={IMAGES.hero.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── OVERLAY oscuro para legibilidad ──────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg/80 pointer-events-none" />

      {/* ── CONTENIDO superpuesto ────────────────────────────── */}
      <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          La tranquilidad de saber que está bien.
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
          HUMANS monitoriza los signos vitales de tu familiar de forma continua y te avisa si algo cambia — antes de que los síntomas sean evidentes.
        </p>

      </div>
    </section>
  );
}
