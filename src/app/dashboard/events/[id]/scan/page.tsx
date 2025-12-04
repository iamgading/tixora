import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft } from "lucide-react";
import type { Event } from "@/lib/types/database";
import { Scanner } from "./scanner";

export default async function ScanPage({
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

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <Link 
          href={`/dashboard/events/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Event
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Scan QR Code</h1>
        <p className="text-muted">{typedEvent.title}</p>
      </div>

      <Scanner eventId={id} />
    </div>
  );
}
