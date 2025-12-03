"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({ currentPage = "home" }: { currentPage?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 glass-panel transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
              <span className="text-slate-950 font-bold text-lg tracking-tighter">B</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">BONUS<span className="text-slate-500">ORY</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${currentPage === "home" ? "text-white" : "text-slate-300 hover:text-white"}`}
            >
              Home
            </Link>

            <Link 
              href="/guides" 
              className={`text-sm font-medium transition-colors ${currentPage === "guides" ? "text-white" : "text-slate-300 hover:text-white"}`}
            >
              Guides
            </Link>

            <Link 
              href="/bonuses" 
              className={`text-sm font-medium transition-colors ${currentPage === "bonuses" ? "text-white" : "text-slate-300 hover:text-white"}`}
            >
              Bonuses
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

            <Link 
              href="/guides" 
              className="block text-sm font-medium text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Guides
            </Link>
            <Link 
              href="/bonuses" 
              className="block text-sm font-medium text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bonuses
            </Link>

          </div>
        )}
      </div>
    </nav>
  );
}
