import Image from "next/image";
import { IMAGES } from "@/content/images.config";

const PARAMS = [
  { label: "SpO2",       desc: "Saturación de oxígeno",    color: "text-brand-secondary", border: "border-brand-secondary/30", bg: "bg-brand-secondary/10" },
  { label: "FC",         desc: "Frecuencia cardíaca",      color: "text-clinical-critical", border: "border-clinical-critical/30", bg: "bg-clinical-critical/10" },
  { label: "PI",         desc: "Índice de perfusión",      color: "text-clinical-normal", border: "border-clinical-normal/30", bg: "bg-clinical-normal/10" },
  { label: "Tendencias", desc: "IA detecta cambios antes", color: "text-ai",              border: "border-ai/30",              bg: "bg-ai/10" },
];

const FEATURES = [
  {
    title: "Pequeño. Inalámbrico. De precisión clínica.",
    text:  "El biosensor PPG mide de forma continua sin molestar a tu familiar. Funciona mientras duerme, descansa o realiza su vida normal.",
    badge: null,
  },
  {
    title: "Todo visible de un vistazo.",
    text:  "Accede al estado de tu familiar desde cualquier dispositivo — móvil, tablet u ordenador. Historial, tendencias y alertas en un panel claro.",
    badge: null,
  },
  {
    title: "Informes que entiende cualquiera.",
    text:  "Cada semana recibes un informe generado por IA con lo más importante: el estado general, los momentos destacados y qué llevar al médico.",
    badge: "Powered by Motor Hortensia · IA clínica de HUMANS",
  },
];

export function Product() {
  return (
    <section id="el-producto" className="bg-gradient-to-br from-[#0f1117] to-[#1e2330] py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Cabecera */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            El producto
          </h2>
          <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
            Monitorización continua de los parámetros que importan.
          </p>
        </div>

        {/* Imagen central */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={IMAGES.product_central.src}
              alt={IMAGES.product_central.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>

        {/* Parámetros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
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

        {/* Features de texto */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/15 transition-colors"
            >
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{f.text}</p>
              {f.badge && (
                <span className="inline-block mt-4 text-xs font-semibold text-ai border border-ai/30 bg-ai/10 px-3 py-1.5 rounded-full">
                  {f.badge}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
