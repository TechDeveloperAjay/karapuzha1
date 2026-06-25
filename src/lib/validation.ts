import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const roomSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["deluxe", "luxury_villa", "lake_view_cottage", "family_suite"]),
  basePrice: z.number().positive("Base price must be greater than 0"),
  extraGuestPrice: z.number().nonnegative("Extra guest price cannot be negative"),
  capacity: z.object({
    min: z.number().int().min(1),
    max: z.number().int().min(1),
  }),
  amenities: z.array(z.string()),
  images: z.array(
    z.object({
      url: z.string().url(),
      publicId: z.string(),
    })
  ).min(1, "Please upload at least one image"),
  isActive: z.boolean().default(true),
});

export const bookingSchema = z.object({
  roomId: z.string(),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  idProof: z.object({
    type: z.enum(["aadhaar", "passport", "driving_licence"]),
    number: z.string().min(5, "ID proof number must be valid"),
  }).optional(),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
  totalGuests: z.object({
    adults: z.number().int().min(1),
    children: z.number().int().nonnegative().default(0),
  }),
  pricing: z.object({
    baseAmount: z.number(),
    extraGuestsAmount: z.number(),
    discountAmount: z.number().default(0),
    totalAmount: z.number(),
    paidAmount: z.number().default(0),
  }),
  notes: z.string().optional(),
});
