export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Qué es exactamente HUMANS?",
    answer:
      "HUMANS es un sistema de monitorización continua de signos vitales para el hogar. Combina un sensor médico inalámbrico con una plataforma de inteligencia artificial que detecta cambios antes de que los síntomas sean evidentes.",
  },
  {
    question: "¿Cómo funciona la lista de espera?",
    answer:
      "Te registras con tu email. Cuando tu plaza esté disponible, te avisamos y puedes activar tu suscripción. Sin tarjeta de crédito y sin ningún compromiso hasta ese momento.",
  },
  {
    question: "¿Es difícil de instalar y usar?",
    answer:
      "No. El dispositivo no requiere instalación técnica. Te guiamos paso a paso desde la app cuando recibes tu kit.",
  },
  {
    question: "¿Dónde se almacenan mis datos?",
    answer:
      "Todos los datos se almacenan en servidores ubicados en la Unión Europea, cumpliendo con el Reglamento General de Protección de Datos (RGPD). Nunca se venden ni se comparten con terceros.",
  },
  {
    question: "¿Sustituye a la atención médica?",
    answer:
      "No. HUMANS es una herramienta de apoyo al cuidado, no un dispositivo médico de diagnóstico. Los datos te ayudan a tomar mejores decisiones, pero siempre en colaboración con tu equipo médico.",
  },
  {
    question: "¿Para qué edades es adecuado?",
    answer:
      "Para cualquier persona que necesite monitorización continua en el hogar: personas mayores con enfermedades crónicas, adultos en recuperación post-hospitalaria o niños con patología cardiorrespiratoria.",
  },
];
