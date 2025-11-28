"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string | null;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      alert('Error deleting article');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
        >
          Create Article
        </Link>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 border-b border-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-white">{article.title}</div>
                  <div className="text-xs text-slate-500">{article.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {article.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    article.publishedAt
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 border border-white/5'
                  }`}>
                    {article.publishedAt ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="text-amber-400 hover:text-amber-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No articles found.</p>
            <Link
              href="/admin/articles/new"
              className="text-amber-400 hover:text-amber-300"
            >
              Create your first article
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

