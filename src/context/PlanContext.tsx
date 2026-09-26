"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Workout, PlanWorkout } from "@/types/workout";

const PLAN_STORAGE_KEY = "fitlog_plan";
const SAVED_STORAGE_KEY = "fitlog_saved";
const MAX_PLAN_SIZE = 5;

interface PlanContextValue {
  plan: PlanWorkout[];
  saved: Workout[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isPlanFull: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  // Start empty so server + first client render match exactly (no hydration
  // mismatch). Real localStorage data is loaded right after mount below.
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load once on mount (client only).
  useEffect(() => {
    setPlan(readStorage<PlanWorkout[]>(PLAN_STORAGE_KEY, []));
    setSaved(readStorage<Workout[]>(SAVED_STORAGE_KEY, []));
    setIsLoaded(true);
  }, []);

  // Persist plan (skip until the initial load above has run, otherwise we'd
  // overwrite real storage with an empty array on first mount).
  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan, isLoaded]);

  // Persist saved
  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, isLoaded]);

  const addToPlan = useCallback((workout: Workout) => {
    setPlan((prev) => {
      if (prev.length >= MAX_PLAN_SIZE) return prev;
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, { ...workout, done: false }];
    });
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const markAsDone = useCallback((id: number) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
  }, []);

  const saveWorkout = useCallback((workout: Workout) => {
    setSaved((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  }, []);

  const removeSaved = useCallback((id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const isInPlan = useCallback(
    (id: number) => plan.some((w) => w.id === id),
    [plan]
  );

  const isSaved = useCallback(
    (id: number) => saved.some((w) => w.id === id),
    [saved]
  );

  const isPlanFull = plan.length >= MAX_PLAN_SIZE;

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        isLoaded,
        addToPlan,
        removeFromPlan,
        markAsDone,
        saveWorkout,
        removeSaved,
        isInPlan,
        isSaved,
        isPlanFull,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return ctx;
}
