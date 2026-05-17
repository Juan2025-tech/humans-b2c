import { z } from "zod";

export const PARA_QUIEN_OPTIONS = [
  { value: "padre_madre",   label: "Para mi padre o madre",     emoji: "👴" },
  { value: "conyugue",      label: "Para mi pareja",            emoji: "❤️" },
  { value: "hijo_enfermo",  label: "Para mi hijo/a",            emoji: "👶" },
  { value: "otro_familiar", label: "Para otro familiar",        emoji: "👨‍👩‍👧" },
  { value: "soy_cuidador",  label: "Soy cuidador/a profesional", emoji: "🩺" },
] as const;

export type ParaQuienValue = (typeof PARA_QUIEN_OPTIONS)[number]["value"];

export const waitlistSchema = z.object({
  nombre:      z.string().min(2, "Escribe tu nombre completo"),
  email:       z.string().email("Email no válido"),
  telefono:    z.string().optional(),
  para_quien:  z.enum([
    "padre_madre",
    "conyugue",
    "hijo_enfermo",
    "otro_familiar",
    "soy_cuidador",
  ]),
  plan_interes: z.string().optional(),
  rgpd:        z.literal(true, {
    error: "Debes aceptar la política de privacidad",
  }),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const contactSchema = z.object({
  nombre:  z.string().min(2, "Escribe tu nombre"),
  email:   z.string().email("Email no válido"),
  mensaje: z.string().min(10, "El mensaje es demasiado corto").max(2000),
  rgpd:    z.literal(true, {
    error: "Debes aceptar la política de privacidad",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
