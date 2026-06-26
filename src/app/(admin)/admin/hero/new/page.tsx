"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createHeroSlide } from "@/actions/hero";
import PageHeader from "@/components/admin/PageHeader";
import FormSection from "@/components/admin/FormSection";
import ImageUploader from "@/components/admin/ImageUploader";

export default function CreateHeroSlidePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<{ url: string; publicId: string }[]>([]);
  const [order, setOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image.length === 0) {
      alert("Please upload a slide image first.");
      return;
    }

    setIsSaving(true);
    const result = await createHeroSlide({
      title,
      subtitle,
      image: image[0], // Extract the single image object
      order,
      isActive,
    });

    setIsSaving(false);
    if (result.success) {
      router.push("/admin/hero");
    } else {
      alert("Error creating hero slide: " + result.error);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link 
          href="/admin/hero"
          className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <PageHeader 
          title="Add New Hero Slide" 
          description="Create a new visual card for the front page banner sliding deck."
        />
      </div>

      <div className="space-y-1">
        {/* Slide details */}
        <FormSection 
          title="Slide Content" 
          description="Enter the core text captions to display over the slide."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Slide Main Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Experience Unrivaled Luxury"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Slide Subtitle / Description</label>
              <textarea 
                rows={3}
                required
                placeholder="A private sanctuary where elegance meets tranquility..."
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Display Order</label>
              <input 
                type="number" 
                required 
                value={order} 
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
              <span className="text-[10px] text-slate-400 dark:text-zinc-500">Determines sequence. Lower numbers display first.</span>
            </div>
          </div>
        </FormSection>

        {/* Cover Photo */}
        <FormSection 
          title="Slide Media Asset" 
          description="Choose a high-resolution landscape photo to render as the fullscreen background."
        >
          <ImageUploader value={image} onChange={setImage} maxImages={1} />
        </FormSection>

        {/* Publish Parameters */}
        <FormSection 
          title="Visibility" 
          description="Choose whether this slide is visible to public visitors."
        >
          <div className="flex items-center gap-3.5">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-slate-350 dark:border-zinc-700 text-teal-600 focus:ring-teal-500 h-4.5 w-4.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">Active Status</span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">Makes the slide active and shows it on the homepage carousel.</span>
              </div>
            </label>
          </div>
        </FormSection>
      </div>

      {/* Form CTA Buttons */}
      <div className="flex items-center justify-end gap-3.5 pt-6 border-t border-slate-200 dark:border-zinc-800">
        <Link 
          href="/admin/hero"
          className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-slate-250 dark:border-zinc-700 rounded-lg transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors disabled:bg-teal-400 cursor-pointer"
        >
          <Save size={14} />
          <span>{isSaving ? "Saving..." : "Save Slide"}</span>
        </button>
      </div>
    </form>
  );
}
