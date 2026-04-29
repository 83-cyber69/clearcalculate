import type { Metadata } from "next";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";

export const metadata: Metadata = {
  title: {
    absolute: "SEO Dashboard | ClearCalculate"
  },
  robots: { index: false, follow: false }
};

type KeywordClusterStatus = "planned" | "building" | "published" | "indexed";

type KeywordClusterRecord = {
  parentKeyword: string;
  variants: string[];
  intent: string;
  score: number;
  recommendedPageType: string;
  linkedCalculator: string | null;
  status: KeywordClusterStatus;
};

async function readJsonFile<T>(relativeFilePath: string, fallback: T): Promise<T> {
  try {
    const abs = path.join(process.cwd(), relativeFilePath);
    const raw = await fs.readFile(abs, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default async function SeoDashboardPage() {
  const clusters = await readJsonFile<KeywordClusterRecord[]>("data/keyword-clusters.json", []);

  const sorted = [...clusters].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const top = sorted.slice(0, 50);

  const unserved = sorted.filter((c) => !c.linkedCalculator).slice(0, 25);

  const overlapWarnings = sorted
    .filter((c) => (c.variants?.length ?? 0) > 8)
    .slice(0, 15);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="glass-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">SEO Dashboard</h1>
        <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
          Internal view of keyword clusters and page opportunities. This page is <span className="font-medium">noindex</span>.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Clusters: {clusters.length}</span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Top shown: {top.length}</span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Unserved: {unserved.length}</span>
        </div>
      </div>

      <section className="mt-8 grid gap-6">
        <div className="glass-card p-6 sm:p-8">
          <h2 className="section-title">Top clusters</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <th className="py-3 pr-4">Keyword</th>
                  <th className="py-3 pr-4">Intent</th>
                  <th className="py-3 pr-4">Score</th>
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4">Linked</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {top.map((c) => (
                  <tr key={c.parentKeyword} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium text-slate-900">{c.parentKeyword}</td>
                    <td className="py-3 pr-4 text-slate-700">{c.intent}</td>
                    <td className="py-3 pr-4 text-slate-700">{c.score}</td>
                    <td className="py-3 pr-4 text-slate-700">{c.recommendedPageType}</td>
                    <td className="py-3 pr-4 text-slate-700">
                      {c.linkedCalculator ? (
                        <Link className="underline underline-offset-4 hover:text-orange-600" href={`/${c.linkedCalculator}`}>
                          {c.linkedCalculator}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <h2 className="section-title">Unserved demand (no linked calculator)</h2>
          <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-700 sm:text-base">
            {unserved.length === 0 ? (
              <p>No unserved clusters found.</p>
            ) : (
              unserved.map((c) => (
                <div key={c.parentKeyword} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium text-slate-900">{c.parentKeyword}</span>
                    <span className="text-xs font-semibold text-slate-600">Score: {c.score}</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600">{c.intent} • {c.recommendedPageType} • {c.status}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <h2 className="section-title">Keyword overlap warnings</h2>
          <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-700 sm:text-base">
            {overlapWarnings.length === 0 ? (
              <p>No warnings.</p>
            ) : (
              overlapWarnings.map((c) => (
                <div key={c.parentKeyword} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium text-slate-900">{c.parentKeyword}</span>
                    <span className="text-xs font-semibold text-slate-600">Variants: {c.variants.length}</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600">{c.intent} • Score {c.score}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
