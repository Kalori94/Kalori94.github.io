/**
 * ResearchSection — Dark Bioluminescence theme
 * Publications and research areas
 */

import { useEffect, useRef, useState } from "react";
import { ExternalLink, BookOpen, Star, Calendar } from "lucide-react";

const publications = [
  {
    title: "CRISPR-Cas9 mediated knockout of BRCA1 in triple-negative breast cancer cells reveals novel therapeutic targets",
    journal: "Nature Communications",
    year: "2023",
    citations: 47,
    doi: "#",
    tags: ["CRISPR", "Oncología", "Genómica"],
    color: "#00ffcc",
    featured: true,
  },
  {
    title: "Transcriptomic analysis of drought stress response in Arabidopsis thaliana using RNA-seq and weighted gene co-expression networks",
    journal: "Plant Cell & Environment",
    year: "2022",
    citations: 31,
    doi: "#",
    tags: ["RNA-seq", "Bioinformática", "Plantas"],
    color: "#0088ff",
    featured: false,
  },
  {
    title: "Development of a lentiviral vector system for stable transgene expression in hematopoietic stem cells",
    journal: "Molecular Therapy",
    year: "2022",
    citations: 28,
    doi: "#",
    tags: ["Terapia Génica", "Vectores Virales", "Células Madre"],
    color: "#ff00aa",
    featured: false,
  },
  {
    title: "Bayesian statistical framework for comparative genomics: identifying selection signatures in pathogen populations",
    journal: "Bioinformatics",
    year: "2021",
    citations: 52,
    doi: "#",
    tags: ["Bioestadística", "Genómica Comparativa", "Patógenos"],
    color: "#00e5ff",
    featured: false,
  },
];

const researchAreas = [
  {
    title: "Edición Genómica de Precisión",
    description: "Desarrollo y optimización de sistemas CRISPR-Cas9 y base editors para corrección de mutaciones patogénicas en modelos celulares y animales.",
    icon: "🧬",
    color: "#00ffcc",
  },
  {
    title: "Genómica Funcional",
    description: "Análisis integrado de datos ómicos (transcriptómica, epigenómica) para identificar redes regulatorias en respuesta a estrés biótico y abiótico.",
    icon: "🔬",
    color: "#0088ff",
  },
  {
    title: "Bioinformática Estructural",
    description: "Modelado computacional de proteínas y predicción de interacciones moleculares usando herramientas de docking y dinámica molecular.",
    icon: "💻",
    color: "#ff00aa",
  },
  {
    title: "Biotecnología Agrícola",
    description: "Desarrollo de cultivos resistentes a patógenos mediante ingeniería genética y análisis de QTLs para caracteres agronómicos de interés.",
    icon: "🌱",
    color: "#a78bfa",
  },
];

export default function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #050a0f 0%, #0a1628 50%, #050a0f 100%)" }}
    >
      {/* Decorative element */}
      <div
        className="absolute right-0 top-1/4 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00ffcc, transparent)", filter: "blur(60px)" }}
      />

      <div className="container relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{ color: "#00ffcc", fontFamily: "'JetBrains Mono', monospace" }}
          >
            03 / Investigación
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,255,204,0.4), transparent)" }} />
        </div>

        <h2
          className="font-['Space_Grotesk'] font-bold mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#e8f4f8" }}
        >
          Líneas de{" "}
          <span style={{ color: "#00ffcc" }}>Investigación</span>
        </h2>
        <p className="text-base mb-12 max-w-xl" style={{ color: "rgba(232,244,248,0.6)" }}>
          Trabajo en la frontera entre la biología experimental y la computacional,
          abordando preguntas fundamentales sobre la regulación genómica y sus aplicaciones.
        </p>

        {/* Research areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {researchAreas.map((area, i) => (
            <div
              key={area.title}
              className={`glass-card rounded-xl p-5 transition-all duration-700 hover:-translate-y-1 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                borderColor: `${area.color}20`,
              }}
            >
              <div className="text-3xl mb-3">{area.icon}</div>
              <h3
                className="font-semibold text-sm mb-2"
                style={{ color: area.color, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {area.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(232,244,248,0.55)" }}>
                {area.description}
              </p>
            </div>
          ))}
        </div>

        {/* Publications */}
        <div>
          <h3
            className="font-['Space_Grotesk'] font-semibold text-lg mb-6"
            style={{ color: "#e8f4f8" }}
          >
            Publicaciones Seleccionadas
          </h3>

          <div className="space-y-4">
            {publications.map((pub, i) => (
              <div
                key={i}
                className={`glass-card rounded-xl p-5 md:p-6 transition-all duration-700 hover:border-opacity-40 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${200 + i * 80}ms`,
                  borderColor: pub.featured ? `${pub.color}30` : `${pub.color}15`,
                  boxShadow: pub.featured ? `0 0 20px ${pub.color}10` : "none",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {pub.featured && (
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: `${pub.color}20`, color: pub.color, border: `1px solid ${pub.color}30` }}
                        >
                          <Star size={10} /> Destacada
                        </span>
                      )}
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "rgba(232,244,248,0.5)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h4
                      className="font-semibold text-sm md:text-base mb-2 leading-snug"
                      style={{ color: "#e8f4f8", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {pub.title}
                    </h4>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: "rgba(232,244,248,0.5)" }}>
                      <span className="flex items-center gap-1">
                        <BookOpen size={11} />
                        <span style={{ color: pub.color }}>{pub.journal}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {pub.year}
                      </span>
                      <span style={{ color: "rgba(232,244,248,0.4)" }}>
                        {pub.citations} citas
                      </span>
                    </div>
                  </div>

                  {/* DOI link */}
                  <a
                    href={pub.doi}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 flex-shrink-0 self-start"
                    style={{
                      background: `${pub.color}10`,
                      border: `1px solid ${pub.color}25`,
                      color: pub.color,
                    }}
                  >
                    <ExternalLink size={12} />
                    Ver DOI
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
