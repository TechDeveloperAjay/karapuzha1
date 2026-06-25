"use client";

import React from "react";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  loading?: boolean;
  emptyState?: React.ReactNode;
}

export default function DataTable<T>({
  data,
  columns,
  keyExtractor,
  loading = false,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3.5 px-4 font-semibold text-slate-500 dark:text-zinc-400 ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-slate-400 dark:text-zinc-500">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                  <span>Loading records...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center">
                {emptyState || (
                  <span className="text-slate-400 dark:text-zinc-500">No records found.</span>
                )}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={keyExtractor(item)} 
                className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className={`py-3.5 px-4 text-slate-700 dark:text-zinc-300 font-medium ${col.className || ""}`}
                  >
                    {col.cell 
                      ? col.cell(item) 
                      : col.accessorKey 
                        ? String(item[col.accessorKey] ?? "") 
                        : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
