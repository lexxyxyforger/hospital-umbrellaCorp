import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { CheckCircle, Clock, AlertCircle, ArrowRight, ChevronRight } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  stethoscope: "🩺", syringe: "💉", ambulance: "🚑",
  heart: "❤️", flask: "🧪", scan: "🔬",
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return notFound();

  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Beranda</Link>
          <ChevronRight size={14} />
          <Link href="/services" className="hover:text-blue-600">Layanan</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800">{service.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-4">
                {CATEGORY_ICONS[service.icon] || "🏥"}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">{service.category}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                {service.name}
              </h1>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
              <div className="flex items-center gap-1.5 mt-3 text-sm text-slate-500">
                <Clock size={15} /> Estimasi durasi: {service.duration}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Yang Termasuk</h2>
              <ul className="space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-emerald-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {service.preparation.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
                <h2 className="font-semibold text-slate-900 mb-4">Persiapan Sebelum Tindakan</h2>
                <div className="space-y-3">
                  {service.preparation.map((prep, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-sm text-slate-700">{prep}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
              <h2 className="font-semibold text-slate-900 mb-4">FAQ Layanan Ini</h2>
              <div className="space-y-4">
                {[
                  { q: "Apakah perlu membuat janji terlebih dahulu?", a: "Ya, disarankan membuat janji terlebih dahulu untuk menghindari waktu tunggu yang lama." },
                  { q: "Apakah hasil pemeriksaan bisa diakses secara digital?", a: "Ya, hasil pemeriksaan dapat diakses melalui aplikasi atau website kami dalam 1-2 jam setelah pemeriksaan selesai." },
                  { q: "Apakah layanan ini ditanggung BPJS?", a: "Beberapa layanan ditanggung BPJS dengan syarat dan ketentuan tertentu. Hubungi kami untuk informasi lebih lanjut." },
                ].map(({ q, a }) => (
                  <div key={q} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 mb-2">❓ {q}</p>
                    <p className="text-sm text-slate-600">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 sticky top-28">
              <div className="text-center mb-6">
                {service.price > 0 ? (
                  <>
                    <div className="text-xs text-slate-500 mb-1">Mulai dari</div>
                    <div className="text-3xl font-bold text-blue-600">
                      Rp {service.price.toLocaleString("id-ID")}
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-bold text-emerald-600">Layanan Darurat 24 Jam</div>
                )}
                <div className="flex items-center justify-center gap-1 mt-2 text-sm text-slate-500">
                  <Clock size={14} /> {service.duration}
                </div>
              </div>
              <Link href="/appointment/book" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity mb-3">
                Buat Janji Sekarang
              </Link>
              <Link href="/contact" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-all">
                Tanya Info Lebih Lanjut
              </Link>
              <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start gap-2 text-sm text-amber-800">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>Untuk kondisi darurat, segera hubungi IGD di (021) 555-1234</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Layanan Lainnya</h3>
              <div className="space-y-2">
                {related.map((s) => (
                  <Link key={s.id} href={`/services/${s.slug}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                    <span className="text-xl">{CATEGORY_ICONS[s.icon] || "🏥"}</span>
                    <span className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{s.name}</span>
                    <ArrowRight size={13} className="ml-auto text-slate-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}