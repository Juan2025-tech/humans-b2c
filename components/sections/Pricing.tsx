"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Plan = "mensual" | "anual";

const PLANS = [
  {
    id:        "basico",
    name:      "Básico",
    monthly:   19,
    annual:    190,
    featured:  false,
    features:  [
      "1 paciente",
      "SpO2 + frecuencia cardíaca",
      "Alertas por email",
      "Historial 30 días",
    ],
  },
  {
    id:        "familiar",
    name:      "Familiar",
    monthly:   39,
    annual:    390,
    featured:  true,
    features:  [
      "Hasta 3 pacientes",
      "Todo lo del plan Básico",
      "Informes IA semanales",
      "Alertas WhatsApp",
      "Historial 90 días",
    ],
  },
  {
    id:        "pro",
    name:      "Pro Cuidador",
    monthly:   79,
    annual:    790,
    featured:  false,
    features:  [
      "Hasta 10 pacientes",
      "Todo lo del plan Familiar",
      "Dashboard central",
      "PDF para el médico",
      "Acceso API",
    ],
  },
];

function scrollToWaitlist(planId?: string) {
  const el = document.getElementById("lista-espera");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
  // Pasa el plan como query param para pre-seleccionarlo en el form
  if (planId) {
    history.pushState(null, "", `?plan=${planId}`);
  }
}

export function Pricing() {
  const [billing, setBilling] = useState<Plan>("mensual");

  return (
    <section id="precios" className="bg-dark-card py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Precios orientativos
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">
            Precios para el lanzamiento. Sin tarjeta de crédito hasta que tu plaza esté disponible.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-6 bg-dark-elevated rounded-full p-1 border border-dark-border">
            {(["mensual", "anual"] as Plan[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={[
                  "px-4 py-1.5 rounded-full text-sm font-semibold transition-colors capitalize",
                  billing === b
                    ? "bg-brand-primary text-white"
                    : "text-slate-400 hover:text-white",
                ].join(" ")}
              >
                {b === "anual" ? "Anual (ahorra 2 meses)" : "Mensual"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const price = billing === "mensual" ? plan.monthly : plan.annual;
            const period = billing === "mensual" ? "/mes" : "/año";

            return (
              <div
                key={plan.id}
                className={[
                  "relative flex flex-col rounded-2xl p-6 border transition-all",
                  plan.featured
                    ? "bg-brand-primary/10 border-brand-primary shadow-lg shadow-brand-primary/10 scale-[1.02]"
                    : "bg-dark-elevated border-dark-border",
                ].join(" ")}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                )}

                <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{price}€</span>
                  <span className="text-slate-400 text-sm pb-1">{period}</span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={15} className="text-clinical-normal shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToWaitlist(plan.id)}
                  className={[
                    "w-full py-2.5 rounded-xl text-sm font-semibold transition-colors",
                    plan.featured
                      ? "bg-brand-primary hover:bg-brand-hover text-white"
                      : "bg-dark-bg hover:bg-dark-elevated text-white border border-dark-border",
                  ].join(" ")}
                >
                  Reservar plaza
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
