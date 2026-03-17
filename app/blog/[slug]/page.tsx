import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronRight, Calendar, Share2, Bookmark, Tag } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import { ArticleCard } from "@/components/ArticleCard";

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return notFound();

  const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
  const otherRelated = related.length < 3
    ? [...related, ...ARTICLES.filter((a) => a.id !== article.id && !related.find((r) => r.id === a.id)).slice(0, 3 - related.length)]
    : related;

  const fakeContent = `
${article.excerpt}

Kesehatan adalah investasi terbaik yang bisa Anda lakukan untuk diri sendiri dan keluarga. Memahami kondisi kesehatan dan mengambil langkah pencegahan sejak dini sangat penting untuk kualitas hidup yang lebih baik.

## Mengapa Ini Penting?

Banyak kondisi kesehatan yang sebenarnya bisa dicegah atau dikelola dengan baik jika kita memiliki pengetahuan yang tepat. Penelitian menunjukkan bahwa edukasi kesehatan yang baik dapat mengurangi risiko penyakit kronis hingga 40%.

## Langkah-Langkah Praktis

1. **Pemeriksaan rutin** - Jangan tunggu sakit untuk ke dokter. Pemeriksaan kesehatan rutin membantu mendeteksi masalah sejak dini.

2. **Pola hidup sehat** - Olahraga teratur, makan bergizi, tidur cukup, dan manajemen stres adalah fondasi kesehatan yang baik.

3. **Konsultasi dokter** - Jika ada gejala yang mengkhawatirkan, segera konsultasikan dengan dokter spesialis.

4. **Edukasi berkelanjutan** - Terus update pengetahuan kesehatan Anda dari sumber-sumber terpercaya.

## Kapan Harus ke Dokter?

Jangan ragu untuk segera ke dokter jika Anda mengalami gejala yang tidak biasa atau kondisi yang memburuk. Penanganan dini selalu lebih efektif dan efisien dibandingkan menunggu kondisi memburuk.

---

*Artikel ini ditulis oleh tenaga medis profesional RS Sehat Prima. Untuk konsultasi lebih lanjut, silakan buat janji dengan dokter kami.*
  `;

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Beranda</Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-blue-600">Artikel</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 truncate max-w-xs">{article.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Image src={article.thumbnail} alt={article.title} fill className="object-cover" priority />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold gradient-primary text-white">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Image src={article.authorPhoto} alt={article.author} width={36} height={36} className="rounded-full" />
                    <div>
                      <div className="text-sm font-medium text-slate-800">{article.author}</div>
                      <div className="text-xs text-slate-400">Penulis Medis</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Calendar size={14} />
                    {new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Clock size={14} />
                    {article.readTime} menit baca
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <Share2 size={16} />
                    </button>
                    <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                  {fakeContent.split("\n\n").map((para, i) => {
                    if (para.startsWith("## ")) {
                      return <h2 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-3">{para.replace("## ", "")}</h2>;
                    }
                    if (para.startsWith("---")) {
                      return <hr key={i} className="border-slate-200 my-6" />;
                    }
                    if (para.startsWith("1.") || para.startsWith("2.")) {
                      return (
                        <div key={i} className="space-y-2 my-4">
                          {para.split("\n").map((line, j) => (
                            <p key={j} className="text-sm text-slate-700 pl-2">{line}</p>
                          ))}
                        </div>
                      );
                    }
                    if (para.startsWith("*")) {
                      return <p key={i} className="text-xs text-slate-400 italic">{para.replace(/\*/g, "")}</p>;
                    }
                    return <p key={i} className="text-sm text-slate-700 mb-3">{para}</p>;
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
                  {article.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                      <Tag size={11} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Ada pertanyaan tentang kondisi kesehatan Anda?</h3>
              <p className="text-blue-100 text-sm mb-4">Konsultasikan dengan dokter spesialis kami</p>
              <Link href="/appointment/book" className="inline-block px-5 py-2.5 bg-white text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors">
                Buat Janji Sekarang
              </Link>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5 sticky top-28">
              <h3 className="font-semibold text-slate-900 mb-4">Artikel Terkait</h3>
              <div className="space-y-1">
                {otherRelated.map((a) => (
                  <ArticleCard key={a.id} article={a} variant="horizontal" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Dokter Terkait</h3>
              <p className="text-sm text-slate-500 mb-4">
                Konsultasikan masalah {article.category} Anda
              </p>
              <Link
                href={`/doctors?specialty=${encodeURIComponent(article.category)}`}
                className="w-full block text-center py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Lihat Dokter {article.category}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}