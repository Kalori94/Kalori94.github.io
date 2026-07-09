/* ============================================================
   PORTFOLIO SCRIPTS — Dra. Valeria Montoya
   Módulos: Navbar · Typewriter · DNA Canvas · Skills ·
            Proyectos · Intersection Observer · Formulario
   ============================================================ */

/* ── 1. NAVBAR — glassmorphism on scroll + active link ───── */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");

  /* Glassmorphism on scroll */
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    /* Highlight active section */
    const sections = ["hero", "about", "skills", "research", "projects", "contact"];
    let current = "hero";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    }
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === current);
    });
  }, { passive: true });

  /* Smooth scroll on nav click */
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* Mobile hamburger */
  const hamburger   = document.getElementById("hamburger");
  const mobileMenu  = document.getElementById("mobile-menu");
  hamburger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });

  /* Close mobile menu on link click */
  mobileMenu.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
    });
  });
})();


/* ── 2. TYPEWRITER EFFECT ────────────────────────────────── */
(function initTypewriter() {
  const words = [
    "Biología Molecular",
    "Ingeniera Genética",
    "Bioinformática",
    "Bioestadística",
    "Investigadora",
  ];
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  let wordIndex = 0, charIndex = 0, deleting = false;
  const SPEED_TYPE = 80, SPEED_DELETE = 40, PAUSE = 1800;

  function tick() {
    const word = words[wordIndex];
    if (!deleting && charIndex < word.length) {
      el.textContent = word.slice(0, ++charIndex);
      setTimeout(tick, SPEED_TYPE);
    } else if (!deleting && charIndex === word.length) {
      deleting = true;
      setTimeout(tick, PAUSE);
    } else if (deleting && charIndex > 0) {
      el.textContent = word.slice(0, --charIndex);
      setTimeout(tick, SPEED_DELETE);
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 100);
    }
  }
  setTimeout(tick, 800);
})();


/* ── 3. DNA HELIX 3D — rotating double helix + mouse parallax ── */
(function initDnaHelix3D() {
  const viewport = document.getElementById("dna-helix-viewport");
  const tilt     = document.getElementById("dna-helix-tilt");
  const spin     = document.getElementById("dna-helix-spin");
  if (!viewport || !tilt || !spin) return;

  const PAIRS = [
    { left: "A", right: "T", color: "#fb923c" }, // --or amber
    { left: "C", right: "G", color: "#ff00aa" }, // --mg rose
    { left: "T", right: "A", color: "#fb923c" },
    { left: "G", right: "C", color: "#ff00aa" },
  ];
  const TEAL = "#00ffcc"; // --cy
  const BLUE = "#0088ff"; // --bl

  const N_RUNGS = 28;
  const GAP = 24;
  const RADIUS = 130;
  const TWIST_TOTAL = 780;

  const totalHeight = N_RUNGS * GAP;
  const twistStep = TWIST_TOTAL / N_RUNGS;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < N_RUNGS; i++) {
    const pair = PAIRS[i % PAIRS.length];
    const y = i * GAP - totalHeight / 2;
    const twist = i * twistStep;
    const depthFade = 0.4 + 0.6 * Math.abs(Math.cos((twist * Math.PI) / 180));

    const rung = document.createElement("div");
    rung.className = "dna-rung";
    rung.style.transform = `translateY(${y}px) rotateY(${twist}deg)`;

    const bar = document.createElement("div");
    bar.className = "dna-rung-bar";
    bar.style.left = `${-RADIUS}px`;
    bar.style.width = `${RADIUS * 2}px`;
    bar.style.background = pair.color;
    bar.style.opacity = depthFade;
    bar.style.boxShadow = `0 0 8px ${pair.color}`;

    const nodeL = document.createElement("div");
    nodeL.className = "dna-rung-node";
    nodeL.style.left = `${-RADIUS - 6}px`;
    nodeL.style.background = TEAL;
    nodeL.style.boxShadow = `0 0 10px ${TEAL}`;
    nodeL.style.opacity = depthFade;

    const nodeR = document.createElement("div");
    nodeR.className = "dna-rung-node";
    nodeR.style.left = `${RADIUS - 6}px`;
    nodeR.style.background = BLUE;
    nodeR.style.boxShadow = `0 0 10px ${BLUE}`;
    nodeR.style.opacity = depthFade;

    const labelL = document.createElement("div");
    labelL.className = "dna-rung-label";
    labelL.textContent = pair.left;
    labelL.style.left = `${-RADIUS - 34}px`;
    labelL.style.textAlign = "right";
    labelL.style.color = TEAL;
    labelL.style.opacity = depthFade;

    const labelR = document.createElement("div");
    labelR.className = "dna-rung-label";
    labelR.textContent = pair.right;
    labelR.style.left = `${RADIUS + 14}px`;
    labelR.style.textAlign = "left";
    labelR.style.color = BLUE;
    labelR.style.opacity = depthFade;

    rung.append(bar, nodeL, nodeR, labelL, labelR);
    frag.appendChild(rung);
  }
  spin.appendChild(frag);

  /* Mouse parallax tilt — tracked on the whole hero so it works even
     though the helix layer itself is pointer-events:none */
  const hero = document.getElementById("hero");
  const moveTarget = hero || viewport;
  moveTarget.addEventListener("mousemove", (e) => {
    const rect = moveTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    tilt.style.transform =
      `translate(-50%, -50%) rotateX(${(ny * -8).toFixed(2)}deg) rotateY(${(nx * 16).toFixed(2)}deg)`;
  });
  moveTarget.addEventListener("mouseleave", () => {
    tilt.style.transform = "translate(-50%, -50%)";
  });
})();


