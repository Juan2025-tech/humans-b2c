"use client";

import { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/content/images.config";
import { PARA_QUIEN_OPTIONS } from "@/lib/validations";
import { WaitlistCounter } from "@/components/shared/WaitlistCounter";
import { readStoredUTM } from "@/lib/utm";

type Step = "email" | "profile" | "done";

const WHATSAPP_TEXT = encodeURIComponent(
  "He reservado mi plaza en HUMANS, el sistema de monitorización de signos vitales para el hogar. Si cuidas a alguien, échale un vistazo: https://humans-tech.com",
);
const LINKEDIN_URL = encodeURIComponent("https://humans-tech.com");

export function Hero() {
  const [step,      setStep]      = useState<Step>("email");
  const [email,     setEmail]     = useState("");
  const [emailErr,  setEmailErr]  = useState("");
  const [paraQuien, setParaQuien] = useState("");
  const [rgpd,      setRgpd]      = useState(false);
  const [rgpdErr,   setRgpdErr]   = useState("");
  const [position,  setPosition]  = useState<number | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  /* ── Paso 1: validar email y avanzar ───────────────────── */
  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailErr("Escribe un email válido");
      return;
    }
    setEmailErr("");
    setStep("profile");
  }

  /* ── Paso 2: submit completo ────────────────────────────── */
  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!paraQuien) return;
    if (!rgpd) { setRgpdErr("Debes aceptar la política de privacidad"); return; }
    setRgpdErr("");
    setLoading(true);
    setError("");

    const utm = readStoredUTM();
    try {
      const res  = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:       email.split("@")[0],
          email:        email.trim(),
          para_quien:   paraQuien,
          rgpd:         true,
          fuente:       utm.fuente,
          utm_medium:   utm.utm_medium,
          utm_campaign: utm.utm_campaign,
        }),
      });
      const data = (await res.json()) as { success?: boolean; position?: number; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Error desconocido");
      setPosition(data.position ?? null);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo fue mal. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

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
        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
          HUMANS monitoriza los signos vitales de tu familiar de forma continua y te avisa si algo cambia — antes de que los síntomas sean evidentes.
        </p>

        {/* ── FORMULARIO MULTI-PASO ─────────────────────────── */}
        <div id="hero-form" className="bg-dark-card/80 backdrop-blur-md rounded-2xl border border-dark-border p-6 sm:p-7 text-left">

          {/* PASO 1 — email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} noValidate>
              <label className="block text-sm font-semibold text-white mb-2">
                Tu email
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 bg-dark-elevated border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-brand-primary hover:bg-brand-hover text-white font-semibold px-5 py-3 rounded-xl transition-colors"
                >
                  Apuntarme →
                </button>
              </div>
              {emailErr && (
                <p className="text-clinical-critical text-xs mt-2">{emailErr}</p>
              )}
              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                <span>🔒 Sin tarjeta · Datos en EU</span>
                <WaitlistCounter className="text-slate-400" />
              </div>
            </form>
          )}

          {/* PASO 2 — perfil */}
          {step === "profile" && (
            <form onSubmit={handleConfirm} noValidate>
              <p className="text-white font-semibold mb-1">¡Casi! Una pregunta más:</p>
              <p className="text-slate-400 text-sm mb-4">
                ¿Para quién buscas HUMANS?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {PARA_QUIEN_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setParaQuien(opt.value)}
                    className={[
                      "flex items-center gap-2 text-sm px-4 py-3 rounded-xl border transition-all text-left",
                      paraQuien === opt.value
                        ? "border-brand-primary bg-brand-primary/10 text-white font-semibold"
                        : "border-dark-border text-slate-300 hover:border-brand-primary/50",
                    ].join(" ")}
                  >
                    <span className="text-base">{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>

              <label className="flex items-start gap-2 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={rgpd}
                  onChange={(e) => setRgpd(e.target.checked)}
                  className="mt-0.5 accent-brand-primary"
                />
                <span className="text-xs text-slate-400 leading-relaxed">
                  Acepto la{" "}
                  <a href="/privacidad" className="text-brand-link hover:underline" target="_blank">
                    política de privacidad
                  </a>
                </span>
              </label>
              {rgpdErr && (
                <p className="text-clinical-critical text-xs mb-3">{rgpdErr}</p>
              )}
              {error && (
                <p className="text-clinical-critical text-xs mb-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={!paraQuien || loading}
                className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {loading ? "Confirmando…" : "Confirmar mi plaza →"}
              </button>
            </form>
          )}

          {/* PASO 3 — confirmación */}
          {step === "done" && (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">✓</div>
              <h3 className="text-white font-bold text-lg mb-1">
                ¡Reserva confirmada!
              </h3>
              {position && (
                <p className="text-slate-400 text-sm mb-1">
                  Eres el número{" "}
                  <span className="text-brand-secondary font-bold">#{position}</span>{" "}
                  en la lista.
                </p>
              )}
              <p className="text-slate-400 text-sm mb-5">
                Te escribiremos a{" "}
                <span className="text-white">{email}</span> cuando tu acceso esté listo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/?text=${WHATSAPP_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-social-whatsapp hover:bg-social-whatsapp-hover text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Compartir en WhatsApp
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${LINKEDIN_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-social-linkedin hover:bg-social-linkedin-hover text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Compartir en LinkedIn
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
