import { site, type Platform } from "./site";

export interface GitHubAsset {
  id: number;
  name: string;
  label: string | null;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  html_url: string;
  assets: GitHubAsset[];
}

export interface ReleaseAsset extends GitHubAsset {
  platform: Platform | "other";
  kind: string;
  checksum?: string;
}

export interface ReleasesResponse {
  status: "ok" | "unavailable" | "error";
  release: {
    tag: string;
    name: string;
    publishedAt: string | null;
    notes: string | null;
    url: string;
  } | null;
  assets: ReleaseAsset[];
  message?: string;
  fetchedAt: string;
}

function score(name: string, needles: string[]): number {
  const lower = name.toLowerCase();
  return needles.reduce((total, n) => total + (lower.includes(n.toLowerCase()) ? 1 : 0), 0);
}

export function classifyAsset(name: string): Platform | "other" {
  let best: Platform | "other" = "other";
  let bestScore = 0;
  (Object.keys(site.downloads.patterns) as Platform[]).forEach((platform) => {
    const s = score(name, site.downloads.patterns[platform]);
    if (s > bestScore) {
      bestScore = s;
      best = platform;
    }
  });
  return best;
}

export function assetKind(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith(".exe")) return "Installer (EXE)";
  if (lower.endsWith(".msi")) return "Installer (MSI)";
  if (lower.endsWith(".dmg")) return "Disk image (DMG)";
  if (lower.endsWith(".pkg")) return "Package (PKG)";
  if (lower.endsWith(".deb")) return "Debian package (DEB)";
  if (lower.endsWith(".rpm")) return "RPM package";
  if (lower.endsWith(".appimage")) return "Portable AppImage";
  if (lower.endsWith(".zip")) return "Portable archive (ZIP)";
  if (lower.endsWith(".tar.gz") || lower.endsWith(".tgz")) return "Archive (tar.gz)";
  if (lower.includes("sha256") || lower.includes("checksum")) return "Checksum";
  return "Download";
}

export function isChecksumAsset(name: string): boolean {
  const lower = name.toLowerCase();
  return site.downloads.checksumNames.some((n) => lower.includes(n));
}

/** Parse `<hash>  file` / `<hash> *file` / `SHA256(file)= hash` checksum files. */
export function parseChecksums(text: string): Map<string, string> {
  const result = new Map<string, string>();
  for (const line of text.split(/\r?\n/)) {
    const pair = line.match(/^([a-fA-F0-9]{64})\s+\*?(.+)$/);
    if (pair) {
      result.set(pair[2].trim().toLowerCase(), pair[1]);
      continue;
    }
    const hashParen = line.match(/^SHA256\((.+?)\)\s*=\s*([a-fA-F0-9]{64})$/i);
    if (hashParen) result.set(hashParen[1].trim().toLowerCase(), hashParen[2]);
  }
  return result;
}

export function formatSize(bytes: number): string {
  if (bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "Unknown";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
