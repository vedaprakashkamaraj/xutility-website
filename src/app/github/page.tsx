import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bug, ExternalLink, FileText, GitBranch, GitPullRequest, Scale, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { issuesUrl, repoUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "GitHub",
  description: "Source code, issues, contribution guidelines and license information for the X Utility open-source project.",
};

const links = [
  { icon: GitBranch, title: "Repository", text: "Browse the full source, the TOML catalog and the release history.", href: repoUrl, cta: "Open repository" },
  { icon: Bug, title: "Issues", text: "Report bugs, request tools or ask a question with clear reproduction steps.", href: issuesUrl, cta: "Open issues" },
  { icon: GitPullRequest, title: "Pull requests", text: "Propose fixes and new tasks. Keep changes focused and run --check first.", href: `${repoUrl}/pulls`, cta: "View pull requests" },
  { icon: Scale, title: "License", text: "X Utility is released under the MIT License. Fork it, modify it, ship it.", href: `${repoUrl}/blob/main/LICENSE`, cta: "Read the license" },
];

export default function GithubPage() {
  return (
    <>
      <PageHero
        eyebrow="Open source"
        title={<>The code is<br />right here.</>}
        description="X Utility is developed in public. Read the source, report a problem, or send a patch — everything happens on GitHub."
      />

      <section className="section border-b border-white/10">
        <div className="container-x grid gap-4 sm:grid-cols-2">
          {links.map((link, i) => (
            <Reveal key={link.title} delay={(i % 2) * 0.06}>
              <a href={link.href} target="_blank" rel="noopener" className="card block h-full">
                <div className="flex items-start justify-between">
                  <link.icon size={20} />
                  <ExternalLink size={15} className="text-zinc-600" />
                </div>
                <h2 className="mt-6 text-lg font-semibold">{link.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{link.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-300">{link.cta} <ArrowRight size={14} /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section border-b border-white/10">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Contribute</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Good first contributions.</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-zinc-400">
              <li>— Fix a typo or clarify an installation step in the docs.</li>
              <li>— Add a new app entry to the TOML catalog with a tested script.</li>
              <li>— Improve a GUI theme or keyboard shortcut.</li>
              <li>— Reproduce and document an issue on another platform.</li>
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card">
              <FileText size={20} />
              <h3 className="mt-5 text-lg font-semibold">Before you open a pull request</h3>
              <pre className="mono mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 text-[13px] text-zinc-300">{`git clone ${repoUrl}.git
cd xulity
python3 xutil.py --check
python3 build-onefile.py`}</pre>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Describe what changed and how you tested it. See CONTRIBUTING.md for the full checklist.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x text-center">
          <Star size={22} className="mx-auto text-zinc-500" />
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em]">Star the project if it saved you time.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
            {site.name} is maintained in spare time with help from the community. A star, a bug report or a new task all move it forward.
          </p>
          <a href={repoUrl} target="_blank" rel="noopener" className="btn mt-8">
            <Star size={15} /> Star on GitHub
          </a>
          <div className="mt-8 text-xs text-zinc-600">
            Prefer the documentation? <Link href="/docs" className="text-zinc-400 hover:text-white">Read the docs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
