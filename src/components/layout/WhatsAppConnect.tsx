"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppConnect() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <Link 
          href="https://wa.me/918129167333" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-zinc-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 hover:bg-zinc-50 transition-colors border border-zinc-100 w-48"
        >
          <MessageCircle className="text-[#25D366] w-5 h-5" />
          <span className="font-medium text-sm">+91 98765 43210</span>
        </Link>
        <Link 
          href="https://wa.me/919876543211" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-zinc-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 hover:bg-zinc-50 transition-colors border border-zinc-100 w-48"
        >
          <MessageCircle className="text-[#25D366] w-5 h-5" />
          <span className="font-medium text-sm">+91 98765 43211</span>
        </Link>
      </div>
      
      <button 
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center focus:outline-none"
        aria-label="Connect on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
}
