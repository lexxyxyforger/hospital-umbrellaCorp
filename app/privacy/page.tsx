import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Kebijakan Privasi
          </h1>
          <p className="text-slate-500 text-sm mb-8">Terakhir diperbarui: 1 Desember 2024</p>

          {[
            {
              title: "1. Informasi yang Kami Kumpulkan",
              content: "Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, alamat email, nomor telepon, tanggal lahir, dan informasi kesehatan saat membuat akun atau membuat janji. Kami juga mengumpulkan data penggunaan secara otomatis seperti alamat IP, jenis browser, dan halaman yang dikunjungi.",
            },
            {
              title: "2. Bagaimana Kami Menggunakan Informasi",
              content: "Informasi yang dikumpulkan digunakan untuk: menyediakan layanan kesehatan, mengelola janji dokter, mengirim konfirmasi dan pengingat, meningkatkan layanan kami, dan memenuhi kewajiban hukum. Kami tidak menjual informasi pribadi Anda kepada pihak ketiga.",
            },
            {
              title: "3. Keamanan Data",
              content: "Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang ketat untuk melindungi data Anda, termasuk enkripsi SSL/TLS, akses terbatas, dan audit keamanan berkala. Data medis disimpan sesuai standar keamanan informasi kesehatan.",
            },
            {
              title: "4. Penyimpanan Data",
              content: "Data medis Anda disimpan selama diperlukan untuk keperluan medis sesuai regulasi (minimal 5 tahun). Data akun disimpan selama akun aktif. Anda dapat meminta penghapusan data non-medis kapan saja.",
            },
            {
              title: "5. Hak Anda",
              content: "Anda berhak untuk: mengakses data pribadi Anda, memperbarui atau mengoreksi data yang tidak akurat, meminta penghapusan data (dengan batasan legal), dan menarik persetujuan kapan saja. Hubungi kami melalui privacy@rssehatprima.id untuk menggunakan hak-hak ini.",
            },
            {
              title: "6. Cookie dan Teknologi Pelacakan",
              content: "Website kami menggunakan cookie untuk meningkatkan pengalaman pengguna. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda. Menonaktifkan cookie tertentu dapat memengaruhi fungsionalitas website.",
            },
            {
              title: "7. Perubahan Kebijakan",
              content: "Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan akan diberitahukan melalui email atau notifikasi di website. Penggunaan layanan kami setelah perubahan berarti Anda menyetujui kebijakan yang diperbarui.",
            },
            {
              title: "8. Hubungi Kami",
              content: "Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di: privacy@rssehatprima.id atau RS Sehat Prima, Jl. Kesehatan No. 1, Jakarta Selatan 12345, Indonesia.",
            },
          ].map(({ title, content }) => (
            <div key={title} className="mb-6">
              <h2 className="font-semibold text-slate-900 mb-2 text-base">{title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
            </div>
          ))}

          <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
            <Link href="/terms" className="text-blue-600 text-sm hover:underline">Syarat & Ketentuan</Link>
            <Link href="/contact" className="text-blue-600 text-sm hover:underline">Hubungi Kami</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
