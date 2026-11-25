import raw from "@/config/site.json";

export type Platform = "windows" | "linux" | "macos";
export type PlatformKey = Platform | "All";

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  repository: { owner: string; repo: string; branch: string };
  nav: { label: string; href: string }[];
  platforms: Platform[];
  features: Feature[];
  downloads: {
    patterns: Record<Platform, string[]>;
    checksumNames: string[];
    instructions: Record<Platform, string[]>;
  };
  roadmap: { title: string; description: string; status: string }[];
}

export const site = raw as SiteConfig;

export const repoUrl = `https://github.com/${site.repository.owner}/${site.repository.repo}`;
export const releasesUrl = `${repoUrl}/releases`;
export const issuesUrl = `${repoUrl}/issues`;

export const platformLabel: Record<Platform, string> = {
  windows: "Windows",
  linux: "Linux",
  macos: "macOS",
};
