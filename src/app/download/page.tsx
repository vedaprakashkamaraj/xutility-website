import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, GitBranch, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import DownloadCenter from "@/components/DownloadCenter";
import Reveal from "@/components/Reveal";
import { releasesUrl, repoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download",
  description: "Download X Utility for Windows, Linux and macOS. Release assets come directly from GitHub Releases.",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="Download"
        title={<>The right build for<br />your machine.</>}
        description="We detect your operating system and show the matching installer. Every file is fetched from the project's published GitHub Releases — no mirrors, no surprises."
      />

      <section className="section">
        <div className="container-x">
          <DownloadCenter />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#050505]">
        <div className="container-x grid gap-6 py-14 md:grid-cols-3">
          <Reveal>
            <div className="card h-full">
              <ShieldCheck size={20} />
              <h3 className="mt-5 font-semibold">Official artifacts only</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Download links point to assets uploaded by the maintainers to the GitHub release page.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card h-full">
              <FileCheck2 size={20} />
              <h3 className="mt-5 font-semibold">Verify before you run</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                When checksum files are published, the SHA-256 value appears next to each asset so you can verify it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card h-full">
              <GitBranch size={20} />
              <h3 className="mt-5 font-semibold">No release? Build from source</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                The repository always contains the latest source and a single-file build you can run directly.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a href={repoUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-zinc-300 hover:text-white">
                  Source <ArrowRight size={13} />
                </a>
                <a href={releasesUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-zinc-300 hover:text-white">
                  Releases <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x text-center">
          <p className="eyebrow">Prefer the terminal?</p>
          <h2 className="display text-[clamp(2.2rem,5vw,4.25rem)]">Install from source in two commands.</h2>
          <div className="mono mx-auto mt-7 max-w-xl rounded-md border border-white/15 bg-[#080808] p-5 text-left text-sm text-zinc-300">
            <p><span className="text-zinc-600">$</span> git clone {repoUrl}.git</p>
            <p><span className="text-zinc-600">$</span> cd xulity &amp;&amp; python3 xutil.py --gui</p>
          </div>
          <Link href="/docs" className="btn-ghost mt-7">
            Full installation guide <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
