"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSending(false);
    setIsSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Hubungi Kami</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Kami Siap Membantu
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Tim kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami melalui salah satu channel di bawah.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              {
                icon: Phone,
                title: "Telepon",
                lines: ["(021) 555-1234", "0800-1234-567 (Bebas Pulsa)"],
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["info@rssehatprima.id", "booking@rssehatprima.id"],
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: MapPin,
                title: "Alamat",
                lines: ["Jl. Kesehatan No. 1", "Jakarta Selatan, DKI Jakarta 12345"],
                color: "bg-violet-50 text-violet-600",
              },
              {
                icon: Clock,
                title: "Jam Operasional",
                lines: ["Sen-Jum: 07:00–21:00", "Sab-Min: 08:00–18:00", "IGD: 24 Jam"],
                color: "bg-amber-50 text-amber-600",
              },
            ].map(({ icon: Icon, title, lines, color }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-100 card-shadow p-5 flex gap-4">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  {lines.map((line, i) => (
                    <p key={i} className="text-sm text-slate-600">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Emergency */}
            <div className="bg-red-500 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-semibold">Darurat Medis</span>
              </div>
              <p className="text-red-100 text-sm mb-3">Untuk kondisi darurat, segera hubungi:</p>
              <a href="tel:+62215551234" className="text-2xl font-bold hover:underline">(021) 555-1234</a>
              <p className="text-red-200 text-xs mt-1">IGD buka 24 jam</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-8">
              <h2 className="font-semibold text-slate-900 mb-6 flex items-center gap-2 text-lg">
                <MessageSquare size={20} className="text-blue-600" />
                Kirim Pesan
              </h2>

              {isSent && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <p className="text-sm text-emerald-700 font-medium">Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Nama Lengkap *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Subjek</label>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Perihal pesan Anda"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Pesan *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-70"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send size={16} /> Kirim Pesan</>
                  )}
                </button>
              </form>
            </div>

            {/* Map placeholder */}
            <div id="map" className="mt-6 bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
              <div className="h-72 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin size={40} className="text-blue-600 mx-auto mb-3" />
                  <p className="font-semibold text-slate-800">RS Sehat Prima</p>
                  <p className="text-slate-500 text-sm">Jl. Kesehatan No. 1, Jakarta Selatan</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium"
                  >
                    Buka di Google Maps
                  </a>
                </div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-blue-500" />
                  <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-blue-400" />
                  <div className="absolute bottom-12 left-16 w-4 h-4 rounded-full bg-cyan-500" />
                  <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
