import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { logout } from "../(auth)/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userInfo = {
    fullName: user.user_metadata?.full_name || null,
    email: user.email || "",
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={userInfo} logoutAction={logout} />
      <main className="pt-16 lg:pt-0 lg:pl-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
