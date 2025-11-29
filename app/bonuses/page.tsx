import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasinoCard from "@/components/CasinoCard";

async function getBonuses() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bonuses`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.bonuses || [];
  } catch (error) {
    console.error('Error fetching bonuses:', error);
    return [];
  }
}

export default async function BonusesPage() {
  const bonuses = await getBonuses();

  return (
    <>
      <Navbar currentPage="bonuses" />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Casino Bonuses</h1>
            <p className="text-slate-400 text-lg">Find the best welcome bonuses and promotions from top-rated casinos.</p>
          </div>

          {bonuses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400">No bonuses available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bonuses.map((bonus: any) => (
                <Link
                  key={bonus.casinoId}
                  href={`/review/${bonus.casinoSlug}`}
                  className="group bg-slate-900 border border-white/5 rounded-xl p-6 hover:border-amber-500/50 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                      {bonus.casinoLogo}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{bonus.casinoName}</h3>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-amber-500 fill-amber-500">
                          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                        </svg>
                        <span className="text-sm text-slate-400">{bonus.casinoRating}/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Welcome Bonus</p>
                    <p className="text-2xl font-bold text-emerald-400 mb-2">{bonus.bonus?.amount || 'N/A'}</p>
                    {bonus.bonus?.details && (
                      <p className="text-xs text-slate-500">{bonus.bonus.details}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

