import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import CasinoCard from "@/components/CasinoCard";

async function getCasinos() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/casinos?limit=10`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.casinos || [];
  } catch (error) {
    console.error('Error fetching casinos:', error);
    return [];
  }
}

export default async function Home() {
  const casinosData = await getCasinos();
  
  // Transform API data to match CasinoCard props
  const casinos = casinosData.map((casino: any, index: number) => ({
    rank: index + 1,
    name: casino.name,
    logo: casino.logo,
    rating: casino.rating,
    bonus: casino.data?.bonus?.amount || 'N/A',
    bonusDetails: casino.data?.bonus?.details,
    tags: casino.data?.tags || [],
    isFeatured: index === 0,
    slug: casino.slug,
    description: casino.data?.description,
  }));

  // Fallback data if API fails
  const fallbackCasinos = [
  {
    rank: 1,
    name: "Ignite Casino",
    logo: "IGNITE",
    rating: 5.0,
    bonus: "$5,000 + 100 FS",
    bonusDetails: "35x Wagering • Min dep $20",
    tags: ["Instant Payout", "Curacao Lic."],
    isFeatured: true,
    slug: "ignite-casino",
  },
  {
    rank: 2,
    name: "Royal Fort",
    logo: "ROYAL",
    rating: 4.8,
    bonus: "300% up to $3k",
    bonusDetails: "Includes 50 Free Spins",
    slug: "royal-fort",
    description: "Best for high rollers & VIPs",
  },
  {
    rank: 3,
    name: "Onyx Club",
    logo: "ONYX",
    rating: 4.7,
    bonus: "5 BTC Bonus",
    bonusDetails: "Unlimited Withdrawals",
    slug: "onyx-club",
    description: "Excellent Crypto Support",
  },
  {
    rank: 4,
    name: "Velocity Bet",
    logo: "VELO",
    rating: 4.6,
    bonus: "$1,500 Bonus",
    slug: "velocity-bet",
  },
  {
    rank: 5,
    name: "Aura Casino",
    logo: "AURA",
    rating: 4.5,
    bonus: "100% Match",
    slug: "aura-casino",
  },
  {
    rank: 6,
    name: "Luna Spins",
    logo: "LUNA",
    rating: 4.4,
    bonus: "200 Free Spins",
    slug: "luna-spins",
  },
  {
    rank: 7,
    name: "Nova Gaming",
    logo: "NOVA",
    rating: 4.3,
    bonus: "$500 Cash",
    slug: "nova-gaming",
  },
  {
    rank: 8,
    name: "Zen Casino",
    logo: "ZEN",
    rating: 4.2,
    bonus: "50% Back",
    slug: "zen-casino",
  },
  {
    rank: 9,
    name: "Solarium",
    logo: "SOL",
    rating: 4.1,
    bonus: "1 BTC Bonus",
    slug: "solarium",
  },
  {
    rank: 10,
    name: "BetMax",
    logo: "MAX",
    rating: 4.0,
    bonus: "$100 No Dep",
    slug: "betmax",
  },
];

  // Use fallback if no casinos from API
  const displayCasinos = casinos.length > 0 ? casinos : fallbackCasinos;

  return (
    <>
      <Navbar currentPage="home" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-amber-500/20 text-amber-400 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Verified & Trusted Reviews 2024
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-6 leading-[1.1]">
            Play with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">confidence.</span><br />
            Win with style.
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Curated selection of the world&apos;s most premium gaming destinations. 
            Exclusive bonuses, instant withdrawals, and bank-grade security vetted by experts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#top-list" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
              Explore Top 10
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-down" className="lucide lucide-arrow-down w-4 h-4"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
            </Link>
            <Link href="/safety-guide" className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shield-check" className="lucide lucide-shield-check w-4 h-4 text-emerald-400"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
              Safety Guide
            </Link>
          </div>
        </div>
      </section>

      <FilterBar />

      {/* Main Content: Casino Grid */}
      <section id="top-list" className="py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {displayCasinos.length > 0 ? (
            <>
              {displayCasinos.slice(0, 10).map((casino: any) => (
                <CasinoCard key={casino.rank} {...casino} />
              ))}

            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400">No casinos available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Browse Categories Section */}
      <section className="py-16 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "dice-5", name: "Slots", slug: "slots" },
              { icon: "users", name: "Live Dealer", slug: "live-dealer" },
              { icon: "bitcoin", name: "Crypto", slug: "crypto" },
              { icon: "rocket", name: "Crash Games", slug: "crash-games" },
              { icon: "trophy", name: "Sportsbook", slug: "sportsbook" },
              { icon: "clover", name: "Poker", slug: "poker" },
            ].map((category) => (
              <Link key={category.name} href={`/category/${category.slug}`} className="group bg-slate-900 border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center hover:border-amber-500/50 hover:bg-slate-800 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-500 flex items-center justify-center mb-3 transition-colors border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide={category.icon} className={`lucide lucide-${category.icon} w-6 h-6`}>
                    {category.icon === "dice-5" && (
                      <>
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <path d="M16 8h.01"></path>
                        <path d="M8 8h.01"></path>
                        <path d="M8 16h.01"></path>
                        <path d="M16 16h.01"></path>
                        <path d="M12 12h.01"></path>
                      </>
                    )}
                    {category.icon === "users" && (
                      <>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </>
                    )}
                    {category.icon === "bitcoin" && (
                      <>
                        <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-7.943C16.96 9.475 15.655 3.328 10.687 4.195"></path>
                        <path d="M6 19.5v-15"></path>
                        <path d="M9.5 4V2.5"></path>
                        <path d="M10 21.5v-1.8"></path>
                        <path d="M6 15h4.81"></path>
                        <path d="M6 9h4"></path>
                      </>
                    )}
                    {category.icon === "rocket" && (
                      <>
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.38 2.38-1 4z"></path>
                        <path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4s-2.38-.38-4 1z"></path>
                      </>
                    )}
                    {category.icon === "trophy" && (
                      <>
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17"></path>
                        <path d="M14 14.66V17"></path>
                        <path d="M18 2h-6c-1.78 0-3 1.6-3 3.83V6.2c0 1.9 1.3 3.4 3 3.4h6c1.7 0 3-1.5 3-3.4V5.8c0-2.2-1.2-3.8-3-3.8Z"></path>
                      </>
                    )}
                    {category.icon === "clover" && (
                      <>
                        <path d="M16.17 7.83 2 22"></path>
                        <path d="M4.02 12a2.828 2.828 0 1 1 4-4 2.828 2.828 0 0 1-4 4Z"></path>
                        <path d="M10.85 4.02a2.828 2.828 0 1 1 4 4 2.828 2.828 0 0 1-4-4Z"></path>
                        <path d="M19.98 12a2.828 2.828 0 1 1-4 4 2.828 2.828 0 0 1 4-4Z"></path>
                        <path d="M13.15 19.98a2.828 2.828 0 1 1-4-4 2.828 2.828 0 0 1 4 4Z"></path>
                      </>
                    )}
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bonus Section */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-slate-900/80 to-slate-900/95 z-0"></div>
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 items-center relative z-10">
              <div>
                <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-bold tracking-wider mb-4 border border-amber-500/20">
                  EXCLUSIVE OFFER
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                  Claim 200% Bonus at <span className="text-amber-400">Ignite</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-md">
                  Register today through PrimeBet and unlock an exclusive VIP welcome package not available anywhere else. Includes weekly cashback and dedicated support.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="zap" className="lucide lucide-zap w-5 h-5 text-amber-400 mb-2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                    <div className="text-xl font-bold text-white">15 Min</div>
                    <div className="text-xs text-slate-500">Avg. Payout Time</div>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shield" className="lucide lucide-shield w-5 h-5 text-amber-400 mb-2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                    <div className="text-xl font-bold text-white">Verified</div>
                    <div className="text-xs text-slate-500">License & Security</div>
                  </div>
                </div>

                <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl text-slate-950 font-bold text-sm overflow-hidden hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                  <span className="relative z-10 flex items-center gap-2">
                    Claim Bonus Now 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
              
              <div className="hidden lg:block relative">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-2xl rotate-3 opacity-50"></div>
                  <div className="absolute inset-0 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-24 h-24 rounded-full bg-slate-800 mb-6 flex items-center justify-center border border-amber-500/20">
                      <span className="text-3xl font-bold text-white">IGN</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 tracking-tight">$5,000</div>
                    <div className="text-sm text-slate-400 mb-6 uppercase tracking-widest">Welcome Package</div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
                      <div className="w-3/4 h-full bg-amber-500"></div>
                    </div>
                    <div className="flex justify-between w-full text-xs text-slate-500">
                      <span>Bonus Left</span>
                      <span>75% Claimed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Providers & How We Rate */}
      <section className="py-20 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* How We Rate */}
            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight mb-6">How We Rate Casinos</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Our review process is rigorous and data-driven. We don&apos;t just look at the bonuses; we test the withdrawal speeds, verify licenses, and ensure the RNG is audited.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "lock", title: "Security & Trust", desc: "SSL encryption and valid gaming licenses are non-negotiable." },
                  { icon: "gamepad-2", title: "Game Variety", desc: "Libraries must exceed 1,000+ games from top providers." },
                  { icon: "wallet", title: "Fast Payouts", desc: "We prioritize casinos that process withdrawals under 24 hours." },
                  { icon: "headphones", title: "24/7 Support", desc: "Live chat availability and helpfulness are tested anonymously." },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-2">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-amber-500 border border-white/5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide={item.icon} className={`lucide lucide-${item.icon} w-4 h-4`}>
                        {item.icon === "lock" && (
                          <>
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </>
                        )}
                        {item.icon === "gamepad-2" && (
                          <>
                            <line x1="6" x2="10" y1="12" y2="12"></line>
                            <line x1="8" x2="8" y1="10" y2="14"></line>
                            <line x1="15" x2="15.01" y1="13" y2="13"></line>
                            <line x1="18" x2="18.01" y1="11" y2="11"></line>
                            <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                          </>
                        )}
                        {item.icon === "wallet" && (
                          <>
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                          </>
                        )}
                        {item.icon === "headphones" && (
                          <>
                            <path d="M3 14v3a2 2 0 0 0 2 2h2v-5H3z"></path>
                            <path d="M17 14v5h2a2 2 0 0 0 2-2v-3h-4z"></path>
                            <path d="M5.1 8.5A8.9 8.9 0 0 1 20 8.5v5.5"></path>
                          </>
                        )}
                      </svg>
                    </div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Providers */}
            <div className="bg-slate-900/50 rounded-2xl p-8 border border-white/5 flex flex-col justify-center">
              <h3 className="text-lg font-medium text-white mb-6">Trusted Software Providers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["NetEnt", "Evolution", "Pragmatic", "Play'n Go", "NoLimit", "Hacksaw"].map((provider) => (
                  <div key={provider} className="h-12 rounded bg-slate-900 border border-white/5 flex items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-widest hover:border-amber-500/30 hover:text-white transition-colors cursor-default">
                    {provider}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-slate-500">
                  We only list casinos that host games from certified, fair, and audited software developers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News / Guides Section */}
      <section className="py-20 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-2">Latest Insights</h2>
              <p className="text-slate-400 text-sm">Expert strategies and industry news.</p>
            </div>
            <Link href="/guides" className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
              View all <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
              { category: "Strategy", date: "Oct 12, 2024", readTime: "5 min read", title: "Mastering High Volatility Slots: A Comprehensive Guide", gradient: "from-purple-900/50 to-slate-900/50", image: "https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=2160&q=80", slug: "mastering-high-volatility-slots" },
              { category: "Industry", date: "Oct 10, 2024", readTime: "3 min read", title: "New Crypto Regulations: What It Means for Players", gradient: "from-emerald-900/40 to-slate-900/40", slug: "crypto-regulations" },
              { category: "Reviews", date: "Oct 08, 2024", readTime: "7 min read", title: "Top 5 Live Dealer Experiences for 2025", gradient: "from-amber-900/40 to-slate-900/40", slug: "top-live-dealer" },
            ].map((article, idx) => (
              <Link key={idx} href={`/guides/${article.slug}`} className="group block">
                <div className="aspect-video w-full rounded-xl bg-slate-900 mb-4 overflow-hidden border border-white/5 relative">
                  {article.image ? (
                    <div className="group-hover:scale-105 transition-transform duration-500 absolute inset-0">
                      <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
                      <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient}`}></div>
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} group-hover:scale-105 transition-transform duration-500`}></div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-md text-[10px] uppercase font-bold text-white tracking-wider border border-white/10">{article.category}</div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How do I know these casinos are safe?",
                answer: "We strictly review casinos that hold valid licenses from reputable authorities like the MGA, UKGC, or Curacao eGaming. We also verify their SSL encryption and third-party fair play audits (eCOGRA, iTechLabs)."
              },
              {
                question: "What is the best welcome bonus available?",
                answer: "Currently, Ignite Casino offers our top-rated exclusive bonus of 200% up to $5,000. However, the \"best\" bonus depends on your playstyle—wager-free spins might be better for casual players."
              },
              {
                question: "Are crypto withdrawals faster than bank transfers?",
                answer: "Yes, significantly. Crypto withdrawals via Bitcoin, Ethereum, or Litecoin are typically processed within minutes to an hour, whereas traditional bank transfers can take 3-5 business days."
              },
              {
                question: "Can I play on mobile devices?",
                answer: "Absolutely. All casinos listed on PrimeBet are fully optimized for mobile play on iOS and Android browsers. Many also offer dedicated apps for a smoother experience."
              },
            ].map((faq, idx) => (
              <details key={idx} className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-900 p-4 text-slate-300 border border-white/5 hover:bg-slate-800 transition-colors">
                  <span className="font-medium text-sm">{faq.question}</span>
                  <svg className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </summary>
                <div className="mt-2 px-4 leading-relaxed text-slate-400 text-sm">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

