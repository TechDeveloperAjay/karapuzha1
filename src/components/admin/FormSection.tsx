"use client";

import React from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 py-6 border-b border-slate-200 dark:border-zinc-800 last:border-0">
      {/* Side descriptions */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Inputs container */}
      <div className="md:col-span-2 space-y-4">
        <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 rounded-xl shadow-sm space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
