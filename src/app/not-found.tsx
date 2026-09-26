import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* 404 display */}
      <p
        className="text-[8rem] sm:text-[10rem] font-black leading-none text-[var(--color-surface-2)] select-none"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        404
      </p>

      <h1
        className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--color-text)] -mt-4 mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        PAGE NOT FOUND
      </h1>

      <p className="text-[var(--color-muted)] text-sm max-w-xs mb-8">
        That route doesn&#39;t exist. Head back to the library and pick a lift.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-primary)] text-[var(--color-bg)] text-sm font-bold uppercase tracking-wider rounded-[4px] hover:bg-[var(--color-primary-hover)] transition-colors"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Workout Library
      </Link>
    </div>
  );
}
