"use client";

import React from "react";
import { Menu, UserCheck, ShieldAlert } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 relative z-10">
      {/* Left controls: Menu toggle and Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-900 focus:outline-none lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <Breadcrumbs />
        </div>
      </div>

      {/* Right controls: Profile card & System status */}
      <div className="flex items-center gap-4">
        {/* Environment status indicator (Linear style) */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 dark:text-teal-400 dark:bg-teal-950/20 dark:border-teal-900/30">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>Live API Ready</span>
        </div>

        {/* Admin profile drop status */}
        <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300">
          <UserCheck size={14} className="text-teal-600 dark:text-teal-400" />
          <span>Admin Portal</span>
        </div>
      </div>
    </header>
  );
}
