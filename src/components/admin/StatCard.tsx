"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconClassName?: string;
}

export default function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          {title}
        </span>
        <div className={cn("p-2 rounded-lg bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300", iconClassName)}>
          <Icon size={18} />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
          {value}
        </span>
        {change && (
          <p className="text-xs flex items-center gap-1">
            <span className={cn(
              "font-medium",
              trend === "up" && "text-emerald-600 dark:text-emerald-400",
              trend === "down" && "text-rose-600 dark:text-rose-400",
              trend === "neutral" && "text-slate-400 dark:text-zinc-500"
            )}>
              {change}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
