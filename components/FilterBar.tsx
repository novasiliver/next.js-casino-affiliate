"use client";

type FilterType = 'trending' | 'fast-payouts' | 'crypto-only' | 'live-dealer';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters = [
    { id: 'trending' as FilterType, label: 'Trending', icon: 'flame' },
    { id: 'fast-payouts' as FilterType, label: 'Fast Payouts', icon: 'zap' },
    { id: 'crypto-only' as FilterType, label: 'Crypto Only', icon: 'bitcoin' },
    { id: 'live-dealer' as FilterType, label: 'Live Dealer', icon: 'users' },
  ];

  return (
    <div className="sticky top-16 z-40 bg-slate-950/90 backdrop-blur border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">October 2025 Rankings</h2>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-800 text-white border-white/10'
                    : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-900 hover:text-white'
                }`}
              >
                {filter.icon === 'flame' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame w-3 h-3 text-amber-500">
                    <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path>
                  </svg>
                )}
                {filter.icon === 'zap' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-3 h-3 text-amber-500">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                )}
                {filter.icon === 'bitcoin' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bitcoin w-3 h-3 text-amber-500">
                    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-7.943C16.96 9.475 15.655 3.328 10.687 4.195"></path>
                    <path d="M6 19.5v-15"></path>
                    <path d="M9.5 4V2.5"></path>
                    <path d="M10 21.5v-1.8"></path>
                    <path d="M6 15h4.81"></path>
                    <path d="M6 9h4"></path>
                  </svg>
                )}
                {filter.icon === 'users' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-3 h-3 text-amber-500">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )}
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
