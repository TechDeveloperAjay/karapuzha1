"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BedDouble, 
  Image as ImageIcon, 
  FileText, 
  CalendarCheck, 
  Calendar, 
  Mail, 
  Settings as SettingsIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { logoutAdmin } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Availability", href: "/admin/availability", icon: Calendar },
    { name: "Messages", href: "/admin/messages", icon: Mail },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  return (
    <aside 
      className={`hidden lg:flex flex-col h-screen bg-zinc-950 border-r border-zinc-800 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800">
        {!collapsed && (
          <span className="text-sm font-semibold tracking-widest uppercase text-zinc-100 bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
            WATER SCAPES
          </span>
        )}
        {collapsed && (
          <span className="text-xs font-bold text-teal-400 mx-auto">WS</span>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 group ${
                isActive 
                  ? "text-zinc-50 bg-zinc-800 border-l-2 border-teal-500" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border-l-2 border-transparent"
              }`}
            >
              <Icon size={18} className={`flex-shrink-0 transition-colors ${isActive ? "text-teal-400" : "text-zinc-400 group-hover:text-zinc-100"}`} />
              {!collapsed && <span className="truncate">{item.name}</span>}
              {collapsed && (
                <div className="absolute left-16 scale-0 group-hover:scale-100 bg-zinc-900 text-zinc-100 text-xs rounded py-1 px-2.5 shadow-md border border-zinc-800 transition-all origin-left z-30">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin Profile & Logout */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900/30">
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800">
              <div className="p-1.5 rounded bg-zinc-800 border border-zinc-700 text-teal-400">
                <UserCheck size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-200 truncate">Administrator</p>
                <p className="text-[10px] text-zinc-500 truncate">admin@karapuzha.com</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 rounded-md transition-all"
            >
              <LogOut size={14} />
              <span>Logout Panel</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="p-1.5 rounded bg-zinc-900 border border-zinc-850 text-teal-400 cursor-pointer group relative">
              <UserCheck size={16} />
              <div className="absolute left-16 bottom-0 scale-0 group-hover:scale-100 bg-zinc-900 text-zinc-100 text-xs rounded py-1.5 px-3.5 shadow-md border border-zinc-800 transition-all origin-left z-30">
                <p className="font-semibold">Administrator</p>
                <p className="text-[10px] text-zinc-500">admin@karapuzha.com</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-md transition-colors group relative"
            >
              <LogOut size={16} />
              <div className="absolute left-16 scale-0 group-hover:scale-100 bg-zinc-900 text-zinc-100 text-xs rounded py-1 px-2.5 shadow-md border border-zinc-800 transition-all origin-left z-30">
                Logout
              </div>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
