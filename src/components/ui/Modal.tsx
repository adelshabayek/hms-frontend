"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full" | string;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth,
  size,
}: ModalProps) {
  const widthClass = maxWidth || (
    size === "sm" ? "max-w-sm" :
    size === "lg" ? "max-w-3xl" :
    size === "xl" ? "max-w-5xl" :
    size === "full" ? "max-w-[95vw]" :
    "max-w-xl"
  );

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full ${widthClass} bg-card border border-border rounded-2xl shadow-2xl animate-scale-in flex flex-col max-h-[90vh]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto scrollbar-thin flex-1 px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
