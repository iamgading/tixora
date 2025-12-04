"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { removeTeamMember } from "./actions";

interface TeamMemberActionsProps {
  memberId: string;
  eventId: string;
}

export function TeamMemberActions({ memberId, eventId }: TeamMemberActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    
    const result = await removeTeamMember(eventId, memberId);
    
    if (result.success) {
      toast.success("Anggota tim berhasil dihapus");
    } else {
      toast.error(result.error || "Gagal menghapus anggota");
    }
    
    setIsRemoving(false);
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isRemoving}
        className="p-2 text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors disabled:opacity-50"
      >
        {isRemoving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleRemove}
        title="Hapus Anggota Tim"
        description="Yakin ingin menghapus anggota ini dari tim? Mereka tidak akan bisa mengakses event ini lagi."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </>
  );
}
