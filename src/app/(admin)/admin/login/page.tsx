"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@karapuzha.com");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Frontend-only login bypass: writes cookie so middleware lets us in
    setTimeout(() => {
      document.cookie = "admin_session=mock_bypass_token; path=/; max-age=86400;";
      router.push("/admin");
    }, 800);
  };

  return (
    <div 
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-12 font-sans"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200')"
      }}
    >
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-md space-y-8 bg-zinc-950/40 dark:bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-30" />

        <div className="text-center relative z-10 space-y-1.5">
          <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-teal-400 mb-2">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Water Scapes Admin
          </h2>
          <p className="text-xs text-zinc-300">
            Resort Administrative Console Gate
          </p>
        </div>

        <form className="mt-8 space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider block">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  placeholder="admin@karapuzha.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider block">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/10 bg-black/50 text-teal-600 focus:ring-teal-500 h-4 w-4"
              />
              <span>Remember Me</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-teal-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" size={18} />
              ) : (
                "Bypass & Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
