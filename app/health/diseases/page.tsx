"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, AlertTriangle, Shield, Stethoscope, X } from "lucide-react";

type Disease = {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: string;
  urgency: "low" | "medium" | "high";
  specialist: string;
};

const DISEASES: Disease[] = [
  {
    id: "hipertensi",
    name: "Hipertensi (Darah Tinggi)",
    category: "Kardiovaskular",
    icon: "🫀",
    description: "Kondisi ketika tekanan darah di arteri terus-menerus meningkat di atas batas normal (≥ 140/90 mmHg).",
    symptoms: ["Sakit kepala terutama di belakang kepala", "Pusing dan vertigo", "Pandangan kabur", "Mudah lelah", "Jantung berdebar", "Mimisan"],
    causes: ["Pola makan tinggi garam", "Obesitas", "Kurang olahraga", "Stres berlebihan", "Merokok", "Konsumsi alkohol", "Faktor genetik"],
    prevention: ["Kurangi konsumsi garam", "Olahraga teratur 30 menit/hari", "Jaga berat badan ideal", "Kelola stres", "Berhenti merokok", "Periksa tekanan darah rutin"],
    treatment: "Perubahan gaya hidup dan obat antihipertensi sesuai resep dokter. Pengobatan bersifat jangka panjang.",
    urgency: "high",
    specialist: "Kardiologi",
  },
  {
    id: "diabetes",
    name: "Diabetes Mellitus",
    category: "Metabolik",
    icon: "🩸",
    description: "Penyakit metabolik kronis ditandai dengan kadar gula darah yang tinggi (hiperglikemia) akibat gangguan insulin.",
    symptoms: ["Sering buang air kecil", "Mudah haus dan lapar", "Penurunan berat badan drastis", "Luka lambat sembuh", "Pandangan kabur", "Kesemutan di tangan/kaki"],
    causes: ["Resistensi insulin (Tipe 2)", "Kekurangan produksi insulin (Tipe 1)", "Obesitas", "Gaya hidup tidak aktif", "Faktor genetik", "Usia > 45 tahun"],
    prevention: ["Jaga berat badan ideal", "Pola makan sehat rendah gula", "Olahraga teratur", "Cek gula darah rutin", "Hindari minuman manis berlebih"],
    treatment: "Modifikasi gaya hidup, monitoring gula darah, obat oral (Metformin), atau terapi insulin.",
    urgency: "high",
    specialist: "Penyakit Dalam",
  },
  {
    id: "maag",
    name: "Gastritis (Maag)",
    category: "Pencernaan",
    icon: "🫁",
    description: "Peradangan pada lapisan lambung yang dapat bersifat akut atau kronis.",
    symptoms: ["Nyeri atau rasa terbakar di perut", "Mual dan muntah", "Perut kembung", "Hilang nafsu makan", "Sendawa berlebihan", "Cegukan"],
    causes: ["Infeksi bakteri H. pylori", "Penggunaan NSAID/aspirin berlebihan", "Alkohol", "Stres", "Pola makan tidak teratur", "Makanan pedas/asam"],
    prevention: ["Makan teratur dan tidak terlambat", "Hindari makanan pemicu", "Kelola stres", "Hindari NSAID tanpa resep dokter", "Berhenti merokok"],
    treatment: "Antasida, PPI (Omeprazole), antibiotik jika ada H. pylori, dan perubahan pola makan.",
    urgency: "medium",
    specialist: "Penyakit Dalam",
  },
  {
    id: "asma",
    name: "Asma Bronkial",
    category: "Pernapasan",
    icon: "🫁",
    description: "Penyakit inflamasi kronis saluran napas yang menyebabkan serangan sesak napas berulang.",
    symptoms: ["Sesak napas", "Mengi (bunyi ngik-ngik)", "Batuk terutama malam hari", "Dada terasa berat", "Mudah lelah saat aktivitas"],
    causes: ["Alergen (debu, bulu hewan)", "Infeksi saluran napas", "Olahraga berlebihan", "Polusi udara", "Asap rokok", "Perubahan cuaca ekstrem"],
    prevention: ["Hindari pemicu alergi", "Gunakan masker di tempat berdebu", "Jaga kebersihan rumah", "Hindari asap rokok", "Vaksinasi flu tahunan"],
    treatment: "Bronkodilator (inhaler), kortikosteroid inhalasi, menghindari pemicu, rencana aksi asma.",
    urgency: "medium",
    specialist: "Penyakit Dalam",
  },
  {
    id: "anemia",
    name: "Anemia",
    category: "Darah",
    icon: "💉",
    description: "Kondisi kekurangan sel darah merah atau hemoglobin yang menyebabkan tubuh kekurangan oksigen.",
    symptoms: ["Mudah lelah dan lemas", "Pucat pada wajah dan kuku", "Sesak napas saat aktivitas", "Pusing", "Jantung berdebar", "Tangan dan kaki dingin"],
    causes: ["Kekurangan zat besi", "Kekurangan vitamin B12 dan asam folat", "Penyakit kronis", "Perdarahan", "Gangguan sumsum tulang"],
    prevention: ["Konsumsi makanan kaya zat besi", "Asupan vitamin C untuk penyerapan besi", "Suplemen asam folat (ibu hamil)", "Cek darah rutin"],
    treatment: "Suplemen zat besi, vitamin B12/asam folat, transfusi darah (anemia berat), terapi penyakit dasar.",
    urgency: "medium",
    specialist: "Penyakit Dalam",
  },
  {
    id: "migrain",
    name: "Migrain",
    category: "Neurologi",
    icon: "🧠",
    description: "Sakit kepala intens yang biasanya menyerang satu sisi kepala, dapat disertai mual dan kepekaan terhadap cahaya.",
    symptoms: ["Sakit kepala berdenyut satu sisi", "Mual dan muntah", "Sensitif terhadap cahaya dan suara", "Aura visual (kilatan cahaya)", "Nyeri memburuk saat aktivitas"],
    causes: ["Perubahan hormonal", "Kurang tidur", "Stres", "Makanan tertentu (coklat, keju, kafein)", "Perubahan cuaca", "Cahaya terang atau suara keras"],
    prevention: ["Tidur cukup dan teratur", "Kelola stres", "Identifikasi dan hindari pemicu", "Hindari melewatkan makan", "Olahraga ringan teratur"],
    treatment: "Analgetik, triptans untuk serangan akut, obat profilaksis untuk migrain kronis.",
    urgency: "low",
    specialist: "Neurologi",
  },
];

