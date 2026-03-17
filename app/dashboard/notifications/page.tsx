"use client";

import { useState, useEffect } from "react";
import { Bell, Calendar, Activity, CheckCheck, Trash2 } from "lucide-react";
import { getFromLS, setToLS, LS_KEYS, Notification } from "@/lib/data";

const TYPE_ICONS: Record<string, { icon: typeof Bell; color: string }> = {
  appointment: { icon: Calendar, color: "bg-blue-100 text-blue-600" },
  health: { icon: Activity, color: "bg-emerald-100 text-emerald-600" },
  promo: { icon: Bell, color: "bg-violet-100 text-violet-600" },
  system: { icon: Bell, color: "bg-amber-100 text-amber-600" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(getFromLS<Notification[]>(LS_KEYS.NOTIFICATIONS, []));
  }, []);

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    setToLS(LS_KEYS.NOTIFICATIONS, updated);
  };

  const markRead = (id: string) => {
    const updated = notifications.map((n) => n.id === id ? { ...n, isRead: true } : n);
    setNotifications(updated);
    setToLS(LS_KEYS.NOTIFICATIONS, updated);
  };

  const deleteNotif = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    setToLS(LS_KEYS.NOTIFICATIONS, updated);
  };

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Notifikasi
            </h1>
            {unread > 0 && <p className="text-sm text-slate-500 mt-0.5">{unread} belum dibaca</p>}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:underline">
              <CheckCheck size={15} /> Tandai semua dibaca
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-16 text-center">
            <Bell size={40} className="text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-800 mb-2">Tidak Ada Notifikasi</h3>
            <p className="text-slate-500 text-sm">Notifikasi baru akan muncul di sini</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => {
              const { icon: Icon, color } = TYPE_ICONS[notif.type] || TYPE_ICONS.system;
              return (
                <div
                  key={notif.id}
                  className={`bg-white rounded-2xl border card-shadow p-4 flex items-start gap-3 cursor-pointer transition-all ${
                    !notif.isRead ? "border-blue-200 bg-blue-50/30" : "border-slate-100 hover:border-slate-200"
                  }`}
                  onClick={() => markRead(notif.id)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className={`text-sm font-semibold ${!notif.isRead ? "text-blue-900" : "text-slate-800"}`}>
                          {notif.title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-0.5">{notif.message}</p>
                        <p className="text-xs text-slate-400 mt-1.5">
                          {new Date(notif.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {!notif.isRead && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
