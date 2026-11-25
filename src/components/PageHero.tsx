import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="container-x relative py-24 sm:py-32">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display max-w-5xl text-[clamp(3rem,8vw,6.5rem)]">{title}</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
