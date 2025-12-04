"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function bulkCheckIn(
  eventId: string, 
  registrationIds: string[]
): Promise<{ success: boolean; count?: number; error?: string }> {
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

  // Update all selected registrations
  const { error } = await supabase
    .from("registrations")
    .update({ checked_in_at: new Date().toISOString() })
    .eq("event_id", eventId)
    .in("id", registrationIds)
    .is("checked_in_at", null);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath(`/dashboard/events/${eventId}`);
  return { success: true, count: registrationIds.length };
}
