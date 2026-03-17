"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ChevronRight, CheckCircle, RefreshCw, X } from "lucide-react";
import { getFromLS, setToLS, LS_KEYS, DOCTORS, Appointment } from "@/lib/data";

export default function AppointmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const apts = getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []);
    const apt = apts.find((a) => a.id === params.id);
    if (apt) setAppointment(apt);
  }, [params.id]);

  const doctor = appointment ? DOCTORS.find((d) => d.id === appointment.doctorId) : null;

  const getAvailableTimes = () => {
    if (!doctor || !newDate) return [];
    const d = new Date(newDate);
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayName = dayNames[d.getDay()];
    return doctor.schedule.find((s) => s.day === dayName)?.times || [];
  };

  const handleReschedule = () => {
    if (!appointment || !newDate || !newTime) return;
    const apts = getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []);
    const updated = apts.map((a) =>
      a.id === appointment.id ? { ...a, date: newDate, time: newTime } : a
    );
    setToLS(LS_KEYS.BOOKINGS, updated);
    setAppointment({ ...appointment, date: newDate, time: newTime });
    setIsRescheduling(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!appointment) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Janji tidak ditemukan</p>
          <Link href="/dashboard/appointments" className="text-blue-600 hover:underline">Kembali ke Janji Saya</Link>
        </div>
      </div>
    );
  }

  const STATUS = {
    pending: { label: "Menunggu Konfirmasi", color: "bg-amber-50 text-amber-700 border-amber-200" },
    confirmed: { label: "Dikonfirmasi", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    completed: { label: "Selesai", color: "bg-blue-50 text-blue-700 border-blue-200" },
    cancelled: { label: "Dibatalkan", color: "bg-red-50 text-red-700 border-red-200" },
  };

  const status = STATUS[appointment.status];

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <ChevronRight size={14} />
          <Link href="/dashboard/appointments" className="hover:text-blue-600">Janji Saya</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800">Detail Janji</span>
        </nav>

        {saved && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-700 text-sm font-medium">
            <CheckCircle size={16} /> Jadwal berhasil diperbarui!
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden mb-5">
          {/* Header */}
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>Detail Janji</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
                {status.label}
              </span>
            </div>
            <div className="text-blue-200 text-xs">ID: {appointment.id}</div>
          </div>

          <div className="p-6 space-y-5">
            {/* Doctor */}
            {doctor && (
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{doctor.name}</h2>
                  <p className="text-sm text-blue-600">{doctor.specialty}</p>
                  <p className="text-sm text-slate-500">{doctor.hospital}</p>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-3">
              {[
                { label: "Tanggal", value: new Date(appointment.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }), icon: Calendar },
                { label: "Waktu", value: `${appointment.time} WIB`, icon: Clock },
                { label: "Nama Pasien", value: appointment.patientName, icon: User },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{label}</div>
                    <div className="text-sm font-medium text-slate-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {appointment.complaint && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Keluhan</div>
                <p className="text-sm text-slate-800">{appointment.complaint}</p>
              </div>
            )}

            {appointment.notes && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Catatan</div>
                <p className="text-sm text-slate-800">{appointment.notes}</p>
              </div>
            )}

            {/* Cost */}
            {doctor && (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-600">Estimasi Biaya</span>
                <span className="font-bold text-blue-600 text-lg">Rp {doctor.price.toLocaleString("id-ID")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions for active appointments */}
        {(appointment.status === "confirmed" || appointment.status === "pending") && (
          <div className="space-y-3">
            {!isRescheduling ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsRescheduling(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-blue-200 text-blue-600 font-medium text-sm hover:bg-blue-50 transition-colors"
                >
                  <RefreshCw size={15} /> Reschedule
                </button>
                <button
                  onClick={() => {
                    const apts = getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []);
                    const updated = apts.map((a) => a.id === appointment.id ? { ...a, status: "cancelled" as const } : a);
                    setToLS(LS_KEYS.BOOKINGS, updated);
                    router.push("/dashboard/appointments");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-red-600 font-medium text-sm hover:bg-red-50 transition-colors"
                >
                  <X size={15} /> Batalkan
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <RefreshCw size={16} className="text-blue-600" /> Reschedule Janji
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Tanggal Baru</label>
                    <input
                      type="date"
                      value={newDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => { setNewDate(e.target.value); setNewTime(""); }}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm"
                    />
                  </div>
                  {newDate && getAvailableTimes().length > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Jam Baru</label>
                      <div className="grid grid-cols-4 gap-2">
                        {getAvailableTimes().map((t) => (
                          <button key={t} onClick={() => setNewTime(t)}
                            className={`py-2 rounded-xl border text-sm font-medium transition-all ${newTime === t ? "gradient-primary text-white border-transparent" : "border-slate-200 text-slate-700 hover:border-blue-300"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => setIsRescheduling(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium">Batal</button>
                    <button onClick={handleReschedule} disabled={!newDate || !newTime}
                      className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold disabled:opacity-50 hover:opacity-90">
                      Konfirmasi Reschedule
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <Link href="/dashboard/appointments" className="mt-4 block text-center text-sm text-slate-500 hover:text-blue-600 transition-colors">
          ← Kembali ke Janji Saya
        </Link>
      </div>
    </div>
  );
}
