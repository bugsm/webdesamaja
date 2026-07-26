// Netlify Function: penghitung "jumlah dilihat" berita, disimpan di Sanity.
//
// Panggilan dari halaman detail berita:
//   GET /.netlify/functions/view?slug=<slug>&hit=1  -> increment + kembalikan {views}
//   GET /.netlify/functions/view?slug=<slug>        -> hanya baca {views}
//
// Butuh env `SANITY_WRITE_TOKEN` (role Editor) di Netlify agar bisa menambah hitungan.
// Tanpa token, tetap aman: hanya mengembalikan angka (tidak menambah).

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "p5cmbg2a",
  dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const json = (statusCode, data) => ({
  statusCode,
  headers: {
    "content-type": "application/json",
    "cache-control": "no-store",
  },
  body: JSON.stringify(data),
});

export const handler = async (event) => {
  const slug = event.queryStringParameters?.slug;
  const hit = event.queryStringParameters?.hit === "1";

  if (!slug) return json(400, { error: "slug wajib diisi" });

  try {
    const doc = await client.fetch(
      `*[_type == "berita" && slug.current == $slug][0]{ _id, views }`,
      { slug }
    );
    if (!doc?._id) return json(404, { views: 0 });

    let views = doc.views || 0;

    if (hit && process.env.SANITY_WRITE_TOKEN) {
      const res = await client
        .patch(doc._id)
        .setIfMissing({ views: 0 })
        .inc({ views: 1 })
        .commit();
      views = res.views ?? views + 1;
    }

    return json(200, { views });
  } catch (err) {
    // Jangan bikin halaman error — cukup kembalikan null agar frontend pakai angka awal.
    return json(200, { views: null });
  }
};
