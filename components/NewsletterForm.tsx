"use client";

import { useState } from "react";

interface NewsletterFormProps {
  compact?: boolean;
}

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-amber-500 text-slate-950 px-3 py-2 rounded-lg font-bold text-xs hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-amber-500 text-slate-950 px-3 py-2 rounded-lg font-medium text-sm hover:bg-amber-400 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Go'}
      </button>
    </form>
  );
}

