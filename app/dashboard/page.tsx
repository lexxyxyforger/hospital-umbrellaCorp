"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar, Heart, Bell, User, Activity, Clock,
  CheckCircle, AlertCircle, ChevronRight, Stethoscope,
  TrendingUp, FileText
} from "lucide-react";
import { getFromLS, LS_KEYS, DOCTORS, Appointment, Notification } from "@/lib/data";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: Activity },
  { label: "Janji Saya", href: "/dashboard/appointments", icon: Calendar },
  { label: "Dokter Favorit", href: "/dashboard/favorites", icon: Heart },
  { label: "Notifikasi", href: "/dashboard/notifications", icon: Bell },
  { label: "Profil Saya", href: "/dashboard/profile", icon: User },
  { label: "Riwayat", href: "/dashboard/history", icon: FileText },
];

export default function DashboardPage() {
  const [patient, setPatient] = useState<{ name: string; email: string; photo?: string } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const p = getFromLS<{ name: string; email: string; photo?: string } | null>(LS_KEYS.PATIENT, null);
    if (!p) { router.push("/auth/login"); return; }
    setPatient(p);
    setAppointments(getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []));
    setNotifications(getFromLS<Notification[]>(LS_KEYS.NOTIFICATIONS, []));
    setFavorites(getFromLS<string[]>(LS_KEYS.FAVORITES, []));
  }, [router]);

  if (!patient) return null;

  const upcomingAppointments = appointments.filter((a) => a.status !== "cancelled" && a.status !== "completed");
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;
  const favoriteDoctors = DOCTORS.filter((d) => favorites.includes(d.id));

  const STAT_CARDS = [
    { label: "Janji Mendatang", value: upcomingAppointments.length, icon: Calendar, color: "text-blue-600 bg-blue-50", href: "/dashboard/appointments" },
    { label: "Dokter Favorit", value: favoriteDoctors.length, icon: Heart, color: "text-red-500 bg-red-50", href: "/dashboard/favorites" },
    { label: "Notifikasi", value: unreadNotifs, icon: Bell, color: "text-amber-600 bg-amber-50", href: "/dashboard/notifications" },
    { label: "Total Kunjungan", value: appointments.length, icon: Activity, color: "text-emerald-600 bg-emerald-50", href: "/dashboard/history" },
  ];

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 sticky top-28">
              {/* Profile */}
              <div className="text-center mb-6 pb-6 border-b border-slate-100">
                <div className="relative w-16 h-16 mx-auto mb-3">
                  {patient.photo ? (
                    <Image src={patient.photo} alt={patient.name} fill className="rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-xl font-bold">
                      {patient.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div className="font-semibold text-slate-900 text-sm">{patient.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{patient.email}</div>
              </div>

              {/* Nav */}
              <nav className="space-y-1">
                {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome */}
            <div className="gradient-primary rounded-2xl p-6 text-white">
              <h1 className="text-xl font-bold mb-1">
                Selamat Datang, {patient.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-blue-100 text-sm">Pantau kesehatan dan janji dokter Anda di sini.</p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/appointment/book"
                  className="px-4 py-2 bg-white text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  + Buat Janji
                </Link>
                <Link
                  href="/doctors"
                  className="px-4 py-2 border-2 border-white/40 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Cari Dokter
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STAT_CARDS.map(({ label, value, icon: Icon, color, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover transition-all p-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </Link>
              ))}
            </div>

            {/* Upcoming appointments */}
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-900">Janji Mendatang</h2>
                <Link href="/dashboard/appointments" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                  Lihat semua <ChevronRight size={14} />
                </Link>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-10">
                  <Calendar size={32} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Tidak ada janji mendatang</p>
                  <Link
                    href="/appointment/book"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
                  >
                    Buat janji sekarang <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 3).map((apt) => {
                    const doctor = DOCTORS.find((d) => d.id === apt.doctorId);
                    return (
                      <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        {doctor && (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                            <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 text-sm truncate">{doctor?.name}</div>
                          <div className="text-xs text-slate-500">{doctor?.specialty}</div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            <Calendar size={11} />
                            {new Date(apt.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                            <Clock size={11} />
                            {apt.time} WIB
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                          apt.status === "confirmed" ? "bg-emerald-50 text-emerald-700" :
                          apt.status === "pending" ? "bg-amber-50 text-amber-700" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {apt.status === "confirmed" ? "Dikonfirmasi" :
                           apt.status === "pending" ? "Menunggu" : apt.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Favorite doctors */}
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-900">Dokter Favorit</h2>
                <Link href="/dashboard/favorites" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                  Lihat semua <ChevronRight size={14} />
                </Link>
              </div>

              {favoriteDoctors.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={32} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Belum ada dokter favorit</p>
                  <Link href="/doctors" className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline">
                    Temukan dokter <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {favoriteDoctors.slice(0, 4).map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image src={doc.photo} alt={doc.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">{doc.name}</div>
                        <div className="text-xs text-slate-500">{doc.specialty}</div>
                      </div>
                      <Link
                        href={`/appointment/book?doctor=${doc.id}`}
                        className="shrink-0 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90"
                      >
                        Buat Janji
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                    Notifikasi
                    {unreadNotifs > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">{unreadNotifs}</span>
                    )}
                  </h2>
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex items-start gap-3 p-3 rounded-xl ${!notif.isRead ? "bg-blue-50 border border-blue-100" : "bg-slate-50"}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        notif.type === "appointment" ? "bg-blue-100 text-blue-600" :
                        notif.type === "health" ? "bg-emerald-100 text-emerald-600" :
                        "bg-amber-100 text-amber-600"
                      }`}>
                        {notif.type === "appointment" ? <Calendar size={14} /> :
                         notif.type === "health" ? <Activity size={14} /> : <Bell size={14} />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{notif.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{notif.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
