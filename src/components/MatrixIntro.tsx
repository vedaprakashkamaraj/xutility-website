"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import MatrixCanvas from "@/components/MatrixCanvas";

const STORAGE_KEY = "xutility-matrix-intro";
const REVEAL_AT = 1150;
const EXIT_AT = 2450;
const END_AT = 3000;

type Phase = "build" | "reveal" | "exit";

/** One-time cinematic opening. Sits above the existing site and removes itself. */
export default function MatrixIntro() {
  const [play, setPlay] = useState(false);
  const [phase, setPhase] = useState<Phase>("build");
  const logoRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  const finished = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage can be disabled; the intro still works for this visit.
    }
    if (!reduced && !seen) {
      setPhase("build");
      setPlay(true);
    }
  }, []);

  const finish = useCallback((immediate = false) => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setPhase("exit");
    timers.current.push(
      window.setTimeout(() => {
        try {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // Ignore unavailable storage.
        }
        setPlay(false);
      }, immediate ? 420 : 550),
    );
  }, []);

  useEffect(() => {
    if (!play) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });

    timers.current.push(window.setTimeout(() => setPhase("reveal"), REVEAL_AT));
    timers.current.push(window.setTimeout(() => setPhase("exit"), EXIT_AT));
    timers.current.push(window.setTimeout(() => finish(), END_AT));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish(true);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [play, finish]);

  const logoState = phase === "build" ? "" : phase === "reveal" ? "is-revealed" : "is-exiting";
  const status = phase === "build" ? "Compiling interface" : phase === "exit" ? "Handing off" : "X-Utility ready";

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key="xutility-matrix-intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="X Utility startup animation"
        >
          <MatrixCanvas mode="intro" targetRef={logoRef} className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.62)_68%,#000_100%)]" aria-hidden />

          <div className="relative z-10 flex flex-col items-center px-6">
            <div ref={logoRef} className={`intro-logo-shell ${logoState}`}>
              <span className="intro-logo-halo" aria-hidden />
              <Image
                src="/logo/xutil.svg"
                alt="X Utility logo"
                width={176}
                height={176}
                priority
                unoptimized
                className="intro-logo-image"
              />
              <span className="intro-scan" aria-hidden />
              <span className="intro-brackets" aria-hidden />
            </div>

            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.32em] text-[#00ff41]/75" aria-live="polite">
              {status}
            </p>
            <div className="mt-3 h-px w-48 overflow-hidden bg-white/10" aria-hidden>
              <motion.div
                className="h-full bg-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,.8)]"
                initial={{ width: "4%" }}
                animate={{ width: phase === "exit" ? "100%" : phase === "reveal" ? "72%" : "26%" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>
          </div>

          <button
            ref={skipRef}
            type="button"
            onClick={() => finish(true)}
            className="absolute bottom-7 right-7 z-20 inline-flex items-center gap-2 rounded-sm border border-[#00ff41]/30 bg-black/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#00ff41]/80 transition-colors hover:border-[#00ff41]/70 hover:text-[#00ff41] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#00ff41]"
          >
            Skip intro
            <kbd className="rounded-[2px] border border-[#00ff41]/25 px-1 py-0.5 text-[9px]">Esc</kbd>
          </button>
          <span className="sr-only">The introduction ends automatically. Press Escape to skip it.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
