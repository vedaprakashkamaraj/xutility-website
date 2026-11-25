import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import {
  assetKind,
  classifyAsset,
  isChecksumAsset,
  parseChecksums,
  type GitHubAsset,
  type GitHubRelease,
  type ReleaseAsset,
  type ReleasesResponse,
} from "@/lib/releases";

const githubToken = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "xutility-website",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
};

const cacheHeaders = { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" };

function emptyResponse(status: ReleasesResponse["status"], message: string) {
  return NextResponse.json<ReleasesResponse>(
    { status, release: null, assets: [], message, fetchedAt: new Date().toISOString() },
    { headers: cacheHeaders },
  );
}

function findChecksum(map: Map<string, string>, name: string): string | undefined {
  const lower = name.toLowerCase();
  return map.get(lower) ?? map.get(lower.split("/").pop() ?? lower);
}

export async function GET() {
  const { owner, repo } = site.repository;
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=20`;

  let releases: GitHubRelease[];
  try {
    const res = await fetch(endpoint, { headers, next: { revalidate: 60 } });
    if (!res.ok) {
      return emptyResponse("error", `GitHub returned ${res.status}. Try again later.`);
    }
    releases = (await res.json()) as GitHubRelease[];
  } catch {
    return emptyResponse("error", "Could not reach the GitHub Releases API.");
  }

  const stable = releases.find((r) => !r.draft && !r.prerelease);
  if (!stable) {
    return emptyResponse(
      "unavailable",
      "No stable public release has been published yet. Builds are still distributed from source.",
    );
  }

  const checksumAssets = stable.assets.filter((a) => isChecksumAsset(a.name)).slice(0, 4);
  const maps = await Promise.allSettled(
    checksumAssets.map(async (asset: GitHubAsset) => {
      const text = await fetch(asset.browser_download_url, {
        headers: { "User-Agent": "xutility-website" },
        next: { revalidate: 3600 },
      }).then((r) => (r.ok ? r.text() : ""));
      return parseChecksums(text);
    }),
  );

  const checksumMap = new Map<string, string>();
  maps.forEach((result) => {
    if (result.status === "fulfilled") {
      result.value.forEach((value, key) => checksumMap.set(key, value));
    }
  });

  const assets: ReleaseAsset[] = stable.assets.map((asset) => ({
    ...asset,
    platform: classifyAsset(asset.name),
    kind: assetKind(asset.name),
    checksum: findChecksum(checksumMap, asset.name),
  }));

  return NextResponse.json<ReleasesResponse>(
    {
      status: "ok",
      release: {
        tag: stable.tag_name,
        name: stable.name || stable.tag_name,
        publishedAt: stable.published_at,
        notes: stable.body,
        url: stable.html_url,
      },
      assets,
      fetchedAt: new Date().toISOString(),
    },
    { headers: cacheHeaders },
  );
}
