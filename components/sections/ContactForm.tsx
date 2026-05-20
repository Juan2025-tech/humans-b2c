"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const [done,      setDone]      = useState(false);
  const [serverErr, setServerErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setServerErr("");
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Error al enviar el mensaje");
      setDone(true);
    } catch (err) {
      setServerErr(err instanceof Error ? err.message : "Algo fue mal. Inténtalo de nuevo.");
    }
  }

  return (
    <section id="contacto" className="bg-dark-card py-20 sm:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ¿Tienes alguna pregunta?
          </h2>
        </div>

        {!done ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-gradient-to-br from-brand-mid to-[#0891b2] rounded-2xl border border-brand-primary/30 p-6 sm:p-7 flex flex-col gap-4"
          >
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Nombre <span className="text-clinical-critical">*</span>
              </label>
              <input
                {...register("nombre")}
                placeholder="Tu nombre"
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
              />
              {errors.nombre && (
                <p className="text-clinical-critical text-xs mt-1">{errors.nombre.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Email <span className="text-clinical-critical">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
              />
              {errors.email && (
                <p className="text-clinical-critical text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Mensaje <span className="text-clinical-critical">*</span>
              </label>
              <textarea
                {...register("mensaje")}
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors resize-none"
              />
              {errors.mensaje && (
                <p className="text-clinical-critical text-xs mt-1">{errors.mensaje.message}</p>
              )}
            </div>

            {/* RGPD */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                {...register("rgpd")}
                type="checkbox"
                className="mt-0.5 accent-brand-primary"
              />
              <span className="text-xs text-white leading-relaxed">
                Acepto la{" "}
                <a href="/privacidad" className="text-white underline hover:text-white/80" target="_blank">
                  política de privacidad
                </a>
                <span className="text-white"> *</span>
              </span>
            </label>
            {errors.rgpd && (
              <p className="text-clinical-critical text-xs -mt-2">{errors.rgpd.message}</p>
            )}

            {serverErr && (
              <p className="text-clinical-critical text-sm text-center">{serverErr}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
            >
              {isSubmitting ? "Enviando…" : "Enviar mensaje"}
            </button>
          </form>
        ) : (
          <div className="bg-dark-elevated rounded-2xl border border-dark-border p-8 text-center">
            <div className="text-4xl mb-3">✉️</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Mensaje recibido
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Te respondemos lo antes posible. También puedes escribirnos directamente a{" "}
              <a href="mailto:info@humans-tech.com" className="text-brand-link hover:underline">
                info@humans-tech.com
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
