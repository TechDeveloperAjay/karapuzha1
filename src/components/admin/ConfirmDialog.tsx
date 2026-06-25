"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm Action",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-150" />
        
        {/* Dialog Content */}
        <DialogPrimitive.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-[95vw] max-w-md p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 overflow-hidden font-sans">
          
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-full flex-shrink-0 ${
              variant === "danger" && "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-450"
            } ${
              variant === "warning" && "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-450"
            } ${
              variant === "info" && "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-450"
            }`}>
              <AlertTriangle size={20} />
            </div>
            
            <div className="space-y-1.5 flex-1">
              <DialogPrimitive.Title className="text-base font-bold text-slate-900 dark:text-zinc-50 leading-6">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-xs text-slate-500 dark:text-zinc-450 leading-normal">
                {description}
              </DialogPrimitive.Description>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-250 dark:border-zinc-700 rounded-lg transition-colors focus:outline-none disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              disabled={isLoading}
              className={`px-3.5 py-2 text-xs font-semibold text-white rounded-lg transition-all focus:outline-none disabled:opacity-50 shadow-sm ${
                variant === "danger" && "bg-rose-600 hover:bg-rose-500"
              } ${
                variant === "warning" && "bg-amber-600 hover:bg-amber-500"
              } ${
                variant === "info" && "bg-teal-600 hover:bg-teal-500"
              }`}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>

          <DialogPrimitive.Close className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-100 rounded-md transition-colors">
            <X size={16} />
          </DialogPrimitive.Close>

        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
