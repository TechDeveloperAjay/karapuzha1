"use client";

import React from "react";
import { 
  BedDouble, 
  CalendarCheck, 
  Image as ImageIcon, 
  FileText, 
  Mail, 
  Clock,
  IndianRupee, 
  TrendingUp, 
  ArrowRight,
  TrendingDown,
  Calendar,
  Percent,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Dummy data imports
import { dummyRooms } from "@/data/rooms";
import { dummyBlogs } from "@/data/blogs";
import { dummyGalleryImages } from "@/data/gallery";
import { dummyBookings } from "@/data/bookings";
import { dummyMessages } from "@/data/messages";

// Reusable components imports
import StatCard from "@/components/admin/StatCard";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminDashboard() {
  // Statistics calculations
  const totalRooms = dummyRooms.length;
  const activeRooms = dummyRooms.filter(r => r.isActive).length;
  const totalGallery = dummyGalleryImages.length;
  const totalBlogs = dummyBlogs.length;
  const totalBookings = dummyBookings.length;
  const totalMessages = dummyMessages.length;

  // Active bookings count for Occupancy
  const activeBookings = dummyBookings.filter(b => b.status === "confirmed" || b.status === "checked_in").length;
  const occupancyRate = totalRooms > 0 ? Math.round((activeBookings / totalRooms) * 100) : 0;

  // Revenue calculations
  const totalRevenue = dummyBookings
    .filter(b => b.status !== "cancelled")
    .reduce((acc, curr) => acc + curr.pricing.totalAmount, 0);

  const collectedRevenue = dummyBookings
    .filter(b => b.status !== "cancelled")
    .reduce((acc, curr) => acc + curr.pricing.paidAmount, 0);

  const pendingRevenue = totalRevenue - collectedRevenue;

  // Recent Bookings columns configuration
  const bookingColumns = [
    {
      header: "Guest",
      cell: (item: typeof dummyBookings[0]) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-zinc-100">{item.guestDetails.fullName}</span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500">{item.bookingReference}</span>
        </div>
      )
    },
    {
      header: "Check In / Out",
      cell: (item: typeof dummyBookings[0]) => (
        <div className="text-xs text-slate-600 dark:text-zinc-400">
          <span>{new Date(item.checkInDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
          <span className="mx-1 text-slate-400">→</span>
          <span>{new Date(item.checkOutDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
        </div>
      )
    },
    {
      header: "Total Price",
      cell: (item: typeof dummyBookings[0]) => (
        <span className="font-semibold text-slate-800 dark:text-zinc-200">
          ₹{item.pricing.totalAmount.toLocaleString("en-IN")}
        </span>
      )
    },
    {
      header: "Status",
      cell: (item: typeof dummyBookings[0]) => <StatusBadge status={item.status} />
    },
    {
      header: "Actions",
      cell: (item: typeof dummyBookings[0]) => (
        <Link 
          href={`/admin/bookings/${item.id}`}
          className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline"
        >
          <span>Manage</span>
          <ArrowRight size={12} />
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
            Welcome back, Admin
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Resort management overview for Karapuzha Water Scapes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-2 p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-sm">
            <Calendar size={14} className="text-teal-500" />
            <span>Today is {new Date().toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <StatCard 
          title="Total Rooms" 
          value={totalRooms} 
          change={`${activeRooms} active rooms`} 
          trend="neutral"
          icon={BedDouble}
          iconClassName="text-blue-500 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20"
        />
        <StatCard 
          title="Occupancy" 
          value={`${occupancyRate}%`} 
          change={`${activeBookings} rooms filled`} 
          trend={occupancyRate > 50 ? "up" : "down"}
          icon={Percent}
          iconClassName="text-emerald-500 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20"
        />
        <StatCard 
          title="Media Library" 
          value={totalGallery} 
          change="Images uploaded" 
          trend="neutral"
          icon={ImageIcon}
          iconClassName="text-purple-500 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/20"
        />
        <StatCard 
          title="Travel Blogs" 
          value={totalBlogs} 
          change="Published guides" 
          trend="neutral"
          icon={FileText}
          iconClassName="text-orange-500 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/20"
        />
        <StatCard 
          title="Bookings Log" 
          value={totalBookings} 
          change="+18% growth" 
          trend="up"
          icon={CalendarCheck}
          iconClassName="text-indigo-500 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/20"
        />
        <StatCard 
          title="Inquiries" 
          value={totalMessages} 
          change="From contact form" 
          trend="neutral"
          icon={Mail}
          iconClassName="text-pink-500 bg-pink-50 dark:text-pink-400 dark:bg-pink-950/20"
        />
      </div>

      {/* Analytical Visual Grids */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Overview (SaaS Style) */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-55">Revenue Analysis</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Total invoice breakdown for Karapuzha Water Scapes</p>
            </div>
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400">
              <IndianRupee size={18} />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-3 border-y border-slate-100 dark:border-zinc-800 py-6">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Total Booked</span>
              <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-zinc-100">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="space-y-1 border-x border-slate-100 dark:border-zinc-800 px-4">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Collected</span>
              <span className="text-lg md:text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                ₹{collectedRevenue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="space-y-1 px-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Outstanding</span>
              <span className="text-lg md:text-xl font-bold text-amber-600 dark:text-amber-400">
                ₹{pendingRevenue.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Visual progress bar bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Collected vs Total Ratio</span>
              <span className="text-teal-600 dark:text-teal-400">
                {totalRevenue > 0 ? Math.round((collectedRevenue / totalRevenue) * 100) : 0}% Collected
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-500 h-full" 
                style={{ width: `${totalRevenue > 0 ? (collectedRevenue / totalRevenue) * 100 : 0}%` }}
              />
              <div 
                className="bg-amber-400 h-full" 
                style={{ width: `${totalRevenue > 0 ? (pendingRevenue / totalRevenue) * 100 : 0}%` }}
              />
            </div>
            <div className="flex gap-4 text-[10px] text-slate-400 dark:text-zinc-500 pt-1">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Settled payments</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Pending balances</span>
            </div>
          </div>
        </div>

        {/* Occupancy and Operational Status */}
        <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-55">Resort Occupancy</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Current live resort operational status</p>
            </div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/25 px-2.5 py-1 rounded-full">
              {occupancyRate > 70 ? "High Demand" : "Normal"}
            </span>
          </div>

          <div className="flex justify-center py-4">
            {/* SaaS Circle progress indicator placeholder */}
            <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-slate-100 dark:border-zinc-800">
              <div className="text-center">
                <span className="text-3xl font-extrabold">{occupancyRate}%</span>
                <p className="text-[10px] font-semibold uppercase text-slate-400 mt-0.5">Occupied</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 dark:border-zinc-800/80">
              <span className="text-slate-500 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Ready to Book Villas</span>
              </span>
              <span className="font-semibold text-slate-800 dark:text-zinc-200">
                {activeRooms - activeBookings} Rooms
              </span>
            </div>
            <div className="flex items-center justify-between text-xs py-1.5">
              <span className="text-slate-500 flex items-center gap-2">
                <AlertCircle size={14} className="text-rose-500" />
                <span>Occupied Villa Cabins</span>
              </span>
              <span className="font-semibold text-slate-800 dark:text-zinc-200">
                {activeBookings} Rooms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings, Inquiries and Blog grids */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Bookings List (takes 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50">Recent Bookings</h3>
            <Link 
              href="/admin/bookings"
              className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All Bookings</span>
              <ArrowRight size={12} />
            </Link>
          </div>
          <DataTable 
            data={dummyBookings.slice(0, 4)} 
            columns={bookingColumns} 
            keyExtractor={(item) => item.id} 
          />
        </div>

        {/* Recent Message Inquiries (takes 1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50">Guest Messages</h3>
            <Link 
              href="/admin/messages"
              className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Inbox</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm p-4 space-y-3.5">
            {dummyMessages.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-zinc-500 text-center py-6">No new messages.</p>
            ) : (
              dummyMessages.slice(0, 3).map((msg) => (
                <div 
                  key={msg.id}
                  className="p-3 border border-slate-100 dark:border-zinc-800/80 rounded-lg space-y-2 hover:border-slate-200 dark:hover:border-zinc-700/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                      {msg.fullName}
                    </span>
                    {msg.status === "unread" ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    ) : (
                      <span className="text-[9px] text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-slate-400" />
                        <span>Replied</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 dark:text-zinc-500">
                    <Clock size={10} />
                    <span>{new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Blog & News Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50">Resort Travel Blogs</h3>
          <Link 
            href="/admin/blogs"
            className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Manage Blogs</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {dummyBlogs.slice(0, 3).map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow"
            >
              {/* Cover Photo */}
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={blog.coverImage.url} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
              </div>

              {/* Contents details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    <span>{blog.tags[0] || "Travel"}</span>
                    <StatusBadge status={blog.status} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-zinc-200 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-zinc-850">
                  {blog.author.avatarUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={blog.author.avatarUrl} 
                      alt={blog.author.name}
                      className="w-6 h-6 rounded-full border border-slate-250 dark:border-zinc-700"
                    />
                  )}
                  <div className="text-[10px]">
                    <p className="font-semibold text-slate-800 dark:text-zinc-200">{blog.author.name}</p>
                    <p className="text-slate-400 dark:text-zinc-550">
                      {blog.publishedAt 
                        ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) 
                        : "Draft"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
