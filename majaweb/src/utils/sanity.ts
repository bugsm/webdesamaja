import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Konfigurasi client menggunakan variabel environment dengan fallback
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  useCdn: true, // `false` jika ingin memastikan data terbaru (tanpa cache) saat mendeploy
  apiVersion: "2023-05-03", // Tanggal rilis API version
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return builder.image(source);
}

// Helper function untuk mengambil data dengan aman (jika API key masih dummy, fallback ke empty/default)
export async function fetchSanity<T>(query: string, params = {}): Promise<T | null> {
  try {
    const projectId = sanityClient.config().projectId;
    if (projectId === "your-project-id") {
      console.warn("⚠️ Sanity Project ID masih menggunakan dummy ('your-project-id'). Menampilkan data fallback sementara.");
      return null;
    }
    const data = await sanityClient.fetch(query, params);
    return data;
  } catch (error) {
    console.error("Gagal mengambil data dari Sanity:", error);
    return null;
  }
}
