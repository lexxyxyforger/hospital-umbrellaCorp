import Image from "next/image";
import Link from "next/link";
import {
  Award, Shield, Heart, Users, Clock, MapPin,
  CheckCircle, Star, ArrowRight, Phone
} from "lucide-react";

const MILESTONES = [
  { year: "2008", event: "RS Sehat Prima didirikan dengan 50 tempat tidur dan 10 dokter spesialis" },
  { year: "2012", event: "Ekspansi gedung baru, kapasitas meningkat menjadi 150 tempat tidur" },
  { year: "2015", event: "Mendapatkan akreditasi KARS Paripurna pertama kali" },
  { year: "2018", event: "Peluncuran layanan telemedicine dan booking online pertama" },
  { year: "2020", event: "Penanganan COVID-19, menjadi RS rujukan utama di Jakarta Selatan" },
  { year: "2023", event: "Renovasi gedung, penambahan unit MRI 3 Tesla dan CT Scan 128 slice" },
  { year: "2024", event: "Meraih ISO 9001:2015 dan penghargaan RS Terbaik Jakarta" },
];

const VALUES = [
  { icon: Heart, title: "Empati", desc: "Kami melayani setiap pasien dengan penuh empati, mengedepankan kenyamanan dan keselamatan." },
  { icon: Shield, title: "Integritas", desc: "Transparansi dan kejujuran dalam setiap tindakan medis dan pelayanan kepada pasien." },
  { icon: Award, title: "Keunggulan", desc: "Standar pelayanan tertinggi dengan teknologi terkini dan tenaga medis berpengalaman." },
  { icon: Users, title: "Kolaborasi", desc: "Kerja sama tim medis multidisiplin untuk memberikan penanganan terbaik." },
];

const ACHIEVEMENTS = [
  "Akreditasi KARS Paripurna (2024)",
  "ISO 9001:2015 Quality Management",
  "RS Terbaik Jakarta Selatan 2023",
  "Penghargaan Patient Safety Award 2022",
  "Top 10 Rumah Sakit Digital Indonesia 2023",
  "Green Hospital Certification 2023",
];

const FACILITIES = [
  { name: "ICU & ICCU", icon: "🏥", count: "20 Tempat Tidur" },
  { name: "Kamar Operasi", icon: "⚕️", count: "8 Ruang OK" },
  { name: "Laboratorium", icon: "🔬", count: "24/7 Operasional" },
  { name: "Radiologi", icon: "📡", count: "MRI, CT Scan, Rontgen" },
  { name: "Farmasi", icon: "💊", count: "24/7 Operasional" },
  { name: "Rehabilitasi", icon: "🏃", count: "Fisioterapi Modern" },
  { name: "Bank Darah", icon: "🩸", count: "Stok Lengkap" },
  { name: "Hemodialisis", icon: "⚗️", count: "12 Unit" },
];

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      {/* Hero */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Tentang Kami</span>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-2 mb-5" style={{ fontFamily: "var(--font-display)" }}>
                Melayani dengan <span className="text-gradient">Sepenuh Hati</span> Sejak 2008
              </h1>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                RS Sehat Prima adalah rumah sakit modern berkomitmen memberikan pelayanan kesehatan berkualitas tinggi dengan sentuhan kemanusiaan. Dipercaya lebih dari 100.000 pasien sejak berdiri.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { value: "50+", label: "Dokter Spesialis" },
                  { value: "250", label: "Tempat Tidur" },
                  { value: "100k+", label: "Pasien/Tahun" },
                  { value: "16+", label: "Tahun Berpengalaman" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/contact" className="px-5 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity">
                  Hubungi Kami
                </Link>
                <Link href="/doctors" className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2">
                  Temui Tim Dokter <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80"
                  alt="RS Sehat Prima"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="fill-amber-400 text-amber-400" size={16} />
                  <span className="font-bold text-slate-900">4.9 / 5.0</span>
                </div>
                <div className="text-xs text-slate-500">Dari 10.000+ ulasan</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="text-xs text-slate-500 mb-1">Akreditasi</div>
                <div className="font-bold text-emerald-600">KARS Paripurna ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Star size={22} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>Visi Kami</h2>
              <p className="text-slate-600 leading-relaxed">
                Menjadi rumah sakit terkemuka di Indonesia yang memberikan pelayanan kesehatan berstandar internasional, berfokus pada keselamatan pasien, inovasi teknologi, dan pelayanan berkemanusiaan.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-8">
              <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center mb-4">
                <Heart size={22} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>Misi Kami</h2>
              <ul className="space-y-2.5">
                {[
                  "Memberikan pelayanan medis berkualitas tinggi dengan empati",
                  "Mengembangkan tenaga medis profesional secara berkelanjutan",
                  "Menerapkan teknologi kesehatan terkini untuk hasil optimal",
                  "Menjaga keamanan dan kenyamanan lingkungan perawatan",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nilai */}
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Nilai-Nilai Kami
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 text-center hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah / Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Perjalanan Kami</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              Sejarah RS Sehat Prima
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className={`flex gap-6 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5 inline-block">
                      <div className="text-lg font-bold text-blue-600 mb-1" style={{ fontFamily: "var(--font-display)" }}>{m.year}</div>
                      <p className="text-sm text-slate-600">{m.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Infrastruktur</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              Fasilitas Modern Kami
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {FACILITIES.map(({ name, icon, count }) => (
              <div key={name} className="bg-white rounded-2xl border border-slate-100 card-shadow p-5 text-center hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{name}</h3>
                <p className="text-xs text-slate-500">{count}</p>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <h3 className="font-semibold text-slate-900 mb-4">Galeri Fasilitas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80",
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80",
              "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&q=80",
              "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=80",
            ].map((src, i) => (
              <div key={i} className="relative h-40 rounded-2xl overflow-hidden group">
                <Image src={src} alt={`Fasilitas ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penghargaan */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Pengakuan</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              Penghargaan & Akreditasi
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <div key={a} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <Award size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium text-slate-800">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Percayakan Kesehatan Anda kepada Kami
          </h2>
          <p className="text-slate-500 mb-8">
            Tim medis profesional kami siap memberikan pelayanan terbaik untuk Anda dan keluarga
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment/book" className="px-8 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
              Buat Janji Sekarang
            </Link>
            <a href="tel:+62215551234" className="px-8 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2 justify-center">
              <Phone size={18} /> (021) 555-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
