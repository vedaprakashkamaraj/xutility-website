import Link from "next/link";
import { Github } from "lucide-react";
import Logo from "./Logo";
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
    <footer className="border-t border-line bg-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="font-medium">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{site.description}</p>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <Github size={16} /> Star on GitHub
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-line py-7 font-mono text-[11px] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} X Utility. Open source, built in the open.</span>
        <span>One Utility. Every Platform.</span>
      </div>
    </footer>
  );
}
