"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Template {
  id: string;
  name: string;
  slug: string;
}

interface GroupedTemplates {
  [category: string]: Template[];
}

export default function Navbar({ currentPage = "home" }: { currentPage?: string }) {
  const [templates, setTemplates] = useState<GroupedTemplates>({});
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await res.json();
        console.log('Navbar fetched templates:', data.templates);
        console.log('Casino Review Page templates:', data.templates?.['Casino Review Page Template']);
        setTemplates(data.templates || {});
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
    
    // Refresh templates every 10 seconds to pick up new templates
    const interval = setInterval(fetchTemplates, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const categoryOrder = [
    "Casino Review Page Template",
    "Post Page Template",
    "Game Page Template",
    "Bonus Page Template"
  ];

  const getTemplateLink = (category: string, templateSlug: string) => {
    // Map categories to their preview routes
    const categoryRoutes: Record<string, string> = {
      "Casino Review Page Template": "/review/template",
      "Post Page Template": "/guides/template",
      "Game Page Template": "/games/template",
      "Bonus Page Template": "/bonuses/template"
    };
    
    const baseRoute = categoryRoutes[category] || "/";
    // Link to template preview page with template slug
    return `${baseRoute}/${templateSlug}`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 glass-panel transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
              <span className="text-slate-950 font-bold text-lg tracking-tighter">P</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">PRIME<span className="text-slate-500">BET</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${currentPage === "home" ? "text-white" : "text-slate-300 hover:text-white"}`}
            >
              Home
            </Link>

            {/* Casino Review Page with Submenu */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setIsFeaturesOpen(true);
                const casinoTemplates = templates["Casino Review Page Template"] || [];
                if (casinoTemplates.length > 0) {
                  setActiveSubmenu("Casino Review Page Template");
                }
              }}
              onMouseLeave={() => {
                setIsFeaturesOpen(false);
                setActiveSubmenu(null);
              }}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  currentPage === "review" ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                Casino Review Page
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              {isFeaturesOpen && templates["Casino Review Page Template"] && templates["Casino Review Page Template"].length > 0 && (
                <>
                  {/* Invisible bridge to prevent gap */}
                  <div 
                    className="absolute top-full left-0 w-full h-2"
                    onMouseEnter={() => {
                      setIsFeaturesOpen(true);
                      setActiveSubmenu("Casino Review Page Template");
                    }}
                  />
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-xl z-50"
                    onMouseEnter={() => {
                      setIsFeaturesOpen(true);
                      setActiveSubmenu("Casino Review Page Template");
                    }}
                    onMouseLeave={() => {
                      setIsFeaturesOpen(false);
                      setActiveSubmenu(null);
                    }}
                  >
                    {templates["Casino Review Page Template"].map((template) => (
                      <Link
                        key={template.id}
                        href={getTemplateLink("Casino Review Page Template", template.slug)}
                        className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {template.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link 
              href="/guides" 
              className={`text-sm font-medium transition-colors ${currentPage === "guides" ? "text-white" : "text-slate-300 hover:text-white"}`}
            >
              Gambling News
            </Link>
            <Link 
              href="/bonuses" 
              className={`text-sm font-medium transition-colors ${currentPage === "bonuses" ? "text-white" : "text-slate-300 hover:text-white"}`}
            >
              Bonuses
            </Link>
          </div>

          {/* Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/search" className="text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="search" className="lucide lucide-search w-5 h-5"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
            </Link>
            <Link href="/admin/login" className="group relative px-5 py-2 rounded-full bg-slate-800 border border-white/10 text-xs font-semibold text-white hover:bg-slate-700 transition-all overflow-hidden">
              <span className="relative z-10">Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="menu" className="lucide lucide-menu w-6 h-6"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-sm font-medium text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Casino Review Page with Submenu */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveSubmenu(activeSubmenu === "mobile-casino-review" ? null : "mobile-casino-review")}
                className="flex items-center justify-between w-full text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Casino Review Page
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform ${activeSubmenu === "mobile-casino-review" ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              {activeSubmenu === "mobile-casino-review" && templates["Casino Review Page Template"] && (
                <div className="pl-4 space-y-1">
                  {templates["Casino Review Page Template"].map((template) => (
                    <Link
                      key={template.id}
                      href={getTemplateLink("Casino Review Page Template", template.slug)}
                      className="block pl-4 text-sm text-slate-400 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {template.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/guides" 
              className="block text-sm font-medium text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gambling News
            </Link>
            <Link 
              href="/bonuses" 
              className="block text-sm font-medium text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bonuses
            </Link>

            <div className="pt-4 border-t border-white/5 flex items-center gap-4">
              <Link 
                href="/search" 
                className="text-slate-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
              </Link>
              <Link 
                href="/admin/login" 
                className="px-4 py-2 rounded-full bg-slate-800 border border-white/10 text-xs font-semibold text-white hover:bg-slate-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
