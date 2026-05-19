import Image from "next/image";
import { IMAGES } from "@/content/images.config";

const PARAMS = [
  { label: "SpO2",       desc: "Saturación de oxígeno",    color: "text-brand-secondary", border: "border-brand-secondary/30", bg: "bg-brand-secondary/10" },
  { label: "FC",         desc: "Frecuencia cardíaca",      color: "text-clinical-critical", border: "border-clinical-critical/30", bg: "bg-clinical-critical/10" },
  { label: "PI",         desc: "Índice de perfusión",      color: "text-clinical-normal", border: "border-clinical-normal/30", bg: "bg-clinical-normal/10" },
  { label: "Tendencias", desc: "IA detecta cambios antes", color: "text-ai",              border: "border-ai/30",              bg: "bg-ai/10" },
];

const SUB_SECTIONS = [
  {
    image:    IMAGES.device,
    title:    "Pequeño. Inalámbrico. De precisión clínica.",
    text:     "El biosensor PPG mide de forma continua sin molestar a tu familiar. Funciona mientras duerme, descansa o realiza su vida normal.",
    badge:    null,
    reverse:  false,
  },
  {
    image:    IMAGES.dashboard,
    title:    "Todo visible de un vistazo.",
    text:     "Accede al estado de tu familiar desde cualquier dispositivo — móvil, tablet u ordenador. Historial, tendencias y alertas en un panel claro.",
    badge:    null,
    reverse:  true,
  },
  {
    image:    IMAGES.ai_report,
    title:    "Informes que entiende cualquiera.",
    text:     "Cada semana recibes un informe generado por IA con lo más importante: el estado general, los momentos destacados y qué llevar al médico.",
    badge:    "Powered by Motor Hortensia · IA clínica de HUMANS",
    reverse:  false,
  },
];

export function Product() {
  return (
    <section id="el-producto" className="bg-gradient-to-br from-[#240046] to-[#5a189a] py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            El producto
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-xl mx-auto">
            Monitorización continua de los parámetros que importan.
          </p>
        </div>

        {/* Parámetros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {PARAMS.map((p) => (
            <div
              key={p.label}
              className={`rounded-xl p-5 border text-center ${p.bg} ${p.border}`}
            >
              <p className={`text-2xl font-extrabold ${p.color}`}>{p.label}</p>
              <p className="text-xs text-slate-300 mt-1 leading-snug">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Sub-secciones */}
        <div className="flex flex-col gap-20">
          {SUB_SECTIONS.map((s) => (
            <div
              key={s.title}
              className={[
                "flex flex-col md:flex-row items-center gap-8 md:gap-12",
                s.reverse ? "md:flex-row-reverse" : "",
              ].join(" ")}
            >
              <div className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden bg-dark-card border border-dark-border">
                <Image
                  src={s.image.placeholder}
                  alt={s.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-4">{s.text}</p>
                {s.badge && (
                  <span className="inline-block text-xs font-semibold text-ai border border-ai/30 bg-ai/10 px-3 py-1.5 rounded-full">
                    {s.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
