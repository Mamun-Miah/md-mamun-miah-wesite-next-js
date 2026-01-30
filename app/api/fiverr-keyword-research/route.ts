/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from "next/server";

/* ================= CONFIG ================= */

const HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
};

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const PREFIXES: string[] = [
  ...LETTERS,
  ...LETTERS.flatMap(a => LETTERS.map(b => a + b)),
];

// HARD LIMITS
const MAX_PREFIXES = 200; // max work per request
const RATE_LIMIT = 15; // requests
const RATE_WINDOW = 60_000; // 1 minute

/* ================= RATE LIMIT ================= */

// In-memory rate limiter (best-effort on Vercel)
const rateMap = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = rateMap.get(ip) || [];
  const recentHits = hits.filter(t => now - t < RATE_WINDOW);

  if (recentHits.length >= RATE_LIMIT) return false;

  recentHits.push(now);
  rateMap.set(ip, recentHits);
  return true;
}

/* ================= HELPERS ================= */

async function fetchSuggestions(query: string): Promise<string[]> {
  const url = `https://www.fiverr.com/search/layout/omnibox?callback=autocompleteCallback&from_medusa_header=true&locale=en-US&pro_only=false&query=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, { headers: HEADERS });
  const text = await res.text();

  const json = text
    .replace("autocompleteCallback(", "")
    .replace(");", "");

  const data = JSON.parse(json);

  return [
    ...(data?.suggestions ?? []).map((s: any) => s.value),
    ...(data?.users_suggestions ?? []).map((s: any) => s.value),
  ];
}

/* ================= API ================= */

export async function POST(req: NextRequest) {
  /* -------- 1. DOMAIN LOCK -------- */
  const origin = req.headers.get("origin");
  const allowedDomain = process.env.ALLOWED_DOMAIN;

  if (!origin || !allowedDomain || !origin.includes(allowedDomain)) {
    return new Response("Forbidden domain", { status: 403 });
  }

  /* -------- 2. RATE LIMIT -------- */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (!rateLimit(ip)) {
    return new Response("Too many requests", { status: 429 });
  }

  /* -------- 3. INPUT VALIDATION -------- */
  const { query }: { query?: string } = await req.json();

  if (
    !query ||
    query.length < 2 ||
    query.length > 50 ||
    /[^a-zA-Z0-9\s]/.test(query)
  ) {
    return new Response("Invalid query", { status: 400 });
  }

  /* -------- 4. STREAMING -------- */
  const encoder = new TextEncoder();
  const seen = new Set<string>();

  const stream = new ReadableStream({
    async start(controller) {
      const push = (value: string) => {
        if (!seen.has(value)) {
          seen.add(value);
          controller.enqueue(
            encoder.encode(JSON.stringify({ value }) + "\n")
          );
        }
      };

      try {
        // Base query (fast response)
        const baseResults = await fetchSuggestions(query);
        baseResults.forEach(push);

        // Expanded queries (limited)
        for (const prefix of PREFIXES.slice(0, MAX_PREFIXES)) {
          try {
            const expanded = `${prefix} ${query}`;
            const results = await fetchSuggestions(expanded);
            results.forEach(push);
          } catch {
            // ignore prefix failure
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ error: "Keyword fetch failed" }) + "\n"
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
