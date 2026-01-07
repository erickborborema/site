import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const WHATSAPP_NUMBER = "5511999999999";

export function QuickCTA() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Preciso de um serviço residencial. Pode me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section className="bg-card border-y border-border/50 py-3 sm:py-4">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <p className="text-foreground font-medium text-center text-sm sm:text-base">
            📲 Chame no WhatsApp e receba resposta rápida
          </p>
          <Button
            onClick={openWhatsApp}
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold shadow-md whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            Chamar agora
          </Button>
        </div>
      </div>
    </section>
  );
}
