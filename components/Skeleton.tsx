export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
        <div className="h-3 bg-slate-200 rounded-lg w-1/2" />
        <div className="flex gap-2 mt-2">
          <div className="h-3 bg-slate-200 rounded-lg w-16" />
          <div className="h-3 bg-slate-200 rounded-lg w-16" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-slate-200 rounded-xl flex-1" />
          <div className="h-9 bg-slate-200 rounded-xl w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 card-shadow p-5 flex gap-4 animate-pulse">
      <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
        <div className="h-3 bg-slate-200 rounded-lg w-1/3" />
        <div className="flex gap-3">
          <div className="h-3 bg-slate-200 rounded-lg w-20" />
          <div className="h-3 bg-slate-200 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 bg-slate-200 rounded-lg ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" };
  return <div className={`${sizes[size]} rounded-full bg-slate-200 animate-pulse shrink-0`} />;
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-56 bg-slate-200" />
      <div className="p-5">
        <div className="h-5 bg-slate-200 rounded-lg w-3/4 mb-2" />
        <div className="h-3.5 bg-slate-200 rounded-lg w-1/2 mb-4" />
        <div className="flex gap-1 mb-3">
          {[1,2,3,4,5].map((s) => <div key={s} className="w-4 h-4 bg-slate-200 rounded" />)}
        </div>
        <div className="h-10 bg-slate-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}
