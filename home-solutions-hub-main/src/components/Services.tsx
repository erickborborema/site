import { useRef, useEffect } from "react";
import { Zap, Lightbulb, Wrench, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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
    icon: Clock,
    title: "Soluções Rápidas",
    description: "Pequenos chamados do dia a dia resolvidos com agilidade",
    color: "bg-muted/50 border border-border/50",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const isUserInteractingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  const openWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no serviço de ${service}. Pode me passar mais informações?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  // Auto-scroll contínuo com física melhorada
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const scrollContainer = carouselRef.current;
    const scrollSpeed = 0.8; // pixels por frame - velocidade suave
    const pauseDuration = 1500; // tempo de pausa após interação
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
      return 296; // fallback: 280px + 16px gap
    };

    const autoScroll = (currentTime: number) => {
      if (!scrollContainer) return;

      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      
      // Apenas scroll automático se usuário não estiver interagindo
      if (!isUserInteractingRef.current) {
        const currentScroll = scrollContainer.scrollLeft;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const cardWidth = getCardWidth();
        const oneSetWidth = cardWidth * services.length;

        // Scroll suave e constante
        scrollContainer.scrollLeft += scrollSpeed * (deltaTime / 16); // normalizado para 60fps

        // Reset suave quando chegar ao final de um conjunto
        if (scrollContainer.scrollLeft >= oneSetWidth) {
          scrollContainer.scrollLeft = scrollContainer.scrollLeft - oneSetWidth;
        }
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    // Função para pausar scroll durante interação
    const pauseAutoScroll = () => {
      isUserInteractingRef.current = true;
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, pauseDuration);
    };

    // Suporte a scroll com mouse wheel (horizontal)
    const handleWheel = (e: WheelEvent) => {
      // Verificar se é scroll horizontal
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        pauseAutoScroll();
        scrollContainer.scrollLeft += e.deltaX * 0.5; // Suavizar scroll do mouse
        e.preventDefault();
      } else if (Math.abs(e.deltaY) > 0 && Math.abs(e.deltaX) < 5) {
        // Scroll vertical também pode controlar horizontal se estiver sobre o carrossel
        pauseAutoScroll();
        scrollContainer.scrollLeft += e.deltaY * 0.5;
        e.preventDefault();
      }
    };

    // Suporte a drag com mouse
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollStart = scrollContainer.scrollLeft;
      pauseAutoScroll();
      scrollContainer.style.cursor = 'grabbing';
      scrollContainer.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1.5; // Multiplicador para velocidade do drag
      scrollContainer.scrollLeft = scrollStart - walk;
    };

    const handleMouseUp = () => {
      isDragging = false;
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.userSelect = '';
      pauseAutoScroll();
    };

    // Suporte a touch/swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartScroll = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartScroll = scrollContainer.scrollLeft;
      pauseAutoScroll();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - touchStartX;
      const deltaY = touchY - touchStartY;

      // Só scrollar horizontalmente se o movimento horizontal for maior
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        scrollContainer.scrollLeft = touchStartScroll - deltaX;
        pauseAutoScroll();
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      pauseAutoScroll();
    };

    // Event listeners
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    // Iniciar animação
    autoScrollRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
      clearTimeout(pauseTimeout);
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section id="servicos" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
            Nossos Serviços
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mt-2 mb-4 px-2">
            O que podemos fazer por você
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para sua casa, com qualidade e preço justo
          </p>
        </motion.div>

        {/* Carousel com scroll automático - Mobile e Desktop */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto overflow-y-visible scrollbar-hide py-4"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            cursor: "grab",
            scrollBehavior: "auto"
          }}
        >
          {/* Duplicar cards para scroll infinito */}
          {[...services, ...services, ...services].map((service, index) => (
            <motion.div
              key={`${service.title}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: (index % services.length) * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="card-elevated p-6 sm:p-8 min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0 flex flex-col items-center text-center relative overflow-hidden group border-2 border-transparent hover:border-green-500 transition-all duration-300"
            >
              {/* Decoração de fundo sutil */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-0" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-0" />
              
              <motion.div
                className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300"
                whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <service.icon className="w-10 h-10 text-accent" />
              </motion.div>
              
              <h3 className="relative z-10 font-display font-bold text-lg sm:text-xl text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="relative z-10 text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 flex-grow max-w-[240px]">
                {service.description}
              </p>
              
              <button
                onClick={() => openWhatsApp(service.title)}
                className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent/10 hover:bg-accent text-accent-foreground hover:text-white font-medium text-sm transition-all duration-300 mt-auto border border-accent/20 hover:border-accent"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chamar no WhatsApp</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
