import { supabase } from "./supabase";
import { placeholderGallery, type GalleryItem } from "../data/galleryCategories";

export type GalleryResult = {
  items: GalleryItem[];
  /** "live" = from Supabase, "placeholder" = no backend configured, "error" = backend failed */
  source: "live" | "placeholder" | "error";
};

export async function fetchGallery(opts: { featuredOnly?: boolean; limit?: number } = {}): Promise<GalleryResult> {
  if (!supabase) return { items: applyOpts(placeholderGallery, opts), source: "placeholder" };

  let q = supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
  if (opts.featuredOnly) q = q.eq("featured", true);
  if (opts.limit) q = q.limit(opts.limit);

  const { data, error } = await q;
  if (error) {
    console.error("gallery fetch failed", error);
    return { items: [], source: "error" };
  }
  return { items: (data ?? []) as GalleryItem[], source: "live" };
}

function applyOpts(items: GalleryItem[], opts: { featuredOnly?: boolean; limit?: number }) {
  let out = items;
  if (opts.featuredOnly) out = out.filter((i) => i.featured);
  if (opts.limit) out = out.slice(0, opts.limit);
  return out;
}
