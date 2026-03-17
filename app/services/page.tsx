import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Tag } from "lucide-react";
import { SERVICES } from "@/lib/data";

const CATEGORIES = ["Semua", "Checkup", "Vaksin", "Darurat", "Spesialis", "Lab", "Diagnostik"];

const CATEGORY_ICONS: Record<string, string> = {
  stethoscope: "🩺", syringe: "💉", ambulance: "🚑",
  heart: "❤️", flask: "🧪", scan: "🔬",
};

export default function ServicesPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Layanan Kami</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Layanan Medis Terpadu
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Kami menyediakan layanan kesehatan komprehensif dengan fasilitas modern dan tenaga medis profesional
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl group-hover:bg-blue-100 transition-colors">
                  {CATEGORY_ICONS[service.icon] || "🏥"}
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {service.category}
                </span>
              </div>

              <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors text-lg">
                {service.name}
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{service.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  {service.price > 0 ? (
                    <div className="font-bold text-blue-600">
                      Mulai Rp {service.price.toLocaleString("id-ID")}
                    </div>
                  ) : (
                    <div className="font-bold text-emerald-600">Siap 24 Jam</div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <Clock size={11} /> {service.duration}
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
                  Detail <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Medical checkup packages highlight */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Paket Medical Checkup
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Paket Basic",
                price: "350.000",
                items: ["Pemeriksaan fisik", "Lab darah rutin", "EKG", "Konsultasi dokter"],
                badge: null,
              },
              {
                name: "Paket Standar",
                price: "650.000",
                items: ["Semua paket basic", "Rontgen dada", "USG abdomen", "Profil lipid", "Gula darah HbA1c"],
                badge: "Populer",
              },
              {
                name: "Paket Komprehensif",
                price: "1.200.000",
                items: ["Semua paket standar", "CT Scan", "Endoskopi", "Tumor marker", "Konsultasi spesialis"],
                badge: null,
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl border card-shadow p-6 ${pkg.badge ? "border-blue-200 ring-2 ring-blue-100" : "border-slate-100"}`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold gradient-primary text-white">
                    {pkg.badge}
                  </span>
                )}
                <h3 className="font-semibold text-slate-900 mb-1">{pkg.name}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  Rp {pkg.price}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/appointment/book"
                  className={`w-full block text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pkg.badge
                      ? "gradient-primary text-white hover:opacity-90"
                      : "border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  Pilih Paket
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Butuh Informasi Lebih Lanjut?
          </h2>
          <p className="text-blue-100 mb-6">Tim kami siap membantu Anda 24/7</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50">
              Hubungi Kami
            </Link>
            <Link href="/appointment/book" className="px-6 py-3 rounded-xl border-2 border-white/50 text-white font-semibold hover:bg-white/10">
              Buat Janji
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
