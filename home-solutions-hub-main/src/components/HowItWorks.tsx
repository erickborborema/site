import { useRef, useState } from "react";
import { MessageCircle, Camera, FileText, CheckCircle, ChevronDown, X } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Função para importar arquivos dinamicamente
// Busca arquivos que começam com "SaveClip" na pasta src/assets
const importMediaFiles = () => {
  const images: string[] = [];
  let video: string | undefined;
  
  // Usar import.meta.glob para encontrar arquivos dinamicamente
  try {
    // Buscar todas as imagens que começam com "SaveClip"
    const imagePattern = import.meta.glob('/src/assets/SaveClip*.{jpg,jpeg,png,JPG,JPEG,PNG}', { 
      eager: true,
      import: 'default'
    });
    
    // Buscar vídeo que começa com "SaveClip"
    const videoPattern = import.meta.glob('/src/assets/SaveClip*.{mp4,mov,webm,MP4,MOV,WEBM}', { 
      eager: true,
      import: 'default'
    });
    
    // Adicionar imagens encontradas (ordenar por nome para consistência)
    const imageEntries = Object.entries(imagePattern)
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
  
  // Importar arquivos de mídia
  const mediaFiles = importMediaFiles();

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
        <div className="relative mb-12">
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

        {/* Galeria de Fotos e Vídeo */}
        {(mediaFiles.images.length > 0 || mediaFiles.video) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 2 }}
            className="max-w-6xl mx-auto"
          >
            <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-center mb-8 text-foreground">
              Veja nosso trabalho
            </h3>
            
            {/* Vídeo */}
            {mediaFiles.video && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="mb-8"
              >
                <div className="relative group rounded-2xl overflow-hidden border-2 border-border/50 hover:border-accent/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="relative aspect-video bg-muted">
                    <video
                      src={mediaFiles.video}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Legenda do Vídeo */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 sm:p-6 pointer-events-none">
                    <h4 className="font-display font-bold text-white text-lg sm:text-xl mb-1">
                      Trabalho em Ação
                    </h4>
                    <p className="text-white/90 text-sm sm:text-base">
                      Veja na prática como realizamos nossos serviços com qualidade e agilidade
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Galeria de Fotos */}
            {mediaFiles.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {mediaFiles.images.map((image, index) => {
                  const captions = [
                    { title: "Instalação Elétrica", description: "Trabalho profissional com segurança e qualidade" },
                    { title: "Reparos Residenciais", description: "Soluções rápidas para sua casa" },
                    { title: "Serviços Especializados", description: "Capricho e atenção aos detalhes" },
                  ];
                  const caption = captions[index] || { title: "Nosso Trabalho", description: "Qualidade e compromisso" };
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 2.4 + index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border-2 border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer bg-card"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        <img
                          src={image}
                          alt={caption.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        {/* Legenda da Foto */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform translate-y-0 group-hover:translate-y-0 transition-all duration-300">
                          <h4 className="font-display font-bold text-white text-base sm:text-lg mb-1">
                            {caption.title}
                          </h4>
                          <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                            {caption.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
