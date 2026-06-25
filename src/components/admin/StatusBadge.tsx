"use client";

import React from "react";
import { cn } from "@/lib/utils";

type StatusType = 
  | "pending" 
  | "confirmed" 
  | "checked_in" 
  | "completed" 
  | "cancelled"
  | "paid"
  | "partially_paid"
  | "refunded"
  | "draft"
  | "published";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStyles = (val: string) => {
    switch (val.toLowerCase()) {
      case "confirmed":
      case "paid":
      case "published":
        return "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/20 dark:border-emerald-900/30";
      
      case "pending":
      case "partially_paid":
        return "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-900/30";
      
      case "checked_in":
        return "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-900/30";
      
      case "completed":
        return "text-slate-600 bg-slate-50 border-slate-200 dark:text-zinc-400 dark:bg-zinc-800/30 dark:border-zinc-800";
      
      case "cancelled":
      case "refunded":
        return "text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/20 dark:border-rose-900/30";
      
      case "draft":
        return "text-zinc-500 bg-zinc-50 border-zinc-200 dark:text-zinc-500 dark:bg-zinc-900/20 dark:border-zinc-850";
      
      default:
        return "text-slate-600 bg-slate-50 border-slate-200 dark:text-zinc-400 dark:bg-zinc-900/20 dark:border-zinc-800";
    }
  };

  const label = status.replace(/_/g, " ");

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize tracking-wide select-none",
      getStyles(status),
      className
    )}>
      {label}
    </span>
  );
}
