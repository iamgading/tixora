"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createEvent } from "./actions";

export function CreateEventForm() {
  const [state, formAction, isPending] = useActionState(createEvent, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state.eventId) {
      toast.success("Event berhasil dibuat!");
      router.push(`/dashboard/events/${state.eventId}`);
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6" suppressHydrationWarning>
      <div suppressHydrationWarning>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Nama Event <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          disabled={isPending}
          className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all disabled:opacity-50"
          placeholder="Contoh: Seminar Digital Marketing 2024"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          disabled={isPending}
          className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
          placeholder="Jelaskan tentang event kamu..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="event_date" className="block text-sm font-medium text-foreground mb-2">
            Tanggal Event <span className="text-red-500">*</span>
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            required
            disabled={isPending}
            className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="event_time" className="block text-sm font-medium text-foreground mb-2">
            Waktu Event
          </label>
          <input
            id="event_time"
            name="event_time"
            type="time"
            disabled={isPending}
            className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
          Lokasi
        </label>
        <input
          id="location"
          name="location"
          type="text"
          disabled={isPending}
          className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all disabled:opacity-50"
          placeholder="Contoh: Gedung Serbaguna, Jakarta"
        />
      </div>

      <div>
        <label htmlFor="max_attendees" className="block text-sm font-medium text-foreground mb-2">
          Maksimal Peserta
        </label>
        <input
          id="max_attendees"
          name="max_attendees"
          type="number"
          min="1"
          disabled={isPending}
          className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all disabled:opacity-50"
          placeholder="Kosongkan jika tidak ada batasan"
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-surface-hover rounded-xl">
        <input
          id="is_published"
          name="is_published"
          type="checkbox"
          disabled={isPending}
          className="w-5 h-5 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
        />
        <div>
          <label htmlFor="is_published" className="text-sm font-medium text-foreground cursor-pointer">
            Langsung Publish
          </label>
          <p className="text-xs text-muted">Event akan langsung bisa diakses publik</p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Link
          href="/dashboard"
          className="flex-1 py-3 text-center text-foreground font-medium bg-surface-hover rounded-xl hover:bg-border transition-colors"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-all hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Membuat...
            </>
          ) : (
            "Buat Event"
          )}
        </button>
      </div>
    </form>
  );
}
