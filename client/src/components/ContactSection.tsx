/**
 * ContactSection + Footer — Dark Bioluminescence theme
 */

import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Github, Twitter, MapPin, Send, Dna } from "lucide-react";
import { toast } from "sonner";

const contactLinks = [
  { icon: Mail, label: "Email", value: "v.montoya@biolab.mx", href: "mailto:v.montoya@biolab.mx", color: "#00ffcc" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/valeria-montoya", href: "#", color: "#0088ff" },
  { icon: Github, label: "GitHub", value: "github.com/vmontoya-bio", href: "#", color: "#a78bfa" },
  { icon: Twitter, label: "Twitter/X", value: "@vmontoya_bio", href: "#", color: "#00e5ff" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Mensaje enviado correctamente. Te responderé pronto.", {
        style: { background: "#0d1f35", border: "1px solid rgba(0,255,204,0.3)", color: "#e8f4f8" },
      });
    }, 1500);
  };

  const inputStyle = {
    background: "rgba(13,31,53,0.6)",
    border: "1px solid rgba(0,255,204,0.15)",
    color: "#e8f4f8",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    fontFamily: "'Lato', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative py-24 md:py-32"
        style={{ background: "linear-gradient(180deg, #050a0f 0%, #0a1628 100%)" }}
      >
        {/* Glow */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #00ffcc, transparent)", filter: "blur(80px)" }}
        />

        <div className="container relative z-10">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs tracking-widest uppercase font-medium"
              style={{ color: "#00ffcc", fontFamily: "'JetBrains Mono', monospace" }}
            >
              05 / Contacto
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,255,204,0.4), transparent)" }} />
          </div>

          <h2
            className="font-['Space_Grotesk'] font-bold mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#e8f4f8" }}
          >
            Hablemos de{" "}
            <span style={{ color: "#00ffcc" }}>Ciencia</span>
          </h2>
          <p className="text-base mb-12 max-w-xl" style={{ color: "rgba(232,244,248,0.6)" }}>
            ¿Tienes un proyecto de investigación, colaboración académica o propuesta
            biotecnológica? Me encantaría escucharte.
          </p>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact info */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="space-y-4 mb-8">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-4 glass-card rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 group"
                      style={{ borderColor: `${link.color}15` }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
                      >
                        <Icon size={17} style={{ color: link.color }} />
                      </div>
                      <div>
                        <div className="text-xs mb-0.5" style={{ color: "rgba(232,244,248,0.4)" }}>
                          {link.label}
                        </div>
                        <div
                          className="text-sm font-medium group-hover:underline"
                          style={{ color: "#e8f4f8" }}
                        >
                          {link.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(232,244,248,0.4)" }}>
                <MapPin size={14} style={{ color: "#00ffcc" }} />
                Ciudad de México, México · Disponible para trabajo remoto
              </div>
            </div>

            {/* Contact form */}
            <div
              className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "rgba(232,244,248,0.5)" }}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.15)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "rgba(232,244,248,0.5)" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@email.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.15)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "rgba(232,244,248,0.5)" }}>
                    Asunto
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Propuesta de colaboración..."
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.15)")}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "rgba(232,244,248,0.5)" }}>
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,255,204,0.15)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  style={{ opacity: sending ? 0.7 : 1 }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 border-t"
        style={{
          background: "#050a0f",
          borderColor: "rgba(0,255,204,0.1)",
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00ffcc, #0088ff)", boxShadow: "0 0 10px rgba(0,255,204,0.4)" }}
              >
                <Dna size={13} className="text-[#050a0f]" />
              </div>
              <span className="font-['Space_Grotesk'] font-medium text-sm" style={{ color: "#e8f4f8" }}>
                Dra. Valeria Montoya
              </span>
            </div>

            <p
              className="text-xs text-center"
              style={{ color: "rgba(232,244,248,0.35)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              © 2024 · Biotecnóloga · Biología Molecular · Ingeniería Genética
            </p>

            <p
              className="text-xs"
              style={{ color: "rgba(0,255,204,0.4)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              5'—ATCG—3'
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
