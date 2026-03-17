import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none" style={{ fontFamily: "var(--font-display)" }}>RS Sehat Prima</div>
                <div className="text-xs text-blue-400">Pelayanan Terbaik</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Rumah sakit modern dengan pelayanan kesehatan terpadu. Kami berkomitmen memberikan pelayanan terbaik untuk kesehatan Anda dan keluarga.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-semibold text-white mb-4">Layanan</h3>
            <ul className="space-y-2.5">
              {[
                ["Medical Checkup", "/services/medical-checkup"],
                ["Vaksinasi", "/services/vaksinasi"],
                ["IGD 24 Jam", "/services/igd-24-jam"],
                ["Poliklinik Spesialis", "/services"],
                ["Rawat Inap", "/services"],
                ["Laboratorium", "/services/laboratorium"],
                ["Radiologi", "/services/radiologi"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Link cepat */}
          <div>
            <h3 className="font-semibold text-white mb-4">Link Cepat</h3>
            <ul className="space-y-2.5">
              {[
                ["Daftar Dokter", "/doctors"],
                ["Buat Janji", "/appointment/book"],
                ["Artikel Kesehatan", "/blog"],
                ["Tentang Kami", "/about"],
                ["Karir", "/career"],
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

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm">Jl. Kesehatan No. 1, Jakarta Selatan, DKI Jakarta 12345</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+62215551234" className="text-sm hover:text-white transition-colors block">(021) 555-1234</a>
                  <a href="tel:+628001234567" className="text-xs text-slate-400 hover:text-white transition-colors">0800-1234-567 (Bebas Pulsa)</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <a href="mailto:info@rssehatprima.id" className="text-sm hover:text-white transition-colors">info@rssehatprima.id</a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-blue-400 mt-0.5 shrink-0" />
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

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2024 RS Sehat Prima. Seluruh hak cipta dilindungi.
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
