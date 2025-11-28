"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const requestBody = { username: username.trim(), password };
      console.log('Sending login request:', { username: requestBody.username, passwordLength: requestBody.password.length });

      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('Login response:', { status: res.status, data });

      if (res.ok && data.success) {
        // Wait a moment to ensure cookie is set, then redirect
        const redirect = searchParams.get('redirect') || '/admin';
        setTimeout(() => {
          window.location.href = redirect;
        }, 200);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-slate-950 font-bold text-lg tracking-tighter">P</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">PRIME<span className="text-slate-500">BET</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400">Sign in to manage your casino reviews</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-white/5 rounded-xl p-8 space-y-6">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center">
            <Link href="/" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
              ← Back to Homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

