"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  slug: string;
  component: string;
  category: string;
}

export default function NewCasinoPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    logoUrl: '',
    rating: 2.5,
    votes: 0,
    template: '',
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
    content: '',
    verdict: '',
    userExperience: '',
    customerSupport: '',
    // Tags
    tags: [] as string[],
    // Alternatives
    alternatives: [] as Array<{ slug: string; name: string; logo: string; bonus: string }>,
  });
  const [uploading, setUploading] = useState(false);
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newProvider, setNewProvider] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch templates
    fetch('/api/admin/templates', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const allTemplates = data.templates || [];
        // Filter for Casino Review Page Templates
        const casinoTemplates = allTemplates.filter((t: Template) => 
          t.category === 'Casino Review Page Template'
        );
        setTemplates(casinoTemplates);
        if (casinoTemplates.length > 0) {
          setFormData(prev => ({ ...prev, template: casinoTemplates[0].component }));
        } else {
          setErrors((prev) => ({ ...prev, template: 'No templates available. Please create a template first.' }));
        }
      })
      .catch((error) => {
        console.error('Error loading templates:', error);
        setErrors((prev) => ({ ...prev, template: 'Failed to load templates. Please refresh the page.' }));
      });

    // Fetch existing casinos to calculate default rank
    fetch('/api/admin/casinos', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const casinos = data.casinos || [];
        // Find the maximum rank
        const ranks = casinos
          .map((c: any) => c.rank)
          .filter((r: number | null) => r !== null && r !== undefined)
          .map((r: number) => Number(r));
        
        const maxRank = ranks.length > 0 ? Math.max(...ranks) : 0;
        const defaultRank = maxRank + 1;
        
        // Set default rank only if rank is still null (not manually set)
        setFormData(prev => {
          if (prev.rank === null) {
            return { ...prev, rank: defaultRank };
          }
          return prev;
        });
      })
      .catch((error) => {
        console.error('Error loading casinos for rank calculation:', error);
        // Set default to 1 if fetch fails
        setFormData(prev => {
          if (prev.rank === null) {
            return { ...prev, rank: 1 };
          }
          return prev;
        });
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setSaving(true);
    setErrors({}); // Clear previous errors

    try {
      // Helper to convert empty strings to undefined
      const cleanValue = (value: any) => {
        if (value === '' || value === null) return undefined;
        return value;
      };

      const casinoDataObj = {
        bonus: {
          title: formData.bonusTitle || 'Welcome Bonus',
          amount: formData.bonusAmount || 'N/A',
          details: cleanValue(formData.bonusDetails),
          code: cleanValue(formData.bonusCode),
          wagering: cleanValue(formData.bonusWagering),
          minDeposit: cleanValue(formData.bonusMinDeposit),
          expiry: cleanValue(formData.bonusExpiry),
        },
        description: cleanValue(formData.description),
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        votes: formData.votes > 0 ? formData.votes : undefined,
        established: formData.established ? parseInt(formData.established) : undefined,
        region: cleanValue(formData.region),
        payoutSpeed: cleanValue(formData.payoutSpeed),
        rtp: cleanValue(formData.rtp),
        verdict: cleanValue(formData.verdict),
        prosCons: formData.pros.length > 0 || formData.cons.length > 0 ? {
          pros: formData.pros,
          cons: formData.cons,
        } : undefined,
        banking: formData.bankingMethods.length > 0 ? formData.bankingMethods : undefined,
        gameSelection: formData.slots > 0 || formData.liveTables > 0 ? {
          slots: formData.slots,
          liveTables: formData.liveTables,
          jackpots: formData.jackpots,
          liveAction: cleanValue(formData.liveAction),
          providers: formData.providers.length > 0 ? formData.providers : undefined,
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
          userExperience: cleanValue(formData.userExperience),
          customerSupport: cleanValue(formData.customerSupport),
        } : undefined,
        alternatives: formData.alternatives.length > 0 ? formData.alternatives : undefined,
        affiliateLink: cleanValue(formData.affiliateLink),
        seoTitle: cleanValue(formData.seoTitle),
        metaDescription: cleanValue(formData.metaDescription),
        metaKeywords: formData.metaKeywords ? formData.metaKeywords.split(',').map(k => k.trim()).filter(k => k) : undefined,
      };

      // Validate required fields before submission
      const validationErrors: Record<string, string> = {};
      
      if (!formData.name || formData.name.trim() === '') {
        validationErrors.name = 'Casino name is required';
      }

      if (!formData.template || formData.template.trim() === '') {
        validationErrors.template = 'Template is required';
      }

      // Logo is required - check if we have logoUrl, logo, or can generate from name
      const logoValue = formData.logoUrl || formData.logo || (formData.name ? formData.name.substring(0, 3).toUpperCase() : '');
      if (!logoValue || logoValue.trim() === '') {
        validationErrors.logo = 'Logo is required. Please upload an image or enter a logo text.';
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSaving(false);
        // Scroll to first error
        const firstErrorField = Object.keys(validationErrors)[0];
        if (firstErrorField) {
          setTimeout(() => {
            const element = document.querySelector(`[data-field="${firstErrorField}"]`);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
        return;
      }

      const casinoData = {
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name.trim(),
        logo: logoValue,
        rating: Number(formData.rating), // Ensure it's a number
        template: formData.template,
        isActive: Boolean(publish),
        rank: formData.rank !== null && formData.rank !== undefined ? Number(formData.rank) : undefined,
        data: casinoDataObj, // Send as object, API will stringify it
      };

      console.log('Submitting casino data:', { ...casinoData, data: '[object]' }); // Log for debugging

      const res = await fetch('/api/admin/casinos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(casinoData),
      });

      console.log('Response status:', res.status); // Log for debugging

      // Read response once
      const responseData = await res.json().catch(() => ({ error: 'Failed to parse response' }));

      if (res.ok) {
        console.log('Casino created successfully:', responseData.id);
        router.push(`/admin/casinos/${responseData.id}/edit`);
      } else {
        console.error('API Error:', responseData); // Log for debugging
        console.error('Error Details:', responseData.details); // Log detailed errors
        
        const errorData = responseData;
        
        // Parse validation errors from API
        if (errorData.details && Array.isArray(errorData.details)) {
          const fieldErrors: Record<string, string> = {};
          errorData.details.forEach((err: any) => {
            console.error('Validation error:', err); // Log each error
            // Handle nested paths like "data.bonus.amount"
            const path = err.path || [];
            const field = Array.isArray(path) ? path[0] : path;
            const message = err.message || 'Invalid value';
            
            // Map nested paths to form fields
            if (field === 'data' && path.length > 1) {
              // For nested data errors, show in general error
              fieldErrors.general = `Error in ${path.join('.')}: ${message}`;
            } else {
              fieldErrors[field] = message;
            }
          });
          
          // If we have field-specific errors, set them
          if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            
            // Scroll to first error
            const firstErrorField = Object.keys(fieldErrors).find(f => f !== 'general');
            if (firstErrorField) {
              setTimeout(() => {
                const element = document.querySelector(`[data-field="${firstErrorField}"]`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
            }
          } else {
            setErrors({ general: 'Validation failed. Please check all required fields.' });
          }
        } else {
          // General error
          setErrors({ general: errorData.error || 'Failed to create casino' });
        }
      }
    } catch (error) {
      console.error('Error creating casino:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Helper function to clear error when user starts typing
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
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
            <h1 className="text-2xl font-bold text-white tracking-tight">Add New Casino</h1>
            <p className="text-sm text-slate-400 mt-1">Fill in the details below to create a new review.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={saving}
            className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Publish Casino'}
          </button>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, true)}>
        {/* General Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/50 rounded-lg">
            <p className="text-sm text-rose-400">{errors.general}</p>
          </div>
        )}
        
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
                    data-field="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      clearError('name');
                    }}
                    className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-white focus:outline-none ${
                      errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-amber-500'
                    }`}
                    placeholder="Casino Name"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Slug (URL) *</label>
                  <input
                    type="text"
                    required
                    data-field="slug"
                    value={formData.slug}
                    onChange={(e) => {
                      setFormData({ ...formData, slug: e.target.value });
                      clearError('slug');
                    }}
                    className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-white focus:outline-none ${
                      errors.slug ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-amber-500'
                    }`}
                    placeholder="casino-slug"
                  />
                  {errors.slug && (
                    <p className="text-xs text-rose-400 mt-1">{errors.slug}</p>
                  )}
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
                  data-field="rating"
                  value={formData.rating}
                  onChange={(e) => {
                    setFormData({ ...formData, rating: parseFloat(e.target.value) });
                    clearError('rating');
                  }}
                  className={`w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer ${
                    errors.rating ? 'accent-rose-500' : 'accent-amber-500'
                  }`}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0</span>
                  <span>2.5</span>
                  <span>5.0</span>
                </div>
                {errors.rating && (
                  <p className="text-xs text-rose-400 mt-1">{errors.rating}</p>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2">Review Content</h3>
              <div className="border border-white/10 rounded-lg overflow-hidden bg-slate-900">
                <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-slate-800/50">
                  <button type="button" className="p-1.5 hover:bg-white/10 rounded text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                      <path d="M6 12h9"></path>
                    </svg>
                  </button>
                  <button type="button" className="p-1.5 hover:bg-white/10 rounded text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <path d="M14 6l-6 6 6 6"></path>
                    </svg>
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1"></div>
                  <button type="button" className="p-1.5 hover:bg-white/10 rounded text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </button>
                </div>
                <textarea
                  rows={12}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-900 p-4 text-white focus:outline-none resize-none"
                  placeholder="Write the full casino review here..."
                />
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
            <details className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl space-y-4">
              <summary className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2 cursor-pointer">Review Content</summary>
              <div className="space-y-4 pt-4">
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
            </details>

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
              
              {/* Template Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Page Template *</label>
                <select
                  required
                  data-field="template"
                  value={formData.template}
                  onChange={(e) => {
                    setFormData({ ...formData, template: e.target.value });
                    clearError('template');
                  }}
                  className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-white focus:outline-none ${
                    errors.template ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-amber-500'
                  }`}
                >
                  {templates.length === 0 ? (
                    <option value="">Loading templates...</option>
                  ) : (
                    <>
                      <option value="">Select a template</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.component}>
                          {template.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {errors.template && (
                  <p className="text-xs text-rose-400 mt-1">{errors.template}</p>
                )}
              </div>

              {/* Rank Input */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Rank (Optional)</label>
                <input
                  type="number"
                  min="1"
                  data-field="rank"
                  value={formData.rank === null ? '' : formData.rank}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    setFormData({ ...formData, rank: value });
                    clearError('rank');
                  }}
                  className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-white focus:outline-none ${
                    errors.rank ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-amber-500'
                  }`}
                  placeholder="Auto (next available)"
                />
                {errors.rank && (
                  <p className="text-xs text-rose-400 mt-1">{errors.rank}</p>
                )}
                <p className="text-xs text-slate-500 mt-1">Leave empty to use the next available rank</p>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Casino Logo *</label>
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
                        clearError('logo');
                      } else {
                        const error = await res.json();
                        setErrors((prev) => ({ ...prev, logo: error.error || 'Failed to upload image' }));
                      }
                    } catch (error) {
                      console.error('Upload error:', error);
                      setErrors((prev) => ({ ...prev, logo: 'Failed to upload image' }));
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
                {errors.logo && (
                  <p className="text-xs text-rose-400 mt-1">{errors.logo}</p>
                )}
                {!formData.logoUrl && !formData.logo && (
                  <p className="text-xs text-slate-500 mt-1">Logo is required. Upload an image or it will use casino name initials.</p>
                )}
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
    </div>
  );
}