const CATEGORIES = ["Semua", "Kardiovaskular", "Metabolik", "Pencernaan", "Pernapasan", "Darah", "Neurologi"];

const URGENCY_CONFIG = {
  high: { label: "Perlu Perhatian Segera", class: "bg-red-50 text-red-700 border-red-200" },
  medium: { label: "Perlu Konsultasi Dokter", class: "bg-amber-50 text-amber-700 border-amber-200" },
  low: { label: "Dapat Ditangani Mandiri", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export default function DiseasesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [selected, setSelected] = useState<Disease | null>(null);

  const filtered = DISEASES.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Semua" || d.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Edukasi Kesehatan</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Informasi Penyakit
          </h1>
          <p className="text-slate-500 mb-6 max-w-xl">
            Pelajari gejala, penyebab, dan cara pencegahan berbagai penyakit umum dari dokter-dokter kami
          </p>
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari penyakit..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((disease) => (
            <button
              key={disease.id}
              onClick={() => setSelected(disease)}
              className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all text-left p-5 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{disease.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{disease.name}</h3>
                    <span className="text-xs text-slate-500">{disease.category}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0 mt-1 transition-colors" />
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">{disease.description}</p>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${URGENCY_CONFIG[disease.urgency].class}`}>
                <AlertTriangle size={11} />
                {URGENCY_CONFIG[disease.urgency].label}
              </div>
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Perhatian Penting</p>
            <p className="text-sm text-amber-700">
              Informasi di halaman ini bersifat edukatif dan bukan pengganti konsultasi medis profesional. Jika Anda mengalami gejala-gejala tersebut, segera konsultasikan dengan dokter.
            </p>
            <Link href="/appointment/book" className="inline-flex items-center gap-1 mt-2 text-sm text-amber-800 font-medium hover:underline">
              Konsultasi dengan Dokter <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Disease detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-4 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="gradient-primary p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selected.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{selected.name}</h2>
                    <span className="text-blue-200 text-sm">{selected.category}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* Urgency */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${URGENCY_CONFIG[selected.urgency].class}`}>
                <AlertTriangle size={14} />
                {URGENCY_CONFIG[selected.urgency].label}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">{selected.description}</p>

              {/* Gejala */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                  <AlertTriangle size={15} className="text-amber-500" /> Gejala Umum
                </h3>
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {selected.symptoms.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-xs text-slate-700 bg-amber-50 px-3 py-1.5 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pencegahan */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                  <Shield size={15} className="text-emerald-500" /> Cara Pencegahan
                </h3>
                <div className="space-y-1.5">
                  {selected.prevention.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 text-xs">✓</span>
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Penanganan */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">Penanganan Medis</h3>
                <p className="text-sm text-slate-700">{selected.treatment}</p>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-slate-300">
                Tutup
              </button>
              <Link
                href={`/doctors?specialty=${encodeURIComponent(selected.specialist)}`}
                onClick={() => setSelected(null)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90"
              >
                <Stethoscope size={15} /> Konsultasi Dokter
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
