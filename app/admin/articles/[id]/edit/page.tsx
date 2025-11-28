"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Strategy',
    content: '',
    excerpt: '',
    imageUrl: '',
    publishedAt: '',
  });

  useEffect(() => {
    if (!isNew) {
      fetch('/api/admin/articles')
        .then((res) => res.json())
        .then((data) => {
          const article = data.articles.find((a: any) => a.id === id);
          if (article) {
            setFormData({
              title: article.title,
              slug: article.slug,
              category: article.category,
              content: article.content,
              excerpt: article.excerpt || '',
              imageUrl: article.imageUrl || '',
              publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : '',
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isNew ? '/api/admin/articles' : `/api/admin/articles/${id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.publishedAt || undefined,
        }),
      });

      if (res.ok) {
        router.push('/admin/articles');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save article');
      }
    } catch (error) {
      alert('Error saving article');
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/admin/articles" className="text-amber-400 hover:text-amber-300 text-sm mb-4 inline-block">
          ← Back to Articles
        </Link>
        <h1 className="text-3xl font-bold text-white">{isNew ? 'Create Article' : 'Edit Article'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-white/5 rounded-xl p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="article-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="Strategy">Strategy</option>
              <option value="Industry">Industry</option>
              <option value="Reviews">Reviews</option>
              <option value="News">News</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Published Date</label>
            <input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            />
            <p className="text-xs text-slate-500 mt-1">Leave empty for draft</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Content *</label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 resize-none font-mono text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Article'}
          </button>
          <Link
            href="/admin/articles"
            className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

