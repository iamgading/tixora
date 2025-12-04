import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Shield, User, Clock } from "lucide-react";
import type { Event } from "@/lib/types/database";
import { InviteTeamMember } from "./invite-form";
import { TeamMemberActions } from "./team-actions";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) {
    notFound();
  }

  const typedEvent = event as Event;

  // Get team members (from a hypothetical team_members table)
  // For now, we'll just show the owner
  const teamMembers = [
    {
      id: "owner",
      email: user?.email || "",
      role: "owner" as const,
      accepted_at: typedEvent.created_at,
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href={`/dashboard/events/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Event
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tim & Akses</h1>
          <p className="text-muted">{typedEvent.title}</p>
        </div>
      </div>

      {/* Invite Form */}
      <div className="bg-surface rounded-2xl border border-border p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Undang Anggota Tim</h3>
        <InviteTeamMember eventId={id} />
      </div>

      {/* Team Members */}
      <div className="bg-surface rounded-2xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Anggota Tim</h3>
        </div>

        <div className="divide-y divide-border">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                  {member.role === "owner" ? (
                    <Shield className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{member.email}</p>
                  <p className="text-sm text-muted capitalize">{member.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {member.accepted_at ? (
                  <span className="text-xs text-muted">
                    Bergabung {new Date(member.accepted_at).toLocaleDateString("id-ID")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                    <Clock className="w-3 h-3" />
                    Pending
                  </span>
                )}
                
                {member.role !== "owner" && (
                  <TeamMemberActions memberId={member.id} eventId={id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roles Info */}
      <div className="mt-6 p-4 bg-surface-hover rounded-xl">
        <h4 className="font-medium text-foreground mb-2">Role & Akses</h4>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-accent mt-0.5" />
            <span><strong>Owner</strong> - Full akses, bisa menghapus event</span>
          </li>
          <li className="flex items-start gap-2">
            <User className="w-4 h-4 text-accent mt-0.5" />
            <span><strong>Admin</strong> - Bisa edit event, lihat peserta, approve waitlist</span>
          </li>
          <li className="flex items-start gap-2">
            <User className="w-4 h-4 text-muted mt-0.5" />
            <span><strong>Staff</strong> - Hanya bisa scan QR dan lihat peserta</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
