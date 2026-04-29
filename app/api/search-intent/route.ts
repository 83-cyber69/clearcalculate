import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type SearchIntentStore = {
  version: number;
  updatedAt: string;
  queries: { query: string; count: number; lastSeenAt: string }[];
};

const STORE_PATH = "analytics/search-intent.json";

async function readStore(): Promise<SearchIntentStore> {
  const abs = path.join(process.cwd(), STORE_PATH);
  try {
    const raw = await fs.readFile(abs, "utf8");
    const parsed = JSON.parse(raw) as SearchIntentStore;
    if (!parsed || typeof parsed !== "object") throw new Error("invalid");
    if (!Array.isArray(parsed.queries)) parsed.queries = [];
    return parsed;
  } catch {
    return { version: 1, updatedAt: "", queries: [] };
  }
}

async function writeStore(store: SearchIntentStore) {
  const abs = path.join(process.cwd(), STORE_PATH);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, JSON.stringify(store, null, 2) + "\n", "utf8");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { query?: string };
    const q = (body.query ?? "").toLowerCase().trim();
    if (!q) return NextResponse.json({ ok: true });

    const store = await readStore();
    const now = new Date().toISOString();

    const existing = store.queries.find((x) => x.query === q);
    if (existing) {
      existing.count += 1;
      existing.lastSeenAt = now;
    } else {
      store.queries.push({ query: q, count: 1, lastSeenAt: now });
    }

    store.updatedAt = now;
    store.queries.sort((a, b) => b.count - a.count);
    store.queries = store.queries.slice(0, 500);

    await writeStore(store);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
