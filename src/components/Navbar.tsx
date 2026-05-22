/**
 * Navbar — Dark Bioluminescence theme
 * Sticky nav with glassmorphism on scroll
 */

import { useState, useEffect } from "react";
import { Menu, X, Dna } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre Mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Investigación", href: "#research" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(5, 10, 15, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,204,0.1)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00ffcc, #0088ff)",
                boxShadow: "0 0 15px rgba(0,255,204,0.5)",
              }}
            >
              <Dna size={16} className="text-[#050a0f]" />
            </div>
            <span
              className="font-['Space_Grotesk'] font-semibold text-sm tracking-wide"
              style={{ color: "#e8f4f8" }}
            >
              V. Montoya
              <span
                className="block text-xs font-light"
                style={{ color: "rgba(0,255,204,0.7)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Biotecnóloga
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link text-sm font-['Space_Grotesk'] font-medium transition-colors"
                  style={{
                    color: isActive ? "#00ffcc" : "rgba(232,244,248,0.7)",
                    textShadow: isActive ? "0 0 10px rgba(0,255,204,0.6)" : "none",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-primary text-sm"
            >
              Contactar
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#00ffcc" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "rgba(5,10,15,0.97)",
          borderBottom: menuOpen ? "1px solid rgba(0,255,204,0.15)" : "none",
        }}
      >
        <div className="container py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-2 nav-link font-['Space_Grotesk'] font-medium"
              style={{ color: "rgba(232,244,248,0.8)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn-primary text-sm mt-2"
          >
            Contactar
          </button>
        </div>
      </div>
    </nav>
  );
}
