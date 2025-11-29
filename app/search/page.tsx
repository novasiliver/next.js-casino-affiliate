"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SearchContent() {

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any>({ casinos: [], articles: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setResults({ casinos: [], articles: [] });
    }
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Search</h1>
          
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search casinos, articles, bonuses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              autoFocus
            />
          </div>

          {loading && (
            <div className="text-center py-12">
              <p className="text-slate-400">Searching...</p>
            </div>
          )}

          {!loading && query.length >= 2 && (
            <>
              {results.casinos.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Casinos</h2>
                  <div className="space-y-4">
                    {results.casinos.map((casino: any) => (
                      <Link
                        key={casino.id}
                        href={`/review/${casino.slug}`}
                        className="block bg-slate-900 border border-white/5 rounded-xl p-6 hover:border-amber-500/50 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                            {casino.logo}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{casino.name}</h3>
                            <p className="text-sm text-slate-400">Rating: {casino.rating}/5</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.articles.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Articles</h2>
                  <div className="space-y-4">
                    {results.articles.map((article: any) => (
                      <Link
                        key={article.id}
                        href={`/guides/${article.slug}`}
                        className="block bg-slate-900 border border-white/5 rounded-xl p-6 hover:border-amber-500/50 transition-all"
                      >
                        <h3 className="text-white font-semibold mb-2">{article.title}</h3>
                        {article.excerpt && (
                          <p className="text-sm text-slate-400">{article.excerpt}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!loading && query.length >= 2 && results.casinos.length === 0 && results.articles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">No results found for &quot;{query}&quot;</p>
                </div>
              )}
            </>
          )}

          {query.length < 2 && (
            <div className="text-center py-12">
              <p className="text-slate-400">Enter at least 2 characters to search</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return <SearchContent />;
}

