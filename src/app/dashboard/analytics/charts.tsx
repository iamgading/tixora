"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AnalyticsChartsProps {
  registrationsPerDay: { date: string; registrations: number }[];
  registrationsPerEvent: { name: string; registrations: number; checkedIn: number }[];
}

export function AnalyticsCharts({ 
  registrationsPerDay, 
  registrationsPerEvent 
}: AnalyticsChartsProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Registrations Trend */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Pendaftaran (30 Hari Terakhir)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={registrationsPerDay}>
              <defs>
                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: "var(--muted)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis 
                tick={{ fill: "var(--muted)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
              />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="#0d9488"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRegistrations)"
                name="Pendaftar"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Registrations per Event */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Pendaftar per Event</h3>
        {registrationsPerEvent.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted">
            Belum ada data
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationsPerEvent} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  type="number"
                  tick={{ fill: "var(--muted)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)" }}
                  allowDecimals={false}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  tick={{ fill: "var(--muted)", fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)" }}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="registrations" 
                  fill="#0d9488" 
                  radius={[0, 4, 4, 0]}
                  name="Pendaftar"
                />
                <Bar 
                  dataKey="checkedIn" 
                  fill="#14b8a6" 
                  radius={[0, 4, 4, 0]}
                  name="Check-in"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
