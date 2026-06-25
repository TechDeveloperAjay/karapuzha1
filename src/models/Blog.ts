import mongoose, { Schema, Document } from "mongoose";

// Interface describing the shape of a Blog document in TypeScript
export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
    publicId: string;
  };
  author: {
    name: string;
    avatarUrl?: string;
  };
  tags: string[];
  status: "draft" | "published";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Defining the database schema rules
const BlogSchema = new Schema<IBlogDocument>(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"], 
      trim: true 
    },
    slug: { 
      type: String, 
      required: [true, "Slug is required"], 
      unique: true, 
      index: true,
      trim: true,
      lowercase: true 
    },
    excerpt: { 
      type: String, 
      required: [true, "Excerpt is required"],
      trim: true 
    },
    content: { 
      type: String, 
      required: [true, "Content is required"] 
    },
    coverImage: {
      url: { 
        type: String, 
        required: [true, "Cover image URL is required"] 
      },
      publicId: { 
        type: String, 
        required: [true, "Cover image public ID is required"] 
      }
    },
    author: {
      name: { 
        type: String, 
        required: [true, "Author name is required"],
        default: "Resort Admin"
      },
      avatarUrl: { 
        type: String 
      }
    },
    tags: { 
      type: [String], 
      default: [] 
    },
    status: { 
      type: String, 
      enum: ["draft", "published"], 
      default: "draft" 
    },
    publishedAt: { 
      type: Date 
    }
  },
  { 
    timestamps: true // Automatically creates and manages createdAt and updatedAt fields
  }
);

// Exports the compiled model or retrieves it if it is already compiled (hot-reload safety)
export default mongoose.models.Blog || mongoose.model<IBlogDocument>("Blog", BlogSchema);
