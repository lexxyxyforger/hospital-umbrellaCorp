"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Play, Maximize2, X, ZoomIn } from "lucide-react";

type Area = {
  id: string;
  name: string;
  description: string;
  images: string[];
  features: string[];
  floor: string;
  icon: string;
};

const AREAS: Area[] = [
  {
    id: "lobby",
    name: "Lobi Utama",
    description: "Lobi modern dengan desain yang hangat dan nyaman. Dilengkapi meja informasi, area tunggu yang luas, dan kafetaria.",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80",
    ],
    features: ["Meja Informasi", "Kursi Roda Tersedia", "Musholla", "ATM Center", "Mini Cafe"],
    floor: "Lantai 1",
    icon: "🏛️",
  },
  {
    id: "poli",
    name: "Poliklinik Spesialis",
    description: "Ruang konsultasi modern dengan perlengkapan medis terkini untuk 14 spesialis.",
    images: [
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    ],
    features: ["14 Ruang Spesialis", "Sistem Antrian Digital", "Rekam Medis Elektronik", "CCTV"],
    floor: "Lantai 2",
    icon: "🩺",
  },
  {
    id: "igd",
    name: "IGD (Gawat Darurat)",
    description: "Unit darurat 24 jam dengan resuscitation room, trauma bay, dan monitoring canggih.",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80",
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80",
    ],
    features: ["Triage System", "Resuscitation Room", "Trauma Bay", "Ventilator Canggih", "On-Call Spesialis"],
    floor: "Lantai 1",
    icon: "🚨",
  },
  {
    id: "icu",
    name: "ICU & ICCU",
    description: "Unit perawatan intensif dengan 20 tempat tidur, teknologi monitoring terkini, dan tenaga khusus.",
    images: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900&q=80",
    ],
    features: ["20 Tempat Tidur", "Monitoring 24 Jam", "Perawat Khusus ICU", "Ventilator Modern", "Defibrillator"],
    floor: "Lantai 3",
    icon: "💊",
  },
  {
    id: "kamar",
    name: "Kamar Rawat Inap",
    description: "Kamar perawatan dari Kelas III hingga VVIP dengan fasilitas lengkap dan nyaman.",
    images: [
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80",
    ],
    features: ["Kelas III - VVIP", "Smart TV", "WiFi Gratis", "Sofa Tamu", "Room Service"],
    floor: "Lantai 4-8",
    icon: "🛏️",
  },
  {
    id: "lab",
    name: "Laboratorium",
    description: "Laboratorium klinik modern dengan teknologi analyzer terkini, operasional 24 jam.",
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=900&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80",
    ],
    features: ["Operasional 24/7", "Hasil Digital", "Hematologi Analyzer", "Kimia Klinik", "Mikrobiologi"],
    floor: "Lantai 1",
    icon: "🔬",
  },
  {
    id: "radiologi",
    name: "Radiologi & Imaging",
    description: "Pusat pencitraan diagnostik dengan MRI 3 Tesla, CT Scan 128 slice, dan USG 4D.",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80",
    ],
    features: ["MRI 3 Tesla", "CT Scan 128 Slice", "USG 4D", "Mammografi", "Bone Densitometry"],
    floor: "Lantai 2",
    icon: "📡",
  },
  {
    id: "OK",
    name: "Kamar Operasi",
    description: "8 kamar operasi steril dengan sistem laminar air flow, peralatan laparoskopi, dan tim bedah terlatih.",
    images: [
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=80",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80",
    ],
    features: ["8 Ruang OK", "Laminar Air Flow", "Laparoskopi", "Robotik Bedah", "Sterilisasi Modern"],
    floor: "Lantai 3",
    icon: "⚕️",
  },
];

export default function VirtualTourPage() {
  const [activeArea, setActiveArea] = useState(AREAS[0]);
  const [imageIdx, setImageIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => setImageIdx((prev) => (prev + 1) % activeArea.images.length);
  const prevImage = () => setImageIdx((prev) => (prev - 1 + activeArea.images.length) % activeArea.images.length);

  const handleAreaChange = (area: Area) => {
    setActiveArea(area);
    setImageIdx(0);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                🏥 Virtual Tour RS Sehat Prima
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Jelajahi fasilitas rumah sakit kami secara virtual
              </p>
            </div>
            <Link
              href="/about"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 transition-colors"
            >
              Info RS
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Area selector */}
          <aside className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-sm font-semibold text-slate-300">Pilih Area</h3>
              </div>
              <div className="p-2 space-y-1 max-h-[500px] overflow-y-auto">
                {AREAS.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => handleAreaChange(area)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      activeArea.id === area.id
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <span className="text-xl">{area.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{area.name}</div>
                      <div className={`text-xs ${activeArea.id === area.id ? "text-blue-200" : "text-slate-500"}`}>
                        {area.floor}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main viewer */}
          <div className="lg:col-span-3 space-y-4">
            {/* Image viewer */}
            <div className="relative bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="relative h-72 sm:h-96 lg:h-[480px]">
                <Image
                  src={activeArea.images[imageIdx]}
                  alt={activeArea.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Controls */}
                {activeArea.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Fullscreen button */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  <Maximize2 size={16} />
                </button>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{activeArea.icon}</span>
                        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                          {activeArea.name}
                        </h2>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                        <MapPin size={13} />
                        {activeArea.floor}
                      </div>
                    </div>
                    {/* Image counter */}
                    <div className="flex items-center gap-1.5">
                      {activeArea.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImageIdx(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === imageIdx ? "w-6 bg-white" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{activeArea.description}</p>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Fasilitas di Area Ini</h3>
                <div className="flex flex-wrap gap-2">
                  {activeArea.features.map((f) => (
                    <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-700 text-slate-300 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-8 gap-2">
              {AREAS.map((area) => (
                <button
                  key={area.id}
                  onClick={() => handleAreaChange(area)}
                  className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeArea.id === area.id ? "border-blue-500 scale-105" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={area.images[0]}
                    alt={area.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute inset-0 flex items-center justify-center text-lg">
                    {area.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          >
            <X size={20} />
          </button>
          <div className="relative w-full h-full">
            <Image
              src={activeArea.images[imageIdx]}
              alt={activeArea.name}
              fill
              className="object-contain"
            />
          </div>
          {activeArea.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
