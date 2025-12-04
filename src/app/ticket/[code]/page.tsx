import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Clock, MapPin, Check } from "lucide-react";
import type { Event, Registration } from "@/lib/types/database";
import { QRCodeDisplay } from "./qr-code";
import { DownloadTicketButton } from "./download-button";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const supabase = await createClient();

  const { data: registration } = await supabase
    .from("registrations")
    .select("*, event:events(*)")
    .eq("qr_code", code)
    .single();

  if (!registration) {
    notFound();
  }

  const typedReg = registration as Registration & { event: Event };
  const eventDate = new Date(typedReg.event.event_date);
  const formattedDate = eventDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/50">
      {/* Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">tx</span>
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:block">Tixora</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Success Banner */}
        <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">Pendaftaran Berhasil!</p>
            <p className="text-sm text-green-600 dark:text-green-400">Simpan tiket ini untuk check-in di hari H</p>
          </div>
        </div>

        {/* Desktop: Side by side layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Ticket Card - Full on mobile, left on desktop */}
          <div className="lg:col-span-3">
            <div className="bg-surface rounded-2xl border border-border shadow-xl shadow-black/5 overflow-hidden">
              {/* Ticket Header */}
              <div className="bg-gradient-to-r from-accent to-teal-500 p-5 sm:p-6 text-white">
                <h1 className="text-lg sm:text-xl font-bold mb-2">{typedReg.event.title}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-white/90">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </span>
                  {typedReg.event.event_time && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {typedReg.event.event_time.split(':').slice(0, 2).join(':')} WIB
                    </span>
                  )}
                </div>
                {typedReg.event.location && (
                  <div className="flex items-center gap-1.5 text-sm text-white/80 mt-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{typedReg.event.location}</span>
                  </div>
                )}
              </div>

              {/* Dashed separator */}
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full"></div>
                <div className="border-t-2 border-dashed border-border mx-6"></div>
              </div>

              {/* QR Code Section */}
              <div className="p-5 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <p className="text-xs text-muted mb-1">Peserta</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground">{typedReg.name}</p>
                  <p className="text-sm text-muted">{typedReg.email}</p>
                </div>

                <div className="flex justify-center mb-4 sm:mb-6">
                  <QRCodeDisplay value={typedReg.qr_code} />
                </div>

                <div className="text-center mb-4">
                  <p className="text-xs text-muted mb-1">Kode Tiket</p>
                  <p className="font-mono text-sm font-medium text-foreground bg-surface-hover px-3 py-1.5 rounded-lg inline-block">{typedReg.qr_code}</p>
                </div>

                {/* Download Button */}
                <DownloadTicketButton
                  eventTitle={typedReg.event.title}
                  eventDate={formattedDate}
                  eventTime={typedReg.event.event_time}
                  eventLocation={typedReg.event.location}
                  attendeeName={typedReg.name}
                  qrCode={typedReg.qr_code}
                />
              </div>

              {/* Check-in Status */}
              {typedReg.checked_in_at && (
                <>
                  <div className="border-t border-border"></div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30">
                    <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Check-in pada {new Date(typedReg.checked_in_at).toLocaleString("id-ID")} WIB
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Instructions - Hidden on mobile, shown on desktop right */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="p-5 sm:p-6 bg-surface rounded-2xl border border-border">
                <h3 className="font-semibold text-foreground mb-4">Petunjuk Check-in</h3>
                <ul className="space-y-3 text-sm text-muted">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                    <span>Screenshot atau download tiket ini sebagai backup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                    <span>Datang ke lokasi event sesuai jadwal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                    <span>Tunjukkan QR code ke panitia untuk verifikasi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                    <span>Selesai! Selamat menikmati event</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  <strong>Tips:</strong> Pastikan brightness layar cukup terang saat scan QR code
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted">
            Powered by <Link href="/" className="text-accent hover:underline font-medium">Tixora</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
