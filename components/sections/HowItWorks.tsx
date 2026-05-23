import Image from "next/image";
import { IMAGES } from "@/content/images.config";

const STEPS = [
  {
    number: "01",
    title: "El dispositivo mide",
    highlight: undefined as string | undefined,
    image: IMAGES.device,
    text: "El biosensor registra continuamente saturación de oxígeno periférica SpO₂, frecuencia cardíaca e índice de perfusión. Inalámbrico, pequeño, no invasivo.",
  },
  {
    number: "02",
    title: "La IA Hortensia analiza",
    highlight: "Hortensia" as string | undefined,
    image: IMAGES.ai_report,
    text: "Nuestro motor de inteligencia artificial detecta patrones, anticipa deterioro y genera alertas antes de que los síntomas sean evidentes.",
  },
  {
    number: "03",
    title: "Tú decides",
    highlight: undefined as string | undefined,
    image: IMAGES.dashboard,
    text: "Consultas informes en lenguaje claro. Actúas con datos objetivos en la mano.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-dark-bg py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Cómo funciona HUMANS
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
            Tres pasos entre la medición y tu tranquilidad.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {STEPS.map((step, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={step.number}
                className={[
                  "flex flex-col md:flex-row items-center gap-8 md:gap-12",
                  reverse ? "md:flex-row-reverse" : "",
                ].join(" ")}
              >
                {/* Image */}
                <div className="w-full md:w-2/5 rounded-2xl overflow-hidden bg-dark-card border border-dark-border">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="w-full h-auto"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary/40 mb-4">
                    <span className="text-brand-secondary font-extrabold text-lg">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.highlight
                      ? step.title.split(step.highlight).flatMap((part, i, arr) =>
                          i < arr.length - 1
                            ? [part, <span key={i} className="text-ai">{step.highlight}</span>]
                            : [part]
                        )
                      : step.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
