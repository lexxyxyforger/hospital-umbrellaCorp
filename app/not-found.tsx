import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gradient mb-4" style={{ fontFamily: "var(--font-display)" }}>
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-500 mb-8">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="px-5 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
            Kembali ke Beranda
          </Link>
          <Link href="/doctors" className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-blue-300 hover:text-blue-600 transition-all">
            Cari Dokter
          </Link>
        </div>
      </div>
    </div>
  );
}
