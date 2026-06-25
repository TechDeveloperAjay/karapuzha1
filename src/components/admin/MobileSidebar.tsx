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
  X,
  UserCheck
} from "lucide-react";
import { logoutAdmin } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative flex flex-col w-72 max-w-xs h-full bg-zinc-950 border-r border-zinc-800 p-4 transition-transform z-10">
        {/* Close Button */}
        <div className="flex items-center justify-between h-12 mb-4">
          <span className="text-sm font-semibold tracking-widest text-zinc-100 uppercase">
            WATER SCAPES
          </span>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-150 ${
                  isActive 
                    ? "text-zinc-50 bg-zinc-800 border-l-2 border-teal-500" 
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border-l-2 border-transparent"
                }`}
              >
                <Icon size={18} className={isActive ? "text-teal-400" : "text-zinc-400"} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer User Profile & Logout */}
        <div className="mt-auto pt-4 border-t border-zinc-800 space-y-3 bg-zinc-900/30 -mx-4 px-4 pb-2">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/50 border border-zinc-850">
            <div className="p-1.5 rounded bg-zinc-800 border border-zinc-700 text-teal-400">
              <UserCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-200">Administrator</p>
              <p className="text-[10px] text-zinc-500">admin@karapuzha.com</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 rounded-lg transition-all"
          >
            <LogOut size={16} />
            <span>Logout Panel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
