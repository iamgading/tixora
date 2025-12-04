import { CardSkeleton, Skeleton, TableRowSkeleton } from "@/components/ui/skeleton";

export default function EventDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="w-40 h-5" />
        <div className="flex gap-2">
          <Skeleton className="w-20 h-9 rounded-xl" />
          <Skeleton className="w-20 h-9 rounded-xl" />
        </div>
      </div>

      {/* Event Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 lg:p-8 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-64 h-8" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-3/4 h-5 mb-4" />
            <div className="flex gap-4">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-28 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-32 h-10 rounded-xl" />
            <Skeleton className="w-32 h-10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Registrations List */}
      <div className="bg-surface rounded-2xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <Skeleton className="w-28 h-5" />
          <div className="flex gap-2">
            <Skeleton className="w-48 h-9 rounded-xl" />
            <Skeleton className="w-24 h-9 rounded-xl" />
            <Skeleton className="w-28 h-9 rounded-xl" />
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-surface-hover">
            <tr>
              <th className="px-6 py-3"><Skeleton className="w-12 h-4" /></th>
              <th className="px-6 py-3"><Skeleton className="w-12 h-4" /></th>
              <th className="px-6 py-3"><Skeleton className="w-16 h-4" /></th>
              <th className="px-6 py-3"><Skeleton className="w-12 h-4" /></th>
              <th className="px-6 py-3"><Skeleton className="w-20 h-4" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </tbody>
        </table>
      </div>
    </div>
  );
}
