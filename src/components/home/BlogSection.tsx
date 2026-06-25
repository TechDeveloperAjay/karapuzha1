import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogs } from "@/actions/blogs";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default async function BlogSection() {
  // Fetch published blogs from MongoDB, sorted by date (latest first)
  const publishedBlogs = await getPublishedBlogs();
  const latestBlogs = publishedBlogs.slice(0, 3);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#0b0f14] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#C89B3C] mb-4 block">
            Resort Journal
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-zinc-900 dark:text-white mb-6">
            Stories from the Waterscape
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 font-light">
            Stay updated with local travel guides, chef recipes, wildlife updates, and adventure ideas surrounding the Karapuzha Reservoir.
          </p>
        </div>

        {/* BLOG GRID */}
        {latestBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {latestBlogs.map((blog: any) => {
              const formattedDate = blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Recent";

              // Estimating reading time
              const plainText = blog.content.replace(/<[^>]*>/g, "");
              const wordCount = plainText.split(/\s+/).length;
              const readTime = Math.max(1, Math.ceil(wordCount / 200));

              return (
                <article
                  key={blog._id}
                  className="group flex flex-col bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300"
                >
                  {/* Image & Tag */}
                  <div className="relative h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={blog.coverImage?.url || "https://images.unsplash.com/photo-1545244040-112429607f43?q=80&w=800"}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                    />
                    {blog.tags && blog.tags[0] && (
                      <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md text-zinc-900 dark:text-white text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                        {blog.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Content */}
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
                    <h3 className="text-xl font-serif font-medium text-zinc-900 dark:text-white group-hover:text-[#C89B3C] dark:group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-3 leading-snug">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-500 dark:text-zinc-400 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Footer (Author & Read Link) */}
                    <div className="flex items-center justify-between pt-6 mt-auto border-t border-zinc-100 dark:border-zinc-800">
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

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C89B3C] dark:text-[#D4AF37] hover:gap-2.5 transition-all duration-300"
                      >
                        <span>Read More</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#111827] rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 mb-16">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">No blog posts found. Check back later!</p>
          </div>
        )}

        {/* BUTTON */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-white dark:border-[#D4AF37] dark:text-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-black font-semibold tracking-widest uppercase text-xs transition-all duration-300 rounded-full"
          >
            <span>Explore All Stories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
