"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import "./page.css";
import {
  Calendar,
  Search,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Phone,
  MapPin,
  Heart,
  Users,
  Award,
  Activity,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Leaf,
  Eye,
  Smile,
  FlaskConical,
  Pill,
  Flower2,
  Stethoscope,
  Scissors,
  Ear,
  Sparkles,
  Hospital,
  ChevronRight,
  Microscope,
  BarChart3,
  Cpu,
  Droplet,
} from "lucide-react";
import { DOCTORS, ARTICLES, REVIEWS, SPECIALTIES } from "@/lib/data";
import { DoctorCard } from "@/components/DoctorCard";
import { ArticleCard } from "@/components/ArticleCard";

const QUICK_SERVICES = [
  {
    icon: Calendar,
    label: "Booking Dokter",
    desc: "Jadwal instan dengan 500+ spesialis",
    href: "/appointment/book",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: Clock,
    label: "IGD 24 Jam",
    desc: "Tanggap darurat dalam 5 menit",
    href: "/services/igd-24-jam",
    color: "from-red-600 to-orange-500",
  },
  {
    icon: Shield,
    label: "Medical Checkup",
    desc: "Screening komprehensif & detail",
    href: "/services/medical-checkup",
    color: "from-emerald-600 to-teal-500",
  },
  {
    icon: Activity,
    label: "Vaksinasi Terlengkap",
    desc: "Imunisasi untuk semua umur",
    href: "/services/vaksinasi",
    color: "from-violet-600 to-purple-500",
  },
  {
    icon: Phone,
    label: "Telemedicine 24/7",
    desc: "Konsultasi dokter dari rumah",
    href: "tel:+62215551234",
    color: "from-amber-600 to-yellow-500",
  },
  {
    icon: MapPin,
    label: "Lokasi Strategis",
    desc: "Cabang di 15 kota besar",
    href: "/contact#map",
    color: "from-pink-600 to-rose-500",
  },
];

const SPECIALTY_ICONS: Record<string, LucideIcon> = {
  Kardiologi: HeartPulse,
  Neurologi: Brain,
  Ortopedi: Bone,
  Pediatri: Baby,
  Dermatologi: Leaf,
  Ophthalmologi: Eye,
  Psikiatri: Smile,
  Onkologi: FlaskConical,
  Urologi: Pill,
  Ginekologi: Flower2,
  "Penyakit Dalam": Stethoscope,
  "Bedah Umum": Scissors,
  THT: Ear,
  "Gigi & Mulut": Sparkles,
};

const STATS = [
  { value: "500+", label: "Dokter Spesialis Bersertifikat", icon: Users },
  { value: "35+", label: "Tahun Melayani Masyarakat", icon: Award },
  { value: "2.5M", label: "Pasien Tersembuhkan", icon: Heart },
  { value: "4.95", label: "Rating Kepuasan Pasien", icon: Star },
];

const FEATURES = [
  {
    icon: Microscope,
    title: "Lab Berteknologi AI",
    desc: "Analisis diagnostik dengan akurasi 99.8% menggunakan AI dan machine learning terkini.",
  },
  {
    icon: Cpu,
    title: "Sistem Elektronik Medis",
    desc: "Rekam medis digital terintegrasi dengan enkripsi tingkat militer dan akses real-time.",
  },
  {
    icon: BarChart3,
    title: "Analytics Kesehatan",
    desc: "Monitoring vital signs 24/7 dengan dashboard prediktif untuk pencegahan penyakit.",
  },
  {
    icon: Droplet,
    title: "Donor Bank Berkualitas",
    desc: "Stok darah tercanggih dengan testing komprehensif dan cold-chain terjaga sempurna.",
  },
];

function BiometricGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ filter: "blur(0.3px)" }}
    >
      <defs>
        <pattern id="ucgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="ucfade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="ucmask">
          <rect width="600" height="600" fill="url(#ucfade)" />
        </mask>
      </defs>
      <rect width="600" height="600" fill="url(#ucgrid)" mask="url(#ucmask)" />
      <circle cx="300" cy="300" r="120" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 8" />
      <circle cx="300" cy="300" r="200" fill="none" stroke="#6366f1" strokeWidth="0.3" strokeDasharray="2 12" />
      <circle cx="300" cy="300" r="270" fill="none" stroke="#8b5cf6" strokeWidth="0.3" strokeDasharray="1 16" />
      <line x1="0" y1="300" x2="600" y2="300" stroke="#3b82f6" strokeWidth="0.3" />
      <line x1="300" y1="0" x2="300" y2="600" stroke="#3b82f6" strokeWidth="0.3" />
    </svg>
  );
}

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");

    if (Number.isNaN(numericPart)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          setDisplay("0" + suffix);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const cur = ease * numericPart;
            setDisplay(
              cur % 1 === 0
                ? Math.floor(cur) + suffix
                : cur.toFixed(1) + suffix,
            );
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function HomePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      setHeroVisible(true);
    }, 80);

    const onMove = (e: MouseEvent) =>
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const blobTransform = (dx: number, dy: number) =>
    isMounted
      ? `translate(${(mousePos.x - 0.5) * dx}px,${(mousePos.y - 0.5) * dy}px)`
      : "none";

  return (
    <div className="pt-20 lg:pt-24 overflow-hidden">
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#f8faff]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute w-[900px] h-[900px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle,#dbeafe 0%,transparent 70%)",
              top: "-20%",
              right: "-15%",
              transform: blobTransform(-30, -30),
              transition: "transform 0.9s ease-out",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle,#c7d2fe 0%,transparent 70%)",
              bottom: "-10%",
              left: "-10%",
              transform: blobTransform(20, 20),
              transition: "transform 1.1s ease-out",
            }}
          />
          <BiometricGrid className="opacity-[0.07]" />
          <div
            className="uc-scanline absolute left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg,transparent,rgba(59,130,246,.2),transparent)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(32px)",
                transition: "opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)",
              }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-8">
                <span className="uc-pulse w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" />
                Rumah Sakit Terakreditasi · Layanan 24/7
              </div>

              <h1 className="uc-display text-5xl sm:text-6xl lg:text-[72px] leading-[0.92] text-slate-900 mb-8">
                Rumah Sakit
                <br />
                <span className="uc-gradient-text">Terdepan</span>
                <br />
                <span className="text-slate-800">Indonesia</span>
              </h1>

              <p className="text-[17px] text-slate-500 leading-relaxed max-w-[480px] mb-10 font-light">
                Umbrella Corp menghadirkan layanan kesehatan kelas dunia. Akses{" "}
                <strong className="text-slate-700 font-medium">
                  500+ dokter spesialis bersertifikat internasional
                </strong>
                , fasilitas ultramodern, dan standar keselamatan tertinggi.
              </p>

              <div
                className="flex gap-2 bg-white rounded-2xl p-2 border border-slate-200 max-w-[480px] mb-8 hover:border-blue-200 transition-colors"
                style={{ boxShadow: "0 4px 24px rgba(37,99,235,.08)" }}
              >
                <div className="flex-1 flex items-center gap-3 px-3">
                  <Search size={16} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari dokter, layanan, atau penyakit…"
                    className="w-full text-sm text-slate-800 bg-transparent outline-none placeholder-slate-400"
                  />
                </div>
                <button
                  className="uc-glow-btn px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all"
                  style={{
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    boxShadow: "0 4px 12px rgba(37,99,235,.3)",
                  }}
                >
                  Cari
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/appointment/book"
                  className="uc-glow-btn flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform"
                  style={{
                    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
                    boxShadow: "0 8px 24px rgba(37,99,235,.35)",
                  }}
                >
                  <Calendar size={17} /> Buat Janji Dokter
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5 transition-all"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}
                >
                  Lihat Layanan <ChevronRight size={16} />
                </Link>
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2.5">
                    {[11, 12, 13, 14].map((i) => (
                      <Image
                        key={i}
                        src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white shadow-sm"
                        unoptimized
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-slate-500">2.5 juta+ pasien terlayani</span>
                </div>
                <div className="w-px h-7 bg-slate-200 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[13px] font-semibold text-slate-700">4.95</span>
                  <span className="text-[13px] text-slate-400">kepuasan</span>
                </div>
              </div>
            </div>

            <div
              className="relative hidden lg:block"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateY(24px) scale(0.97)",
                transition: "opacity 1s cubic-bezier(.16,1,.3,1) .15s, transform 1s cubic-bezier(.16,1,.3,1) .15s",
              }}
            >
              <div className="relative h-[600px]">
                <div
                  className="uc-float-1 uc-hero-frame absolute right-0 top-0 w-[420px] h-[540px] rounded-[32px] overflow-hidden"
                  style={{ boxShadow: "0 40px 80px -20px rgba(37,99,235,.25)" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=90"
                    alt="Fasilitas Medis Umbrella Corp"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent" />
                  {(
                    [
                      "top-5 left-5 border-l-2 border-t-2 rounded-tl-lg",
                      "top-5 right-5 border-r-2 border-t-2 rounded-tr-lg",
                      "bottom-12 left-5 border-l-2 border-b-2 rounded-bl-lg",
                      "bottom-12 right-5 border-r-2 border-b-2 rounded-br-lg",
                    ] as const
                  ).map((cls, i) => (
                    <div key={i} className={`absolute w-7 h-7 border-white/60 pointer-events-none ${cls}`} />
                  ))}
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white/80 text-[10px] font-mono tracking-widest uppercase"
                    style={{ background: "rgba(0,0,0,.3)", backdropFilter: "blur(8px)" }}
                  >
                    UCorp · MedScan v4.2
                  </div>
                </div>

                <div
                  className="uc-float-2 uc-glass-card absolute left-0 top-16 rounded-2xl p-4 w-[220px]"
                  style={{ boxShadow: "0 24px 48px -8px rgba(37,99,235,.18)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&q=80"
                        alt="dr. Albert Wesker"
                        width={44}
                        height={44}
                        className="rounded-xl object-cover"
                        unoptimized
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white block" />
                    </div>
                    <div className="min-w-0">
                      <p className="uc-display text-[13px] text-slate-900 truncate">dr. A. Wesker</p>
                      <p className="text-[11px] text-blue-500 truncate">Virologi & Genetika</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] text-slate-400 ml-1">4.9 (245)</span>
                  </div>
                  <Link
                    href="/doctors/dr-001"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 text-blue-600 text-[12px] font-semibold hover:bg-blue-100 transition-colors"
                  >
                    <Calendar size={11} /> Jadwal Tersedia
                  </Link>
                </div>

                <div
                  className="uc-float-1 uc-glass-card absolute left-2 bottom-14 rounded-2xl p-4"
                  style={{ boxShadow: "0 24px 48px -8px rgba(37,99,235,.18)", animationDelay: "1s" }}
                >
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-2">Aktivitas Hari Ini</p>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="uc-display text-3xl text-slate-900 leading-none">128</span>
                    <span className="text-[12px] text-slate-400">pasien</span>
                  </div>
                  <div className="uc-stat-bar w-28" style={{ animationDelay: "1.5s" }} />
                  <div className="flex items-center gap-1 mt-2 text-[11px] text-emerald-600">
                    <Activity size={11} /> <span>+12% dari kemarin</span>
                  </div>
                </div>

                <div
                  className="absolute right-0 bottom-4 flex items-center gap-3 text-white rounded-2xl px-4 py-3"
                  style={{
                    background: "linear-gradient(135deg,#dc2626,#ef4444)",
                    boxShadow: "0 12px 32px rgba(220,38,38,.4)",
                  }}
                >
                  <span className="uc-pulse w-2.5 h-2.5 rounded-full bg-white shrink-0 inline-block" />
                  <div>
                    <p className="text-[10px] font-semibold opacity-75 uppercase tracking-widest">Darurat 24 Jam</p>
                    <p className="uc-display text-base leading-tight">(021) 555-1234</p>
                  </div>
                </div>

                <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full border border-dashed border-blue-200 opacity-60 pointer-events-none" />
                <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full border border-dashed border-indigo-100 opacity-40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0891b2 0%,#2563eb 50%,#059669 100%)" }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/20"
                  style={{ background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)" }}
                >
                  <Icon size={21} className="text-white" />
                </div>
                <div>
                  <p className="uc-display text-2xl text-white leading-none">
                    <AnimatedCounter value={value} />
                  </p>
                  <p className="text-sm text-blue-100 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(219,234,254,.4),transparent)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-[.2em]">Divisi Layanan</span>
            <h2 className="uc-display text-4xl text-slate-900 mt-3">Akses Cepat Umbrella Corp</h2>
            <p className="text-slate-400 mt-3 max-w-md mx-auto font-light">
              Navigasi seluruh fasilitas dan layanan medis Umbrella Corp dengan efisien
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {QUICK_SERVICES.map(({ icon: Icon, label, desc, href, color }) => (
              <Link
                key={label}
                href={href}
                className="group bg-white rounded-2xl p-5 border border-slate-100 text-center hover:border-blue-100 hover:-translate-y-1.5 transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px -12px rgba(37,99,235,.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="uc-display text-[13px] text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{label}</p>
                <p className="text-[11px] text-slate-400">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 100%,rgba(37,99,235,.15) 0%,transparent 70%)" }}
        />
        <BiometricGrid className="opacity-[0.07]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-[.2em]">Fasilitas & Teknologi</span>
            <h2 className="uc-display text-4xl text-white mt-3">Infrastruktur Medis Terkemuka</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{ border: "1px solid rgba(255,255,255,.05)", background: "rgba(255,255,255,.03)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,.07)";
                  el.style.borderColor = "rgba(59,130,246,.2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,.03)";
                  el.style.borderColor = "rgba(255,255,255,.05)";
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.2)" }}
                >
                  <Icon size={20} className="text-blue-400" />
                </div>
                <p className="uc-display text-base text-white mb-2">{title}</p>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8faff] relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 0% 50%,rgba(219,234,254,.5),transparent)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-[.2em]">Tim Medis Profesional</span>
              <h2 className="uc-display text-4xl text-slate-900 mt-3">Dokter Spesialis Terbaik</h2>
              <p className="text-slate-400 mt-3 max-w-lg font-light">
                Para ahli bersertifikat internasional dengan pengalaman puluhan tahun melayani jutaan pasien
              </p>
            </div>
            <Link
              href="/doctors"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all group"
            >
              Lihat Semua{" "}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.filter((d) => d.isPopular)
              .slice(0, 3)
              .map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-[.2em]">Divisi Spesialisasi</span>
            <h2 className="uc-display text-4xl text-slate-900 mt-3">Bidang Riset & Layanan Medis</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {SPECIALTIES.slice(1).map((specialty) => {
              const Icon = SPECIALTY_ICONS[specialty] ?? Hospital;
              return (
                <Link
                  key={specialty}
                  href={`/doctors?specialty=${encodeURIComponent(specialty)}`}
                  className="uc-specialty flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "linear-gradient(to bottom,#eff6ff,rgba(238,242,255,.5))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "";
                  }}
                >
                  <div
                    className="uc-specialty-icon w-11 h-11 rounded-xl flex items-center justify-center border"
                    style={{ background: "linear-gradient(135deg,#eff6ff,#eef2ff)", borderColor: "rgba(59,130,246,.15)" }}
                  >
                    <Icon size={19} className="text-blue-600" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 text-center leading-tight group-hover:text-blue-700 transition-colors uppercase tracking-wide">
                    {specialty}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-[.2em]">Edukasi & Riset</span>
              <h2 className="uc-display text-4xl text-slate-900 mt-3">Publikasi Ilmiah Umbrella</h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all group"
            >
              Semua Publikasi{" "}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
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
            <span className="text-xs font-bold text-blue-500 uppercase tracking-[.2em]">Testimoni</span>
            <h2 className="uc-display text-4xl text-slate-900 mt-3">Laporan Kepuasan Pasien</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px -12px rgba(37,99,235,.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      className={s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-100"}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1.5">{review.rating}.0</span>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-5 line-clamp-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <Image
                    src={review.patientPhoto}
                    alt={review.patientName}
                    width={38}
                    height={38}
                    className="rounded-xl object-cover shrink-0"
                    unoptimized
                  />
                  <div>
                    <p className="uc-display text-[13px] text-slate-800">{review.patientName}</p>
                    {review.isVerified && (
                      <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                        <Shield size={10} /> Pasien Terverifikasi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 80% at 50% 100%,rgba(37,99,235,.25) 0%,transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%,rgba(139,92,246,.15) 0%,transparent 60%)",
          }}
        />
        <BiometricGrid className="opacity-[0.07]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.2)" }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
            500+ Dokter Spesialis Siap Melayani
          </div>
          <h2 className="uc-display text-4xl md:text-[56px] leading-[0.9] text-white mb-6">
            Percayakan Kesehatan Anda
            <br />
            <span className="uc-gradient-text">kepada Ahlinya</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-light">
            Lebih dari 500 tenaga medis profesional siap memberikan pelayanan kesehatan terbaik dengan teknologi tercanggih
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment/book"
              className="uc-glow-btn px-9 py-4 rounded-xl text-white font-bold hover:-translate-y-0.5 transition-transform uc-display text-[15px]"
              style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)", boxShadow: "0 12px 32px rgba(37,99,235,.4)" }}
            >
              Buat Janji Sekarang
            </Link>
            <Link
              href="/contact"
              className="px-9 py-4 rounded-xl text-white font-bold hover:bg-white/5 transition-colors flex items-center gap-2 justify-center uc-display text-[15px]"
              style={{ border: "1px solid rgba(255,255,255,.1)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)";
              }}
            >
              <Phone size={17} /> Hubungi Umbrella Corp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}