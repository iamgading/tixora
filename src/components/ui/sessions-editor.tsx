"use client";


import { Plus, Trash2, Clock } from "lucide-react";
import type { EventSession } from "@/lib/types/database";

interface SessionsEditorProps {
  value: EventSession[];
  onChange: (sessions: EventSession[]) => void;
}

export function SessionsEditor({ value, onChange }: SessionsEditorProps) {
  const addSession = () => {
    const newSession: EventSession = {
      id: `session_${Date.now()}`,
      name: "",
      start_time: "09:00",
      end_time: "10:00",
      max_attendees: null,
    };
    onChange([...value, newSession]);
  };

  const updateSession = (id: string, updates: Partial<EventSession>) => {
    onChange(
      value.map((session) =>
        session.id === id ? { ...session, ...updates } : session
      )
    );
  };

  const removeSession = (id: string) => {
    onChange(value.filter((session) => session.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Sesi Event</p>
          <p className="text-xs text-muted">Bagi event menjadi beberapa sesi</p>
        </div>
        <button
          type="button"
          onClick={addSession}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-accent bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Sesi
        </button>
      </div>

      {value.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
          <Clock className="w-8 h-8 text-muted mx-auto mb-2" />
          <p className="text-sm text-muted">Tidak ada sesi (event single session)</p>
          <button
            type="button"
            onClick={addSession}
            className="mt-2 text-sm text-accent hover:underline"
          >
            Tambah sesi pertama
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {value.map((session, index) => (
            <div
              key={session.id}
              className="p-4 bg-surface-hover rounded-xl border border-border"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-lg">
                  Sesi {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeSession(session.id)}
                  className="p-1.5 text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-muted mb-1">Nama Sesi</label>
                  <input
                    type="text"
                    value={session.name}
                    onChange={(e) => updateSession(session.id, { name: e.target.value })}
                    placeholder="Contoh: Workshop Pagi"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Waktu Mulai</label>
                  <input
                    type="time"
                    value={session.start_time}
                    onChange={(e) => updateSession(session.id, { start_time: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Waktu Selesai</label>
                  <input
                    type="time"
                    value={session.end_time}
                    onChange={(e) => updateSession(session.id, { end_time: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-muted mb-1">Kuota (kosongkan jika unlimited)</label>
                  <input
                    type="number"
                    min="1"
                    value={session.max_attendees || ""}
                    onChange={(e) => updateSession(session.id, { 
                      max_attendees: e.target.value ? parseInt(e.target.value) : null 
                    })}
                    placeholder="Unlimited"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        type="hidden"
        name="sessions"
        value={JSON.stringify(value)}
      />
    </div>
  );
}
