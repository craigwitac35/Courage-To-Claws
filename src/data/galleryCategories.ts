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
  published?: boolean;
  created_at?: string;
};

// Placeholder projects used until Supabase is connected and real photos are added.
// Generic placeholders shown only until Troy uploads real projects — kept
// deliberately non-specific so nobody mistakes them for actual jobs.
export const placeholderGallery: GalleryItem[] = [
  { id: "p1", title: "Deck", category: "decks", image_urls: [], description: null, featured: true },
  { id: "p2", title: "Roof", category: "roofs", image_urls: [], description: null, featured: true },
  { id: "p3", title: "Addition", category: "additions", image_urls: [], description: null, featured: true },
  { id: "p4", title: "Remodel", category: "remodels", image_urls: [], description: null, featured: true },
  { id: "p5", title: "Deck", category: "decks", image_urls: [], description: null, featured: false },
  { id: "p6", title: "Remodel", category: "remodels", image_urls: [], description: null, featured: false },
];
