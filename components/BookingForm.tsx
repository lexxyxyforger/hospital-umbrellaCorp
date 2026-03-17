"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, User, ChevronRight } from "lucide-react";
import { DOCTORS } from "@/lib/data";

interface BookingFormProps {
  preselectedDoctorId?: string;
}

export function BookingForm({ preselectedDoctorId }: BookingFormProps) {
  const [doctorId, setDoctorId] = useState(preselectedDoctorId || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const selectedDoctor = DOCTORS.find((d) => d.id === doctorId);

  // Get available times for doctor
  const getAvailableTimes = () => {
    if (!selectedDoctor || !date) return [];
    const d = new Date(date);
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayName = dayNames[d.getDay()];
    return selectedDoctor.schedule.find((s) => s.day === dayName)?.times || [];
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const buildBookingUrl = () => {
    const params = new URLSearchParams();
    if (doctorId) params.set("doctor", doctorId);
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    return `/appointment/book?${params.toString()}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5">
      <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 text-sm">
        <Calendar size={16} className="text-blue-600" />
        Buat Janji Cepat
      </h3>

      <div className="space-y-3">
        {/* Doctor select */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Dokter</label>
          <select
            value={doctorId}
            onChange={(e) => { setDoctorId(e.target.value); setDate(""); setTime(""); }}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm bg-white text-slate-700"
          >
            <option value="">Pilih dokter...</option>
            {DOCTORS.map((d) => (
              <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Tanggal</label>
          <input
            type="date"
            value={date}
            min={getMinDate()}
            onChange={(e) => { setDate(e.target.value); setTime(""); }}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm"
          />
        </div>

        {/* Time */}
        {date && (
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Jam</label>
            {getAvailableTimes().length > 0 ? (
              <div className="grid grid-cols-4 gap-1.5">
                {getAvailableTimes().map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`py-2 rounded-lg border text-xs font-medium transition-all ${
                      time === t
                        ? "gradient-primary text-white border-transparent"
                        : "border-slate-200 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 p-2">Tidak ada jadwal di tanggal ini</p>
            )}
          </div>
        )}

        <Link
          href={buildBookingUrl()}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            doctorId
              ? "gradient-primary text-white hover:opacity-90"
              : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          Lanjutkan Booking <ChevronRight size={15} />
        </Link>
      </div>
    </div>
  );
}
