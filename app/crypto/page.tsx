import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasinoCard from "@/components/CasinoCard";

async function getCryptoCasinos() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/casinos`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    // Filter casinos that support crypto (check data for crypto banking methods)
    return (data.casinos || []).filter((casino: any) => {
      const banking = casino.data?.banking || [];
      return banking.some((method: any) => method.type === 'Crypto');
    });
  } catch (error) {
    console.error('Error fetching crypto casinos:', error);
    return [];
  }
}

export default async function CryptoPage() {
  const casinos = await getCryptoCasinos();

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Crypto Casinos</h1>
            <p className="text-slate-400 text-lg">Top-rated casinos that accept Bitcoin, Ethereum, and other cryptocurrencies.</p>
          </div>

          {casinos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400">No crypto casinos available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {casinos.map((casino: any, index: number) => (
                <CasinoCard
                  key={casino.id}
                  rank={index + 1}
                  name={casino.name}
                  logo={casino.logo}
                  rating={casino.rating}
                  bonus={casino.data?.bonus?.amount || 'N/A'}
                  bonusDetails={casino.data?.bonus?.details}
                  tags={casino.data?.tags || []}
                  isFeatured={index === 0}
                  slug={casino.slug}
                  description={casino.data?.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

