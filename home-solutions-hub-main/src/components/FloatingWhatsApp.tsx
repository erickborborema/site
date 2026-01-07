import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const WHATSAPP_NUMBER = "5511968888724";

export function FloatingWhatsApp() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Preciso de um serviço residencial.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Desktop Floating Button */}
      <button
        onClick={openWhatsApp}
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 font-display font-semibold animate-pulse-soft"
        aria-label="Chamar no WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5" />
        WhatsApp
      </button>
    </>
  );
}
