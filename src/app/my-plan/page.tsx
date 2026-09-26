"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import type { PlanWorkout } from "@/types/workout";
import type { Workout } from "@/types/workout";

// Note: Metadata exports must be in server components.
// Since this page needs client interactivity, metadata is set in a separate layout
// or via a server component wrapper. For this client page we rely on the root metadata.

type Tab = "plan" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

function sortByKey<T extends { duration: number; caloriesBurned: number; rating: number }>(
  list: T[],
  key: SortKey
): T[] {
  return [...list].sort((a, b) =>
    key === "rating" || key === "caloriesBurned" ? b[key] - a[key] : a[key] - b[key]
  );
}

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [sortOpen, setSortOpen] = useState(false);
  const {
    plan,
    saved,
    isLoaded,
    removeFromPlan,
    markAsDone,
    removeSaved,
    isPlanFull,
  } = usePlan();
  const { showToast } = useToast();

  const totalMinutes = plan.reduce((acc: number, w: PlanWorkout) => acc + w.duration, 0);
  const totalCalories = plan.reduce((acc: number, w: PlanWorkout) => acc + w.caloriesBurned, 0);

  const sortedPlan = sortByKey(plan, sortKey);
  const sortedSaved = sortByKey(saved, sortKey);
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortKey)?.label ?? "Duration";

  function handleMarkDone(workout: PlanWorkout) {
    markAsDone(workout.id);
    showToast(
      workout.done
        ? `${workout.name} marked as not done.`
        : `${workout.name} marked as done! 💪`,
      workout.done ? "info" : "success"
    );
  }

  function handleRemoveFromPlan(workout: PlanWorkout) {
    removeFromPlan(workout.id);
    showToast(`${workout.name} removed from plan.`, "info");
  }

  function handleRemoveSaved(workout: Workout) {
    removeSaved(workout.id);
    showToast(`${workout.name} removed from saved.`, "info");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--color-text)] leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          MY PLAN
        </h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        {[
          { label: "Exercises", value: plan.length },
          { label: "Minutes", value: totalMinutes },
          { label: "Calories", value: totalCalories },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] px-4 py-4 text-center"
          >
            <div
              className="text-3xl sm:text-4xl font-black text-[var(--color-primary)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value}
            </div>
            <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider mt-1 font-medium">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Plan full banner */}
      {isPlanFull && (
        <div className="mb-6 px-4 py-3 border border-[var(--color-primary)] bg-[var(--color-primary)]/5 rounded-[4px] flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 3v5M8 10.5v1"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-xs font-medium text-[var(--color-primary)]">
            Today&#39;s plan is full — 5 workout maximum. Remove one to add
            another.
          </p>
        </div>
      )}

      {/* Tabs + Sort By */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] mb-6">
        <div className="flex">
          {(
            [
              { key: "plan" as Tab, label: "Today's Plan", count: plan.length },
              { key: "saved" as Tab, label: "Saved", count: saved.length },
            ] as const
          ).map(({ key, label, count }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => setActiveTab(key)}
              className={[
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors duration-150",
                activeTab === key
                  ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              {label}
              <span
                className={[
                  "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold leading-none",
                  activeTab === key
                    ? "bg-[var(--color-primary)] text-[var(--color-bg)]"
                    : "bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]",
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative mb-2">
          <button
            type="button"
            onClick={() => setSortOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            aria-label={`Sort by: ${currentSortLabel}`}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] text-sm text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
          >
            <span className="text-[var(--color-muted)] text-xs font-medium uppercase tracking-wider mr-1">
              Sort By
            </span>
            <span className="font-medium">{currentSortLabel}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className={`transition-transform duration-150 ${sortOpen ? "rotate-180" : ""}`}
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

          {sortOpen && (
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
                      setSortOpen(false);
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

      {/* Tab panels */}
      {!isLoaded ? (
        <p className="py-16 text-center text-sm text-[var(--color-muted)]">
          Loading workouts…
        </p>
      ) : (
        <>
          {activeTab === "plan" && (
            <div role="tabpanel" aria-label="Today's plan">
              {sortedPlan.length === 0 ? (
                <EmptyState />
              ) : (
                <ul className="space-y-3">
                  {sortedPlan.map((workout) => (
                    <li key={workout.id}>
                      <PlanCard
                        workout={workout}
                        onMarkDone={() => handleMarkDone(workout)}
                        onRemove={() => handleRemoveFromPlan(workout)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "saved" && (
            <div role="tabpanel" aria-label="Saved workouts">
              {sortedSaved.length === 0 ? (
                <EmptyState />
              ) : (
                <ul className="space-y-3">
                  {sortedSaved.map((workout) => (
                    <li key={workout.id}>
                      <SavedCard
                        workout={workout}
                        onRemove={() => handleRemoveSaved(workout)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── Plan card ── */
function PlanCard({
  workout,
  onMarkDone,
  onRemove,
}: {
  workout: PlanWorkout;
  onMarkDone: () => void;
  onRemove: () => void;
}) {
  return (
    <article
      className={[
        "bg-[var(--color-surface)] border rounded-[4px] overflow-hidden flex flex-col sm:flex-row transition-all duration-200",
        workout.done
          ? "border-[var(--color-primary)]/30 opacity-70"
          : "border-[var(--color-border)]",
      ].join(" ")}
      aria-label={`${workout.name}${workout.done ? " (done)" : ""}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-28 h-24 sm:h-auto flex-shrink-0 bg-[var(--color-surface-2)]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className={`object-cover transition-all duration-200 ${workout.done ? "grayscale" : ""}`}
          sizes="(max-width: 640px) 100vw, 112px"
        />
        {workout.done && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12l5 5L19 7"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className={[
                "font-bold uppercase text-sm tracking-wide leading-tight",
                workout.done
                  ? "line-through text-[var(--color-muted)]"
                  : "text-[var(--color-text)]",
              ].join(" ")}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {workout.name}
            </h3>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              {workout.equipment}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <Link
            href={`/workout/${workout.id}`}
            className="text-xs font-medium text-[var(--color-primary)] border border-[var(--color-primary)]/30 px-2.5 py-1.5 rounded-[3px] hover:border-[var(--color-primary)] transition-colors"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={onMarkDone}
            className={[
              "text-xs font-medium px-2.5 py-1.5 rounded-[3px] border transition-colors",
              workout.done
                ? "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
            ].join(" ")}
            aria-label={
              workout.done
                ? `Mark ${workout.name} as not done`
                : `Mark ${workout.name} as done`
            }
          >
            {workout.done ? "Undo" : "Mark as Done"}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium px-2.5 py-1.5 rounded-[3px] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-red-600 hover:text-red-400 transition-colors"
            aria-label={`Remove ${workout.name} from plan`}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Saved card ── */
function SavedCard({
  workout,
  onRemove,
}: {
  workout: Workout;
  onRemove: () => void;
}) {
  return (
    <article
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] overflow-hidden flex flex-col sm:flex-row"
      aria-label={workout.name}
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-28 h-24 sm:h-auto flex-shrink-0 bg-[var(--color-surface-2)]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 112px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col gap-2">
        <div>
          <h3
            className="font-bold uppercase text-sm tracking-wide text-[var(--color-text)] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {workout.name}
          </h3>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            {workout.equipment}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <Link
            href={`/workout/${workout.id}`}
            className="text-xs font-medium text-[var(--color-primary)] border border-[var(--color-primary)]/30 px-2.5 py-1.5 rounded-[3px] hover:border-[var(--color-primary)] transition-colors"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium px-2.5 py-1.5 rounded-[3px] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-red-600 hover:text-red-400 transition-colors"
            aria-label={`Remove ${workout.name} from saved`}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div className="py-16 flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="var(--color-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <h2
          className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          NOTHING HERE YET
        </h2>
        <p className="text-xs text-[var(--color-muted)] mt-1 max-w-xs">
          Browse the library and add a lift to get today moving.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] text-xs font-bold uppercase tracking-wider rounded-[4px] hover:bg-[var(--color-primary-hover)] transition-colors"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Go to Workouts
      </Link>
    </div>
  );
}
