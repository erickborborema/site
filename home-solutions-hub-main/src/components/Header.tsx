import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import logo from "@/assets/png branco.png";

const WHATSAPP_NUMBER = "5511968888724";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detectar seção ativa
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(`#${section}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verificar inicialmente
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da PH Soluções Residenciais.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2 group">
              <img 
                src={logo} 
                alt="PH Soluções Residenciais" 
                className="h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <Button
                onClick={openWhatsApp}
                className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Chamar no WhatsApp
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-lg transition-colors relative z-50 ${
                  isScrolled
                    ? "hover:bg-muted"
                    : "hover:bg-muted/50 bg-muted/30"
                }`}
                aria-label="Menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-foreground" />
                  ) : (
                    <Menu className="w-6 h-6 text-foreground" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Fullscreen - Separado do header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] lg:hidden flex flex-col bg-card"
            style={{ 
              paddingTop: 0,
              paddingBottom: 0,
              margin: 0,
              width: '100%',
              height: '100%',
            }}
          >
              {/* Header do Menu */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border/50 flex-shrink-0">
                <a 
                  href="#inicio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img 
                    src={logo} 
                    alt="PH Soluções Residenciais" 
                    className="h-12 w-auto object-contain"
                  />
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-7 h-7 text-foreground" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col flex-1 px-4 sm:px-6 py-6 overflow-y-auto" style={{ minHeight: 0 }}>
                <div className="flex flex-col gap-0.5 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      className={`relative flex items-center px-0 py-5 text-2xl font-bold uppercase tracking-wide transition-colors duration-200 ${
                        activeSection === link.href
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
                
                {/* Footer do Menu */}
                <div className="mt-auto space-y-4 pt-6 border-t border-border/50 flex-shrink-0 pb-6">
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openWhatsApp();
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold text-lg py-6 rounded-xl transition-all shadow-lg"
                  >
                    AGENDAR AGORA
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    © {new Date().getFullYear()} PH Soluções Residenciais. Todos os direitos reservados.
                  </p>
                </div>
              </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
