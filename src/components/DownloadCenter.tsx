"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  Check,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  GitBranch,
  Monitor,
  Package,
  RefreshCw,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { site, platformLabel, releasesUrl, repoUrl, type Platform } from "@/lib/site";
import { formatDate, formatSize, type ReleasesResponse, type ReleaseAsset } from "@/lib/releases";

const icons = { windows: Monitor, linux: Terminal, macos: Apple };

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "windows";
  const ua = `${navigator.userAgent} ${(navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? ""}`;
  if (/mac|iphone|ipad|ipod/i.test(ua)) return "macos";
  if (/linux|x11/i.test(ua) && !/android/i.test(ua)) return "linux";
  return "windows";
}

function AssetCard({ asset, copied, onCopy }: { asset: ReleaseAsset; copied: boolean; onCopy: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-md border border-line bg-transparent p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Package size={15} className="shrink-0 text-muted" />
            <h4 className="mono truncate text-sm font-medium text-fg">{asset.name}</h4>
          </div>
          <p className="mt-1.5 text-xs text-muted">
            {asset.kind} · {formatSize(asset.size)} · {asset.download_count.toLocaleString()} downloads
          </p>
        </div>
        <a href={asset.browser_download_url} className="btn !px-4 !py-2" rel="noopener noreferrer" target="_blank">
          <Download size={14} /> Download
        </a>
      </div>

      {asset.checksum && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2">
          <ShieldCheck size={14} className="shrink-0 text-muted" />
          <code className="mono min-w-0 flex-1 truncate text-[11px] text-muted" title={asset.checksum}>
            SHA-256 {asset.checksum}
          </code>
          <button type="button" onClick={onCopy} className="text-muted transition-colors hover:text-fg" aria-label="Copy checksum">
            {copied ? <Check size={14} className="text-fg" /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </motion.article>
  );
}

export default function DownloadCenter() {
  const [data, setData] = useState<ReleasesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [platform, setPlatform] = useState<Platform>("windows");
  const [detected, setDetected] = useState<Platform | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/releases", { cache: "no-store" });
      if (!res.ok) throw new Error("bad response");
      setData((await res.json()) as ReleasesResponse);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const found = detectPlatform();
    setDetected(found);
    setPlatform(found);
    void load();

    const hash = window.location.hash.replace("#", "");
    if (hash === "windows" || hash === "linux" || hash === "macos") setPlatform(hash);
  }, [load]);

  const assets = useMemo(
    () => (data?.assets ?? []).filter((a) => a.platform === platform && a.kind !== "Checksum"),
    [data, platform],
  );
  const checksums = useMemo(() => (data?.assets ?? []).filter((a) => a.kind === "Checksum"), [data]);

  const copy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose your operating system">
          {(Object.keys(platformLabel) as Platform[]).map((key) => {
            const Icon = icons[key];
            const active = platform === key;
            return (
              <button
                key={key}
                id={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setPlatform(key)}
                className={`relative flex items-center gap-2 rounded-md border px-4 py-3 text-sm transition-colors ${
                  active
                    ? "border-line bg-accent text-accent-ink"
                    : "border-line bg-transparent text-muted hover:border-line hover:text-fg"
                }`}
              >
                <Icon size={16} />
                {platformLabel[key]}
                {detected === key && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-panel" : "bg-raised"}`}>
                    detected
                  </span>
                )}
                {active && <motion.span layoutId="tab-underline" className="absolute inset-x-3 -bottom-px h-px bg-panel" />}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-24 animate-pulse rounded-md border border-line bg-transparent" />
                ))}
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card text-center">
                <p className="font-medium text-fg">Could not load release information.</p>
                <p className="mt-2 text-sm text-muted">Check your connection and try again.</p>
                <button type="button" onClick={() => void load()} className="btn-ghost mx-auto mt-5">
                  <RefreshCw size={15} /> Retry
                </button>
              </motion.div>
            ) : !data?.release ? (
              <motion.div key="soon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Development build</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-fg">No published installer yet</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {data?.message ?? "This project has not published a stable GitHub Release."} You can still run X Utility from source today.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={repoUrl} target="_blank" rel="noopener" className="btn-ghost">
                    <GitBranch size={15} /> Build from source
                  </a>
                  <a href={releasesUrl} target="_blank" rel="noopener" className="btn-ghost">
                    Watch releases <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ) : assets.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card">
                <h3 className="font-semibold text-fg">No {platformLabel[platform]} asset in this release</h3>
                <p className="mt-2 text-sm text-muted">The latest release does not include a file recognized for this platform.</p>
                <a href={data.release.url} target="_blank" rel="noopener" className="btn-ghost mt-5">
                  View all release assets <ExternalLink size={14} />
                </a>
              </motion.div>
            ) : (
              <motion.div key={`assets-${platform}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {assets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      copied={copied === String(asset.id)}
                      onCopy={() => void copy(asset.checksum ?? "", String(asset.id))}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {checksums.length > 0 && (
          <div className="mt-8 rounded-md border border-line bg-panel p-5">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-fg">
              <ShieldCheck size={16} /> Verify your download
            </h4>
            <p className="mt-2 text-xs leading-5 text-muted">
              Checksum files published with this release. Compare the SHA-256 value before opening an installer.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {checksums.map((asset) => (
                <a key={asset.id} href={asset.browser_download_url} target="_blank" rel="noopener" className="btn-ghost !px-3 !py-2 !text-xs">
                  <Download size={13} /> {asset.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className="space-y-6">
        <div className="card">
          <p className="eyebrow">Latest stable release</p>
          {data?.release ? (
            <>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-accent px-2.5 py-1 text-xs font-bold text-accent-ink">{data.release.tag}</span>
                <span className="text-xs text-muted">{formatDate(data.release.publishedAt)}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-fg">{data.release.name}</h3>
              <a href={data.release.url} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
                Read release notes <ChevronRight size={15} />
              </a>
            </>
          ) : (
            <p className="text-sm text-muted">Waiting for the first stable release.</p>
          )}
        </div>

        <div className="card">
          <p className="eyebrow">Install on {platformLabel[platform]}</p>
          <ol className="space-y-3">
            {site.downloads.instructions[platform].map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="mono mt-0.5 text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <span className={step.includes("sudo") || step.includes("chmod") || step.includes("python3") ? "mono text-[12px] text-muted" : ""}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-line bg-transparent p-5 text-xs leading-6 text-muted">
          <p className="font-semibold text-muted">Safety note</p>
          <p className="mt-2">
            This website only links to files published by the maintainers. It never installs, executes or modifies software on your computer.
          </p>
        </div>
      </aside>
    </div>
  );
}
