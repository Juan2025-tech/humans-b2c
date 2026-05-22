"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema, PARA_QUIEN_OPTIONS, type WaitlistInput } from "@/lib/validations";
import { WaitlistCounter } from "@/components/shared/WaitlistCounter";
import { readStoredUTM } from "@/lib/utm";


export function WaitlistForm() {
  const [done,      setDone]      = useState(false);
  const [position,  setPosition]  = useState<number | null>(null);
  const [serverErr, setServerErr] = useState("");

  // Lee el plan pre-seleccionado desde la URL (viene de Pricing)
  const [planInteres, setPlanInteres] = useState<string | undefined>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan   = params.get("plan");
    if (plan) setPlanInteres(plan);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
  });

  const paraQuienVal = watch("para_quien");
  const esCuidador   = paraQuienVal === "soy_cuidador";

  async function onSubmit(data: WaitlistInput) {
    setServerErr("");
    const utm = readStoredUTM();
    try {
      const res  = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          plan_interes: planInteres,
          fuente:       utm.fuente,
          utm_medium:   utm.utm_medium,
          utm_campaign: utm.utm_campaign,
        }),
      });
      const json = (await res.json()) as { success?: boolean; position?: number; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Error al procesar tu solicitud");
      setPosition(json.position ?? null);
      setDone(true);
    } catch (err) {
      setServerErr(err instanceof Error ? err.message : "Algo fue mal. Inténtalo de nuevo.");
    }
  }

  return (
    <section id="lista-espera" className="bg-gradient-to-br from-slate-900 to-slate-700 py-20 sm:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6">

        {!done ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Sé de los primeros en acceder.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                El acceso inicial es limitado. Regístrate ahora y te avisamos en cuanto tu plaza esté disponible.
              </p>
              <p className="text-xs text-slate-500 mt-3">
                🔒 Sin tarjeta de crédito · Sin compromiso · Datos en Europa
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-dark-elevated rounded-2xl border border-dark-border p-6 sm:p-7 flex flex-col gap-4"
            >
              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Tu nombre <span className="text-clinical-critical">*</span>
                </label>
                <input
                  {...register("nombre")}
                  placeholder="Ana García"
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
                  placeholder="ana@email.com"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
                />
                {errors.email && (
                  <p className="text-clinical-critical text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Para quién */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  ¿Para quién buscas HUMANS?{" "}
                  <span className="text-clinical-critical">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PARA_QUIEN_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue("para_quien", opt.value, { shouldValidate: true })}
                      className={[
                        "flex items-center gap-2 text-sm px-4 py-3 rounded-xl border transition-all text-left",
                        paraQuienVal === opt.value
                          ? "border-brand-primary bg-brand-primary/10 text-white font-semibold"
                          : "border-dark-border text-slate-300 hover:border-brand-primary/50",
                      ].join(" ")}
                    >
                      <span className="text-base">{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                {errors.para_quien && (
                  <p className="text-clinical-critical text-xs mt-1">Selecciona una opción</p>
                )}
              </div>

              {/* Teléfono — solo para cuidadores */}
              {esCuidador && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-1.5">
                    Teléfono{" "}
                    <span className="text-slate-500 font-normal">(opcional)</span>
                  </label>
                  <input
                    {...register("telefono")}
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
              )}

              {/* RGPD */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  {...register("rgpd")}
                  type="checkbox"
                  className="mt-0.5 accent-brand-primary"
                />
                <span className="text-xs text-slate-400 leading-relaxed">
                  Acepto la{" "}
                  <a href="/privacidad" className="text-brand-link hover:underline" target="_blank">
                    política de privacidad
                  </a>{" "}
                  y el tratamiento de mis datos para gestionar la lista de espera.
                  <span className="text-clinical-critical"> *</span>
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
                className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors text-base mt-1"
              >
                {isSubmitting ? "Reservando…" : "Reservar mi plaza →"}
              </button>

              <div className="text-center">
                <WaitlistCounter className="text-xs text-slate-500" />
              </div>
            </form>
          </>
        ) : (
          /* Post-submit */
          <div className="bg-dark-elevated rounded-2xl border border-dark-border p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Reserva confirmada!</h3>
            {position && (
              <p className="text-slate-400 mb-1">
                Eres el número{" "}
                <span className="text-brand-secondary font-bold text-lg">#{position}</span>.
              </p>
            )}
            <p className="text-slate-400 text-sm leading-relaxed">
              Te escribiremos lo antes posible para darte toda la información necesaria. Sin tarjeta de crédito, sin compromiso.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
