import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  UserCheck,
  ExternalLink,
  ScanLine,
  ListTodo,
  Award,
  UsersRound,
} from "lucide-react";
import type { Event, Registration } from "@/lib/types/database";
import { CopyButton } from "./copy-button";
import { EventActions } from "./event-actions";
import { RegistrationsTable } from "./registrations-table";
import { BulkCheckIn } from "./bulk-checkin";

export default async function EventDetailPage({
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

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", id)
    .order("created_at", { ascending: false });

  const registrationList = (registrations as Registration[]) || [];
  const totalRegistrations = registrationList.length;
  const totalCheckedIn = registrationList.filter(r => r.checked_in_at).length;
  
  const eventUrl = `${process.env.NEXT_PUBLIC_APP_URL}/event/${typedEvent.slug}`;
  const eventDate = new Date(typedEvent.event_date);
  const isExpired = eventDate < new Date();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
        <EventActions eventId={id} eventTitle={typedEvent.title} />
      </div>

      {/* Event Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 lg:p-8 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{typedEvent.title}</h1>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                typedEvent.is_published 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" 
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}>
                {typedEvent.is_published ? "Published" : "Draft"}
              </span>
              {isExpired && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">
                  Event Berakhir
                </span>
              )}
            </div>

            {typedEvent.description && (
              <p className="text-muted mb-4">{typedEvent.description}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(typedEvent.event_date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {typedEvent.event_time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {typedEvent.event_time.split(':').slice(0, 2).join(':')} WIB
                </span>
              )}
              {typedEvent.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {typedEvent.location}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/dashboard/events/${id}/scan`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]"
            >
              <ScanLine className="w-4 h-4" />
              Scan QR
            </Link>
            {typedEvent.is_published && (
              <Link
                href={`/event/${typedEvent.slug}`}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-surface-hover text-foreground font-medium rounded-xl border border-border hover:border-accent/50 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Lihat Event
              </Link>
            )}
          </div>
        </div>

        {/* Share Link */}
        {typedEvent.is_published && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-2">Link Pendaftaran</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={eventUrl}
                className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-muted"
              />
              <CopyButton text={eventUrl} />
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Link
          href={`/dashboard/events/${id}/waitlist`}
          className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border hover:border-accent/50 transition-all group"
        >
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-foreground group-hover:text-accent transition-colors">Waitlist</p>
            <p className="text-xs text-muted">Kelola daftar tunggu</p>
          </div>
        </Link>
        <Link
          href={`/dashboard/events/${id}/certificates`}
          className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border hover:border-accent/50 transition-all group"
        >
          <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-foreground group-hover:text-accent transition-colors">Sertifikat</p>
            <p className="text-xs text-muted">Generate sertifikat</p>
          </div>
        </Link>
        <Link
          href={`/dashboard/events/${id}/team`}
          className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border hover:border-accent/50 transition-all group"
        >
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
            <UsersRound className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-foreground group-hover:text-accent transition-colors">Tim</p>
            <p className="text-xs text-muted">Kelola akses</p>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalRegistrations}</p>
          <p className="text-sm text-muted">Total Pendaftar</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalCheckedIn}</p>
          <p className="text-sm text-muted">Sudah Check-in</p>
        </div>
      </div>

      {/* Bulk Check-in */}
      <BulkCheckIn eventId={id} registrations={registrationList} />

      {/* Registrations List */}
      <RegistrationsTable 
        registrations={registrationList} 
        eventTitle={typedEvent.title} 
      />
    </div>
  );
}
