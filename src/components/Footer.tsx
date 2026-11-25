import Link from "next/link";
import { Github, Heart } from "lucide-react";
import { issuesUrl, repoUrl, site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Download", href: "/download" },
      { label: "Features", href: "/features" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About", href: "/about" },
      { label: "GitHub", href: "/github" },
      { label: "Report an issue", href: issuesUrl },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080a0d]">
      <div className="container-x grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-[13px] font-black text-black">X</span>
            <span className="font-semibold">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">{site.description}</p>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <Github size={16} /> Star on GitHub
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} X Utility. Open source, built in the open.</span>
        <span className="inline-flex items-center gap-1.5">
          Made with <Heart size={12} className="text-zinc-500" /> for people who like clean tools.
        </span>
      </div>
    </footer>
  );
}
