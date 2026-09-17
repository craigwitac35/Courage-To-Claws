// Placeholder image block. Swap for <img> once real photography is available.
export function Placeholder({ label, tone = "default", className = "" }: { label: string; tone?: "default" | "sky" | "dark"; className?: string }) {
  const toneClass = tone === "sky" ? " ph--sky" : tone === "dark" ? " ph--dark" : "";
  return (
    <div className={`ph${toneClass} ${className}`} role="img" aria-label={`Placeholder: ${label}`}>
      <div className="ph__grid" />
      <span className="ph__label">Photo: {label}</span>
    </div>
  );
}
