import { CardSkeleton, EventRowSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Skeleton className="w-32 h-8 mb-2" />
          <Skeleton className="w-48 h-5" />
        </div>
        <Skeleton className="w-32 h-10 rounded-xl" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Events List */}
      <div className="bg-surface rounded-2xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <Skeleton className="w-24 h-5" />
        </div>
        <div className="divide-y divide-border">
          <EventRowSkeleton />
          <EventRowSkeleton />
          <EventRowSkeleton />
        </div>
      </div>
    </div>
  );
}
