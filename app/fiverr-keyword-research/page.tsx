"use client";

import { useEffect, useRef, useState } from "react";
import { Clipboard, Check, Sparkles, CheckCircle2 } from "lucide-react";

type StreamItem = {
  value?: string;
  error?: string;
};

const COOLDOWN_SECONDS = 30;

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
    <main className="min-h-screen bg-gradient-to-br mt-[-120px] pt-[130px] from-[#0b0f14] via-[#0f172a] to-black text-gray-100 flex flex-col items-center justify-start pb-24">
      <div className="w-full max-w-6xl p-6 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold pb-3 tracking-tight">
            Fiverr Keyword Research Tool.
          </h1>
          <p className="text-gray-400 text-xl">
            100% Real & free keyword research tool.
          </p>
          <p className="text-green-400 text-sm">
            Scroll down to read our Fiverr SEO & Optimization Guide
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3 max-w-2xl mx-auto">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. WordPress"
            disabled={loading}
            className="flex-1 bg-[#0b1220] border border-white/30 rounded-sm px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
            onKeyDown={e => e.key === "Enter" && startSearch()}
          />

          {!loading ? (
            <button
              onClick={startSearch}
              disabled={cooldown > 0}
              className="bg-yellow-600 hover:bg-yellow-900 transition px-6 py-3 rounded-sm font-medium disabled:opacity-50"
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
                ${copiedAll
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

      {/* SEO Content Section */}
      <div className="w-full max-w-5xl mx-auto mt-16 px-6 pt-16 border-t border-white/10 space-y-16">

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">Fiverr SEO Guide</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              What is Fiverr Keyword Research?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Fiverr keyword research is the process of identifying search terms, queries, and tags that potential buyers type into the Fiverr search bar when looking for freelance services.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Unlike traditional search engines like Google, Fiverr&apos;s search engine is highly transaction-focused. Buyers are looking to make a purchase immediately. Finding high-intent, low-competition keywords allows your gig to rank higher and stand out in front of active buyers.
            </p>
          </div>
          <div className="bg-[#0b1220]/60 border border-white/10 p-8 rounded-2xl backdrop-blur-sm space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="text-yellow-500 w-5 h-5" /> Why Fiverr SEO Matters
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Higher Visibility:</strong> Gigs targeting the right keywords rank on the first page, resulting in more impressions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Better Conversion:</strong> Targeting specific long-tail keywords matches user intent, leading to higher click-through rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Zero Ads Cost:</strong> Organic ranking drives consistent sales without spending a dime on Fiverr Promoted Gigs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white">How This Tool Helps You Rank</h2>
            <p className="text-gray-400">Our free keyword tool automates the process of extracting real search suggestion data directly from Fiverr.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-[#0b1220]/40 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 font-bold">1</div>
              <h4 className="font-semibold text-white">Real-Time Suggestions</h4>
              <p className="text-sm text-gray-400">Queries Fiverr&apos;s autocomplete database directly to ensure the keywords are active and trending among real buyers.</p>
            </div>
            <div className="bg-[#0b1220]/40 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 font-bold">2</div>
              <h4 className="font-semibold text-white">Alpha-Prefix Expansion</h4>
              <p className="text-sm text-gray-400">Scans alphabetical prefixes (e.g. &quot;a WordPress&quot;, &quot;b WordPress&quot;) to uncover hidden, high-converting long-tail variations.</p>
            </div>
            <div className="bg-[#0b1220]/40 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 font-bold">3</div>
              <h4 className="font-semibold text-white">Competitor Insight</h4>
              <p className="text-sm text-gray-400">Directly link each keyword suggestion back to Fiverr search to analyze top competitor gigs, price points, and tag structures.</p>
            </div>
          </div>
        </div>

        {/* Gig Optimization Guide */}
        <div className="bg-gradient-to-r from-[#0b1220] to-[#0d1e3d]/40 border border-white/10 rounded-2xl p-8 md:p-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">How to Optimize Your Fiverr Gig in 4 Steps</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-300">
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-white flex items-center gap-2 text-base">
                  <span className="text-yellow-500">Step 1.</span> Write a Keyword-Rich Title
                </h4>
                <p className="text-sm text-gray-400">
                  Include your primary keyword in the first half of your gig title. Make it natural and appealing to buyers (e.g., <em>&quot;I will build a high-performance Next.js website for your SaaS&quot;</em>).
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white flex items-center gap-2 text-base">
                  <span className="text-yellow-500">Step 2.</span> Select 5 Relevant Tags
                </h4>
                <p className="text-sm text-gray-400">
                  Fiverr allows up to 5 search tags. Use the keywords found using our tool. Mix high-volume keywords with low-competition, specific long-tail tags.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-white flex items-center gap-2 text-base">
                  <span className="text-yellow-500">Step 3.</span> Optimize the Description
                </h4>
                <p className="text-sm text-gray-400">
                  Naturally write your primary keyword in the first 2 lines of your gig description. Add secondary keywords and long-tail variations throughout the description (aim for 2-3 times max to avoid keyword stuffing).
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white flex items-center gap-2 text-base">
                  <span className="text-yellow-500">Step 4.</span> Use Keywords in FAQ & Packages
                </h4>
                <p className="text-sm text-gray-400">
                  Add custom FAQs using target terms in both the question and answer sections. This strengthens the topical authority of your gig, making it easier for Fiverr&apos;s ranking algorithm to index it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-[#0b1220]/80 border border-white/5 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">How does this Fiverr Keyword Research tool work?</h4>
              <p className="text-sm text-gray-400">
                Our tool connects directly to Fiverr&apos;s search autocomplete API. When you input a keyword, it triggers queries starting with letters to get the exact phrases buyers are typing.
              </p>
            </div>
            <div className="bg-[#0b1220]/80 border border-white/5 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">What are low-competition Fiverr keywords?</h4>
              <p className="text-sm text-gray-400">
                Low-competition keywords are specific search terms (often long-tail) that have fewer active gigs competing for them (e.g., less than 1,000 search results) but still have decent buyer demand.
              </p>
            </div>
            <div className="bg-[#0b1220]/80 border border-white/5 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">How many tags can I use in a Fiverr Gig?</h4>
              <p className="text-sm text-gray-400">
                You can use a maximum of 5 tags. It is highly recommended to use all 5 tags and make sure they are closely related to the core service of your gig.
              </p>
            </div>
            <div className="bg-[#0b1220]/80 border border-white/5 rounded-xl p-6">
              <h4 className="font-semibold text-white mb-2">Is this Fiverr Keyword Tool free to use?</h4>
              <p className="text-sm text-gray-400">
                Yes, it is 100% free with no registration required. We designed it for freelancers looking to quickly extract search tag suggestions and optimize their gigs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
