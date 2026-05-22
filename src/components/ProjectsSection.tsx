/**
 * ProjectsSection — Dark Bioluminescence theme
 * Interactive project cards with hover glow effects
 */

import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Dna, FlaskConical, BarChart3, Cpu } from "lucide-react";

const projects = [
  {
    title: "GenomicPipeline Pro",
    description: "Pipeline automatizado en Nextflow para análisis de variantes somáticas en datos de secuenciación de tumor-normal. Integra GATK4, Mutect2 y anotación funcional con VEP.",
    tags: ["Nextflow", "Python", "GATK4", "Docker"],
    icon: Cpu,
    color: "#00ffcc",
    github: "#",
    demo: "#",
    status: "Activo",
  },
  {
    title: "CRISPRdesign-ML",
    description: "Herramienta de machine learning para predicción de eficiencia de guías ARN en sistemas CRISPR-Cas9. Entrenada con datos de >50,000 experimentos de edición genómica.",
    tags: ["Python", "scikit-learn", "CRISPR", "ML"],
    icon: Dna,
    color: "#ff00aa",
    github: "#",
    demo: "#",
    status: "Activo",
  },
  {
    title: "BioStat Dashboard",
    description: "Aplicación Shiny interactiva para análisis bioestadístico de datos clínicos. Incluye modelos de supervivencia, análisis de covarianza y visualizaciones publicables.",
    tags: ["R", "Shiny", "ggplot2", "Survival"],
    icon: BarChart3,
    color: "#0088ff",
    github: "#",
    demo: "#",
    status: "Publicado",
  },
  {
    title: "ProteomicsViz",
    description: "Visualizador interactivo de datos de proteómica cuantitativa. Permite explorar redes de interacción proteína-proteína y análisis de enriquecimiento funcional.",
    tags: ["Python", "Plotly", "NetworkX", "STRING"],
    icon: FlaskConical,
    color: "#a78bfa",
    github: "#",
    demo: "#",
    status: "Beta",
  },
  {
    title: "PhyloGenomics Toolkit",
    description: "Suite de herramientas para análisis filogenómico comparativo. Automatiza alineamiento múltiple, construcción de árboles y detección de selección positiva.",
    tags: ["Python", "MAFFT", "IQ-TREE", "PAML"],
    icon: Dna,
    color: "#00e5ff",
    github: "#",
    demo: "#",
    status: "Activo",
  },
  {
    title: "EpiGenome Explorer",
    description: "Plataforma para integración y visualización de datos epigenómicos (ChIP-seq, ATAC-seq). Identifica regiones regulatorias activas y factores de transcripción asociados.",
    tags: ["R", "Bioconductor", "ChIP-seq", "ATAC-seq"],
    icon: Cpu,
    color: "#fb923c",
    github: "#",
    demo: "#",
    status: "Desarrollo",
  },
];

const statusColors: Record<string, string> = {
  "Activo": "#00ffcc",
  "Publicado": "#0088ff",
  "Beta": "#ff00aa",
  "Desarrollo": "#fb923c",
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #050a0f 100%)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663672905785/ZeqXf69ZsCZWkQ8TWMKB28/lab-abstract-RV3crEaEySJoL6eWTzbAsW.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.07,
        }}
      />

      <div className="container relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{ color: "#00ffcc", fontFamily: "'JetBrains Mono', monospace" }}
          >
            04 / Proyectos
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,255,204,0.4), transparent)" }} />
        </div>

        <h2
          className="font-['Space_Grotesk'] font-bold mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#e8f4f8" }}
        >
          Proyectos{" "}
          <span style={{ color: "#00ffcc" }}>Destacados</span>
        </h2>
        <p className="text-base mb-12 max-w-xl" style={{ color: "rgba(232,244,248,0.6)" }}>
          Herramientas bioinformáticas y proyectos de investigación que combinan
          ciencia experimental con desarrollo computacional.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={project.title}
                className={`glass-card rounded-xl p-6 flex flex-col transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  borderColor: isHovered ? `${project.color}40` : `${project.color}15`,
                  boxShadow: isHovered ? `0 0 30px ${project.color}15, 0 8px 30px rgba(0,0,0,0.4)` : "none",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  cursor: "default",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                      boxShadow: isHovered ? `0 0 15px ${project.color}30` : "none",
                    }}
                  >
                    <Icon size={18} style={{ color: project.color }} />
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: `${statusColors[project.status] || "#00ffcc"}15`,
                      color: statusColors[project.status] || "#00ffcc",
                      border: `1px solid ${statusColors[project.status] || "#00ffcc"}30`,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: "#e8f4f8", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "rgba(232,244,248,0.6)" }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(232,244,248,0.5)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 hover:opacity-100"
                    style={{ color: "rgba(232,244,248,0.5)" }}
                  >
                    <Github size={13} /> Código
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
                    style={{ color: project.color }}
                  >
                    <ExternalLink size={13} /> Demo
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
