"use client";

import { useActionState } from "react";
import { register } from "./actions";
import { Loader2, User, Mail, Phone, ArrowRight, AlertCircle } from "lucide-react";

export function RegisterForm({ eventId }: { eventId: string }) {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="eventId" value={eventId} />

      {state?.error && (
        <div className="flex items-start gap-2.5 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-600 dark:text-red-400 text-sm">{state.error}</p>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <User className="w-4 h-4 text-muted" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-border rounded-xl bg-background text-foreground text-sm sm:text-base placeholder:text-muted/70 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all disabled:opacity-50 disabled:bg-surface-hover"
            placeholder="Nama lengkap kamu"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail className="w-4 h-4 text-muted" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-border rounded-xl bg-background text-foreground text-sm sm:text-base placeholder:text-muted/70 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all disabled:opacity-50 disabled:bg-surface-hover"
            placeholder="email@contoh.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="block text-sm font-medium text-foreground">
          Nomor Telepon <span className="text-muted text-xs font-normal">(opsional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Phone className="w-4 h-4 text-muted" />
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-border rounded-xl bg-background text-foreground text-sm sm:text-base placeholder:text-muted/70 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all disabled:opacity-50 disabled:bg-surface-hover"
            placeholder="08xxxxxxxxxx"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-accent to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Mendaftar...
          </>
        ) : (
          <>
            Daftar Sekarang
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] sm:text-xs text-muted text-center leading-relaxed">
        Dengan mendaftar, kamu akan mendapat QR code untuk check-in di hari H via email.
      </p>
    </form>
  );
}
