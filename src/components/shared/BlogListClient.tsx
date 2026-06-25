"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

// Filter categories
const CATEGORIES = [
  { id: "all", name: "All Stories" },
  { id: "travel", name: "Travel Guides", tags: ["Wayanad Travel Guide", "Sightseeing", "Adventure"] },
  { id: "wellness", name: "Wellness & Yoga", tags: ["Wellness", "Staycation Guide", "Yoga"] },
  { id: "cuisine", name: "Kerala Cuisine", tags: ["Food & Drink", "Traditional Cuisine", "Spices"] }
];

interface BlogListClientProps {
  initialBlogs: any[];
}

export default function BlogListClient({ initialBlogs }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "all") return initialBlogs;
    const categoryInfo = CATEGORIES.find(cat => cat.id === activeCategory);
    if (!categoryInfo) return initialBlogs;

    return initialBlogs.filter(blog =>
      blog.tags?.some((tag: string) => categoryInfo.tags?.includes(tag))
    );
  }, [activeCategory, initialBlogs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* CATEGORY TABS */}
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-16">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer
              ${activeCategory === category.id
                ? "bg-[#C89B3C] text-white shadow-md shadow-[#C89B3C]/20"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-zinc-800/60 dark:hover:bg-zinc-805 dark:text-zinc-350"
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* BLOG GRID */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => {
            const formattedDate = blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Recent";

            const plainText = blog.content.replace(/<[^>]*>/g, "");
            const wordCount = plainText.split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200));

            return (
              <article
                key={blog._id}
                className="group flex flex-col bg-zinc-50 dark:bg-[#111827] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-[0_4px_25px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)] border border-zinc-150/40 dark:border-zinc-850/30 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-64 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={blog.coverImage?.url || "https://images.unsplash.com/photo-1545244040-112429607f43?q=80&w=800"}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                  />
                  {blog.tags && blog.tags[0] && (
                    <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md text-zinc-900 dark:text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                      {blog.tags[0]}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#C89B3C]" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#C89B3C]" />
                      {readTime} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-serif font-medium text-zinc-900 dark:text-white group-hover:text-[#C89B3C] dark:group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-3 leading-snug">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-zinc-500 dark:text-zinc-400 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-6 mt-auto border-t border-zinc-200/50 dark:border-zinc-800/80">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {blog.author?.avatarUrl ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={blog.author.avatarUrl}
                            alt={blog.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#C89B3C]/20 flex items-center justify-center text-xs font-semibold text-[#C89B3C]">
                          {blog.author?.name ? blog.author.name.charAt(0) : "A"}
                        </div>
                      )}
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-350">
                        {blog.author?.name || "Resort Admin"}
                      </span>
                    </div>

                    {/* Read link */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C89B3C] dark:text-[#D4AF37] hover:gap-2.5 transition-all duration-300"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <BookOpen size={48} className="mx-auto text-zinc-350 mb-4 stroke-1" />
          <h3 className="text-xl font-serif text-zinc-650 dark:text-zinc-350 mb-2">No articles found</h3>
          <p className="text-zinc-400 text-sm">We couldn't find any articles matching this category tab. Please check back later!</p>
        </div>
      )}

    </div>
  );
}
