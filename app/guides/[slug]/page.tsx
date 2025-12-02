"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    fetchArticle();
    
    // Scroll progress bar
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    
    // Track active section for table of contents
    const handleSectionScroll = () => {
      const introSection = document.getElementById('intro');
      const contentSection = document.getElementById('content');
      const scrollPosition = window.scrollY + 250; // Offset for header
      
      if (contentSection && scrollPosition >= contentSection.offsetTop) {
        setActiveSection('content');
      } else if (introSection && scrollPosition >= introSection.offsetTop) {
        setActiveSection('intro');
      } else {
        setActiveSection('intro');
      }
    };
    
    window.addEventListener('scroll', handleSectionScroll);
    handleSectionScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionScroll);
    };
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setImageError(false); // Reset image error when fetching new article
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles/${slug}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        router.push('/guides');
        return;
      }
      const data = await res.json();
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      router.push('/guides');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article?.title || '';

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 pb-12 min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <>
      <Navbar />
      
      {/* Progress Bar */}
      <div className="fixed top-16 left-0 h-0.5 bg-amber-500 z-50 transition-all duration-150" style={{ width: `${scrollProgress}%` }}></div>

      {/* Article Header */}
      <header className="pt-32 pb-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <Link href="/guides" className="hover:text-white transition-colors">{article.category}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <span className="text-amber-500">{article.title}</span>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
              {article.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-8 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-center gap-8 border-y border-white/5 py-6">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                  {article.category.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Editor</div>
                  <div className="text-xs text-slate-500">{article.category} Writer</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-slate-500">Published</span>
                <span className="text-sm text-slate-300 font-medium">{formatDate(article.publishedAt)}</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-slate-500">Read time</span>
                <span className="text-sm text-slate-300 font-medium">{getReadTime(article.content)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar (Share) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex flex-col gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert('Link copied to clipboard!');
                  }}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </button>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <button
                  onClick={() => {
                    // Bookmark functionality - could be enhanced with localStorage
                    alert('Bookmark saved!');
                  }}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Article Body */}
            <article className="col-span-1 lg:col-span-8">
              
              {/* Featured Image */}
              {article.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 mb-12 group">
                  <div className="absolute inset-0 bg-slate-900/10 z-10"></div>
                  {!imageError ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover"
                      unoptimized={article.imageUrl.startsWith('http')}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Hide image if both Next.js Image and regular img fail
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
              )}

              {/* Intro Text */}
              {article.excerpt && (
                <div id="intro" className="prose-lg text-lg leading-relaxed font-light text-slate-300 mb-8 scroll-mt-24">
                  <p className="mb-6 drop-cap first-letter:float-left first-letter:text-5xl first-letter:pr-4 first-letter:font-bold first-letter:text-white">
                    {article.excerpt}
                  </p>
                </div>
              )}

              {/* Article Content */}
              <div id="content" className="prose prose-invert prose-slate max-w-none scroll-mt-24">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg font-light">
                  {article.content.split('\n').map((paragraph, idx) => {
                    if (paragraph.trim() === '') return <br key={idx} />;
                    
                    // Check for headings
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={idx} className="text-2xl md:text-3xl font-semibold text-white tracking-tight mt-12 mb-6">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xl font-semibold text-white tracking-tight mt-8 mb-4">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    
                    // Check for blockquote
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={idx} className="border-l-4 border-slate-700 pl-6 py-2 my-8 italic text-slate-300">
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    
                    // Regular paragraph
                    return (
                      <p key={idx} className="text-lg text-slate-400 leading-relaxed font-light mb-6">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-medium text-slate-400 hover:text-white hover:border-white/30 transition-all">
                  #{article.category.replace(/\s+/g, '')}
                </span>
              </div>
            </article>

            {/* Right Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 space-y-8">
              
              {/* Author Box */}
              <div className="rounded-xl border border-white/10 bg-slate-900/30 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
                    {article.category.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Editor</h4>
                    <p className="text-xs text-slate-500">{article.category} Writer</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Expert content writer covering {article.category.toLowerCase()} and industry insights for Bonusory.
                </p>
                <Link
                  href="/guides"
                  className="w-full py-2 rounded-lg border border-white/10 text-xs font-semibold text-white hover:bg-white hover:text-slate-950 transition-all block text-center"
                >
                  View More Articles
                </Link>
              </div>

              {/* Table of Contents - Simplified */}
              <div className="sticky top-32">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">On This Page</h4>
                <ul className="space-y-0 border-l border-white/10">
                  <li>
                    <button
                      onClick={() => {
                        const introSection = document.getElementById('intro');
                        if (introSection) {
                          introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`block w-full text-left pl-4 py-2 border-l -ml-px text-sm font-medium transition-all ${
                        activeSection === 'intro'
                          ? 'border-amber-500 text-amber-500'
                          : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      Introduction
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        const contentSection = document.getElementById('content');
                        if (contentSection) {
                          contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`block w-full text-left pl-4 py-2 border-l -ml-px text-sm transition-all ${
                        activeSection === 'content'
                          ? 'border-amber-500 text-amber-500 font-medium'
                          : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      Content
                    </button>
                  </li>
                </ul>

                {/* Newsletter Mini */}
                <div className="mt-8 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 p-5">
                  <h4 className="text-sm font-bold text-amber-500 mb-2">Don&apos;t miss the next update</h4>
                  <p className="text-xs text-slate-400 mb-4">Get real-time alerts when we publish new articles.</p>
                  <NewsletterForm compact />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
