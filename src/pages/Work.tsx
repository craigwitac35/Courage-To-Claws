import { useEffect, useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { GalleryFilter } from "../components/GalleryFilter";
import { GalleryGrid } from "../components/GalleryGrid";
import { CTASection } from "../components/CTASection";
import { fetchGallery } from "../lib/gallery";
import type { GalleryItem } from "../data/galleryCategories";
import { useSeo } from "../lib/useSeo";

export function Work() {
  useSeo("Our Work", "Completed decks, roofs, additions, and remodels by Courage To Claws.");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery().then((d) => {
      setItems(d);
      setLoading(false);
    });
  }, []);

  const visible = useMemo(() => (filter === "all" ? items : items.filter((i) => i.category === filter)), [items, filter]);

  return (
    <>
      <PageHero eyebrow="Our work" title="Real Projects. Real Results." lead="Decks, roofs, additions, and remodels. Real photos from real jobs will fill this gallery as they're added." />
      <section className="section">
        <div className="container">
          <GalleryFilter value={filter} onChange={setFilter} />
          {loading ? <div className="empty">Loading projects…</div> : <GalleryGrid items={visible} />}
        </div>
      </section>
      <CTASection />
    </>
  );
}
