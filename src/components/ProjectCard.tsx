import { useState } from "react";
import type { GalleryItem } from "../data/galleryCategories";
import { galleryCategories } from "../data/galleryCategories";
import { Placeholder } from "./Placeholder";

// Tap to flip. Front = cover photo + category/title. Back = description.
// Cards with no description don't flip; they're just a photo.
export function ProjectCard({ item }: { item: GalleryItem }) {
  const [flipped, setFlipped] = useState(false);
  const cat = galleryCategories.find((c) => c.id === item.category)?.label ?? item.category;
  const img = item.image_urls?.[0];
  const canFlip = Boolean(item.description);

  const front = (
    <>
      {img ? <img src={img} alt={item.title} loading="lazy" /> : <Placeholder label={item.title} />}
      <div className="project-card__overlay">
        <span className="project-card__cat">{cat}</span>
        <h3 className="project-card__title">{item.title}</h3>
        {canFlip && <span className="project-card__hint">Tap for details</span>}
      </div>
    </>
  );

  if (!canFlip) {
    return <article className="project-card">{front}</article>;
  }

  return (
    <article className={`project-card project-card--flip${flipped ? " is-flipped" : ""}`}>
      <button
        type="button"
        className="project-card__btn"
        aria-pressed={flipped}
        aria-label={`${item.title}: ${flipped ? "hide" : "show"} details`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="project-card__inner">
          <div className="project-card__face project-card__front">{front}</div>
          <div className="project-card__face project-card__back">
            <span className="project-card__cat">{cat}</span>
            <h3 className="project-card__title">{item.title}</h3>
            <p className="project-card__desc">{item.description}</p>
            <span className="project-card__hint">Tap to go back</span>
          </div>
        </div>
      </button>
    </article>
  );
}
