"use server";

import { createClient } from "@/lib/supabase/server";

interface CheckInResult {
  success: boolean;
  message: string;
  registration?: {
    name: string;
    email: string;
  };
}

export async function checkIn(eventId: string, qrCode: string): Promise<CheckInResult> {
  const supabase = await createClient();

  // Find registration by QR code
  const { data: registration, error: findError } = await supabase
    .from("registrations")
    .select("*")
    .eq("qr_code", qrCode)
    .single();

  if (findError || !registration) {
    return {
      success: false,
      message: "QR code tidak valid atau tidak ditemukan.",
    };
  }

  // Check if registration is for this event
  if (registration.event_id !== eventId) {
    return {
      success: false,
      message: "QR code ini bukan untuk event ini.",
    };
  }

  // Check if already checked in
  if (registration.checked_in_at) {
    return {
      success: false,
      message: `Peserta sudah check-in pada ${new Date(registration.checked_in_at).toLocaleString("id-ID")}`,
      registration: {
        name: registration.name,
        email: registration.email,
      },
    };
  }

  // Update check-in status
  const { error: updateError } = await supabase
    .from("registrations")
    .update({ checked_in_at: new Date().toISOString() })
    .eq("id", registration.id);

  if (updateError) {
    return {
      success: false,
      message: "Gagal melakukan check-in. Silakan coba lagi.",
    };
  }

  return {
    success: true,
    message: "Peserta berhasil check-in!",
    registration: {
      name: registration.name,
      email: registration.email,
    },
  };
}
