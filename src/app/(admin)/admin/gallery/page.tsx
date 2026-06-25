"use client";

import React, { useState } from "react";
import { Plus, Trash2, Eye, RefreshCw, Upload, Image as ImageIcon } from "lucide-react";
import { dummyGalleryImages } from "@/data/gallery";
import PageHeader from "@/components/admin/PageHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function GalleryPage() {
  const [gallery, setGallery] = useState(dummyGalleryImages);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<"rooms" | "resort" | "activities" | "restaurant" | "nature">("resort");
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; publicId: string }[]>([]);

  const categories = [
    { value: "all", label: "All Media" },
    { value: "rooms", label: "Rooms & Villas" },
    { value: "resort", label: "Resort Views" },
    { value: "activities", label: "Activities" },
    { value: "restaurant", label: "Dining & Food" },
    { value: "nature", label: "Wayanad Nature" },
  ];

  // Filtering images based on category tabs
  const filteredImages = activeCategory === "all" 
    ? gallery 
    : gallery.filter(img => img.category === activeCategory);

  const handleDelete = () => {
    if (deleteId) {
      setGallery(prev => prev.filter(img => img.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) return;

    const newItems = uploadedFiles.map((file, idx) => ({
      id: `gal_new_${Date.now()}_${idx}`,
      title: `Gallery Image ${gallery.length + idx + 1}`,
      category: newCategory,
      image: {
        url: file.url,
        publicId: file.publicId
      },
      isActive: true,
      sortOrder: gallery.length + idx + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    setGallery(prev => [...prev, ...newItems]);
    setUploadedFiles([]);
    setUploaderOpen(false);
  };

  const handleReplaceImage = (id: string) => {
    // Simulated Replace Image trigger
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const localUrl = URL.createObjectURL(file);
        setGallery(prev =>
          prev.map(img =>
            img.id === id 
              ? { ...img, image: { ...img.image, url: localUrl } } 
              : img
          )
        );
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Media Gallery Library" 
        description="Organize scenic resort landscape photos, customer events, and rooms visuals."
        actions={
          <button 
            onClick={() => setUploaderOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors"
          >
            <Plus size={14} />
            <span>Upload Media</span>
          </button>
        }
      />

      {/* Categories Filter Tabs (SaaS style) */}
      <div className="flex border-b border-slate-200 dark:border-zinc-800 gap-1 overflow-x-auto pb-px">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeCategory === cat.value
                ? "border-teal-500 text-teal-600 dark:text-teal-400 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid view of media cards (Masonry style emulation) */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl">
          <ImageIcon className="mx-auto text-slate-400 dark:text-zinc-500 mb-2" size={32} />
          <p className="text-xs text-slate-500 dark:text-zinc-400">No media found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm group relative flex flex-col"
            >
              {/* Media Container */}
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.image.url} 
                  alt={img.title || "Gallery photo"} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-350"
                />
                
                {/* Hover Quick actions overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setPreviewImage(img.image.url)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all shadow"
                    title="Fullscreen Preview"
                  >
                    <Eye size={14} />
                  </button>
                  <button 
                    onClick={() => handleReplaceImage(img.id)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all shadow"
                    title="Replace Image"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button 
                    onClick={() => setDeleteId(img.id)}
                    className="p-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all shadow"
                    title="Delete Image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Title & Tags */}
              <div className="p-3.5 space-y-1.5">
                <p className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                  {img.category}
                </p>
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">
                  {img.title || "Untitled Image"}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Media Slide drawer/dialog popup */}
      {uploaderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setUploaderOpen(false)} />
          <form 
            onSubmit={handleUploadSubmit}
            className="relative bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-xl w-[90vw] max-w-lg shadow-2xl space-y-5"
          >
            <div>
              <h3 className="text-base font-bold">Upload Media Assets</h3>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">Direct signed upload pipeline simulator.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Select Category Section</label>
                <select 
                  value={newCategory} 
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none"
                >
                  <option value="resort">Resort View</option>
                  <option value="rooms">Rooms & Villas</option>
                  <option value="activities">Resort Activities</option>
                  <option value="restaurant">Dining & Restaurant</option>
                  <option value="nature">Wayanad Landscapes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Media Files</label>
                <ImageUploader value={uploadedFiles} onChange={setUploadedFiles} maxImages={4} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3.5 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
              <button 
                type="button"
                onClick={() => setUploaderOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold border border-slate-250 dark:border-zinc-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={uploadedFiles.length === 0}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg disabled:opacity-50"
              >
                Save to Library
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image Preview Modal (Radix style overlay) */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85" onClick={() => setPreviewImage(null)} />
          <div className="relative max-w-4xl max-h-[85vh] bg-transparent overflow-hidden rounded-lg shadow-2xl z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={previewImage} 
              alt="Media Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white text-xs font-bold transition-all shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog 
        isOpen={deleteId !== null} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        title="Delete Gallery Media" 
        description="Are you sure you want to delete this media image? It will be removed from all public landing sections and deleted from the image registry."
      />
    </div>
  );
}
