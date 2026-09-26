import WorkoutCardSkeleton from "@/components/WorkoutCardSkeleton";

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 space-y-4">
              <div className="skeleton h-3 w-32 rounded-[2px]" />
              <div className="skeleton h-12 w-3/4 rounded-[2px]" />
              <div className="skeleton h-12 w-2/3 rounded-[2px]" />
              <div className="skeleton h-4 w-full max-w-md rounded-[2px]" />
              <div className="skeleton h-4 w-4/5 max-w-md rounded-[2px]" />
              <div className="skeleton h-10 w-40 rounded-[4px]" />
            </div>
            <div className="skeleton w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-[4px] flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* Library skeleton */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="skeleton h-9 w-48 rounded-[2px]" />
            <div className="skeleton h-4 w-64 rounded-[2px]" />
          </div>
          <div className="skeleton h-9 w-36 rounded-[4px]" />
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Loading workouts"
          aria-busy="true"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <WorkoutCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
}
