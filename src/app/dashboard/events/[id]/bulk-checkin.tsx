"use client";

import { useState } from "react";
import { UserCheck, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { bulkCheckIn } from "./actions";
import type { Registration } from "@/lib/types/database";

interface BulkCheckInProps {
  eventId: string;
  registrations: Registration[];
}

export function BulkCheckIn({ eventId, registrations }: BulkCheckInProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingRegistrations = registrations.filter(r => !r.checked_in_at);
  
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleAll = () => {
    if (selectedIds.size === pendingRegistrations.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pendingRegistrations.map(r => r.id)));
    }
  };

  const handleBulkCheckIn = async () => {
    if (selectedIds.size === 0) return;
    
    setIsProcessing(true);
    const result = await bulkCheckIn(eventId, Array.from(selectedIds));
    setIsProcessing(false);
    
    if (result.success) {
      toast.success(`${result.count} peserta berhasil check-in`);
      setSelectedIds(new Set());
    } else {
      toast.error(result.error || "Gagal melakukan check-in");
    }
  };

  if (pendingRegistrations.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-surface rounded-2xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Bulk Check-in</p>
              <p className="text-sm text-muted">
                {selectedIds.size} dari {pendingRegistrations.length} peserta dipilih
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAll}
              className="px-4 py-2 text-sm font-medium text-foreground bg-surface-hover rounded-xl hover:bg-border transition-colors"
            >
              {selectedIds.size === pendingRegistrations.length ? "Batal Pilih Semua" : "Pilih Semua"}
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={selectedIds.size === 0 || isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-xl hover:bg-accent-dark transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Check-in ({selectedIds.size})
            </button>
          </div>
        </div>

        {/* Selection List */}
        {pendingRegistrations.length > 0 && (
          <div className="mt-4 max-h-48 overflow-y-auto border border-border rounded-xl divide-y divide-border">
            {pendingRegistrations.map((reg) => (
              <label
                key={reg.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(reg.id)}
                  onChange={() => toggleSelection(reg.id)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{reg.name}</p>
                  <p className="text-sm text-muted truncate">{reg.email}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleBulkCheckIn}
        title="Konfirmasi Bulk Check-in"
        description={`Yakin ingin melakukan check-in untuk ${selectedIds.size} peserta sekaligus?`}
        confirmText="Ya, Check-in"
        cancelText="Batal"
      />
    </>
  );
}
