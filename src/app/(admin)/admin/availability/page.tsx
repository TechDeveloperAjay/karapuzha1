"use client";

import React, { useState } from "react";
import { dummyRooms } from "@/data/rooms";
import { dummyBookings } from "@/data/bookings";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { Calendar, Eye, ShieldAlert, CheckCircle } from "lucide-react";

export default function AvailabilityPage() {
  const [roomsList, setRoomsList] = useState(
    dummyRooms.map(room => {
      // Find active reservation bookings checking-in today or overlapping today
      const today = new Date().toISOString().slice(0, 10);
      const activeBooking = dummyBookings.find(b => {
        const checkIn = new Date(b.checkInDate).toISOString().slice(0, 10);
        const checkOut = new Date(b.checkOutDate).toISOString().slice(0, 10);
        return b.room === room.id && today >= checkIn && today < checkOut && b.status !== "cancelled";
      });

      return {
        ...room,
        isOccupiedToday: !!activeBooking,
        currentGuest: activeBooking ? activeBooking.guestDetails.fullName : null,
        bookingRef: activeBooking ? activeBooking.bookingReference : null,
      };
    })
  );

  const handleToggleRoomBlock = (id: string) => {
    setRoomsList(prev =>
      prev.map(r =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      )
    );
  };

  const columns = [
    {
      header: "Cottage Room",
      cell: (item: typeof roomsList[0]) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-zinc-100">{item.title}</span>
          <span className="text-[10px] text-slate-400 capitalize">{item.type.replace(/_/g, " ")}</span>
        </div>
      )
    },
    {
      header: "Today's Occupancy",
      cell: (item: typeof roomsList[0]) => (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
          item.isOccupiedToday 
            ? "text-blue-600 dark:text-blue-400" 
            : "text-emerald-600 dark:text-emerald-400"
        }`}>
          <span className={`w-2 h-2 rounded-full ${item.isOccupiedToday ? "bg-blue-500" : "bg-emerald-500"}`} />
          <span>{item.isOccupiedToday ? "Occupied" : "Vacant / Available"}</span>
        </span>
      )
    },
    {
      header: "Current Guest / Active Logs",
      cell: (item: typeof roomsList[0]) => (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
            {item.currentGuest || "—"}
          </span>
          {item.bookingRef && (
            <span className="text-[10px] text-slate-400 dark:text-zinc-550">{item.bookingRef}</span>
          )}
        </div>
      )
    },
    {
      header: "Reservation Status",
      cell: (item: typeof roomsList[0]) => (
        <StatusBadge status={item.isActive ? "published" : "cancelled"} />
      )
    },
    {
      header: "Block Operations",
      cell: (item: typeof roomsList[0]) => (
        <button
          onClick={() => handleToggleRoomBlock(item.id)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            item.isActive
              ? "text-rose-600 border-rose-200 bg-rose-50/50 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-900/30 dark:bg-rose-950/20"
              : "text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-900/30 dark:bg-emerald-950/20"
          }`}
        >
          {item.isActive ? "Block Room" : "Unblock Room"}
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Live Availability Console" 
        description="Block cottage listings from incoming public reservations or audit today's checkout schedules."
      />

      <div className="flex items-center gap-3 p-4 bg-amber-50/50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30 rounded-xl text-xs text-amber-800 dark:text-amber-300">
        <ShieldAlert size={18} className="flex-shrink-0" />
        <p className="leading-relaxed">
          <strong>Operational Notice:</strong> Blocking a room prevents online check-ins from that day forward. Current booked residents will not be impacted, but check-ins will be blacked-out for future bookings.
        </p>
      </div>

      <DataTable 
        data={roomsList} 
        columns={columns} 
        keyExtractor={(item) => item.id} 
      />
    </div>
  );
}
