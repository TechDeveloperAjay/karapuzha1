"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Star } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import FormSection from "@/components/admin/FormSection";
import ImageUploader from "@/components/admin/ImageUploader";
import { RoomType } from "@/types/room";

export default function NewRoomPage() {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<RoomType>("deluxe");
  const [basePrice, setBasePrice] = useState(5000);
  const [extraGuestPrice, setExtraGuestPrice] = useState(1000);
  const [minCapacity, setMinCapacity] = useState(1);
  const [maxCapacity, setMaxCapacity] = useState(3);
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<{ url: string; publicId: string }[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const availableAmenities = [
    "King Bed", "Queen Bed", "Private Balcony", "Air Conditioning", 
    "Free WiFi", "Smart TV", "Mini Fridge", "Tea/Coffee Maker", 
    "Private Plunge Pool", "Open Sky Shower", "Bathtub"
  ];

  const handleTitleChange = (val: string) => {
    setTitle(val);
    // Auto-slugify
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    alert("New room created successfully (local state bypass)!");
    router.push("/admin/rooms");
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link 
          href="/admin/rooms"
          className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <PageHeader 
          title="Create New Room" 
          description="Design a new premium room category and upload details to show on the booking page."
        />
      </div>

      <div className="space-y-1">
        {/* Section 1: Basic Information */}
        <FormSection 
          title="Basic Information" 
          description="Define the room titles, custom SEO slug url keys, and descriptive copywriting details."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Room Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Premium Sunset Cottage"
                value={title} 
                onChange={(e) => handleTitleChange(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">URL Slug</label>
              <input 
                type="text" 
                required 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Description</label>
              <textarea 
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter rich details about the room styling, lake views, space layout..."
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        </FormSection>

        {/* Section 2: Capacity & Rates */}
        <FormSection 
          title="Pricing & Capacity" 
          description="Configure base room pricing per night, extra guest add-on rates, and occupant limitations."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Category Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as RoomType)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
              >
                <option value="deluxe">Deluxe Room</option>
                <option value="luxury_villa">Luxury Waterfront Villa</option>
                <option value="lake_view_cottage">Lake View Cottage</option>
                <option value="family_suite">Presidential Family Suite</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Base Price (₹/Night)</label>
              <input 
                type="number" 
                required 
                value={basePrice} 
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Extra Guest Price (₹)</label>
              <input 
                type="number" 
                required 
                value={extraGuestPrice} 
                onChange={(e) => setExtraGuestPrice(Number(e.target.value))}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Min Capacity</label>
                <input 
                  type="number" 
                  min={1} 
                  required 
                  value={minCapacity} 
                  onChange={(e) => setMinCapacity(Number(e.target.value))}
                  className="block w-full px-2 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Max Capacity</label>
                <input 
                  type="number" 
                  min={1} 
                  required 
                  value={maxCapacity} 
                  onChange={(e) => setMaxCapacity(Number(e.target.value))}
                  className="block w-full px-2 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </FormSection>

        {/* Section 3: Amenities Checkbox */}
        <FormSection 
          title="Amenities & Comforts" 
          description="Check what items, layout details, and amenities are loaded in this cottage category."
        >
          <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3">
            {availableAmenities.map(item => (
              <label 
                key={item} 
                className="flex items-center gap-2 px-3 py-2 border border-slate-100 dark:border-zinc-800 rounded-lg text-xs cursor-pointer bg-slate-50/20 hover:bg-slate-50 dark:hover:bg-zinc-850 select-none"
              >
                <input 
                  type="checkbox" 
                  checked={amenities.includes(item)}
                  onChange={() => handleAmenityToggle(item)}
                  className="rounded border-slate-350 dark:border-zinc-700 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                />
                <span className="text-slate-750 dark:text-zinc-350">{item}</span>
              </label>
            ))}
          </div>
        </FormSection>

        {/* Section 4: Image uploads */}
        <FormSection 
          title="Room Visual Media" 
          description="Upload high-definition photos showcasing the bedroom layout, balconies, bathrooms, and vistas."
        >
          <ImageUploader value={images} onChange={setImages} maxImages={6} />
        </FormSection>

        {/* Section 5: Settings & Badges */}
        <FormSection 
          title="Operational Settings" 
          description="Set initial visibility filters and markups."
        >
          <div className="flex flex-col gap-3.5 sm:flex-row sm:gap-6">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-slate-350 dark:border-zinc-700 text-teal-600 focus:ring-teal-500 h-4.5 w-4.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">List Category Active</span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">Makes the cottage instantly bookable on the main page.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-slate-350 dark:border-zinc-700 text-teal-600 focus:ring-teal-500 h-4.5 w-4.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">Featured Listing</span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">Renders high-visibility banners on the home landing page.</span>
              </div>
            </label>
          </div>
        </FormSection>
      </div>

      {/* Form CTA Buttons */}
      <div className="flex items-center justify-end gap-3.5 pt-6 border-t border-slate-200 dark:border-zinc-800">
        <Link 
          href="/admin/rooms"
          className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-slate-250 dark:border-zinc-700 rounded-lg transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors"
        >
          <Save size={14} />
          <span>Save Room Listing</span>
        </button>
      </div>
    </form>
  );
}
