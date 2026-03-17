"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Heart, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { setToLS, LS_KEYS } from "@/lib/data";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Format email tidak valid";
    if (!form.password) errs.password = "Password wajib diisi";
    else if (form.password.length < 6) errs.password = "Password minimal 6 karakter";
    if (mode === "register") {
      if (!form.name) errs.name = "Nama wajib diisi";
      if (!form.phone) errs.phone = "Nomor HP wajib diisi";
      if (form.password !== form.confirm) errs.confirm = "Password tidak cocok";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const patient = {
      id: `p-${Date.now()}`,
      name: mode === "register" ? form.name : "Pasien Demo",
      email: form.email,
      phone: mode === "register" ? form.phone : "08123456789",
      gender: "male",
      address: "",
      birthDate: "",
    };
    setToLS(LS_KEYS.PATIENT, patient);
    setToLS(LS_KEYS.NOTIFICATIONS, [
      {
        id: "notif-1",
        title: "Selamat Datang!",
        message: `Halo ${patient.name}, selamat bergabung di RS Sehat Prima.`,
        type: "system",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ]);

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Heart size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            {mode === "login" ? "Masuk ke Akun" : "Daftar Akun Baru"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}
            {" "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setErrors({}); }}
              className="text-blue-600 font-medium hover:underline"
            >
              {mode === "login" ? "Daftar sekarang" : "Masuk di sini"}
            </button>
          </p>
        </div>

        <div className="bg-white rounded-3xl card-shadow border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Nama Lengkap</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama sesuai KTP"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.name ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-400"} focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Nomor HP</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="08xx-xxxx-xxxx"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-400"} focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-400"} focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimal 6 karakter"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.password ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-400"} focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Konfirmasi Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="Ulangi password"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.confirm ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-400"} focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  />
                </div>
                {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
              </div>
            )}

            {mode === "login" && (
              <div className="text-right">
                <Link href="#" className="text-xs text-blue-600 hover:underline">Lupa password?</Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Masuk" : "Daftar"} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Social divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-slate-400">atau lanjutkan dengan</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Facebook"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                {provider === "Google" ? "🇬" : "🇫"} {provider}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Dengan mendaftar, Anda menyetujui{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">Syarat & Ketentuan</Link> dan{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">Kebijakan Privasi</Link> kami.
        </p>
      </div>
    </div>
  );
}
