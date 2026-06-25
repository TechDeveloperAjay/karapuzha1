"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between py-4 border-t border-slate-200 dark:border-zinc-800/80 ${className || ""}`}>
      {/* Short count indicator */}
      <div className="text-xs text-slate-500 dark:text-zinc-400">
        Page <span className="font-semibold text-slate-900 dark:text-zinc-200">{currentPage}</span> of{" "}
        <span className="font-semibold text-slate-900 dark:text-zinc-200">{totalPages}</span>
      </div>

      {/* Button Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-slate-250 dark:border-zinc-700 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors focus:outline-none"
        >
          <ChevronLeft size={14} />
          <span>Previous</span>
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-slate-250 dark:border-zinc-700 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors focus:outline-none"
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
