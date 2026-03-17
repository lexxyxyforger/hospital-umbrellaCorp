"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Save, User, Phone, Mail, MapPin, Eye, EyeOff, Check } from "lucide-react";
import { getFromLS, setToLS, LS_KEYS } from "@/lib/data";

type Patient = {
  id: string; name: string; email: string; phone: string;
  birthDate: string; gender: string; address: string;
  photo?: string; bloodType?: string;
};

export default function ProfilePage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [form, setForm] = useState<Patient | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [pwError, setPwError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const p = getFromLS<Patient | null>(LS_KEYS.PATIENT, null);
    if (!p) { router.push("/auth/login"); return; }
    setPatient(p);
    setForm(p);
  }, [router]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const photoUrl = ev.target?.result as string;
      setForm((prev) => prev ? { ...prev, photo: photoUrl } : prev);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setToLS(LS_KEYS.PATIENT, form);
    setPatient(form);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = async () => {
    if (!pwForm.newPw || pwForm.newPw.length < 6) {
      setPwError("Password baru minimal 6 karakter"); return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError("Password tidak cocok"); return;
    }
    setPwError("");
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    setSaved(true);
    setPwForm({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setSaved(false), 3000);
  };

  if (!form) return null;

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Profil Saya
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 border border-slate-100 card-shadow mb-6 w-fit">
          {[{ key: "profile", label: "Data Profil" }, { key: "password", label: "Ubah Password" }].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === key ? "gradient-primary text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
            {/* Photo section */}
            <div className="h-20 gradient-primary" />
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl border-4 border-white overflow-hidden shadow-lg">
                    {form.photo ? (
                      <Image src={form.photo} alt={form.name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                        {form.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors"
                  >
                    <Camera size={13} />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </div>
                {saved && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                    <Check size={13} /> Tersimpan!
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Nama Lengkap", key: "name", icon: User, placeholder: "Nama sesuai KTP" },
                  { label: "Email", key: "email", icon: Mail, placeholder: "email@example.com", type: "email" },
                  { label: "Nomor HP", key: "phone", icon: Phone, placeholder: "08xx-xxxx-xxxx" },
                  { label: "Alamat", key: "address", icon: MapPin, placeholder: "Alamat lengkap" },
                ].map(({ label, key, icon: Icon, placeholder, type }) => (
                  <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
                    <div className="relative">
                      <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={type || "text"}
                        value={(form as Record<string, string>)[key] || ""}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={form.birthDate || ""}
                    onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Jenis Kelamin</label>
                  <select
                    value={form.gender || "male"}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm bg-white"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Golongan Darah</label>
                  <select
                    value={form.bloodType || ""}
                    onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 outline-none text-sm bg-white"
                  >
                    <option value="">Pilih golongan darah</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-white font-semibold disabled:opacity-70 hover:opacity-90 transition-opacity"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Save size={16} /> Simpan Perubahan</>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-6">
            <h2 className="font-semibold text-slate-900 mb-5">Ubah Password</h2>
            <div className="space-y-4">
              {[
                { label: "Password Saat Ini", key: "current", show: showPw.current, toggle: () => setShowPw((p) => ({ ...p, current: !p.current })) },
                { label: "Password Baru", key: "newPw", show: showPw.new, toggle: () => setShowPw((p) => ({ ...p, new: !p.new })) },
                { label: "Konfirmasi Password Baru", key: "confirm", show: showPw.confirm, toggle: () => setShowPw((p) => ({ ...p, confirm: !p.confirm })) },
              ].map(({ label, key, show, toggle }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      value={(pwForm as Record<string, string>)[key] || ""}
                      onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                    />
                    <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}

              {pwError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{pwError}</p>
              )}

              {saved && (
                <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2 flex items-center gap-2">
                  <Check size={14} /> Password berhasil diubah!
                </p>
              )}

              <button
                onClick={handleChangePassword}
                disabled={isSaving}
                className="w-full py-3 rounded-xl gradient-primary text-white font-semibold disabled:opacity-70 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Ubah Password"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
