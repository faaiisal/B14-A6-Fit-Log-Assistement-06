"use client";

import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import type { Workout } from "@/types/workout";

interface PlanButtonsProps {
  workout: Workout;
}

export default function PlanButtons({ workout }: PlanButtonsProps) {
  const { addToPlan, saveWorkout, isInPlan, isSaved, isPlanFull } = usePlan();
  const { showToast } = useToast();

  const inPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  function handleAddToPlan() {
    if (inPlan) {
      showToast("Already in today's plan.", "info");
      return;
    }
    if (isPlanFull) {
      showToast("Today's plan is full (5 max). Remove one first.", "error");
      return;
    }
    addToPlan(workout);
    showToast(`${workout.name} added to today's plan!`);
  }

  function handleSave() {
    if (alreadySaved) {
      showToast("Already saved.", "info");
      return;
    }
    saveWorkout(workout);
    showToast(`${workout.name} saved for later!`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={isPlanFull && !inPlan}
        aria-label={
          inPlan
            ? "Already in today's plan"
            : isPlanFull
              ? "Plan is full — 5 workout maximum"
              : `Add ${workout.name} to today's plan`
        }
        className={[
          "flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] text-sm font-bold uppercase tracking-wider transition-all duration-150 flex-1 sm:flex-initial",
          inPlan
            ? "bg-[var(--color-surface-2)] border border-[var(--color-primary)] text-[var(--color-primary)] cursor-default"
            : isPlanFull
              ? "bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-muted)] cursor-not-allowed opacity-60"
              : "bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)]",
        ].join(" ")}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {/* Calendar icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="1.5"
            y="2.5"
            width="13"
            height="12"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M1.5 6.5h13M5 1v3M11 1v3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        {inPlan
          ? "In Today's Plan"
          : isPlanFull
            ? "Plan Full (5 max)"
            : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        disabled={alreadySaved}
        aria-label={
          alreadySaved
            ? "Already saved for later"
            : `Save ${workout.name} for later`
        }
        className={[
          "flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] text-sm font-bold uppercase tracking-wider transition-all duration-150 flex-1 sm:flex-initial",
          alreadySaved
            ? "border border-[var(--color-primary)] text-[var(--color-primary)] cursor-default opacity-70"
            : "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
        ].join(" ")}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {/* Bookmark icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={alreadySaved ? "currentColor" : "none"}
          aria-hidden="true"
        >
          <path
            d="M3 2h10v13l-5-3-5 3V2z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        {alreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
