"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="container-x flex h-14 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="X Utility home">
          <Logo size={28} />
          <span className="text-sm font-medium tracking-tight">{site.name}</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-zinc-600 sm:inline">/ official</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b py-1 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors ${
                  active ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/download" className="btn hidden !px-3 !py-1.5 !text-xs sm:inline-flex">
            <Download size={14} /> Install
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-zinc-300 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <nav className="container-x grid gap-1 py-4" aria-label="Mobile navigation">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b border-white/10 py-3 font-mono text-xs uppercase tracking-wider ${
                    pathname === item.href ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
