"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search, MessageSquare } from "lucide-react";

type FAQ = { q: string; a: string; category: string };

const FAQS: FAQ[] = [
  // Booking
  { category: "Booking & Janji", q: "Bagaimana cara membuat janji dokter?", a: "Anda bisa membuat janji dokter melalui website kami dengan klik tombol 'Buat Janji', pilih dokter, tanggal, jam, dan isi data pasien. Konfirmasi akan dikirim melalui email atau SMS." },
  { category: "Booking & Janji", q: "Apakah bisa membuat janji untuk keluarga?", a: "Ya, Anda bisa membuat janji untuk anggota keluarga. Saat mengisi formulir booking, masukkan nama pasien yang akan datang (bukan nama akun)." },
  { category: "Booking & Janji", q: "Bagaimana cara reschedule atau membatalkan janji?", a: "Masuk ke Dashboard > Janji Saya, pilih janji yang ingin diubah, klik 'Reschedule' atau 'Batalkan'. Pembatalan tanpa biaya jika dilakukan minimal 2 jam sebelum jadwal." },
  { category: "Booking & Janji", q: "Berapa lama sebelumnya harus datang?", a: "Kami menyarankan hadir 15-20 menit sebelum jadwal untuk proses registrasi dan kelengkapan administrasi." },

  // Pembayaran
  { category: "Pembayaran", q: "Metode pembayaran apa yang tersedia?", a: "Kami menerima tunai, kartu debit/kredit (Visa, Mastercard), transfer bank, GoPay, OVO, Dana, LinkAja, dan QRIS." },
  { category: "Pembayaran", q: "Apakah menerima BPJS Kesehatan?", a: "Ya, kami menerima BPJS Kesehatan. Untuk pelayanan rawat jalan dengan BPJS, Anda perlu membawa surat rujukan dari faskes pertama (kecuali untuk kondisi darurat di IGD)." },
  { category: "Pembayaran", q: "Apakah ada cicilan untuk biaya pengobatan?", a: "Ya, tersedia fasilitas cicilan 0% untuk tagihan di atas Rp 1.000.000 menggunakan kartu kredit tertentu. Tanyakan ke bagian kasir untuk informasi lebih lanjut." },

  // Layanan Medis
  { category: "Layanan Medis", q: "Apa saja spesialis yang tersedia?", a: "Kami memiliki lebih dari 14 spesialis: Kardiologi, Neurologi, Pediatri, Dermatologi, Ginekologi, Ortopedi, THT, Mata, Gigi, Psikiatri, Onkologi, Urologi, Penyakit Dalam, dan Bedah Umum." },
  { category: "Layanan Medis", q: "Apakah ada layanan telemedicine?", a: "Ya, kami menyediakan layanan konsultasi online melalui platform telemedicine kami untuk konsultasi awal dan follow-up. Tersedia Senin-Sabtu pukul 09:00-18:00." },
  { category: "Layanan Medis", q: "Berapa lama hasil laboratorium keluar?", a: "Hasil laboratorium rutin tersedia dalam 2-4 jam. Pemeriksaan khusus (kultur, PCR) dapat memakan waktu 1-3 hari kerja. Hasil dapat diakses secara digital melalui akun Anda." },

  // Rawat Inap
  { category: "Rawat Inap", q: "Apa saja fasilitas kamar rawat inap?", a: "Tersedia kamar Kelas III, II, I, VIP, dan VVIP. Semua kamar dilengkapi AC, TV, dan WiFi. VIP ke atas dilengkapi sofa tamu, kulkas, dan fasilitas tambahan." },
  { category: "Rawat Inap", q: "Apakah keluarga bisa menginap bersama pasien?", a: "Untuk kamar VIP dan VVIP, tersedia fasilitas sofa bed untuk satu pendamping. Kelas I ke bawah, pengunjung dibatasi jam 08:00-20:00 untuk menjaga kenyamanan pasien." },
  { category: "Rawat Inap", q: "Bagaimana sistem makan pasien rawat inap?", a: "Makanan pasien disediakan 3 kali sehari sesuai kebutuhan diet medis. Kafetaria tersedia 24 jam untuk keluarga pasien." },

  // Akun & Aplikasi
  { category: "Akun & Website", q: "Bagaimana cara mendaftar akun?", a: "Klik 'Daftar' di pojok kanan atas, isi nama, email, nomor HP, dan password. Akun langsung aktif setelah mendaftar." },
  { category: "Akun & Website", q: "Lupa password, bagaimana cara reset?", a: "Klik 'Lupa Password' di halaman login, masukkan email terdaftar, lalu ikuti instruksi yang dikirim ke email Anda." },
  { category: "Akun & Website", q: "Apakah data medis saya aman?", a: "Ya, kami menggunakan enkripsi SSL dan mematuhi regulasi privasi data kesehatan. Data medis Anda hanya dapat diakses oleh Anda dan tim medis yang menangani." },
];

const CATEGORIES = ["Semua", "Booking & Janji", "Pembayaran", "Layanan Medis", "Rawat Inap", "Akun & Website"];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = FAQS.filter((f) => {
    const matchSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Semua" || f.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Bantuan</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Pertanyaan yang Sering Ditanyakan
          </h1>
          <p className="text-slate-500 mb-6">Temukan jawaban untuk pertanyaan umum seputar layanan kami</p>
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? "gradient-primary text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-3 mb-10">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
              <Search size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Tidak ada pertanyaan yang cocok</p>
            </div>
          ) : (
            filtered.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-start justify-between p-5 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                      {faq.category}
                    </span>
                    <p className={`text-sm font-semibold ${openIdx === i ? "text-blue-700" : "text-slate-900"}`}>
                      {faq.q}
                    </p>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIdx === i ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                    {openIdx === i ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </button>
                {openIdx === i && (
                  <div className="px-5 pb-5 border-t border-slate-100">
                    <p className="text-sm text-slate-700 leading-relaxed pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still need help */}
        <div className="bg-white rounded-3xl border border-slate-100 card-shadow p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={26} className="text-blue-600" />
          </div>
          <h2 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Masih Punya Pertanyaan?
          </h2>
          <p className="text-slate-500 text-sm mb-5">Tim customer service kami siap membantu Anda 24/7</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-medium text-sm hover:opacity-90 transition-opacity">
              Hubungi Kami
            </Link>
            <a href="tel:+62215551234" className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:border-blue-300 hover:text-blue-600 transition-all">
              📞 (021) 555-1234
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
