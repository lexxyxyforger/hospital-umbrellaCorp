import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Syarat & Ketentuan
          </h1>
          <p className="text-slate-500 text-sm mb-8">Terakhir diperbarui: 1 Desember 2024</p>

          {[
            {
              title: "1. Penerimaan Syarat",
              content: "Dengan mengakses atau menggunakan layanan RS Sehat Prima, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan layanan kami.",
            },
            {
              title: "2. Layanan yang Disediakan",
              content: "RS Sehat Prima menyediakan platform untuk booking janji dokter, informasi layanan medis, dan konten edukasi kesehatan. Layanan medis aktual diberikan oleh tenaga medis berlisensi di fasilitas kami.",
            },
            {
              title: "3. Akun Pengguna",
              content: "Anda bertanggung jawab menjaga kerahasiaan akun dan password Anda. Semua aktivitas yang dilakukan melalui akun Anda adalah tanggung jawab Anda. Segera laporkan kepada kami jika terjadi penggunaan tidak sah pada akun Anda.",
            },
            {
              title: "4. Booking & Pembatalan",
              content: "Booking janji yang sudah dikonfirmasi dapat dibatalkan minimal 2 jam sebelum jadwal tanpa dikenakan biaya. Pembatalan kurang dari 2 jam dapat dikenakan biaya administrasi. Tidak hadir tanpa pemberitahuan (no-show) 2 kali berturut-turut dapat mengakibatkan pembatasan layanan.",
            },
            {
              title: "5. Informasi Medis",
              content: "Konten edukasi kesehatan di website kami bersifat informatif dan bukan pengganti konsultasi medis profesional. Selalu konsultasikan kondisi kesehatan Anda dengan dokter yang berkualifikasi.",
            },
            {
              title: "6. Pembayaran",
              content: "Biaya layanan harus dibayarkan sesuai tarif yang berlaku. Pembayaran dapat dilakukan melalui berbagai metode yang tersedia. Refund dilakukan sesuai kebijakan pembatalan yang berlaku.",
            },
            {
              title: "7. Batasan Tanggung Jawab",
              content: "RS Sehat Prima tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan kami. Tanggung jawab kami terbatas pada nilai layanan yang telah dibayarkan.",
            },
            {
              title: "8. Hukum yang Berlaku",
              content: "Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Segala sengketa akan diselesaikan melalui pengadilan yang berwenang di Jakarta.",
            },
          ].map(({ title, content }) => (
            <div key={title} className="mb-6">
              <h2 className="font-semibold text-slate-900 mb-2 text-base">{title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
            </div>
          ))}

          <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
            <Link href="/privacy" className="text-blue-600 text-sm hover:underline">Kebijakan Privasi</Link>
            <Link href="/contact" className="text-blue-600 text-sm hover:underline">Hubungi Kami</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
