"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Bonus {
  id: string;
  title: string;
  slug: string;
  casinoName: string;
  amount: string;
  type: string;
  isActive: boolean;
  isExclusive: boolean;
  isHotPick: boolean;
}

export default function BonusesPage() {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/bonuses', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setBonuses(data.bonuses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bonus?')) return;

    try {
      const res = await fetch(`/api/admin/bonuses/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setBonuses(bonuses.filter((b) => b.id !== id));
      } else {
        alert('Failed to delete bonus');
      }
    } catch (error) {
      alert('Error deleting bonus');
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'welcome': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'reload': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'cashback': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'no-deposit': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      'free-spins': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      'crypto': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'high-roller': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };
    return colors[type] || 'bg-slate-800 text-slate-400 border-white/5';
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
        <h1 className="text-3xl font-bold text-white">Bonuses</h1>
        <Link
          href="/admin/bonuses/new"
          className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
        >
          Add New Bonus
        </Link>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 border-b border-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Casino</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bonuses.map((bonus) => (
              <tr key={bonus.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-white">{bonus.title}</div>
                    {bonus.isExclusive && (
                      <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold rounded border border-amber-500/20">
                        EX
                      </span>
                    )}
                    {bonus.isHotPick && (
                      <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded border border-blue-500/20">
                        HOT
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{bonus.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {bonus.casinoName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-400">
                  {bonus.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(bonus.type)}`}>
                    {bonus.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    bonus.isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 border border-white/5'
                  }`}>
                    {bonus.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/bonuses/${bonus.id}/edit`}
                      className="text-amber-400 hover:text-amber-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(bonus.id)}
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

        {bonuses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No bonuses found.</p>
            <Link
              href="/admin/bonuses/new"
              className="text-amber-400 hover:text-amber-300"
            >
              Create your first bonus
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

