"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, X, RefreshCw, AlertCircle, Plus } from "lucide-react";
import { getFromLS, setToLS, LS_KEYS, DOCTORS, Appointment } from "@/lib/data";

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  pending: { label: "Menunggu", class: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Dikonfirmasi", class: "bg-emerald-50 text-emerald-700" },
  completed: { label: "Selesai", class: "bg-blue-50 text-blue-700" },
  cancelled: { label: "Dibatalkan", class: "bg-red-50 text-red-700" },
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    setAppointments(getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []));
  }, []);

  const filtered = appointments.filter((a) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return a.status === "confirmed" || a.status === "pending";
    if (filter === "completed") return a.status === "completed";
    if (filter === "cancelled") return a.status === "cancelled";
    return true;
  });

  const cancelAppointment = (id: string) => {
    const updated = appointments.map((a) => a.id === id ? { ...a, status: "cancelled" as const } : a);
    setAppointments(updated);
    setToLS(LS_KEYS.BOOKINGS, updated);
    setCancelId(null);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Janji Saya</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola semua janji dokter Anda</p>
          </div>
          <Link href="/appointment/book" className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90">
            <Plus size={16} /> Buat Janji
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 border border-slate-100 card-shadow w-fit">
          {[
            { key: "all", label: "Semua" },
            { key: "upcoming", label: "Mendatang" },
            { key: "completed", label: "Selesai" },
            { key: "cancelled", label: "Dibatalkan" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === key ? "gradient-primary text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-16 text-center">
            <Calendar size={40} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-slate-800 font-semibold mb-2">Tidak Ada Janji</h3>
            <p className="text-slate-500 text-sm mb-4">
              {filter === "all" ? "Anda belum memiliki janji dokter" : `Tidak ada janji dengan status "${filter}"`}
            </p>
            <Link href="/appointment/book" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium">
              <Plus size={16} /> Buat Janji Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((apt) => {
              const doctor = DOCTORS.find((d) => d.id === apt.doctorId);
              const status = STATUS_LABELS[apt.status];
              return (
                <div key={apt.id} className="bg-white rounded-2xl border border-slate-100 card-shadow p-5">
                  <div className="flex items-start gap-4">
                    {doctor && (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-slate-900">{doctor?.name}</h3>
                          <p className="text-sm text-blue-600">{doctor?.specialty}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${status.class}`}>
                          {status.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-blue-500" />
                          {new Date(apt.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-blue-500" />
                          {apt.time} WIB
                        </div>
                      </div>

                      {apt.complaint && (
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                          <span className="font-medium text-slate-700">Keluhan:</span> {apt.complaint}
                        </p>
                      )}

                      {(apt.status === "confirmed" || apt.status === "pending") && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => setCancelId(apt.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
                          >
                            <X size={13} /> Batalkan
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors">
                            <RefreshCw size={13} /> Reschedule
                          </button>
                          <Link
                            href={`/doctors/${apt.doctorId}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90"
                          >
                            Lihat Dokter
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancel confirm dialog */}
        {cancelId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-500" />
                </div>
                <h3 className="font-semibold text-slate-900">Batalkan Janji?</h3>
              </div>
              <p className="text-sm text-slate-600 mb-5">
                Apakah Anda yakin ingin membatalkan janji ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-slate-300"
                >
                  Tidak
                </button>
                <button
                  onClick={() => cancelAppointment(cancelId)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Ya, Batalkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
