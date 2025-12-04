"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasinoLogo from "@/components/CasinoLogo";

interface Bonus {
  id: string;
  title: string;
  slug: string;
  casinoId?: string;
  casinoSlug?: string;
  casinoName: string;
  casinoLogo: string;
  casinoRating: number;
  amount: string;
  type: string;
  wagering?: string;
  minDeposit?: string;
  code?: string;
  expiry?: string;
  isExclusive: boolean;
  isHotPick: boolean;
  provider?: string;
  features: string[];
  createdAt?: string;
}

export default function BonusesPage() {
  const [wagering, setWagering] = useState(70); // Default to max to show all
  const [bonusValue, setBonusValue] = useState(0); // Default to 0 to show all
  const [categories, setCategories] = useState({
    welcome: true,
    reload: true,
    cashback: true,
    'no-deposit': true,
    'free-spins': true,
    crypto: true,
    'high-roller': true,
  }); // Default all to true to show all
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortButtonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);

  useEffect(() => {
    fetchBonuses();
  }, []);

  const fetchBonuses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bonuses?active=true`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        console.error('Failed to fetch bonuses:', res.status, res.statusText);
        setBonuses([]);
        return;
      }
      const data = await res.json();
      console.log('Fetched bonuses:', data.bonuses?.length || 0, 'bonuses');
      setBonuses(data.bonuses || []);
    } catch (error) {
      console.error('Error fetching bonuses:', error);
      setBonuses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3 text-amber-500">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3 text-amber-500 opacity-50">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-3 h-3 text-slate-700">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }

    return stars;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'welcome': 'Welcome Bonus',
      'reload': 'Reload Bonus',
      'cashback': 'Cashback',
      'no-deposit': 'No Deposit',
      'free-spins': 'Free Spins',
      'crypto': 'Crypto',
      'high-roller': 'High Roller',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'welcome': 'text-green-400 bg-green-400/10 border-green-400/20',
      'reload': 'text-slate-400 bg-slate-800 border-white/10',
      'cashback': 'text-slate-400 bg-slate-800 border-white/10',
      'no-deposit': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      'free-spins': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      'crypto': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      'high-roller': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    };
    return colors[type] || 'text-slate-400 bg-slate-800 border-white/10';
  };

  // Extract numeric value from bonus amount string (e.g., "$2,500" -> 2500)
  const extractBonusValue = (amount: string): number => {
    const match = amount.match(/[\d,]+/);
    if (!match) return 0;
    return parseInt(match[0].replace(/,/g, ''), 10);
  };

  // Extract numeric value from wagering string (e.g., "35x" -> 35)
  const extractWageringValue = (wageringStr?: string): number => {
    if (!wageringStr) return 999; // If no wagering, treat as high (show all)
    const match = wageringStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 999;
  };

  // Filter and sort bonuses
  const filteredAndSortedBonuses = useMemo(() => {
    console.log('Filtering bonuses:', bonuses.length, 'total bonuses');
    const filtered = bonuses.filter((bonus) => {
      // Filter by category checkboxes - check if this bonus type is enabled
      if (!categories[bonus.type as keyof typeof categories]) {
        return false;
      }

      // Filter by wagering (max wagering) - only apply if slider is not at max (70)
      if (wagering < 70) {
        const bonusWagering = extractWageringValue(bonus.wagering);
        if (bonusWagering > wagering) {
          return false;
        }
      }

      // Filter by bonus value (min bonus value) - only apply if slider is not at 0
      if (bonusValue > 0) {
        const bonusAmount = extractBonusValue(bonus.amount);
        if (bonusAmount < bonusValue) {
          return false;
        }
      }

      return true;
    });
    
    console.log('After filtering:', filtered.length, 'bonuses');
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          // Sort by createdAt descending (newest first)
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate;
        case 'oldest':
          // Sort by createdAt ascending (oldest first)
          const aDateOld = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDateOld = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return aDateOld - bDateOld;
        case 'highest':
          // Sort by bonus amount descending
          return extractBonusValue(b.amount) - extractBonusValue(a.amount);
        case 'lowest':
          // Sort by bonus amount ascending
          return extractBonusValue(a.amount) - extractBonusValue(b.amount);
        default:
          return 0;
      }
    });
  }, [bonuses, categories, wagering, bonusValue, sortBy]);

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
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-amber-500 text-xs font-semibold tracking-wide uppercase">Live Updates</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-4">
              New Casino Bonuses
            </h1>
            <p className="text-base text-slate-400 max-w-2xl">
              Explore the latest welcome offers, exclusive no-deposit deals, and free spins added daily. We verify every bonus manually.
            </p>
          </div>
        </section>


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
                  {(() => {
                    const getTypeLabel = (type: string) => {
                      const labels: Record<string, string> = {
                        'welcome': 'Welcome Bonus',
                        'reload': 'Reload Bonus',
                        'cashback': 'Cashback',
                        'no-deposit': 'No Deposit',
                        'free-spins': 'Free Spins',
                        'crypto': 'Crypto',
                        'high-roller': 'High Roller',
                      };
                      return labels[type] || type;
                    };

                    const bonusTypes = ['welcome', 'reload', 'cashback', 'no-deposit', 'free-spins', 'crypto', 'high-roller'] as const;
                    
                    return (
                      <>
                        {bonusTypes.map((type) => {
                          const count = bonuses.filter(b => b.type === type).length;
                          const isChecked = categories[type];
                          
                          return (
                            <label key={type} className="flex items-center gap-3 group cursor-pointer">
                              <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-700 bg-slate-900 group-hover:border-amber-500/50 transition-colors">
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={(e) => setCategories({ ...categories, [type]: e.target.checked })}
                                  className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 text-amber-500 transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`}>
                                  <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                              </div>
                              <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{getTypeLabel(type)}</span>
                              <span className="ml-auto text-xs text-slate-600">{count}</span>
                            </label>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>
              </div>


            </aside>

            {/* Bonus Listings */}
            <main className="col-span-1 lg:col-span-3">
              
              {/* Sort Dropdown */}
              <div className="flex justify-end mb-4">
                <div className="relative" ref={sortButtonRef}>
                  <button 
                    onClick={() => {
                      if (sortButtonRef.current) {
                        const rect = sortButtonRef.current.getBoundingClientRect();
                        setSortDropdownOpen(!sortDropdownOpen);
                      } else {
                        setSortDropdownOpen(!sortDropdownOpen);
                      }
                    }}
                    className="flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-lg text-sm text-white hover:border-white/20 transition-all"
                  >
                    <span className="text-xs text-slate-500 mr-1">Sort by:</span>
                    <span>
                      {sortBy === 'newest' ? 'Newest Added' :
                       sortBy === 'oldest' ? 'Oldest Added' :
                       sortBy === 'highest' ? 'Highest Value' : 'Lowest Value'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 text-slate-400 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`}>
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                  
                  {sortDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-[55]" 
                        onClick={() => setSortDropdownOpen(false)}
                      ></div>
                      <div 
                        className="fixed z-[100] bg-slate-900 border border-white/10 rounded-lg shadow-xl overflow-hidden w-[160px]"
                        style={{
                          top: sortButtonRef.current ? `${sortButtonRef.current.getBoundingClientRect().bottom + 4}px` : 'auto',
                          right: sortButtonRef.current ? `${window.innerWidth - sortButtonRef.current.getBoundingClientRect().right}px` : 'auto',
                        }}
                      >
                        <button
                          onClick={() => {
                            setSortBy('newest');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === 'newest' 
                              ? 'bg-slate-800 text-white' 
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          Newest Added
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('oldest');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === 'oldest' 
                              ? 'bg-slate-800 text-white' 
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          Oldest Added
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('highest');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === 'highest' 
                              ? 'bg-slate-800 text-white' 
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          Highest Value
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('lowest');
                            setSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === 'lowest' 
                              ? 'bg-slate-800 text-white' 
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          Lowest Value
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-400 mt-4">Loading bonuses...</p>
                </div>
              ) : filteredAndSortedBonuses.length > 0 ? (
                filteredAndSortedBonuses.map((bonus) => (
                  <div key={bonus.id} className="group relative rounded-2xl bg-slate-900/60 border border-white/5 overflow-hidden hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.1)] hover:border-amber-500/30 transition-all duration-300">
                    {(bonus.isExclusive || bonus.isHotPick) && (
                      // <div className="absolute top-3 right-3 z-10 flex flex-row gap-2">
                        <div className="absolute top-40 right-3 md:top-3 md:right-3 z-10 flex flex-row gap-2">
                        {bonus.isExclusive && (
                          <div className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 fill-slate-950">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            Exclusive
                          </div>
                        )}
                        {bonus.isHotPick && (
                          <div className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide shadow-lg">
                            Hot Pick
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-col md:flex-row p-6 gap-16">
                      {/* Casino Logo Area */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3 md:w-32 md:pl-10">
                        <CasinoLogo logo={bonus.casinoLogo} name={bonus.casinoName} size="medium" />
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {renderStars(bonus.casinoRating)}
                          </div>
                          <span className="text-xs text-slate-400 font-semibold">{bonus.casinoRating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${getTypeColor(bonus.type)}`}>
                            {getTypeLabel(bonus.type)}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {bonus.title}
                        </h3>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Wagering</span>
                            <span className="text-sm font-medium text-slate-300">{bonus.wagering || 'N/A'}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Min Dep</span>
                            <span className="text-sm font-medium text-slate-300">{bonus.minDeposit || 'N/A'}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Code</span>
                            {bonus.code ? (
                              <div className="flex items-center gap-1 cursor-pointer hover:text-white group/code" onClick={() => handleCopyCode(bonus.code!)}>
                                <span className="text-sm font-mono text-slate-300 border-b border-dashed border-slate-600">{bonus.code}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy w-3 h-3 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                </svg>
                              </div>
                            ) : (
                              <span className="text-sm font-medium text-slate-500">N/A</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                          {bonus.provider && (
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                <line x1="6" x2="10" y1="11" y2="11"></line>
                                <line x1="8" x2="8" y1="9" y2="13"></line>
                                <line x1="15" x2="15.01" y1="13" y2="13"></line>
                                <line x1="18" x2="18.01" y1="11" y2="11"></line>
                                <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                              </svg>
                              {bonus.provider}
                            </div>
                          )}
                          {bonus.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex-shrink-0 flex flex-col justify-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                        {bonus.casinoSlug ? (
                          <Link 
                            href={`/review/${bonus.casinoSlug}`}
                            className="w-full md:w-32 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg shadow-lg shadow-amber-500/20 transition-all text-sm text-center"
                          >
                            Claim Bonus
                          </Link>
                        ) : (
                          <button 
                            disabled
                            className="w-full md:w-32 bg-slate-700 text-slate-400 font-bold py-3 px-4 rounded-lg transition-all text-sm cursor-not-allowed"
                          >
                            Claim Bonus
                          </button>
                        )}
                        {bonus.casinoSlug ? (
                          <Link href={`/review/${bonus.casinoSlug}`} className="text-center text-xs text-slate-400 hover:text-white transition-colors">
                            Read Review
                          </Link>
                        ) : (
                          <span className="text-center text-xs text-slate-500">No review available</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-400 mb-4">No bonuses found.</p>
                  <p className="text-sm text-slate-500">Try adjusting your filters or check back later.</p>
                </div>
              )}

                {/* SEO Content */}
                <div className="pt-12 mt-12 border-t border-white/5 prose prose-invert prose-slate max-w-none">
                  <h3 className="text-lg font-semibold text-white">How to find the best new casino bonuses?</h3>
                  <p className="text-sm text-slate-400">
                    Our team updates this list daily. When looking for a new bonus, always check the <strong>wagering requirements</strong> and <strong>expiration dates</strong>. We prioritize casinos that offer transparent terms and fast payouts. &quot;Exclusive&quot; tags indicate offers you won&apos;t find on other sites.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
