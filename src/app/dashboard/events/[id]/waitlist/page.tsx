import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Users, Clock, Check } from "lucide-react";
import type { Event, Registration } from "@/lib/types/database";
import { WaitlistActions } from "./waitlist-actions";

export default async function WaitlistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) {
    notFound();
  }

  const typedEvent = event as Event;

  // Get waitlist registrations
  const { data: waitlist } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", id)
    .eq("is_waitlist", true)
    .order("created_at", { ascending: true });

  const waitlistItems = (waitlist as Registration[]) || [];
  const pendingCount = waitlistItems.filter(w => !w.waitlist_approved_at).length;
  const approvedCount = waitlistItems.filter(w => w.waitlist_approved_at).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href={`/dashboard/events/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Event
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Waiting List</h1>
        <p className="text-muted">{typedEvent.title}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{waitlistItems.length}</p>
          <p className="text-sm text-muted">Total Waitlist</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl border border-amber-200 dark:border-amber-900 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</p>
          <p className="text-sm text-amber-600 dark:text-amber-400">Menunggu</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950/50 rounded-xl border border-green-200 dark:border-green-900 p-4 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{approvedCount}</p>
          <p className="text-sm text-green-600 dark:text-green-400">Disetujui</p>
        </div>
      </div>

      {/* Waitlist Table */}
      <div className="bg-surface rounded-2xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Daftar Tunggu</h2>
        </div>

        {waitlistItems.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-surface-hover rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Belum ada waitlist</h3>
            <p className="text-sm text-muted">Waitlist akan muncul jika kuota event penuh</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-hover text-left text-sm text-muted">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Nama</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Waktu Daftar</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {waitlistItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-surface-hover transition-colors">
                    <td className="px-6 py-4 text-muted">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                    <td className="px-6 py-4 text-muted">{item.email}</td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {item.waitlist_approved_at ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                          <Check className="w-3 h-3" />
                          Disetujui
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                          <Clock className="w-3 h-3" />
                          Menunggu
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {!item.waitlist_approved_at && (
                        <WaitlistActions 
                          registrationId={item.id} 
                          eventId={id}
                          name={item.name}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
