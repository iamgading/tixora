import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { 
  Plus, 
  Calendar, 
  Users, 
  UserCheck,
  ArrowRight,
  CalendarX,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import type { Event } from "@/lib/types/database";

export default async function DashboardPage() {
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

      return {
        ...event,
        total_registrations: totalRegistrations || 0,
        total_checked_in: totalCheckedIn || 0,
      };
    })
  );

  const totalEvents = eventList.length;
  const totalRegistrations = eventsWithStats.reduce((sum, e) => sum + e.total_registrations, 0);
  const totalCheckedIn = eventsWithStats.reduce((sum, e) => sum + e.total_checked_in, 0);
  const checkInRate = totalRegistrations > 0 ? Math.round((totalCheckedIn / totalRegistrations) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted mt-1">Selamat datang kembali! Kelola event kamu di sini.</p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-accent to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Buat Event Baru
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{totalEvents}</p>
            <p className="text-sm text-white/80">Total Event</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{totalRegistrations.toLocaleString()}</p>
            <p className="text-sm text-white/80">Total Pendaftar</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-3">
              <UserCheck className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{totalCheckedIn.toLocaleString()}</p>
            <p className="text-sm text-white/80">Total Check-in</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{checkInRate}%</p>
            <p className="text-sm text-white/80">Check-in Rate</p>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Event Kamu</h2>
            <p className="text-sm text-muted">Kelola dan pantau semua event</p>
          </div>
          {eventsWithStats.length > 0 && (
            <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-lg">
              {eventsWithStats.length} event
            </span>
          )}
        </div>
        
        {eventsWithStats.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-teal-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <CalendarX className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Belum ada event</h3>
            <p className="text-muted mb-8 max-w-sm mx-auto">
              Mulai buat event pertamamu dan kelola registrasi dengan mudah
            </p>
            <Link
              href="/dashboard/events/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              <Plus className="w-5 h-5" />
              Buat Event Pertama
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {eventsWithStats.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventRow({ 
  event 
}: { 
  event: Event & { total_registrations: number; total_checked_in: number } 
}) {
  const eventDate = new Date(event.event_date);
  const isUpcoming = eventDate >= new Date();
  const checkInPercent = event.total_registrations > 0 
    ? Math.round((event.total_checked_in / event.total_registrations) * 100) 
    : 0;
  
  return (
    <Link
      href={`/dashboard/events/${event.id}`}
      className="flex items-center gap-4 px-6 py-5 hover:bg-surface-hover transition-colors group"
    >
      {/* Event Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
        isUpcoming 
          ? "bg-gradient-to-br from-accent/10 to-teal-500/10" 
          : "bg-surface-hover"
      }`}>
        <Calendar className={`w-6 h-6 ${isUpcoming ? "text-accent" : "text-muted"}`} />
      </div>

      {/* Event Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className="font-semibold text-foreground truncate group-hover:text-accent transition-colors">
            {event.title}
          </h3>
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${
            event.is_published 
              ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" 
              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          }`}>
            {event.is_published ? "Published" : "Draft"}
          </span>
          {isUpcoming && (
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 flex-shrink-0">
              Upcoming
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {eventDate.toLocaleDateString("id-ID", { 
              day: "numeric", 
              month: "short", 
              year: "numeric" 
            })}
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span className="truncate max-w-[150px]">{event.location}</span>
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{event.total_registrations}</p>
          <p className="text-xs text-muted">Pendaftar</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{event.total_checked_in}</p>
          <p className="text-xs text-muted">Check-in</p>
        </div>
        <div className="w-16">
          <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-teal-500 rounded-full transition-all"
              style={{ width: `${checkInPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted text-center mt-1">{checkInPercent}%</p>
        </div>
      </div>

      {/* Arrow */}
      <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  );
}
