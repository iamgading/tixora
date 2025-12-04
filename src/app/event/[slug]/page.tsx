import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Ticket, CheckCircle2 } from "lucide-react";
import type { Event } from "@/lib/types/database";
import { RegisterForm } from "./register-form";

export default async function PublicEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!event) {
    notFound();
  }

  const typedEvent = event as Event;

  const { count: registrationCount } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", typedEvent.id);

  const isFull = typedEvent.max_attendees 
    ? (registrationCount || 0) >= typedEvent.max_attendees 
    : false;

  const eventDate = new Date(typedEvent.event_date);
  const isPast = eventDate < new Date();
  const spotsLeft = typedEvent.max_attendees ? typedEvent.max_attendees - (registrationCount || 0) : null;
  
  // Format time to WIB (HH:MM only, no seconds)
  const formatTimeWIB = (time: string | null) => {
    if (!time) return null;
    // Remove seconds if present (HH:MM:SS -> HH:MM)
    const timeParts = time.split(':');
    const formatted = timeParts.slice(0, 2).join(':');
    return `${formatted} WIB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/50">
      {/* Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">tx</span>
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:block">Tixora</span>
          </Link>
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Mobile & Desktop: Info first, Form second */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-10">
          
          {/* Registration Form - Shows second on mobile, right on desktop */}
          <div className="order-2 lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div className="bg-surface rounded-2xl border border-border shadow-xl shadow-black/5 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-accent to-teal-500 px-5 sm:px-6 py-4 sm:py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-white">
                        Daftar Event
                      </h2>
                      <p className="text-xs sm:text-sm text-white/80">Gratis & mudah</p>
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-5 sm:p-6">
                  {isPast ? (
                    <div className="text-center py-6 sm:py-8">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-muted" />
                      </div>
                      <p className="text-muted font-medium">Event ini sudah berakhir</p>
                    </div>
                  ) : isFull ? (
                    <div className="text-center py-6 sm:py-8">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Users className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400" />
                      </div>
                      <p className="text-muted font-medium">Kuota peserta sudah penuh</p>
                      <p className="text-sm text-muted mt-2">Coba lagi di event berikutnya!</p>
                    </div>
                  ) : (
                    <>
                      {spotsLeft !== null && spotsLeft <= 10 && (
                        <div className="mb-4 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-medium text-center">
                            ⚡ Sisa {spotsLeft} slot tersedia!
                          </p>
                        </div>
                      )}
                      <RegisterForm eventId={typedEvent.id} />
                    </>
                  )}
                </div>
              </div>

              {/* Trust badges - Desktop only */}
              <div className="hidden lg:flex items-center justify-center gap-4 mt-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  100% Gratis
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  QR Instan
                </span>
              </div>
            </div>
          </div>

          {/* Event Info - Shows first on mobile, left on desktop */}
          <div className="order-1 lg:col-span-3">
            {/* Event Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-5 leading-tight">
              {typedEvent.title}
            </h1>

            {/* Event Meta Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {/* Date Card */}
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-surface rounded-xl border border-border">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted mb-0.5">Tanggal</p>
                  <p className="text-sm sm:text-base font-medium text-foreground truncate">
                    {eventDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Time Card */}
              {typedEvent.event_time && (
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-surface rounded-xl border border-border">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5">Waktu</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">{formatTimeWIB(typedEvent.event_time)}</p>
                  </div>
                </div>
              )}

              {/* Location Card */}
              {typedEvent.location && (
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-surface rounded-xl border border-border sm:col-span-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted mb-0.5">Lokasi</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">{typedEvent.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Attendees Progress */}
            {typedEvent.max_attendees && (
              <div className="p-3 sm:p-4 bg-surface rounded-xl border border-border mb-5 sm:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-muted flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    Peserta Terdaftar
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    {registrationCount || 0} / {typedEvent.max_attendees}
                  </span>
                </div>
                <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-teal-500 rounded-full transition-all"
                    style={{ width: `${Math.min(((registrationCount || 0) / typedEvent.max_attendees) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            {typedEvent.description && (
              <div className="bg-surface rounded-xl border border-border p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Tentang Event</h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed whitespace-pre-wrap">{typedEvent.description}</p>
              </div>
            )}

            {/* Mobile Trust badges */}
            <div className="flex lg:hidden items-center justify-center gap-4 mt-6 text-xs text-muted">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                100% Gratis
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                QR Instan
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 sm:mt-16 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted">
            Powered by <Link href="/" className="text-accent hover:underline font-medium">Tixora</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
