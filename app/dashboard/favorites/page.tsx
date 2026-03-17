"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { getFromLS, LS_KEYS, DOCTORS } from "@/lib/data";
import { DoctorCard } from "@/components/DoctorCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFromLS<string[]>(LS_KEYS.FAVORITES, []));
  }, []);

  const favDoctors = DOCTORS.filter((d) => favorites.includes(d.id));

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Dokter Favorit
          </h1>
          <p className="text-slate-500 text-sm mt-1">{favDoctors.length} dokter tersimpan</p>
        </div>

        {favDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-16 text-center">
            <Heart size={40} className="text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-800 mb-2">Belum Ada Dokter Favorit</h3>
            <p className="text-slate-500 text-sm mb-4">Tambahkan dokter favorit dengan menekan ikon hati pada kartu dokter</p>
            <Link href="/doctors" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium">
              Cari Dokter <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
