import { CheckCircle2, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import videoBackground from "@/assets/SaveClip.App_AQPFuLAOH1r0RgbnhGxjow0JboSR8FNThg4a0NFG3Jj5wy-fY3r7FA6qIIdlAxK2vswZcm_KBNdHfvfEFDkN1aCpgY0XRvZVDRAcLEI.mp4";

const WHATSAPP_NUMBER = "5511968888724";

export function Hero() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Quero solicitar um orçamento para serviços residenciais.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden">
      {/* Vídeo de fundo com opacidade baixa - SOMENTE DESKTOP */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src={videoBackground} type="video/mp4" />
        </video>
      </div>
      
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
      
      {/* Decoração de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* Badges de confiança */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="mb-6 sm:mb-8"
          >
            {/* Mobile: Grid layout */}
            <div className="grid grid-cols-3 gap-2 sm:hidden max-w-sm mx-auto">
              <div className="flex flex-col items-center gap-1.5 px-2.5 py-3 bg-card border border-border rounded-xl shadow-sm">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground font-medium text-[10px] leading-tight text-center">Orçamento Grátis</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 px-2.5 py-3 bg-card border border-border rounded-xl shadow-sm">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground font-medium text-[10px] leading-tight text-center">Resposta Rápida</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 px-2.5 py-3 bg-card border border-border rounded-xl shadow-sm">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground font-medium text-[10px] leading-tight text-center">Garantia</span>
              </div>
            </div>
            
            {/* Desktop: Horizontal layout */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border border-border rounded-full text-xs sm:text-sm shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <span className="text-foreground font-medium whitespace-nowrap">Orçamento Grátis</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border border-border rounded-full text-xs sm:text-sm shadow-sm hover:shadow-md transition-shadow">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <span className="text-foreground font-medium whitespace-nowrap">Resposta Rápida</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card border border-border rounded-full text-xs sm:text-sm shadow-sm hover:shadow-md transition-shadow">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <span className="text-foreground font-medium whitespace-nowrap">Garantia</span>
              </div>
            </div>
          </motion.div>

          {/* Headline com animação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 sm:mb-10"
          >
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground leading-[1.1] mb-6 flex flex-row items-center justify-center gap-2 sm:gap-2 md:gap-3">
              <span className="text-shadow-sm whitespace-nowrap">Soluções</span>
              <ContainerTextFlip 
                words={["Elétricas", "Hidráulicas", "em Reparos", "em Manutenção", "em Instalações", "em Alvenaria"]}
                interval={2500}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold whitespace-nowrap"
                textClassName="text-accent whitespace-nowrap"
              />
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed"
          >
            Atendimento rápido e confiável para sua casa. 
            <br className="hidden sm:block" />
            Pequenos reparos e soluções completas com agilidade.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={openWhatsApp}
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <WhatsAppIcon className="w-5 h-5 mr-2" />
              Pedir orçamento
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto border-2 border-border text-foreground hover:bg-muted font-semibold text-base sm:text-lg px-8 py-6 transition-all transform hover:scale-105"
            >
              <a href="#servicos">Ver serviços</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
