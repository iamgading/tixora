"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  console.log("Attempting signup for:", email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    },
  });

  console.log("Signup response:", { data, error });

  if (error) {
    console.error("Signup error:", error);
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }

  // Check if user needs email confirmation
  if (data.user && !data.session) {
    // Email confirmation required
    redirect("/signup?message=Check your email to confirm your account");
  }

  // If session exists, user is auto-confirmed - create profile then redirect to login
  if (data.user && data.session) {
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        email: email,
        full_name: fullName,
      }, { onConflict: "id" });
    
    if (profileError) {
      console.error("Profile creation error:", profileError);
    }
    
    // Sign out so user goes through login
    await supabase.auth.signOut();
    
    revalidatePath("/", "layout");
    redirect("/login?message=Akun berhasil dibuat! Silakan login.");
  }

  redirect("/signup?message=Check your email to confirm your account");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
