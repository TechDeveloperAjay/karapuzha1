"use client";

import React, { useState } from "react";
import { dummyBookings } from "@/data/bookings";
import { dummyRooms } from "@/data/rooms";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import SearchBar from "@/components/admin/SearchBar";
import FilterBar from "@/components/admin/FilterBar";

export default function BookingsPage() {
  const [bookings, setBookings] = useState(dummyBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "checked_in", label: "Checked In" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const roomOptions = dummyRooms.map(r => ({
    value: r.id,
    label: r.title
  }));

  const filters = [
    { key: "status", label: "Statuses", options: statusOptions },
    { key: "room", label: "Rooms", options: roomOptions }
  ];

  // Filtering calculations
  const filteredBookings = bookings.filter(book => {
    const matchesSearch = 
      book.guestDetails.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.guestDetails.phone.includes(searchQuery);

    const matchesStatus = selectedStatus === "" || book.status === selectedStatus;

    // Room can be string (id) or IRoom object
    const roomId = typeof book.room === "string" ? book.room : book.room.id;
    const matchesRoom = selectedRoom === "" || roomId === selectedRoom;

    return matchesSearch && matchesStatus && matchesRoom;
  });

  const handleFilterChange = (key: string, value: string) => {
    if (key === "status") setSelectedStatus(value);
    if (key === "room") setSelectedRoom(value);
  };

  const handleClearFilters = () => {
    setSelectedStatus("");
    setSelectedRoom("");
    setSearchQuery("");
  };

  const columns = [
    {
      header: "Booking ID",
      accessorKey: "bookingReference" as const,
      className: "font-semibold text-slate-900 dark:text-zinc-100"
    },
    {
      header: "Guest Details",
      cell: (item: typeof dummyBookings[0]) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 dark:text-zinc-200">{item.guestDetails.fullName}</span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-550">{item.guestDetails.phone} | {item.guestDetails.email}</span>
        </div>
      )
    },
    {
      header: "Cottage Room",
      cell: (item: typeof dummyBookings[0]) => {
        const roomId = typeof item.room === "string" ? item.room : item.room.id;
        const roomObj = dummyRooms.find(r => r.id === roomId);
        return (
          <span className="text-xs font-semibold text-slate-700 dark:text-zinc-350">
            {roomObj?.title || "Unknown Villa"}
          </span>
        );
      }
    },
    {
      header: "Check-In",
      cell: (item: typeof dummyBookings[0]) => (
        <span className="text-xs text-slate-600 dark:text-zinc-400">
          {new Date(item.checkInDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      )
    },
    {
      header: "Check-Out",
      cell: (item: typeof dummyBookings[0]) => (
        <span className="text-xs text-slate-600 dark:text-zinc-400">
          {new Date(item.checkOutDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      )
    },
    {
      header: "Guests Count",
      cell: (item: typeof dummyBookings[0]) => (
        <span className="text-xs text-slate-600 dark:text-zinc-400">
          {item.totalGuests.adults} Adults {item.totalGuests.children > 0 && `, ${item.totalGuests.children} Kids`}
        </span>
      )
    },
    {
      header: "Status",
      cell: (item: typeof dummyBookings[0]) => <StatusBadge status={item.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reservations Ledger" 
        description="Search, filter, and audit all customer villa booking logs."
      />

      {/* Search & Filter tools */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-zinc-900 p-4 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search by name or Reference ID..." 
        />
        <FilterBar 
          filters={filters} 
          selectedFilters={{ status: selectedStatus, room: selectedRoom }} 
          onFilterChange={handleFilterChange} 
          onClearFilters={handleClearFilters} 
        />
      </div>

      <DataTable 
        data={filteredBookings} 
        columns={columns} 
        keyExtractor={(item) => item.id} 
      />
    </div>
  );
}
