"use client";

import Image from "next/image";
import { IMAGES } from "@/content/images.config";

function scrollToWaitlist() {
  if (typeof window === "undefined") return;
  document.getElementById("lista-espera")?.scrollIntoView({ behavior: "smooth" });
}

const CARDS = [
  {
    image:    IMAGES.usecase_family,
    title:    "Cuando tu familiar vive lejos",
    pain:     "¿Tu padre o madre está solo en casa? ¿No sabes cómo está hasta que llama?",
    solution: "HUMANS te avisa si algo cambia en sus constantes, estés donde estés.",
    cta:      "Quiero monitorizar a mi familiar →",
  },
  {
    image:    IMAGES.usecase_elderly,
    title:    "Cuando cuidas en el día a día",
    pain:     "Cuidas a diario pero no puedes estar pendiente cada minuto. Actúas cuando ya es evidente.",
    solution: "Una alerta a tu móvil antes de que el problema llegue a urgencias.",
    cta:      "Quiero actuar antes →",
  },
  {
    image:    IMAGES.usecase_caregiver,
    title:    "Cuando eres cuidador profesional",
    pain:     "Atiendes a varias personas. No puedes estar en todos los sitios a la vez.",
    solution: "Un panel con el estado de todos tus pacientes. Alertas priorizadas.",
    cta:      "Quiero saber más →",
  },
];

export function ForWhom() {
  return (
    <section id="para-quien" className="bg-gradient-to-br from-[#023e8a] to-[#0096c7] py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ¿Para quién es HUMANS?
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
            Para cualquier familia que no quiere actuar tarde.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col bg-dark-elevated rounded-2xl overflow-hidden border border-dark-border hover:border-brand-primary/50 transition-colors group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image.placeholder}
                  alt={card.image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                  {card.pain}
                </p>
                <p className="text-sm text-brand-secondary font-medium mb-5 leading-relaxed">
                  {card.solution}
                </p>
                <button
                  onClick={scrollToWaitlist}
                  className="mt-auto text-sm font-semibold text-brand-link hover:text-white underline underline-offset-2 text-left transition-colors"
                >
                  {card.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
