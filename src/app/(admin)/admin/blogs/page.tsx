"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getAllBlogsAdmin, deleteBlog } from "@/actions/blogs";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch blogs on component mount
  useEffect(() => {
    async function loadBlogs() {
      const data = await getAllBlogsAdmin();
      setBlogs(data);
      setIsLoading(false);
    }
    loadBlogs();
  }, []);

  const handleDelete = async () => {
    if (deleteId) {
      const result = await deleteBlog(deleteId);
      if (result.success) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== deleteId));
      } else {
        alert("Failed to delete post: " + result.error);
      }
      setDeleteId(null);
    }
  };

  const columns = [
    {
      header: "Cover",
      cell: (item: any) => (
        <div className="w-12 h-8 rounded bg-slate-100 dark:bg-zinc-800 overflow-hidden relative border border-slate-200 dark:border-zinc-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={item.coverImage?.url || "https://images.unsplash.com/photo-1545244040-112429607f43?q=80&w=150"} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      header: "Title",
      cell: (item: any) => (
        <div className="flex flex-col max-w-xs sm:max-w-md">
          <span className="font-semibold text-slate-900 dark:text-zinc-100 truncate">{item.title}</span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500">/{item.slug}</span>
        </div>
      )
    },
    {
      header: "Author",
      cell: (item: any) => (
        <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
          {item.author?.name || "Resort Admin"}
        </span>
      )
    },
    {
      header: "Date",
      cell: (item: any) => (
        <span className="text-xs text-slate-500 dark:text-zinc-400">
          {item.publishedAt 
            ? new Date(item.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) 
            : "Draft"}
        </span>
      )
    },
    {
      header: "Status",
      cell: (item: any) => <StatusBadge status={item.status} />
    },
    {
      header: "Actions",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/blogs/${item._id}`}
            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Edit size={14} />
          </Link>
          <button 
            onClick={() => setDeleteId(item._id)}
            className="p-1 rounded text-rose-500 hover:text-rose-700 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Resort travel blogs & articles" 
        description="Publish local tourism announcements, travel guides, spice recipes, and guest events reviews."
        actions={
          <Link 
            href="/admin/blogs/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow transition-colors"
          >
            <Plus size={14} />
            <span>Write New Post</span>
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <DataTable 
          data={blogs} 
          columns={columns} 
          keyExtractor={(item) => item._id} 
        />
      )}

      <ConfirmDialog 
        isOpen={deleteId !== null} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        title="Delete Blog Post" 
        description="Are you absolutely sure you want to delete this blog post? It will be removed from your website and database instantly."
      />
    </div>
  );
}
