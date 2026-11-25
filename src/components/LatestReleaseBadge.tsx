"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { formatDate, type ReleasesResponse } from "@/lib/releases";
import { releasesUrl } from "@/lib/site";

export default function LatestReleaseBadge() {
  const [data, setData] = useState<ReleasesResponse | null>(null);

  useEffect(() => {
    fetch("/api/releases")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json: ReleasesResponse) => setData(json))
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return <span className="pill">Checking releases…</span>;
  }

  if (!data.release) {
    return (
      <a href={releasesUrl} target="_blank" rel="noopener" className="pill transition-colors hover:text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Pre-release · no stable installer yet
      </a>
    );
  }

  return (
    <a href={data.release.url} target="_blank" rel="noopener" className="pill transition-colors hover:text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      Latest {data.release.tag} · {formatDate(data.release.publishedAt)} <ExternalLink size={11} />
    </a>
  );
}
