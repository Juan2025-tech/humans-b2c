import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Información sobre el tratamiento de tus datos personales en HUMANS.",
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-brand-link hover:underline mb-8 block">
          ← Volver a inicio
        </Link>
        <h1 className="text-3xl font-extrabold mb-2">Política de Privacidad</h1>
        <p className="text-slate-400 text-sm mb-8">Última actualización: mayo de 2026</p>

        <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-6">

          <section>
            <h2 className="text-white font-bold text-lg mb-2">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recabados a través de este sitio
              web es HUMANS, contactable en{" "}
              <a href="mailto:privacy@humans-tech.com" className="text-brand-link hover:underline">
                privacy@humans-tech.com
              </a>.
            </p>
            <p className="mt-2">
              HUMANS no está obligado a designar un Delegado de Protección de Datos (DPD/DPO) en
              esta fase, al no tratar datos a gran escala ni datos de categorías especiales de forma
              sistemática. No obstante, cualquier consulta en materia de protección de datos puede
              dirigirse a la dirección indicada.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">2. Datos que tratamos</h2>
            <p>
              En la fase actual de lista de espera, tratamos exclusivamente:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><strong>Datos de contacto:</strong> nombre, dirección de correo electrónico y, opcionalmente, teléfono.</li>
              <li><strong>Datos de navegación:</strong> información técnica anonimizada sobre el uso del sitio (sin cookies, sin identificación personal).</li>
            </ul>
            <p className="mt-2">
              <strong>En esta fase no tratamos datos de salud</strong> ni ninguna categoría especial
              de datos en el sentido del Art. 9 RGPD. Cuando el servicio de monitorización esté
              activo, el tratamiento de datos fisiológicos requerirá consentimiento explícito
              separado (Art. 9.2.a RGPD) y será objeto de una política específica actualizada.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">3. Finalidad y base legal</h2>
            <ul className="space-y-3 list-none pl-0">
              <li>
                <strong className="text-white">Gestión de la lista de espera:</strong> tratamos tus
                datos para notificarte del lanzamiento del servicio y enviarte comunicaciones
                relacionadas. Base legal: consentimiento del interesado (Art. 6.1.a RGPD). El
                consentimiento es libre, informado e inequívoco, y puede retirarse en cualquier
                momento sin que ello afecte a la licitud del tratamiento previo.
              </li>
              <li>
                <strong className="text-white">Analítica web agregada:</strong> medición del
                rendimiento del sitio mediante Plausible Analytics (herramienta sin cookies).
                Base legal: interés legítimo (Art. 6.1.f RGPD) en la mejora del servicio,
                compatible con la privacidad al no generar perfiles individuales.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">4. Encargados del tratamiento</h2>
            <p>
              Para prestar el servicio, HUMANS utiliza los siguientes encargados del tratamiento,
              con quienes mantiene el correspondiente acuerdo de tratamiento de datos (DPA):
            </p>
            <ul className="mt-2 space-y-2 list-disc pl-5">
              <li>
                <strong>Hetzner Cloud GmbH</strong> (Alemania) — alojamiento de servidores y base
                de datos. Servidores ubicados en la UE (Falkenstein, DE). Sin transferencias
                internacionales.
              </li>
              <li>
                <strong>Mailjet SAS</strong> (Francia, grupo Sinch) — envío de correos transaccionales
                y de confirmación de lista de espera. Datos procesados en la UE. Más información:{" "}
                <span className="text-slate-400">mailjet.com/es/legal/privacy-policy</span>
              </li>
              <li>
                <strong>Plausible Analytics OÜ</strong> (Estonia) — analítica web sin cookies, sin
                datos personales identificables. Datos procesados en la UE.
              </li>
            </ul>
            <p className="mt-2">
              No se realizan transferencias internacionales de datos fuera del Espacio Económico
              Europeo.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">5. Plazo de conservación</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>Datos de lista de espera:</strong> se conservan hasta que solicites su
                supresión, retires el consentimiento, o transcurran 3 años desde la última
                comunicación, lo que ocurra primero.
              </li>
              <li>
                <strong>Datos de IP hasheados</strong> (analítica): eliminados automáticamente a
                los 90 días.
              </li>
              <li>
                Una vez finalizado el plazo de conservación, los datos serán suprimidos o
                anonimizados de forma irreversible.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">6. Tus derechos</h2>
            <p>
              De acuerdo con el RGPD (Arts. 15–22) y la LOPDGDD (Ley Orgánica 3/2018), tienes
              derecho a:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><strong>Acceso:</strong> conocer qué datos tratamos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión («derecho al olvido»):</strong> solicitar la eliminación de tus datos.</li>
              <li><strong>Limitación del tratamiento:</strong> solicitar que suspendamos temporalmente el uso de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y de uso común.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
              <li><strong>Retirada del consentimiento:</strong> en cualquier momento y sin coste, a través del enlace de baja incluido en cada correo o escribiéndonos directamente.</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a href="mailto:privacy@humans-tech.com" className="text-brand-link hover:underline">
                privacy@humans-tech.com
              </a>{" "}
              indicando tu nombre y el derecho que deseas ejercer. Responderemos en el plazo máximo
              de un mes (prorrogable dos meses en casos complejos), conforme al Art. 12 RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">7. Derecho a reclamar ante la AEPD</h2>
            <p>
              Si consideras que el tratamiento de tus datos no se ajusta a la normativa vigente,
              tienes derecho a presentar una reclamación ante la{" "}
              <strong>Agencia Española de Protección de Datos (AEPD)</strong>, autoridad de control
              competente en España, a través de su sede electrónica{" "}
              <span className="text-slate-400">aepd.es</span>. Este derecho no afecta a ningún
              otro recurso administrativo o acción judicial disponible.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">8. Seguridad</h2>
            <p>
              Aplicamos las medidas técnicas y organizativas apropiadas conforme al Art. 32 RGPD:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Cifrado en tránsito mediante TLS 1.2+.</li>
              <li>Hashing de direcciones IP antes de cualquier almacenamiento.</li>
              <li>Control de acceso basado en roles y principio de mínimo privilegio.</li>
              <li>Copias de seguridad cifradas en infraestructura UE.</li>
              <li>Revisión periódica de medidas de seguridad.</li>
            </ul>
            <p className="mt-2">
              En caso de brecha de seguridad que afecte a tus datos, HUMANS lo notificará a la
              AEPD en un plazo máximo de 72 horas (Art. 33 RGPD) y, si el riesgo es alto, te
              informará directamente (Art. 34 RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">9. Modificaciones</h2>
            <p>
              HUMANS se reserva el derecho a actualizar esta Política de Privacidad para adaptarla
              a cambios legislativos o del servicio. Las modificaciones sustanciales serán
              comunicadas por correo electrónico a los usuarios registrados con antelación razonable.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
