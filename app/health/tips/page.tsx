import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, Lightbulb, Star } from "lucide-react";

const TIPS = [
  {
    week: "Minggu Ini",
    theme: "Kesehatan Jantung",
    color: "from-red-500 to-pink-500",
    icon: "❤️",
    tips: [
      { title: "Jalan Kaki 30 Menit", desc: "Berjalan kaki selama 30 menit setiap hari dapat menurunkan risiko penyakit jantung hingga 35%.", icon: "🚶" },
      { title: "Kurangi Garam", desc: "Batasi konsumsi garam di bawah 5 gram per hari untuk menjaga tekanan darah normal.", icon: "🧂" },
      { title: "Konsumsi Ikan Berlemak", desc: "Salmon, tuna, dan sarden kaya omega-3 yang baik untuk kesehatan jantung.", icon: "🐟" },
      { title: "Tidur 7-8 Jam", desc: "Kurang tidur meningkatkan risiko hipertensi dan penyakit kardiovaskular.", icon: "😴" },
    ],
    author: "dr. Aditya Pratama, Sp.JP",
    date: "16 Desember 2024",
  },
  {
    week: "Minggu Lalu",
    theme: "Kesehatan Mental",
    color: "from-violet-500 to-purple-500",
    icon: "🧘",
    tips: [
      { title: "Meditasi 10 Menit", desc: "Meditasi singkat setiap pagi terbukti mengurangi stres dan meningkatkan fokus.", icon: "🧘" },
      { title: "Batasi Media Sosial", desc: "Kurangi scrolling media sosial di malam hari untuk kualitas tidur lebih baik.", icon: "📱" },
      { title: "Journaling", desc: "Menulis jurnal harian membantu memproses emosi dan meningkatkan kesejahteraan mental.", icon: "📝" },
      { title: "Koneksi Sosial", desc: "Luangkan waktu berkualitas bersama keluarga dan sahabat secara offline.", icon: "👥" },
    ],
    author: "dr. Ahmad Faris, Sp.KJ",
    date: "9 Desember 2024",
  },
  {
    week: "2 Minggu Lalu",
    theme: "Nutrisi & Diet",
    color: "from-emerald-500 to-teal-500",
    icon: "🥗",
    tips: [
      { title: "Piring Isi T", desc: "Isi ½ piring dengan sayuran, ¼ protein, ¼ karbohidrat kompleks setiap makan.", icon: "🍽️" },
      { title: "Minum Air Putih", desc: "Minum 8 gelas air per hari untuk metabolisme optimal dan kesehatan kulit.", icon: "💧" },
      { title: "Sarapan Setiap Hari", desc: "Sarapan bergizi meningkatkan konsentrasi dan mencegah makan berlebihan di siang hari.", icon: "🌅" },
      { title: "Snack Sehat", desc: "Ganti camilan manis dengan buah-buahan, kacang-kacangan, atau yogurt.", icon: "🍎" },
    ],
    author: "dr. Sari Nutrisi, M.Gizi",
    date: "2 Desember 2024",
  },
];

const QUICK_TIPS = [
  { icon: "💧", tip: "Minum segelas air putih setelah bangun tidur untuk menghidrasi tubuh" },
  { icon: "🧴", tip: "Gunakan sunscreen SPF 30+ setiap hari, bahkan saat berawan" },
  { icon: "🦷", tip: "Sikat gigi 2 kali sehari dan gunakan floss untuk kesehatan gigi optimal" },
  { icon: "🚶", tip: "Berdiri dan lakukan stretching setiap 1 jam saat bekerja di meja" },
  { icon: "😴", tip: "Matikan layar 1 jam sebelum tidur untuk kualitas tidur lebih baik" },
  { icon: "🧘", tip: "Tarik napas dalam 4 hitungan, tahan 4, lepas 6 saat merasa stres" },
];

export default function HealthTipsPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Edukasi Kesehatan</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Tips Kesehatan Mingguan
          </h1>
          <p className="text-slate-500 max-w-xl">
            Tips kesehatan praktis setiap minggu dari dokter spesialis kami untuk membantu Anda hidup lebih sehat
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick tips */}
        <div className="mb-10">
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-500" />
            Tips Cepat Hari Ini
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_TIPS.map((qt) => (
              <div key={qt.tip} className="flex items-start gap-3 bg-white rounded-2xl border border-slate-100 card-shadow p-4 hover:card-shadow-hover transition-all">
                <span className="text-2xl shrink-0">{qt.icon}</span>
                <p className="text-sm text-slate-700 leading-relaxed">{qt.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly tips */}
        <div className="space-y-8">
          {TIPS.map((week) => (
            <div key={week.week} className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
              {/* Header */}
              <div className={`bg-gradient-to-r ${week.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white/80 mb-1">{week.week}</div>
                    <h2 className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                      <span className="text-2xl">{week.icon}</span>
                      Tips {week.theme}
                    </h2>
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="text-sm text-white/80">Oleh</div>
                    <div className="text-sm font-medium">{week.author}</div>
                    <div className="text-xs text-white/70">{week.date}</div>
                  </div>
                </div>
              </div>

              {/* Tips grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {week.tips.map((tip, i) => (
                  <div key={tip.title} className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg group-hover:bg-blue-50 transition-colors">
                        {tip.icon}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">Tips #{i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{tip.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 pb-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={13} />
                  {week.date}
                  <span>•</span>
                  <span>{week.author}</span>
                </div>
                <Link href="/blog" className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:gap-2 transition-all">
                  Baca Artikel Terkait <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Subscribe */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white text-center">
          <Star size={24} className="mx-auto mb-3 text-yellow-300" />
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Jangan Lewatkan Tips Mingguan
          </h2>
          <p className="text-blue-100 text-sm mb-5 max-w-md mx-auto">
            Daftar newsletter kami dan dapatkan tips kesehatan dari dokter spesialis langsung di inbox Anda
          </p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input
              type="email"
              placeholder="email@example.com"
              className="flex-1 px-4 py-2.5 rounded-xl text-slate-800 text-sm outline-none"
            />
            <button className="px-5 py-2.5 bg-white text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
