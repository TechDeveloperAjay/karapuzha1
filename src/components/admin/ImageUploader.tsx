"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: { url: string; publicId: string }[];
  onChange: (value: { url: string; publicId: string }[]) => void;
  maxImages?: number;
  loading?: boolean;
}

export default function ImageUploader({
  value = [],
  onChange,
  maxImages = 5,
  loading = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Simulate direct-to-Cloudinary signed upload process
    setLocalLoading(true);
    setProgress(10);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      const newImages = Array.from(files).map((file, idx) => ({
        url: URL.createObjectURL(file), // Local blob preview URL
        publicId: `cloudinary_upload_${Date.now()}_${idx}`,
      }));

      const updatedImages = [...value, ...newImages].slice(0, maxImages);
      onChange(updatedImages);
      setLocalLoading(false);
      setProgress(0);
    }, 1200);
  };

  const handleRemove = (publicIdToRemove: string) => {
    const updatedImages = value.filter((img) => img.publicId !== publicIdToRemove);
    onChange(updatedImages);
  };

  const triggerSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Drag and Drop box */}
      {value.length < maxImages && (
        <div 
          onClick={triggerSelect}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-zinc-900/50 hover:bg-slate-50 dark:hover:bg-zinc-900/80 hover:border-slate-350 dark:hover:border-zinc-700 cursor-pointer transition-all text-center"
        >
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
          />
          {localLoading || loading ? (
            <div className="space-y-2">
              <Loader2 className="animate-spin text-teal-600 dark:text-teal-400 mx-auto" size={24} />
              <p className="text-xs text-slate-500 dark:text-zinc-400">Uploading assets ({progress}%)</p>
            </div>
          ) : (
            <div className="space-y-2">
              <UploadCloud className="text-slate-400 dark:text-zinc-500 mx-auto" size={28} />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                  Click to upload images
                </p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1">
                  Supports PNG, JPG, WebP up to 5MB (Max {maxImages} images)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid of uploaded images previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {value.map((img) => (
            <div 
              key={img.publicId} 
              className="relative aspect-video sm:aspect-square rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 overflow-hidden group shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.url} 
                alt="Room upload preview" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              />
              
              {/* Close Button Hover */}
              <button
                type="button"
                onClick={() => handleRemove(img.publicId)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors shadow"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
