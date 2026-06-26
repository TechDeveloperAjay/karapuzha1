import mongoose, { Schema, Document } from "mongoose";

// Interface describing the shape of a HeroSlide document in TypeScript
export interface IHeroSlideDocument extends Document {
  title: string;
  subtitle: string;
  image: {
    url: string;
    publicId: string;
  };
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Defining the database schema rules
const HeroSlideSchema = new Schema<IHeroSlideDocument>(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"], 
      trim: true 
    },
    subtitle: { 
      type: String, 
      required: [true, "Subtitle is required"], 
      trim: true 
    },
    image: {
      url: { 
        type: String, 
        required: [true, "Hero image URL is required"] 
      },
      publicId: { 
        type: String, 
        required: [true, "Hero image public ID is required"] 
      }
    },
    order: { 
      type: Number, 
      default: 0 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    }
  },
  { 
    timestamps: true // Automatically creates and manages createdAt and updatedAt fields
  }
);

// Exports the compiled model or retrieves it if it is already compiled (hot-reload safety)
export default mongoose.models.HeroSlide || mongoose.model<IHeroSlideDocument>("HeroSlide", HeroSlideSchema);
