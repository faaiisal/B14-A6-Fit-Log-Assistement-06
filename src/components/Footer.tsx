import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog home"
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span
            className="font-bold tracking-widest text-sm text-[var(--color-primary)] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-[var(--color-muted)] text-xs text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
