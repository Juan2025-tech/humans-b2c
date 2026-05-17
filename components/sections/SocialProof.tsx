const METRICS = [
  {
    value: "+38.000",
    label: "mediciones validadas",
    description: "en entornos reales",
  },
  {
    value: "97.6%",
    label: "tasa de transmisión",
    description: "exitosa",
  },
  {
    value: "< 30 seg",
    label: "latencia de alerta",
    description: "desde la medición",
  },
  {
    value: "Detección",
    label: "anticipada",
    description: "antes de síntomas visibles",
  },
];

export function SocialProof() {
  return (
    <section className="bg-gradient-to-b from-brand-primary to-white py-14 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-dark-elevated rounded-xl p-5 text-center border border-dark-border"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-brand-secondary leading-none mb-1">
                {m.value}
              </p>
              <p className="text-sm font-semibold text-white leading-tight">
                {m.label}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{m.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-400 text-sm">
          Tecnología validada en centros sociosanitarios españoles.
        </p>
      </div>
    </section>
  );
}
