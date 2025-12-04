import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/types/database";
import { EditEventForm } from "./edit-form";

export default async function EditEventPage({
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
    <div className="max-w-2xl mx-auto">
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
        <h1 className="text-2xl font-bold text-foreground">Edit Event</h1>
        <p className="text-muted">Ubah detail event</p>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 lg:p-8">
        <EditEventForm event={typedEvent} />
      </div>
    </div>
  );
}
