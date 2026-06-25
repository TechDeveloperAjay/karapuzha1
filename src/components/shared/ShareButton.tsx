"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 text-xs font-semibold text-zinc-650 dark:text-zinc-350 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check size={13} className="text-emerald-500" />
          <span className="text-emerald-500">Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={13} />
          <span>Copy Link</span>
        </>
      )}
    </button>
  );
}
