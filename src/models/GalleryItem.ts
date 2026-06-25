import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItemDocument extends Document {
  title?: string;
  category: string; // e.g. "rooms", "resort", "activities", "restaurant"
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItemDocument>(
  {
    title: { type: String, trim: true },
    category: { type: String, required: true, default: "resort", index: true },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    isActive: { type: Boolean, required: true, default: true, index: true },
    sortOrder: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

GalleryItemSchema.index({ category: 1, sortOrder: 1 });

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItemDocument>("GalleryItem", GalleryItemSchema);
