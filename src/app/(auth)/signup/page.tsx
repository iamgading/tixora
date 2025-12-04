import Link from "next/link";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { signup } from "../actions";

export default function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent via-teal-500 to-accent-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Mulai kelola event secara profesional
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            Bergabung dengan ribuan organizer yang sudah mempercayakan event mereka ke Tixora.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            {[
              { value: "3,847+", label: "Event dibuat" },
              { value: "75,234+", label: "Peserta terdaftar" },
              { value: "99%", label: "Uptime" },
              { value: "5 menit", label: "Setup time" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke beranda
            </Link>
          </div>

          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
                <span className="text-white font-black text-xl tracking-tighter">tx</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Tixora</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Buat akun gratis</h1>
            <p className="text-muted mt-1">
              Daftar dan mulai buat event dalam 5 menit
            </p>
          </div>

          <div className="bg-surface/50 backdrop-blur rounded-2xl border border-border p-8">
            <ErrorMessage searchParams={searchParams} />

            <form className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="Gading Satrio"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="Minimal 6 karakter"
                  />
                </div>
              </div>

              <button
                formAction={signup}
                className="w-full py-3.5 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                Daftar Sekarang
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-accent font-semibold hover:underline">
                Masuk
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Dengan mendaftar, kamu setuju dengan{" "}
            <Link href="/terms" className="text-accent hover:underline">Syarat & Ketentuan</Link>
            {" "}dan{" "}
            <Link href="/privacy" className="text-accent hover:underline">Kebijakan Privasi</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

async function ErrorMessage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const params = await searchParams;
  
  if (params.error) {
    return (
      <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-sm">
        {params.error}
      </div>
    );
  }
  
  if (params.message) {
    return (
      <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl text-accent text-sm">
        {params.message}
      </div>
    );
  }
  
  return null;
}