/* ── 4. SKILLS — render cards + animate bars ─────────────── */
(function initSkills() {
  const CATEGORIES = [
    { title: "Biología Molecular",     icon: "🧬", color: "#00ffcc",
      skills: [["PCR & qPCR",97],["Clonación Molecular",95],["Cultivo Celular",70]] },
    { title: "Ingeniería Genética",    icon: "⚗️",  color: "#ff00aa",
      skills: [["CRISPR-Cas9",90],["Edición Genómica",85],["Vectores Virales",80],] },
    { title: "Bioinformática",         icon: "💻", color: "#0088ff",
      skills: [["Análisis NGS / RNA-seq",88],["Python & Biopython",85],["R / Bioconductor",82],["BLAST / Alineamiento",90]] },
    { title: "Bioestadística",         icon: "📊", color: "#00e5ff",
      skills: [["Análisis Multivariado",83],["Modelos Lineales Mixtos",78],["Visualización de Datos",87]] },
    { title: "Técnicas de Laboratorio",icon: "🔬", color: "#a78bfa",
      skills: [["Microscopía Confocal",85],["Electroforesis en Gel",95]] },
    { title: "Herramientas & Software", icon: "🗄️", color: "#fb923c",
      skills: [["NCBI / Ensembl",92],["Galaxy / TensorFlow",75],["QIIME",70],["MEGA / IQTREE",88]] },
  ];

  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  CATEGORIES.forEach((cat, i) => {
    const card = document.createElement("div");
    card.className = "glass skill-card fade-up";
    card.style.transitionDelay = `${i * 80}ms`;
    card.innerHTML = `
      <div class="skill-cat-header">
        <div class="skill-cat-icon" style="background:${cat.color}18;border:1px solid ${cat.color}30">${cat.icon}</div>
        <span class="skill-cat-name">${cat.title}</span>
      </div>
      ${cat.skills.map(([name, pct]) => `
        <div class="skill-row">
          <div class="skill-meta">
            <span class="skill-name">${name}</span>
            <span class="skill-pct" style="color:${cat.color}">${pct}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-fill"
                 data-width="${pct}"
                 style="background:linear-gradient(90deg,${cat.color},${cat.color}99);
                        box-shadow:0 0 6px ${cat.color}80">
            </div>
          </div>
        </div>
      `).join("")}
    `;
    grid.appendChild(card);
  });
})();


