"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Casino {
  id: string;
  slug: string;
  name: string;
  logo: string;
  rating: number;
}

export default function NewBonusPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [selectedCasinoId, setSelectedCasinoId] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    casinoId: '',
    casinoSlug: '',
    casinoName: '',
    casinoLogo: '',
    casinoRating: 4.5,
    amount: '',
    type: 'welcome',
    wagering: '',
    minDeposit: '',
    code: '',
    expiry: '',
    isExclusive: false,
    isHotPick: false,
    isActive: true,
    provider: '',
    features: [] as string[],
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    // Fetch casinos for dropdown
    fetch('/api/admin/casinos', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setCasinos(data.casinos || []);
      })
      .catch(() => {});
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleCasinoSelect = (casinoId: string) => {
    const casino = casinos.find((c) => c.id === casinoId);
    if (casino) {
      setFormData({
        ...formData,
        casinoId: casino.id,
        casinoSlug: casino.slug,
        casinoName: casino.name,
        casinoLogo: casino.logo,
        casinoRating: casino.rating,
      });
      setSelectedCasinoId(casinoId);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    });
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
    if (!formData.casinoName.trim()) {
      newErrors.casinoName = 'Casino name is required';
    }
    if (!formData.amount.trim()) {
      newErrors.amount = 'Bonus amount is required';
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Bonus type is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.keys(newErrors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/admin/bonuses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          expiry: formData.expiry || undefined,
          casinoId: formData.casinoId || undefined,
        }),
      });

      if (res.ok) {
        router.push('/admin/bonuses');
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
          alert(data.error || 'Failed to create bonus');
        }
      }
    } catch (error) {
      alert('Error creating bonus');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/admin/bonuses" className="text-amber-400 hover:text-amber-300 text-sm mb-4 inline-block">
          ← Back to Bonuses
        </Link>
        <h1 className="text-3xl font-bold text-white">Create Bonus</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-white/5 rounded-xl p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title * <span className="text-xs text-slate-500">(e.g., "100% Up To $2,500 + 50 Free Spins")</span>
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
              placeholder="100% Up To $2,500 + 50 Free Spins"
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
              placeholder="bonus-slug"
            />
            {errors.slug && (
              <p className="text-rose-400 text-xs mt-1">{errors.slug}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Select Casino (Optional)
          </label>
          <select
            value={selectedCasinoId}
            onChange={(e) => handleCasinoSelect(e.target.value)}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
          >
            <option value="">-- Select a casino or enter manually --</option>
            {casinos.map((casino) => (
              <option key={casino.id} value={casino.id}>
                {casino.name} ({casino.rating}/5)
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">Selecting a casino will auto-fill casino details below</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Casino Name *
            </label>
            <input
              id="casinoName"
              type="text"
              required
              value={formData.casinoName}
              onChange={(e) => setFormData({ ...formData, casinoName: e.target.value })}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.casinoName
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
              placeholder="Casino Name"
            />
            {errors.casinoName && (
              <p className="text-rose-400 text-xs mt-1">{errors.casinoName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Casino Logo *
            </label>
            <input
              type="text"
              required
              value={formData.casinoLogo}
              onChange={(e) => setFormData({ ...formData, casinoLogo: e.target.value })}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.casinoLogo
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
              placeholder="/uploads/casinos/logo.png or CASINO"
            />
            <p className="text-xs text-slate-500 mt-1">Image URL or text (e.g., "CASINO")</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Casino Rating (0-5) *
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              required
              value={formData.casinoRating}
              onChange={(e) => setFormData({ ...formData, casinoRating: parseFloat(e.target.value) })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Casino Slug (for review link)
            </label>
            <input
              type="text"
              value={formData.casinoSlug}
              onChange={(e) => setFormData({ ...formData, casinoSlug: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="casino-slug"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bonus Amount * <span className="text-xs text-slate-500">(e.g., "$2,500", "100%", "50 Free Spins")</span>
            </label>
            <input
              id="amount"
              type="text"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.amount
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
              placeholder="$2,500"
            />
            {errors.amount && (
              <p className="text-rose-400 text-xs mt-1">{errors.amount}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bonus Type *
            </label>
            <select
              id="type"
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className={`w-full bg-slate-800 border rounded-lg px-4 py-2 text-white focus:outline-none transition-colors ${
                errors.type
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-white/10 focus:border-amber-500/50'
              }`}
            >
              <option value="welcome">Welcome</option>
              <option value="reload">Reload</option>
              <option value="cashback">Cashback</option>
              <option value="no-deposit">No Deposit</option>
              <option value="free-spins">Free Spins</option>
              <option value="crypto">Crypto</option>
              <option value="high-roller">High Roller</option>
            </select>
            {errors.type && (
              <p className="text-rose-400 text-xs mt-1">{errors.type}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Wagering <span className="text-xs text-slate-500">(e.g., "35x (B+D)", "None", "40x")</span>
            </label>
            <input
              type="text"
              value={formData.wagering}
              onChange={(e) => setFormData({ ...formData, wagering: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="35x (B+D)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Min Deposit <span className="text-xs text-slate-500">(e.g., "$20", "$10")</span>
            </label>
            <input
              type="text"
              value={formData.minDeposit}
              onChange={(e) => setFormData({ ...formData, minDeposit: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="$20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bonus Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="PRIME20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Game Provider <span className="text-xs text-slate-500">(e.g., "Pragmatic Play")</span>
            </label>
            <input
              type="text"
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="Pragmatic Play"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Features <span className="text-xs text-slate-500">(e.g., "Instant Payouts", "Crypto Only")</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
              placeholder="Enter feature and press Enter"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white hover:bg-slate-700 transition-colors"
            >
              Add
            </button>
          </div>
          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800 border border-white/10 rounded-lg text-sm text-slate-300"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isExclusive}
              onChange={(e) => setFormData({ ...formData, isExclusive: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-300">Exclusive</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isHotPick}
              onChange={(e) => setFormData({ ...formData, isHotPick: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-300">Hot Pick</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-300">Active</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Bonus'}
          </button>
          <Link
            href="/admin/bonuses"
            className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

