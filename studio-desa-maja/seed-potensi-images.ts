/**
 * Mengunggah beberapa foto asli Desa Maja (dari folder petadigital) dan
 * menautkannya ke dokumen Potensi yang sudah ada (dicocokkan berdasarkan judul).
 *
 * Jalankan dari folder studio-desa-maja:
 *   npx sanity exec seed-potensi-images.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { readFileSync, existsSync } from "fs";
import { basename } from "path";

const client = getCliClient();

// Folder foto asli Desa Maja (proyek petadigital)
const PHOTO_DIR = "C:/laragon/www/petadigital/assets/photos";

// Pasangan: judul Potensi (harus sama persis dgn dokumen) -> nama file foto
const mapping: { title: string; file: string }[] = [
  { title: "Wisata Alam Air Terjun", file: "Pantai_GuciBatuKapal_.jpeg" },
  { title: "Perkebunan Kelapa & Kakao", file: "Pantai_Maja.jpeg" },
  { title: "Pertanian Padi & Palawija", file: "Lapangan_Nichimayan.jpeg" },
  { title: "UMKM Keripik & Olahan", file: "Dermaga_Maja.jpeg" },
];

async function main() {
  for (const { title, file } of mapping) {
    const path = `${PHOTO_DIR}/${file}`;
    if (!existsSync(path)) {
      console.warn(`⚠️  File tidak ditemukan, dilewati: ${path}`);
      continue;
    }

    // Cari dokumen potensi berdasarkan judul
    const doc = await client.fetch<{ _id: string } | null>(
      `*[_type == "potensi" && title == $title][0]{ _id }`,
      { title }
    );
    if (!doc?._id) {
      console.warn(`⚠️  Potensi "${title}" tidak ditemukan, dilewati.`);
      continue;
    }

    console.log(`⬆️  Mengunggah ${file} ...`);
    const asset = await client.assets.upload("image", readFileSync(path), {
      filename: basename(file),
    });

    await client
      .patch(doc._id)
      .set({
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      })
      .commit();

    console.log(`✅  "${title}" ← ${file}`);
  }

  console.log("Selesai menautkan foto potensi.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
