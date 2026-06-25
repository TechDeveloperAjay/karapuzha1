import { Metadata } from "next";
import { getPublishedBlogs } from "@/actions/blogs";
import BlogListClient from "@/components/shared/BlogListClient";

// SEO Metadata tags for Search Engine Optimization
export const metadata: Metadata = {
  title: "Blog & Resort Journal | Karapuzha Water Scapes",
  description: "Read updates on Wayanad sightseeing, wildlife, spice farming, adventure sports, and wellness staycation tips.",
};

// Next.js Server Component
export default async function BlogListPage() {
  // Read dynamic blog entries on the server context directly
  const publishedBlogs = await getPublishedBlogs();

  return (
    <>
      {/* Page Header */}
      <section className="bg-zinc-900 text-white py-28 sm:py-36 relative flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#D4AF37] mb-4 block">
            Resort Journal
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-wide mb-6">
            The Waterscape Journal
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#F5F5DC] font-light">
            Insights, travel plans, local secrets, and the serene pulse of Wayanad, curated by our resort team.
          </p>
        </div>
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/40 to-zinc-900 z-0"></div>
      </section>

      {/* Main Content Area using Client-side filters */}
      <section className="py-20 bg-white dark:bg-[#0b0f14] text-zinc-900 dark:text-white transition-colors duration-300 min-h-screen">
        <BlogListClient initialBlogs={publishedBlogs} />
      </section>
    </>
  );
}
