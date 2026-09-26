export default function WorkoutCardSkeleton() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] overflow-hidden">
      {/* Image skeleton */}
      <div className="skeleton aspect-[16/10] w-full" aria-hidden="true" />
      {/* Content skeleton */}
      <div className="p-3 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded-[2px]" aria-hidden="true" />
        <div className="skeleton h-3 w-1/2 rounded-[2px]" aria-hidden="true" />
        <div className="flex gap-3 pt-1">
          <div className="skeleton h-3 w-14 rounded-[2px]" aria-hidden="true" />
          <div className="skeleton h-3 w-16 rounded-[2px]" aria-hidden="true" />
          <div className="skeleton h-3 w-8 rounded-[2px] ml-auto" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
