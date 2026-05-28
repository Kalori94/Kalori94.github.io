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


/* ── 3. DNA CANVAS — interactive bioluminescent helices ──── */
(function initDnaCanvas() {
  const canvas = document.getElementById("dna-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const COLORS = [
    { stroke: "#00ffcc", glow: "rgba(0,255,204,0.6)" },
    { stroke: "#ff00aa", glow: "rgba(255,0,170,0.6)"  },
    { stroke: "#0088ff", glow: "rgba(0,136,255,0.6)"  },
    { stroke: "#00e5ff", glow: "rgba(0,229,255,0.5)"  },
  ];
  let helices = [], idCounter = 0, animFrame;

  /* Resize canvas to fill parent */
  function resize() {
    const parent = canvas.parentElement;
    canvas.width  = parent ? parent.clientWidth  : window.innerWidth;
    canvas.height = parent ? parent.clientHeight : window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  /* Helix factory helpers */
  function makeFollower(mx, my, index) {
    const c = COLORS[index % COLORS.length];
    const angle  = (index / 6) * Math.PI * 2;
    const radius = 40 + index * 18;
    return {
      id: idCounter++, x: mx + Math.cos(angle) * radius, y: my + Math.sin(angle) * radius,
      vx: 0, vy: 0, targetX: mx, targetY: my,
      size: 18 + Math.random() * 10, rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04, color: c.stroke, glow: c.glow,
      alpha: 0, alphaTarget: 0.85, alphaSpeed: 0.04,
      follower: true, life: Infinity, maxLife: Infinity,
      phase: Math.random() * Math.PI * 2, scale: 0.3, scaleTarget: 1,
    };
  }

  function makeSpawn(x, y) {
    const c     = COLORS[Math.floor(Math.random() * COLORS.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 2.5;
    const life  = 120 + Math.random() * 80;
    return {
      id: idCounter++, x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      targetX: x, targetY: y,
      size: 12 + Math.random() * 16, rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.06, color: c.stroke, glow: c.glow,
      alpha: 0, alphaTarget: 0.9, alphaSpeed: 0.06,
      follower: false, life, maxLife: life,
      phase: Math.random() * Math.PI * 2, scale: 0.1, scaleTarget: 1,
    };
  }

  /* Draw a single double-helix */
  function drawHelix(x, y, size, rotation, color, glow, alpha, phase, scale) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;

    const h = size * 3, w = size * 0.8, steps = 16, stepH = h / steps;

    ctx.shadowColor = glow;
    ctx.shadowBlur  = 18;

    /* Two DNA strands */
    for (let strand = 0; strand < 2; strand++) {
      const phaseOff = strand === 0 ? phase : phase + Math.PI;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth   = 2;
      for (let i = 0; i <= steps; i++) {
        const t  = i / steps;
        const py = -h / 2 + i * stepH;
        const px = Math.sin(t * Math.PI * 2 + phaseOff) * w;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    /* Base-pair rungs + nucleotide dots */
    ctx.shadowBlur = 8;
    for (let i = 1; i < steps; i++) {
      const t   = i / steps;
      const py  = -h / 2 + i * stepH;
      const px1 = Math.sin(t * Math.PI * 2 + phase) * w;
      const px2 = Math.sin(t * Math.PI * 2 + phase + Math.PI) * w;

      ctx.beginPath();
      ctx.strokeStyle  = color;
      ctx.lineWidth    = 1;
      ctx.globalAlpha  = alpha * 0.55;
      ctx.moveTo(px1, py);
      ctx.lineTo(px2, py);
      ctx.stroke();
      ctx.globalAlpha = alpha;

      [px1, px2].forEach((px) => {
        ctx.beginPath();
        ctx.fillStyle   = color;
        ctx.shadowBlur  = 10;
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    ctx.restore();
  }

  /* Spawn follower helices around mouse */
  function spawnFollowers(mx, my) {
    helices = helices.filter((h) => !h.follower);
    for (let i = 0; i < 6; i++) helices.push(makeFollower(mx, my, i));
  }

  /* Mouse events */
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (!helices.some((h) => h.follower)) spawnFollowers(mx, my);
    helices.forEach((h) => { if (h.follower) { h.targetX = mx; h.targetY = my; } });
  });

  canvas.addEventListener("click", (e) => {
    const rect  = canvas.getBoundingClientRect();
    const count = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      helices.push(makeSpawn(e.clientX - rect.left, e.clientY - rect.top));
    }
  });

  /* Ambient background helices */
  const ambientInterval = setInterval(() => {
    if (helices.filter((h) => !h.follower).length < 8) {
      const h = makeSpawn(Math.random() * canvas.width, Math.random() * canvas.height);
      h.vx = (Math.random() - 0.5) * 0.5;
      h.vy = (Math.random() - 0.5) * 0.5;
      h.life = 300 + Math.random() * 200;
      h.maxLife = h.life;
      h.alphaTarget = 0.25 + Math.random() * 0.3;
      helices.push(h);
    }
  }, 900);

  /* Animation loop */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    helices = helices.filter((h) => {
      /* Lifespan */
      if (!h.follower) {
        h.life--;
        if (h.life <= 0) return false;
        if (h.life < 40) h.alphaTarget = (h.life / 40) * (h.maxLife > 200 ? 0.3 : 0.9);
      }

      /* Smooth alpha & scale */
      h.alpha += (h.alphaTarget - h.alpha) * h.alphaSpeed;
      h.scale += (h.scaleTarget - h.scale) * 0.08;

      /* Movement */
      if (h.follower) {
        h.x += (h.targetX - h.x) * 0.07;
        h.y += (h.targetY - h.y) * 0.07;
      } else {
        h.x  += h.vx;
        h.y  += h.vy;
        h.vx *= 0.99;
        h.vy *= 0.99;
      }

      h.rotation += h.rotSpeed;
      h.phase    += 0.028;

      drawHelix(h.x, h.y, h.size, h.rotation, h.color, h.glow,
                Math.max(0, Math.min(1, h.alpha)), h.phase, h.scale);
      return true;
    });

    animFrame = requestAnimationFrame(animate);
  }
  animate();

  /* Cleanup on page unload */
  window.addEventListener("unload", () => {
    cancelAnimationFrame(animFrame);
    clearInterval(ambientInterval);
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
