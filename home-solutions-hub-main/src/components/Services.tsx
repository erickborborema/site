import { useRef, useEffect, useState } from "react";
import { Zap, Lightbulb, Wrench, Clock, Hammer } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ShineBorder } from "@/components/ui/shine-border";
import { useIsMobile } from "@/hooks/use-reduced-motion";

const WHATSAPP_NUMBER = "5511968888724";

const services = [
  {
    icon: Zap,
    title: "Elétrica Residencial",
    description: "Tomadas, disjuntores, chuveiro elétrico e luminárias",
    color: "bg-muted/50 border border-border/50",
  },
  {
    icon: Lightbulb,
    title: "Instalações",
    description: "Lustres, ventilador de teto, TV, suportes e prateleiras",
    color: "bg-muted/50 border border-border/50",
  },
  {
    icon: Wrench,
    title: "Reparos e Manutenção",
    description: "Ajustes, consertos e troca de peças em geral",
    color: "bg-muted/50 border border-border/50",
  },
  {
    icon: Hammer,
    title: "Alvenaria",
    description: "Pequenos reparos em paredes, pisos, azulejos e acabamentos",
    color: "bg-muted/50 border border-border/50",
  },
  {
    icon: Clock,
    title: "Soluções Rápidas",
    description: "Pequenos chamados do dia a dia resolvidos com agilidade",
    color: "bg-muted/50 border border-border/50",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  
  // Desktop carousel refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const isUserInteractingRef = useRef(false);
  
  // Mobile carousel refs and state
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const openWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço de ${service}. Pode me passar mais informações?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  // ========== MOBILE: Autoplay e Indicadores ==========
  useEffect(() => {
    if (!isMobile || !mobileScrollRef.current) return;

    const container = mobileScrollRef.current;

    // Detectar mudança de card via scroll
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
        setActiveIndex(newIndex);
      }
    };

    // Autoplay - avança a cada 3 segundos
    const startAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }

      autoplayIntervalRef.current = setInterval(() => {
        if (!isAutoPlaying) return;

        const nextIndex = (activeIndex + 1) % services.length;
        scrollToIndex(nextIndex);
      }, 3000);
    };

    const scrollToIndex = (index: number) => {
      if (!container) return;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    };

    // Pausar ao tocar
    const handleTouchStart = () => {
      setIsAutoPlaying(false);
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };

    // Retomar após 2 segundos sem tocar
    const handleTouchEnd = () => {
      setTimeout(() => {
        setIsAutoPlaying(true);
      }, 2000);
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    // Iniciar autoplay
    if (isAutoPlaying) {
      startAutoplay();
    }

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isMobile, activeIndex, isAutoPlaying]);

  // Reiniciar autoplay quando activeIndex muda
  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return;
    
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    autoplayIntervalRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % services.length;
      if (mobileScrollRef.current) {
        const cardWidth = mobileScrollRef.current.offsetWidth;
        mobileScrollRef.current.scrollTo({
          left: cardWidth * nextIndex,
          behavior: 'smooth'
        });
      }
    }, 3000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isMobile, activeIndex, isAutoPlaying]);

  // ========== DESKTOP: Auto-scroll infinito ==========
  useEffect(() => {
    if (isMobile || !carouselRef.current) return;
    
    const scrollContainer = carouselRef.current;
    const scrollSpeed = 0.8;
    const pauseDuration = 1500;
    let pauseTimeout: NodeJS.Timeout;
    let lastFrameTime = performance.now();

    const getCardWidth = () => {
      const firstCard = scrollContainer.querySelector('div[class*="min-w-"]') as HTMLElement;
      if (firstCard) {
        const computed = window.getComputedStyle(firstCard);
        const width = parseFloat(computed.width);
        const gap = parseFloat(window.getComputedStyle(scrollContainer).gap) || 16;
        return width + gap;
      }
      return 296;
    };

    const autoScroll = (currentTime: number) => {
      if (isUserInteractingRef.current) {
        lastFrameTime = currentTime;
        autoScrollRef.current = requestAnimationFrame(autoScroll);
        return;
      }

      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;

      const normalizedDelta = Math.min(deltaTime, 32);
      const scrollAmount = scrollSpeed * (normalizedDelta / 16);

      scrollContainer.scrollLeft += scrollAmount;

      const cardWidth = getCardWidth();
      const totalWidth = scrollContainer.scrollWidth;
      const thirdPoint = totalWidth / 3;

      if (scrollContainer.scrollLeft >= thirdPoint) {
        scrollContainer.scrollLeft -= thirdPoint;
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    const handleInteractionStart = () => {
      isUserInteractingRef.current = true;
      clearTimeout(pauseTimeout);
    };

    const handleInteractionEnd = () => {
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, pauseDuration);
    };

    scrollContainer.addEventListener('mouseenter', handleInteractionStart);
    scrollContainer.addEventListener('mouseleave', handleInteractionEnd);
    scrollContainer.addEventListener('touchstart', handleInteractionStart);
    scrollContainer.addEventListener('touchend', handleInteractionEnd);
    scrollContainer.addEventListener('wheel', handleInteractionStart);

    autoScrollRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
      clearTimeout(pauseTimeout);
      scrollContainer.removeEventListener('mouseenter', handleInteractionStart);
      scrollContainer.removeEventListener('mouseleave', handleInteractionEnd);
      scrollContainer.removeEventListener('touchstart', handleInteractionStart);
      scrollContainer.removeEventListener('touchend', handleInteractionEnd);
      scrollContainer.removeEventListener('wheel', handleInteractionStart);
    };
  }, [isMobile]);

  return (
    <section id="servicos" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Serviços
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 mb-4 text-foreground">
            O que eu faço?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Soluções completas para sua casa
          </p>
        </motion.div>

        {/* ========== MOBILE: Carrossel com Indicadores ========== */}
        {isMobile ? (
          <div className="relative w-full">
            {/* Scroll Container */}
            <div
              ref={mobileScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-center snap-always px-4 first:pl-4 last:pr-4"
                  style={{ width: '100%' }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="bg-card border-2 border-border/50 rounded-2xl p-5 flex flex-col items-center text-center h-full min-h-[280px]">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 border border-accent/20 mb-4">
                        <service.icon className="w-7 h-7 text-accent" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-display font-bold text-base text-foreground mb-2">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                        {service.description}
                      </p>
                      
                      {/* Button */}
                      <button
                        onClick={() => openWhatsApp(service.title)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent font-semibold text-sm border border-accent/20 w-full"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Indicadores - Container com barra ativa */}
            <div className="flex justify-center items-center mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-muted/30 border border-border/30 backdrop-blur-sm">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (mobileScrollRef.current) {
                        const cardWidth = mobileScrollRef.current.offsetWidth;
                        mobileScrollRef.current.scrollTo({
                          left: cardWidth * index,
                          behavior: 'smooth'
                        });
                      }
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 2000);
                    }}
                    className="relative group"
                    aria-label={`Ir para serviço ${index + 1}`}
                  >
                    {index === activeIndex ? (
                      // Barra verde alongada com glow quando ativo
                      <div className="relative">
                        <div className="w-8 h-2 rounded-full bg-accent transition-all duration-300" />
                        {/* Glow effect */}
                        <div className="absolute inset-0 w-8 h-2 rounded-full bg-accent/50 blur-sm" />
                        <div className="absolute inset-0 w-8 h-2 rounded-full bg-accent/30 blur-md animate-pulse" />
                      </div>
                    ) : (
                      // Dot circular quando inativo
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/40 group-hover:bg-accent/50 transition-all duration-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ========== DESKTOP: Carrossel Infinito ========== */
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {[...services, ...services, ...services].map((service, index) => (
              <motion.div
                key={`${service.title}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: (index % services.length) * 0.1 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0"
              >
                <ShineBorder
                  className="relative overflow-hidden group h-full"
                  color={["#22c55e", "#16a34a", "#15803d"]}
                  borderRadius={16}
                  borderWidth={2}
                  duration={12}
                >
                  <div className="p-6 sm:p-8 flex flex-col items-center text-center h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-0" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-0" />
                    
                    <motion.div
                      className="relative z-10 flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300"
                      whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <service.icon className="w-8 h-8 text-accent" />
                    </motion.div>
                    
                    <h3 className="relative z-10 font-display font-bold text-lg sm:text-xl text-foreground mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="relative z-10 text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 flex-grow max-w-[240px]">
                      {service.description}
                    </p>
                    
                    <button
                      onClick={() => openWhatsApp(service.title)}
                      className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent/10 hover:bg-accent text-accent hover:text-white font-semibold text-sm transition-all duration-300 mt-auto border-2 border-accent/20 hover:border-accent hover:shadow-lg hover:scale-105"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Chamar no WhatsApp</span>
                    </button>
                  </div>
                </ShineBorder>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
