import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  Apple,
  ArrowRight,
  Boxes,
  Feather,
  GitBranch,
  Layers,
  Monitor,
  Search,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore X Utility's cross-platform catalog, terminal and graphical interfaces, system tools and lightweight design.",
};

const icons: Record<string, LucideIcon> = {
  Layers,
  Boxes,
  Terminal,
  AppWindow,
  Apple,
  Sparkles,
  GitBranch,
  Feather,
};

const matrix = [
  { feature: "Terminal catalog browser", windows: true, linux: true, macos: true },
  { feature: "Graphical window with themes", windows: true, linux: true, macos: true },
  { feature: "winget / Chocolatey / Scoop", windows: true, linux: false, macos: false },
  { feature: "apt / dnf / pacman / zypper", windows: false, linux: true, macos: false },
  { feature: "Homebrew catalog", windows: false, linux: false, macos: true },
  { feature: "System maintenance tasks", windows: true, linux: true, macos: true },
  { feature: "Self-update from the app", windows: true, linux: true, macos: true },
];

const workflow = [
  { icon: Search, title: "Find", text: "Search the catalog or browse by tab. Tasks that do not apply to your system stay visible but disabled." },
  { icon: AppWindow, title: "Preview", text: "Open a task to read the exact script before anything runs. Dry-run is available from the terminal too." },
  { icon: Boxes, title: "Queue", text: "Select several tasks, confirm once and watch a clear per-task queue with logs and status." },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={<>Everything you need to<br />set up a machine.</>}
        description="X Utility turns a scattered collection of install commands and system tweaks into one searchable, previewable catalog that behaves the same on every platform."
      />

      <section className="section border-b border-line">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.features.map((feature, i) => {
            const Icon = icons[feature.icon] ?? Sparkles;
            return (
              <Reveal key={feature.title} delay={(i % 4) * 0.06}>
                <div className="card h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-raised">
                    <Icon size={19} />
                  </div>
                  <h2 className="mt-6 text-base font-semibold">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section border-b border-line">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">From catalog to command, in three steps.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {workflow.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="card h-full">
                  <div className="mono text-xs text-subtle">0{i + 1}</div>
                  <step.icon size={20} className="mt-4" />
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Platform coverage</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">One catalog, three desktops.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Preconditions decide what you see. A Windows-only task stays hidden on Linux, an Apple Silicon build is not offered to Intel users, and every script is filtered before it reaches the queue.
            </p>
            <Link href="/docs" className="btn-ghost mt-7">
              Read the docs <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line">
              <div className="grid grid-cols-[1fr_80px_80px_80px] border-b border-line bg-raised px-5 py-4 text-[11px] uppercase tracking-[0.14em] text-muted">
                <span>Capability</span>
                <span className="text-center"><Monitor size={14} className="mx-auto" /> Win</span>
                <span className="text-center"><Terminal size={14} className="mx-auto" /> Linux</span>
                <span className="text-center"><Apple size={14} className="mx-auto" /> Mac</span>
              </div>
              {matrix.map((row) => (
                <div key={row.feature} className="grid grid-cols-[1fr_80px_80px_80px] items-center border-b border-line px-5 py-4 text-sm last:border-0">
                  <span className="text-muted">{row.feature}</span>
                  {[row.windows, row.linux, row.macos].map((yes, i) => (
                    <span key={i} className="text-center">
                      <span className={`inline-block h-2 w-2 rounded-full ${yes ? "bg-emerald-400" : "bg-line"}`} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
