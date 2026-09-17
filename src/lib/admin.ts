import { supabase } from "./supabase";
import type { GalleryItem } from "../data/galleryCategories";
import { toJpeg } from "./image";

export type AdminGalleryItem = GalleryItem & { published: boolean };

export type Lead = {
  id: string;
  project_type: string;
  location: string;
  description: string | null;
  photo_urls: string[];
  name: string;
  phone: string;
  email: string;
  preferred_contact: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

const GALLERY_BUCKET = "gallery";
const QUOTE_BUCKET = "quote-photos";

function client() {
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

/* ---------- auth ---------- */

export async function sendMagicLink(email: string) {
  const { error } = await client().auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/admin` },
  });
  if (error) throw error;
}

export async function signOut() {
  await client().auth.signOut();
}

/* ---------- gallery ---------- */

export async function listGalleryAdmin(): Promise<AdminGalleryItem[]> {
  const { data, error } = await client().from("gallery_items").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as AdminGalleryItem[];
}

export async function uploadGalleryPhotos(files: File[], onProgress?: (done: number, total: number) => void): Promise<string[]> {
  const sb = client();
  const urls: string[] = [];
  for (const [i, raw] of files.entries()) {
    const file = await toJpeg(raw);
    const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.jpg`;
    const { error } = await sb.storage.from(GALLERY_BUCKET).upload(path, file, { contentType: "image/jpeg" });
    if (error) throw new Error(`Upload failed for ${raw.name}: ${error.message}`);
    urls.push(sb.storage.from(GALLERY_BUCKET).getPublicUrl(path).data.publicUrl);
    onProgress?.(i + 1, files.length);
  }
  return urls;
}

export async function createGalleryItem(item: Omit<AdminGalleryItem, "id" | "created_at">) {
  const { error } = await client().from("gallery_items").insert(item);
  if (error) throw error;
}

export async function updateGalleryItem(id: string, patch: Partial<Omit<AdminGalleryItem, "id" | "created_at">>) {
  const { error } = await client().from("gallery_items").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteGalleryItem(item: AdminGalleryItem) {
  const sb = client();
  // remove storage objects first (paths are the tail of the public URL)
  const paths = item.image_urls
    .map((u) => u.split(`/${GALLERY_BUCKET}/`)[1])
    .filter((p): p is string => Boolean(p));
  if (paths.length) await sb.storage.from(GALLERY_BUCKET).remove(paths);
  const { error } = await sb.from("gallery_items").delete().eq("id", item.id);
  if (error) throw error;
}

/* ---------- leads ---------- */

export async function listLeads(): Promise<Lead[]> {
  const { data, error } = await client().from("quote_requests").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Lead[];
}

export async function setLeadStatus(id: string, status: Lead["status"]) {
  const { error } = await client().from("quote_requests").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function signedLeadPhotos(paths: string[]): Promise<string[]> {
  if (!paths.length) return [];
  const { data, error } = await client().storage.from(QUOTE_BUCKET).createSignedUrls(paths, 60 * 60);
  if (error) return [];
  return data.map((d) => d.signedUrl).filter((u): u is string => Boolean(u));
}
