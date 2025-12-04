"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, MapPin, Send, Phone, Clock, ChevronDown } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara buat event?", a: "Daftar gratis, lalu klik 'Buat Event' di dashboard. Isi detail event seperti nama, tanggal, lokasi, dan deskripsi. Setelah itu publish dan bagikan link ke peserta." },
  { q: "Apakah QR check-in bisa offline?", a: "Ya, scan QR code tetap bisa dilakukan tanpa koneksi internet. Data akan disinkronisasi otomatis saat perangkat kembali online." },
  { q: "Berapa biaya menggunakan Tixora?", a: "Tixora 100% gratis! Tidak ada biaya tersembunyi, tidak perlu kartu kredit. Kamu bisa membuat unlimited events dan registrations." },
  { q: "Apakah data peserta aman?", a: "Keamanan data adalah prioritas kami. Semua data dienkripsi dan disimpan di server yang aman. Kami tidak pernah menjual data ke pihak ketiga." },
  { q: "Bisa untuk event apa saja?", a: "Tixora cocok untuk semua jenis event - seminar, workshop, konser, webinar, komunitas, dan lainnya. Baik offline maupun online." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
    
    const mailtoLink = `mailto:hello@tixora.app?subject=${encodeURIComponent(`[Tixora] ${subject}`)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
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

      {/* Hero */}
      <section className="px-6 pt-20 pb-12 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/30">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Ada pertanyaan atau masukan? Tim kami siap membantu kamu.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gradient-to-br from-accent via-teal-500 to-emerald-500 rounded-3xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6">Info Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href="mailto:hello@tixora.app" className="text-white/80 hover:text-white transition-colors">
                      hello@tixora.app
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">WhatsApp</p>
                    <a href="https://wa.me/6289654061718" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      089654061718
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Lokasi</p>
                    <p className="text-white/80">
                      Jl Ronamessi No.710<br />
                      Jepara, Jawa Tengah
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Jam Operasional</p>
                    <p className="text-white/80">
                      Senin - Jumat<br />
                      09:00 - 18:00 WIB
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-white/80 mb-4">Ikuti kami:</p>
                <div className="flex gap-3">
                  <a
                    href="https://x.com/tixora.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl flex items-center justify-center transition-colors"
                    title="X"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/tixora.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl flex items-center justify-center transition-colors"
                    title="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://tiktok.com/@tixora.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl flex items-center justify-center transition-colors"
                    title="TikTok"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-surface rounded-3xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Kirim Pesan</h2>
              <p className="text-muted mb-8">Isi form di bawah dan kami akan merespons dalam 24 jam.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="Gading Satrio"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="gading@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subjek
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="Tentang apa?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tulis pesan kamu di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accent to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 bg-surface/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Pertanyaan Umum</h2>
            <p className="text-muted">Klik pertanyaan untuk melihat jawaban</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={false}
                className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-foreground text-sm pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openFaq === i ? "auto" : 0,
                    opacity: openFaq === i ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-sm text-muted leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
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
