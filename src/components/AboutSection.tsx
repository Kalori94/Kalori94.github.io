/**
 * AboutSection — Dark Bioluminescence theme
 * Asymmetric layout: portrait left, content right
 */

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Award, Microscope, BookOpen } from "lucide-react";

const education = [
  {
    degree: "Maestría en Biología Molecular e Ingeniería Genética",
    institution: "Universidad Nacional Autónoma de México",
    year: "2019 – 2021",
    icon: GraduationCap,
    color: "#00ffcc",
  },
  {
    degree: "Licenciatura en Biotecnología",
    institution: "Instituto Politécnico Nacional",
    year: "2014 – 2019",
    icon: BookOpen,
    color: "#0088ff",
  },
  {
    degree: "Certificación en Bioinformática Computacional",
    institution: "EMBL-EBI Online Training",
    year: "2022",
    icon: Award,
    color: "#ff00aa",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #050a0f 0%, #0a1628 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,204,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{ color: "#00ffcc", fontFamily: "'JetBrains Mono', monospace" }}
          >
            01 / Sobre Mí
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,255,204,0.4), transparent)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div
            className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative inline-block">
              {/* Glow frame */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-40"
                style={{
                  background: "linear-gradient(135deg, rgba(0,255,204,0.3), rgba(0,136,255,0.2), rgba(255,0,170,0.2))",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(0,255,204,0.2)",
                  boxShadow: "0 0 40px rgba(0,255,204,0.15)",
                }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663672905785/ZeqXf69ZsCZWkQ8TWMKB28/about-portrait-SfEL3o347zJXfG5JiwukoX.webp"
                  alt="Dra. Valeria Montoya — Biotecnóloga"
                  className="w-full max-w-sm mx-auto block"
                  style={{ filter: "brightness(0.95) contrast(1.05)" }}
                />
                {/* Scan line overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,204,0.02) 3px, rgba(0,255,204,0.02) 4px)",
                  }}
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-3"
                style={{ boxShadow: "0 0 20px rgba(0,255,204,0.2)" }}
              >
                <div className="flex items-center gap-2">
                  <Microscope size={16} style={{ color: "#00ffcc" }} />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "#00ffcc", fontFamily: "'Space Grotesk', sans-serif" }}>
                      Activa
                    </div>
                    <div className="text-xs" style={{ color: "rgba(232,244,248,0.5)" }}>
                      Investigación
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <h2
              className="font-['Space_Grotesk'] font-bold mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f4f8" }}
            >
              Decodificando el{" "}
              <span style={{ color: "#00ffcc", textShadow: "0 0 20px rgba(0,255,204,0.4)" }}>
                lenguaje
              </span>{" "}
              de la vida
            </h2>

            <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(232,244,248,0.7)" }}>
              Soy una biotecnóloga con una profunda pasión por entender los mecanismos moleculares
              que rigen la vida. Mi formación en biología molecular e ingeniería genética me ha
              permitido trabajar en la intersección entre la ciencia experimental y la computacional.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(232,244,248,0.7)" }}>
              Especializada en edición genómica con CRISPR-Cas9, análisis de secuencias de
              nueva generación (NGS) y modelado estadístico de datos biológicos complejos.
              Mi objetivo es traducir hallazgos moleculares en soluciones biotecnológicas
              con impacto real en salud y agricultura.
            </p>

            {/* Education timeline */}
            <div className="space-y-4">
              <h3
                className="text-sm font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(0,255,204,0.7)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Formación Académica
              </h3>
              {education.map((edu, i) => {
                const Icon = edu.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-4 items-start glass-card rounded-lg p-4 transition-all duration-300 hover:border-opacity-40"
                    style={{
                      borderColor: `${edu.color}20`,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}30` }}
                    >
                      <Icon size={16} style={{ color: edu.color }} />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: "#e8f4f8", fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {edu.degree}
                      </div>
                      <div className="text-xs" style={{ color: "rgba(232,244,248,0.5)" }}>
                        {edu.institution}
                      </div>
                      <div
                        className="text-xs mt-1 font-medium"
                        style={{ color: edu.color, fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {edu.year}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
