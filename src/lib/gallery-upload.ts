import { supabase } from "@/integrations/supabase/client";

const BUCKET = "gallery";

/** Upload a file to the gallery bucket and return the public URL + storage path. */
export async function uploadGalleryImage(file: File): Promise<{ publicUrl: string; path: string }> {
  const ext = file.name.split(".").pop() || "jpg";
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { publicUrl: data.publicUrl, path };
}

export async function deleteGalleryImage(path: string): Promise<void> {
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}
