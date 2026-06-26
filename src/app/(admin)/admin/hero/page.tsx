"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getHeroSlides, deleteHeroSlide } from "@/actions/hero";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function HeroSlidesListPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch hero slides on component mount
  useEffect(() => {
    async function loadSlides() {
      const data = await getHeroSlides(false); // Fetch both active and inactive slides
      setSlides(data);
      setIsLoading(false);
    }
    loadSlides();
  }, []);

  const handleDelete = async () => {
    if (deleteId) {
      const result = await deleteHeroSlide(deleteId);
      if (result.success) {
        setSlides((prev) => prev.filter((slide) => slide._id !== deleteId));
      } else {
        alert("Failed to delete hero slide: " + result.error);
      }
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: "Slide Image",
      cell: (item: any) => (
        <div className="w-16 h-10 rounded bg-slate-100 dark:bg-zinc-800 overflow-hidden relative border border-slate-200 dark:border-zinc-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={item.image?.url || "https://images.unsplash.com/photo-1545244040-112429607f43?q=80&w=150"} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      header: "Title & Subtitle",
      cell: (item: any) => (
        <div className="flex flex-col max-w-xs sm:max-w-md">
          <span className="font-semibold text-slate-900 dark:text-zinc-100 truncate">{item.title}</span>
          <span className="text-xs text-slate-400 dark:text-zinc-500 truncate">{item.subtitle}</span>
        </div>
      )
    },
    {
      header: "Display Order",
      cell: (item: any) => (
        <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded">
          {item.order}
        </span>
      )
    },
    {
      header: "Visibility",
      cell: (item: any) => (
        <StatusBadge status={item.isActive ? "published" : "draft"} />
      )
    },
    {
      header: "Actions",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/hero/${item._id}`}
            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Edit size={14} />
          </Link>
          <button 
            onClick={() => setDeleteId(item._id)}
            className="p-1 rounded text-rose-500 hover:text-rose-700 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
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
        title="Homepage Hero Slides" 
        description="Manage the carousel slides shown at the top of your website's home page. Customise high-impact visuals, primary titles, and target subtitles."
        actions={
          <Link 
            href="/admin/hero/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors"
          >
            <Plus size={14} />
            <span>Add New Slide</span>
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <DataTable 
          data={slides} 
          columns={columns} 
          keyExtractor={(item) => item._id} 
        />
      )}

      <ConfirmDialog 
        isOpen={deleteId !== null} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        title="Delete Hero Slide" 
        description="Are you sure you want to delete this hero slide? It will be removed from the home page carousel immediately."
      />
    </div>
  );
}
