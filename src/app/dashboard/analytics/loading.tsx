import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Skeleton className="w-32 h-8 mb-2" />
        <Skeleton className="w-48 h-5" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-surface rounded-2xl border border-border p-5">
            <Skeleton className="w-10 h-10 rounded-xl mb-3" />
            <Skeleton className="w-16 h-8 mb-2" />
            <Skeleton className="w-24 h-4" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-2xl border border-border p-6">
          <Skeleton className="w-48 h-5 mb-4" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
        <div className="bg-surface rounded-2xl border border-border p-6">
          <Skeleton className="w-40 h-5 mb-4" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
