import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Zap, Wrench, Lightbulb } from "lucide-react";
import aboutImage from "@/assets/PHOTO-2026-01-06-21-44-01 2.jpg";

// Componente para animação de contagem
function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function para suavizar a animação
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="inline-block">
      {count}{suffix}
    </span>
  );
}

const stats = [
  {
    value: 15,
    suffix: "+",
    label: "Anos de Experiência",
  },
  {
    value: 800,
    suffix: "+",
    label: "Clientes Atendidos",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Serviços Realizados",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="relative section-padding bg-muted/50 border-y border-border/30 overflow-hidden" ref={ref}>
      {/* Background decorativo com ícones de ferramentas */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 right-10 rotate-12">
          <Zap className="w-32 h-32" strokeWidth={1} />
        </div>
        <div className="absolute bottom-20 left-10 -rotate-12">
          <Wrench className="w-32 h-32" strokeWidth={1} />
        </div>
        <div className="absolute top-1/2 right-1/4 rotate-45">
          <Lightbulb className="w-40 h-40" strokeWidth={1} />
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={aboutImage}
                alt="PH Soluções Residenciais"
                className="w-full h-auto object-cover"
              />
              
              {/* Badge/Logo overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 bg-card/95 backdrop-blur-md rounded-xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/20">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">PH Soluções</h3>
                    <p className="text-xs text-muted-foreground">Qualidade & Confiança</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decoração de fundo */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block text-accent font-medium text-sm uppercase tracking-wider"
              >
                SOBRE
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight"
              >
                <span className="block">MAIS QUE UM</span>
                <span className="block text-accent">SERVIÇO</span>
              </motion.h2>
            </div>

            {/* Texto descritivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-5 text-muted-foreground leading-relaxed"
            >
              <p className="text-base sm:text-lg lg:text-xl">
                Na <span className="text-accent font-semibold">PH Soluções</span>, cada serviço é uma experiência. Técnica profissional 
                com atenção aos detalhes e respeito pela sua casa.
              </p>
              <p className="text-base sm:text-lg lg:text-xl">
                Tradição e modernidade se encontram para resolver seus problemas 
                elétricos, hidráulicos e de manutenção com <span className="text-accent font-semibold">qualidade</span> e <span className="text-accent font-semibold">agilidade</span>.
              </p>
            </motion.div>

            {/* Estatísticas com animação */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 border-t border-border/50"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-2">
                    <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-accent">
                      <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide px-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

