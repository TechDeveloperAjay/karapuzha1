import { IRoom } from "@/types/room";

export const dummyRooms: IRoom[] = [
  {
    id: "room_01",
    title: "Deluxe Lake View Room",
    slug: "deluxe-lake-view-room",
    description: "Enjoy panoramic views of the Karapuzha reservoir from your private balcony. Perfect for couples seeking a relaxing getaway, features elegant teakwood decor and premium bedding.",
    type: "deluxe",
    basePrice: 5500,
    extraGuestPrice: 1200,
    capacity: { min: 1, max: 3 },
    amenities: ["King Bed", "Private Balcony", "Air Conditioning", "Free WiFi", "Smart TV", "Mini Fridge", "Tea/Coffee Maker"],
    images: [
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800", publicId: "resort/rooms/deluxe_lake_1" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800", publicId: "resort/rooms/deluxe_lake_2" }
    ],
    isActive: true,
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-06-20")
  },
  {
    id: "room_02",
    title: "Luxury Waterfront Villa",
    slug: "luxury-waterfront-villa",
    description: "An ultra-premium standalone villa positioned right on the edge of the water. Indulge in luxury with a private plunge pool, open-sky shower, and an expansive deck overlooking the serene lake.",
    type: "luxury_villa",
    basePrice: 11500,
    extraGuestPrice: 2000,
    capacity: { min: 2, max: 4 },
    amenities: ["King Bed", "Private Plunge Pool", "Decks & Lounge Chairs", "Open Sky Shower", "Air Conditioning", "Free WiFi", "Nespresso Machine", "Premium Toiletries"],
    images: [
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800", publicId: "resort/rooms/waterfront_villa_1" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800", publicId: "resort/rooms/waterfront_villa_2" }
    ],
    isActive: true,
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-06-21")
  },
  {
    id: "room_03",
    title: "Lake View Cottage",
    slug: "lake-view-cottage",
    description: "Nestled in lush foliage, this premium cottage offers high privacy and beautiful garden-to-lake views. Ideal for individuals wanting a quiet sanctuary.",
    type: "lake_view_cottage",
    basePrice: 7500,
    extraGuestPrice: 1500,
    capacity: { min: 1, max: 3 },
    amenities: ["Queen Bed", "Porch Swing", "Air Conditioning", "Free WiFi", "Desk & Workspace", "Mini Bar", "Eco-friendly bath amenities"],
    images: [
      { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800", publicId: "resort/rooms/lake_cottage_1" }
    ],
    isActive: true,
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-05-18")
  },
  {
    id: "room_04",
    title: "Presidential Family Suite",
    slug: "presidential-family-suite",
    description: "Expansive two-bedroom suite featuring a separate living room, dining area, and wrap-around terrace. Tailored for families or groups searching for ultimate luxury and comfort.",
    type: "family_suite",
    basePrice: 16500,
    extraGuestPrice: 2500,
    capacity: { min: 4, max: 6 },
    amenities: ["2 King Beds", "Living Room", "Dining Table", "Wrap-around Terrace", "Air Conditioning", "Free WiFi", "2 Smart TVs", "Bathtub", "Mini Kitchenette"],
    images: [
      { url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800", publicId: "resort/rooms/family_suite_1" },
      { url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800", publicId: "resort/rooms/family_suite_2" }
    ],
    isActive: true,
    createdAt: new Date("2026-02-10"),
    updatedAt: new Date("2026-06-15")
  }
];
