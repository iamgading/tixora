"use client";

import { useState } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Konfirmasi",
  cancelText = "Batal",
  variant = "default",
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const variantStyles = {
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-amber-500 hover:bg-amber-600",
    default: "bg-accent hover:bg-accent-dark",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-surface rounded-2xl border border-border shadow-xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div className="flex items-start gap-4">
            {variant === "danger" && (
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted mt-1">{description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 text-foreground font-medium bg-surface-hover rounded-xl hover:bg-border transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`flex-1 py-2.5 text-white font-medium rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${variantStyles[variant]}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
