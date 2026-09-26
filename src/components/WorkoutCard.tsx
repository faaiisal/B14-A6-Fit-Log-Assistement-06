import Link from "next/link";
import Image from "next/image";
import MuscleTag from "@/components/MuscleTag";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[4px] overflow-hidden hover:border-[var(--color-primary)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
      aria-label={`View ${workout.name} workout details`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-surface-2)]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Muscle tags overlay */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {workout.muscleGroups.map((group) => (
            <MuscleTag key={group} label={group} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3
          className="font-bold text-sm uppercase tracking-wide text-[var(--color-text)] mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-[var(--color-muted)] mb-2 truncate">
          {workout.equipment}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
          <span className="flex items-center gap-1">
            {/* Clock icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            {/* Flame icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 14c-3 0-5-2-5-4.5C3 7 5 5.5 5 4c0 0 1 1 1 2.5C7.5 5.5 7 3 8 1c1.5 1.5 4 3.5 4 8.5 0 2.5-1.5 4.5-4 4.5z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 ml-auto">
            {/* Star icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 1l1.8 4H14l-3.3 2.6 1.3 4L8 9l-3.9 2.6 1.3-4L2 5h4.2L8 1z" />
            </svg>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
