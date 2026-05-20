"use client";

function scrollToWaitlist() {
  if (typeof window === "undefined") return;
  document.getElementById("lista-espera")?.scrollIntoView({ behavior: "smooth" });
}

const ROWS = [
  {
    title:    "Cuando tu familiar vive lejos",
    pain:     "¿Tu padre o madre está solo en casa? ¿No sabes cómo está hasta que llama?",
    solution: "HUMANS te avisa si algo cambia en sus constantes, estés donde estés.",
    cta:      "Quiero monitorizar a mi familiar →",
  },
  {
    title:    "Cuando cuidas en el día a día",
    pain:     "Cuidas a diario pero no puedes estar pendiente cada minuto. Actúas cuando ya es evidente.",
    solution: "Una alerta a tu móvil antes de que el problema llegue a urgencias.",
    cta:      "Quiero actuar antes →",
  },
  {
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
          <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
            Para cualquier familia que no quiere actuar tarde.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {ROWS.map((row) => (
            <div
              key={row.title}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 bg-gradient-to-r from-[#0f1f5c]/60 to-[#0a3570]/50 backdrop-blur-sm rounded-2xl border-l-4 border-[#00b4d8] px-6 py-6 hover:from-[#0f1f5c]/70 hover:to-[#0a3570]/65 transition-all group"
            >
              <h3 className="text-base font-bold text-white sm:w-56 shrink-0">
                {row.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed sm:flex-1">
                {row.pain}
              </p>
              <p className="text-sm text-[#90e0ef] font-medium leading-relaxed sm:flex-1">
                {row.solution}
              </p>
              <button
                onClick={scrollToWaitlist}
                className="text-sm font-semibold text-white/90 hover:text-white underline underline-offset-2 text-left sm:text-right shrink-0 transition-colors"
              >
                {row.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
