import { galleryCategories } from "../data/galleryCategories";

export function GalleryFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const all = [{ id: "all", label: "All" }, ...galleryCategories];
  return (
    <div className="filters" role="group" aria-label="Filter projects by category">
      {all.map((c) => (
        <button key={c.id} type="button" aria-pressed={value === c.id} onClick={() => onChange(c.id)}>
          {c.label}
        </button>
      ))}
    </div>
  );
}
