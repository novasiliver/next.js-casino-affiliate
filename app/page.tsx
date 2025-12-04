import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasinoListWithFilters from "@/components/CasinoListWithFilters";
import FAQ from "@/components/FAQ";

export const dynamic = 'force-dynamic';

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

async function getLatestArticles() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles?limit=3`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function Home() {
  const casinosData = await getCasinos();
  const articlesData = await getLatestArticles();
  
  // Transform API data to match CasinoCard props
  // Include full data object for filtering
  const casinos = casinosData.map((casino: any, index: number) => ({
    rank: casino.rank || index + 1,
    name: casino.name,
    logo: casino.logo,
    rating: casino.rating,
    bonus: casino.data?.bonus?.amount || 'N/A',
    bonusDetails: casino.data?.bonus?.details,
    tags: casino.data?.tags || [],
    isFeatured: index === 0,
    slug: casino.slug,
    description: casino.data?.description,
    data: casino.data, // Include full data for filtering
    affiliateLink: casino.data?.affiliateLink, // Include affiliate link if available
  }));

  // Get featured casino for hero section
  const featuredCasino = casinos.length > 0 ? casinos[0] : {
    name: "Ignite",
    slug: "ignite-casino",
    logo: "IGN",
    bonus: "$5,000",
    affiliateLink: null,
  };

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
    data: {
      tags: ["Instant Payout", "Curacao Lic."],
      payoutSpeed: "Instant",
      cryptoFriendly: true,
      gameSelection: { liveTables: 50 },
    },
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
    data: {
      tags: ["VIP", "High Roller"],
      payoutSpeed: "Fast",
      gameSelection: { liveTables: 30 },
    },
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
    data: {
      tags: ["Crypto", "Bitcoin", "Cryptocurrency"],
      cryptoFriendly: true,
      gameSelection: { liveTables: 25 },
    },
  },
  {
    rank: 4,
    name: "Velocity Bet",
    logo: "VELO",
    rating: 4.6,
    bonus: "$1,500 Bonus",
    slug: "velocity-bet",
    data: {
      tags: ["Fast Payout"],
      payoutSpeed: "Under 24h",
      gameSelection: { liveTables: 20 },
    },
  },
  {
    rank: 5,
    name: "Aura Casino",
    logo: "AURA",
    rating: 4.5,
    bonus: "100% Match",
    slug: "aura-casino",
    data: {
      tags: ["Live Casino"],
      gameSelection: { liveTables: 40 },
    },
  },
  {
    rank: 6,
    name: "Luna Spins",
    logo: "LUNA",
    rating: 4.4,
    bonus: "200 Free Spins",
    slug: "luna-spins",
    data: {
      tags: ["Slots"],
      gameSelection: { liveTables: 15 },
    },
  },
  {
    rank: 7,
    name: "Nova Gaming",
    logo: "NOVA",
    rating: 4.3,
    bonus: "$500 Cash",
    slug: "nova-gaming",
    data: {
      tags: ["Instant Withdrawal"],
      payoutSpeed: "Instant",
      gameSelection: { liveTables: 10 },
    },
  },
  {
    rank: 8,
    name: "Zen Casino",
    logo: "ZEN",
    rating: 4.2,
    bonus: "50% Back",
    slug: "zen-casino",
    data: {
      tags: ["Live Dealer"],
      gameSelection: { liveTables: 35 },
    },
  },
  {
    rank: 9,
    name: "Solarium",
    logo: "SOL",
    rating: 4.1,
    bonus: "1 BTC Bonus",
    slug: "solarium",
    data: {
      tags: ["Crypto Friendly", "Bitcoin"],
      cryptoFriendly: true,
      gameSelection: { liveTables: 18 },
    },
  },
  {
    rank: 10,
    name: "BetMax",
    logo: "MAX",
    rating: 4.0,
    bonus: "$100 No Dep",
    slug: "betmax",
    data: {
      tags: ["Quick Withdrawal"],
      payoutSpeed: "Fast",
      gameSelection: { liveTables: 12 },
    },
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
            Verified & Trusted Reviews 2025
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-6 leading-[1.1]">
            Play with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">confidence.</span><br />
            Win with style.
          </h1>
          
          <p className="text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated selection of the world&apos;s most premium gaming destinations. 
            Exclusive bonuses, instant withdrawals, and bank-grade security vetted by experts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#top-list" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
            >
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

      <CasinoListWithFilters casinos={displayCasinos} />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-4">Why Choose Bonusory</h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Your trusted partner in finding the best online casinos. We do the research so you don&apos;t have to.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "shield-check",
                title: "Expert Reviews",
                description: "Every casino is thoroughly tested by our team of gaming experts with years of industry experience.",
                paths: [
                  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",
                  "m9 12 2 2 4-4"
                ]
              },
              {
                icon: "badge-check",
                title: "Verified Licenses",
                description: "We only feature casinos with valid licenses from reputable authorities like MGA, UKGC, and Curacao.",
                paths: [
                  "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
                  "m9 12 2 2 4-4"
                ]
              },
              {
                icon: "gift",
                title: "Exclusive Bonuses",
                description: "Access special offers and promotions available only through Bonusory, with better terms than standard deals.",
                paths: [
                  "M20 12v10H4V12",
                  "M2 7h20v5H2z",
                  "M12 22V7",
                  "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z",
                  "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
                ]
              },
              {
                icon: "headphones",
                title: "Fast Support",
                description: "Get quick answers to your questions. Our support team responds within hours, not days.",
                paths: [
                  "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
                ]
              },
            ].map((item, index) => (
              <div key={index} className="bg-slate-900/50 border border-white/5 rounded-xl p-6 hover:border-amber-500/20 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-amber-400">
                    {item.paths.map((path, idx) => (
                      <path key={idx} d={path}></path>
                    ))}
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
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
                <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight mb-4">
                  Claim 200% Bonus at <span className="text-amber-400">{featuredCasino.name}</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-md">
                  Register today through Bonusory and unlock an exclusive VIP welcome package not available anywhere else. Includes weekly cashback and dedicated support.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="zap" className="lucide lucide-zap w-5 h-5 text-amber-400 mb-2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                    <div className="text-lg font-bold text-white">15 Min</div>
                    <div className="text-xs text-slate-500">Avg. Payout Time</div>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shield" className="lucide lucide-shield w-5 h-5 text-amber-400 mb-2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                    <div className="text-lg font-bold text-white">Verified</div>
                    <div className="text-xs text-slate-500">License & Security</div>
                  </div>
                </div>

                {featuredCasino.affiliateLink ? (
                  <a 
                    href={featuredCasino.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl text-slate-950 font-bold text-sm overflow-hidden hover:shadow-lg hover:shadow-amber-500/25 transition-all inline-block"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Claim Bonus Now 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </a>
                ) : (
                  <Link 
                    href={`/review/${featuredCasino.slug}`}
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl text-slate-950 font-bold text-sm overflow-hidden hover:shadow-lg hover:shadow-amber-500/25 transition-all inline-block"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Claim Bonus Now 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                )}
              </div>
              
              <div className="hidden lg:block relative">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-2xl rotate-3 opacity-50"></div>
                  <div className="absolute inset-0 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-24 h-24 rounded-full bg-slate-800 mb-6 flex items-center justify-center border border-amber-500/20">
                      <span className="text-2xl font-bold text-white">IGN</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 tracking-tight">$5,000</div>
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
              <h3 className="text-base md:text-lg font-medium text-white mb-6">Trusted Software Providers</h3>
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
              <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">Latest Insights</h2>
              <p className="text-slate-400 text-sm">Expert strategies and industry news.</p>
            </div>
            <Link href="/guides" className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
              View all <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articlesData.length > 0 ? (
              articlesData.slice(0, 3).map((article: any) => {
                const formatDate = (dateString: string | null) => {
                  if (!dateString) return '';
                  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                };

                const getReadTime = (content: string) => {
                  if (!content) return '3 min read';
                  const words = content.split(/\s+/).length;
                  const minutes = Math.ceil(words / 200);
                  return `${minutes} min read`;
                };

                const getCategoryGradient = (category: string) => {
                  const gradients: Record<string, string> = {
                    'Strategy': 'from-purple-900/50 to-slate-900/50',
                    'Industry': 'from-emerald-900/40 to-slate-900/40',
                    'Industry News': 'from-emerald-900/40 to-slate-900/40',
                    'Guides': 'from-indigo-900/40 to-slate-900/40',
                    'Reviews': 'from-amber-900/40 to-slate-900/40',
                    'News': 'from-blue-900/40 to-slate-900/40',
                  };
                  return gradients[category] || 'from-slate-800/50 to-slate-900/50';
                };

                return (
                  <Link key={article.id} href={`/guides/${article.slug}`} className="group block">
                    <div className="aspect-video w-full rounded-xl bg-slate-900 mb-4 overflow-hidden border border-white/5 relative">
                      {article.imageUrl ? (
                        <div className="group-hover:scale-105 transition-transform duration-500 absolute inset-0">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(article.category)}`}></div>
                        </div>
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(article.category)} group-hover:scale-105 transition-transform duration-500`}></div>
                      )}
                      <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-md text-[10px] uppercase font-bold text-white tracking-wider border border-white/10">
                        {article.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span>{getReadTime(article.content)}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                );
              })
            ) : (
              // Fallback articles if no articles in database
              [
                { category: "Strategy", date: "Oct 12, 2025", readTime: "5 min read", title: "Mastering High Volatility Slots: A Comprehensive Guide", gradient: "from-purple-900/50 to-slate-900/50", image: "https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=2160&q=80", slug: "mastering-high-volatility-slots" },
                { category: "Industry", date: "Oct 10, 2025", readTime: "3 min read", title: "New Crypto Regulations: What It Means for Players", gradient: "from-emerald-900/40 to-slate-900/40", slug: "crypto-regulations" },
                { category: "Reviews", date: "Oct 08, 2025", readTime: "7 min read", title: "Top 5 Live Dealer Experiences for 2025", gradient: "from-amber-900/40 to-slate-900/40", slug: "top-live-dealer" },
              ].map((article, idx) => (
                <Link key={idx} href={`/guides/${article.slug}`} className="group block">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 mb-4 overflow-hidden border border-white/5 relative">
                    {article.image ? (
                      <div className="group-hover:scale-105 transition-transform duration-500 absolute inset-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover"
                        />
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
                  <h3 className="text-base md:text-lg font-medium text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </>
  );
}

