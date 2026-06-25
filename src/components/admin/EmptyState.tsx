"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-16 bg-white dark:bg-zinc-900 border border-dashed border-slate-200 dark:border-zinc-805 rounded-xl shadow-sm space-y-4 max-w-lg mx-auto">
      <div className="p-3.5 rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500">
        <Icon size={24} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-slate-950 dark:text-zinc-50">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs leading-relaxed">
          {description}
        </p>
      </div>
      {action && (
        <div className="pt-2">
          {action}
        </div>
      )}
    </div>
  );
}
