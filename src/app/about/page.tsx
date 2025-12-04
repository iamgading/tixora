/* eslint-disable react-hooks/refs */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Lightbulb, Rocket, Users, Calendar, Zap, CheckCircle2, QrCode, BarChart3 } from "lucide-react";

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

export default function AboutPage() {
  const stat1 = useCounter(3847);
  const stat2 = useCounter(75234);
  const stat3 = useCounter(99);

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
              <span className="text-white font-black text-lg tracking-tighter">tx</span>
            </div>
            <span className="text-xl font-bold text-foreground">Tixora</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>
      </nav>

      {/* Hero with Logo */}
      <section className="px-6 pt-20 pb-16 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-accent via-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-accent/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
            <span className="text-white font-black text-3xl tracking-tighter">tx</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Tentang Tixora
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Platform event registration dan QR check-in yang simpel, powerful, dan 100% gratis. 
            Dibuat untuk membantu organizer mengelola event dengan lebih efisien.
          </p>
        </motion.div>
      </section>

      {/* App Introduction */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface rounded-3xl border border-border p-8 sm:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Kenapa Tixora?</span>
              <h2 className="text-3xl font-bold text-foreground mt-3 mb-4">
                Event Management yang Simpel
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Tixora lahir dari kebutuhan akan platform event yang mudah digunakan tanpa perlu 
                technical knowledge. Cukup buat event, share link, dan peserta langsung bisa mendaftar 
                dengan QR code otomatis.
              </p>
              <div className="space-y-3">
                {[
                  "Registrasi online tanpa ribet",
                  "QR code check-in otomatis",
                  "Analytics real-time",
                  "100% gratis tanpa batasan"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: "Buat Event", color: "from-blue-500 to-cyan-500" },
                { icon: Users, label: "Kelola Peserta", color: "from-violet-500 to-purple-500" },
                { icon: QrCode, label: "QR Check-in", color: "from-amber-500 to-orange-500" },
                { icon: BarChart3, label: "Real-time Data", color: "from-pink-500 to-rose-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-2xl border border-border p-6 text-center hover:border-accent/30 transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          <motion.div 
            variants={fadeInUp}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-teal-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative bg-surface rounded-3xl border border-border p-8 h-full hover:border-accent/30 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-teal-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Visi</h2>
              <p className="text-muted leading-relaxed">
                Menjadi platform event management terdepan di Indonesia yang membantu 
                ribuan organizer mengelola event dengan mudah, efisien, dan tanpa biaya.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative bg-surface rounded-3xl border border-border p-8 h-full hover:border-violet-500/30 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                <Rocket className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Misi</h2>
              <p className="text-muted leading-relaxed">
                Menyediakan tools yang simpel dan powerful untuk registrasi event dan 
                check-in. Menghilangkan kerumitan teknis agar organizer bisa fokus 
                pada event-nya.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Prinsip Utama</h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {[
              { icon: Lightbulb, title: "Kesederhanaan", desc: "Teknologi harus memudahkan, bukan mempersulit", color: "text-amber-500" },
              { icon: Users, title: "Aksesibilitas", desc: "Gratis dan bisa diakses oleh siapa saja", color: "text-blue-500" },
              { icon: Zap, title: "Kecepatan", desc: "Performa optimal untuk pengalaman terbaik", color: "text-green-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-5 bg-surface/50 rounded-2xl border border-border p-5 hover:bg-surface hover:border-accent/30 transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-surface-hover flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base mb-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof - Stats */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Statistik</span>
            <h2 className="text-3xl font-bold text-foreground mt-3">Dipercaya Ribuan Organizer</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4"
          >
            <div ref={stat1.ref} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-teal-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-surface/80 backdrop-blur border border-border rounded-2xl p-5 text-center hover:border-accent/30 transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {stat1.count.toLocaleString()}+
                </p>
                <p className="text-xs sm:text-sm text-muted">Event Dibuat</p>
              </div>
            </div>

            <div ref={stat2.ref} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-surface/80 backdrop-blur border border-border rounded-2xl p-5 text-center hover:border-violet-500/30 transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {stat2.count.toLocaleString()}+
                </p>
                <p className="text-xs sm:text-sm text-muted">Peserta Terdaftar</p>
              </div>
            </div>

            <div ref={stat3.ref} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-surface/80 backdrop-blur border border-border rounded-2xl p-5 text-center hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {stat3.count}%
                </p>
                <p className="text-xs sm:text-sm text-muted">Uptime Server</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Siap Mencoba?</h2>
          <p className="text-muted mb-8">
            Buat akun gratis dan mulai kelola event kamu sekarang. Tanpa batasan, tanpa biaya.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-accent to-teal-500 rounded-2xl hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all"
          >
            Mulai Sekarang
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted">
          <p>&copy; 2025 Tixora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
