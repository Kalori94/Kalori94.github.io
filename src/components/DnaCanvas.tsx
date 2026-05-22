/**
 * DnaCanvas — Interactive fluorescent DNA animation
 * Design: Dark Bioluminescence
 *
 * - Small DNA helices follow the mouse (lerp tracking)
 * - Click spawns 3-5 new helices that multiply and fade
 * - Helices have cyan (#00ffcc), magenta (#ff00aa), blue (#0088ff) glow
 */

import { useEffect, useRef, useCallback } from "react";

interface DnaHelix {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  glowColor: string;
  alpha: number;
  alphaTarget: number;
  alphaSpeed: number;
  isFollower: boolean;
  lifespan: number;
  maxLifespan: number;
  phase: number; // helix wave phase offset
  scale: number;
  scaleTarget: number;
}

let idCounter = 0;

const COLORS = [
  { stroke: "#00ffcc", glow: "rgba(0,255,204,0.6)" },
  { stroke: "#ff00aa", glow: "rgba(255,0,170,0.6)" },
  { stroke: "#0088ff", glow: "rgba(0,136,255,0.6)" },
  { stroke: "#00e5ff", glow: "rgba(0,229,255,0.5)" },
];

function createFollowerHelix(mouseX: number, mouseY: number, index: number): DnaHelix {
  const color = COLORS[index % COLORS.length];
  const angle = (index / 6) * Math.PI * 2;
  const radius = 40 + index * 18;
  return {
    id: idCounter++,
    x: mouseX + Math.cos(angle) * radius,
    y: mouseY + Math.sin(angle) * radius,
    vx: 0,
    vy: 0,
    targetX: mouseX,
    targetY: mouseY,
    size: 18 + Math.random() * 10,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    color: color.stroke,
    glowColor: color.glow,
    alpha: 0,
    alphaTarget: 0.85,
    alphaSpeed: 0.04,
    isFollower: true,
    lifespan: Infinity,
    maxLifespan: Infinity,
    phase: Math.random() * Math.PI * 2,
    scale: 0.3,
    scaleTarget: 1,
  };
}

function createSpawnHelix(x: number, y: number): DnaHelix {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const angle = Math.random() * Math.PI * 2;
  const speed = 1.5 + Math.random() * 2.5;
  const lifespan = 120 + Math.random() * 80;
  return {
    id: idCounter++,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    targetX: x,
    targetY: y,
    size: 12 + Math.random() * 16,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.06,
    color: color.stroke,
    glowColor: color.glow,
    alpha: 0,
    alphaTarget: 0.9,
    alphaSpeed: 0.06,
    isFollower: false,
    lifespan,
    maxLifespan: lifespan,
    phase: Math.random() * Math.PI * 2,
    scale: 0.1,
    scaleTarget: 1,
  };
}

function drawDnaHelix(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string,
  glowColor: string,
  alpha: number,
  phase: number,
  scale: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;

  const height = size * 3;
  const width = size * 0.8;
  const steps = 16;
  const stepH = height / steps;

  // Outer glow pass
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 18;

  // Draw two strands
  for (let strand = 0; strand < 2; strand++) {
    const phaseOffset = strand === 0 ? phase : phase + Math.PI;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const py = -height / 2 + i * stepH;
      const px = Math.sin(t * Math.PI * 2 + phaseOffset) * width;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  // Draw rungs (base pairs)
  ctx.shadowBlur = 8;
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const py = -height / 2 + i * stepH;
    const px1 = Math.sin(t * Math.PI * 2 + phase) * width;
    const px2 = Math.sin(t * Math.PI * 2 + phase + Math.PI) * width;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = alpha * 0.6;
    ctx.moveTo(px1, py);
    ctx.lineTo(px2, py);
    ctx.stroke();
    ctx.globalAlpha = alpha;

    // Nucleotide dots
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.shadowBlur = 10;
    ctx.arc(px1, py, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px2, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export default function DnaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const helicesRef = useRef<DnaHelix[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Initialize follower helices
  const initFollowers = useCallback((mouseX: number, mouseY: number) => {
    const followers: DnaHelix[] = [];
    for (let i = 0; i < 6; i++) {
      followers.push(createFollowerHelix(mouseX, mouseY, i));
    }
    helicesRef.current = [
      ...helicesRef.current.filter((h) => !h.isFollower),
      ...followers,
    ];
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };

      // If no followers yet, create them
      const hasFollowers = helicesRef.current.some((h) => h.isFollower);
      if (!hasFollowers) {
        initFollowers(mx, my);
      }

      // Update follower targets
      helicesRef.current.forEach((h) => {
        if (h.isFollower) {
          h.targetX = mx;
          h.targetY = my;
        }
      });
    },
    [initFollowers]
  );

  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // Spawn 5-8 new helices on click (replication burst)
    const count = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      helicesRef.current.push(createSpawnHelix(cx, cy));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    // Ambient background helices
    const spawnAmbient = () => {
      if (helicesRef.current.filter((h) => !h.isFollower).length < 8) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const h = createSpawnHelix(x, y);
        h.vx = (Math.random() - 0.5) * 0.5;
        h.vy = (Math.random() - 0.5) * 0.5;
        h.lifespan = 300 + Math.random() * 200;
        h.maxLifespan = h.lifespan;
        h.alphaTarget = 0.3 + Math.random() * 0.3;
        helicesRef.current.push(h);
      }
    };
    const ambientInterval = setInterval(spawnAmbient, 800);

    const animate = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      helicesRef.current = helicesRef.current.filter((h) => {
        // Update lifespan
        if (!h.isFollower) {
          h.lifespan -= 1;
          if (h.lifespan <= 0) return false;
          // Fade out near end of life
          if (h.lifespan < 40) {
            h.alphaTarget = (h.lifespan / 40) * (h.maxLifespan > 200 ? 0.35 : 0.9);
          }
        }

        // Smooth alpha
        h.alpha += (h.alphaTarget - h.alpha) * h.alphaSpeed;

        // Smooth scale
        h.scale += (h.scaleTarget - h.scale) * 0.08;

        // Movement
        if (h.isFollower) {
          const lerpFactor = 0.07;
          h.x += (h.targetX - h.x) * lerpFactor;
          h.y += (h.targetY - h.y) * lerpFactor;
        } else {
          h.x += h.vx;
          h.y += h.vy;
          h.vx *= 0.99;
          h.vy *= 0.99;
        }

        // Rotation
        h.rotation += h.rotationSpeed;

        // Phase animation
        h.phase += 0.03;

        // Draw
        drawDnaHelix(
          ctx,
          h.x,
          h.y,
          h.size,
          h.rotation,
          h.color,
          h.glowColor,
          Math.max(0, Math.min(1, h.alpha)),
          h.phase,
          h.scale
        );

        return true;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(ambientInterval);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: "crosshair", zIndex: 2 }}
    />
  );
}
