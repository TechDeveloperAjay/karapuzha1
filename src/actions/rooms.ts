"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/db";
import Room from "@/models/Room";
import { roomSchema } from "@/lib/validation";
import { ActionResult } from "@/types";

export async function createRoom(prevState: any, formData: FormData): Promise<ActionResult> {
  try {
    await dbConnect();
    
    // Extract data from formData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const basePrice = Number(formData.get("basePrice"));
    const extraGuestPrice = Number(formData.get("extraGuestPrice"));
    const minCapacity = Number(formData.get("minCapacity"));
    const maxCapacity = Number(formData.get("maxCapacity"));
    const amenities = formData.getAll("amenities") as string[];
    const rawImagesJson = formData.get("imagesJson") as string;
    
    let images = [];
    try {
      images = JSON.parse(rawImagesJson || "[]");
    } catch {
      return { success: false, message: "Invalid images format" };
    }

    const payload = {
      title,
      description,
      type,
      basePrice,
      extraGuestPrice,
      capacity: { min: minCapacity, max: maxCapacity },
      amenities,
      images,
      isActive: true,
    };

    // Server-side Zod validation
    const validation = roomSchema.safeParse(payload);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Generate unique slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newRoom = new Room({
      ...validation.data,
      slug,
    });

    await newRoom.save();

    revalidatePath("/(public)/rooms");
    revalidatePath("/(admin)/admin/rooms");
    return { success: true, message: "Room created successfully" };
  } catch (error: any) {
    console.error("Failed to create room:", error);
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}

export async function toggleRoomStatus(id: string, isActive: boolean): Promise<ActionResult> {
  try {
    await dbConnect();
    const room = await Room.findByIdAndUpdate(id, { isActive }, { new: true });
    if (!room) {
      return { success: false, message: "Room not found" };
    }
    revalidatePath("/(public)/rooms");
    revalidatePath("/(admin)/admin/rooms");
    return { success: true, message: `Room status set to ${isActive ? "Active" : "Inactive"}` };
  } catch (error: any) {
    console.error("Failed to toggle room status:", error);
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}
