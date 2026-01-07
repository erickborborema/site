import { useRef } from "react";
import { MessageCircle, Camera, FileText, CheckCircle, ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Você chama no WhatsApp",
    description: "Entre em contato de forma rápida e prática pelo WhatsApp",
  },
  {
    icon: Camera,
    number: "02",
    title: "Manda foto ou vídeo",
    description: "Envie imagens do problema para eu avaliar melhor",
  },
  {
    icon: FileText,
    number: "03",
    title: "Recebe orientação e orçamento",
    description: "Passo o diagnóstico e valor antes de qualquer serviço",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Agendamos e resolvo no local",
    description: "Vou até você no melhor horário e resolvo o problema",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="como-funciona" className="section-padding" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Como Funciona
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mt-2 mb-4 px-2">
            Simples, rápido e sem burocracia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Em 4 passos você resolve seu problema em casa
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop com barra de progresso */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-1 bg-border/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent rounded-full"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ 
                duration: 2.5, 
                delay: 0.5,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.9, 
                  delay: index * 0.35 + 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative"
              >
                {/* Step Card */}
                <div className="flex flex-col items-center text-center px-2 relative">
                  {/* Mobile Card Background */}
                  <div className="lg:hidden absolute inset-0 rounded-2xl bg-card/50 border border-border/50 -mx-2 -my-2 opacity-0 lg:opacity-0" />
                  
                  {/* Icon Circle */}
                  <motion.div 
                    className="relative mb-4 sm:mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      duration: 0.9, 
                      delay: index * 0.35 + 0.7,
                      ease: "backOut"
                    }}
                  >
                    <motion.div 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center relative border-2 border-accent/30 shadow-lg bg-background backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                    </motion.div>
                    {/* Number Badge */}
                    <motion.span 
                      className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent border-2 border-background font-display font-bold text-xs sm:text-sm flex items-center justify-center text-accent-foreground shadow-md"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.35 + 1.1,
                        ease: "backOut"
                      }}
                    >
                      {step.number}
                    </motion.span>
                  </motion.div>

                  {/* Content */}
                  <motion.h3 
                    className="font-display font-bold text-base sm:text-lg text-foreground mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.35 + 0.9
                    }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground text-sm max-w-xs leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.35 + 1.0
                    }}
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Arrow Connector - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <motion.div 
                      className="flex flex-col items-center gap-1"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.35 + 1.3
                      }}
                    >
                      <div className="w-0.5 h-6 bg-gradient-to-b from-accent/40 to-accent/20" />
                      <ChevronDown className="w-5 h-5 text-accent/50" />
                      <div className="w-0.5 h-6 bg-gradient-to-b from-accent/20 to-accent/40" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
