"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Star, Clock, MapPin, Phone, Calendar, Heart, BadgeCheck,
  ChevronRight, ArrowLeft, MessageSquare, Award
} from "lucide-react";
import { DOCTORS, REVIEWS, getFromLS, setToLS, LS_KEYS } from "@/lib/data";
import { DoctorCard } from "@/components/DoctorCard";

export default function DoctorDetailPage() {
  const params = useParams();
  const doctor = DOCTORS.find((d) => d.id === params.id);

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState("jadwal");

  useEffect(() => {
    if (!doctor) return;
    const favs = getFromLS<string[]>(LS_KEYS.FAVORITES, []);
    setIsFavorite(favs.includes(doctor.id));
  }, [doctor]);

  if (!doctor) return notFound();

  const toggleFavorite = () => {
    const favs = getFromLS<string[]>(LS_KEYS.FAVORITES, []);
    const newFavs = isFavorite ? favs.filter((id) => id !== doctor.id) : [...favs, doctor.id];
    setToLS(LS_KEYS.FAVORITES, newFavs);
    setIsFavorite(!isFavorite);
  };

  const doctorReviews = REVIEWS.filter((r) => r.doctorId === doctor.id);
  const otherDoctors = DOCTORS.filter((d) => d.specialty === doctor.specialty && d.id !== doctor.id);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <ChevronRight size={14} />
          <Link href="/doctors" className="hover:text-blue-600 transition-colors">Dokter</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium">{doctor.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Doctor info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
              <div className="h-28 gradient-primary" />
              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-12 mb-4">
                  <div className="relative w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-lg">
                    <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
                  </div>
                  <button
                    onClick={toggleFavorite}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                      isFavorite
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-500"
                    }`}
                  >
                    <Heart size={16} className={isFavorite ? "fill-current" : ""} />
                    <span className="text-sm font-medium">{isFavorite ? "Favorit" : "Simpan"}</span>
                  </button>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {doctor.name}
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck size={16} className="text-blue-600" />
                  <span className="text-blue-600 font-medium">{doctor.specialty}</span>
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-800">{doctor.rating}</span>
                    <span>({doctor.reviewCount} ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={15} className="text-slate-400" />
                    <span>{doctor.experience} tahun pengalaman</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-slate-400" />
                    <span>{doctor.hospital}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{doctor.bio}</p>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Pendidikan</div>
                  <div className="text-sm font-medium text-slate-800">{doctor.education}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
              <div className="flex border-b border-slate-100">
                {["jadwal", "ulasan", "informasi"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab === "jadwal" ? "Jadwal Praktek" : tab === "ulasan" ? `Ulasan (${doctorReviews.length})` : "Informasi"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "jadwal" && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Pilih Hari</h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                      {doctor.schedule.map((s, i) => (
                        <button
                          key={s.day}
                          onClick={() => { setSelectedDay(i); setSelectedTime(""); }}
                          className={`shrink-0 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
                            selectedDay === i
                              ? "gradient-primary text-white border-transparent"
                              : "border-slate-200 text-slate-700 hover:border-blue-300"
                          }`}
                        >
                          {s.day}
                        </button>
                      ))}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-3">Jam Tersedia</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {doctor.schedule[selectedDay].times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "gradient-primary text-white border-transparent"
                              : "border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "ulasan" && (
                  <div className="space-y-5">
                    {doctorReviews.length === 0 ? (
                      <p className="text-slate-500 text-sm">Belum ada ulasan untuk dokter ini.</p>
                    ) : (
                      doctorReviews.map((review) => (
                        <div key={review.id} className="pb-5 border-b border-slate-100 last:border-0">
                          <div className="flex items-start gap-3">
                            <Image src={review.patientPhoto} alt={review.patientName} width={40} height={40} className="rounded-full shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <span className="font-medium text-slate-800 text-sm">{review.patientName}</span>
                                  {review.isVerified && <span className="ml-2 text-xs text-emerald-600">✓ Terverifikasi</span>}
                                </div>
                                <span className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString("id-ID")}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[1,2,3,4,5].map((s) => (
                                  <Star key={s} size={12} className={s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                                ))}
                              </div>
                              <p className="text-sm text-slate-600">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "informasi" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-1">Bahasa</h4>
                      <div className="flex gap-2">
                        {doctor.languages.map((lang) => (
                          <span key={lang} className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 font-medium">{lang}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-1">Rumah Sakit</h4>
                      <p className="text-sm text-slate-600">{doctor.hospital}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-1">Tarif Konsultasi</h4>
                      <p className="text-lg font-bold text-blue-600">Rp {doctor.price.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related doctors */}
            {otherDoctors.length > 0 && (
              <div>
                <h2 className="font-semibold text-slate-900 mb-4">Dokter {doctor.specialty} Lainnya</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {otherDoctors.slice(0, 2).map((d) => (
                    <DoctorCard key={d.id} doctor={d} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking card */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 sticky top-28">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  Rp {doctor.price.toLocaleString("id-ID")}
                </div>
                <div className="text-sm text-slate-500">per konsultasi</div>
              </div>

              <Link
                href={`/appointment/book?doctor=${doctor.id}${selectedTime ? `&time=${selectedTime}&day=${doctor.schedule[selectedDay].day}` : ""}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity mb-3"
              >
                <Calendar size={18} />
                Buat Janji Dokter
              </Link>

              <a
                href={`tel:+62215551234`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-blue-300 hover:text-blue-600 transition-all text-sm"
              >
                <Phone size={16} />
                Hubungi RS
              </a>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Rating</span>
                  <span className="font-semibold">{doctor.rating}/5.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Pasien</span>
                  <span className="font-semibold">{doctor.reviewCount}+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Pengalaman</span>
                  <span className="font-semibold">{doctor.experience} tahun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
