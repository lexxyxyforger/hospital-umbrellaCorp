"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar, Clock, FileText, Activity,
  CheckCircle, XCircle, AlertCircle, ArrowRight, Star
} from "lucide-react";
import { getFromLS, LS_KEYS, DOCTORS, ARTICLES, Appointment } from "@/lib/data";

type ActivityItem = {
  id: string;
  type: "appointment" | "article" | "booking";
  title: string;
  subtitle: string;
  date: string;
  status?: string;
  image?: string;
  href?: string;
};

export default function HistoryPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<"all" | "appointment" | "article">("all");

  useEffect(() => {
    const bookings = getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []);
    const readArticles = getFromLS<string[]>(LS_KEYS.READ_ARTICLES, []);

    const appointmentActivities: ActivityItem[] = bookings.map((apt) => {
      const doc = DOCTORS.find((d) => d.id === apt.doctorId);
      return {
        id: apt.id,
        type: "appointment",
        title: `Konsultasi dengan ${doc?.name || "Dokter"}`,
        subtitle: `${doc?.specialty} — ${apt.complaint}`,
        date: apt.createdAt,
        status: apt.status,
        image: doc?.photo,
        href: `/doctors/${apt.doctorId}`,
      };
    });

    const articleActivities: ActivityItem[] = readArticles
      .map((slug) => {
        const art = ARTICLES.find((a) => a.slug === slug);
        if (!art) return null;
        return {
          id: art.id,
          type: "article" as const,
          title: art.title,
          subtitle: `${art.category} — ${art.readTime} menit baca`,
          date: art.publishedAt,
          image: art.thumbnail,
          href: `/blog/${art.slug}`,
        };
      })
      .filter(Boolean) as ActivityItem[];

    const all = [...appointmentActivities, ...articleActivities].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setActivities(all);
  }, []);

  const filtered = activities.filter((a) => filter === "all" || a.type === filter);

  const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
    confirmed: { icon: CheckCircle, color: "text-emerald-500", label: "Dikonfirmasi" },
    completed: { icon: CheckCircle, color: "text-blue-500", label: "Selesai" },
    pending: { icon: AlertCircle, color: "text-amber-500", label: "Menunggu" },
    cancelled: { icon: XCircle, color: "text-red-500", label: "Dibatalkan" },
  };

  const STATS = [
    { label: "Total Konsultasi", value: activities.filter((a) => a.type === "appointment").length, icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Artikel Dibaca", value: activities.filter((a) => a.type === "article").length, icon: FileText, color: "bg-violet-50 text-violet-600" },
    { label: "Dokter Dikunjungi", value: new Set(getFromLS<Appointment[]>(LS_KEYS.BOOKINGS, []).map((b) => b.doctorId)).size, icon: Activity, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Riwayat Aktivitas
        </h1>
        <p className="text-slate-500 text-sm mb-8">Semua aktivitas kesehatan Anda tercatat di sini</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STATS.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 card-shadow p-4 text-center">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-2`}>
                <Icon size={18} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 border border-slate-100 card-shadow w-fit">
          {[
            { key: "all", label: "Semua" },
            { key: "appointment", label: "Konsultasi" },
            { key: "article", label: "Artikel" },
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

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-16 text-center">
            <Activity size={40} className="text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-800 mb-2">Belum Ada Aktivitas</h3>
            <p className="text-slate-500 text-sm mb-4">Mulai dengan membuat janji dokter atau membaca artikel kesehatan</p>
            <div className="flex gap-3 justify-center">
              <Link href="/appointment/book" className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium">
                Buat Janji
              </Link>
              <Link href="/blog" className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-blue-300">
                Baca Artikel
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-4">
              {filtered.map((activity, idx) => {
                const status = activity.status ? statusConfig[activity.status] : null;
                const StatusIcon = status?.icon;

                return (
                  <div key={activity.id} className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      activity.type === "appointment" ? "bg-blue-100" : "bg-violet-100"
                    }`}>
                      {activity.type === "appointment"
                        ? <Calendar size={16} className="text-blue-600" />
                        : <FileText size={16} className="text-violet-600" />
                      }
                    </div>

                    {/* Card */}
                    <div className="flex-1 mb-2">
                      <Link
                        href={activity.href || "#"}
                        className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover transition-all p-4 flex items-start gap-3 group block"
                      >
                        {activity.image && (
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                            <Image src={activity.image} alt={activity.title} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                              {activity.title}
                            </h4>
                            <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5 transition-colors" />
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{activity.subtitle}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock size={11} />
                              {new Date(activity.date).toLocaleDateString("id-ID", {
                                day: "numeric", month: "short", year: "numeric"
                              })}
                            </span>
                            {status && StatusIcon && (
                              <span className={`text-xs flex items-center gap-1 ${status.color}`}>
                                <StatusIcon size={11} />
                                {status.label}
                              </span>
                            )}
                            {activity.type === "article" && (
                              <span className="text-xs text-violet-500 flex items-center gap-1">
                                <FileText size={11} /> Dibaca
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
