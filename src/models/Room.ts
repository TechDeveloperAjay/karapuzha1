import mongoose, { Schema, Document } from "mongoose";
import { RoomType } from "@/types/room";

export interface IRoomDocument extends Document {
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

const RoomSchema = new Schema<IRoomDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["deluxe", "luxury_villa", "lake_view_cottage", "family_suite"],
    },
    basePrice: { type: Number, required: true },
    extraGuestPrice: { type: Number, required: true, default: 0 },
    capacity: {
      min: { type: Number, required: true, default: 1 },
      max: { type: Number, required: true },
    },
    amenities: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    isActive: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Room || mongoose.model<IRoomDocument>("Room", RoomSchema);
