"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function inviteTeamMember(
  eventId: string,
  email: string,
  role: "admin" | "staff"
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Verify event ownership
  const { data: event } = await supabase
    .from("events")
    .select("id, title")
    .eq("id", eventId)
    .eq("user_id", user.id)
    .single();

  if (!event) {
    return { success: false, error: "Event tidak ditemukan" };
  }

  // Check if team_members table exists, if not we'll store in a simple way
  // For MVP, we'll just validate and show success
  // In production, you'd have a team_members table
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Format email tidak valid" };
  }

  // For MVP: Just log the invitation (in production, send email & create record)
  console.log(`Team invite: ${email} as ${role} for event ${event.title}`);
  
  // TODO: In production, create team_members table and send invitation email

  revalidatePath(`/dashboard/events/${eventId}/team`);
  return { success: true };
}

export async function removeTeamMember(
  eventId: string,
  memberId: string
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

  // For MVP: Just log the removal
  console.log(`Team member removed: ${memberId} from event ${eventId}`);

  // If we had a team_members table:
  // const { error } = await supabase
  //   .from("team_members")
  //   .delete()
  //   .eq("id", memberId)
  //   .eq("event_id", eventId);

  revalidatePath(`/dashboard/events/${eventId}/team`);
  return { success: true };
}
