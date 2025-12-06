"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SeoSetting {
  id: string;
  pageKey: string;
  pageName: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  seoAuthor: string | null;
  seoPublisher: string | null;
  seoCanonical: string | null;
  seoRobots: string | null;
  ogImage: string | null;
}

const defaultPages = [
  { key: 'home', name: 'Homepage' },
  { key: 'casinos', name: 'Casinos Page' },
  { key: 'bonuses', name: 'Bonuses Page' },
  { key: 'guides', name: 'Guides Page' },
  { key: 'about', name: 'About Page' },
  { key: 'privacy', name: 'Privacy Policy' },
  { key: 'terms', name: 'Terms of Service' },
  { key: 'cookies', name: 'Cookies Policy' },
  { key: 'safety-guide', name: 'Safety Guide' }
];

export default function AdminSeoPage() {
  const [seoSettings, setSeoSettings] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SeoSetting>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const fetchSeoSettings = async () => {
    try {
      const res = await fetch('/api/admin/seo');
      if (res.ok) {
        const data = await res.json();
        setSeoSettings(data.seoSettings || []);
      }
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pageKey: string) => {
    const existing = seoSettings.find(s => s.pageKey === pageKey);
    const pageInfo = defaultPages.find(p => p.key === pageKey);
    
    setEditingPage(pageKey);
    setFormData(existing || {
      pageKey,
      pageName: pageInfo?.name || '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      seoAuthor: 'Bonusory Team',
      seoPublisher: 'Bonusory',
      seoCanonical: '',
      seoRobots: 'index, follow',
      ogImage: ''
    });
  };

  const handleSave = async () => {
    if (!formData.pageKey || !formData.pageName) {
      alert('Page key and name are required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('SEO settings saved successfully!');
        setEditingPage(null);
        fetchSeoSettings();
      } else {
        alert('Failed to save SEO settings');
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      alert('Error saving SEO settings');
    } finally {
      setSaving(false);
    }
  };

  const getSetting = (pageKey: string) => {
    return seoSettings.find(s => s.pageKey === pageKey);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading SEO settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-amber-500 hover:text-amber-400 text-sm mb-4 inline-flex items-center gap-2">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">SEO Settings</h1>
          <p className="text-slate-400 mt-2">Manage meta tags, canonical URLs, and robots directives for each page</p>
        </div>

        {/* Page List */}
        <div className="bg-slate-900 rounded-lg border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">SEO Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Meta Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {defaultPages.map((page) => {
                  const setting = getSetting(page.key);
                  const isConfigured = setting && setting.seoTitle && setting.seoDescription;

                  return (
                    <tr key={page.key} className="hover:bg-slate-800/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-white">{page.name}</span>
                          <span className="ml-2 text-xs text-slate-500">/{page.key === 'home' ? '' : page.key}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-300 max-w-xs truncate">
                          {setting?.seoTitle || <span className="text-slate-600">Not set</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-300 max-w-xs truncate">
                          {setting?.seoDescription || <span className="text-slate-600">Not set</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isConfigured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Configured
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Needs Setup
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => handleEdit(page.key)}
                          className="text-amber-500 hover:text-amber-400 font-medium"
                        >
                          {isConfigured ? 'Edit' : 'Configure'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingPage && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 rounded-lg border border-white/10 max-w-4xl w-full my-8">
              <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  SEO Settings - {formData.pageName}
                </h2>
                <button
                  onClick={() => setEditingPage(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* SEO Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    SEO Title <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle || ''}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="e.g., Best Online Casinos 2025 - Reviews & Bonuses | Bonusory"
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    maxLength={60}
                  />
                  <p className="text-xs text-slate-500 mt-1">{formData.seoTitle?.length || 0}/60 characters (optimal: 50-60)</p>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meta Description <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    value={formData.seoDescription || ''}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    placeholder="Brief description of the page that will appear in search results..."
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                    maxLength={160}
                  />
                  <p className="text-xs text-slate-500 mt-1">{formData.seoDescription?.length || 0}/160 characters (optimal: 150-160)</p>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.seoKeywords || ''}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                    placeholder="online casino, casino bonus, gambling, slots (comma separated)"
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Comma-separated keywords (optional, but recommended)</p>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.seoAuthor || ''}
                    onChange={(e) => setFormData({ ...formData, seoAuthor: e.target.value })}
                    placeholder="Bonusory Team"
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Publisher */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Publisher
                  </label>
                  <input
                    type="text"
                    value={formData.seoPublisher || ''}
                    onChange={(e) => setFormData({ ...formData, seoPublisher: e.target.value })}
                    placeholder="Bonusory"
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={formData.seoCanonical || ''}
                    onChange={(e) => setFormData({ ...formData, seoCanonical: e.target.value })}
                    placeholder="https://bonusory.com/casinos"
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Leave empty to use default page URL</p>
                </div>

                {/* Robots */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Robots Meta Tag
                  </label>
                  <select
                    value={formData.seoRobots || 'index, follow'}
                    onChange={(e) => setFormData({ ...formData, seoRobots: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="index, follow">index, follow (Default)</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Controls how search engines index this page</p>
                </div>

                {/* OG Image */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Open Graph Image (Social Share)
                  </label>
                  <input
                    type="url"
                    value={formData.ogImage || ''}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    placeholder="https://bonusory.com/og-image.jpg"
                    className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Image displayed when shared on social media (1200x630px recommended)</p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

