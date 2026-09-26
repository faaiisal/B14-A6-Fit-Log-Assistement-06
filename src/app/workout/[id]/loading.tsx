export default function WorkoutLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image skeleton */}
        <div className="lg:w-[45%] flex-shrink-0">
          <div className="skeleton w-full aspect-[3/4] sm:aspect-square rounded-[4px]" />
        </div>

        {/* Details skeleton */}
        <div className="flex-1 space-y-4">
          <div className="skeleton h-10 w-3/4 rounded-[2px]" />
          <div className="skeleton h-4 w-full rounded-[2px]" />
          <div className="skeleton h-4 w-4/5 rounded-[2px]" />
          <div className="flex gap-2 mt-2">
            <div className="skeleton h-5 w-16 rounded-[3px]" />
            <div className="skeleton h-5 w-16 rounded-[3px]" />
          </div>
          {/* Specs table skeleton */}
          <div className="border border-[var(--color-border)] rounded-[4px] overflow-hidden mt-4">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={[
                  "flex items-center justify-between px-4 py-3",
                  i < 6 ? "border-b border-[var(--color-border)]" : "",
                  i % 2 === 0 ? "bg-[var(--color-surface-2)]" : "bg-[var(--color-surface)]",
                ].join(" ")}
              >
                <div className="skeleton h-3 w-24 rounded-[2px]" />
                <div className="skeleton h-3 w-20 rounded-[2px]" />
              </div>
            ))}
          </div>
          {/* Instructions skeleton */}
          <div className="space-y-2 pt-2">
            <div className="skeleton h-5 w-32 rounded-[2px]" />
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="skeleton h-4 w-full rounded-[2px]" />
            ))}
          </div>
          {/* Buttons skeleton */}
          <div className="flex gap-3 pt-4">
            <div className="skeleton h-12 w-48 rounded-[4px]" />
            <div className="skeleton h-12 w-40 rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
