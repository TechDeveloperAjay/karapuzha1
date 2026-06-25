"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import TopNavbar from "@/components/admin/TopNavbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Completely bypass layout structure on login path
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-100 overflow-hidden">
      {/* Desktop Collapsible Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Mobile Slider Sidebar */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Panel Viewport */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Control Navbar */}
        <TopNavbar onMenuClick={() => setMobileOpen(true)} />

        {/* Scrollable Dashboard Frame */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-50/50 dark:bg-zinc-950/20">
          {children}
        </main>
      </div>
    </div>
  );
}
