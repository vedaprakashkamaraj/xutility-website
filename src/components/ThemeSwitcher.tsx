"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";

const themes = [
  { id: "matte-black", name: "Matte Black", bg: "#000000", accent: "#ffffff" },
  { id: "tokyo-night", name: "Tokyo Night", bg: "#1a1b26", accent: "#7aa2f7" },
  { id: "nord", name: "Nord", bg: "#2e3440", accent: "#88c0d0" },
  { id: "catppuccin", name: "Catppuccin", bg: "#1e1e2e", accent: "#cba6f7" },
  { id: "gruvbox", name: "Gruvbox", bg: "#282828", accent: "#fabd2f" },
  { id: "rose-pine", name: "Rosé Pine", bg: "#191724", accent: "#ebbcba" },
  { id: "white", name: "White", bg: "#ffffff", accent: "#111111" },
] as const;

type ThemeId = (typeof themes)[number]["id"];
const STORAGE_KEY = "xutility-theme";

function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id;
  window.localStorage.setItem(STORAGE_KEY, id);
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("tokyo-night");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    const current = themes.some((t) => t.id === stored)
      ? (stored as ThemeId)
      : ((document.documentElement.dataset.theme as ThemeId) || "tokyo-night");
    setTheme(current);
    document.documentElement.dataset.theme = current;
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "t" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable)) return;

      setTheme((current) => {
        const index = themes.findIndex((t) => t.id === current);
        const next = themes[(index + 1) % themes.length].id;
        applyTheme(next);
        return next;
      });
    };

    const onMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const select = (id: ThemeId) => {
    applyTheme(id);
    setTheme(id);
    setOpen(false);
  };

  const active = themes.find((t) => t.id === theme) ?? themes[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-md border border-line px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-fg hover:text-fg"
        aria-label="Change theme"
        aria-expanded={open}
      >
        <Palette size={15} />
        <span className="hidden lg:inline">{active.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-[60] mt-2 w-60 rounded-md border border-line bg-panel p-1.5 shadow-2xl">
          <p className="px-2.5 pb-2 pt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            Theme · press T to cycle
          </p>
          {themes.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => select(option.id)}
              className="flex w-full items-center gap-3 rounded-sm px-2.5 py-2 text-left text-sm text-muted transition-colors hover:bg-raised hover:text-fg"
            >
              <span
                className="h-4 w-4 shrink-0 rounded-sm border border-line"
                style={{ background: option.bg, boxShadow: `inset 0 -4px 0 ${option.accent}` }}
                aria-hidden
              />
              <span className="flex-1">{option.name}</span>
              {option.id === theme && <Check size={14} className="text-fg" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
