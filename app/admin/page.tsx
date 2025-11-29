"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  casinos: number;
  templates: number;
  articles: number;
  subscribers: number;
}

interface RecentActivity {
  id: string;
  type: 'casino' | 'article' | 'template';
  name: string;
  action: string;
  time: string;
  status?: 'live' | 'pending' | 'draft';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    casinos: 0,
    templates: 0,
    articles: 0,
    subscribers: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/casinos').then((r) => r.json()),
      fetch('/api/admin/templates').then((r) => r.json()),
      fetch('/api/admin/articles').then((r) => r.json()),
      fetch('/api/admin/newsletter').then((r) => r.json()),
    ])
      .then(([casinos, templates, articles, newsletter]) => {
        const casinoCount = casinos.casinos?.length || 0;
        const templateCount = templates.templates?.length || 0;
        const articleCount = articles.articles?.length || 0;
        const subscriberCount = newsletter.subscribers?.length || 0;

        setStats({
          casinos: casinoCount,
          templates: templateCount,
          articles: articleCount,
          subscribers: subscriberCount,
        });

        // Build recent activity from latest items
        const activities: RecentActivity[] = [];
        
        // Add recent casinos
        if (casinos.casinos && casinos.casinos.length > 0) {
          const recentCasinos = casinos.casinos
            .slice(0, 2)
            .map((c: any) => ({
              id: c.id,
              type: 'casino' as const,
              name: c.name,
              action: 'Added',
              time: new Date(c.createdAt).toLocaleDateString(),
              status: c.isActive ? 'live' as const : 'pending' as const,
            }));
          activities.push(...recentCasinos);
        }

        // Add recent articles
        if (articles.articles && articles.articles.length > 0) {
          const recentArticles = articles.articles
            .slice(0, 1)
            .map((a: any) => ({
              id: a.id,
              type: 'article' as const,
              name: a.title,
              action: 'New Post',
              time: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : 'Draft',
              status: a.publishedAt ? 'live' as const : 'draft' as const,
            }));
          activities.push(...recentArticles);
        }

        setRecentActivity(activities.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-900 border border-white/10 text-slate-300 text-sm rounded-lg p-2.5 focus:ring-amber-500 focus:border-amber-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold py-2 px-4 rounded-lg text-sm flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 - Total Casinos */}
        <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-amber-500">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-400">Total Casinos</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">{stats.casinos}</h3>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              +{Math.floor(stats.casinos * 0.1)}
            </span>
          </div>
        </div>

        {/* Stat Card 2 - Total Clicks (Mock) */}
        <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-indigo-500">
              <path d="M7 13l3 3 7-7"></path>
              <path d="M10.5 21a2.5 2.5 0 0 1-2.45-2h9a2.5 2.5 0 0 1 2.45 2"></path>
              <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"></path>
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-400">Total Clicks</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">24.5k</h3>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              +12%
            </span>
          </div>
        </div>

        {/* Stat Card 3 - Registrations (Mock) */}
        <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-blue-500">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-400">Registrations (FTDs)</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">892</h3>
            <span className="text-xs font-medium text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                <polyline points="16 17 22 17 22 11"></polyline>
              </svg>
              -2.4%
            </span>
          </div>
        </div>

        {/* Stat Card 4 - Est. Revenue (Mock) */}
        <div className="bg-slate-900/70 backdrop-blur border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-emerald-500">
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-400">Est. Revenue</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold text-white">$42,500</h3>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              +8.1%
            </span>
          </div>
        </div>
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="bg-slate-900/70 backdrop-blur border border-white/5 rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Traffic & Conversion</h3>
            <button className="text-slate-500 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
          <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
            {/* Simulated Chart Bars */}
            {[40, 65, 55, 80, 60, 90, 75].map((height, idx) => (
              <div
                key={idx}
                className={`w-full rounded-t-sm hover:bg-amber-500/20 transition-all relative group ${
                  idx === 6 ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-800/50'
                }`}
                style={{ height: `${height}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded border border-white/10 whitespace-nowrap">
                  {height}%
                </div>
                {idx === 6 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-xs py-1 px-2 rounded">
                    Today
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 uppercase font-medium">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/70 backdrop-blur border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Additions</h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  {activity.type === 'casino' ? (
                    <div className="w-10 h-10 rounded bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {activity.name.substring(0, 3).toUpperCase()}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-indigo-900/30 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" x2="8" y1="13" y2="13"></line>
                        <line x1="16" x2="8" y1="17" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">{activity.name}</h4>
                    <p className="text-xs text-slate-500">{activity.action} by Admin • {activity.time}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      activity.status === 'live'
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : activity.status === 'pending'
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-slate-400 bg-slate-700/30'
                    }`}
                  >
                    {activity.status === 'live' ? 'Live' : activity.status === 'pending' ? 'Pending' : 'Draft'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-500">No recent activity</div>
            )}
          </div>
          <Link
            href="/admin/casinos"
            className="w-full mt-6 py-2 rounded-lg border border-white/10 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors block text-center"
          >
            View All Activity
          </Link>
        </div>
      </div>
    </div>
  );
}
