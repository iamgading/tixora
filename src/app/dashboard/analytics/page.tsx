import { createClient } from "@/lib/supabase/server";
import { Calendar, Users, UserCheck, TrendingUp } from "lucide-react";
import type { Event, Registration } from "@/lib/types/database";
import { AnalyticsCharts } from "./charts";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get all events
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const eventList = (events as Event[]) || [];

  // Get all registrations for user's events
  const eventIds = eventList.map(e => e.id);
  let registrationList: Registration[] = [];
  
  if (eventIds.length > 0) {
    const { data: registrations } = await supabase
      .from("registrations")
      .select("*")
      .in("event_id", eventIds)
      .order("created_at", { ascending: false });
    
    registrationList = (registrations as Registration[]) || [];
  }

  // Calculate stats
  const totalEvents = eventList.length;
  const publishedEvents = eventList.filter(e => e.is_published).length;
  const totalRegistrations = registrationList.length;
  const totalCheckedIn = registrationList.filter(r => r.checked_in_at).length;
  const checkInRate = totalRegistrations > 0 
    ? Math.round((totalCheckedIn / totalRegistrations) * 100) 
    : 0;

  // Prepare chart data - registrations per day (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  const registrationsPerDay = last30Days.map(date => {
    const count = registrationList.filter(r => 
      r.created_at.split('T')[0] === date
    ).length;
    return {
      date: new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      registrations: count,
    };
  });

  // Registrations per event
  const registrationsPerEvent = eventList.slice(0, 10).map(event => {
    const regs = registrationList.filter(r => r.event_id === event.id);
    const checkedIn = regs.filter(r => r.checked_in_at).length;
    return {
      name: event.title.length > 20 ? event.title.substring(0, 20) + "..." : event.title,
      registrations: regs.length,
      checkedIn,
    };
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted">Statistik dan performa event kamu</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={<Calendar className="w-5 h-5" />} 
          label="Total Event" 
          value={totalEvents}
          subValue={`${publishedEvents} published`}
        />
        <StatCard 
          icon={<Users className="w-5 h-5" />} 
          label="Total Pendaftar" 
          value={totalRegistrations}
        />
        <StatCard 
          icon={<UserCheck className="w-5 h-5" />} 
          label="Total Check-in" 
          value={totalCheckedIn}
        />
        <StatCard 
          icon={<TrendingUp className="w-5 h-5" />} 
          label="Check-in Rate" 
          value={`${checkInRate}%`}
          highlight
        />
      </div>

      {/* Charts */}
      <AnalyticsCharts 
        registrationsPerDay={registrationsPerDay}
        registrationsPerEvent={registrationsPerEvent}
      />
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  subValue,
  highlight,
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number | string;
  subValue?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${
      highlight 
        ? "bg-accent text-white border-accent" 
        : "bg-surface border-border"
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          highlight 
            ? "bg-white/20 text-white" 
            : "bg-accent/10 text-accent"
        }`}>
          {icon}
        </div>
      </div>
      <p className={`text-2xl font-bold ${highlight ? "text-white" : "text-foreground"}`}>
        {value}
      </p>
      <p className={`text-sm ${highlight ? "text-white/80" : "text-muted"}`}>
        {label}
      </p>
      {subValue && (
        <p className={`text-xs mt-1 ${highlight ? "text-white/60" : "text-muted"}`}>
          {subValue}
        </p>
      )}
    </div>
  );
}
