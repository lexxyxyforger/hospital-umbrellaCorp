"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Clock, User, ChevronRight, CheckCircle,
  Stethoscope, FileText, AlertCircle
} from "lucide-react";
import { DOCTORS, Doctor, getFromLS, setToLS, LS_KEYS, Appointment } from "@/lib/data";

const STEPS = ["Pilih Dokter", "Pilih Jadwal", "Data Pasien", "Konfirmasi"];

const COMPLAINT_SUGGESTIONS = [
  "Sakit kepala berulang",
  "Nyeri dada",
  "Sesak napas",
  "Demam tinggi",
  "Batuk berkepanjangan",
  "Nyeri sendi",
  "Gangguan tidur",
];

export default function BookAppointmentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    gender: "male",
    complaint: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const doctorId = searchParams.get("doctor");
    if (doctorId) {
      const doc = DOCTORS.find((d) => d.id === doctorId);
      if (doc) { setSelectedDoctor(doc); setStep(1); }
    }
    const patient = getFromLS<{ name: string; phone: string; email: string } | null>(LS_KEYS.PATIENT, null);
    if (patient) {
      setForm((prev) => ({ ...prev, name: patient.name || "", phone: patient.phone || "", email: patient.email || "" }));
    }
    // Load draft
    const draft = getFromLS<typeof form | null>("booking_draft", null);
    if (draft) setForm(draft);
  }, [searchParams]);

  // Auto-save draft
  useEffect(() => {
    if (form.complaint || form.name) {
      setToLS("booking_draft", form);
    }
  }, [form]);

  const getAvailableDates = () => {
    if (!selectedDoctor) return [];
    const days = selectedDoctor.schedule.map((s) => s.day);
    const dayMap: Record<string, number> = {
      Minggu: 0, Senin: 1, Selasa: 2, Rabu: 3, Kamis: 4, Jumat: 5, Sabtu: 6,
    };
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = Object.keys(dayMap).find((k) => dayMap[k] === date.getDay());
      if (dayName && days.includes(dayName)) {
        dates.push(date.toISOString().split("T")[0]);
      }
      if (dates.length >= 10) break;
    }
    return dates;
  };

  const getTimesForDate = () => {
    if (!selectedDoctor || !selectedDate) return [];
    const date = new Date(selectedDate);
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayName = dayNames[date.getDay()];
    const schedule = selectedDoctor.schedule.find((s) => s.day === dayName);
    return schedule?.times || [];
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));

    const appointment: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: selectedDoctor!.id,
      patientName: form.name,
      date: selectedDate,
      time: selectedTime,
      complaint: form.complaint,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      notes: form.notes,
    };

    const existing = getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []);
    setToLS(LS_KEYS.BOOKINGS, [...existing, appointment]);
    localStorage.removeItem("booking_draft");

    setIsSubmitting(false);
    setIsDone(true);
  };

  const filteredDoctors = DOCTORS.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  if (isDone) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-100 card-shadow p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Janji Berhasil Dibuat!
          </h2>
          <p className="text-slate-500 mb-6">
            Konfirmasi telah dikirim. Harap datang 15 menit sebelum jadwal konsultasi.
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Dokter</span>
              <span className="font-medium">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tanggal</span>
              <span className="font-medium">{new Date(selectedDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Jam</span>
              <span className="font-medium">{selectedTime} WIB</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/appointments" className="flex-1 py-3 rounded-xl gradient-primary text-white font-medium text-sm text-center hover:opacity-90">
              Lihat Janji Saya
            </Link>
            <Link href="/" className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm text-center hover:border-blue-300">
              Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Buat Janji Dokter
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Isi form di bawah untuk membuat janji konsultasi</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-10 overflow-x-auto pb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    i < step
                      ? "gradient-primary text-white"
                      : i === step
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap ${i === step ? "text-blue-600" : i < step ? "text-slate-700" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 min-w-8 transition-colors ${i < step ? "bg-blue-600" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Pilih Dokter */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Pilih Dokter</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari dokter atau spesialis..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm mb-4"
            />
            <div className="space-y-2">
              {filteredDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => { setSelectedDoctor(doc); setStep(1); }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all group text-left"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <Image src={doc.photo} alt={doc.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">{doc.name}</div>
                    <div className="text-xs text-blue-600 mt-0.5">{doc.specialty}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span>⭐ {doc.rating}</span>
                      <span>{doc.experience} thn</span>
                      <span className="font-medium text-blue-600">Rp {doc.price.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Pilih Jadwal */}
        {step === 1 && selectedDoctor && (
          <div className="space-y-4">
            {/* Selected doctor */}
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-4 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <Image src={selectedDoctor.photo} alt={selectedDoctor.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 text-sm">{selectedDoctor.name}</div>
                <div className="text-xs text-blue-600">{selectedDoctor.specialty}</div>
              </div>
              <button onClick={() => { setSelectedDoctor(null); setStep(0); }} className="text-xs text-slate-400 hover:text-slate-600">
                Ganti
              </button>
            </div>

            {/* Date */}
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" /> Pilih Tanggal
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {getAvailableDates().map((date) => {
                  const d = new Date(date);
                  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
                  return (
                    <button
                      key={date}
                      onClick={() => { setSelectedDate(date); setSelectedTime(""); }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedDate === date
                          ? "gradient-primary text-white border-transparent"
                          : "border-slate-200 hover:border-blue-300 text-slate-700"
                      }`}
                    >
                      <div className="text-xs opacity-75">{dayNames[d.getDay()]}</div>
                      <div className="text-sm font-semibold mt-0.5">{d.getDate()}</div>
                      <div className="text-xs opacity-75">{d.toLocaleDateString("id-ID", { month: "short" })}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time */}
            {selectedDate && (
              <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-blue-600" /> Pilih Jam
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {getTimesForDate().map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        selectedTime === time
                          ? "gradient-primary text-white border-transparent"
                          : "border-slate-200 text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-slate-300">
                Kembali
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 py-3 rounded-xl gradient-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              >
                Lanjut
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Data Pasien */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 space-y-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <User size={18} className="text-blue-600" /> Data Pasien
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Nama Lengkap *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama sesuai KTP"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Nomor HP *</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="08xx-xxxx-xxxx"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Tanggal Lahir</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Jenis Kelamin</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm bg-white"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Keluhan Utama *</label>
              <textarea
                value={form.complaint}
                onChange={(e) => setForm({ ...form, complaint: e.target.value })}
                placeholder="Jelaskan keluhan atau gejala yang Anda rasakan..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm resize-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {COMPLAINT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, complaint: s })}
                    className="px-2.5 py-1 rounded-full border border-slate-200 text-xs text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Catatan Tambahan</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Riwayat penyakit, alergi obat, dll (opsional)"
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-slate-300">Kembali</button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.name || !form.phone || !form.complaint}
                className="flex-1 py-3 rounded-xl gradient-primary text-white font-medium disabled:opacity-50"
              >
                Lanjut
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Konfirmasi */}
        {step === 3 && selectedDoctor && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Konfirmasi Janji</h2>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl mb-6">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <Image src={selectedDoctor.photo} alt={selectedDoctor.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{selectedDoctor.name}</div>
                  <div className="text-sm text-blue-600">{selectedDoctor.specialty}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{selectedDoctor.hospital}</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ["Tanggal", new Date(selectedDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
                  ["Jam", `${selectedTime} WIB`],
                  ["Pasien", form.name],
                  ["Nomor HP", form.phone],
                  ["Keluhan", form.complaint],
                  ["Biaya Konsultasi", `Rp ${selectedDoctor.price.toLocaleString("id-ID")}`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-start text-sm">
                    <span className="text-slate-500 shrink-0">{label}</span>
                    <span className="font-medium text-slate-800 text-right ml-4">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>Harap datang 15 menit sebelum jadwal. Bawa kartu identitas dan dokumen medis yang relevan.</span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium">Kembali</button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl gradient-primary text-white font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : "Konfirmasi Janji"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
