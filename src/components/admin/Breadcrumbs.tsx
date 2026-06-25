"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;

  // Split and filter path parts
  const paths = pathname.split("/").filter((path) => path);

  return (
    <nav className="flex items-center space-x-1.5 text-xs font-medium text-slate-500 dark:text-zinc-400">
      <Link 
        href="/admin" 
        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
      >
        <Home size={12} />
      </Link>

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        
        // Capitalize route names & replace dashes
        const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

        return (
          <React.Fragment key={path}>
            <ChevronRight size={12} className="text-slate-400 dark:text-zinc-600 flex-shrink-0" />
            {isLast ? (
              <span className="text-slate-900 dark:text-zinc-100 font-semibold truncate max-w-[150px]">
                {name}
              </span>
            ) : (
              <Link 
                href={href} 
                className="hover:text-slate-900 dark:hover:text-zinc-100 transition-colors truncate max-w-[120px]"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
