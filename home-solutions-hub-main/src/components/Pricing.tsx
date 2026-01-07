import { useRef } from "react";
import { Plug, Lightbulb, Zap, Info } from "lucide-react";
import { motion, useInView } from "framer-motion";

const examples = [
  {
    icon: Plug,
    title: "Troca de tomada",
    price: "A partir de R$ 50",
  },
  {
    icon: Lightbulb,
    title: "Instalação de luminária",
    price: "A partir de R$ 60",
  },
  {
    icon: Zap,
    title: "Troca de disjuntor",
    price: "A partir de R$ 80",
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="precos" className="section-padding" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Preços
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mt-2 mb-4 px-2">
            Transparência no orçamento
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            O valor depende do serviço, mas você sempre sabe o preço antes de começar
          </p>
        </motion.div>

        {/* Price Examples */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated p-5 sm:p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-muted/50 border border-border/50 mb-4">
                <example.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {example.title}
              </h3>
              <p className="text-foreground font-bold text-xl">
                {example.price}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-start gap-3 max-w-2xl mx-auto p-4 rounded-lg bg-muted border border-border"
        >
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Importante:</strong> Os valores acima são apenas exemplos. 
            O orçamento final depende da complexidade do serviço. Envie os detalhes pelo WhatsApp 
            e receba uma avaliação personalizada sem compromisso.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
