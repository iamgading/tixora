"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { inviteTeamMember } from "./actions";

interface InviteTeamMemberProps {
  eventId: string;
}

export function InviteTeamMember({ eventId }: InviteTeamMemberProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "staff">("staff");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Email wajib diisi");
      return;
    }

    setIsSubmitting(true);
    
    const result = await inviteTeamMember(eventId, email, role);
    
    if (result.success) {
      toast.success(`Undangan dikirim ke ${email}`);
      setEmail("");
    } else {
      toast.error(result.error || "Gagal mengirim undangan");
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email anggota tim"
        className="flex-1 px-4 py-2.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "staff")}
        className="px-4 py-2.5 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
      >
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Undang
      </button>
    </form>
  );
}
