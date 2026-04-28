import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect x="6" y="6" width="52" height="52" rx="16" fill="#fff7f0" stroke="rgba(255,106,0,0.18)" stroke-width="3"/>
  <text x="32" y="44" text-anchor="middle" font-size="40" font-weight="800" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial" fill="#ff6a00">C</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
