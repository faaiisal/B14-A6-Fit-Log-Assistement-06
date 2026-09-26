"use client";

import { useState, useMemo } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

type SortKey = "duration" | "caloriesBurned" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

interface WorkoutLibraryProps {
  workouts: Workout[];
}

export default function WorkoutLibrary({ workouts }: WorkoutLibraryProps) {
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [open, setOpen] = useState(false);

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortKey === "rating" || sortKey === "caloriesBurned") {
        return b[sortKey] - a[sortKey];
      }
      return a[sortKey] - b[sortKey];
    });
  }, [workouts, sortKey]);

  const currentLabel =
    SORT_OPTIONS.find((o) => o.value === sortKey)?.label ?? "Duration";

  return (
    <section id="library" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE LIBRARY
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Sort by: ${currentLabel}`}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
          >
            <span className="text-[var(--color-muted)] text-xs font-medium uppercase tracking-wider mr-1">
              Sort By
            </span>
            <span className="font-medium">{currentLabel}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {open && (
            <ul
              role="listbox"
              aria-label="Sort options"
              className="absolute right-0 top-full mt-1 z-20 min-w-[140px] bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[4px] py-1 shadow-xl"
            >
              {SORT_OPTIONS.map((opt) => (
                <li key={opt.value} role="option" aria-selected={sortKey === opt.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setSortKey(opt.value);
                      setOpen(false);
                    }}
                    className={[
                      "w-full text-left px-3 py-2 text-sm transition-colors",
                      sortKey === opt.value
                        ? "text-[var(--color-primary)] bg-[var(--color-surface)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
