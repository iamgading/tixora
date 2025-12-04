"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { sendTicketEmail } from "@/lib/email/resend";
import type { Event } from "@/lib/types/database";

interface RegisterState {
  error?: string;
}

export async function register(
  _prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState | null> {
  const supabase = await createClient();

  const eventId = formData.get("eventId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || null;

  // Get event details for email
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (!event) {
    return { error: "Event tidak ditemukan" };
  }

  const typedEvent = event as Event;

  // Generate unique QR code
  const qrCode = `TIX-${uuidv4().split("-")[0].toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  const { data, error } = await supabase
    .from("registrations")
    .insert({
      event_id: eventId,
      name,
      email,
      phone,
      qr_code: qrCode,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "Email ini sudah terdaftar untuk event ini." };
    }
    return { error: error.message };
  }

  // Send confirmation email (async, don't wait)
  const ticketUrl = `${process.env.NEXT_PUBLIC_APP_URL}/ticket/${data.qr_code}`;
  sendTicketEmail({
    to: email,
    eventTitle: typedEvent.title,
    eventDate: typedEvent.event_date,
    eventTime: typedEvent.event_time,
    eventLocation: typedEvent.location,
    attendeeName: name,
    qrCode: data.qr_code,
    ticketUrl,
  }).catch(console.error);

  redirect(`/ticket/${data.qr_code}`);
}
