/* eslint-disable react-hooks/refs */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import {
  ClipboardList,
  QrCode,
  BarChart3,
  ShieldCheck,
  Mail,
  ArrowRight,
  Calendar,
  Share2,
  UserCheck,
  ScanLine,
  CheckCircle2,
  ChevronRight,
  Award,
  ChevronDown,
  Users,
  Zap,
} from "lucide-react";
import { ThemeToggleMinimal } from "@/components/ui/theme-toggle";
import { AnimatedDemo } from "@/components/home/AnimatedDemo";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Animated Counter Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const setRef = (node: HTMLDivElement | null) => {
    elementRef.current = node;
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return { count, ref: setRef };
}

// FAQ Data
const faqs = [
  {
    q: "Apakah Tixora benar-benar gratis?",
    a: "Ya, 100% gratis! Tidak ada biaya tersembunyi, tidak perlu kartu kredit. Kamu bisa membuat unlimited events dan registrations tanpa batas."
  },
  {
    q: "Bagaimana cara kerja QR Check-in?",
    a: "Setiap peserta yang mendaftar akan mendapat QR code unik. Saat event, kamu tinggal scan QR code tersebut menggunakan kamera HP untuk check-in otomatis."
  },
  {
    q: "Apakah data peserta aman?",
    a: "Keamanan data adalah prioritas kami. Semua data dienkripsi dan disimpan di server yang aman. Kami tidak pernah menjual atau membagikan data ke pihak ketiga."
  },
  {
    q: "Bisa untuk event offline dan online?",
    a: "Tentu! Tixora cocok untuk semua jenis event - seminar, workshop, konser, webinar, dan lainnya. Baik offline maupun online."
  },
  {
    q: "Apakah ada batasan jumlah peserta?",
    a: "Tidak ada batasan! Mau 10 peserta atau 10.000 peserta, Tixora siap menangani semuanya dengan performa optimal."
  },
];

