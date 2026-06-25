import { IGalleryImage } from "@/types/gallery";

export const dummyGalleryImages: IGalleryImage[] = [
  {
    id: "gal_01",
    title: "Vibrant Sunset over Karapuzha Reservoir",
    category: "nature",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
      publicId: "resort/gallery/sunset_reservoir"
    },
    isActive: true,
    sortOrder: 1,
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01")
  },
  {
    id: "gal_02",
    title: "Luxury Waterfront Villa Exteriors",
    category: "rooms",
    image: {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
      publicId: "resort/gallery/villa_exterior"
    },
    isActive: true,
    sortOrder: 2,
    createdAt: new Date("2026-03-02"),
    updatedAt: new Date("2026-04-10")
  },
  {
    id: "gal_03",
    title: "Spicy Fish Curry - Dining Experience",
    category: "restaurant",
    image: {
      url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800",
      publicId: "resort/gallery/dining_fish"
    },
    isActive: true,
    sortOrder: 3,
    createdAt: new Date("2026-03-05"),
    updatedAt: new Date("2026-03-05")
  },
  {
    id: "gal_04",
    title: "Kayaking on the Reservoir Waters",
    category: "activities",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800",
      publicId: "resort/gallery/kayaking_lake"
    },
    isActive: true,
    sortOrder: 4,
    createdAt: new Date("2026-03-10"),
    updatedAt: new Date("2026-03-10")
  },
  {
    id: "gal_05",
    title: "Morning mist surrounding Waterfront Cottages",
    category: "resort",
    image: {
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800",
      publicId: "resort/gallery/morning_mist"
    },
    isActive: false,
    sortOrder: 5,
    createdAt: new Date("2026-03-15"),
    updatedAt: new Date("2026-06-01")
  }
];
