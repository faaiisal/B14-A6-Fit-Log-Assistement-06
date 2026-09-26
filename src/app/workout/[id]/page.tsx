import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchWorkout } from "@/lib/api";
import MuscleTag from "@/components/MuscleTag";
import PlanButtons from "@/components/PlanButtons";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await fetchWorkout(id);
  if (!workout) return { title: "Workout Not Found" };
  return {
    title: workout.name,
    description: workout.description,
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await fetchWorkout(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: String(workout.sets) },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: String(workout.rating) },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* LEFT: image */}
        <div className="lg:w-[45%] flex-shrink-0">
          <div className="relative w-full aspect-[3/4] sm:aspect-square rounded-[4px] overflow-hidden bg-[var(--color-surface)]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        {/* RIGHT: details */}
        <div className="flex-1 min-w-0">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--color-text)] leading-none mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {workout.name}
          </h1>

          <p className="text-[var(--color-muted)] text-sm sm:text-base leading-relaxed mb-4">
            {workout.description}
          </p>

          {/* Muscle tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {workout.muscleGroups.map((group) => (
              <MuscleTag key={group} label={group} />
            ))}
          </div>

          {/* Specs table */}
          <div className="border border-[var(--color-border)] rounded-[4px] overflow-hidden mb-6">
            <dl>
              {specs.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={[
                    "flex items-center justify-between px-4 py-3",
                    i < specs.length - 1
                      ? "border-b border-[var(--color-border)]"
                      : "",
                    i % 2 === 0
                      ? "bg-[var(--color-surface-2)]"
                      : "bg-[var(--color-surface)]",
                  ].join(" ")}
                >
                  <dt
                    className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-[var(--color-text)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Instructions */}
          <section aria-labelledby="instructions-heading">
            <h2
              id="instructions-heading"
              className="text-lg font-black uppercase tracking-widest text-[var(--color-text)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              INSTRUCTIONS
            </h2>
            <ol className="space-y-2">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--color-muted)] leading-relaxed">
                  <span className="flex-shrink-0 font-bold text-[var(--color-primary)] w-5">
                    {i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Action buttons */}
          <PlanButtons workout={workout} />
        </div>
      </div>
    </div>
  );
}
