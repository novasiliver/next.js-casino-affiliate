import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasinoCard from "@/components/CasinoCard";

const categoryInfo: Record<string, { name: string; description: string }> = {
  slots: {
    name: 'Slots',
    description: 'Discover the best slot games from top providers',
  },
  'live-dealer': {
    name: 'Live Dealer',
    description: 'Experience real-time casino action with live dealers',
  },
  crypto: {
    name: 'Crypto Casinos',
    description: 'Casinos that accept Bitcoin and other cryptocurrencies',
  },
  'crash-games': {
    name: 'Crash Games',
    description: 'Fast-paced crash games for instant wins',
  },
  sportsbook: {
    name: 'Sportsbook',
    description: 'Sports betting with competitive odds',
  },
  poker: {
    name: 'Poker',
    description: 'Online poker rooms and tournaments',
  },
};

async function getCasinosByCategory(category: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/casinos?category=${category}&limit=100`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.casinos || [];
  } catch (error) {
    console.error('Error fetching casinos by category:', error);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryInfo[slug] || { name: slug, description: 'Casino category' };
  
  // Fetch casinos filtered by category
  const casinosData = await getCasinosByCategory(slug);
  
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

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-slate-400 text-lg">{category.description}</p>
          </div>

          {casinos.length > 0 ? (
            <div className="space-y-4">
              {casinos.map((casino: any) => (
                <CasinoCard key={casino.slug} {...casino} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 mb-4">No casinos found in this category.</p>
              <Link href="/" className="text-amber-400 hover:text-amber-300">
                Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

