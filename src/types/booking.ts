import { IRoom } from "./room";

export type BookingStatus = "pending" | "confirmed" | "checked_in" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "partially_paid" | "paid" | "refunded";

export interface IBooking {
  id: string;
  bookingReference: string;
  room: string | IRoom;
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
}
