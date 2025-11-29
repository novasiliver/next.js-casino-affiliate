import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryInfo[slug] || { name: slug, description: 'Casino category' };

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-slate-400 text-lg">{category.description}</p>
          </div>

          <div className="text-center py-20">
            <p className="text-slate-400 mb-4">Category page content coming soon.</p>
            <Link href="/" className="text-amber-400 hover:text-amber-300">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

