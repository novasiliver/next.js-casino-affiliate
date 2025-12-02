"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
        } else {
          router.push('/admin/articles');
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        router.push('/admin/articles');
      });
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.keys(newErrors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
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
        if (data.details && Array.isArray(data.details)) {
          const fieldErrors: Record<string, string> = {};
          data.details.forEach((err: any) => {
            if (err.path && err.path.length > 0) {
              fieldErrors[err.path[0]] = err.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          alert(data.error || 'Failed to update article');
        }
      }
    } catch (error) {
      alert('Error updating article');
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
        <h1 className="text-3xl font-bold text-white">Edit Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-white/5 rounded-xl p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.title
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
            />
            {errors.title && (
              <p className="text-rose-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Slug *
            </label>
            <input
              id="slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.slug
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
              placeholder="article-slug"
            />
            {errors.slug && (
              <p className="text-rose-400 text-xs mt-1">{errors.slug}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.category
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
            >
              <option value="Strategy">Strategy</option>
              <option value="Industry">Industry</option>
              <option value="Industry News">Industry News</option>
              <option value="Guides">Guides</option>
              <option value="Reviews">Reviews</option>
              <option value="News">News</option>
            </select>
            {errors.category && (
              <p className="text-rose-400 text-xs mt-1">{errors.category}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Published Date
            </label>
            <input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            />
            <p className="text-xs text-slate-500 mt-1">Leave empty for draft (won't appear on Gambling News page)</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Excerpt
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            maxLength={5000}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 resize-none"
            placeholder="Brief summary of the article (shown on listing page)..."
          />
          <p className="text-xs text-slate-500 mt-1">
            Optional: Brief summary shown on the article listing page (max 5,000 characters, ~800-1,000 words)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            placeholder="https://images.unsplash.com/..."
          />
          <p className="text-xs text-slate-500 mt-1">Optional: Featured image URL for the article</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Content *
          </label>
          <textarea
            id="content"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            maxLength={50000}
            className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none resize-none font-mono text-sm transition-colors ${
              errors.content
                ? 'border-rose-500 focus:border-rose-500'
                : 'border-white/10 focus:border-amber-500/50'
            }`}
            placeholder="Write your article content here..."
          />
          {errors.content && (
            <p className="text-rose-400 text-xs mt-1">{errors.content}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Supports markdown-style: ## for headings, &gt; for blockquotes (max 50,000 characters, ~8,000-10,000 words)
          </p>
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
