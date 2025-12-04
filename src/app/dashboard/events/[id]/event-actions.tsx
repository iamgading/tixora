"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteEvent, duplicateEvent } from "./edit/actions";

interface EventActionsProps {
  eventId: string;
  eventTitle: string;
}

export function EventActions({ eventId, eventTitle }: EventActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteEvent(eventId);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Event berhasil dihapus");
      router.push("/dashboard");
    }
  };

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    const result = await duplicateEvent(eventId);
    setIsDuplicating(false);
    
    if (result.error) {
      toast.error(result.error);
    } else if (result.eventId) {
      toast.success("Event berhasil diduplikasi");
      router.push(`/dashboard/events/${result.eventId}`);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleDuplicate}
          disabled={isDuplicating}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm bg-surface-hover text-foreground font-medium rounded-xl border border-border hover:border-accent/50 transition-all disabled:opacity-50"
        >
          {isDuplicating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          Duplikasi
        </button>
        <Link
          href={`/dashboard/events/${eventId}/edit`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm bg-surface-hover text-foreground font-medium rounded-xl border border-border hover:border-accent/50 transition-all"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-medium rounded-xl border border-red-200 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-950 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Hapus
        </button>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Hapus Event"
        description={`Yakin ingin menghapus event "${eventTitle}"? Semua data peserta juga akan ikut terhapus. Aksi ini tidak bisa dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </>
  );
}
