import { supabase } from "./supabase";
import { placeholderGallery, type GalleryItem } from "../data/galleryCategories";

export async function fetchGallery(opts: { featuredOnly?: boolean; limit?: number } = {}): Promise<GalleryItem[]> {
  if (!supabase) return applyOpts(placeholderGallery, opts);

  let q = supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
  if (opts.featuredOnly) q = q.eq("featured", true);
  if (opts.limit) q = q.limit(opts.limit);

  const { data, error } = await q;
  if (error || !data || data.length === 0) return applyOpts(placeholderGallery, opts);
  return data as GalleryItem[];
}

function applyOpts(items: GalleryItem[], opts: { featuredOnly?: boolean; limit?: number }) {
  let out = items;
  if (opts.featuredOnly) out = out.filter((i) => i.featured);
  if (opts.limit) out = out.slice(0, opts.limit);
  return out;
}
