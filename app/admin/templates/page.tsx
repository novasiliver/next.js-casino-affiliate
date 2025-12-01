"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  slug: string;
  component: string;
  category: string;
  description: string | null;
  isActive: boolean;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/templates')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data.templates || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the template "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setTemplates(templates.filter((t) => t.id !== id));
      } else {
        const data = await res.json().catch(() => ({ error: 'Failed to delete template' }));
        if (res.status === 409 && data.casinos) {
          // Template is in use by casinos
          const casinoList = data.casinos.map((c: any) => `- ${c.name} (${c.slug})`).join('\n');
          alert(`${data.error}\n\nCasinos using this template:\n${casinoList}`);
        } else {
          alert(data.error || 'Failed to delete template');
        }
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Error deleting template');
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
        <h1 className="text-3xl font-bold text-white">Templates</h1>
        <Link
          href="/admin/templates/new"
          className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
        >
          Add New Template
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-slate-900 border border-white/5 rounded-xl p-6 hover:border-amber-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-slate-400">{template.slug}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                template.isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border border-white/5'
              }`}>
                {template.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            {template.description && (
              <p className="text-sm text-slate-400 mb-4">{template.description}</p>
            )}
            <div className="text-xs text-slate-500 mb-2">Category: {template.category}</div>
            <div className="text-xs text-slate-500 mb-4">Component: {template.component}</div>
            <div className="flex items-center justify-between">
              <Link
                href={`/admin/templates/${template.id}/edit`}
                className="text-amber-400 hover:text-amber-300 text-sm"
              >
                Edit Template →
              </Link>
              <button
                onClick={() => handleDelete(template.id, template.name)}
                className="text-rose-400 hover:text-rose-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">No templates found.</p>
          <Link
            href="/admin/templates/new"
            className="text-amber-400 hover:text-amber-300"
          >
            Create your first template
          </Link>
        </div>
      )}
    </div>
  );
}

