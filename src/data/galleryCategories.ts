export type GalleryCategory = { id: string; label: string };

export const galleryCategories: GalleryCategory[] = [
  { id: "decks", label: "Decks" },
  { id: "roofs", label: "Roofs" },
  { id: "additions", label: "Additions" },
  { id: "remodels", label: "Remodels" },
];

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image_urls: string[];
  description: string | null;
  featured: boolean;
  created_at?: string;
};

// Placeholder projects used until Supabase is connected and real photos are added.
export const placeholderGallery: GalleryItem[] = [
  { id: "p1", title: "Multi-Level Cedar Deck", category: "decks", image_urls: [], description: "Two-level deck with built-in seating and stair access to the yard.", featured: true },
  { id: "p2", title: "Full Roof Replacement", category: "roofs", image_urls: [], description: "Architectural shingle roof replacement with new flashing and ventilation.", featured: true },
  { id: "p3", title: "Family Room Addition", category: "additions", image_urls: [], description: "Rear addition matched to the home's existing rooflines and siding.", featured: true },
  { id: "p4", title: "Kitchen Remodel", category: "remodels", image_urls: [], description: "Opened floor plan, new cabinetry, and quartz counters.", featured: true },
  { id: "p5", title: "Lakeside Deck & Railing", category: "decks", image_urls: [], description: "Composite decking with cable railing to keep the view open.", featured: true },
  { id: "p6", title: "Primary Bath Remodel", category: "remodels", image_urls: [], description: "Walk-in tile shower, new vanity, and updated lighting.", featured: true },
  { id: "p7", title: "Garage Roof & Gutters", category: "roofs", image_urls: [], description: "Detached garage re-roof with new gutters and downspouts.", featured: false },
  { id: "p8", title: "Second-Story Addition", category: "additions", image_urls: [], description: "Added bedroom and bath above the existing garage.", featured: false },
];
