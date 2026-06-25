"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import { dummyRooms } from "@/data/rooms";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function RoomsListPage() {
  const [rooms, setRooms] = useState(dummyRooms);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleToggleStatus = (id: string) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === id ? { ...room, isActive: !room.isActive } : room
      )
    );
  };

  const handleDelete = () => {
    if (deleteId) {
      setRooms(prev => prev.filter(room => room.id !== deleteId));
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: "Image",
      cell: (item: typeof dummyRooms[0]) => (
        <div className="w-12 h-8 rounded bg-slate-100 dark:bg-zinc-800 overflow-hidden relative border border-slate-200 dark:border-zinc-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={item.images[0]?.url || "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=150"} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      header: "Name",
      cell: (item: typeof dummyRooms[0]) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-zinc-100">{item.title}</span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500">/{item.slug}</span>
        </div>
      )
    },
    {
      header: "Category",
      cell: (item: typeof dummyRooms[0]) => (
        <span className="capitalize text-xs text-slate-600 dark:text-zinc-400">
          {item.type.replace(/_/g, " ")}
        </span>
      )
    },
    {
      header: "Base Price",
      cell: (item: typeof dummyRooms[0]) => (
        <span className="font-bold text-slate-800 dark:text-zinc-200">
          ₹{item.basePrice.toLocaleString("en-IN")}
        </span>
      )
    },
    {
      header: "Capacity",
      cell: (item: typeof dummyRooms[0]) => (
        <span className="text-xs text-slate-600 dark:text-zinc-400">
          {item.capacity.min} - {item.capacity.max} Guests
        </span>
      )
    },
    {
      header: "Status",
      cell: (item: typeof dummyRooms[0]) => (
        <StatusBadge status={item.isActive ? "confirmed" : "cancelled"} className="text-[10px]" />
      )
    },
    {
      header: "Actions",
      cell: (item: typeof dummyRooms[0]) => (
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/rooms/${item.id}`}
            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Edit size={14} />
          </Link>
          <button 
            onClick={() => handleToggleStatus(item.id)}
            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            title={item.isActive ? "Deactivate Room" : "Activate Room"}
          >
            {item.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button 
            onClick={() => setDeleteId(item.id)}
            className="p-1 rounded text-rose-500 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Rooms Inventory" 
        description="Configure luxury waterfront room villas, standard pricing packages, and amenities details."
        actions={
          <Link 
            href="/admin/rooms/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors"
          >
            <Plus size={14} />
            <span>Add New Room</span>
          </Link>
        }
      />

      <DataTable 
        data={rooms} 
        columns={columns} 
        keyExtractor={(item) => item.id} 
      />

      <ConfirmDialog 
        isOpen={deleteId !== null} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        title="Delete Room Listing" 
        description="Are you absolutely sure you want to delete this room listing? This action cannot be undone and will delete all photos and metadata associated with it."
      />
    </div>
  );
}
