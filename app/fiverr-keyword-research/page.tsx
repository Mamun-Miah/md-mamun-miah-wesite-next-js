"use client";

import { useEffect, useRef, useState } from "react";
import { Clipboard, Check } from "lucide-react";

type StreamItem = {
  value?: string;
  error?: string;
};

const COOLDOWN_SECONDS = 60;

export default function FiverrKeywordResearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const [cooldown, setCooldown] = useState(0);
  const controllerRef = useRef<AbortController | null>(null);

  /* ---------------- COOLDOWN TIMER ---------------- */
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  /* ---------------- START SEARCH ---------------- */
  const startSearch = async () => {
    if (!query.trim() || loading || cooldown > 0) return;

    setResults([]);
    setLoading(true);
    setCooldown(COOLDOWN_SECONDS);

    const controller = new AbortController();
    controllerRef.current = controller;

    let res: Response;

    try {
      res = await fetch("/api/fiverr-keyword-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      });
    } catch {
      setLoading(false);
      setCooldown(0);
      alert("Request cancelled.");
      return;
    }

    /* ---- SECURITY RESPONSE HANDLING ---- */
    if (res.status === 429) {
      setLoading(false);
      alert("Too many requests. Please wait a minute.");
      return;
    }

    if (res.status === 403) {
      setLoading(false);
      alert("Access blocked (domain restriction).");
      return;
    }

    if (!res.ok) {
      setLoading(false);
      alert("Invalid request.");
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) {
      setLoading(false);
      return;
    }

    const decoder = new TextDecoder();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          const data: StreamItem = JSON.parse(line);

          if (data.value) {
            setResults(prev =>
              prev.includes(data.value!)
                ? prev
                : [...prev, data.value!]
            );
          }
        }
      }
    } catch {
      // aborted
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- STOP SEARCH ---------------- */
  const stopSearch = () => {
    controllerRef.current?.abort();
    setLoading(false);
  };

  /* ---------------- COPY ---------------- */
  const copyKeyword = async (keyword: string) => {
    await navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 1200);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(results.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br mt-[-120px] pt-[130px] from-[#0b0f14] via-[#0f172a] to-black text-gray-100 flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold pb-3 tracking-tight">
            Fiverr Keyword Research Tool.
          </h1>
          <p className="text-gray-400">
            100% free keyword research tool.
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3 max-w-2xl mx-auto">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. WordPress"
            disabled={loading}
            className="flex-1 bg-[#0b1220] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            onKeyDown={e => e.key === "Enter" && startSearch()}
          />

          {!loading ? (
            <button
              onClick={startSearch}
              disabled={cooldown > 0}
              className="bg-yellow-600 hover:bg-yellow-900 transition px-6 py-3 rounded-xl font-medium disabled:opacity-50"
            >
              {cooldown > 0 ? `Wait ${cooldown}s` : "Search"}
            </button>
          ) : (
            <button
              onClick={stopSearch}
              className="bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-xl font-medium"
            >
              Stop
            </button>
          )}
        </div>

        {/* Stats */}
        {results.length > 0 && (
          <div className="flex justify-between items-center max-w-5xl mx-auto text-sm text-gray-400">
            <span>{results.length} keywords found</span>

            <button
              onClick={copyAll}
              className={`flex items-center gap-2 border px-3 py-1 rounded-lg transition
                ${
                  copiedAll
                    ? "border-green-500/50 text-green-400 bg-green-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
            >
              {copiedAll ? "Copied ✓" : "Copy All"}
            </button>
          </div>
        )}

        {/* Results */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[55vh] pr-1">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="group bg-[#0b1220] border border-white/10 rounded-xl p-3 flex items-center justify-between hover:border-indigo-500/50 transition"
            >
              <a
                href={`https://www.fiverr.com/search/gigs?query=${encodeURIComponent(
                  item
                )}`}
                target="_blank"
                className="truncate text-sm hover:underline"
              >
                {item}
              </a>

              <button
                onClick={() => copyKeyword(item)}
                className="ml-3 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition"
                title="Copy keyword"
              >
                {copiedKeyword === item ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Clipboard size={16} />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-xs text-gray-500 animate-pulse">
            Fetching keywords live…
          </p>
        )}
      </div>
    </main>
  );
}
