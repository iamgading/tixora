"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function approveWaitlist(
  eventId: string,
  registrationId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Verify event ownership
  const { data: event } = await supabase
    .from("events")
    .select("id")
    .eq("id", eventId)
    .eq("user_id", user.id)
    .single();

  if (!event) {
    return { success: false, error: "Event tidak ditemukan" };
  }

  // Update registration
  const { error } = await supabase
    .from("registrations")
    .update({
      is_waitlist: false,
      waitlist_approved_at: new Date().toISOString(),
    })
    .eq("id", registrationId)
    .eq("event_id", eventId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/waitlist`);
  revalidatePath(`/dashboard/events/${eventId}`);
  return { success: true };
}

export async function rejectWaitlist(
  eventId: string,
  registrationId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Verify event ownership
  const { data: event } = await supabase
    .from("events")
    .select("id")
    .eq("id", eventId)
    .eq("user_id", user.id)
    .single();

  if (!event) {
    return { success: false, error: "Event tidak ditemukan" };
  }

  // Delete registration
  const { error } = await supabase
    .from("registrations")
    .delete()
    .eq("id", registrationId)
    .eq("event_id", eventId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}/waitlist`);
  return { success: true };
}
