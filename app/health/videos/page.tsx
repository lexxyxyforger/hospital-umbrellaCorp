import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Eye, Tag, ArrowRight } from "lucide-react";

const VIDEOS = [
  {
    id: "v1",
    title: "Mengenal Tanda-Tanda Serangan Jantung",
    thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80",
    duration: "8:45",
    views: "124K",
    category: "Kardiologi",
    doctor: "dr. Aditya Pratama, Sp.JP",
    featured: true,
  },
  {
    id: "v2",
    title: "Cara Tepat Merawat Luka di Rumah",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    duration: "6:20",
    views: "89K",
    category: "Umum",
    doctor: "dr. Siti Rahma",
    featured: false,
  },
  {
    id: "v3",
    title: "Panduan Lengkap MPASI 6 Bulan",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    duration: "12:15",
    views: "201K",
    category: "Pediatri",
    doctor: "dr. Sarah Wijaya, Sp.A",
    featured: false,
  },
  {
    id: "v4",
    title: "Senam Otak untuk Mencegah Demensia",
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    duration: "15:30",
    views: "67K",
    category: "Neurologi",
    doctor: "dr. Budi Santoso, Sp.N",
    featured: false,
  },
  {
    id: "v5",
    title: "Skincare Routine yang Benar Menurut Dokter",
    thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
    duration: "10:05",
    views: "312K",
    category: "Dermatologi",
    doctor: "dr. Ratna Dewi, Sp.KK",
    featured: false,
  },
  {
    id: "v6",
    title: "Olahraga Aman untuk Ibu Hamil",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    duration: "9:50",
    views: "145K",
    category: "Ginekologi",
    doctor: "dr. Hendra Kusuma, Sp.OG",
    featured: false,
  },
];

const CATEGORIES = ["Semua", "Kardiologi", "Pediatri", "Neurologi", "Dermatologi", "Ginekologi", "Umum"];

export default function VideosPage() {
  const featured = VIDEOS.find((v) => v.featured)!;
  const rest = VIDEOS.filter((v) => !v.featured);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Edukasi Kesehatan</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Video Edukasi Kesehatan
          </h1>
          <p className="text-slate-500 max-w-xl">
            Tonton video edukasi kesehatan dari dokter-dokter spesialis kami untuk pengetahuan kesehatan yang lebih baik
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured video */}
        <div className="mb-10">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 group cursor-pointer">
            <div className="relative h-72 md:h-96">
              <Image src={featured.thumbnail} alt={featured.title} fill className="object-cover opacity-70 group-hover:opacity-60 transition-opacity" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={30} className="text-blue-600 ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white mb-2">
                {featured.category}
              </span>
              <h2 className="text-xl font-bold text-white mb-1">{featured.title}</h2>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <span>{featured.doctor}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {featured.duration}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Eye size={13} /> {featured.views} ditonton</span>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">▶ FEATURED</span>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              cat === "Semua" ? "gradient-primary text-white" : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <Image src={video.thumbnail} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play size={18} className="text-blue-600 ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-medium">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500 text-white">{video.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-500 mb-2">{video.doctor}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Eye size={12} /> {video.views} ditonton
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center py-10 bg-white rounded-3xl border border-slate-100 card-shadow">
          <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Ingin Konsultasi Langsung?
          </h3>
          <p className="text-slate-500 text-sm mb-4">Video hanya sebagai edukasi. Untuk kondisi kesehatan Anda, konsultasikan dengan dokter.</p>
          <Link href="/appointment/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity">
            Buat Janji Dokter <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
