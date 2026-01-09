import { useRef, useState, useEffect } from "react";
import { MessageCircle, Camera, FileText, CheckCircle, ChevronDown, X } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AnimatedBeam } from "./ui/animated-beam";

// Função para importar arquivos dinamicamente
// Busca todas as imagens e vídeos na pasta src/assets
const importMediaFiles = () => {
  const images: string[] = [];
  let video: string | undefined;
  
  // Usar import.meta.glob para encontrar arquivos dinamicamente
  try {
    // Buscar todas as imagens (exceto o logo)
    const imagePattern = import.meta.glob('/src/assets/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { 
      eager: true,
      import: 'default'
    });
    
    // Buscar vídeo
    const videoPattern = import.meta.glob('/src/assets/*.{mp4,mov,webm,MP4,MOV,WEBM}', { 
      eager: true,
      import: 'default'
    });
    
    // Adicionar imagens encontradas (ordenar por nome para consistência, excluir logo e foto de perfil)
    const imageEntries = Object.entries(imagePattern)
      .filter(([path]) => {
        const fileName = path.toLowerCase();
        return !fileName.includes('.png') && !fileName.includes('photo-2026'); // Excluir PNGs (logo) e foto de perfil
      })
      .map(([path, module]: [string, any]) => ({ path, module }))
      .sort((a, b) => a.path.localeCompare(b.path));
    
    imageEntries.forEach(({ module }) => {
      if (module && typeof module === 'string') {
        images.push(module);
      }
    });
    
    // Adicionar vídeo encontrado (pegar o primeiro)
    const videoEntries = Object.entries(videoPattern);
    if (videoEntries.length > 0) {
      const firstVideo = videoEntries[0][1];
      if (firstVideo && typeof firstVideo === 'string') {
        video = firstVideo;
      }
    }
  } catch (error) {
    // Silenciosamente falhar se os arquivos não existirem ainda
    // Isso permite que o componente funcione mesmo sem os arquivos
  }
  
  return { images, video };
};

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractingRef = useRef(false);
  
  // Refs para os beams animados
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  
  // Importar arquivos de mídia
  const mediaFiles = importMediaFiles();

  // Detectar qual card está visível no mobile scroll
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    const totalItems = mediaFiles.images.length + (mediaFiles.video ? 1 : 0);
    if (!scrollContainer || totalItems === 0) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = 280; // largura do card
      const gap = 16; // gap entre cards
      
      // Com scroll-snap-align: start, o índice é simplesmente a posição dividida pela largura total
      const itemWidth = cardWidth + gap;
      const rawIndex = scrollLeft / itemWidth;
      
      // Arredonda para o card mais próximo
      const index = Math.round(rawIndex);
      
      // Garante que o índice está dentro dos limites
      const clampedIndex = Math.min(Math.max(0, index), totalItems - 1);
      
      setActiveCardIndex(clampedIndex);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    // Chama uma vez no início para definir o card inicial
    setTimeout(() => handleScroll(), 100);
    
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [mediaFiles.images.length, mediaFiles.video]);

  // Auto-play suave das fotos e vídeo no mobile
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    const totalItems = mediaFiles.images.length + (mediaFiles.video ? 1 : 0);
    if (!scrollContainer || totalItems <= 1) return;

    const scrollToNextCard = () => {
      if (isUserInteractingRef.current) return;

      const nextIndex = (activeCardIndex + 1) % totalItems;
      const cardWidth = 280;
      const gap = 16;
      const scrollPosition = nextIndex * (cardWidth + gap);

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    };

    // Inicia o autoplay após um delay
    autoPlayRef.current = setInterval(scrollToNextCard, 4000); // 4 segundos por item

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeCardIndex, mediaFiles.images.length, mediaFiles.video]);

  // Detectar interação do usuário para pausar o autoplay
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    let pauseTimeout: NodeJS.Timeout;

    const handleTouchStart = () => {
      isUserInteractingRef.current = true;
      clearTimeout(pauseTimeout);
    };

    const handleTouchEnd = () => {
      // Retoma o autoplay após 5 segundos de inatividade
      pauseTimeout = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 5000);
    };

    const handleMouseEnter = () => {
      isUserInteractingRef.current = true;
      clearTimeout(pauseTimeout);
    };

    const handleMouseLeave = () => {
      // Retoma o autoplay após 3 segundos
      pauseTimeout = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 3000);
    };

    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(pauseTimeout);
    };
  }, []);

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
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-2 mb-4 px-2">
            Simples, rápido e sem burocracia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Em 4 passos você resolve seu problema em casa
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-12" ref={containerRef}>
          {/* Animated Beams - Desktop */}
          <div className="hidden lg:block">
            {step1Ref.current && step2Ref.current && (
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={step1Ref}
                toRef={step2Ref}
                duration={5}
                delay={0}
                pathWidth={4}
                pathOpacity={0.4}
                gradientStartColor="#22c55e"
                gradientStopColor="#16a34a"
              />
            )}
            {step2Ref.current && step3Ref.current && (
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={step2Ref}
                toRef={step3Ref}
                duration={5}
                delay={0.3}
                pathWidth={4}
                pathOpacity={0.4}
                gradientStartColor="#22c55e"
                gradientStopColor="#16a34a"
              />
            )}
            {step3Ref.current && step4Ref.current && (
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={step3Ref}
                toRef={step4Ref}
                duration={5}
                delay={0.6}
                pathWidth={4}
                pathOpacity={0.4}
                gradientStartColor="#22c55e"
                gradientStopColor="#16a34a"
              />
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              // Mapear refs para cada step
              const stepRefs = [step1Ref, step2Ref, step3Ref, step4Ref];
              const currentStepRef = stepRefs[index];
              
              return (
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
                      ref={currentStepRef}
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
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center relative border-2 border-accent/30 shadow-lg bg-background backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-8 h-8 text-accent" />
                    </motion.div>
                    {/* Number Badge */}
                    <motion.span 
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent border-2 border-background font-display font-bold text-sm flex items-center justify-center text-accent-foreground shadow-md"
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
            );
            })}
          </div>
        </div>

        {/* Galeria de Fotos e Vídeo */}
        {(mediaFiles.images.length > 0 || mediaFiles.video) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 2 }}
            className="max-w-6xl mx-auto"
          >
            {/* Galeria de Fotos e Vídeo */}
            {(mediaFiles.images.length > 0 || mediaFiles.video) && (
              <>
                {/* Versão Mobile - Carrossel Horizontal com Autoplay */}
                <div 
                  ref={mobileScrollRef} 
                  className="md:hidden relative w-full overflow-x-auto overflow-y-visible py-8 scrollbar-hide" 
                  style={{ 
                    scrollPaddingLeft: '16px',
                    scrollBehavior: 'smooth'
                  }}
                >
                  <div className="flex gap-4 pb-4 px-4" style={{ scrollSnapType: 'x mandatory', scrollSnapStop: 'always' }}>
                    
                    {/* Vídeo como primeiro item no mobile */}
            {mediaFiles.video && (
              <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0 }}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        className="flex-shrink-0 cursor-pointer"
                        style={{ scrollSnapAlign: 'start' }}
                      >
                        <div className="w-[280px] h-[370px] bg-card overflow-hidden rounded-2xl border-2 border-border/40 hover:border-accent/50 active:border-accent/70 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/10 active:shadow-accent/20">
                          <div className="relative w-full h-full overflow-hidden group/card">
                    <video
                      src={mediaFiles.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 opacity-70 group-hover/card:opacity-80 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-primary/30 opacity-40 group-hover/card:opacity-60 transition-opacity duration-500" />
                            
                            <div className="absolute top-4 left-4 z-20">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/95 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                Vídeo
                              </span>
                            </div>
                            
                            <div className="absolute top-4 right-4 z-20 opacity-80 group-hover/card:opacity-100 transition-opacity duration-300">
                              <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg group-hover/card:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                  </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                              <div className="space-y-2">
                                <h4 className="font-display font-bold text-white text-lg drop-shadow-lg leading-tight">
                      Trabalho em Ação
                    </h4>
                                <p className="text-white/85 text-sm leading-relaxed transform transition-all duration-300 group-hover/card:translate-y-0">
                      Veja na prática como realizamos nossos serviços com qualidade e agilidade
                    </p>
                                <div className="h-1 bg-accent/80 rounded-full w-16 group-hover/card:w-20 transition-all duration-300" />
                              </div>
                            </div>
                            
                            <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                              <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 group-hover/card:animate-shimmer" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Cards de fotos */}
                    {mediaFiles.images.map((image, index) => {
                      // Captions específicos para cada foto na ordem que aparecem
                      const captionsList = [
                        { title: "Quadro Elétrico", description: "Montagem profissional de painéis com disjuntores", badge: "Painel" },
                        { title: "Infraestrutura Elétrica", description: "Instalação completa de eletrodutos e fiação", badge: "Infraestrutura" },
                        { title: "Distribuição Elétrica", description: "Painel de distribuição com proteções", badge: "Distribuição" },
                        { title: "Iluminação Moderna", description: "Spots embutidos e painéis LED de alta qualidade", badge: "Iluminação" },
                        { title: "Energia Solar", description: "Instalação de painéis solares fotovoltaicos", badge: "Solar" },
                        { title: "Instalações Residenciais", description: "TV, iluminação e acabamento completo", badge: "Residencial" },
                      ];
                      const caption = captionsList[index % captionsList.length];
                      
                      return (
                        <motion.div
                          key={`mobile-${index}`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.03 }}
                          className="flex-shrink-0 cursor-pointer"
                          style={{ scrollSnapAlign: 'start' }}
                          onClick={() => setSelectedImage(image)}
                        >
                          <div className="w-[280px] h-[370px] bg-card overflow-hidden rounded-2xl border-2 border-border/40 hover:border-accent/50 active:border-accent/70 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/10 active:shadow-accent/20">
                            <div className="relative w-full h-full overflow-hidden group/card">
                              <img
                                src={image}
                                alt={caption.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                loading="lazy"
                              />
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 opacity-70 group-hover/card:opacity-80 transition-opacity duration-300" />
                              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-primary/30 opacity-40 group-hover/card:opacity-60 transition-opacity duration-500" />
                              
                              <div className="absolute top-4 left-4 z-20">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/95 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                  {caption.badge}
                                </span>
                              </div>
                              
                              <div className="absolute top-4 right-4 z-20 opacity-80 group-hover/card:opacity-100 transition-opacity duration-300">
                                <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg group-hover/card:scale-110 transition-transform duration-300">
                                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                  </svg>
                                </div>
                              </div>
                              
                              {/* Efeito de brilho */}
                              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 group-hover/card:animate-shimmer" />
                              </div>
                              
                              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                                <div className="space-y-2">
                                  <h4 className="font-display font-bold text-white text-lg drop-shadow-lg leading-tight">
                                    {caption.title}
                                  </h4>
                                  <p className="text-white/85 text-sm leading-relaxed transform transition-all duration-300 group-hover/card:translate-y-0">
                                    {caption.description}
                                  </p>
                                  <div className="h-1 bg-accent/80 rounded-full w-16 group-hover/card:w-20 transition-all duration-300" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Indicador de deslizar - Interativo e Fixo */}
                  <div className="sticky bottom-4 left-0 right-0 z-30 mt-6">
                    <div className="flex justify-center items-center gap-2 bg-background/80 backdrop-blur-md rounded-full py-3 px-4 mx-auto w-fit shadow-lg border border-border/30">
                      {/* Adiciona indicador para vídeo se existir */}
                      {mediaFiles.video && (
                        <motion.button
                          key="dot-video"
                          onClick={() => {
                            const scrollContainer = mobileScrollRef.current;
                            if (scrollContainer) {
                              scrollContainer.scrollTo({
                                left: 0,
                                behavior: 'smooth'
                              });
                            }
                          }}
                          className={`rounded-full transition-all duration-300 ${
                            activeCardIndex === 0 && mediaFiles.video
                              ? 'w-8 h-2 bg-accent shadow-accent/50 shadow-sm' 
                              : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125'
                          }`}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Ver vídeo"
                        />
                      )}
                      {mediaFiles.images.map((_, index) => (
                        <motion.button
                          key={`dot-${index}`}
                          onClick={() => {
                            const scrollContainer = mobileScrollRef.current;
                            if (scrollContainer) {
                              // Pausa o autoplay temporariamente
                              isUserInteractingRef.current = true;
                              
                              const cardWidth = 280;
                              const gap = 16;
                              const videoOffset = mediaFiles.video ? 1 : 0; // Adiciona offset se tem vídeo
                              
                              // Calcula a posição de scroll para o card (alinhado com scroll-snap-align: start)
                              const scrollPosition = (index + videoOffset) * (cardWidth + gap);
                              
                              scrollContainer.scrollTo({
                                left: scrollPosition,
                                behavior: 'smooth'
                              });

                              // Retoma o autoplay após 5 segundos
                              setTimeout(() => {
                                isUserInteractingRef.current = false;
                              }, 5000);
                            }
                          }}
                          className={`rounded-full transition-all duration-300 ${
                            activeCardIndex === index + (mediaFiles.video ? 1 : 0)
                              ? 'w-8 h-2 bg-accent shadow-accent/50 shadow-sm' 
                              : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125'
                          }`}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Ver foto ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                  </div>
                </div>

                {/* Versão Desktop - Grid com Vídeo Especial */}
                <div className="hidden md:block w-full py-12">
                  <div className="max-w-6xl mx-auto px-6">
                    
                    {/* Seção de Vídeo Destacada */}
                    {mediaFiles.video && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                      >
                        <div className="grid md:grid-cols-5 gap-6 items-center">
                          {/* Vídeo - 3 colunas */}
                          <div className="md:col-span-3">
                            <div className="group relative w-full aspect-video bg-card overflow-hidden rounded-2xl border-2 border-border/50 hover:border-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/20">
                              <video
                                src={mediaFiles.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              
                              {/* Overlay sutil */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Badge no topo */}
                              <div className="absolute top-4 left-4 z-20">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/95 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                  Vídeo
                                </span>
                              </div>
                              
                              {/* Ícone de play */}
                              <div className="absolute top-4 right-4 z-20 opacity-70 group-hover:opacity-100 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Texto ao lado - 2 colunas */}
                          <div className="md:col-span-2 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span className="text-accent text-xs font-semibold uppercase tracking-wider">Em Ação</span>
                            </div>
                            
                            <h3 className="font-display font-bold text-2xl lg:text-3xl text-foreground">
                              Veja Nosso Trabalho na Prática
                            </h3>
                            
                            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                              Acompanhe de perto como realizamos cada serviço com profissionalismo, atenção aos detalhes e compromisso com a qualidade.
                            </p>
                            
                            <div className="space-y-2 pt-2">
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                                <span className="text-sm text-muted-foreground">Técnica profissional comprovada</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                                <span className="text-sm text-muted-foreground">Resultado de alta qualidade</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                                <span className="text-sm text-muted-foreground">Organização e limpeza</span>
                              </div>
                            </div>
                  </div>
                </div>
              </motion.div>
            )}

                    {/* Grid de Fotos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Cards de fotos */}
                {mediaFiles.images.map((image, index) => {
                      // Captions específicos para cada foto na ordem que aparecem
                      const captionsList = [
                        { title: "Quadro Elétrico", description: "Montagem profissional de painéis com disjuntores", badge: "Painel" },
                        { title: "Infraestrutura Elétrica", description: "Instalação completa de eletrodutos e fiação", badge: "Infraestrutura" },
                        { title: "Distribuição Elétrica", description: "Painel de distribuição com proteções", badge: "Distribuição" },
                        { title: "Iluminação Moderna", description: "Spots embutidos e painéis LED de alta qualidade", badge: "Iluminação" },
                        { title: "Energia Solar", description: "Instalação de painéis solares fotovoltaicos", badge: "Solar" },
                        { title: "Instalações Residenciais", description: "TV, iluminação e acabamento completo", badge: "Residencial" },
                      ];
                      const caption = captionsList[index % captionsList.length];
                  
                  return (
                    <motion.div
                      key={index}
                          initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                          whileHover={{ y: -10, scale: 1.02 }}
                          className="cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                          {/* Card simples */}
                          <div className="group relative w-full aspect-[4/3] bg-card overflow-hidden rounded-2xl border-2 border-border/50 hover:border-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-accent/20">
                            {/* Container da imagem */}
                            <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={image}
                          alt={caption.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                                
                                {/* Overlay com gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
                                
                                {/* Overlay colorido ao hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-primary/30 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                
                                {/* Badge no topo */}
                                <div className="absolute top-4 left-4 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/95 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    {caption.badge}
                                  </span>
                                </div>
                                
                                {/* Ícone de expandir */}
                                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                    </svg>
                                  </div>
                                </div>
                                
                                {/* Conteúdo da legenda */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                  <div className="space-y-3">
                                    <h4 className="font-display font-bold text-white text-xl drop-shadow-lg leading-tight">
                            {caption.title}
                          </h4>
                                    <div className="overflow-hidden">
                                      <p className="text-white/85 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            {caption.description}
                          </p>
                                    </div>
                                    {/* Linha decorativa */}
                                    <div className="h-1 bg-accent/80 rounded-full transition-all duration-500 w-12 group-hover:w-20" />
                                  </div>
                                </div>
                                
                                {/* Efeito de brilho ao passar o mouse */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                                  <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 animate-shimmer" 
                                    style={{
                                      animation: 'shimmer 2s ease-in-out infinite'
                                    }}
                                  />
                                </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Modal de Imagem Ampliada */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-5xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Imagem ampliada"
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
