// Testimonios reales — pendientes de recopilar con los primeros usuarios de lista de espera.
// Activar cuando los primeros usuarios hayan probado el producto.
// Añadir testimonios editando SOLO este archivo.

export interface Testimonial {
  nombre: string;
  perfil: string;    // ej: "Hija de paciente con EPOC"
  texto: string;
  avatar?: string;   // ruta en /public/images/testimonials/
}

export const TESTIMONIALS: Testimonial[] = [
  // Vacío hasta tener testimonios reales.
  // No inventar testimonios.
];
