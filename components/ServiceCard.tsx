import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { MedicalService } from "@/lib/data";

interface ServiceCardProps {
  service: MedicalService;
  variant?: "default" | "compact";
}

const CATEGORY_ICONS: Record<string, string> = {
  stethoscope: "🩺", syringe: "💉", ambulance: "🚑",
  heart: "❤️", flask: "🧪", scan: "🔬",
};

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">
          {CATEGORY_ICONS[service.icon] || "🏥"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-600 transition-colors">
            {service.name}
          </div>
          {service.price > 0 && (
            <div className="text-xs text-blue-600 font-medium">
              Rp {service.price.toLocaleString("id-ID")}
            </div>
          )}
        </div>
        <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
      </Link>
    );
  }

  return (
    <Link
      href={`/services/${service.slug}`}
      className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 p-5 group block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:bg-blue-100 transition-colors">
          {CATEGORY_ICONS[service.icon] || "🏥"}
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {service.category}
        </span>
      </div>
      <h3 className="font-semibold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
        {service.name}
      </h3>
      <p className="text-xs text-slate-500 line-clamp-2 mb-3">{service.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div>
          {service.price > 0 ? (
            <span className="text-sm font-bold text-blue-600">
              Rp {service.price.toLocaleString("id-ID")}
            </span>
          ) : (
            <span className="text-sm font-bold text-emerald-600">24 Jam</span>
          )}
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
            <Clock size={10} /> {service.duration}
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">
          Detail <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
