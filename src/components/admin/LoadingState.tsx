"use client";

import React from "react";

interface LoadingStateProps {
  rows?: number;
  className?: string;
}

export default function LoadingState({ rows = 4, className }: LoadingStateProps) {
  return (
    <div className={`space-y-4 w-full ${className || ""}`}>
      {/* Grid of Skeleton bars */}
      <div className="flex items-center space-x-4 w-full">
        <div className="h-6 w-1/3 bg-slate-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-6 w-1/4 bg-slate-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-6 w-1/5 bg-slate-200 dark:bg-zinc-800 rounded animate-pulse flex-grow" />
      </div>
      
      <div className="space-y-2.5 pt-4">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="flex items-center space-x-4 w-full py-1.5">
            <div className="h-4 w-8 bg-slate-200 dark:bg-zinc-850 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-zinc-850 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-slate-200 dark:bg-zinc-850 rounded animate-pulse" />
            <div className="h-4 w-12 bg-slate-200 dark:bg-zinc-850 rounded animate-pulse ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
