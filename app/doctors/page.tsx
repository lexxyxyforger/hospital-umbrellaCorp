"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid, List, X, ChevronDown, ChevronUp } from "lucide-react";
import { DOCTORS, SPECIALTIES } from "@/lib/data";
import { DoctorCard } from "@/components/DoctorCard";

type SortOption = "rating" | "experience" | "price_asc" | "price_desc" | "popular";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("Semua Spesialis");
  const [sort, setSort] = useState<SortOption>("rating");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);

  const filtered = useMemo(() => {
    let docs = [...DOCTORS];

    if (search) {
      docs = docs.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (specialty !== "Semua Spesialis") {
      docs = docs.filter((d) => d.specialty === specialty);
    }

    switch (sort) {
      case "rating": docs.sort((a, b) => b.rating - a.rating); break;
      case "experience": docs.sort((a, b) => b.experience - a.experience); break;
      case "price_asc": docs.sort((a, b) => a.price - b.price); break;
      case "price_desc": docs.sort((a, b) => b.price - a.price); break;
      case "popular": docs = docs.filter((d) => d.isPopular).concat(docs.filter((d) => !d.isPopular)); break;
    }

    return docs;
  }, [search, specialty, sort]);

  const sortLabels: Record<SortOption, string> = {
    rating: "Rating Tertinggi",
    experience: "Paling Berpengalaman",
    price_asc: "Harga Terendah",
    price_desc: "Harga Tertinggi",
    popular: "Terpopuler",
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 sm:mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Daftar Dokter
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            Temukan dokter spesialis terbaik untuk kebutuhan kesehatan Anda
          </p>

          <div className="flex gap-2 mt-4 sm:mt-6">
            <div className="flex-1 relative">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari dokter atau spesialis..."
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="hidden sm:flex gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="px-3 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm bg-white text-slate-700 min-w-[160px]"
              >
                <option value="rating">Rating Tertinggi</option>
                <option value="experience">Paling Berpengalaman</option>
                <option value="price_asc">Harga Terendah</option>
                <option value="price_desc">Harga Tertinggi</option>
                <option value="popular">Terpopuler</option>
              </select>

              <button
                onClick={() => setView("grid")}
                className={`p-2.5 sm:p-3 rounded-xl border transition-colors ${view === "grid" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
              >
                <Grid size={17} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2.5 sm:p-3 rounded-xl border transition-colors ${view === "list" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
              >
                <List size={17} />
              </button>
            </div>

            <div className="flex sm:hidden gap-2">
              <button
                onClick={() => { setShowMobileSort((v) => !v); setShowMobileFilter(false); }}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showMobileSort ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-700"}`}
              >
                <SlidersHorizontal size={15} />
                Urut
              </button>
              <button
                onClick={() => { setShowMobileFilter((v) => !v); setShowMobileSort(false); }}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showMobileFilter ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-700"}`}
              >
                Filter
                {specialty !== "Semua Spesialis" && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </button>
            </div>
          </div>

          {showMobileSort && (
            <div className="sm:hidden mt-3 bg-slate-50 rounded-2xl border border-slate-200 p-3 grid grid-cols-2 gap-2">
              {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setSort(key); setShowMobileSort(false); }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-colors ${sort === key ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-700"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {showMobileFilter && (
            <div className="sm:hidden mt-3 bg-slate-50 rounded-2xl border border-slate-200 p-3">
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => { setSpecialty(sp); setShowMobileFilter(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${specialty === sp ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-700"}`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:block lg:hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {SPECIALTIES.map((sp) => (
              <button
                key={sp}
                onClick={() => setSpecialty(sp)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${specialty === sp ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"}`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
        <div className="flex gap-6 lg:gap-8">
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 card-shadow sticky top-28">
              <h3 className="font-semibold text-slate-900 mb-4 text-sm">Filter Spesialis</h3>
              <div className="space-y-1">
                {SPECIALTIES.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSpecialty(sp)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${specialty === sp ? "bg-blue-600 text-white font-medium" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{filtered.length}</span> dokter ditemukan
                {specialty !== "Semua Spesialis" && (
                  <button
                    onClick={() => setSpecialty("Semua Spesialis")}
                    className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100"
                  >
                    {specialty} <X size={11} />
                  </button>
                )}
              </p>
              <div className="flex lg:hidden gap-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg border transition-colors ${view === "grid" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500"}`}
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-lg border transition-colors ${view === "list" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500"}`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-slate-100">
                <Search size={36} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">Dokter Tidak Ditemukan</h3>
                <p className="text-slate-500 text-sm mb-4">Coba ubah kata kunci atau filter pencarian Anda</p>
                <button
                  onClick={() => { setSearch(""); setSpecialty("Semua Spesialis"); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 text-sm"
                >
                  Reset Filter
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filtered.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} variant="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}