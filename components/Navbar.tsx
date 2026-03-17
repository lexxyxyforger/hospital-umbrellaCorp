"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Bell, User, LogOut,
  Calendar, Heart, Home, Stethoscope, BookOpen,
  Phone, Search
} from "lucide-react";
import { getFromLS, LS_KEYS } from "@/lib/data";

const NAV_LINKS = [
  { label: "Beranda", href: "/", icon: Home },
  {
    label: "Dokter",
    href: "/doctors",
    icon: Stethoscope,
    sub: [
      { label: "Semua Dokter", href: "/doctors" },
      { label: "Dokter Populer", href: "/doctors?filter=popular" },
      { label: "Dokter Rekomendasi", href: "/doctors?filter=recommended" },
      { label: "Spesialis", href: "/doctors?view=specialty" },
    ],
  },
  {
    label: "Layanan",
    href: "/services",
    icon: Heart,
    sub: [
      { label: "Medical Checkup", href: "/services/medical-checkup" },
      { label: "Vaksinasi", href: "/services/vaksinasi" },
      { label: "IGD 24 Jam", href: "/services/igd-24-jam" },
      { label: "Semua Layanan", href: "/services" },
    ],
  },
  { label: "Artikel", href: "/blog", icon: BookOpen },
  { label: "Kontak", href: "/contact", icon: Phone },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [patient, setPatient] = useState<{ name: string } | null>(null);
  const [notifCount, setNotifCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const p = getFromLS(LS_KEYS.PATIENT, null);
    setPatient(p);
    const notifs = getFromLS(LS_KEYS.NOTIFICATIONS, []);
    const unread = (notifs as Array<{ isRead: boolean }>).filter((n) => !n.isRead).length;
    setNotifCount(unread);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(LS_KEYS.PATIENT);
    setPatient(null);
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.jpg"
              alt="RS Umbrella Corp"
              width={40}
              height={40}
              className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity"
              priority
            />
            <div>
              <div className="font-bold text-lg text-slate-900 leading-none" style={{ fontFamily: "var(--font-display)" }}>
                RS Umbrella Corp
              </div>
              <div className="text-xs text-blue-600 font-medium">Pelayanan Terbaik</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                  {link.sub && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.sub && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                    {link.sub.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all"
            >
              <Search size={20} />
            </Link>

            {patient ? (
              <>
                <Link href="/dashboard/notifications" className="relative p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all">
                  <Bell size={20} />
                  {notifCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-all">
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{patient.name.split(" ")[0]}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                      <User size={15} /> Dashboard
                    </Link>
                    <Link href="/dashboard/appointments" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                      <Calendar size={15} /> Janji Saya
                    </Link>
                    <Link href="/dashboard/favorites" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                      <Heart size={15} /> Favorit
                    </Link>
                    <hr className="border-slate-100" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                      <LogOut size={15} /> Keluar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/appointment/book"
                  className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                >
                  Buat Janji
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-slate-100 mt-2">
            <div className="pt-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                </div>
              ))}
              <div className="pt-2 flex gap-2">
                {patient ? (
                  <>
                    <Link href="/dashboard" className="flex-1 text-center py-2.5 rounded-xl border border-blue-600 text-blue-600 text-sm font-medium" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="flex-1 text-center py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium" onClick={() => setIsOpen(false)}>
                      Masuk
                    </Link>
                    <Link href="/appointment/book" className="flex-1 text-center py-2.5 rounded-xl gradient-primary text-white text-sm font-medium" onClick={() => setIsOpen(false)}>
                      Buat Janji
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}