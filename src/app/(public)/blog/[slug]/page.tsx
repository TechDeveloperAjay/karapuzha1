import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/actions/blogs";
import ShareButton from "@/components/shared/ShareButton";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";

// Generate dynamic metadata for Search Engine Optimization (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return {
      title: "Article Not Found | Karapuzha Water Scapes",
    };
  }

  return {
    title: `${blog.title} | Karapuzha Water Scapes`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  // If the article is draft or does not exist, trigger Next.js 404 handler
  if (!blog) {
    notFound();
  }

  // Calculate estimated read time
  const plainText = blog.content.replace(/<[^>]*>/g, "");
  const wordCount = plainText.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recent";

  // Fetch all published blogs to compute related articles
  const allPublished = await getPublishedBlogs();
  const relatedBlogs = allPublished
    .filter((b: any) => b._id !== blog._id)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-white dark:bg-[#0b0f14] text-zinc-900 dark:text-white transition-colors duration-300 pb-24">
      {/* Breadcrumbs Banner */}
      <div className="bg-zinc-50 dark:bg-[#111827]/40 border-b border-zinc-150/50 dark:border-zinc-850/30 pt-12 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-450 dark:text-zinc-500 font-medium">
            <Link href="/" className="hover:text-[#C89B3C] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-[#C89B3C] transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[200px] sm:max-w-sm">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* Post Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {blog.tags && blog.tags[0] && (
          <span className="inline-block bg-[#C89B3C]/10 text-[#C89B3C] dark:text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6">
            {blog.tags[0]}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight mb-8 text-zinc-900 dark:text-white">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-zinc-150/60 dark:border-zinc-800/80">
          <div className="flex items-center gap-4">
            {/* Author Profile */}
            {blog.author?.avatarUrl ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={blog.author.avatarUrl}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#C89B3C]/20 flex items-center justify-center text-sm font-semibold text-[#C89B3C]">
                {blog.author?.name ? blog.author.name.charAt(0) : "A"}
              </div>
            )}

            <div>
              <div className="text-sm font-medium text-zinc-800 dark:text-zinc-255">
                {blog.author?.name || "Resort Admin"}
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-450 dark:text-zinc-500 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>

          {/* Share Button (Client side) */}
          <ShareButton />
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="max-w-5xl mx-auto px-0 sm:px-6 lg:px-8 mb-16">
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full sm:rounded-2xl overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={blog.coverImage?.url || "https://images.unsplash.com/photo-1545244040-112429607f43?q=80&w=1200"}
            alt={blog.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="
            /* Custom HTML content styling rules */
            [&>p]:text-lg [&>p]:text-zinc-650 dark:[&>p]:text-zinc-300 [&>p]:font-light [&>p]:leading-relaxed [&>p]:mb-6
            [&>h3]:text-2xl [&>h3]:font-serif [&>h3]:font-medium [&>h3]:text-zinc-900 dark:[&>h3]:text-white [&>h3]:mt-10 [&>h3]:mb-4
            [&>h4]:text-xl [&>h4]:font-serif [&>h4]:font-medium [&>h4]:text-zinc-900 dark:[&>h4]:text-white [&>h4]:mt-8 [&>h4]:mb-3
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-zinc-650 dark:[&>ul]:text-zinc-300 [&>ul]:space-y-2 [&>ul]:font-light
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-zinc-650 dark:[&>ol]:text-zinc-300 [&>ol]:space-y-2 [&>ol]:font-light
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#C89B3C] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-zinc-650 dark:[&>blockquote]:text-zinc-350 [&>blockquote]:my-8 [&>blockquote]:font-light
            [&>pre]:bg-zinc-50 dark:[&>pre]:bg-zinc-900 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-6
          "
        />

        {/* Tags footer */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-8 border-t border-zinc-150 dark:border-zinc-800">
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs px-3.5 py-1.5 rounded-full font-light"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation & Related Posts */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-150 dark:border-zinc-800 pt-16">
        
        {/* Back Link */}
        <div className="mb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C89B3C] dark:text-[#D4AF37] hover:text-[#b08730] dark:hover:text-[#c4a14a] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div>
            <h3 className="text-2xl font-serif font-medium text-zinc-900 dark:text-white mb-8">
              Recommended Reads
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.map((relBlog: any) => {
                const relFormattedDate = relBlog.publishedAt
                  ? new Date(relBlog.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Recent";

                return (
                  <Link
                    href={`/blog/${relBlog.slug}`}
                    key={relBlog._id}
                    className="group block bg-zinc-50 dark:bg-[#111827] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src={relBlog.coverImage?.url || "https://images.unsplash.com/photo-1545244040-112429607f43?q=80&w=800"}
                        alt={relBlog.title}
                        fill
                        className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-[11px] font-semibold text-[#C89B3C] dark:text-[#D4AF37] uppercase tracking-wider mb-2">
                        {relFormattedDate}
                      </div>
                      <h4 className="text-lg font-serif font-medium text-zinc-900 dark:text-white group-hover:text-[#C89B3C] dark:group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {relBlog.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </footer>
    </article>
  );
}
