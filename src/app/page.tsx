import type { Metadata } from "next";
import type { Workout } from "@/types/workout";
import HeroSection from "@/components/HeroSection";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { fetchWorkouts } from "@/lib/api";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "Browse twelve lifts covering every major muscle group. Build your daily workout plan with FitLog.",
};

export default async function HomePage() {
  let workouts: Workout[];
  let error: string | null = null;

  try {
    workouts = await fetchWorkouts();
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load workouts. Please try again.";
    workouts = [];
  }

  return (
    <>
      <HeroSection />
      {error ? (
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto" id="library">
          <div className="border border-red-800 bg-red-950/30 rounded-[4px] p-6 text-center">
            <p className="text-red-400 font-medium">{error}</p>
            <p className="text-[var(--color-muted)] text-sm mt-1">
              Check your connection and refresh.
            </p>
          </div>
        </section>
      ) : (
        <WorkoutLibrary workouts={workouts} />
      )}
    </>
  );
}