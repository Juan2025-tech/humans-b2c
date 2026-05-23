// ─────────────────────────────────────────────────────────────────────────────
// ÚNICO PUNTO DE VERDAD para todas las imágenes de la landing.
// Para cambiar cualquier imagen: editar SOLO este archivo.
// Los componentes importan desde aquí — nunca rutas hardcodeadas.
// ─────────────────────────────────────────────────────────────────────────────

export const IMAGES = {

  // HERO — imagen o video principal del producto
  hero: {
    src:  "/images/hero/product-hero.png",
    alt:  "HUMANS — monitorización de signos vitales en el hogar",
    type: "image" as "image" | "video",
    // Para video loop: type: "video", src: "/images/hero/product-loop.mp4"
    // Tamaño recomendado: 1200×800 WebP < 200KB | MP4 < 2MB
    placeholder: "https://placehold.co/1200x800/1E293B/00B4D8?text=HUMANS+Device",
  },

  // DISPOSITIVO — foto del BerryMed PPG
  device: {
    src: "/images/product/Monitorizacion-continua-new.png",
    alt: "Dispositivo HUMANS BerryMed — pulsioxímetro inalámbrico",
    // Tamaño recomendado: 800×800 WebP, fondo blanco o transparente
    placeholder: "https://placehold.co/800x800/1E293B/00B4D8?text=BerryMed+PPG",
  },

  // DASHBOARD — captura del panel de vitales
  dashboard: {
    src: "/images/product/dashboard-new.png",
    alt: "Panel HUMANS mostrando saturación de oxígeno periférica SpO₂ y frecuencia cardíaca en tiempo real",
    // Tamaño recomendado: 1200×700 WebP
    placeholder: "https://placehold.co/1200x700/0F172A/22C55E?text=Dashboard+HUMANS",
  },

  // PRODUCTO CENTRAL — imagen única de la sección "El Producto"
  product_central: {
    src: "/images/product/product-central.png",
    alt: "Dispositivo HUMANS con app — monitorización de signos vitales en el hogar",
    // Tamaño recomendado: 1200×675 (16:9) JPG/WebP
    placeholder: "https://placehold.co/1200x675/1E293B/00B4D8?text=HUMANS+Product",
  },

  // INFORME IA — ejemplo de informe generado por Motor Hortensia
  ai_report: {
    src: "/images/product/ai-report-new.png",
    alt: "Informe clínico generado automáticamente por HUMANS",
    placeholder: "https://placehold.co/1200x700/0F172A/7c3aed?text=Informe+IA+Hortensia",
  },

  // CASO REAL — imagen del caso clínico
  usecase_real: {
    src: "/images/usecases/caso-real.png",
    alt: "Caso real de monitorización HUMANS — detección temprana de sepsis",
    placeholder: "https://placehold.co/1200x675/3a0068/FFFFFF?text=Caso+Real+HUMANS",
  },

  // CASOS DE USO — imágenes emocionales del público objetivo
  usecase_family: {
    src: "/images/usecases/family-care.jpg",
    alt: "Familiar monitorizando a su ser querido con HUMANS desde el móvil",
    // Qué mostrar: hijo/a mirando el móvil con cara de tranquilidad
    placeholder: "https://placehold.co/800x600/1E293B/00B4D8?text=Familia+HUMANS",
  },

  usecase_elderly: {
    src: "/images/usecases/elderly-home.jpg",
    alt: "Persona mayor en casa siendo cuidada con HUMANS",
    // Qué mostrar: persona mayor tranquila en casa, familiar al fondo
    placeholder: "https://placehold.co/800x600/1E293B/22C55E?text=Persona+Mayor",
  },

  usecase_caregiver: {
    src: "/images/usecases/professional-caregiver.jpg",
    alt: "Cuidador profesional usando HUMANS",
    // Qué mostrar: cuidador con tablet, persona mayor en sillón
    placeholder: "https://placehold.co/800x600/1E293B/F59E0B?text=Cuidador+Pro",
  },

  // OPEN GRAPH — para redes sociales, WhatsApp, LinkedIn
  og: {
    src: "/images/og/humans-og.jpg",
    alt: "HUMANS — Monitorización médica inteligente para el hogar",
    // Tamaño obligatorio: 1200×630 JPG
    placeholder: "https://placehold.co/1200x630/1B4F8A/FFFFFF?text=HUMANS",
  },

} as const;

export type ImageKey = keyof typeof IMAGES;
