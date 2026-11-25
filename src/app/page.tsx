import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  Apple,
  ArrowRight,
  Boxes,
  Code2,
  Feather,
  GitBranch,
  Layers,
  Monitor,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import LatestReleaseBadge from "@/components/LatestReleaseBadge";
import { issuesUrl, repoUrl, site, type Platform } from "@/lib/site";

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

const platformCards: { key: Platform; icon: LucideIcon; blurb: string; detail: string }[] = [
  { key: "windows", icon: Monitor, blurb: "Windows 10 & 11", detail: "Installer, portable ZIP, winget / Chocolatey / Scoop tasks." },
  { key: "linux", icon: Terminal, blurb: "Debian · Fedora · Arch", detail: "DEB, RPM, AppImage, universal Python and single-file builds." },
  { key: "macos", icon: Apple, blurb: "Apple Silicon & Intel", detail: "DMG builds and Homebrew-powered software catalog." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px]" aria-hidden />
        <div className="container-x relative grid items-center gap-14 py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-32">
          <Reveal>
            <Logo size={72} className="mb-9" />
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="pill"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Open source · MIT</span>
              <LatestReleaseBadge />
            </div>

            <h1 className="display text-[clamp(3.4rem,9vw,7.5rem)]">
              One Utility.<br />
              <span className="text-zinc-400">Every Platform.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              {site.description} Built for people who want one clean way to set up a machine, install apps and keep the system in shape.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="btn">
                Download X Utility <ArrowRight size={16} />
              </Link>
              <Link href="/features" className="btn-ghost">
                Explore features
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-600">
              {site.platforms.map((p) => (
                <span key={p} className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-zinc-600" /> {p}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="panel relative rounded-md p-2">
              <div className="rounded-sm border border-white/10 bg-[#050505] p-4">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="mono ml-3 text-[11px] text-zinc-600">xutil --gui</span>
                </div>
                <div className="mono space-y-1.5 text-[12px] leading-6 text-zinc-400 sm:text-[13px]">
                  <p><span className="text-zinc-600">$</span> python3 xutil.py --check</p>
                  <p className="text-emerald-400">catalog OK: 210 entries, 77 visible on linux</p>
                  <p><span className="text-zinc-600">$</span> python3 xutil.py --gui</p>
                  <p className="text-zinc-500">loaded 8 tabs · 6 themes · ready</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["APPS", "SYSTEM", "UTILS"].map((t) => (
                    <div key={t} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-center text-[10px] tracking-[0.18em] text-zinc-500">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-b border-white/10">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Supported platforms</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">Built once. Runs where you work.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {platformCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.key} delay={i * 0.08}>
                  <Link href={`/download#${card.key}`} className="card block h-full">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.05]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">{card.blurb}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{card.detail}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-400">
                      Download options <ArrowRight size={14} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section border-b border-white/10">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Product preview</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">A toolbox that stays out of the way.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">
              Search the catalog, preview a task, select what you need and run it with a clear confirmation. The same catalog works in the terminal and in the graphical window.
            </p>
            <Link href="/features" className="btn-ghost mt-7">
              See all features <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              <Image src="/screenshots/gui.png" alt="X Utility main window" width={1254} height={1573} className="h-full w-full rounded-md border border-white/10 object-cover" />
              <Image src="/screenshots/detail.png" alt="X Utility task detail view" width={1254} height={1573} className="h-full w-full rounded-md border border-white/10 object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-b border-white/10">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Why X Utility</p>
            <h2 className="max-w-2xl display text-[clamp(2.2rem,5vw,4.25rem)]">Small engine, serious reach.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.features.slice(0, 4).map((feature, i) => {
              const Icon = icons[feature.icon] ?? Sparkles;
              return (
                <Reveal key={feature.title} delay={i * 0.06}>
                  <div className="card h-full">
                    <Icon size={20} className="text-zinc-300" />
                    <h3 className="mt-5 text-sm font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-zinc-500">{feature.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="panel rounded-md p-8 sm:p-12">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="eyebrow">Open-source community</p>
                  <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">Built in the open. Better with you.</h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">
                    Every line of the engine, the task catalog and the installer scripts is public. Report a bug, add a tool to the catalog or improve the docs.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href={repoUrl} target="_blank" rel="noopener" className="btn">
                      <GitBranch size={16} /> View source
                    </a>
                    <a href={issuesUrl} target="_blank" rel="noopener" className="btn-ghost">
                      <Star size={15} /> Report an issue
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  {[
                    { icon: Code2, value: "Python", label: "stdlib engine" },
                    { icon: ShieldCheck, value: "MIT", label: "license" },
                    { icon: Boxes, value: "210", label: "catalog entries" },
                  ].map((s) => (
                    <div key={s.label}>
                      <s.icon size={18} className="mx-auto text-zinc-500" />
                      <p className="mt-2 text-lg font-semibold">{s.value}</p>
                      <p className="text-[11px] text-zinc-600">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
