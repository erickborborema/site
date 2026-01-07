import { useRef, useState } from "react";
import { Send, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, useInView } from "framer-motion";

const WHATSAPP_NUMBER = "5511999999999";

const serviceOptions = [
  "Elétrica residencial",
  "Instalação de luminária",
  "Instalação de ventilador de teto",
  "Troca de tomada/interruptor",
  "Problema no disjuntor",
  "Instalação de chuveiro",
  "Montagem/instalação",
  "Outro serviço",
];

const urgencyOptions = [
  { value: "hoje", label: "Hoje (urgente)" },
  { value: "semana", label: "Essa semana" },
  { value: "sem-pressa", label: "Sem pressa" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    neighborhood: "",
    service: "",
    urgency: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, neighborhood, service, urgency, description } = formData;
    
    let message = `Olá! Meu nome é ${name || "não informado"}.`;
    if (neighborhood) message += ` Moro em ${neighborhood}.`;
    if (service) message += ` Preciso de: ${service}.`;
    if (urgency) {
      const urgencyLabel = urgencyOptions.find(u => u.value === urgency)?.label || urgency;
      message += ` Urgência: ${urgencyLabel}.`;
    }
    if (description) message += ` Detalhes: ${description}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contato" className="section-padding bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
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
            Contato
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mt-2 mb-4 px-2">
            Fale comigo agora
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
            Preencha o formulário ou chame direto no WhatsApp. 
            Respondo rápido e passo o orçamento sem compromisso.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group flex items-start gap-4 p-5 rounded-xl bg-card border-2 border-border/50 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-sm sm:text-base lg:text-lg text-foreground mb-1 group-hover:text-green-500 transition-colors">
                    Horário de atendimento
                  </h4>
                  <p className="text-sm text-muted-foreground">Segunda a Sábado: 7h às 19h</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group flex items-start gap-4 p-5 rounded-xl bg-card border-2 border-border/50 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-base lg:text-lg text-foreground mb-1 group-hover:text-green-500 transition-colors">
                    Região de atendimento
                  </h4>
                  <p className="text-sm text-muted-foreground">Toda a região metropolitana</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-card border-2 border-border/50 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-sm sm:text-base lg:text-lg text-foreground mb-1 group-hover:text-green-500 transition-colors">
                    Tempo de resposta
                  </h4>
                  <p className="text-sm text-muted-foreground">Em até 2 horas no horário comercial</p>
                </div>
              </motion.div>
            </div>

            {/* Direct WhatsApp Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={() => {
                  const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento.");
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
                }}
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-display font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Chamar direto no WhatsApp</span>
                <span className="sm:hidden">Chamar no WhatsApp</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-border/50 space-y-5 sm:space-y-6 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl opacity-50" />

                <div className="relative z-10 space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2.5">
                      Seu nome
                    </label>
                    <Input
                      id="name"
                      placeholder="Como posso te chamar?"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="bg-muted/50 border-2 border-border hover:border-green-500/50 focus:border-green-500 transition-colors h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="neighborhood" className="block text-sm font-semibold text-foreground mb-2.5">
                      Bairro / Cidade
                    </label>
                    <Input
                      id="neighborhood"
                      placeholder="Onde você mora?"
                      value={formData.neighborhood}
                      onChange={(e) => updateField("neighborhood", e.target.value)}
                      className="bg-muted/50 border-2 border-border hover:border-green-500/50 focus:border-green-500 transition-colors h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-foreground mb-2.5">
                      Tipo de serviço
                    </label>
                    <Select value={formData.service} onValueChange={(value) => updateField("service", value)}>
                      <SelectTrigger className="bg-muted/50 border-2 border-border hover:border-green-500/50 focus:border-green-500 transition-colors h-12">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="urgency" className="block text-sm font-semibold text-foreground mb-2.5">
                      Urgência
                    </label>
                    <Select value={formData.urgency} onValueChange={(value) => updateField("urgency", value)}>
                      <SelectTrigger className="bg-muted/50 border-2 border-border hover:border-green-500/50 focus:border-green-500 transition-colors h-12">
                        <SelectValue placeholder="Quando você precisa?" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2.5">
                      Descreva o problema
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Conte o que está acontecendo... (mande foto pelo WhatsApp depois)"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      className="bg-muted/50 border-2 border-border hover:border-green-500/50 focus:border-green-500 transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-display font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mt-2"
                  >
                    <Send className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="hidden sm:inline">Enviar e falar no WhatsApp</span>
                    <span className="sm:hidden">Enviar no WhatsApp</span>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground pt-2">
                    Ao enviar, você será redirecionado para o WhatsApp com os dados preenchidos
                  </p>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
