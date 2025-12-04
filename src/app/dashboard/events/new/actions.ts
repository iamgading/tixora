"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface CreateEventState {
  success?: boolean;
  error?: string;
  eventId?: string;
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

export async function createEvent(
  _prevState: CreateEventState | null,
  formData: FormData
): Promise<CreateEventState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string || null;
  const eventDate = formData.get("event_date") as string;
  const eventTime = formData.get("event_time") as string || null;
  const location = formData.get("location") as string || null;
  const maxAttendeesStr = formData.get("max_attendees") as string;
  const maxAttendees = maxAttendeesStr ? parseInt(maxAttendeesStr) : null;
  const isPublished = formData.get("is_published") === "on";

  const slug = generateSlug(title);

  const { data, error } = await supabase
    .from("events")
    .insert({
      user_id: user.id,
      title,
      slug,
      description,
      event_date: eventDate,
      event_time: eventTime,
      location,
      max_attendees: maxAttendees,
      is_published: isPublished,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true, eventId: data.id };
}
