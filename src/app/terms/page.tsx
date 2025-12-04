import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
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
      <section className="px-6 pt-16 pb-12 max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/30">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Syarat & Ketentuan
        </h1>
        <p className="text-muted">
          Terakhir diperbarui: Desember 2024
        </p>
      </section>

      {/* Content */}
      <section className="px-6 py-8 max-w-4xl mx-auto">
        <div className="bg-surface rounded-2xl border border-border p-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Penerimaan Syarat</h2>
            <p className="text-muted leading-relaxed">
              Dengan mengakses dan menggunakan platform Tixora, Anda menyetujui untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Deskripsi Layanan</h2>
            <p className="text-muted leading-relaxed mb-4">
              Tixora adalah platform manajemen event yang menyediakan:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Pembuatan dan pengelolaan event online maupun offline</li>
              <li>Sistem registrasi peserta dengan form kustom</li>
              <li>Generasi QR code otomatis untuk tiket peserta</li>
              <li>Fitur check-in dengan pemindaian QR code</li>
              <li>Dashboard analytics dan laporan event</li>
              <li>Notifikasi email otomatis kepada peserta</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Akun Pengguna</h2>
            <p className="text-muted leading-relaxed mb-4">
              Untuk menggunakan layanan Tixora, Anda harus:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Mendaftar dengan informasi yang akurat dan lengkap</li>
              <li>Menjaga kerahasiaan kredensial akun Anda</li>
              <li>Bertanggung jawab atas semua aktivitas di akun Anda</li>
              <li>Segera memberitahu kami jika terjadi penggunaan tidak sah</li>
              <li>Berusia minimal 17 tahun atau memiliki izin orang tua/wali</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Penggunaan yang Diperbolehkan</h2>
            <p className="text-muted leading-relaxed mb-4">
              Anda setuju untuk menggunakan Tixora hanya untuk tujuan yang sah dan sesuai dengan syarat ini. Anda dilarang:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Membuat event yang melanggar hukum atau mempromosikan kegiatan ilegal</li>
              <li>Mengunggah konten yang mengandung ujaran kebencian, pornografi, atau kekerasan</li>
              <li>Menggunakan platform untuk spam atau penipuan</li>
              <li>Mencoba merusak, menonaktifkan, atau mengganggu layanan</li>
              <li>Mengakses data pengguna lain tanpa izin</li>
              <li>Menjual kembali atau menyewakan akses ke layanan</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Konten Event</h2>
            <p className="text-muted leading-relaxed">
              Anda bertanggung jawab penuh atas semua konten yang Anda unggah atau buat di platform, termasuk detail event, gambar, dan deskripsi. Kami berhak menghapus konten yang melanggar syarat ini atau yang kami anggap tidak pantas tanpa pemberitahuan sebelumnya.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">6. Data Peserta</h2>
            <p className="text-muted leading-relaxed">
              Sebagai penyelenggara event, Anda bertanggung jawab untuk menangani data peserta sesuai dengan hukum privasi yang berlaku. Anda setuju untuk tidak menyalahgunakan data peserta untuk tujuan yang tidak terkait dengan event Anda.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">7. Layanan Gratis</h2>
            <p className="text-muted leading-relaxed">
              Tixora menyediakan layanan secara gratis. Kami berhak untuk memperkenalkan fitur berbayar di masa depan, namun fitur dasar akan tetap tersedia secara gratis. Perubahan signifikan pada model layanan akan diberitahukan sebelumnya.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">8. Ketersediaan Layanan</h2>
            <p className="text-muted leading-relaxed">
              Kami berusaha menjaga layanan tetap tersedia 24/7, namun tidak menjamin ketersediaan tanpa gangguan. Kami dapat melakukan pemeliharaan atau pembaruan yang mungkin menyebabkan gangguan sementara. Kami tidak bertanggung jawab atas kerugian akibat gangguan layanan.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">9. Hak Kekayaan Intelektual</h2>
            <p className="text-muted leading-relaxed">
              Platform Tixora, termasuk desain, logo, dan kode, adalah milik kami dan dilindungi hukum hak cipta. Anda tidak diperkenankan menyalin, memodifikasi, atau mendistribusikan bagian mana pun dari platform tanpa izin tertulis.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">10. Penghentian</h2>
            <p className="text-muted leading-relaxed">
              Kami berhak menangguhkan atau menghentikan akun Anda kapan saja jika Anda melanggar syarat ini. Anda juga dapat menghapus akun Anda kapan saja melalui pengaturan akun atau dengan menghubungi kami.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">11. Batasan Tanggung Jawab</h2>
            <p className="text-muted leading-relaxed">
              Tixora disediakan &ldquo;sebagaimana adanya&rdquo; tanpa jaminan apa pun. Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan kami.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">12. Perubahan Syarat</h2>
            <p className="text-muted leading-relaxed">
              Kami dapat memperbarui syarat dan ketentuan ini dari waktu ke waktu. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini. Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujui syarat yang diperbarui.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">13. Hukum yang Berlaku</h2>
            <p className="text-muted leading-relaxed">
              Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">14. Hubungi Kami</h2>
            <p className="text-muted leading-relaxed">
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:
            </p>
            <p className="mt-4">
              <a href="mailto:legal@tixora.app" className="text-accent hover:underline">
                legal@tixora.app
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="px-6 py-8 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            href="/privacy" 
            className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-muted hover:text-foreground hover:border-accent/30 transition-all"
          >
            Kebijakan Privasi
          </Link>
          <Link 
            href="/contact" 
            className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-muted hover:text-foreground hover:border-accent/30 transition-all"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted">
          <p>&copy; 2025 Tixora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
