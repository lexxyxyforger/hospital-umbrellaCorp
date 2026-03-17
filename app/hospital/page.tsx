"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bed, Activity, Ambulance, Phone, MapPin, Clock,
  CheckCircle, AlertCircle, Info, ChevronDown, ChevronUp,
  Wifi, Car, UtensilsCrossed, Coffee, Wind
} from "lucide-react";

type RoomType = {
  name: string;
  class: string;
  price: string;
  available: number;
  total: number;
  amenities: string[];
  color: string;
};

const ROOMS: RoomType[] = [
  {
    name: "Kelas III",
    class: "Kelas 3",
    price: "Rp 250.000/malam",
    available: 12,
    total: 40,
    amenities: ["4 Tempat tidur per kamar", "Kipas angin", "TV bersama", "Kamar mandi bersama"],
    color: "border-slate-200",
  },
  {
    name: "Kelas II",
    class: "Kelas 2",
    price: "Rp 450.000/malam",
    available: 8,
    total: 30,
    amenities: ["2 Tempat tidur per kamar", "AC", "TV pribadi", "Kamar mandi dalam"],
    color: "border-blue-200",
  },
  {
    name: "Kelas I",
    class: "Kelas 1",
    price: "Rp 750.000/malam",
    available: 5,
    total: 20,
    amenities: ["1 Tempat tidur per kamar", "AC", "TV 32\"", "Sofa tamu", "Kulkas kecil"],
    color: "border-cyan-200",
  },
  {
    name: "VIP",
    class: "VIP",
    price: "Rp 1.500.000/malam",
    available: 3,
    total: 10,
    amenities: ["Suite mewah", "AC inverter", "Smart TV 43\"", "Sofa bed", "Mini bar", "Bathtub"],
    color: "border-amber-200",
  },
  {
    name: "VVIP",
    class: "VVIP",
    price: "Rp 3.000.000/malam",
    available: 1,
    total: 5,
    amenities: ["Presidential suite", "Living room", "2 Kamar mandi", "Dapur kecil", "Balkon", "Butler service"],
    color: "border-violet-200",
  },
];

const AMENITIES = [
  { icon: Wifi, label: "WiFi Gratis" },
  { icon: Car, label: "Parkir Luas" },
  { icon: UtensilsCrossed, label: "Kafetaria 24 Jam" },
  { icon: Coffee, label: "Vending Machine" },
  { icon: Wind, label: "AC Seluruh Gedung" },
  { icon: Activity, label: "Monitor 24 Jam" },
];

const FAQ_IGD = [
  {
    q: "Kapan harus ke IGD?",
    a: "Segera ke IGD jika mengalami nyeri dada, sesak napas berat, kehilangan kesadaran, stroke, kecelakaan, atau kondisi darurat lainnya yang mengancam jiwa.",
  },
  {
    q: "Apakah IGD menerima pasien BPJS?",
    a: "Ya, IGD kami menerima pasien BPJS tanpa surat rujukan untuk kondisi darurat medis. Silakan bawa kartu BPJS Anda.",
  },
  {
    q: "Berapa lama waktu tunggu di IGD?",
    a: "Pasien IGD ditangani berdasarkan tingkat kegawatan (triase). Kondisi mengancam jiwa ditangani segera. Rata-rata waktu tunggu adalah 5-15 menit.",
  },
  {
    q: "Apakah bisa request dokter tertentu di IGD?",
    a: "Di IGD, dokter jaga yang akan menangani Anda pertama kali. Jika diperlukan konsultasi spesialis, dokter jaga akan menghubungi dokter spesialis on-call.",
  },
];

