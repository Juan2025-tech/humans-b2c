import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-brand-link hover:underline mb-8 block">
          ← Volver a inicio
        </Link>
        <h1 className="text-3xl font-extrabold mb-2">Aviso Legal</h1>
        <p className="text-slate-400 text-sm mb-8">Última actualización: mayo de 2026</p>

        <div className="text-slate-300 space-y-6 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-2">1. Titular del sitio web</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
              Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que el presente
              sitio web <strong>humans-tech.com</strong> es titularidad de:
            </p>
            <ul className="mt-3 space-y-1 list-none pl-0">
              <li><span className="text-slate-400">Denominación:</span> HUMANS</li>
              <li><span className="text-slate-400">Actividad:</span> Desarrollo de sistemas de monitorización de signos vitales para el hogar</li>
              <li><span className="text-slate-400">Correo electrónico:</span>{" "}
                <a href="mailto:info@humans-tech.com" className="text-brand-link hover:underline">
                  info@humans-tech.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">2. Objeto y ámbito de aplicación</h2>
            <p>
              El presente Aviso Legal regula el acceso y uso del sitio web humans-tech.com, así como
              los contenidos e información sobre el sistema de monitorización HUMANS, actualmente en
              fase de lista de espera previa al lanzamiento comercial. El acceso y uso del sitio implica
              la aceptación plena de las presentes condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">3. Propiedad intelectual e industrial</h2>
            <p>
              Los contenidos del sitio web —incluyendo textos, imágenes, logotipos, diseño gráfico,
              código fuente y cualquier otro elemento— son propiedad exclusiva de HUMANS o de terceros
              que han autorizado expresamente su uso, y están protegidos por la legislación española
              y europea en materia de propiedad intelectual e industrial (Real Decreto Legislativo
              1/1996 y Directiva UE 2019/790).
            </p>
            <p className="mt-2">
              Queda expresamente prohibida la reproducción total o parcial, distribución, comunicación
              pública o transformación de dichos contenidos sin autorización escrita previa.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">4. Carácter informativo del contenido</h2>
            <p>
              La información publicada en este sitio tiene carácter meramente divulgativo e informativo.{" "}
              <strong>No constituye consejo médico ni diagnóstico clínico.</strong> HUMANS no se
              responsabiliza del uso que el usuario pueda hacer de la información presentada. Para
              cualquier cuestión médica, el usuario debe consultar a un profesional sanitario cualificado.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">5. Dispositivos sanitarios</h2>
            <p>
              El sistema HUMANS integra hardware de monitorización de signos vitales. Cuando el
              producto esté disponible comercialmente, cumplirá con el Reglamento (UE) 2017/745
              sobre productos sanitarios (MDR), en la clase correspondiente a su uso previsto.
              La marca CE y el número de registro del organismo notificado serán publicados antes
              del lanzamiento.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">6. Limitación de responsabilidad</h2>
            <p>
              HUMANS no garantiza la disponibilidad continua del sitio web y no se responsabiliza
              de daños directos o indirectos derivados de su acceso, uso o imposibilidad de uso,
              ni de los errores u omisiones en los contenidos publicados. Los enlaces a sitios de
              terceros se facilitan a título informativo; HUMANS no asume responsabilidad sobre
              sus contenidos.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">7. Servicios digitales (DSA)</h2>
            <p>
              En cumplimiento del Reglamento (UE) 2022/2065 del Parlamento Europeo y del Consejo,
              de 19 de octubre de 2022, relativo a un mercado único de servicios digitales (DSA),
              HUMANS pone a disposición de los usuarios un punto de contacto único para comunicaciones
              con las autoridades de los Estados miembros de la UE:{" "}
              <a href="mailto:info@humans-tech.com" className="text-brand-link hover:underline">
                info@humans-tech.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">8. Ley aplicable y jurisdicción</h2>
            <p>
              El presente Aviso Legal se rige por la legislación española y la normativa de la
              Unión Europea aplicable, en particular la LSSI-CE (Ley 34/2002), el RGPD
              (Reglamento UE 2016/679), la LOPDGDD (Ley Orgánica 3/2018) y el DSA
              (Reglamento UE 2022/2065). Para cualquier controversia derivada del uso del sitio
              web, las partes se someten a los juzgados y tribunales competentes conforme a la
              normativa vigente, sin perjuicio del fuero que pudiera corresponder al consumidor.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
