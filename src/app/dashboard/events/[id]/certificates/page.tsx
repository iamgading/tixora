import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Award } from "lucide-react";
import type { Event, Registration } from "@/lib/types/database";
import { CertificateGenerator } from "./certificate-generator";

export default async function CertificatesPage({
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

  // Get checked-in registrations only
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", id)
    .not("checked_in_at", "is", null)
    .order("checked_in_at", { ascending: true });

  const attendees = (registrations as Registration[]) || [];

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
        <h1 className="text-2xl font-bold text-foreground">Sertifikat</h1>
        <p className="text-muted">{typedEvent.title}</p>
      </div>

      {attendees.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-border p-12 text-center">
          <div className="w-16 h-16 bg-surface-hover rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-muted" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Belum ada peserta yang check-in</h3>
          <p className="text-sm text-muted">Sertifikat hanya bisa dibuat untuk peserta yang sudah hadir</p>
        </div>
      ) : (
        <CertificateGenerator 
          event={typedEvent} 
          attendees={attendees} 
        />
      )}
    </div>
  );
}
