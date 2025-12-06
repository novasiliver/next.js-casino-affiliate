"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewArticlePage() {
  const router = useRouter();
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
    // SEO fields
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    seoAuthor: 'Bonusory Team',
    seoCanonical: '',
    seoRobots: 'index, follow',
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

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
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
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
          alert(data.error || 'Failed to create article');
        }
      }
    } catch (error) {
      alert('Error creating article');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/admin/articles" className="text-amber-400 hover:text-amber-300 text-sm mb-4 inline-block">
          ← Back to Articles
        </Link>
        <h1 className="text-3xl font-bold text-white">Create Article</h1>
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
              onChange={(e) => handleTitleChange(e.target.value)}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.title
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
              placeholder="Enter article title"
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
            <p className="text-xs text-slate-500 mt-1">Auto-generated from title, but you can edit it</p>
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
            placeholder="Write your article content here. You can use markdown-style formatting:&#10;&#10;## Heading 2&#10;### Heading 3&#10;&gt; Blockquote&#10;&#10;Regular paragraphs..."
          />
          {errors.content && (
            <p className="text-rose-400 text-xs mt-1">{errors.content}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Supports markdown-style: ## for headings, &gt; for blockquotes (max 50,000 characters, ~8,000-10,000 words)
          </p>
        </div>

        {/* SEO Section */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                maxLength={60}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                placeholder="e.g., Best Slots Strategy 2025 - Win More at Online Casinos"
              />
              <p className="text-xs text-slate-500 mt-1">{formData.seoTitle.length}/60 characters (optimal: 50-60)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                rows={3}
                maxLength={160}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 resize-none"
                placeholder="Brief description that will appear in search results..."
              />
              <p className="text-xs text-slate-500 mt-1">{formData.seoDescription.length}/160 characters (optimal: 150-160)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Meta Keywords
              </label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                placeholder="casino strategy, slots tips, gambling guide (comma separated)"
              />
              <p className="text-xs text-slate-500 mt-1">Comma-separated keywords</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.seoAuthor}
                  onChange={(e) => setFormData({ ...formData, seoAuthor: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                  placeholder="Bonusory Team"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Robots Meta Tag
                </label>
                <select
                  value={formData.seoRobots}
                  onChange={(e) => setFormData({ ...formData, seoRobots: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                >
                  <option value="index, follow">index, follow (Default)</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Canonical URL (optional)
              </label>
              <input
                type="url"
                value={formData.seoCanonical}
                onChange={(e) => setFormData({ ...formData, seoCanonical: e.target.value })}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                placeholder="https://bonusory.com/guides/article-slug"
              />
              <p className="text-xs text-slate-500 mt-1">Leave empty to use default URL</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Article'}
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