export default function HospitalInfoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalAvailable = ROOMS.reduce((sum, r) => sum + r.available, 0);
  const totalBeds = ROOMS.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Informasi RS</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Informasi Rumah Sakit
          </h1>
          <p className="text-slate-500 max-w-xl">
            Status kamar real-time, informasi IGD, layanan ambulans, dan fasilitas pendukung RS Sehat Prima
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Ketersediaan Kamar */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Status Ketersediaan Kamar
              </h2>
              <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Update real-time • {totalAvailable} dari {totalBeds} kamar tersedia
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-400" /> Tersedia</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400" /> Terbatas</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /> Penuh</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {ROOMS.map((room) => {
              const pct = room.available / room.total;
              const statusColor = pct > 0.3 ? "text-emerald-600 bg-emerald-50" : pct > 0 ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50";
              const barColor = pct > 0.3 ? "bg-emerald-400" : pct > 0 ? "bg-amber-400" : "bg-red-400";

              return (
                <div key={room.name} className={`bg-white rounded-2xl border-2 ${room.color} card-shadow p-5`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{room.name}</h3>
                      <div className="text-xs font-bold text-blue-600 mt-0.5">{room.price}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                      {room.available > 0 ? `${room.available} tersedia` : "Penuh"}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4">
                    <div
                      className={`h-full rounded-full transition-all ${barColor}`}
                      style={{ width: `${(room.available / room.total) * 100}%` }}
                    />
                  </div>

                  <ul className="space-y-1.5">
                    {room.amenities.slice(0, 3).map((a) => (
                      <li key={a} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle size={11} className="text-emerald-500 shrink-0" />
                        {a}
                      </li>
                    ))}
                    {room.amenities.length > 3 && (
                      <li className="text-xs text-slate-400">+{room.amenities.length - 3} fasilitas lainnya</li>
                    )}
                  </ul>

                  <Link
                    href="/contact"
                    className={`mt-4 w-full block text-center py-2 rounded-xl text-xs font-medium transition-all ${
                      room.available > 0
                        ? "gradient-primary text-white hover:opacity-90"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {room.available > 0 ? "Pesan Kamar" : "Tidak Tersedia"}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* IGD 24 Jam */}
        <section>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-7 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>IGD 24 Jam</h2>
                  <div className="flex items-center gap-1.5 text-red-200 text-sm">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Siaga Penuh
                  </div>
                </div>
              </div>
              <p className="text-red-100 mb-5 text-sm leading-relaxed">
                Unit Gawat Darurat kami beroperasi 24 jam penuh dengan dokter jaga, perawat terlatih, dan peralatan medis lengkap untuk menangani semua kondisi darurat.
              </p>
              <div className="space-y-2.5 mb-5">
                {[
                  "Dokter spesialis on-call 24/7",
                  "Resuscitation room & trauma bay",
                  "Ventilator & monitoring canggih",
                  "Laboratorium & radiologi emergensi",
                  "Tim kode biru (code blue team)",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-red-100">
                    <CheckCircle size={14} className="text-white shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="tel:+62215551234"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-red-600 font-bold text-lg hover:bg-red-50 transition-colors"
              >
                <Phone size={20} />
                (021) 555-1234
              </a>
            </div>

            {/* FAQ IGD */}
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Info size={18} className="text-blue-600" />
                FAQ Layanan IGD
              </h3>
              <div className="space-y-3">
                {FAQ_IGD.map((faq, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors text-left"
                    >
                      <span>{faq.q}</span>
                      {openFaq === i ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ambulans */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                🚑 Layanan Ambulans
              </h2>
              <p className="text-slate-500 text-sm mt-1">Armada ambulans modern siap melayani Anda kapanpun</p>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {[
                {
                  type: "Ambulans Gawat Darurat",
                  desc: "Dilengkapi peralatan ALS (Advanced Life Support) untuk penanganan darurat di jalan.",
                  price: "Rp 150.000 – 500.000",
                  time: "Respons < 15 menit",
                  icon: "🚨",
                },
                {
                  type: "Ambulans Transfer Pasien",
                  desc: "Untuk pemindahan pasien antar fasilitas kesehatan dengan pemantauan medis selama perjalanan.",
                  price: "Rp 300.000 – 1.000.000",
                  time: "Jadwal fleksibel",
                  icon: "🏥",
                },
                {
                  type: "Ambulans Jenazah",
                  desc: "Layanan pemulangan jenazah ke rumah duka dengan penanganan yang bermartabat.",
                  price: "Rp 500.000 – 1.500.000",
                  time: "24 jam tersedia",
                  icon: "🕊️",
                },
              ].map((svc) => (
                <div key={svc.type} className="p-6">
                  <div className="text-3xl mb-3">{svc.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{svc.type}</h3>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">{svc.desc}</p>
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div>💰 {svc.price}</div>
                    <div>⏱ {svc.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <AlertCircle size={16} className="text-amber-500 shrink-0" />
                  Hubungi kami untuk informasi harga lebih detail sesuai jarak dan kebutuhan
                </div>
                <a
                  href="tel:+62215551234"
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90"
                >
                  <Phone size={15} /> Pesan Ambulans
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Fasilitas Umum */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-display)" }}>
            Fasilitas Pendukung
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white rounded-2xl border border-slate-100 card-shadow p-4 text-center hover:card-shadow-hover transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2">
                  <Icon size={18} className="text-blue-600" />
                </div>
                <span className="text-xs font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lokasi */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <MapPin size={20} className="text-blue-600" /> Lokasi Kami
              </h2>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Alamat</div>
                  <p className="text-slate-800">Jl. Kesehatan No. 1, Jakarta Selatan,<br />DKI Jakarta 12345</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Jam Operasional</div>
                  <div className="space-y-1 text-sm text-slate-700">
                    <div className="flex justify-between"><span>Senin – Jumat</span><span>07:00 – 21:00</span></div>
                    <div className="flex justify-between"><span>Sabtu – Minggu</span><span>08:00 – 18:00</span></div>
                    <div className="flex justify-between text-emerald-600 font-medium"><span>IGD</span><span>24 Jam</span></div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Transportasi</div>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div>🚌 TransJakarta: Halte Kesehatan (200m)</div>
                    <div>🚇 MRT: Stasiun Blok M (500m)</div>
                    <div>🚗 Parkir tersedia 200+ kendaraan</div>
                    <div>🛵 Parkir motor tersedia</div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <MapPin size={15} /> Buka di Google Maps
                </a>
              </div>
              <div className="relative h-64 md:h-auto min-h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-slate-600 text-sm font-medium">RS Sehat Prima</p>
                  <p className="text-slate-400 text-xs">Jakarta Selatan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
