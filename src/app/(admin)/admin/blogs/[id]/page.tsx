"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { getBlogById, updateBlog } from "@/actions/blogs";
import PageHeader from "@/components/admin/PageHeader";
import FormSection from "@/components/admin/FormSection";
import ImageUploader from "@/components/admin/ImageUploader";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("travel");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<{ url: string; publicId: string }[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // Fetch article details on load
  useEffect(() => {
    async function loadBlog() {
      const data = await getBlogById(id);
      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setCoverImage(data.coverImage ? [data.coverImage] : []);
        setStatus(data.status);
        setSeoTitle(data.title);
        setSeoDescription(data.excerpt);

        // Map tag back to category
        const tag = data.tags?.[0];
        if (tag === "Wayanad Travel Guide") setCategory("travel");
        else if (tag === "Wellness") setCategory("wellness");
        else if (tag === "Food & Drink") setCategory("cuisine");
        else setCategory("news");
      }
      setIsLoading(false);
    }
    loadBlog();
  }, [id]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    setSeoTitle(val);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (coverImage.length === 0) {
      alert("Please upload a featured cover image first.");
      return;
    }

    setIsSaving(true);
    const result = await updateBlog(id, {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage[0], // Extract single cover image object
      status,
      // Map category selector back to tags array
      tags: [category === "travel" ? "Wayanad Travel Guide" : category === "wellness" ? "Wellness" : category === "cuisine" ? "Food & Drink" : "News & Events"]
    } as any);

    setIsSaving(false);
    if (result.success) {
      router.push("/admin/blogs");
    } else {
      alert("Error saving blog post: " + result.error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link 
          href="/admin/blogs"
          className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <PageHeader 
          title={`Edit Post: ${title}`} 
          description="Modify blog contents, SEO meta tags, and replace featured pictures."
        />
      </div>

      <div className="space-y-1">
        {/* Article Details */}
        <FormSection 
          title="Article Details" 
          description="Enter the main title heading, permalink slug URL, and categorizations."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Blog Title</label>
              <input 
                type="text" 
                required 
                value={title} 
                onChange={(e) => handleTitleChange(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Permalink URL Slug</label>
              <input 
                type="text" 
                required 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Category Tag</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100 cursor-pointer"
              >
                <option value="travel">Travel Guide</option>
                <option value="activities">Adventure Activities</option>
                <option value="wellness">Resort Wellness</option>
                <option value="cuisine">Kerala Dining</option>
                <option value="news">News & Events</option>
              </select>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Short Summary Excerpt</label>
              <input 
                type="text" 
                required 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </FormSection>

        {/* Featured Cover Photo */}
        <FormSection 
          title="Cover Photo Media" 
          description="Choose a high-impact landscape featured image to render at the top of the post."
        >
          <ImageUploader value={coverImage} onChange={setCoverImage} maxImages={1} />
        </FormSection>

        {/* Content Area */}
        <FormSection 
          title="Article Content Editor" 
          description="Write the detailed travel articles content. Supports html elements structures."
        >
          <div className="space-y-1">
            <textarea 
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full px-3 py-2 text-sm font-mono bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
            />
          </div>
        </FormSection>

        {/* SEO */}
        <FormSection 
          title="Search Engine SEO Metadata" 
          description="Configure Google/Bing custom indexing search parameters."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">SEO Custom Title</label>
              <input 
                type="text" 
                value={seoTitle} 
                onChange={(e) => setSeoTitle(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">SEO Description</label>
              <textarea 
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="block w-full px-3 py-2 text-sm bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </FormSection>

        {/* Status */}
        <FormSection 
          title="Publish Parameters" 
          description="Decide whether to publish immediately or keep as draft."
        >
          <div className="flex items-center gap-3.5">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={status === "published"}
                onChange={(e) => setStatus(e.target.checked ? "published" : "draft")}
                className="rounded border-slate-350 dark:border-zinc-700 text-teal-600 focus:ring-teal-500 h-4.5 w-4.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 block">Publish Post</span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">Makes the post immediately readable in the blog section.</span>
              </div>
            </label>
          </div>
        </FormSection>
      </div>

      {/* Form CTA Buttons */}
      <div className="flex items-center justify-end gap-3.5 pt-6 border-t border-slate-200 dark:border-zinc-800">
        <Link 
          href="/admin/blogs"
          className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-slate-250 dark:border-zinc-700 rounded-lg transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors disabled:bg-teal-400 cursor-pointer"
        >
          <Save size={14} />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>
    </form>
  );
}
