"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  const planCount = plan.length;
  const savedCount = saved.length;

  const navLinks = [
    { href: "/", label: "Workouts" },
    { href: "/my-plan", label: "My Plan" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="FitLog home"
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={24}
            height={24}
            className="w-6 h-6"
            priority
          />
          <span
            className="font-display text-[var(--color-primary)] text-lg font-bold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FITLOG
          </span>
        </Link>

        {/* Desktop center nav */}
        <ul className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "text-sm font-medium transition-colors duration-150 px-1 py-0.5",
                    active
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)]",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop right: counters */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            aria-label={`Plan: ${planCount} workout${planCount !== 1 ? "s" : ""}`}
          >
            <span className="text-[var(--color-muted)]">Plan</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-bg)] text-xs font-bold leading-none">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            aria-label={`Saved: ${savedCount} workout${savedCount !== 1 ? "s" : ""}`}
          >
            <span className="text-[var(--color-muted)]">Saved</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text)] text-xs font-bold leading-none">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile: counter badges + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1 text-xs font-medium text-[var(--color-muted)]"
            aria-label={`Plan: ${planCount}`}
          >
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-primary)] text-[var(--color-bg)] text-[10px] font-bold">
              {planCount}
            </span>
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      "block px-2 py-2 text-sm font-medium rounded-[4px] transition-colors",
                      active
                        ? "text-[var(--color-primary)] bg-[var(--color-surface-2)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center gap-4">
            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-sm text-[var(--color-muted)]"
            >
              Plan
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-bg)] text-xs font-bold">
                {planCount}
              </span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-sm text-[var(--color-muted)]"
            >
              Saved
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text)] text-xs font-bold">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