export default function Home() {
  const router = useRouter();

  const stat1 = useCounter(3847);
  const stat2 = useCounter(75234);
  const stat3 = useCounter(99);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInitial, setUserInitial] = useState("");

  useEffect(() => {
    const supabase = createClient();
    
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      if (user) {
        const name = user.user_metadata?.full_name || user.email || "";
        setUserInitial(name.charAt(0).toUpperCase());
      }
      setIsLoading(false);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
      if (session?.user) {
        const name = session.user.user_metadata?.full_name || session.user.email || "";
        setUserInitial(name.charAt(0).toUpperCase());
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden scroll-smooth">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40"
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
              <span className="text-white font-black text-lg tracking-tighter">tx</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Tixora
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggleMinimal />
            {!isLoading && (
              isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="w-10 h-10 bg-gradient-to-br from-accent to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all">
                    {userInitial}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-all border border-border hover:border-red-200 dark:hover:border-red-900"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-5 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors border border-border rounded-xl hover:border-accent/30">
                    Login
                  </Link>
                  <Link href="/signup" className="px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-accent to-teal-500 rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all active:scale-[0.98]">
                    Daftar
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Floating Elements */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 max-w-6xl mx-auto relative">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-accent/10 to-violet-500/10 border border-accent/20 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-foreground/80">Platform Event All-in-One</span>
            <ChevronRight className="w-4 h-4 text-muted" />
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Kelola Registrasi dengan
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-teal-400 to-accent bg-clip-text text-transparent">
              QR Check-in
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Platform all-in-one untuk registrasi event, QR code check-in, 
            dan manajemen peserta.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={isLoggedIn ? "/dashboard" : "/signup"}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-accent to-teal-500 rounded-2xl hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
            >
              {isLoggedIn ? "Ke Dashboard" : "Mulai Sekarang"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#demo"
              onClick={(e) => scrollToSection(e, "demo")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-foreground bg-surface/80 backdrop-blur border border-border rounded-2xl hover:bg-surface hover:border-accent/30 transition-all cursor-pointer"
            >
              Lihat Demo
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Setup 5 menit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Unlimited peserta</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>100% gratis</span>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section id="stats" className="px-6 py-20 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 sm:gap-6"
          >
            <div ref={stat1.ref} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-teal-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-surface/80 backdrop-blur border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:border-accent/30 transition-all">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 text-white shadow-lg">
                  <Calendar className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <p className="text-2xl sm:text-5xl font-bold text-foreground mb-1 sm:mb-2">
                  {stat1.count.toLocaleString()}+
                </p>
                <p className="text-xs sm:text-base text-muted">Event Dibuat</p>
              </div>
            </div>

            <div ref={stat2.ref} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-surface/80 backdrop-blur border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:border-violet-500/30 transition-all">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 text-white shadow-lg">
                  <Users className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <p className="text-2xl sm:text-5xl font-bold text-foreground mb-1 sm:mb-2">
                  {stat2.count.toLocaleString()}+
                </p>
                <p className="text-xs sm:text-base text-muted">Pendaftar</p>
              </div>
            </div>

            <div ref={stat3.ref} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-surface/80 backdrop-blur border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 text-white shadow-lg">
                  <Zap className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <p className="text-2xl sm:text-5xl font-bold text-foreground mb-1 sm:mb-2">
                  {stat3.count}%
                </p>
                <p className="text-xs sm:text-base text-muted">Uptime</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Section - Animated */}
      <section id="demo" className="px-6 py-24 max-w-6xl mx-auto scroll-mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Lihat Cara Kerjanya
            </h2>
            <p className="text-muted max-w-lg mx-auto">4 langkah untuk kelola registrasi dan kehadiran peserta</p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <AnimatedDemo />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 relative scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="text-muted max-w-lg mx-auto">Semua yang kamu butuhkan untuk registrasi dan check-in event</p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            <FeatureCard icon={<ClipboardList className="w-5 h-5" />} title="Registrasi Online" description="Form pendaftaran yang mudah diakses peserta dari mana saja." gradient="from-blue-500 to-cyan-500" />
            <FeatureCard icon={<QrCode className="w-5 h-5" />} title="QR Code Otomatis" description="Setiap peserta mendapat QR code unik untuk check-in." gradient="from-accent to-teal-400" />
            <FeatureCard icon={<BarChart3 className="w-5 h-5" />} title="Analytics Realtime" description="Pantau statistik pendaftar dan kehadiran secara realtime." gradient="from-violet-500 to-purple-500" />
            <FeatureCard icon={<ShieldCheck className="w-5 h-5" />} title="Aman & Terverifikasi" description="Satu QR code hanya bisa digunakan satu kali check-in." gradient="from-green-500 to-emerald-500" />
            <FeatureCard icon={<Mail className="w-5 h-5" />} title="Notifikasi Email" description="Peserta otomatis dapat email konfirmasi beserta QR code." gradient="from-amber-500 to-orange-500" />
            <FeatureCard icon={<Award className="w-5 h-5" />} title="Sertifikat Otomatis" description="Generate sertifikat untuk peserta yang hadir." gradient="from-pink-500 to-rose-500" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Cara Mudah Memulai
            </h2>
            <p className="text-muted max-w-lg mx-auto">Buat event, bagikan link, terima pendaftar, scan QR saat hari H</p>
          </motion.div>

          {/* Desktop Layout */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="hidden md:grid md:grid-cols-4 gap-6 relative"
          >
            {/* Horizontal line */}
            <div className="absolute top-6 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
            {/* Dots on line */}
            <div className="absolute top-6 left-[12%] right-[12%] flex justify-between -translate-y-1/2">
              <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-accent/20" />
              <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-accent/20" />
              <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-accent/20" />
              <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-accent/20" />
            </div>
            
            <StepCard step="1" icon={<Calendar className="w-6 h-6" />} title="Buat Event" description="Daftar dan buat event baru dalam hitungan menit." />
            <StepCard step="2" icon={<Share2 className="w-6 h-6" />} title="Share Link" description="Bagikan link pendaftaran ke calon peserta." />
            <StepCard step="3" icon={<UserCheck className="w-6 h-6" />} title="Peserta Daftar" description="Peserta isi form dan dapat QR code." />
            <StepCard step="4" icon={<ScanLine className="w-6 h-6" />} title="Scan & Check-in" description="Hari H, scan QR peserta untuk check-in." />
          </motion.div>

          {/* Mobile Layout - Zigzag Timeline */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="md:hidden relative px-4"
          >
            {/* Vertical line - perfectly centered */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent -translate-x-1/2" />
            
            <div className="space-y-8">
              {/* Step 1 - Left */}
              <motion.div variants={fadeInUp} className="relative">
                {/* Number badge - centered on line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold ring-4 ring-background z-10">1</div>
                {/* Content - left side */}
                <div className="w-[45%] pr-6 text-right">
                  <div className="bg-surface border border-border rounded-2xl p-4">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm">Buat Event</h3>
                      <div className="w-9 h-9 bg-gradient-to-br from-accent to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-xs text-muted">Buat event dalam hitungan menit</p>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 - Right */}
              <motion.div variants={fadeInUp} className="relative flex justify-end">
                {/* Number badge - centered on line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold ring-4 ring-background z-10">2</div>
                {/* Content - right side */}
                <div className="w-[45%] pl-6 text-left">
                  <div className="bg-surface border border-border rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-accent to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">Share Link</h3>
                    </div>
                    <p className="text-xs text-muted">Bagikan link ke calon peserta</p>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 - Left */}
              <motion.div variants={fadeInUp} className="relative">
                {/* Number badge - centered on line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold ring-4 ring-background z-10">3</div>
                {/* Content - left side */}
                <div className="w-[45%] pr-6 text-right">
                  <div className="bg-surface border border-border rounded-2xl p-4">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm">Peserta Daftar</h3>
                      <div className="w-9 h-9 bg-gradient-to-br from-accent to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <UserCheck className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-xs text-muted">Peserta isi form dan dapat QR</p>
                  </div>
                </div>
              </motion.div>

              {/* Step 4 - Right */}
              <motion.div variants={fadeInUp} className="relative flex justify-end">
                {/* Number badge - centered on line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold ring-4 ring-background z-10">4</div>
                {/* Content - right side */}
                <div className="w-[45%] pl-6 text-left">
                  <div className="bg-surface border border-border rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-accent to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <ScanLine className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">Scan Check-in</h3>
                    </div>
                    <p className="text-xs text-muted">Scan QR peserta saat hari H</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Pertanyaan Umum
            </h2>
            <p className="text-muted max-w-lg mx-auto">Jawaban untuk pertanyaan yang sering ditanyakan</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-5 pb-5 text-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Left Content */}
              <div className="md:col-span-3 p-8 sm:p-12">
                <p className="text-sm font-medium text-accent mb-4">Mulai Sekarang</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Siap kelola event dengan lebih efisien?
                </h2>
                <p className="text-muted mb-8">
                  Gabung dengan ribuan organizer yang sudah pakai Tixora. Gratis, tanpa batasan.
                </p>
                <Link
                  href={isLoggedIn ? "/dashboard" : "/signup"}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-accent to-teal-500 rounded-2xl hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                  {isLoggedIn ? "Ke Dashboard" : "Mulai Sekarang"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Right Visual */}
              <div className="md:col-span-2 bg-gradient-to-br from-accent/5 to-accent/10 p-8 sm:p-12 flex items-center justify-center border-t md:border-t-0 md:border-l border-border">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
                    <Calendar className="w-8 h-8 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-foreground">3,847+</p>
                    <p className="text-sm text-muted">Event telah dibuat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-surface/50 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
                  <span className="text-white font-black text-lg tracking-tighter">tx</span>
                </div>
                <span className="text-lg font-bold text-foreground">Tixora</span>
              </div>
              <p className="text-muted text-sm max-w-xs leading-relaxed">
                Platform all-in-one untuk registrasi event dan QR check-in. 100% gratis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navigasi</h4>
              <div className="flex flex-col gap-3 text-sm text-muted">
                <a href="#demo" onClick={(e) => scrollToSection(e, "demo")} className="hover:text-accent transition-colors cursor-pointer w-fit">Demo</a>
                <a href="#features" onClick={(e) => scrollToSection(e, "features")} className="hover:text-accent transition-colors cursor-pointer w-fit">Fitur</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Lainnya</h4>
              <div className="flex flex-col gap-3 text-sm text-muted">
                <Link href="/about" className="hover:text-accent transition-colors w-fit">Tentang</Link>
                <Link href="/contact" className="hover:text-accent transition-colors w-fit">Kontak</Link>
                <Link href="/privacy" className="hover:text-accent transition-colors w-fit">Kebijakan Privasi</Link>
                <Link href="/terms" className="hover:text-accent transition-colors w-fit">Syarat & Ketentuan</Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">&copy; 2025 Tixora. All rights reserved.</p>
            <p className="text-sm text-muted">Made with <span className="text-accent">♥</span> in Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode; title: string; description: string; gradient: string; }) {
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-4 sm:p-6 bg-surface/50 backdrop-blur rounded-xl sm:rounded-2xl border border-border hover:border-accent/30 transition-all cursor-default overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${gradient} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StepCard({ step, icon, title, description }: { step: string; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="text-center group pt-14">
      <div className="relative mb-4 inline-block">
        <div className="w-20 h-20 bg-surface border-2 border-border text-accent rounded-2xl flex items-center justify-center mx-auto group-hover:border-accent group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-teal-500 group-hover:text-white transition-all shadow-lg">
          {icon}
        </div>
        <span className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-accent to-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
          {step}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </motion.div>
  );
}
