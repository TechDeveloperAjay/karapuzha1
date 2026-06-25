export type RoomType = "deluxe" | "luxury_villa" | "lake_view_cottage" | "family_suite";

export interface IRoom {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: RoomType;
  basePrice: number;
  extraGuestPrice: number;
  capacity: {
    min: number;
    max: number;
  };
  amenities: string[];
  images: {
    url: string;
    publicId: string;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
