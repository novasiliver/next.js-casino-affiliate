"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasinoCard from "@/components/CasinoCard";
import Link from "next/link";

interface Casino {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  rank: number;
  data: {
    bonus?: {
      amount?: string;
      details?: string;
    };
    tags?: string[];
    affiliateLink?: string;
    payoutSpeed?: string;
    license?: string;
    description?: string;
  };
}

export default function CasinosPage() {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    fetchCasinos();
  }, []);

  const fetchCasinos = async () => {
    try {
      const res = await fetch('/api/casinos', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setCasinos(data.casinos || []);
      }
    } catch (error) {
      console.error('Error fetching casinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleGameType = (gameType: string) => {
    setSelectedGameTypes((prev) =>
      prev.includes(gameType)
        ? prev.filter((g) => g !== gameType)
        : [...prev, gameType]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredCasinos = casinos.filter((casino) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        casino.name.toLowerCase().includes(query) ||
        casino.data?.tags?.some((tag) => tag.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategories.length > 0) {
      const hasCategory = selectedCategories.some((category) => {
        if (category === 'crypto') {
          return casino.data?.tags?.some((tag) =>
            tag.toLowerCase().includes('crypto') || 
            tag.toLowerCase().includes('bitcoin')
          );
        }
        if (category === 'new') {
          return casino.data?.tags?.some((tag) =>
            tag.toLowerCase().includes('new')
          );
        }
        return false;
      });
      if (!hasCategory) return false;
    }

    // Game Type filter
    if (selectedGameTypes.length > 0) {
      const hasGameType = selectedGameTypes.some((gameType) => {
        const tags = casino.data?.tags || [];
        const tagsLower = tags.map(t => t.toLowerCase());
        
        switch(gameType) {
          case 'slots':
            return tagsLower.some(tag => tag.includes('slot'));
          case 'live-dealer':
            return tagsLower.some(tag => tag.includes('live') || tag.includes('dealer'));
          case 'crypto':
            return tagsLower.some(tag => tag.includes('crypto') || tag.includes('bitcoin'));
          case 'crash':
            return tagsLower.some(tag => tag.includes('crash'));
          case 'sports':
            return tagsLower.some(tag => tag.includes('sport'));
          case 'poker':
            return tagsLower.some(tag => tag.includes('poker'));
          default:
            return false;
        }
      });
      if (!hasGameType) return false;
    }

    // Feature filter
    if (selectedFeatures.length > 0) {
      const hasFeature = selectedFeatures.every((feature) => {
        if (feature === 'instant') {
          return (
            casino.data?.payoutSpeed?.toLowerCase().includes('instant') ||
            casino.data?.tags?.some((tag) =>
              tag.toLowerCase().includes('instant')
            )
          );
        }
        if (feature === 'nokyc') {
          return casino.data?.tags?.some((tag) =>
            tag.toLowerCase().includes('kyc') ||
            tag.toLowerCase().includes('no kyc')
          );
        }
        if (feature === 'vpn') {
          return casino.data?.tags?.some((tag) =>
            tag.toLowerCase().includes('vpn')
          );
        }
        return false;
      });
      if (!hasFeature) return false;
    }

    return true;
  });

  // Count casinos by category
  const cryptoCount = casinos.filter((c) =>
    c.data?.tags?.some((tag) =>
      tag.toLowerCase().includes('crypto') || tag.toLowerCase().includes('bitcoin')
    )
  ).length;

  const newCount = casinos.filter((c) =>
    c.data?.tags?.some((tag) => tag.toLowerCase().includes('new'))
  ).length;

  return (
    <>
      <Navbar currentPage="casinos" />
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-12 overflow-hidden bg-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[30%] w-[800px] h-[400px] bg-amber-900/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-[20%] right-[20%] w-[500px] h-[300px] bg-emerald-900/20 rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Updated for December 2025
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Top Rated Online Casinos
          </h1>
          <p className="text-base text-slate-400 font-light max-w-2xl mx-auto">
            We&apos;ve reviewed {casinos.length}+ platforms to bring you the safest, fastest paying, and most rewarding casinos. Verified by experts.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 bg-slate-950">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search casinos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
              />
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
                className="absolute left-3.5 top-3 text-slate-500"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('crypto')}
                    onChange={() => toggleCategory('crypto')}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded border ${selectedCategories.includes('crypto') ? 'bg-amber-500 border-amber-500' : 'border-slate-600 bg-slate-900/50'} flex items-center justify-center transition-all group-hover:border-amber-500/50`}>
                    {selectedCategories.includes('crypto') && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Crypto Friendly</span>
                  <span className="ml-auto text-xs text-slate-600">{cryptoCount}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('new')}
                    onChange={() => toggleCategory('new')}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded border ${selectedCategories.includes('new') ? 'bg-amber-500 border-amber-500' : 'border-slate-600 bg-slate-900/50'} flex items-center justify-center transition-all group-hover:border-amber-500/50`}>
                    {selectedCategories.includes('new') && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">New (2025)</span>
                  <span className="ml-auto text-xs text-slate-600">{newCount}</span>
                </label>
              </div>
            </div>

            {/* Game Types */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Game Types</h3>
              <div className="space-y-2">
                {[
                  { id: 'slots', label: 'Slots' },
                  { id: 'live-dealer', label: 'Live Dealer' },
                  { id: 'crypto', label: 'Crypto Games' },
                  { id: 'crash', label: 'Crash Games' },
                  { id: 'sports', label: 'Sportsbook' },
                  { id: 'poker', label: 'Poker' },
                ].map((gameType) => (
                  <label key={gameType.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedGameTypes.includes(gameType.id)}
                      onChange={() => toggleGameType(gameType.id)}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 rounded border ${selectedGameTypes.includes(gameType.id) ? 'bg-amber-500 border-amber-500' : 'border-slate-600 bg-slate-900/50'} flex items-center justify-center transition-all group-hover:border-amber-500/50`}>
                      {selectedGameTypes.includes(gameType.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{gameType.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Features</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes('instant')}
                    onChange={() => toggleFeature('instant')}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded border ${selectedFeatures.includes('instant') ? 'bg-amber-500 border-amber-500' : 'border-slate-600 bg-slate-900/50'} flex items-center justify-center transition-all group-hover:border-amber-500/50`}>
                    {selectedFeatures.includes('instant') && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Instant Payouts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes('nokyc')}
                    onChange={() => toggleFeature('nokyc')}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded border ${selectedFeatures.includes('nokyc') ? 'bg-amber-500 border-amber-500' : 'border-slate-600 bg-slate-900/50'} flex items-center justify-center transition-all group-hover:border-amber-500/50`}>
                    {selectedFeatures.includes('nokyc') && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">No KYC</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes('vpn')}
                    onChange={() => toggleFeature('vpn')}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded border ${selectedFeatures.includes('vpn') ? 'bg-amber-500 border-amber-500' : 'border-slate-600 bg-slate-900/50'} flex items-center justify-center transition-all group-hover:border-amber-500/50`}>
                    {selectedFeatures.includes('vpn') && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-950">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">VPN Friendly</span>
                </label>
              </div>
            </div>

            {/* Featured Widget */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-amber-900/20 to-slate-900/50 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                </svg>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Editor&apos;s Pick</span>
              </div>
              <div className="font-medium text-white mb-1">Looking for exclusive bonuses?</div>
              <p className="text-xs text-slate-400 mb-3">Check out our bonuses page for the latest exclusive offers and promotions.</p>
              <Link href="/bonuses" className="block w-full py-2 text-center text-xs font-semibold rounded bg-amber-600 hover:bg-amber-500 text-white transition-colors">
                View Bonuses
              </Link>
            </div>
          </aside>

          {/* Casino List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-sm text-slate-400">
                Showing <span className="text-white font-medium">{filteredCasinos.length}</span> Casino{filteredCasinos.length !== 1 ? 's' : ''}
              </span>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 mt-4">Loading casinos...</p>
              </div>
            ) : filteredCasinos.length > 0 ? (
              filteredCasinos.map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  rank={casino.rank}
                  name={casino.name}
                  logo={casino.logo}
                  rating={casino.rating}
                  bonus={casino.data?.bonus?.amount || 'Welcome Bonus'}
                  bonusDetails={casino.data?.bonus?.details}
                  tags={casino.data?.tags || []}
                  isFeatured={index === 0}
                  slug={casino.slug}
                  description={casino.data?.description}
                  affiliateLink={casino.data?.affiliateLink}
                />
              ))
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Casinos Found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

