"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Calendar, Search, Shield, Clock, Star, ArrowRight,
  Phone, MapPin, Heart, Users, Award, Activity,
  HeartPulse, Brain, Bone, Baby, Leaf, Eye,
  Smile, FlaskConical, Pill, Flower2, Stethoscope,
  Scissors, Ear, Sparkles, Hospital,
} from "lucide-react";
import { DOCTORS, ARTICLES, REVIEWS, SPECIALTIES } from "@/lib/data";
import { DoctorCard } from "@/components/DoctorCard";
import { ArticleCard } from "@/components/ArticleCard";

const QUICK_SERVICES = [
  { icon: Calendar, label: "Booking Dokter", desc: "Akses rekam medis & jadwal", href: "/appointment/book", color: "bg-blue-500" },
  { icon: Clock, label: "IGD 24 Jam", desc: "Respons darurat prioritas", href: "/services/igd-24-jam", color: "bg-red-500" },
  { icon: Shield, label: "Medical Checkup", desc: "Protokol pemantauan rutin", href: "/services/medical-checkup", color: "bg-emerald-500" },
  { icon: Activity, label: "Vaksinasi", desc: "Program imunisasi korporat", href: "/services/vaksinasi", color: "bg-violet-500" },
  { icon: Phone, label: "Telepon Darurat", desc: "(021) 555-1234", href: "tel:+62215551234", color: "bg-amber-500" },
  { icon: MapPin, label: "Lokasi RS", desc: "Raccoon City, Jakarta", href: "/contact#map", color: "bg-cyan-500" },
];

const SPECIALTY_ICONS: Record<string, LucideIcon> = {
  "Kardiologi": HeartPulse,
  "Neurologi": Brain,
  "Ortopedi": Bone,
  "Pediatri": Baby,
  "Dermatologi": Leaf,
  "Ophthalmologi": Eye,
  "Psikiatri": Smile,
  "Onkologi": FlaskConical,
  "Urologi": Pill,
  "Ginekologi": Flower2,
  "Penyakit Dalam": Stethoscope,
  "Bedah Umum": Scissors,
  "THT": Ear,
  "Gigi & Mulut": Sparkles,
};

const STATS = [
  { value: "50+", label: "Ilmuwan & Spesialis", icon: Users },
  { value: "25+", label: "Tahun Riset & Operasi", icon: Award },
  { value: "100k+", label: "Subjek Ditangani", icon: Heart },
  { value: "4.9", label: "Indeks Kepuasan", icon: Star },
];

export default function HomePage() {
  const [currentReview, setCurrentReview] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 lg:pt-24">
      <section className="relative overflow-hidden gradient-hero min-h-[88vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-20 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-50/40 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="transition-all duration-700"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(24px)",
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Fasilitas Umbrella Corp Beroperasi 24/7
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Solusi{" "}
                <span className="text-gradient">Kesehatan</span>
                <br />
                Kelas Korporasi
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                Umbrella Corp menghadirkan layanan medis berstandar tinggi dengan teknologi mutakhir. Akses 50+ spesialis terlatih, sistem booking terintegrasi, dan protokol kesehatan terpadu.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/appointment/book"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                >
                  <Calendar size={18} />
                  Buat Janji Dokter
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
                >
                  Lihat Layanan
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-xl border border-slate-100 max-w-md">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search size={18} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari spesialis atau layanan Umbrella Corp..."
                    className="w-full text-sm text-slate-800 bg-transparent outline-none placeholder-slate-400"
                  />
                </div>
                <button className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Cari
                </button>
              </div>

              <div className="flex items-center gap-6 mt-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <Image
                        key={i}
                        src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span>100k+ subjek terlayani</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-700">4.9</span>
                  <span>indeks kepuasan</span>
                </div>
              </div>
            </div>

            <div
              className="relative hidden lg:block"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(24px) scale(0.97)",
                transition: "all 0.9s ease",
                transitionDelay: "0.2s",
              }}
            >
              <div className="relative w-full h-[520px]">
                <div className="absolute right-0 top-0 w-[420px] h-[480px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=90"
                    alt="Fasilitas Medis Umbrella Corp"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute left-0 top-16 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 w-56">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80"
                      alt="dr. Albert Wesker"
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">dr. Albert Wesker</div>
                      <div className="text-xs text-slate-500">Virologi & Rekayasa Genetik</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={11} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">4.9 (245)</span>
                  </div>
                  <Link
                    href="/doctors/dr-001"
                    className="mt-3 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Calendar size={12} />
                    Jadwal Tersedia
                  </Link>
                </div>

                <div className="absolute left-4 bottom-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Subjek Ditangani Hari Ini</div>
                  <div className="text-2xl font-bold text-slate-900">128</div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
                    <Activity size={12} />
                    +12% dari kemarin
                  </div>
                </div>

                <div className="absolute right-4 bottom-16 bg-red-500 text-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-medium">Darurat Umbrella 24 Jam</span>
                  </div>
                  <div className="text-lg font-bold">(021) 555-1234</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Divisi Layanan</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              Akses Cepat Umbrella Corp
            </h2>
            <p className="text-slate-500 mt-3 max-w-md mx-auto">
              Navigasi seluruh fasilitas dan layanan medis Umbrella Corp dengan efisien
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {QUICK_SERVICES.map(({ icon: Icon, label, desc, href, color }) => (
              <Link
                key={label}
                href={href}
                className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{label}</div>
                <div className="text-xs text-slate-400">{desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Tim Riset & Medis</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
                Spesialis Unggulan Umbrella
              </h2>
              <p className="text-slate-500 mt-3 max-w-lg">
                Para ahli terpilih Umbrella Corp dengan rekam jejak dan penilaian tertinggi dari ribuan pasien
              </p>
            </div>
            <Link
              href="/doctors"
              className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
            >
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.filter((d) => d.isPopular).slice(0, 3).map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-blue-300 hover:text-blue-600 transition-all"
            >
              Lihat Semua Spesialis <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Divisi Spesialisasi</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              Bidang Riset & Layanan Medis
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {SPECIALTIES.slice(1).map((specialty) => {
              const Icon = SPECIALTY_ICONS[specialty] ?? Hospital;
              return (
                <Link
                  key={specialty}
                  href={`/doctors?specialty=${encodeURIComponent(specialty)}`}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 text-center leading-tight group-hover:text-blue-600 transition-colors">
                    {specialty}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Edukasi & Riset</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
                Publikasi Ilmiah Umbrella
              </h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all">
              Semua Publikasi <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ArticleCard article={ARTICLES[0]} variant="featured" />
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {ARTICLES.slice(1).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Testimoni</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              Laporan Kepuasan Pasien
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow hover:card-shadow-hover transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} className={s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-4">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.patientPhoto}
                    alt={review.patientName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{review.patientName}</div>
                    {review.isVerified && (
                      <span className="text-xs text-emerald-600 flex items-center gap-1">
                        ✓ Pasien Terverifikasi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl gradient-primary overflow-hidden p-12 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Jadwalkan Konsultasi dengan Umbrella Corp
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Lebih dari 50 spesialis Umbrella Corp siap memberikan solusi kesehatan terbaik untuk Anda dan keluarga
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/appointment/book"
                  className="px-8 py-3.5 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Buat Janji Sekarang
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-xl border-2 border-white/50 text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
                >
                  <Phone size={18} />
                  Hubungi Umbrella Corp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}