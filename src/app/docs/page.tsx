import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CircleHelp, Code2, Cpu, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { issuesUrl, repoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Installation guides, system requirements, troubleshooting, FAQ and developer documentation for X Utility.",
};

const toc = [
  { id: "install", label: "Installation" },
  { id: "requirements", label: "System requirements" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "faq", label: "FAQ" },
  { id: "developers", label: "Developer docs" },
];

const faqs = [
  {
    q: "Does X Utility install software automatically?",
    a: "No. It shows you a preview and asks for confirmation before any task runs. You can also use --dry-run to see what would happen.",
  },
  {
    q: "Do I need administrator rights?",
    a: "Only for system-wide changes. Installers run per user by default; tasks that need elevation ask you first.",
  },
  {
    q: "Can I add my own tools?",
    a: "Yes. Add an entry to a tab_data.toml file in the catalog and place a script beside it. Run python3 xutil.py --check to validate it.",
  },
  {
    q: "Is there a graphical interface?",
    a: "Yes. Run xutil.py --gui or launch the installed app. It needs tkinter, which the installer can fetch for you.",
  },
  {
    q: "Does the website install anything?",
    a: "Never. This site only shows documentation and links to files published on GitHub Releases.",
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title={<>Everything you need<br />to get going.</>}
        description="Install X Utility, understand the requirements, fix common problems and extend the catalog with your own tasks."
      />

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 text-sm" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block rounded-lg px-3 py-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="prose-x max-w-3xl">
          <Reveal>
            <section id="install" className="scroll-mt-24">
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <BookOpen size={20} /> Installation
              </h2>
              <p>Use the download page for the official installer for your platform, then follow the short guide below.</p>
              <h3>Windows</h3>
              <p>Run the .exe or .msi installer, then launch X Utility from the Start menu. For the portable build, extract the ZIP and run xutil.exe. Use an Administrator terminal for system-level tasks.</p>
              <h3>Linux</h3>
              <pre><code>{`sudo apt install ./xutil.deb
sudo dnf install ./xutil.rpm
chmod +x xutil.AppImage && ./xutil.AppImage`}</code></pre>
              <p>On Arch, install the AUR package if available. On any distribution with Python 3.11+, clone the repository and run <code>python3 xutil.py --gui</code>.</p>
              <h3>macOS</h3>
              <p>Open the DMG and drag X Utility to Applications. Choose the build that matches your chip (Apple Silicon or Intel). If Gatekeeper blocks it, open System Settings → Privacy &amp; Security and choose Open Anyway.</p>
              <Link href="/download" className="mt-4 inline-flex items-center gap-1.5 text-sm text-white">
                Go to downloads <ArrowRight size={14} />
              </Link>
            </section>
          </Reveal>

          <Reveal>
            <section id="requirements" className="mt-16 scroll-mt-24">
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <Cpu size={20} /> System requirements
              </h2>
              <ul>
                <li>Python 3.11+ when running from source</li>
                <li>tkinter for the graphical window</li>
                <li>Windows 10/11, a modern Linux distribution, or macOS 12+</li>
                <li>About 20 MB of disk space for the source build</li>
                <li>Internet access only for the tasks you choose to run</li>
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section id="troubleshooting" className="mt-16 scroll-mt-24">
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <Wrench size={20} /> Troubleshooting
              </h2>
              <h3>The window will not open</h3>
              <p>Install tkinter: Fedora <code>sudo dnf install python3-tkinter</code>, Debian/Ubuntu <code>sudo apt install python3-tk</code>, Arch <code>sudo pacman -S tk</code>.</p>
              <h3>A task is greyed out</h3>
              <p>Its preconditions do not match your system, or the interpreter it needs is missing. Run with <code>-u</code> only if you understand the risk.</p>
              <h3>The menu says it needs a terminal</h3>
              <p>Use <code>--gui</code> for the window, or run the command in an interactive terminal. Non-interactive use is supported with <code>--list</code>, <code>--check</code>, <code>--config</code> and <code>--dry-run</code>.</p>
              <h3>Still stuck?</h3>
              <p>Search the <a href={issuesUrl} target="_blank" rel="noopener">issue tracker</a> or open a new issue with your OS, Python version and the full error output.</p>
            </section>
          </Reveal>

          <Reveal>
            <section id="faq" className="mt-16 scroll-mt-24">
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <CircleHelp size={20} /> Frequently asked questions
              </h2>
              <div className="mt-5 space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group rounded-md border border-white/15 bg-transparent p-4">
                    <summary className="cursor-pointer list-none text-sm font-medium text-white marker:hidden">
                      <span className="flex items-center justify-between gap-4">{faq.q}<span className="text-zinc-600 group-open:rotate-45">+</span></span>
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section id="developers" className="mt-16 scroll-mt-24">
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <Code2 size={20} /> Developer documentation
              </h2>
              <p>The engine is a single Python file and the catalog is a folder of TOML files plus scripts. Useful commands:</p>
              <pre><code>{`python3 xutil.py --check          # validate the catalog
python3 xutil.py --list           # show filtered tasks
python3 build-onefile.py          # rebuild dist/xutil.py
python3 xutil.py --config my.toml # non-interactive run`}</code></pre>
              <p>Add a new task by editing <code>tabs/&lt;tab&gt;/tab_data.toml</code> and placing a script next to it. Preconditions use keys such as <code>os</code>, <code>file_exists</code> and <code>environment</code>.</p>
              <p>See <a href={`${repoUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener">CONTRIBUTING.md</a> for the full development workflow.</p>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
