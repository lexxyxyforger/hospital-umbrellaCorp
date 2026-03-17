import { Suspense } from "react";
import { BookAppointmentContent } from "./BookAppointmentContent";

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Memuat halaman...</p>
        </div>
      </div>
    }>
      <BookAppointmentContent />
    </Suspense>
  );
}