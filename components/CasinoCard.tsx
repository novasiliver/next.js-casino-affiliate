import Link from "next/link";
import CasinoLogo from "./CasinoLogo";

interface CasinoCardProps {
  rank: number;
  name: string;
  logo: string;
  rating: number;
  bonus: string;
  bonusDetails?: string;
  tags?: string[];
  isFeatured?: boolean;
  slug: string;
  description?: string;
}

export default function CasinoCard({
  rank,
  name,
  logo,
  rating,
  bonus,
  bonusDetails,
  tags = [],
  isFeatured = false,
  slug,
  description,
}: CasinoCardProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-4 h-4 fill-amber-400 text-amber-400">
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star-half" className="lucide lucide-star-half w-4 h-4 text-amber-400">
          <path d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"></path>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-4 h-4 text-slate-700">
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
        </svg>
      );
    }

    return stars;
  };

    return (
      <div className={`group relative rounded-2xl ${isFeatured ? 'bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30' : 'bg-slate-900 border border-white/10'} p-1 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1`}>
        {isFeatured && (
          <div className="absolute -top-3 left-6 z-20">
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-amber-500/20 uppercase tracking-wider flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="crown" className="lucide lucide-crown w-3 h-3"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg> Editor&apos;s Choice
            </span>
          </div>
        )}
        <div className="bg-slate-900/50 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          {isFeatured && <div className="shimmer"></div>}
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <span className="text-4xl font-bold text-slate-800 font-mono">{String(rank).padStart(2, '0')}</span>
            <CasinoLogo logo={logo} name={name} size="medium" />
          </div>

          <div className="flex-1 w-full md:w-auto text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
              {renderStars(rating)}
              <span className="text-slate-400 text-xs ml-2 font-medium">{rating}/5</span>
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight mb-2">{name}</h3>
            {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
            {tags.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                {tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[10px] uppercase tracking-wide font-medium border border-white/5">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/4 bg-slate-800/50 rounded-lg p-3 border border-white/5 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Welcome Bonus</p>
            <p className="text-lg font-bold text-emerald-400">{bonus}</p>
            {bonusDetails && <p className="text-[10px] text-slate-500 mt-1">{bonusDetails}</p>}
          </div>

          <div className="w-full md:w-auto flex flex-col gap-2 min-w-[160px]">
            <button className="w-full py-3 rounded-lg bg-white text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-white/5">
              Play Now
            </button>
            <Link href={`/review/${slug}`} className="text-xs text-center text-slate-500 hover:text-white transition-colors underline decoration-slate-700 underline-offset-4">
              Read Review
            </Link>
          </div>
        </div>
    </div>
  );
}

