import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none" style={{ fontFamily: "var(--font-display)" }}>RS Umbrella Corp</div>
                <div className="text-xs text-red-400">Obedience. Discipline. Power.</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Fasilitas medis terpadu milik Umbrella Corporation. Didukung oleh riset biomedis mutakhir dan tim spesialis kelas dunia untuk menjaga kesehatan Anda dan keluarga.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Layanan</h3>
            <ul className="space-y-2.5">
              {[
                ["Medical Checkup", "/services/medical-checkup"],
                ["Vaksinasi", "/services/vaksinasi"],
                ["IGD 24 Jam", "/services/igd-24-jam"],
                ["Poliklinik Spesialis", "/services"],
                ["Rawat Inap", "/services"],
                ["Laboratorium Klinik", "/services/laboratorium"],
                ["Radiologi & Imaging", "/services/radiologi"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2.5">
              {[
                ["Daftar Spesialis", "/doctors"],
                ["Buat Janji", "/appointment/book"],
                ["Publikasi Ilmiah", "/blog"],
                ["Tentang Umbrella Corp", "/about"],
                ["Karir di Umbrella", "/career"],
                ["FAQ", "/faq"],
                ["Kebijakan Privasi", "/privacy"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-red-400 mt-0.5 shrink-0" />
                <span className="text-sm">Jl. Raccoon City No. 1, Jakarta Selatan, DKI Jakarta 12345</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-red-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+62215551234" className="text-sm hover:text-white transition-colors block">(021) 555-1234</a>
                  <a href="tel:+628001234567" className="text-xs text-slate-400 hover:text-white transition-colors">0800-1234-567 (Bebas Pulsa)</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-red-400 mt-0.5 shrink-0" />
                <a href="mailto:info@umbrellacorp.id" className="text-sm hover:text-white transition-colors">info@umbrellacorp.id</a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-red-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <div>Senin - Jumat: 07:00 - 21:00</div>
                  <div>Sabtu - Minggu: 08:00 - 18:00</div>
                  <div className="text-emerald-400 font-medium">IGD: 24 Jam</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2024 Umbrella Corporation. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privasi</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}