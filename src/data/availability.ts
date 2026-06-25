import { IAvailability } from "@/types/availability";

export const dummyAvailability: IAvailability[] = [
  {
    id: "av_01",
    roomId: "room_02", // Luxury Waterfront Villa
    date: "2026-07-25",
    isBlocked: true,
    blockedReason: "maintenance",
    notes: "Plunge pool filtration pump replacement scheduled.",
    createdAt: new Date("2026-06-20"),
    updatedAt: new Date("2026-06-20")
  },
  {
    id: "av_02",
    roomId: "room_02", // Luxury Waterfront Villa
    date: "2026-07-26",
    isBlocked: true,
    blockedReason: "maintenance",
    notes: "Plunge pool filtration pump replacement scheduled.",
    createdAt: new Date("2026-06-20"),
    updatedAt: new Date("2026-06-20")
  },
  {
    id: "av_03",
    roomId: "room_01", // Deluxe Lake View Room
    date: "2026-08-15", // Independence Day (Holiday Season)
    isBlocked: false,
    priceOverride: 7000, // Regular is 5500
    notes: "Independence Day weekend premium markup.",
    createdAt: new Date("2026-06-18"),
    updatedAt: new Date("2026-06-18")
  },
  {
    id: "av_04",
    roomId: "room_03", // Lake View Cottage
    date: "2026-08-15", // Independence Day (Holiday Season)
    isBlocked: false,
    priceOverride: 9000, // Regular is 7500
    notes: "Independence Day weekend premium markup.",
    createdAt: new Date("2026-06-18"),
    updatedAt: new Date("2026-06-18")
  },
  {
    id: "av_05",
    roomId: "room_04", // Presidential Family Suite
    date: "2026-07-02",
    isBlocked: true,
    blockedReason: "offline_booking",
    notes: "Corporate VIP walkthrough.",
    createdAt: new Date("2026-06-22"),
    updatedAt: new Date("2026-06-22")
  }
];
