"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 dark:border-zinc-800">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
