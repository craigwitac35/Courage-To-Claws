import type { GalleryItem } from "../data/galleryCategories";
import { ProjectCard } from "./ProjectCard";

export function GalleryGrid({ items, preview = false }: { items: GalleryItem[]; preview?: boolean }) {
  if (items.length === 0) {
    return <div className="empty">No projects in this category yet. Check back soon.</div>;
  }
  return (
    <div className={`gallery-grid${preview ? " gallery-grid--preview" : ""}`}>
      {items.map((item) => (
        <ProjectCard key={item.id} item={item} />
      ))}
    </div>
  );
}
