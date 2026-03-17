"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import { getFromLS, LS_KEYS, DOCTORS, Appointment } from "@/lib/data";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export default function AppointmentCalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setAppointments(getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const aptsByDate: Record<string, Appointment[]> = {};
  appointments.forEach((a) => {
    const d = a.date.split("T")[0];
    if (!aptsByDate[d]) aptsByDate[d] = [];
    aptsByDate[d].push(a);
  });

  const getDateKey = (day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const selectedApts = selectedDate ? (aptsByDate[selectedDate] || []) : [];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Kalender Janji</h1>
            <p className="text-slate-500 text-sm mt-0.5">Lihat semua jadwal konsultasi Anda</p>
          </div>
          <Link href="/appointment/book" className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90">
            <Plus size={15} /> Buat Janji
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
            {/* Month header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <h2 className="font-semibold text-slate-900">{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 text-center border-b border-slate-100">
              {DAYS.map((d) => (
                <div key={d} className="py-2.5 text-xs font-semibold text-slate-500">{d}</div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className="aspect-square" />;
                const dateKey = getDateKey(day);
                const hasApt = !!aptsByDate[dateKey];
                const aptCount = aptsByDate[dateKey]?.length || 0;
                const isToday = dateKey === today;
                const isSelected = dateKey === selectedDate;

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDate(isSelected ? "" : dateKey)}
                    className={`aspect-square flex flex-col items-center justify-center text-sm font-medium transition-all relative border border-transparent ${
                      isSelected
                        ? "gradient-primary text-white rounded-xl"
                        : isToday
                        ? "text-blue-600 bg-blue-50 rounded-xl"
                        : hasApt
                        ? "text-slate-800 hover:bg-slate-50 rounded-xl"
                        : "text-slate-600 hover:bg-slate-50 rounded-xl"
                    }`}
                  >
                    {day}
                    {hasApt && (
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: Math.min(aptCount, 3) }).map((_, j) => (
                          <div key={j} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-blue-500"}`} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Ada janji</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-50 border border-blue-200" /> Hari ini</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded gradient-primary" /> Dipilih</div>
            </div>
          </div>

          {/* Selected date detail */}
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5">
            {selectedDate ? (
              <>
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{selectedApts.length} janji pada hari ini</p>

                {selectedApts.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar size={28} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Tidak ada janji</p>
                    <Link href={`/appointment/book`} className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline">
                      <Plus size={12} /> Buat janji
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedApts.map((apt) => {
                      const doctor = DOCTORS.find((d) => d.id === apt.doctorId);
                      return (
                        <Link key={apt.id} href={`/dashboard/appointments/${apt.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors group">
                          {doctor && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                              <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">{doctor?.name}</div>
                            <div className="text-xs text-slate-500">{apt.time} WIB</div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                            apt.status === "confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}>
                            {apt.status === "confirmed" ? "✓" : "⏳"}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <Calendar size={32} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Pilih tanggal untuk melihat janji</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
