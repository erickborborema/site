import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Você atende quais regiões?",
    answer: "Atendo toda a região metropolitana. Mande sua localização pelo WhatsApp que confirmo a disponibilidade na sua área.",
  },
  {
    question: "Faz orçamento por WhatsApp?",
    answer: "Sim! Mande fotos ou vídeos do problema e passo o orçamento sem compromisso. Simples e rápido.",
  },
  {
    question: "Tem garantia no serviço?",
    answer: "Todos os serviços têm garantia. Se houver qualquer problema relacionado ao trabalho feito, volto sem custo adicional.",
  },
  {
    question: "Atende aos finais de semana?",
    answer: "Sim, atendo de segunda a sábado. Domingos e feriados apenas em casos de urgência, com taxa adicional.",
  },
  {
    question: "O que preciso enviar pra você avaliar?",
    answer: "Fotos ou vídeos do problema ajudam muito. Se for elétrica, mostre o disjuntor e a área afetada. Quanto mais detalhes, melhor o orçamento.",
  },
  {
    question: "Quanto tempo demora pra responder?",
    answer: "Respondo em até 2 horas durante o horário comercial. Urgências são atendidas mais rápido.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="section-padding bg-card border-y border-border/50 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Perguntas Frequentes
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-2 mb-4 px-2">
            Tire suas dúvidas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Respostas para as perguntas mais comuns sobre nossos serviços
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="group relative bg-card rounded-xl border-2 border-border/50 hover:border-green-500/50 transition-all duration-300 px-6 py-2 shadow-lg hover:shadow-xl"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-base sm:text-lg text-foreground hover:text-green-500 hover:no-underline py-5 sm:py-6 pr-8">
                    <div className="flex items-start gap-4 w-full">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-colors duration-300">
                          <span className="font-display font-bold text-sm text-green-500">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <span className="flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-5 sm:pb-6 pt-2 pl-12 leading-relaxed">
                    <div className="relative pl-6 border-l-2 border-green-500/20">
                      <p className="text-foreground/80">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
