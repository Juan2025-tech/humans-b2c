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
    <section className="bg-dark-bg py-20 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10">
          Preguntas frecuentes
        </h2>

        <Accordion multiple={false} className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={i}
              className="bg-dark-card border border-dark-border rounded-xl px-5 overflow-hidden"
            >
              <AccordionTrigger className="text-white font-semibold text-sm text-left py-4 hover:no-underline hover:text-brand-secondary transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
