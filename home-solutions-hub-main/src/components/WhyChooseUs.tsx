import { useRef } from "react";
import { Eye, Clock, Sparkles, ShieldCheck, MessageCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { ShineBorder } from "@/components/ui/shine-border";

const features = [
  {
    icon: Eye,
    title: "Transparência no orçamento",
    description: "Você sabe o valor antes de eu começar qualquer serviço",
  },
  {
    icon: Clock,
    title: "Pontualidade e respeito",
    description: "Chego no horário combinado e respeito sua casa",
  },
  {
    icon: Sparkles,
    title: "Capricho e acabamento",
    description: "Trabalho com atenção aos detalhes e qualidade",
  },
  {
    icon: ShieldCheck,
    title: "Segurança no serviço elétrico",
    description: "Sigo todas as normas de segurança para sua tranquilidade",
  },
  {
    icon: MessageCircle,
    title: "Atendimento simples e rápido",
    description: "WhatsApp direto comigo, sem enrolação",
  },
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-card border-y border-border/50" ref={ref} id="diferenciais">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Diferenciais
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 mb-4 px-2 text-foreground">
            Por que escolher o PH?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Compromisso com qualidade e respeito ao cliente
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="flex flex-col gap-4 lg:gap-5 max-w-4xl mx-auto mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 8 }}
              className="group"
            >
              <ShineBorder
                className="relative overflow-hidden"
                color={["#22c55e", "#16a34a", "#15803d"]}
                borderRadius={12}
                borderWidth={2}
                duration={10 + index * 2}
              >
              {/* Decoração de fundo */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Linha decorativa lateral */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500 group-hover:via-green-500 group-hover:to-green-500 transition-all duration-300" />
              
              {/* Conteúdo com padding fixo */}
              <div className="relative z-10 flex gap-5 items-center p-6">
                {/* Ícone - Posição absolutamente fixa à esquerda */}
                <div className="flex-shrink-0">
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 group-hover:border-green-500/40 group-hover:from-green-500/20 group-hover:to-green-500/10 transition-all duration-300"
                    whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                </div>
                
                {/* Texto */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-base sm:text-lg lg:text-xl text-foreground mb-1.5 sm:mb-2 group-hover:text-green-500 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:via-transparent group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </ShineBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
