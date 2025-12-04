"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { approveWaitlist, rejectWaitlist } from "./actions";

interface WaitlistActionsProps {
  registrationId: string;
  eventId: string;
  name: string;
}

export function WaitlistActions({ registrationId, eventId, name }: WaitlistActionsProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    const result = await approveWaitlist(eventId, registrationId);
    setIsApproving(false);

    if (result.success) {
      toast.success(`${name} berhasil disetujui`);
    } else {
      toast.error(result.error || "Gagal menyetujui");
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    const result = await rejectWaitlist(eventId, registrationId);
    setIsRejecting(false);

    if (result.success) {
      toast.success(`${name} ditolak dari waitlist`);
    } else {
      toast.error(result.error || "Gagal menolak");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleApprove}
        disabled={isApproving || isRejecting}
        className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-950/50 rounded-lg transition-colors disabled:opacity-50"
        title="Setujui"
      >
        {isApproving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={handleReject}
        disabled={isApproving || isRejecting}
        className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg transition-colors disabled:opacity-50"
        title="Tolak"
      >
        {isRejecting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <X className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
