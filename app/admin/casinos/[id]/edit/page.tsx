"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditCasinoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    logoUrl: '',
    rating: 2.5,
    votes: 0,
    description: '',
    isActive: true,
    rank: null as number | null,
    affiliateLink: '',
    seoTitle: '',
    metaDescription: '',
    metaKeywords: '',
    brandColor: '#f59e0b',
    verifiedBadge: true,
    cryptoFriendly: false,
    instantPayout: false,
    // Bonus
    bonusTitle: '',
    bonusAmount: '',
    bonusDetails: '',
    bonusCode: '',
    bonusWagering: '',
    bonusMinDeposit: '',
    bonusExpiry: '',
    // Casino Info
    established: '',
    license: '',
    owner: '',
    minDeposit: '',
    vpnFriendly: false,
    region: '',
    payoutSpeed: '',
    rtp: '',
    // Pros & Cons
    pros: [] as string[],
    cons: [] as string[],
    // Banking
    bankingMethods: [] as Array<{ name: string; type: string; time: string; fee: string; icon: string }>,
    // Game Selection
    slots: 0,
    liveTables: 0,
    jackpots: 0,
    liveAction: '',
    providers: [] as string[],
    // Rating Breakdown
    fairnessRating: 5,
    bonusesRating: 5,
    gameVarietyRating: 5,
    supportSpeedRating: 5,
    // Review Content
    verdict: '',
    userExperience: '',
    customerSupport: '',
    // Tags
    tags: [] as string[],
    // Categories
    categories: [] as string[],
    // Alternatives
    alternatives: [] as Array<{ slug: string; name: string; logo: string; bonus: string }>,
  });
  const [uploading, setUploading] = useState(false);
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newProvider, setNewProvider] = useState('');

  useEffect(() => {
    // Fetch casino data
    fetch('/api/admin/casinos', { credentials: 'include' })
      .then(res => res.json())
      .then((casinoData) => {

      // Load casino data
      const casino = casinoData.casinos?.find((c: any) => c.id === id);
      if (casino) {
        const data = casino.data || {};
        setFormData({
          name: casino.name || '',
          slug: casino.slug || '',
          logo: casino.logo || '',
          logoUrl: (casino.logo && (casino.logo.startsWith('/') || casino.logo.startsWith('http'))) ? casino.logo : '',
          rating: casino.rating || 2.5,
          votes: data.votes || 0,
          description: data.description || '',
          isActive: casino.isActive ?? true,
          rank: casino.rank,
          affiliateLink: data.affiliateLink || '',
          seoTitle: data.seoTitle || '',
          metaDescription: data.metaDescription || '',
          metaKeywords: Array.isArray(data.metaKeywords) ? data.metaKeywords.join(', ') : (data.metaKeywords || ''),
          brandColor: data.brandColor || '#f59e0b',
          verifiedBadge: data.verifiedBadge ?? true,
          cryptoFriendly: data.cryptoFriendly ?? false,
          instantPayout: data.instantPayout ?? false,
          bonusTitle: data.bonus?.title || '',
          bonusAmount: data.bonus?.amount || '',
          bonusDetails: data.bonus?.details || '',
          bonusCode: data.bonus?.code || '',
          bonusWagering: data.bonus?.wagering || '',
          bonusMinDeposit: data.bonus?.minDeposit || '',
          bonusExpiry: data.bonus?.expiry || '',
          established: data.established ? String(data.established) : (data.casinoInfo?.established ? String(data.casinoInfo.established) : ''),
          license: data.casinoInfo?.license || '',
          owner: data.casinoInfo?.owner || '',
          minDeposit: data.casinoInfo?.minDeposit || '',
          vpnFriendly: data.casinoInfo?.vpnFriendly ?? false,
          region: data.region || '',
          payoutSpeed: data.payoutSpeed || '',
          rtp: data.rtp || '',
          pros: data.prosCons?.pros || [],
          cons: data.prosCons?.cons || [],
          bankingMethods: data.banking || [],
          slots: data.gameSelection?.slots || 0,
          liveTables: data.gameSelection?.liveTables || 0,
          jackpots: data.gameSelection?.jackpots || 0,
          liveAction: data.gameSelection?.liveAction || '',
          providers: data.gameSelection?.providers || [],
          fairnessRating: data.ratingBreakdown?.fairness || 5,
          bonusesRating: data.ratingBreakdown?.bonuses || 5,
          gameVarietyRating: data.ratingBreakdown?.gameVariety || 5,
          supportSpeedRating: data.ratingBreakdown?.supportSpeed || 5,
          verdict: data.verdict || '',
          userExperience: data.reviewContent?.userExperience || '',
          customerSupport: data.reviewContent?.customerSupport || '',
          tags: data.tags || [],
          categories: casino.categories ? (typeof casino.categories === 'string' ? JSON.parse(casino.categories) : (Array.isArray(casino.categories) ? casino.categories : [])) : [],
          alternatives: data.alternatives || [],
        });
      }
      setLoading(false);
    }).catch((error) => {
      console.error('Error loading data:', error);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setSaving(true);

    try {
      const casinoDataObj = {
        bonus: {
          title: formData.bonusTitle || 'Welcome Bonus',
          amount: formData.bonusAmount,
          details: formData.bonusDetails || undefined,
          code: formData.bonusCode || undefined,
          wagering: formData.bonusWagering || undefined,
          minDeposit: formData.bonusMinDeposit || undefined,
          expiry: formData.bonusExpiry || undefined,
        },
        description: formData.description,
        tags: formData.tags,
        categories: formData.categories.length > 0 ? formData.categories : undefined,
        votes: formData.votes || undefined,
        established: formData.established ? parseInt(formData.established) : undefined,
        region: formData.region || undefined,
        payoutSpeed: formData.payoutSpeed || undefined,
        rtp: formData.rtp || undefined,
        verdict: formData.verdict || undefined,
        prosCons: formData.pros.length > 0 || formData.cons.length > 0 ? {
          pros: formData.pros,
          cons: formData.cons,
        } : undefined,
        banking: formData.bankingMethods.length > 0 ? formData.bankingMethods : undefined,
        gameSelection: formData.slots > 0 || formData.liveTables > 0 ? {
          slots: formData.slots,
          liveTables: formData.liveTables,
          jackpots: formData.jackpots,
          liveAction: formData.liveAction,
          providers: formData.providers,
        } : undefined,
        ratingBreakdown: {
          fairness: formData.fairnessRating,
          bonuses: formData.bonusesRating,
          gameVariety: formData.gameVarietyRating,
          supportSpeed: formData.supportSpeedRating,
        },
        casinoInfo: formData.established || formData.license ? {
          established: formData.established ? parseInt(formData.established) : new Date().getFullYear(),
          license: formData.license || '',
          owner: formData.owner || '',
          minDeposit: formData.minDeposit || '',
          vpnFriendly: formData.vpnFriendly,
        } : undefined,
        reviewContent: formData.userExperience || formData.customerSupport ? {
          userExperience: formData.userExperience || undefined,
          customerSupport: formData.customerSupport || undefined,
        } : undefined,
        alternatives: formData.alternatives.length > 0 ? formData.alternatives : undefined,
        affiliateLink: formData.affiliateLink || undefined,
        seoTitle: formData.seoTitle || undefined,
        metaDescription: formData.metaDescription || undefined,
        metaKeywords: formData.metaKeywords ? formData.metaKeywords.split(',').map(k => k.trim()) : undefined,
      };

      const casinoData = {
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name,
        logo: formData.logoUrl || formData.logo || formData.name.substring(0, 3).toUpperCase(),
        rating: formData.rating,
        isActive: formData.isActive,
        rank: formData.rank,
        data: casinoDataObj, // Send as object, API will stringify it
      };

      const res = await fetch(`/api/admin/casinos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(casinoData),
      });

      if (res.ok) {
        router.push('/admin/casinos');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update casino');
      }
    } catch (error) {
      console.error('Error creating casino:', error);
      alert('Failed to create casino');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/casinos"
            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Edit Casino</h1>
            <p className="text-sm text-slate-400 mt-1">Update the casino details below.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={(e) => handleSubmit(e, formData.isActive)}
            disabled={saving || loading}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Casino'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-slate-400">Loading casino data...</div>
        </div>
      ) : (
      <form onSubmit={(e) => handleSubmit(e, formData.isActive)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Casino Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Casino Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Slug (URL) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="casino-slug"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Brief description of the casino..."
                />
              </div>
              
              {/* Rating */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Overall Rating (0-5): {formData.rating}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0</span>
                  <span>2.5</span>
                  <span>5.0</span>
                </div>
              </div>
            </div>

            {/* Bonus Section */}
            <details className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <summary className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2 cursor-pointer">Bonus Information</summary>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Bonus Title</label>
                  <input
                    type="text"
                    value={formData.bonusTitle}
                    onChange={(e) => setFormData({ ...formData, bonusTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Welcome Package"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Bonus Amount</label>
                  <input
                    type="text"
                    value={formData.bonusAmount}
                    onChange={(e) => setFormData({ ...formData, bonusAmount: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="$5,000 + 100 Free Spins"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1">Bonus Details</label>
                  <textarea
                    rows={2}
                    value={formData.bonusDetails}
                    onChange={(e) => setFormData({ ...formData, bonusDetails: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Valid on your first 4 deposits"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Bonus Code</label>
                  <input
                    type="text"
                    value={formData.bonusCode}
                    onChange={(e) => setFormData({ ...formData, bonusCode: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="WELCOME200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Wagering</label>
                  <input
                    type="text"
                    value={formData.bonusWagering}
                    onChange={(e) => setFormData({ ...formData, bonusWagering: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="35x Bonus"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Min Deposit</label>
                  <input
                    type="text"
                    value={formData.bonusMinDeposit}
                    onChange={(e) => setFormData({ ...formData, bonusMinDeposit: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="$20.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Expiry</label>
                  <input
                    type="text"
                    value={formData.bonusExpiry}
                    onChange={(e) => setFormData({ ...formData, bonusExpiry: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="30 Days"
                  />
                </div>
              </div>
            </details>

            {/* Pros & Cons */}
            <details className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <summary className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2 cursor-pointer">Pros & Cons</summary>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Pros</label>
                  <div className="space-y-2 mb-2">
                    {formData.pros.map((pro, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-800 p-2 rounded">
                        <span className="flex-1 text-sm text-white">{pro}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, pros: formData.pros.filter((_, i) => i !== idx) })}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPro}
                      onChange={(e) => setNewPro(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newPro.trim()) {
                            setFormData({ ...formData, pros: [...formData.pros, newPro.trim()] });
                            setNewPro('');
                          }
                        }
                      }}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Add a pro..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newPro.trim()) {
                          setFormData({ ...formData, pros: [...formData.pros, newPro.trim()] });
                          setNewPro('');
                        }
                      }}
                      className="px-3 py-2 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Cons</label>
                  <div className="space-y-2 mb-2">
                    {formData.cons.map((con, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-800 p-2 rounded">
                        <span className="flex-1 text-sm text-white">{con}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, cons: formData.cons.filter((_, i) => i !== idx) })}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCon}
                      onChange={(e) => setNewCon(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newCon.trim()) {
                            setFormData({ ...formData, cons: [...formData.cons, newCon.trim()] });
                            setNewCon('');
                          }
                        }
                      }}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Add a con..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newCon.trim()) {
                          setFormData({ ...formData, cons: [...formData.cons, newCon.trim()] });
                          setNewCon('');
                        }
                      }}
                      className="px-3 py-2 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </details>

            {/* Verdict */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2">Verdict</h3>
              <textarea
                rows={4}
                value={formData.verdict}
                onChange={(e) => setFormData({ ...formData, verdict: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                placeholder="Write your overall verdict about this casino..."
              />
            </div>

            {/* Review Content */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2">Review Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">User Experience & Mobile</label>
                  <textarea
                    rows={4}
                    value={formData.userExperience}
                    onChange={(e) => setFormData({ ...formData, userExperience: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Describe the user experience and mobile compatibility..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Customer Support</label>
                  <textarea
                    rows={4}
                    value={formData.customerSupport}
                    onChange={(e) => setFormData({ ...formData, customerSupport: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Describe the customer support quality..."
                  />
                </div>
              </div>
            </div>

            {/* Affiliate & SEO */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2">Tracking & SEO</h3>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Affiliate Tracking Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.affiliateLink}
                    onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                    placeholder="https://tracking.casino.com/..."
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                  <button type="button" className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 hover:bg-slate-700 text-sm">
                    Test
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Meta Keywords (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="casino, online casino, slots"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Form Column */}
          <div className="space-y-6">
            {/* Appearance */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Appearance</h3>
              
              {/* Rank Input */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Rank (Optional)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.rank === null ? '' : formData.rank}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    setFormData({ ...formData, rank: value });
                  }}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Enter rank number"
                />
                <p className="text-xs text-slate-500 mt-1">Set the ranking position for this casino</p>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Casino Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setUploading(true);
                    try {
                      const uploadFormData = new FormData();
                      uploadFormData.append('file', file);

                      const res = await fetch('/api/admin/upload', {
                        method: 'POST',
                        credentials: 'include',
                        body: uploadFormData,
                      });

                      if (res.ok) {
                        const data = await res.json();
                        setFormData({ ...formData, logoUrl: data.url });
                      } else {
                        const error = await res.json();
                        alert(error.error || 'Failed to upload image');
                      }
                    } catch (error) {
                      console.error('Upload error:', error);
                      alert('Failed to upload image');
                    } finally {
                      setUploading(false);
                    }
                  }}
                  className="hidden"
                  id="logo-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="logo-upload"
                  className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center hover:border-amber-500/50 transition-colors cursor-pointer bg-slate-900/50"
                >
                  {uploading ? (
                    <>
                      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-xs text-slate-400">Uploading...</span>
                    </>
                  ) : formData.logoUrl ? (
                    <>
                      <img
                        src={formData.logoUrl}
                        alt="Casino logo"
                        className="w-16 h-16 object-contain mb-2 rounded"
                      />
                      <span className="text-xs text-slate-400">Click to change</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-slate-500 mb-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" x2="12" y1="3" y2="15"></line>
                      </svg>
                      <span className="text-xs text-slate-400">Click to upload</span>
                    </>
                  )}
                </label>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Brand Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.brandColor}
                    onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
                  />
                  <input
                    type="text"
                    value={formData.brandColor}
                    onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Attributes</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Verified Badge</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, verifiedBadge: !formData.verifiedBadge })}
                  className={`w-10 h-5 rounded-full relative transition-colors ${
                    formData.verifiedBadge ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                    formData.verifiedBadge ? 'right-1' : 'left-1'
                  }`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Crypto Friendly</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, cryptoFriendly: !formData.cryptoFriendly })}
                  className={`w-10 h-5 rounded-full relative transition-colors ${
                    formData.cryptoFriendly ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                    formData.cryptoFriendly ? 'right-1' : 'left-1'
                  }`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Instant Payout</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, instantPayout: !formData.instantPayout })}
                  className={`w-10 h-5 rounded-full relative transition-colors ${
                    formData.instantPayout ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                    formData.instantPayout ? 'right-1' : 'left-1'
                  }`}></span>
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <details className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <summary className="text-sm font-semibold text-white uppercase tracking-wider mb-4 cursor-pointer">Additional Information</summary>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Established Year</label>
                    <input
                      type="number"
                      value={formData.established}
                      onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="2021"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Region</label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Global"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Payout Speed</label>
                    <input
                      type="text"
                      value={formData.payoutSpeed}
                      onChange={(e) => setFormData({ ...formData, payoutSpeed: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Instant"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">RTP</label>
                    <input
                      type="text"
                      value={formData.rtp}
                      onChange={(e) => setFormData({ ...formData, rtp: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="97.4%"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">License</label>
                    <input
                      type="text"
                      value={formData.license}
                      onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Curacao"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Owner</label>
                    <input
                      type="text"
                      value={formData.owner}
                      onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Min Deposit</label>
                    <input
                      type="text"
                      value={formData.minDeposit}
                      onChange={(e) => setFormData({ ...formData, minDeposit: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="$20.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Votes</label>
                    <input
                      type="number"
                      value={formData.votes}
                      onChange={(e) => setFormData({ ...formData, votes: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">VPN Friendly</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, vpnFriendly: !formData.vpnFriendly })}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      formData.vpnFriendly ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                      formData.vpnFriendly ? 'right-1' : 'left-1'
                    }`}></span>
                  </button>
                </div>
              </div>
            </details>

            {/* Rating Breakdown */}
            <details className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <summary className="text-sm font-semibold text-white uppercase tracking-wider mb-4 cursor-pointer">Rating Breakdown</summary>
              <div className="space-y-4 pt-4">
                {[
                  { label: 'Fairness & Trust', value: formData.fairnessRating, onChange: (v: number) => setFormData({ ...formData, fairnessRating: v }) },
                  { label: 'Bonuses & Promos', value: formData.bonusesRating, onChange: (v: number) => setFormData({ ...formData, bonusesRating: v }) },
                  { label: 'Game Variety', value: formData.gameVarietyRating, onChange: (v: number) => setFormData({ ...formData, gameVarietyRating: v }) },
                  { label: 'Support Speed', value: formData.supportSpeedRating, onChange: (v: number) => setFormData({ ...formData, supportSpeedRating: v }) },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}/10</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={item.value}
                      onChange={(e) => item.onChange(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                ))}
              </div>
            </details>

            {/* Game Selection */}
            <details className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <summary className="text-sm font-semibold text-white uppercase tracking-wider mb-4 cursor-pointer">Game Selection</summary>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Slots</label>
                  <input
                    type="number"
                    value={formData.slots}
                    onChange={(e) => setFormData({ ...formData, slots: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Live Tables</label>
                  <input
                    type="number"
                    value={formData.liveTables}
                    onChange={(e) => setFormData({ ...formData, liveTables: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Jackpots</label>
                  <input
                    type="number"
                    value={formData.jackpots}
                    onChange={(e) => setFormData({ ...formData, jackpots: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Live Action</label>
                  <input
                    type="text"
                    value={formData.liveAction}
                    onChange={(e) => setFormData({ ...formData, liveAction: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Yes"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-2">Providers</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.providers.map((provider, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-white flex items-center gap-2">
                        {provider}
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, providers: formData.providers.filter((_, i) => i !== idx) })}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProvider}
                      onChange={(e) => setNewProvider(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newProvider.trim()) {
                            setFormData({ ...formData, providers: [...formData.providers, newProvider.trim()] });
                            setNewProvider('');
                          }
                        }
                      }}
                      className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Add provider..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newProvider.trim()) {
                          setFormData({ ...formData, providers: [...formData.providers, newProvider.trim()] });
                          setNewProvider('');
                        }
                      }}
                      className="px-3 py-2 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </details>

            {/* Banking Methods */}
            <details className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <summary className="text-sm font-semibold text-white uppercase tracking-wider mb-4 cursor-pointer">Banking Methods</summary>
              <div className="space-y-3 pt-4">
                {formData.bankingMethods.map((method, idx) => (
                  <div key={idx} className="grid grid-cols-5 gap-2 bg-slate-800 p-3 rounded">
                    <input
                      type="text"
                      value={method.name}
                      onChange={(e) => {
                        const updated = [...formData.bankingMethods];
                        updated[idx].name = e.target.value;
                        setFormData({ ...formData, bankingMethods: updated });
                      }}
                      className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-sm text-white"
                      placeholder="Method"
                    />
                    <input
                      type="text"
                      value={method.type}
                      onChange={(e) => {
                        const updated = [...formData.bankingMethods];
                        updated[idx].type = e.target.value;
                        setFormData({ ...formData, bankingMethods: updated });
                      }}
                      className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-sm text-white"
                      placeholder="Type"
                    />
                    <input
                      type="text"
                      value={method.time}
                      onChange={(e) => {
                        const updated = [...formData.bankingMethods];
                        updated[idx].time = e.target.value;
                        setFormData({ ...formData, bankingMethods: updated });
                      }}
                      className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-sm text-white"
                      placeholder="Time"
                    />
                    <input
                      type="text"
                      value={method.fee}
                      onChange={(e) => {
                        const updated = [...formData.bankingMethods];
                        updated[idx].fee = e.target.value;
                        setFormData({ ...formData, bankingMethods: updated });
                      }}
                      className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-sm text-white"
                      placeholder="Fee"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, bankingMethods: formData.bankingMethods.filter((_, i) => i !== idx) })}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, bankingMethods: [...formData.bankingMethods, { name: '', type: '', time: '', fee: '', icon: '' }] })}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white hover:bg-slate-700"
                >
                  + Add Banking Method
                </button>
              </div>
            </details>

            {/* Categories */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
              <p className="text-xs text-slate-400 mb-4">Select one or more categories for this casino. These will appear in the "Browse by Category" section on the homepage.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { slug: 'slots', name: 'Slots', icon: 'dice-5' },
                  { slug: 'live-dealer', name: 'Live Dealer', icon: 'users' },
                  { slug: 'crypto', name: 'Crypto', icon: 'bitcoin' },
                  { slug: 'crash-games', name: 'Crash Games', icon: 'rocket' },
                  { slug: 'sportsbook', name: 'Sportsbook', icon: 'trophy' },
                  { slug: 'poker', name: 'Poker', icon: 'clover' },
                ].map((category) => {
                  const isSelected = formData.categories.includes(category.slug);
                  return (
                    <label
                      key={category.slug}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/50 text-white'
                          : 'bg-slate-800 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, categories: [...formData.categories, category.slug] });
                          } else {
                            setFormData({ ...formData, categories: formData.categories.filter(cat => cat !== category.slug) });
                          }
                        }}
                        className="w-4 h-4 rounded border-white/20 bg-slate-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900"
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-white flex items-center gap-2">
                    {tag}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== idx) })}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newTag.trim()) {
                        setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
                        setNewTag('');
                      }
                    }
                  }}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Add tag..."
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTag.trim()) {
                      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
                      setNewTag('');
                    }
                  }}
                  className="px-3 py-2 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      )}
    </div>
  );
}

