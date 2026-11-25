import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="container-x relative py-20 sm:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
