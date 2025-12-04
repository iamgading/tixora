import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { login } from "../actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
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
            <h1 className="text-2xl font-bold text-foreground">Selamat datang kembali</h1>
            <p className="text-muted mt-1">
              Masuk untuk mengelola event kamu
            </p>
          </div>

          <div className="bg-surface/50 backdrop-blur rounded-2xl border border-border p-8">
            <ErrorMessage searchParams={searchParams} />

            <form className="space-y-5">
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
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link href="#" className="text-sm text-accent hover:underline">
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                formAction={login}
                className="w-full py-3.5 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                Masuk
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted">
              Belum punya akun?{" "}
              <Link href="/signup" className="text-accent font-semibold hover:underline">
                Daftar gratis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent via-teal-500 to-accent-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Kelola event dengan mudah
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            Registrasi online, QR check-in, dan analytics - semua dalam satu platform gratis.
          </p>
          <div className="mt-12 space-y-4">
            {["Registrasi tanpa batas", "QR code otomatis", "Analytics realtime"].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
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
