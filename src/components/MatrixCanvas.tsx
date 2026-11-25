"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Mode = "intro" | "ambient";

interface MatrixCanvasProps {
  mode: Mode;
  className?: string;
  /** Element whose bright pixels the intro particles converge on. */
  targetRef?: RefObject<HTMLElement | null>;
  active?: boolean;
}

interface Drop {
  y: number;
  speed: number;
  trail: number;
  glyphs: string[];
  brightness: number;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  start: number;
  duration: number;
  glyph: string;
}

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789XUTILITY<>/{}[]$=+*#";
const LOGO_SRC = "/logo/xutil.svg";
// Exact colours from the original logo: blue border/chevron, green underscore.
const LOGO_BLUE = "122,162,247";
const LOGO_GREEN = "158,206,106";
const LOGO_GREEN_BRIGHT = "196,232,150";

function glyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Canvas digital rain shared by the opening sequence and the homepage hero.
 * The engine caps DPR/FPS, pauses in background tabs and never touches app state.
 */
export default function MatrixCanvas({ mode, className = "", targetRef, active = true }: MatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || reducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isIntro = mode === "intro";
    const fps = isIntro ? 45 : 30;
    const frameInterval = 1000 / fps;
    const startedAt = performance.now();

    let width = 0;
    let height = 0;
    let fontSize = isIntro ? 16 : 14;
    let drops: Drop[] = [];
    let particles: Particle[] = [];
    let targets: { x: number; y: number }[] = [];
    let logoImage: HTMLImageElement | null = null;
    let raf = 0;
    let last = 0;

    function buildDrops() {
      const columns = Math.max(1, Math.ceil(width / fontSize));
      drops = Array.from({ length: columns }, () => ({
        y: Math.random() * (height / fontSize + 24) - 24,
        speed: 0.16 + Math.random() * (isIntro ? 0.9 : 0.42),
        trail: 7 + Math.floor(Math.random() * (isIntro ? 12 : 9)),
        glyphs: Array.from({ length: 32 }, glyph),
        brightness: 0.35 + Math.random() * 0.65,
      }));
    }

    function buildParticles() {
      if (!targets.length) return;
      const count = Math.min(targets.length, width < 600 ? 48 : 88);
      const now = performance.now();
      particles = Array.from({ length: count }, (_, i) => {
        const edge = Math.random();
        const x = edge < 0.5 ? Math.random() * width : edge < 0.75 ? -24 : width + 24;
        const y = edge < 0.5 ? -24 : Math.random() * height;
        const target = targets[i % targets.length];
        return {
          x,
          y,
          tx: target.x,
          ty: target.y,
          start: now + Math.random() * 380,
          duration: 680 + Math.random() * 520,
          glyph: glyph(),
        };
      });
    }

    function sampleLogo() {
      const host = targetRef?.current;
      if (!host || !logoImage) return;
      const hostRect = host.getBoundingClientRect();
      const canvasRect = canvas!.getBoundingClientRect();

      const size = 96;
      const offscreen = document.createElement("canvas");
      offscreen.width = size;
      offscreen.height = size;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.drawImage(logoImage, 0, 0, size, size);
      const pixels = offCtx.getImageData(0, 0, size, size).data;
      const points: { x: number; y: number }[] = [];

      for (let y = 0; y < size; y += 2) {
        for (let x = 0; x < size; x += 2) {
          const index = (y * size + x) * 4;
          const alpha = pixels[index + 3];
          const luminance = pixels[index] + pixels[index + 1] + pixels[index + 2];
          // Keep the bright mark strokes, not the dark logo background.
          if (alpha > 100 && luminance > 270 && Math.random() > 0.42) points.push({ x, y });
        }
      }

      const left = hostRect.left - canvasRect.left;
      const top = hostRect.top - canvasRect.top;
      targets = points
        .sort(() => Math.random() - 0.5)
        .slice(0, width < 600 ? 64 : 116)
        .map((point) => ({
          x: left + (point.x / size) * hostRect.width,
          y: top + (point.y / size) * hostRect.height,
        }));
      buildParticles();
    }

    const image = new Image();
    image.onload = () => {
      logoImage = image;
      if (isIntro) sampleLogo();
    };
    image.src = LOGO_SRC;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = isIntro ? (width < 480 ? 13 : 16) : width < 480 ? 12 : 14;
      buildDrops();
      if (isIntro) sampleLogo();
    }

    function drawParticles(now: number) {
      const elapsed = now - startedAt;
      if (elapsed > 2800) return;

      for (const particle of particles) {
        const t = (now - particle.start) / particle.duration;
        if (t < 0 || t > 1.4) continue;
        const eased = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
        const x = particle.x + (particle.tx - particle.x) * eased;
        const y = particle.y + (particle.ty - particle.y) * eased;
        const alpha = t < 1 ? Math.min(1, t * 3) * 0.9 : Math.max(0, 1 - (t - 1) / 0.4) * 0.65;

        ctx!.fillStyle = `rgba(${LOGO_GREEN},${alpha})`;
        ctx!.shadowColor = `rgba(${LOGO_BLUE},.7)`;
        ctx!.shadowBlur = 6;
        ctx!.fillText(particle.glyph, x, y);
        ctx!.shadowBlur = 0;
      }
    }

    function render(now: number) {
      raf = requestAnimationFrame(render);
      if (now - last < frameInterval) return;
      const delta = Math.min(now - last, 80);
      last = now;

      ctx!.clearRect(0, 0, width, height);
      ctx!.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx!.textBaseline = "top";

      const rows = height / fontSize;
      drops.forEach((drop, column) => {
        const x = column * fontSize;
        for (let index = 0; index < drop.trail; index += 1) {
          const y = (drop.y - index) * fontSize;
          if (y < -fontSize || y > height) continue;
          const alpha = (1 - index / drop.trail) * drop.brightness * (isIntro ? 0.5 : 0.2);
          const char = drop.glyphs[(Math.floor(drop.y - index) + column * 7 + 4096) % drop.glyphs.length];
          ctx!.fillStyle =
            index === 0
              ? `rgba(${LOGO_GREEN_BRIGHT},${Math.min(1, alpha * 1.7)})`
              : `rgba(${LOGO_BLUE},${alpha})`;
          if (index === 0 && isIntro) {
            ctx!.shadowColor = `rgba(${LOGO_GREEN},.7)`;
            ctx!.shadowBlur = 8;
          }
          ctx!.fillText(char, x, y);
          ctx!.shadowBlur = 0;
        }

        drop.y += drop.speed * (delta / 16.67);
        if (drop.y - drop.trail > rows) {
          drop.y = -Math.random() * 14;
          drop.speed = 0.16 + Math.random() * (isIntro ? 0.9 : 0.42);
          drop.trail = 7 + Math.floor(Math.random() * (isIntro ? 12 : 9));
        }
        if (Math.random() < 0.03) drop.glyphs[Math.floor(Math.random() * drop.glyphs.length)] = glyph();
      });

      if (isIntro) drawParticles(now);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(render);
      }
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);
    last = performance.now();
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      image.onload = null;
    };
  }, [active, mode, reducedMotion, targetRef]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
