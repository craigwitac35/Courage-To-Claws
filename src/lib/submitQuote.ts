import { supabase } from "./supabase";

export type QuoteFormData = {
  projectType: string;
  location: string;
  timeline: string;
  description: string;
  photos: File[];
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
};

const BUCKET = "quote-photos";
const MAX_PHOTOS = 8;
const MAX_MB = 10;

export function validatePhoto(file: File): string | null {
  if (!file.type.startsWith("image/")) return `${file.name} is not an image.`;
  if (file.size > MAX_MB * 1024 * 1024) return `${file.name} is larger than ${MAX_MB} MB.`;
  return null;
}

export { MAX_PHOTOS };

// Photos stay in memory until this runs. Uploads happen first, then the row is
// written with the resulting storage paths.
export async function submitQuote(data: QuoteFormData): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!supabase) {
    // Dev/demo mode: no backend configured.
    console.info("[demo] quote request", data);
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  }

  const stamp = Date.now();
  const folder = `${stamp}-${crypto.randomUUID().slice(0, 8)}`;
  const photoPaths: string[] = [];

  for (const [i, file] of data.photos.entries()) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${folder}/${i + 1}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
    if (error) return { ok: false, message: "One of the photos could not be uploaded. Try again or remove it." };
    photoPaths.push(path);
  }

  const { error } = await supabase.from("quote_requests").insert({
    project_type: data.projectType,
    location: data.location,
    timeline: data.timeline,
    description: data.description || null,
    photo_urls: photoPaths,
    name: data.name,
    phone: data.phone,
    email: data.email,
    preferred_contact: data.preferredContact,
  });

  if (error) return { ok: false, message: "Your request could not be sent. Please try again or call us directly." };
  return { ok: true };
}
