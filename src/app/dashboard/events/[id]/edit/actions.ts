"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface UpdateEventState {
  success?: boolean;
  error?: string;
}

export async function updateEvent(
  _prevState: UpdateEventState | null,
  formData: FormData
): Promise<UpdateEventState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string || null;
  const eventDate = formData.get("event_date") as string;
  const eventTime = formData.get("event_time") as string || null;
  const location = formData.get("location") as string || null;
  const maxAttendeesStr = formData.get("max_attendees") as string;
  const maxAttendees = maxAttendeesStr ? parseInt(maxAttendeesStr) : null;
  const isPublished = formData.get("is_published") === "on";

  const { error } = await supabase
    .from("events")
    .update({
      title,
      description,
      event_date: eventDate,
      event_time: eventTime,
      location,
      max_attendees: maxAttendees,
      is_published: isPublished,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/events/${id}`);
  revalidatePath("/dashboard");
  
  return { success: true };
}

export async function deleteEvent(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
  
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${base}-${randomSuffix}`;
}

export async function duplicateEvent(id: string): Promise<{ error?: string; eventId?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Get original event
  const { data: original, error: fetchError } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !original) {
    return { error: "Event tidak ditemukan" };
  }

  // Create duplicate
  const newSlug = generateSlug(original.title + " Copy");
  
  const { data: newEvent, error: insertError } = await supabase
    .from("events")
    .insert({
      user_id: user.id,
      title: original.title + " (Copy)",
      slug: newSlug,
      description: original.description,
      location: original.location,
      event_date: original.event_date,
      event_time: original.event_time,
      max_attendees: original.max_attendees,
      is_published: false, // Always start as draft
      image_url: original.image_url,
    })
    .select()
    .single();

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/dashboard");
  return { eventId: newEvent.id };
}
