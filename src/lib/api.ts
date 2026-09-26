import type { Workout } from "@/types/workout";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.status}`);
  }
  return res.json() as Promise<Workout[]>;
}

export async function fetchWorkout(id: number | string): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, { next: { revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch workout ${id}: ${res.status}`);
  }
  return res.json() as Promise<Workout>;
}
