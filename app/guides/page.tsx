"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  imageUrl?: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function GuidesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory ? `&category=${selectedCategory}` : '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles?limit=100${categoryParam}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        setArticles([]);
        return;
      }
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All Posts', 'Strategy', 'Industry News', 'Guides'];
  const categoryMap: Record<string, string[]> = {
    'All Posts': [],
    'Strategy': ['Strategy'],
    'Industry News': ['Industry', 'Industry News'],
    'Guides': ['Guides'],
  };

  const filteredArticles = selectedCategory && selectedCategory !== 'All Posts'
    ? articles.filter(a => categoryMap[selectedCategory].includes(a.category))
    : articles;

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Industry News': 'text-white',
      'Industry': 'text-white',
      'Strategy': 'text-emerald-400',
      'Guides': 'text-indigo-400',
      'Beginner Guide': 'text-indigo-400',
    };
    return colors[category] || 'text-white';
  };

  const getReadTime = (content?: string) => {
    if (!content) return '3 min read';
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <>
      <Navbar currentPage="guides" />
      
      {/* Page Header */}
      <section className="relative pt-32 pb-12 overflow-hidden border-b border-white/5">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-white/10 text-slate-400 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Insights & Analysis
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                Master the game. <br />
                <span className="text-slate-500">Stay ahead of the curve.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Expert strategies, deep-dive reviews, and breaking news from the global gambling industry.
              </p>
            </div>
            
            {/* Category Filter Buttons */}
            <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                    selectedCategory === cat || (!selectedCategory && cat === 'All Posts')
                      ? 'bg-slate-800 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="pb-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 mt-4">Loading articles...</p>
            </div>
          ) : paginatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article) => (
                <Link key={article.id} href={`/guides/${article.slug}`} className="group flex flex-col h-full bg-slate-900/30 rounded-xl border border-white/5 hover:border-white/10 hover:bg-slate-900 transition-all duration-300">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl relative">
                    <div className={`absolute top-4 left-4 z-10 px-2.5 py-1 bg-slate-950/80 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider border border-white/10 ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </div>
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900"></div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span>{getReadTime(article.excerpt || article.title)}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 leading-snug group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 group-hover:text-white transition-colors">Read Article</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-white transition-all">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 mb-4">No articles found in this category.</p>
              <Link href="/" className="text-amber-400 hover:text-amber-300">
                Return to Homepage
              </Link>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-slate-800 border-white/10 text-white font-medium'
                        : 'border-transparent text-slate-500 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="text-slate-600 px-2">...</span>
              )}
              
              {totalPages > 5 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm transition-colors ${
                    currentPage === totalPages
                      ? 'bg-slate-800 border-white/10 text-white font-medium'
                      : 'border-transparent text-slate-500 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {totalPages}
                </button>
              )}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
