/**
 * SkillsSection — Dark Bioluminescence theme
 * Animated skill bars with fluorescent glow
 */

import { useEffect, useRef, useState } from "react";
import { Dna, FlaskConical, BarChart3, Cpu, Microscope, Database } from "lucide-react";

const skillCategories = [
  {
    title: "Biología Molecular",
    icon: Dna,
    color: "#00ffcc",
    skills: [
      { name: "PCR & qPCR", level: 97 },
      { name: "Western Blot", level: 92 },
      { name: "Clonación Molecular", level: 95 },
      { name: "Cultivo Celular", level: 88 },
    ],
  },
  {
    title: "Ingeniería Genética",
    icon: FlaskConical,
    color: "#ff00aa",
    skills: [
      { name: "CRISPR-Cas9", level: 90 },
      { name: "Edición Genómica", level: 85 },
      { name: "Vectores Virales", level: 80 },
      { name: "Mutagénesis Dirigida", level: 88 },
    ],
  },
  {
    title: "Bioinformática",
    icon: Cpu,
    color: "#0088ff",
    skills: [
      { name: "Análisis NGS / RNA-seq", level: 88 },
      { name: "Python & Biopython", level: 85 },
      { name: "R / Bioconductor", level: 82 },
      { name: "BLAST / Alineamiento", level: 90 },
    ],
  },
  {
    title: "Bioestadística",
    icon: BarChart3,
    color: "#00e5ff",
    skills: [
      { name: "Análisis Multivariado", level: 83 },
      { name: "Modelos Lineales Mixtos", level: 78 },
      { name: "Machine Learning Biológico", level: 75 },
      { name: "Visualización de Datos", level: 87 },
    ],
  },
  {
    title: "Técnicas de Laboratorio",
    icon: Microscope,
    color: "#a78bfa",
    skills: [
      { name: "Microscopía Confocal", level: 85 },
      { name: "Citometría de Flujo", level: 80 },
      { name: "Electroforesis en Gel", level: 95 },
      { name: "ELISA & Inmunoensayos", level: 90 },
    ],
  },
  {
    title: "Herramientas & Software",
    icon: Database,
    color: "#fb923c",
    skills: [
      { name: "NCBI / Ensembl", level: 92 },
      { name: "Galaxy / Nextflow", level: 75 },
      { name: "PyMOL / UCSF Chimera", level: 70 },
      { name: "ImageJ / FIJI", level: 88 },
    ],
  },
];

function SkillBar({ name, level, color, animate }: { name: string; level: number; color: string; animate: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm" style={{ color: "rgba(232,244,248,0.8)", fontFamily: "'Lato', sans-serif" }}>
          {name}
        </span>
        <span
          className="text-xs font-medium"
          style={{ color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: animate ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
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
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #050a0f 100%)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663672905785/ZeqXf69ZsCZWkQ8TWMKB28/skills-bg-KC5TkdAD73tk939f6gYepT.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{ color: "#00ffcc", fontFamily: "'JetBrains Mono', monospace" }}
          >
            02 / Habilidades
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,255,204,0.4), transparent)" }} />
        </div>

        <h2
          className="font-['Space_Grotesk'] font-bold mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#e8f4f8" }}
        >
          Competencias{" "}
          <span style={{ color: "#00ffcc" }}>Científicas</span>
        </h2>
        <p className="text-base mb-12 max-w-xl" style={{ color: "rgba(232,244,248,0.6)" }}>
          Una combinación única de habilidades experimentales y computacionales
          que permiten abordar problemas biológicos complejos desde múltiples perspectivas.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`glass-card rounded-xl p-6 transition-all duration-700 hover:border-opacity-40 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${catIdx * 80}ms`,
                  borderColor: `${cat.color}20`,
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                  >
                    <Icon size={17} style={{ color: cat.color }} />
                  </div>
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "#e8f4f8", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Skills */}
                {cat.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    animate={visible}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Tech tags */}
        <div className="mt-12">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "rgba(0,255,204,0.6)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Tecnologías & Plataformas
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "CRISPR-Cas9", "NGS", "RNA-seq", "ChIP-seq", "ATAC-seq",
              "Python", "R", "Biopython", "Bioconductor", "Nextflow",
              "NCBI", "Ensembl", "UniProt", "PDB", "KEGG",
              "ImageJ", "PyMOL", "Galaxy", "GATK", "DESeq2",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(0,255,204,0.06)",
                  border: "1px solid rgba(0,255,204,0.2)",
                  color: "rgba(0,255,204,0.8)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
