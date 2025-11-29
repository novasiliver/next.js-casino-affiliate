import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getGames() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/games`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.games || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export default async function GamesPage() {
  const games = await getGames();

  const categories = ['Slots', 'Live Dealer', 'Jackpots', 'Table Games'];
  const providers = ['NetEnt', 'Evolution', 'Pragmatic Play', 'Play\'n Go', 'Microgaming'];

  return (
    <>
      <Navbar currentPage="games" />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Casino Games</h1>
            <p className="text-slate-400 text-lg">Explore thousands of premium casino games from top providers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game: any) => (
              <div
                key={game.id}
                className="bg-slate-900 border border-white/5 rounded-xl p-6 hover:border-amber-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{game.name}</h3>
                    <p className="text-sm text-slate-400">{game.provider}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-400 border border-white/5">
                    {game.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">RTP</span>
                  <span className="text-emerald-400 font-semibold">{game.rtp}</span>
                </div>
              </div>
            ))}
          </div>

          {games.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400">Game listings coming soon.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

