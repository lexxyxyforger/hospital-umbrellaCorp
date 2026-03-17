"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Clock, Stethoscope, FileText, Layers, ArrowRight } from "lucide-react";
import { DOCTORS, ARTICLES, SERVICES } from "@/lib/data";

type ResultType = "doctor" | "article" | "service";

interface Result {
  id: string;
  type: ResultType;
  title: string;
  subtitle: string;
  image?: string;
  href: string;
  badge?: string;
}

const RECENT_SEARCHES_KEY = "rs_sehat_recent_searches";

const POPULAR = [
  "Kardiologi", "Vaksinasi", "Medical Checkup", "Dokter Anak",
  "IGD 24 Jam", "Dermatologi", "Neurologi",
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<Result[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<"all" | ResultType>("all");

  useEffect(() => {
    inputRef.current?.focus();
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }

    const q = query.toLowerCase();

    const doctorResults: Result[] = DOCTORS.filter(
      (d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
    ).map((d) => ({
      id: d.id,
      type: "doctor",
      title: d.name,
      subtitle: `${d.specialty} • ⭐ ${d.rating} • ${d.experience} thn`,
      image: d.photo,
      href: `/doctors/${d.id}`,
      badge: d.isPopular ? "Populer" : undefined,
    }));

    const articleResults: Result[] = ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.tags.some((t) => t.includes(q))
    ).map((a) => ({
      id: a.id,
      type: "article",
      title: a.title,
      subtitle: `${a.category} • ${a.readTime} menit baca`,
      image: a.thumbnail,
      href: `/blog/${a.slug}`,
    }));

    const serviceResults: Result[] = SERVICES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    ).map((s) => ({
      id: s.id,
      type: "service",
      title: s.name,
      subtitle: `${s.category} • ${s.duration}`,
      href: `/services/${s.slug}`,
    }));

    setResults([...doctorResults, ...articleResults, ...serviceResults]);
  }, [query]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.trim()) {
      router.replace(`/search?q=${encodeURIComponent(val)}`, { scroll: false });
    }
  };

  const saveSearch = (q: string) => {
    if (!q.trim()) return;
    const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const filtered = results.filter((r) => activeType === "all" || r.type === activeType);
  const countByType = {
    doctor: results.filter((r) => r.type === "doctor").length,
    article: results.filter((r) => r.type === "article").length,
    service: results.filter((r) => r.type === "service").length,
  };

  const TYPE_ICONS = {
    doctor: { icon: Stethoscope, color: "text-blue-600 bg-blue-50" },
    article: { icon: FileText, color: "text-violet-600 bg-violet-50" },
    service: { icon: Layers, color: "text-emerald-600 bg-emerald-50" },
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search bar */}
        <div className="relative mb-8">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveSearch(query)}
            placeholder="Cari dokter, layanan, artikel..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-base bg-white shadow-lg"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); router.replace("/search"); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* No query: show recent + popular */}
        {!query && (
          <div className="space-y-8">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                    <Clock size={15} className="text-slate-400" /> Pencarian Terakhir
                  </h3>
                  <button onClick={clearRecent} className="text-xs text-slate-400 hover:text-red-500 transition-colors">
                    Hapus
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSearch(s)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all"
                    >
                      <Clock size={12} className="text-slate-400" /> {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-3">🔥 Pencarian Populer</h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSearch(p)}
                    className="px-3 py-1.5 rounded-full gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-semibold text-slate-800 text-sm mb-3">Jelajahi</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Semua Dokter", href: "/doctors", icon: Stethoscope, color: "bg-blue-50 text-blue-600" },
                  { label: "Semua Layanan", href: "/services", icon: Layers, color: "bg-emerald-50 text-emerald-600" },
                  { label: "Artikel Kesehatan", href: "/blog", icon: FileText, color: "bg-violet-50 text-violet-600" },
                ].map(({ label, href, icon: Icon, color }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all text-center"
                  >
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div>
            {/* Filter tabs */}
            {results.length > 0 && (
              <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                {([
                  { key: "all", label: `Semua (${results.length})` },
                  { key: "doctor", label: `Dokter (${countByType.doctor})` },
                  { key: "article", label: `Artikel (${countByType.article})` },
                  { key: "service", label: `Layanan (${countByType.service})` },
                ] as Array<{ key: string; label: string }>).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveType(key as typeof activeType)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeType === key
                        ? "gradient-primary text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 card-shadow">
                <Search size={40} className="text-slate-300 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">Tidak Ada Hasil</h3>
                <p className="text-slate-500 text-sm">
                  Coba kata kunci lain atau ubah filter pencarian
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((result) => {
                  const typeInfo = TYPE_ICONS[result.type];
                  const Icon = typeInfo.icon;
                  return (
                    <Link
                      key={result.id}
                      href={result.href}
                      onClick={() => saveSearch(query)}
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:border-blue-200 transition-all group"
                    >
                      {result.image ? (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                          <Image src={result.image} alt={result.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${typeInfo.color}`}>
                          <Icon size={22} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                            {result.title}
                          </span>
                          {result.badge && (
                            <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold gradient-primary text-white">
                              {result.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">{result.subtitle}</p>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium mt-1.5 px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                          <Icon size={10} />
                          {result.type === "doctor" ? "Dokter" : result.type === "article" ? "Artikel" : "Layanan"}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
