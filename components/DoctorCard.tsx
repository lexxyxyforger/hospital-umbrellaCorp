"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Calendar, Clock, BadgeCheck } from "lucide-react";
import { Doctor, getFromLS, setToLS, LS_KEYS } from "@/lib/data";

interface DoctorCardProps {
  doctor: Doctor;
  variant?: "grid" | "list" | "compact";
}

export function DoctorCard({ doctor, variant = "grid" }: DoctorCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = getFromLS<string[]>(LS_KEYS.FAVORITES, []);
    setIsFavorite(favs.includes(doctor.id));
  }, [doctor.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = getFromLS<string[]>(LS_KEYS.FAVORITES, []);
    const newFavs = isFavorite ? favs.filter((id) => id !== doctor.id) : [...favs, doctor.id];
    setToLS(LS_KEYS.FAVORITES, newFavs);
    setIsFavorite(!isFavorite);
  };

  if (variant === "compact") {
    return (
      <Link href={`/doctors/${doctor.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{doctor.name}</div>
          <div className="text-xs text-slate-500">{doctor.specialty}</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-slate-700">{doctor.rating}</span>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover transition-all duration-300 p-5 flex gap-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                <Link href={`/doctors/${doctor.id}`}>{doctor.name}</Link>
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mt-1">
                {doctor.specialty}
              </span>
            </div>
            <button onClick={toggleFavorite} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <Heart
                size={18}
                className={isFavorite ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-400"}
              />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-medium text-slate-800">{doctor.rating}</span>
              <span className="text-slate-400">({doctor.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              <span>{doctor.experience} tahun pengalaman</span>
            </div>
            <div className="font-semibold text-blue-600">
              Rp {doctor.price.toLocaleString("id-ID")}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <Link
            href={`/appointment/book?doctor=${doctor.id}`}
            className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Buat Janji
          </Link>
          <Link
            href={`/doctors/${doctor.id}`}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-all text-center"
          >
            Lihat Profil
          </Link>
        </div>
      </div>
    );
  }

  // Default: grid
  return (
    <div className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Photo */}
      <div className="relative h-56 bg-gradient-to-br from-blue-50 to-cyan-50">
        <Image
          src={doctor.photo}
          alt={doctor.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {doctor.isPopular && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold gradient-primary text-white shadow-md">
              Populer
            </span>
          )}
          {doctor.isRecommended && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-md">
              Rekomendasi
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
        >
          <Heart
            size={16}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-slate-500"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
              <Link href={`/doctors/${doctor.id}`}>{doctor.name}</Link>
            </h3>
            <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-blue-600">
              <BadgeCheck size={13} />
              {doctor.specialty}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                className={star <= Math.floor(doctor.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-slate-800">{doctor.rating}</span>
          <span className="text-xs text-slate-400">({doctor.reviewCount} ulasan)</span>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{doctor.experience} thn</span>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <div className="font-semibold text-blue-600 text-sm">
            Rp {doctor.price.toLocaleString("id-ID")}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/appointment/book?doctor=${doctor.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Calendar size={14} />
            Buat Janji
          </Link>
          <Link
            href={`/doctors/${doctor.id}`}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            <span className="text-sm">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
