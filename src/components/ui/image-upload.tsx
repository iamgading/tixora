"use client";

import { useState, useRef } from "react";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
}

export function ImageUpload({ value, onChange, folder = "event-images" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const supabase = createClient();
      
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("tixora")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("tixora")
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onChange(publicUrl);
      toast.success("Gambar berhasil diupload");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Gagal mengupload gambar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:border-accent/50 hover:bg-surface-hover transition-all disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
              <span className="text-sm text-muted">Mengupload...</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-accent" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Klik untuk upload gambar</p>
                <p className="text-xs text-muted mt-1">PNG, JPG, WEBP (Max 5MB)</p>
              </div>
            </>
          )}
        </button>
      )}
    </div>
  );
}
