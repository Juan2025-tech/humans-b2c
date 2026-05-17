import { TESTIMONIALS } from "@/content/testimonials.config";

// Sección vacía hasta tener testimonios reales.
// Cuando TESTIMONIALS.length > 0 se activa automáticamente.
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="bg-dark-card py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-12">
          Lo que dicen quienes ya nos conocen
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.nombre}
              className="bg-dark-elevated rounded-2xl p-6 border border-dark-border"
            >
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                &ldquo;{t.texto}&rdquo;
              </p>
              <div>
                <p className="text-white font-semibold text-sm">{t.nombre}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.perfil}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
