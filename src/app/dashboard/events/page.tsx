import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { 
  Plus, 
  Calendar, 
  Users, 
  UserCheck,
  ArrowRight,
  CalendarX,
  MapPin,
  Clock,
} from "lucide-react";
import type { Event } from "@/lib/types/database";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const eventList = (events as Event[]) || [];

  const eventsWithStats = await Promise.all(
    eventList.map(async (event) => {
      const { count: totalRegistrations } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", event.id);

      const { count: totalCheckedIn } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", event.id)
        .not("checked_in_at", "is", null);

      const eventDate = new Date(event.event_date);
      const isExpired = eventDate < new Date();

      return {
        ...event,
        total_registrations: totalRegistrations || 0,
        total_checked_in: totalCheckedIn || 0,
        is_expired: isExpired,
      };
    })
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Event</h1>
          <p className="text-muted mt-1">Daftar semua event yang kamu buat</p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Buat Event Baru
        </Link>
      </div>

      {/* Event List */}
      {eventsWithStats.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center">
          <div className="w-16 h-16 bg-surface-hover rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CalendarX className="w-8 h-8 text-muted" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Belum ada event</h3>
          <p className="text-muted text-sm mb-6">Mulai buat event pertama kamu sekarang</p>
          <Link
            href="/dashboard/events/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all"
          >
            <Plus className="w-4 h-4" />
            Buat Event
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {eventsWithStats.map((event) => (
            <Link
              key={event.id}
              href={`/dashboard/events/${event.id}`}
              className="block bg-surface rounded-2xl border border-border p-5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                      {event.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      event.is_published 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" 
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}>
                      {event.is_published ? "Published" : "Draft"}
                    </span>
                    {event.is_expired && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">
                        Berakhir
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(event.event_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {event.event_time && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {event.event_time.split(':').slice(0, 2).join(':')} WIB
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 text-muted">
                      <Users className="w-4 h-4" />
                      <span className="text-lg font-semibold text-foreground">{event.total_registrations}</span>
                    </div>
                    <p className="text-xs text-muted">Pendaftar</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 text-muted">
                      <UserCheck className="w-4 h-4" />
                      <span className="text-lg font-semibold text-foreground">{event.total_checked_in}</span>
                    </div>
                    <p className="text-xs text-muted">Hadir</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
