export default function FilterBar() {
  return (
    <div className="sticky top-16 z-40 bg-slate-950/90 backdrop-blur border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">October 2024 Rankings</h2>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          <button className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-medium border border-white/10 whitespace-nowrap hover:border-amber-500/50 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="flame" className="lucide lucide-flame w-3 h-3 text-amber-500"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path></svg> Trending
          </button>
          <button className="px-4 py-1.5 rounded-full bg-transparent text-slate-400 text-xs font-medium border border-transparent hover:bg-slate-900 hover:text-white whitespace-nowrap transition-colors">
            Fast Payouts
          </button>
          <button className="px-4 py-1.5 rounded-full bg-transparent text-slate-400 text-xs font-medium border border-transparent hover:bg-slate-900 hover:text-white whitespace-nowrap transition-colors">
            Crypto Only
          </button>
          <button className="px-4 py-1.5 rounded-full bg-transparent text-slate-400 text-xs font-medium border border-transparent hover:bg-slate-900 hover:text-white whitespace-nowrap transition-colors">
            Live Dealer
          </button>
        </div>
      </div>
    </div>
  );
}

