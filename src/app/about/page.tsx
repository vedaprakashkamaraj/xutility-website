import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, HeartHandshake, Target, Zap } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { repoUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn why X Utility exists, what drives the project and where it is heading next.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A small tool with<br />a simple idea.</>}
        description="Setting up a computer should not require remembering a different command for every operating system and every package manager."
      />

      <section className="section border-b border-white/10">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">What is X Utility?</h2>
            <p className="mt-6 text-sm leading-7 text-zinc-400">
              X Utility is an open-source application that reads a catalog of installation and maintenance tasks, filters them for the current system, and runs the ones you choose. It works as a keyboard-first terminal app and as a graphical window.
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              The catalog is plain TOML. The tasks are readable shell or PowerShell scripts. The engine is Python using only the standard library, so it can run almost anywhere Python runs.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="panel rounded-md p-7">
              <p className="eyebrow">In one sentence</p>
              <p className="text-2xl font-medium leading-snug tracking-[-0.02em]">
                {site.tagline} — without the duct tape.
              </p>
              <div className="mt-8 hairline" />
              <dl className="mt-6 grid grid-cols-2 gap-6 text-sm">
                <div><dt className="text-zinc-600">Interface</dt><dd className="mt-1">Terminal + GUI</dd></div>
                <div><dt className="text-zinc-600">Engine</dt><dd className="mt-1">Python stdlib</dd></div>
                <div><dt className="text-zinc-600">Catalog</dt><dd className="mt-1">TOML + scripts</dd></div>
                <div><dt className="text-zinc-600">License</dt><dd className="mt-1">MIT</dd></div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-b border-white/10">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Why it exists</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">Because setup should be boring.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Target, title: "Less context switching", text: "No more hunting for the right installer flags on each OS. One catalog, one interface." },
              { icon: Zap, title: "Fast by default", text: "No heavy runtime, no background daemon. Start it, pick a task, done." },
              { icon: HeartHandshake, title: "Readable and hackable", text: "You can inspect every script and add your own without learning a framework." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="card h-full">
                  <item.icon size={20} />
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-white/10">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Roadmap</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">What comes next.</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">
              The roadmap is intentionally small and public. If something matters to you, open an issue and help shape it.
            </p>
            <a href={repoUrl} target="_blank" rel="noopener" className="btn-ghost mt-7">
              <GitBranch size={15} /> Join the discussion
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-3">
              {site.roadmap.map((item) => (
                <div key={item.title} className="card flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{item.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-zinc-500">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x text-center">
          <p className="eyebrow">Open-source philosophy</p>
          <h2 className="mx-auto max-w-3xl display text-[clamp(2.2rem,5vw,4.25rem)]">
            No lock-in, no hidden telemetry, no mystery scripts.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400">
            The source, the catalog and the issue tracker are public. Contributions are welcome, and the license permits you to fork the project, adapt it and share your changes.
          </p>
          <Link href="/github" className="btn mt-8">
            Explore the project <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
