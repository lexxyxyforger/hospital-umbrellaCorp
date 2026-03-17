"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import { ArticleCard } from "@/components/ArticleCard";

const CATEGORIES = ["Semua", "Kardiologi", "Pediatri", "Neurologi", "Dermatologi", "Ginekologi", "Nutrisi", "Tips Kesehatan"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const filtered = ARTICLES.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Semua" || a.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Edukasi Kesehatan</span>
            <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Artikel Kesehatan
            </h1>
            <p className="text-slate-500 mb-6">
              Informasi kesehatan terpercaya dari dokter dan tenaga medis profesional kami
            </p>

            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari artikel kesehatan..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white shadow-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? "gradient-primary text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-slate-500">
          {filtered.length} artikel ditemukan
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Artikel Tidak Ditemukan</h3>
            <p className="text-slate-500 mb-4">Coba kata kunci lain atau hapus filter</p>
            <button
              onClick={() => { setSearch(""); setCategory("Semua"); }}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 text-sm"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-100 card-shadow p-10 text-center">
          <div className="text-3xl mb-3">📬</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Newsletter Kesehatan Mingguan
          </h2>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Dapatkan tips kesehatan, artikel terbaru, dan informasi promo langsung di inbox Anda
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Masukkan email Anda..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm"
            />
            <button className="px-5 py-3 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
