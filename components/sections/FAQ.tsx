"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/content/faq.config";

export function FAQ() {
  return (
    <section className="bg-gradient-to-b from-white to-ice-blue py-20 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary text-center mb-10">
          Preguntas frecuentes
        </h2>

        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item, i) => {
            const isPinned = item.question === "¿Sustituye a la atención médica?";

            if (isPinned) {
              return (
                <div
                  key={i}
                  className="bg-amber-50 border-2 border-amber-400 rounded-xl px-5 py-4"
                >
                  <p className="text-text-primary font-bold text-sm mb-2">{item.question}</p>
                  <p className="text-amber-900 text-sm leading-relaxed font-medium">{item.answer}</p>
                </div>
              );
            }

            return (
              <Accordion key={i} multiple={false} className="flex flex-col">
                <AccordionItem
                  value={i}
                  className="bg-ice-blue border border-slate-200 rounded-xl px-5 overflow-hidden"
                >
                  <AccordionTrigger className="text-text-primary font-semibold text-sm text-left py-4 hover:no-underline hover:text-brand-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
