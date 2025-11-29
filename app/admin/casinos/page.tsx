"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CasinoLogo from "@/components/CasinoLogo";

interface Casino {
  id: string;
  slug: string;
  name: string;
  logo: string;
  rating: number;
  isActive: boolean;
  rank: number | null;
}

export default function CasinosPage() {
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/casinos')
      .then((res) => res.json())
      .then((data) => {
        setCasinos(data.casinos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this casino?')) return;

    const res = await fetch(`/api/admin/casinos/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setCasinos(casinos.filter((c) => c.id !== id));
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
        <h1 className="text-3xl font-bold text-white">Casinos</h1>
        <Link
          href="/admin/casinos/new"
          className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
        >
          Add New Casino
        </Link>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 border-b border-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {casinos.map((casino) => (
              <tr key={casino.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {casino.rank || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <CasinoLogo logo={casino.logo} name={casino.name} size="small" />
                    <div>
                      <div className="text-sm font-medium text-white">{casino.name}</div>
                      <div className="text-xs text-slate-500">{casino.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {casino.rating}/5
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    casino.isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 border border-white/5'
                  }`}>
                    {casino.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/casinos/${casino.id}/edit`}
                      className="text-amber-400 hover:text-amber-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(casino.id)}
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

        {casinos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No casinos found.</p>
            <Link
              href="/admin/casinos/new"
              className="text-amber-400 hover:text-amber-300"
            >
              Create your first casino
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

