"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function FilterBar({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  className,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(selectedFilters).some((val) => val !== "");

  return (
    <div className={`flex flex-wrap items-center gap-3.5 ${className || ""}`}>
      {/* Label Indicator */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400">
        <Filter size={14} />
        <span>Filters</span>
      </div>

      {/* Dynamic select inputs */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((group) => (
          <select
            key={group.key}
            value={selectedFilters[group.key] || ""}
            onChange={(e) => onFilterChange(group.key, e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm cursor-pointer"
          >
            <option value="">All {group.label}</option>
            {group.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {/* Clear active filter button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent rounded-lg transition-colors focus:outline-none"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
