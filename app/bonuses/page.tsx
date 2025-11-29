"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BonusesPage() {
  const [wagering, setWagering] = useState(35);
  const [bonusValue, setBonusValue] = useState(500);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [categories, setCategories] = useState({
    welcome: true,
    reload: false,
    cashback: false,
  });
  const [loading, setLoading] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  return (
    <>
      <Navbar currentPage="bonuses" />
      <div className="bg-slate-950 text-slate-300 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {/* Header Section */}
        <section className="pt-32 pb-10 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950"></div>
          {/* Abstract Bg Elements */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-amber-500 text-xs font-semibold tracking-wide uppercase">Live Updates</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-4">
                  New Casino Bonuses
                </h1>
                <p className="text-base text-slate-400 font-light max-w-xl">
                  Explore the latest welcome offers, exclusive no-deposit deals, and free spins added daily. We verify every bonus manually.
                </p>
              </div>
              
              {/* Sort Dropdown Trigger (Visual Only) */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Sorted by:</span>
                <button className="flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-lg text-sm text-white hover:border-white/20 transition-all">
                  <span>Newest Added</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Filters (Horizontal Scroll) */}
        <div className="border-b border-white/5 bg-slate-950 sticky top-16 z-40 backdrop-blur-xl bg-opacity-80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setSelectedFilter("all")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedFilter === "all" 
                    ? "bg-amber-500 text-slate-950" 
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-500/50"
                }`}
              >
                All Bonuses
              </button>
              <button 
                onClick={() => setSelectedFilter("no-deposit")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === "no-deposit" 
                    ? "bg-amber-500 text-slate-950" 
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-500/50"
                }`}
              >
                No Deposit
              </button>
              <button 
                onClick={() => setSelectedFilter("free-spins")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === "free-spins" 
                    ? "bg-amber-500 text-slate-950" 
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-500/50"
                }`}
              >
                Free Spins
              </button>
              <button 
                onClick={() => setSelectedFilter("crypto")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === "crypto" 
                    ? "bg-amber-500 text-slate-950" 
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-500/50"
                }`}
              >
                Crypto Exclusive
              </button>
              <button 
                onClick={() => setSelectedFilter("high-roller")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === "high-roller" 
                    ? "bg-amber-500 text-slate-950" 
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-500/50"
                }`}
              >
                High Roller
              </button>
              <button 
                onClick={() => setSelectedFilter("cashback")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === "cashback" 
                    ? "bg-amber-500 text-slate-950" 
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-500/50"
                }`}
              >
                Cashback
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Filters Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 space-y-8">
              
              {/* Filter Group */}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <line x1="21" x2="14" y1="4" y2="4"></line>
                    <line x1="10" x2="3" y1="4" y2="4"></line>
                    <line x1="21" x2="12" y1="12" y2="12"></line>
                    <line x1="8" x2="3" y1="12" y2="12"></line>
                    <line x1="21" x2="16" y1="20" y2="20"></line>
                    <line x1="12" x2="3" y1="20" y2="20"></line>
                    <line x1="14" x2="14" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="10" y2="14"></line>
                    <line x1="16" x2="16" y1="18" y2="22"></line>
                  </svg>
                  Filter By
                </h3>
                
                {/* Wagering Slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-slate-300">Max Wagering</span>
                    <span className="text-xs font-mono text-amber-400">{wagering}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="70" 
                    value={wagering}
                    onChange={(e) => setWagering(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer range-slider"
                    style={{
                      backgroundImage: `linear-gradient(#fbbf24, #fbbf24)`,
                      backgroundSize: `${(wagering / 70) * 100}% 100%`,
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-slate-600 font-mono">
                    <span>0x</span>
                    <span>70x+</span>
                  </div>
                </div>

                {/* Bonus Amount */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-slate-300">Min Bonus Value</span>
                    <span className="text-xs font-mono text-amber-400">${bonusValue}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    value={bonusValue}
                    onChange={(e) => setBonusValue(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer range-slider"
                    style={{
                      backgroundImage: `linear-gradient(#fbbf24, #fbbf24)`,
                      backgroundSize: `${(bonusValue / 2000) * 100}% 100%`,
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-700 bg-slate-900 group-hover:border-amber-500/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={categories.welcome}
                        onChange={(e) => setCategories({ ...categories, welcome: e.target.checked })}
                        className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 text-amber-500 transition-opacity ${categories.welcome ? 'opacity-100' : 'opacity-0'}`}>
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Welcome Bonus</span>
                    <span className="ml-auto text-xs text-slate-600">124</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-700 bg-slate-900 group-hover:border-amber-500/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={categories.reload}
                        onChange={(e) => setCategories({ ...categories, reload: e.target.checked })}
                        className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 text-amber-500 transition-opacity ${categories.reload ? 'opacity-100' : 'opacity-0'}`}>
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Reload Bonus</span>
                    <span className="ml-auto text-xs text-slate-600">42</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-700 bg-slate-900 group-hover:border-amber-500/50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={categories.cashback}
                        onChange={(e) => setCategories({ ...categories, cashback: e.target.checked })}
                        className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 text-amber-500 transition-opacity ${categories.cashback ? 'opacity-100' : 'opacity-0'}`}>
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Cashback</span>
                    <span className="ml-auto text-xs text-slate-600">18</span>
                  </label>
                </div>
              </div>

              {/* Ad Unit */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-white/5 text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                    <path d="M6 3h12l4 6-10 13L2 9Z"></path>
                    <path d="M11 3 8 9l4 13 4-13-3-6"></path>
                    <path d="M2 9h20"></path>
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">VIP Club</h4>
                <p className="text-xs text-indigo-200 mb-4">Join our exclusive telegram channel for bonuses.</p>
                <button className="w-full py-2 bg-white text-indigo-950 font-bold text-xs rounded-lg hover:bg-indigo-50 transition-colors">
                  Join Now
                </button>
              </div>

            </aside>

            {/* Bonus Listings */}
            <main className="col-span-1 lg:col-span-3 space-y-4">
              
              {/* Card 1: Featured */}
              <div className="group relative rounded-2xl bg-slate-900/60 border border-white/5 overflow-hidden hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.1)] hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-3">
                  <div className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 fill-slate-950">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Exclusive
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row p-6 gap-6">
                  {/* Casino Logo Area */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3 md:w-32">
                    <div className="w-20 h-20 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-white/5 shadow-inner">
                      <span className="font-bold text-xl text-white italic">Roobet</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">9.8</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="mb-1">
                      <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">New Arrival</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      100% Up To <span className="text-amber-400">$2,500</span> + 50 Free Spins
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Wagering</span>
                        <span className="text-sm font-medium text-slate-300">35x (B+D)</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Min Dep</span>
                        <span className="text-sm font-medium text-slate-300">$20</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Code</span>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-white group/code" onClick={() => handleCopyCode("PRIME20")}>
                          <span className="text-sm font-mono text-slate-300 border-b border-dashed border-slate-600">PRIME20</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy w-3 h-3 opacity-0 group-hover/code:opacity-100 transition-opacity">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                          <line x1="6" x2="10" y1="11" y2="11"></line>
                          <line x1="8" x2="8" y1="9" y2="13"></line>
                          <line x1="15" x2="15.01" y1="13" y2="13"></line>
                          <line x1="18" x2="18.01" y1="11" y2="11"></line>
                          <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                        </svg>
                        Pragmatic Play
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        Instant Payouts
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0 flex flex-col justify-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button className="w-full md:w-32 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg shadow-lg shadow-amber-500/20 transition-all text-sm">
                      Claim Bonus
                    </button>
                    <Link href="#" className="text-center text-xs text-slate-400 hover:text-white transition-colors">Read Review</Link>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-2xl bg-slate-900/60 border border-white/5 overflow-hidden hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.1)] hover:border-amber-500/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row p-6 gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3 md:w-32">
                    <div className="w-20 h-20 rounded-xl bg-purple-900/20 flex items-center justify-center border border-white/5 shadow-inner">
                      <span className="font-bold text-xl text-purple-400">Stake</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-500/80">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3 opacity-30">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">9.5</span>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    <div className="mb-1">
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-white/10">Cashback</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Daily Rakeback + $25 Free
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Wagering</span>
                        <span className="text-sm font-medium text-slate-300">None</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Min Dep</span>
                        <span className="text-sm font-medium text-slate-300">$10</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Code</span>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-white group/code" onClick={() => handleCopyCode("STAKEUS")}>
                          <span className="text-sm font-mono text-slate-300 border-b border-dashed border-slate-600">STAKEUS</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.279 5.308m5.908 1.042-.347 1.97M7.589 20.25l.347-1.97m0-13.1.347-1.97M1 10.25l1.97.348m20.06 3.522l-1.97-.348"></path>
                        </svg>
                        Crypto Only
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col justify-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button className="w-full md:w-32 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 font-bold py-3 px-4 rounded-lg transition-all text-sm">
                      Claim Bonus
                    </button>
                    <Link href="#" className="text-center text-xs text-slate-400 hover:text-white transition-colors">Read Review</Link>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-2xl bg-slate-900/60 border border-white/5 overflow-hidden hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.1)] hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-3">
                  <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                    Hot Pick
                  </div>
                </div>
                <div className="flex flex-col md:flex-row p-6 gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3 md:w-32">
                    <div className="w-20 h-20 rounded-xl bg-blue-900/20 flex items-center justify-center border border-white/5 shadow-inner">
                      <span className="font-bold text-xl text-blue-400">BC.Game</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
              ))}
            </div>
                      <span className="text-xs text-slate-400 font-semibold">9.9</span>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    <div className="mb-1">
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-white/10">Deposit Match</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      300% Bonus up to $20,000
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Wagering</span>
                        <span className="text-sm font-medium text-slate-300">40x</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Min Dep</span>
                        <span className="text-sm font-medium text-slate-300">$30</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Code</span>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-white group/code" onClick={() => handleCopyCode("AUTO")}>
                          <span className="text-sm font-mono text-slate-300 border-b border-dashed border-slate-600">AUTO</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col justify-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button className="w-full md:w-32 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 font-bold py-3 px-4 rounded-lg transition-all text-sm">
                      Claim Bonus
                    </button>
                    <Link href="#" className="text-center text-xs text-slate-400 hover:text-white transition-colors">Read Review</Link>
                  </div>
                </div>
              </div>

              {/* Load More */}
              <div className="pt-8 text-center">
                <button 
                  onClick={() => {
                    setLoading(true);
                    // Simulate loading
                    setTimeout(() => setLoading(false), 1000);
                  }}
                  disabled={loading}
                  className="px-8 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm font-medium text-white hover:bg-slate-800 hover:border-white/20 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 animate-spin">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Load More Bonuses"
                  )}
                </button>
              </div>

              {/* SEO Content */}
              <div className="pt-12 mt-12 border-t border-white/5 prose prose-invert prose-slate max-w-none">
                <h3 className="text-lg font-semibold text-white">How to find the best new casino bonuses?</h3>
                <p className="text-sm text-slate-400">
                  Our team updates this list daily. When looking for a new bonus, always check the <strong>wagering requirements</strong> and <strong>expiration dates</strong>. We prioritize casinos that offer transparent terms and fast payouts. &quot;Exclusive&quot; tags indicate offers you won&apos;t find on other sites.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
