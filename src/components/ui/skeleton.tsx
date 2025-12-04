export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`animate-pulse bg-surface-hover rounded-lg ${className}`} 
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-border p-5">
      <Skeleton className="w-10 h-10 rounded-xl mb-3" />
      <Skeleton className="w-16 h-8 mb-2" />
      <Skeleton className="w-24 h-4" />
    </div>
  );
}

export function EventRowSkeleton() {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Skeleton className="w-48 h-5" />
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
      <Skeleton className="w-5 h-5" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-6 py-4"><Skeleton className="w-32 h-5" /></td>
      <td className="px-6 py-4"><Skeleton className="w-40 h-5" /></td>
      <td className="px-6 py-4"><Skeleton className="w-28 h-5" /></td>
      <td className="px-6 py-4"><Skeleton className="w-20 h-6 rounded-full" /></td>
      <td className="px-6 py-4"><Skeleton className="w-32 h-5" /></td>
    </tr>
  );
}
