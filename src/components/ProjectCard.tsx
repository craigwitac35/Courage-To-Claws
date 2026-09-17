import type { GalleryItem } from "../data/galleryCategories";
import { galleryCategories } from "../data/galleryCategories";
import { Placeholder } from "./Placeholder";

export function ProjectCard({ item }: { item: GalleryItem }) {
  const cat = galleryCategories.find((c) => c.id === item.category)?.label ?? item.category;
  const img = item.image_urls?.[0];
  return (
    <article className="project-card" tabIndex={0}>
      {img ? <img src={img} alt={item.title} loading="lazy" /> : <Placeholder label={item.title} />}
      <div className="project-card__overlay">
        <span className="project-card__cat">{cat}</span>
        <h3 className="project-card__title">{item.title}</h3>
        {item.description && <p className="project-card__desc">{item.description}</p>}
      </div>
    </article>
  );
}
