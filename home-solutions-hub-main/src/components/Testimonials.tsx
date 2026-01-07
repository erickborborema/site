import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { motion, useInView, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "5511999999999";

const testimonials = [
  {
    name: "Maria Aparecida",
    location: "Zona Sul",
    text: "Resolveu rápido e ficou perfeito! Meu chuveiro não esquentava e ele trocou a resistência em menos de uma hora.",
    rating: 5,
  },
  {
    name: "Carlos Eduardo",
    location: "Centro",
    text: "Explicou tudo direitinho e cobrou justo. Já indiquei pra toda família.",
    rating: 5,
  },
  {
    name: "Ana Paula",
    location: "Zona Norte",
    text: "Super pontual e educado. Instalou meu ventilador de teto e deixou tudo limpinho.",
    rating: 5,
  },
  {
    name: "Roberto Silva",
    location: "Zona Oeste",
    text: "Finalmente um eletricista de confiança! Fez o serviço certinho e deu garantia.",
    rating: 5,
  },
  {
    name: "Lucia Santos",
    location: "Zona Leste",
    text: "Mandei foto pelo WhatsApp e ele já passou o orçamento na hora. Muito prático!",
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 30;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touch = e.targetTouches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    setTouchEnd(currentX);
    
    // Prevent vertical scroll if swiping horizontally
    const deltaX = Math.abs(currentX - touchStart.x);
    const deltaY = Math.abs(currentY - touchStart.y);
    
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStart) {
      setIsDragging(false);
      return;
    }
    
    if (touchEnd === null) {
      setTouchStart(null);
      setTouchEnd(null);
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart.x - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Vi os depoimentos e quero um orçamento também!");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section id="depoimentos" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
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
            Depoimentos
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-2 mb-6 px-2">
            O que nossos clientes dizem
          </h2>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4,9/5</span>
            <span className="text-sm">• {testimonials.length}+ Clientes satisfeitos</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 lg:-translate-x-16 p-3 rounded-full bg-card shadow-xl border-2 border-border hover:border-green-500 hover:bg-green-500/5 transition-all duration-300 z-10 group"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-green-500 transition-colors" />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 lg:translate-x-16 p-3 rounded-full bg-card shadow-xl border-2 border-border hover:border-green-500 hover:bg-green-500/5 transition-all duration-300 z-10 group"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-green-500 transition-colors" />
          </button>

          {/* Testimonial Card */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative group"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{ touchAction: 'pan-x pan-y', WebkitTouchCallout: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
              >
                <div className={`bg-card rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border-2 border-border/50 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Quote icon */}
                  <div className="absolute top-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-16 h-16 text-green-500" />
                  </div>

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                          <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground mb-6 sm:mb-8 leading-relaxed px-2 sm:px-4 max-w-3xl mx-auto">
                      <span className="text-green-500 text-3xl leading-none">"</span>
                      <span className="relative">{testimonials[currentIndex].text}</span>
                      <span className="text-green-500 text-3xl leading-none">"</span>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                        <span className="font-display font-bold text-lg text-green-500">
                          {testimonials[currentIndex].name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-display font-semibold text-lg text-foreground">
                          {testimonials[currentIndex].name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-500 w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12 lg:mt-16"
        >
          <Button
            onClick={openWhatsApp}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-display font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto max-w-full"
          >
            <WhatsAppIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Quero meu orçamento no WhatsApp</span>
            <span className="sm:hidden">Orçamento no WhatsApp</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
