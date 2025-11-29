import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getArticles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles`, {
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

export default async function GuidesPage() {
  const articles = await getArticles();

  return (
    <>
      <Navbar currentPage="guides" />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Guides & Strategies</h1>
            <p className="text-slate-400 text-lg">Expert strategies and industry insights to improve your gaming experience.</p>
          </div>

          {articles.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <article key={i} className="group cursor-pointer">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 mb-4 overflow-hidden border border-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/40"></div>
                    <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-md text-[10px] uppercase font-bold text-white tracking-wider border border-white/10">
                      Coming Soon
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span>Coming soon</span>
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors leading-snug">
                    New guide coming soon
                  </h3>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <Link key={article.id} href={`/guides/${article.slug}`} className="group">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 mb-4 overflow-hidden border border-white/5 relative">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900/40"></div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-md text-[10px] uppercase font-bold text-white tracking-wider border border-white/10">
                      {article.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    {article.publishedAt && (
                      <>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-slate-400 mt-2">{article.excerpt}</p>
                  )}
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

