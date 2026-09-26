"use client";

import Image from "next/image";

export default function HeroSection() {
  function handleBrowse() {
    const el = document.getElementById("library");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <p
              className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WORKOUT LIBRARY
            </p>
            <h1
              className="font-black uppercase leading-none tracking-tight text-[var(--color-text)] mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>
            <p className="text-[var(--color-muted)] text-sm sm:text-base max-w-md leading-relaxed mb-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&#39;s plan, and watch the week&#39;s work add up.
            </p>
            <button
              type="button"
              onClick={handleBrowse}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] text-sm font-bold uppercase tracking-wider rounded-[4px] hover:bg-[var(--color-primary-hover)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BROWSE WORKOUTS
            </button>
          </div>

          {/* Right: banner image */}
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
              <Image
                src="/banner.png"
                alt="Athlete on workout equipment"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
