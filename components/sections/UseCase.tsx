import Image from "next/image";
import { IMAGES } from "@/content/images.config";

export function UseCase() {
  return (
    <section id="caso-de-uso" className="bg-gradient-to-br from-[#0d0118] via-[#1a0533] to-[#2d0a5e] py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Cabecera */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Un caso real. Datos reales.<br className="hidden sm:block" /> Una familia que pudo actuar a tiempo.
          </h2>
        </div>

        {/* Narrativa */}
        <div className="space-y-5 text-white/75 text-base leading-relaxed mb-10">
          <p>
            Las infecciones de orina en personas mayores son traicioneras: no siempre dan fiebre,
            no siempre se quejan. Cuando los síntomas se hacen visibles, el cuerpo lleva horas
            —o días— luchando solo.
          </p>
          <p>
            HUMANS estaba monitorizando a un paciente de 76 años cuando, durante la tarde del
            18 de febrero, su corazón empezó a acelerar mientras su oxígeno en sangre caía.
            Esa combinación tiene nombre: el cuerpo pidiéndole al corazón que bombee más fuerte
            para compensar lo que le falta. Una señal de alarma silenciosa que ninguna revisión
            manual habría capturado a tiempo.
          </p>
          <p>
            A las 21:07 h del 19 de febrero, el oxígeno llegó a niveles críticos. HUMANS generó
            un informe completo en menos de 2 minutos. Diagnóstico posterior: infección de orina
            derivada en sepsis con ingreso hospitalario.
          </p>
          <p>
            Y cuando el antibiótico empezó a funcionar, los datos también lo confirmaron: el
            corazón fue bajando, el oxígeno se estabilizó. La familia no tuvo que adivinar.
            Los números lo decían.
          </p>
        </div>

        {/* Dato destacado */}
        <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-center mb-10">
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            32.433 mediciones en 4 días.
          </p>
          <p className="mt-1 text-white/60 text-sm">
            Sin despertar al paciente una sola vez.
          </p>
        </div>

        {/* Imagen del caso real */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-10">
          <Image
            src={IMAGES.usecase_real.src}
            alt={IMAGES.usecase_real.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Testimonio */}
        <blockquote className="border-l-4 border-white/30 pl-5">
          <p className="text-white/85 text-base italic leading-relaxed">
            "El sistema detectó el deterioro y generó un informe médico sin que tuviéramos
            que hacer nada. Es transformador."
          </p>
          <footer className="mt-3 text-white/50 text-xs font-medium not-italic">
            — Profesional sanitario, ensayo clínico Feb. 2026
          </footer>
        </blockquote>

      </div>
    </section>
  );
}
