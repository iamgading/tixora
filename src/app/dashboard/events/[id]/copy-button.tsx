"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Link berhasil disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2.5 bg-accent text-white rounded-xl hover:bg-accent-dark transition-all active:scale-[0.98]"
    >
      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
    </button>
  );
}
