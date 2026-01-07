import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import logo from "@/assets/png branco.png";

const WHATSAPP_NUMBER = "5511999999999";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de mais informações sobre os serviços.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <footer className="bg-card border-t border-border/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
            {/* Logo & About */}
            <div className="lg:col-span-2">
              <a href="#inicio" className="flex items-center gap-2 mb-4 group">
                <img 
                  src={logo} 
                  alt="PH Soluções Residenciais" 
                  className="h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </a>
              <p className="text-muted-foreground text-sm mb-4 max-w-md leading-relaxed">
                Soluções rápidas e serviço bem feito para sua casa. Elétrica, hidráulica, 
                instalações e reparos com qualidade e transparência.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 mt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Região Metropolitana</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Atendimento em até 2h</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold text-lg mb-4 sm:mb-6 text-foreground">
                Links Rápidos
              </h4>
              <nav className="flex flex-col gap-2.5 sm:gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-green-500 transition-all duration-200 hover:translate-x-1 transform inline-flex items-center group w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 mr-2 transition-opacity duration-200"></span>
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* CTA */}
            <div>
              <h4 className="font-display font-semibold text-lg mb-4 text-foreground">
                Precisa de Ajuda?
              </h4>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Chame no WhatsApp e resolva seu problema rápido. Orçamento grátis e sem compromisso.
              </p>
              <Button
                onClick={openWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-display font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2" />
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} PH Soluções Residenciais. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Desenvolvido por</span>
              <a
                href="https://www.instagram.com/borboremaae"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-500 hover:text-green-600 transition-colors duration-200 flex items-center gap-1 group"
              >
                <span>Erick borborema</span>
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
