"use server";

import { dbConnect } from "@/lib/db";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";

// Helper to serialize Mongoose documents into plain objects for React Server Components
function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

/**
 * FETCH PUBLISHED BLOGS
 * Called by: Public blog list page and home page blog preview section
 * Collection touched: "blogs" (reads)
 * Data returned: Array of published blog objects sorted by published date (latest first)
 */
export async function getPublishedBlogs() {
  try {
    await dbConnect();
    // Query for published blogs, convert Mongoose documents to plain objects (.lean())
    const blogs = await Blog.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .lean();
    return serialize(blogs);
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return [];
  }
}

/**
 * FETCH SINGLE ARTICLE BY SLUG
 * Called by: Public blog detail page `/blog/[slug]`
 * Collection touched: "blogs" (reads)
 * Data returned: Single published blog object, or null if not found
 */
export async function getBlogBySlug(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug, status: "published" }).lean();
    return blog ? serialize(blog) : null;
  } catch (error) {
    console.error(`Error fetching blog by slug ${slug}:`, error);
    return null;
  }
}

/**
 * FETCH SINGLE ARTICLE BY ID FOR EDITING
 * Called by: Admin edit page `/admin/blogs/[id]`
 * Collection touched: "blogs" (reads)
 * Data returned: Single blog object, or null if not found
 */
export async function getBlogById(id: string) {
  try {
    await dbConnect();
    const blog = await Blog.findById(id).lean();
    return blog ? serialize(blog) : null;
  } catch (error) {
    console.error(`Error fetching blog by ID ${id}:`, error);
    return null;
  }
}

/**
 * ADMIN: FETCH ALL ARTICLES (DRAFTS + PUBLISHED)
 * Called by: Admin list page `/admin/blogs`
 * Collection touched: "blogs" (reads)
 * Data returned: Array of all blog objects sorted by creation date (newest first)
 */
export async function getAllBlogsAdmin() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return serialize(blogs);
  } catch (error) {
    console.error("Error fetching all blogs for admin:", error);
    return [];
  }
}

/**
 * ADMIN: CREATE NEW ARTICLE
 * Called by: Admin write page `/admin/blogs/new`
 * Collection touched: "blogs" (creates write)
 * Data returned: Newly created blog object
 */
export async function createBlog(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: { url: string; publicId: string };
  status: "draft" | "published";
}) {
  try {
    await dbConnect();
    
    // Set publishedAt timestamp if status is published
    const payload = {
      ...data,
      publishedAt: data.status === "published" ? new Date() : undefined,
    };

    const newBlog = await Blog.create(payload);
    
    // Invalidate Next.js cache so pages show the new post immediately
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blogs");

    return { success: true, blog: serialize(newBlog) };
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return { success: false, error: error.message || "Failed to create post" };
  }
}

/**
 * ADMIN: UPDATE EXISTING ARTICLE
 * Called by: Admin edit page `/admin/blogs/[id]`
 * Collection touched: "blogs" (updates write)
 * Data returned: Updated blog object
 */
export async function updateBlog(
  id: string,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: { url: string; publicId: string };
    status: "draft" | "published";
  }
) {
  try {
    await dbConnect();

    // Load existing blog to compare status changes
    const existing = await Blog.findById(id);
    if (!existing) {
      return { success: false, error: "Blog post not found" };
    }

    // Update publishedAt timestamp if changing from draft to published
    let publishedAt = existing.publishedAt;
    if (data.status === "published" && existing.status !== "published") {
      publishedAt = new Date();
    } else if (data.status === "draft") {
      publishedAt = undefined;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...data,
        publishedAt,
      },
      { new: true, runValidators: true }
    );

    // Invalidate caches
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    revalidatePath("/admin/blogs");

    return { success: true, blog: serialize(updatedBlog) };
  } catch (error: any) {
    console.error(`Error updating blog ${id}:`, error);
    return { success: false, error: error.message || "Failed to update post" };
  }
}

/**
 * ADMIN: DELETE ARTICLE
 * Called by: Admin list page delete button
 * Collection touched: "blogs" (deletes write)
 * Data returned: Object indicating success state
 */
export async function deleteBlog(id: string) {
  try {
    await dbConnect();

    const blogToDelete = await Blog.findById(id);
    if (!blogToDelete) {
      return { success: false, error: "Blog post not found" };
    }

    await Blog.findByIdAndDelete(id);

    // Invalidate caches
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${blogToDelete.slug}`);
    revalidatePath("/admin/blogs");

    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting blog ${id}:`, error);
    return { success: false, error: error.message || "Failed to delete post" };
  }
}
