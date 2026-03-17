import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import { Review } from "@/lib/data";

interface ReviewCardProps {
  review: Review;
  showDoctor?: boolean;
}

export function ReviewCard({ review, showDoctor = false }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5 hover:card-shadow-hover transition-all">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
          />
        ))}
        <span className="text-xs text-slate-500 ml-1">{review.rating}.0</span>
      </div>

      {/* Comment */}
      <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
        "{review.comment}"
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        <Image
          src={review.patientPhoto}
          alt={review.patientName}
          width={36}
          height={36}
          className="rounded-full shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-800 truncate">{review.patientName}</span>
            {review.isVerified && (
              <BadgeCheck size={14} className="text-emerald-500 shrink-0" />
            )}
          </div>
          <div className="text-xs text-slate-400">
            {new Date(review.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
