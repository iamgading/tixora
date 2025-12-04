"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  CalendarPlus,
  Share2,
  UserCheck,
  ScanLine,
  CheckCircle2,
} from "lucide-react";

export function AnimatedDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Buat Event", desc: "Isi detail event kamu" },
    { title: "Publikasi", desc: "Share link ke peserta" },
    { title: "Peserta Daftar", desc: "Dapat QR code otomatis" },
    { title: "Scan & Check-in", desc: "Verifikasi kehadiran" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-surface to-surface/50 border border-border/50 rounded-3xl p-2 shadow-2xl shadow-black/10">
      <div className="bg-surface rounded-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-hover border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-background rounded-lg text-xs text-muted">
              tixora.app
            </div>
          </div>
        </div>

        {/* Animated Content */}
        <div className="p-5 sm:p-8 bg-background min-h-[480px] sm:min-h-[550px] relative overflow-hidden">
          {/* Step Indicators */}
          <div className="flex justify-center gap-1 sm:gap-2 mb-8 sm:mb-10 flex-wrap">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  step === i 
                    ? "bg-accent text-white" 
                    : "bg-surface-hover text-muted hover:text-foreground"
                }`}
              >
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                  step === i ? "bg-white/20" : "bg-border"
                }`}>
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Step Content */}
          <div className="relative h-[320px] sm:h-[380px]">
            {/* Step 1: Create Event */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: step === 0 ? 1 : 0,
                x: step === 0 ? 0 : step > 0 ? -50 : 50
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-sm mx-auto space-y-5">
                <div className="text-center mb-5">
                  <CalendarPlus className="w-12 h-12 sm:w-14 sm:h-14 text-accent mx-auto mb-3" />
                  <p className="text-foreground font-semibold text-base sm:text-lg">Buat Event Baru</p>
                </div>
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="space-y-3"
                >
                  <div className="p-3 sm:p-4 bg-surface rounded-xl border border-border">
                    <p className="text-xs sm:text-sm text-muted mb-1">Nama Event</p>
                    <p className="text-sm sm:text-base text-foreground">Workshop UI/UX Design</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-surface rounded-xl border border-border">
                    <p className="text-xs sm:text-sm text-muted mb-1">Tanggal</p>
                    <p className="text-sm sm:text-base text-foreground">25 Januari 2025</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-surface rounded-xl border border-accent/50">
                    <p className="text-xs sm:text-sm text-muted mb-1">Lokasi</p>
                    <motion.div 
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-5 bg-accent/20 rounded"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Step 2: Publish */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: step === 1 ? 1 : 0,
                x: step === 1 ? 0 : step > 1 ? -50 : 50
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-sm mx-auto text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Share2 className="w-14 h-14 sm:w-16 sm:h-16 text-accent mx-auto mb-4" />
                </motion.div>
                <p className="text-foreground font-semibold text-base sm:text-lg mb-2">Event Dipublikasi!</p>
                <p className="text-sm sm:text-base text-muted mb-5">Bagikan link ke calon peserta</p>
                <div className="flex items-center gap-2 p-3 sm:p-4 bg-surface rounded-xl border border-border mx-auto">
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs sm:text-sm text-muted truncate">tixora.app/e/workshop-uiux</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent text-white text-xs sm:text-sm font-medium rounded-lg flex-shrink-0"
                  >
                    Copy
                  </motion.button>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  {["bg-blue-500", "bg-green-500", "bg-pink-500"].map((color, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-full`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Step 3: Registration */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: step === 2 ? 1 : 0,
                x: step === 2 ? 0 : step > 2 ? -50 : 50
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-5">
                  <UserCheck className="w-10 h-10 sm:w-12 sm:h-12 text-accent mx-auto mb-2" />
                  <p className="text-foreground font-semibold text-sm sm:text-base">Peserta Mendaftar</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  <motion.div 
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="space-y-2 sm:space-y-3"
                  >
                    <div className="p-2.5 sm:p-3 bg-surface rounded-xl border border-border">
                      <p className="text-[10px] sm:text-xs text-muted">Nama</p>
                      <p className="text-xs sm:text-sm text-foreground">Gading Satrio</p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-surface rounded-xl border border-border">
                      <p className="text-[10px] sm:text-xs text-muted">Email</p>
                      <p className="text-xs sm:text-sm text-foreground">gading@email.com</p>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-surface rounded-xl border border-accent/50">
                      <p className="text-[10px] sm:text-xs text-muted">No. HP</p>
                      <motion.div 
                        animate={{ width: ["0%", "80%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-4 bg-accent/20 rounded mt-1"
                      />
                    </div>
                  </motion.div>
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ scale: [0.9, 1, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent to-teal-500 rounded-xl flex items-center justify-center mb-2"
                    >
                      <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="flex items-center gap-1 text-[10px] sm:text-xs text-accent"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>QR Terkirim!</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4: Check-in */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: step === 3 ? 1 : 0,
                x: step === 3 ? 0 : 50
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-sm mx-auto text-center">
                <div className="relative mb-5">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(13, 148, 136, 0)",
                        "0 0 0 20px rgba(13, 148, 136, 0.3)",
                        "0 0 0 0 rgba(13, 148, 136, 0)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent to-teal-500 rounded-2xl flex items-center justify-center mx-auto"
                  >
                    <ScanLine className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-foreground font-semibold text-base sm:text-lg mb-1">Check-in Berhasil!</p>
                  <p className="text-sm sm:text-base text-muted mb-4">Peserta terverifikasi</p>
                </motion.div>
                <motion.div
                  animate={{ scale: [0.9, 1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm sm:text-base font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Gading Satrio - Hadir
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Current Step Label */}
          <div className="text-center mt-4">
            <p className="text-xs text-muted">{steps[step].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
