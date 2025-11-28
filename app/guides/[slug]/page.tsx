import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/guides" className="text-amber-400 hover:text-amber-300 text-sm mb-6 inline-block">
            ← Back to Guides
          </Link>

          <article>
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-slate-800 text-amber-400 rounded-full text-xs font-bold tracking-wider mb-4 border border-amber-500/20">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
              {article.publishedAt && (
                <p className="text-slate-400 text-sm">
                  Published on {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {article.imageUrl && (
              <div className="aspect-video w-full rounded-xl bg-slate-900 mb-8 overflow-hidden border border-white/5 relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-invert prose-slate max-w-none">
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}