/* ── 5. PROJECTS — render cards dynamically ──────────────── */
(function initProjects() {
  const PROJECTS = [
    { title: "GenomicPipeline Pro",
      desc: "Pipeline automatizado en Nextflow para análisis de variantes somáticas en datos de secuenciación de tumor-normal. Integra GATK4, Mutect2 y anotación funcional con VEP.",
      tags: ["Nextflow","Python","GATK4","Docker"], icon: "💻", color: "#00ffcc", status: "Activo",   github: "#", demo: "#" },
    { title: "CRISPRdesign-ML",
      desc: "Herramienta de machine learning para predicción de eficiencia de guías ARN en sistemas CRISPR-Cas9. Entrenada con datos de >50,000 experimentos de edición genómica.",
      tags: ["Python","scikit-learn","CRISPR","ML"],  icon: "🧬", color: "#ff00aa", status: "Activo",   github: "#", demo: "#" },
    { title: "BioStat Dashboard",
      desc: "Aplicación Shiny interactiva para análisis bioestadístico de datos clínicos. Incluye modelos de supervivencia, análisis de covarianza y visualizaciones publicables.",
      tags: ["R","Shiny","ggplot2","Survival"],        icon: "📊", color: "#0088ff", status: "Publicado",github: "#", demo: "#" },
    { title: "ProteomicsViz",
      desc: "Visualizador interactivo de datos de proteómica cuantitativa. Permite explorar redes de interacción proteína-proteína y análisis de enriquecimiento funcional.",
      tags: ["Python","Plotly","NetworkX","STRING"],   icon: "⚗️", color: "#a78bfa", status: "Beta",     github: "#", demo: "#" },
    { title: "PhyloGenomics Toolkit",
      desc: "Suite de herramientas para análisis filogenómico comparativo. Automatiza alineamiento múltiple, construcción de árboles y detección de selección positiva.",
      tags: ["Python","MAFFT","IQ-TREE","PAML"],      icon: "🌿", color: "#00e5ff", status: "Activo",   github: "#", demo: "#" },
    { title: "EpiGenome Explorer",
      desc: "Plataforma para integración y visualización de datos epigenómicos (ChIP-seq, ATAC-seq). Identifica regiones regulatorias activas y factores de transcripción asociados.",
      tags: ["R","Bioconductor","ChIP-seq","ATAC-seq"],icon: "🔭", color: "#fb923c", status: "Desarrollo",github:"#", demo: "#" },
  ]; 

  const STATUS_COLORS = {
    "Activo":    "#00ffcc",
    "Publicado": "#0088ff",
    "Beta":      "#ff00aa",
    "Desarrollo":"#fb923c",
  };

  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  PROJECTS.forEach((p, i) => {
    const sc   = STATUS_COLORS[p.status] || "#00ffcc";
    const card = document.createElement("div");
    card.className = "glass project-card fade-up";
    card.style.transitionDelay = `${i * 70}ms`;
    card.innerHTML = `
      <div class="project-header">
        <div class="project-icon" style="background:${p.color}18;border:1px solid ${p.color}30">${p.icon}</div>
        <span class="project-status" style="background:${sc}15;color:${sc};border:1px solid ${sc}30">${p.status}</span>
      </div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}</div>
      <div class="project-links">
        <a href="${p.github}" class="project-link">⌂ Código</a>
        <a href="${p.demo}"   class="project-link demo-link" style="color:${p.color}">↗ Demo</a>
      </div>
    `;
    
    /* Hover glow effect */
    card.addEventListener("mouseenter", () => {
      card.style.borderColor = `${p.color}40`;
      card.style.boxShadow   = `0 0 28px ${p.color}18, 0 8px 28px rgba(0,0,0,0.4)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.borderColor = "";
      card.style.boxShadow   = "";
    });
    grid.appendChild(card);
  });
})();

/* ── 6. INTERSECTION OBSERVER — animate on scroll ────────── */
(function initObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        /* Animate skill bars when they enter viewport */
        entry.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach((el) => {
    observer.observe(el);
  });
})();


/* ── 7. CONTACT FORM ─────────────────────────────────────── */
(function initContactForm() {
  const form   = document.getElementById("contact-form");
  const btnTxt = document.getElementById("submit-btn-text");
  const toast  = document.getElementById("toast");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    btnTxt.innerHTML = `<span class="animate-spin" style="display:inline-block;width:1rem;height:1rem;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;vertical-align:middle;margin-right:.4rem"></span>Enviando...`;

    /* Simulate async submission — replace with real endpoint if needed */
    setTimeout(() => {
      btnTxt.textContent = "✉ Enviar Mensaje";
      form.reset();
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3500);
    }, 1500);
  });
})();
