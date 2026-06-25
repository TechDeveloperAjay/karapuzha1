"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import ImageUploader from "@/components/admin/ImageUploader";

export default function GalleryUploadPage() {
  const router = useRouter();
  const [images, setImages] = useState<{ url: string; publicId: string }[]>([]);
  const [category, setCategory] = useState("resort");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return;
    alert("Images saved to media library successfully!");
    router.push("/admin/gallery");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link 
          href="/admin/gallery"
          className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <PageHeader 
          title="Upload New Media Assets" 
          description="Drag and drop photos directly to upload and categorize them."
        />
      </div>

      <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="resort">Resort View</option>
            <option value="rooms">Rooms & Villas</option>
            <option value="activities">Activities</option>
            <option value="restaurant">Dining & Restaurant</option>
            <option value="nature">Wayanad Landscapes</option>
          </select>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Media Files</label>
          <ImageUploader value={images} onChange={setImages} maxImages={6} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3.5 pt-6 border-t border-slate-200 dark:border-zinc-800">
        <Link 
          href="/admin/gallery"
          className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-slate-250 dark:border-zinc-700 rounded-lg transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={images.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg disabled:opacity-50 transition-colors shadow"
        >
          <span>Upload Files</span>
        </button>
      </div>
    </form>
  );
}
