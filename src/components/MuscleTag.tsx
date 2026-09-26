interface MuscleTagProps {
  label: string;
  /** lime filled (default) or dark outlined */
  variant?: "filled" | "outline";
}

export default function MuscleTag({
  label,
  variant = "filled",
}: MuscleTagProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-[3px]",
        variant === "filled"
          ? "bg-[var(--color-primary)] text-[var(--color-bg)]"
          : "border border-[var(--color-border)] text-[var(--color-muted)]",
      ].join(" ")}
    >
      {label}
    </span>
  );
}
