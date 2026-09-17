import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGallery } from "../lib/gallery";
import type { GalleryItem } from "../data/galleryCategories";
import { GalleryGrid } from "./GalleryGrid";
import { Icon } from "./Icons";

export function GalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  useEffect(() => {
    fetchGallery({ featuredOnly: true, limit: 6 }).then(setItems);
  }, []);

  return (
    <section className="section section--gray" aria-labelledby="work-title" id="our-work">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Our work</p>
          <h2 id="work-title" className="h-xl">
            Real Projects. Real Results.
          </h2>
          <p className="lead" style={{ marginTop: "1rem" }}>
            Take a look at some of our recent work across decks, roofing, additions, and remodels.
          </p>
        </div>
        <div className="reveal">
          <GalleryGrid items={items} preview />
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link to="/our-work" className="btn btn--primary">
            View Full Gallery <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
