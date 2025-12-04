import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
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
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-muted">
          Terakhir diperbarui: Desember 2024
        </p>
      </section>

      {/* Content */}
      <section className="px-6 py-8 max-w-4xl mx-auto">
        <div className="bg-surface rounded-2xl border border-border p-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-muted leading-relaxed mb-4">
              Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Nama dan alamat email saat mendaftar akun</li>
              <li>Informasi event yang Anda buat (judul, deskripsi, tanggal, lokasi)</li>
              <li>Data peserta yang mendaftar ke event Anda</li>
              <li>Informasi penggunaan dan aktivitas dalam platform</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Penggunaan Informasi</h2>
            <p className="text-muted leading-relaxed mb-4">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Menyediakan dan memelihara layanan Tixora</li>
              <li>Mengirim notifikasi terkait event dan pendaftaran</li>
              <li>Meningkatkan pengalaman pengguna dan fitur platform</li>
              <li>Mengirim komunikasi penting tentang akun Anda</li>
              <li>Mencegah aktivitas penipuan atau penyalahgunaan</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Berbagi Informasi</h2>
            <p className="text-muted leading-relaxed">
              Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Informasi hanya dibagikan dalam situasi berikut:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4 mt-4">
              <li>Dengan persetujuan Anda</li>
              <li>Kepada penyedia layanan yang membantu operasional kami</li>
              <li>Jika diwajibkan oleh hukum atau proses hukum</li>
              <li>Untuk melindungi hak dan keamanan Tixora dan pengguna</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Keamanan Data</h2>
            <p className="text-muted leading-relaxed">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi informasi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran. Ini termasuk enkripsi data dalam transit dan penyimpanan yang aman.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Hak Anda</h2>
            <p className="text-muted leading-relaxed mb-4">
              Anda memiliki hak untuk:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
              <li>Memperbarui atau mengoreksi informasi Anda</li>
              <li>Menghapus akun dan data Anda</li>
              <li>Mengekspor data Anda dalam format yang dapat dibaca</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">6. Cookie dan Teknologi Pelacakan</h2>
            <p className="text-muted leading-relaxed">
              Kami menggunakan cookie dan teknologi serupa untuk menjaga sesi login Anda, mengingat preferensi, dan menganalisis penggunaan platform. Anda dapat mengatur browser untuk menolak cookie, namun beberapa fitur mungkin tidak berfungsi dengan baik.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">7. Perubahan Kebijakan</h2>
            <p className="text-muted leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui email atau pemberitahuan di platform. Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujui kebijakan yang diperbarui.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">8. Hubungi Kami</h2>
            <p className="text-muted leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau praktik privasi kami, silakan hubungi kami di:
            </p>
            <p className="mt-4">
              <a href="mailto:privacy@tixora.app" className="text-accent hover:underline">
                privacy@tixora.app
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted">
          <p>&copy; 2025 Tixora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
