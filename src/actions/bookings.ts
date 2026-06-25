"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { bookingSchema } from "@/lib/validation";
import { ActionResult } from "@/types";
import { BookingStatus, PaymentStatus } from "@/types/booking";

export async function createBooking(payload: any): Promise<ActionResult> {
  try {
    await dbConnect();
    
    // Server-side Zod validation
    const validation = bookingSchema.safeParse(payload);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Generate unique human-readable bookingReference
    const timestamp = Date.now().toString().slice(-6);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const bookingReference = `KWS-${dateStr}-${timestamp}`;

    const newBooking = new Booking({
      ...validation.data,
      booking: payload.roomId, // Set DB reference
      bookingReference,
      status: "pending",
      paymentStatus: "pending",
    });

    await newBooking.save();

    revalidatePath("/(admin)/admin/bookings");
    return { 
      success: true, 
      message: "Booking initiated successfully", 
      data: { id: newBooking._id, reference: bookingReference } 
    };
  } catch (error: any) {
    console.error("Failed to create booking:", error);
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<ActionResult> {
  try {
    await dbConnect();
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) {
      return { success: false, message: "Booking not found" };
    }
    revalidatePath("/(admin)/admin/bookings");
    revalidatePath(`/(admin)/admin/bookings/${id}`);
    return { success: true, message: `Booking status updated to ${status}` };
  } catch (error: any) {
    console.error("Failed to update booking status:", error);
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}

export async function updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<ActionResult> {
  try {
    await dbConnect();
    const booking = await Booking.findByIdAndUpdate(id, { paymentStatus }, { new: true });
    if (!booking) {
      return { success: false, message: "Booking not found" };
    }
    revalidatePath("/(admin)/admin/bookings");
    revalidatePath(`/(admin)/admin/bookings/${id}`);
    return { success: true, message: `Payment status updated to ${paymentStatus}` };
  } catch (error: any) {
    console.error("Failed to update payment status:", error);
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}
