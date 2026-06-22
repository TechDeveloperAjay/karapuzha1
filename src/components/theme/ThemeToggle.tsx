"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() =>
        setTheme(current === "dark" ? "light" : "dark")
      }
      className="
        relative w-12 h-12 flex items-center justify-center
        rounded-full
        bg-white dark:bg-[#111827]
        border border-zinc-200 dark:border-white/10
        shadow-md
        transition-all duration-300
        hover:scale-105 hover:shadow-lg
      "
      aria-label="Toggle Theme"
    >
      {/* Sun Icon */}
      <Sun
        className={`
          absolute h-5 w-5 text-yellow-500 transition-all duration-300
          ${current === "dark" ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0"}
        `}
      />

      {/* Moon Icon */}
      <Moon
        className={`
          absolute h-5 w-5 text-blue-200 transition-all duration-300
          ${current === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-90"}
        `}
      />
    </button>
  );
}