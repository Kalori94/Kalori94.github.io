/**
 * HeroSection — Dark Bioluminescence theme
 * Full-screen hero with DNA canvas animation, typewriter effect
 * DNA helices follow mouse, multiply on click
 */

import { useEffect, useRef, useState } from "react";
import DnaCanvas from "./DnaCanvas";
import { ChevronDown, FlaskConical } from "lucide-react";

const TYPEWRITER_TEXTS = [
  "Bióloga Molecular",
  "Ingeniera Genética",
  "Bioinformática",
  "Bioestadística",
  "Investigadora",
];

function useTypewriter(texts: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return texts[textIdx].slice(0, charIdx);
}

// DNA sequence decoration
const DNA_SEQ = "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const typewriterText = useTypewriter(TYPEWRITER_TEXTS);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050a0f 0%, #0a1628 50%, #050a0f 100%)" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663672905785/ZeqXf69ZsCZWkQ8TWMKB28/hero-bg-62njhWPWrF3ujuRTC2tDZf.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
        }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(0,136,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,255,204,0.06) 0%, transparent 50%)",
        }}
      />

      {/* DNA Canvas — interactive layer */}
      <div className="absolute inset-0 z-2">
        <DnaCanvas />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              background: "rgba(0,255,204,0.08)",
              border: "1px solid rgba(0,255,204,0.25)",
              transitionDelay: "0ms",
            }}
          >
            <FlaskConical size={13} style={{ color: "#00ffcc" }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#00ffcc", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Portfolio Científico
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`font-['Space_Grotesk'] font-bold leading-none mb-2 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              color: "#e8f4f8",
              transitionDelay: "100ms",
            }}
          >
            Dra. Valeria
          </h1>
          <h1
            className={`font-['Space_Grotesk'] font-bold leading-none mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              background: "linear-gradient(90deg, #00ffcc, #0088ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transitionDelay: "180ms",
            }}
          >
            Montoya
          </h1>

          {/* Typewriter */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "280ms" }}
          >
            <span
              className="text-lg md:text-2xl font-['Space_Grotesk'] font-light"
              style={{ color: "rgba(232,244,248,0.6)" }}
            >
              Especialista en
            </span>
            <span
              className="text-lg md:text-2xl font-['Space_Grotesk'] font-semibold"
              style={{ color: "#00ffcc", textShadow: "0 0 20px rgba(0,255,204,0.5)" }}
            >
              {typewriterText}
              <span className="animate-blink" style={{ color: "#00ffcc" }}>|</span>
            </span>
          </div>

          {/* Description */}
          <p
            className={`text-base md:text-lg leading-relaxed mb-8 max-w-xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ color: "rgba(232,244,248,0.65)", transitionDelay: "360ms" }}
          >
            Biotecnóloga con Maestría en Biología Molecular e Ingeniería Genética.
            Apasionada por descifrar el código de la vida a través de la bioinformática,
            la bioestadística y la edición genómica de precisión.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "440ms" }}
          >
            <button
              className="btn-primary"
              onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Investigaciones
            </button>
            <button
              className="btn-outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Colaborar
            </button>
          </div>

          {/* DNA sequence decoration */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "520ms" }}
          >
            <p className="dna-text truncate max-w-sm md:max-w-lg">
              5'—{DNA_SEQ}—3'
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "600ms" }}
        >
          {[
            { value: "8+", label: "Años de experiencia", color: "#00ffcc" },
            { value: "15+", label: "Publicaciones científicas", color: "#0088ff" },
            { value: "3", label: "Patentes registradas", color: "#ff00aa" },
            { value: "12+", label: "Proyectos de investigación", color: "#00e5ff" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-lg p-4 text-center"
              style={{ borderColor: `${stat.color}20` }}
            >
              <div
                className="font-['Space_Grotesk'] font-bold text-3xl mb-1"
                style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}60` }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "rgba(232,244,248,0.5)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hint text */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ color: "rgba(0,255,204,0.4)" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Mueve el mouse · Haz clic
        </span>
        <button onClick={scrollToAbout} className="animate-float">
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  );
}
