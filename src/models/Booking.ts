import mongoose, { Schema, Document } from "mongoose";
import { BookingStatus, PaymentStatus } from "@/types/booking";

export interface IBookingDocument extends Document {
  bookingReference: string;
  room: mongoose.Types.ObjectId;
  guestDetails: {
    fullName: string;
    email: string;
    phone: string;
    idProof?: {
      type: "aadhaar" | "passport" | "driving_licence";
      number: string;
    };
  };
  checkInDate: Date;
  checkOutDate: Date;
  totalGuests: {
    adults: number;
    children: number;
  };
  pricing: {
    baseAmount: number;
    extraGuestsAmount: number;
    discountAmount: number;
    totalAmount: number;
    paidAmount: number;
  };
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    gateway: "razorpay" | "offline_cash";
    orderId?: string;
    paymentId?: string;
    signature?: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    bookingReference: { type: String, required: true, unique: true, index: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    guestDetails: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, required: true },
      idProof: {
        type: { type: String, enum: ["aadhaar", "passport", "driving_licence"] },
        number: { type: String },
      },
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalGuests: {
      adults: { type: Number, required: true, min: 1 },
      children: { type: Number, required: true, default: 0 },
    },
    pricing: {
      baseAmount: { type: Number, required: true },
      extraGuestsAmount: { type: Number, required: true, default: 0 },
      discountAmount: { type: Number, required: true, default: 0 },
      totalAmount: { type: Number, required: true },
      paidAmount: { type: Number, required: true, default: 0 },
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "checked_in", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "partially_paid", "paid", "refunded"],
      default: "pending",
      index: true,
    },
    paymentDetails: {
      gateway: { type: String, enum: ["razorpay", "offline_cash"] },
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

// Compound Index to optimize availability checks and overlapping queries
BookingSchema.index({ room: 1, checkInDate: 1, checkOutDate: 1 });
BookingSchema.index({ createdAt: -1 });

export default mongoose.models.Booking || mongoose.model<IBookingDocument>("Booking", BookingSchema);
