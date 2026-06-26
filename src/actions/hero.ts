"use server";

import { dbConnect } from "@/lib/db";
import HeroSlide from "@/models/HeroSlide";
import { revalidatePath } from "next/cache";

// Helper to serialize Mongoose documents into plain objects for React Server Components
function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

/**
 * FETCH HERO SLIDES
 * Called by: Public page and admin list page
 * Collection touched: "heroslides" (reads)
 * Data returned: Array of slides sorted by order (ascending) then creation date (newest first)
 */
export async function getHeroSlides(onlyActive = true) {
  try {
    await dbConnect();
    const query = onlyActive ? { isActive: true } : {};
    const slides = await HeroSlide.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return serialize(slides);
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

/**
 * FETCH SINGLE HERO SLIDE BY ID FOR EDITING
 * Called by: Admin edit page `/admin/hero/[id]`
 * Collection touched: "heroslides" (reads)
 * Data returned: Single slide object, or null if not found
 */
export async function getHeroSlideById(id: string) {
  try {
    await dbConnect();
    const slide = await HeroSlide.findById(id).lean();
    return slide ? serialize(slide) : null;
  } catch (error) {
    console.error(`Error fetching hero slide by ID ${id}:`, error);
    return null;
  }
}

/**
 * ADMIN: CREATE NEW HERO SLIDE
 * Called by: Admin page `/admin/hero/new`
 * Collection touched: "heroslides" (creates write)
 * Data returned: Newly created slide object
 */
export async function createHeroSlide(data: {
  title: string;
  subtitle: string;
  image: { url: string; publicId: string };
  order: number;
  isActive: boolean;
}) {
  try {
    await dbConnect();
    const newSlide = await HeroSlide.create(data);
    
    // Invalidate Next.js cache so the homepage shows the update instantly
    revalidatePath("/");
    revalidatePath("/admin/hero");

    return { success: true, slide: serialize(newSlide) };
  } catch (error: any) {
    console.error("Error creating hero slide:", error);
    return { success: false, error: error.message || "Failed to create slide" };
  }
}

/**
 * ADMIN: UPDATE EXISTING HERO SLIDE
 * Called by: Admin edit page `/admin/hero/[id]`
 * Collection touched: "heroslides" (updates write)
 * Data returned: Updated slide object
 */
export async function updateHeroSlide(
  id: string,
  data: {
    title: string;
    subtitle: string;
    image: { url: string; publicId: string };
    order: number;
    isActive: boolean;
  }
) {
  try {
    await dbConnect();
    const updatedSlide = await HeroSlide.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedSlide) {
      return { success: false, error: "Hero slide not found" };
    }

    // Invalidate Next.js cache
    revalidatePath("/");
    revalidatePath("/admin/hero");

    return { success: true, slide: serialize(updatedSlide) };
  } catch (error: any) {
    console.error(`Error updating hero slide ${id}:`, error);
    return { success: false, error: error.message || "Failed to update slide" };
  }
}

/**
 * ADMIN: DELETE HERO SLIDE
 * Called by: Admin list page delete button
 * Collection touched: "heroslides" (deletes write)
 * Data returned: Object indicating success state
 */
export async function deleteHeroSlide(id: string) {
  try {
    await dbConnect();
    const slideToDelete = await HeroSlide.findById(id);
    if (!slideToDelete) {
      return { success: false, error: "Hero slide not found" };
    }

    await HeroSlide.findByIdAndDelete(id);

    // Invalidate Next.js cache
    revalidatePath("/");
    revalidatePath("/admin/hero");

    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting hero slide ${id}:`, error);
    return { success: false, error: error.message || "Failed to delete slide" };
  }
}
