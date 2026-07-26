# Web Desa Maja

Website resmi Desa Maja (Kec. Kalianda, Lampung Selatan) — dibangun dengan **Astro + React +
Tailwind**, konten dinamis dari **Sanity CMS**, dan render **statik (SSG)** agar bisa dideploy
gratis di Netlify.

Fitur utama: **Berita** (dari Sanity) dan **Peta Digital** (embed WebGIS
[bugsm.github.io/petadigital](https://bugsm.github.io/petadigital/) — dibuat terpisah, tidak
di-*coding* ulang di sini). Halaman pelengkap: Profil, Potensi, Kontak.

## 🧞 Perintah

Dijalankan dari folder ini (`majaweb/`):

| Perintah          | Aksi                                          |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Install dependency                            |
| `npm run dev`     | Dev server di `localhost:4321`                |
| `npm run build`   | Build situs statik ke `./dist/`               |
| `npm run preview` | Pratinjau hasil build sebelum deploy          |

## 🔑 Environment

Buat file `.env` (lihat contoh yang ada):

```
PUBLIC_SANITY_PROJECT_ID="p5cmbg2a"
PUBLIC_SANITY_DATASET="production"
```

Berita/konten diambil dari Sanity **saat build**. Jika env belum diisi, situs tetap tampil dengan
data *fallback*.

## 🚀 Deploy ke Netlify (gratis)

Konfigurasi sudah ada di `../netlify.toml` (root repo, `base = "majaweb"`).

1. **Connect repo** ke Netlify. Build otomatis terbaca dari `netlify.toml`:
   - Base directory: `majaweb`
   - Build command: `npm run build`
   - Publish directory: `dist` (relatif ke base → `majaweb/dist`)
2. **Environment variables** di Netlify → Site settings → Environment:
   `PUBLIC_SANITY_PROJECT_ID` dan `PUBLIC_SANITY_DATASET`.
3. **CORS Sanity**: di [sanity.io/manage](https://sanity.io/manage) → project → **API → CORS
   Origins**, tambahkan domain Netlify (mis. `https://namasitus.netlify.app`) agar fetch data lancar.
4. Karena situs statik, **build ulang** (redeploy) diperlukan setiap kali berita baru ditambahkan
   di Sanity — atau pasang **Netlify Build Hook** dan panggil dari Sanity webhook untuk otomatis.

## 👁️ Jumlah dilihat berita (Netlify Function)

Halaman detail berita menghitung "jumlah dilihat" lewat serverless function
`netlify/functions/view.mjs` yang menyimpan angka di field `views` dokumen berita di Sanity.

Agar hitungan **bertambah** (bukan hanya tampil), buat token tulis dan set di Netlify:

1. [sanity.io/manage](https://sanity.io/manage) → project → **API → Tokens** → *Add API token*,
   role **Editor** (izin tulis). Salin token-nya.
2. Netlify → Site settings → **Environment variables** → tambah `SANITY_WRITE_TOKEN` = token tadi.
3. Redeploy. Tanpa token, tombol & tampilan tetap jalan, hanya angkanya tidak bertambah.

> Catatan: saat `npm run dev` lokal, function Netlify tidak berjalan sehingga angka tampil apa adanya
> (dari build). Untuk mengetes function secara lokal, gunakan `netlify dev` (Netlify CLI).

## 🗺️ Peta

Halaman `/peta` dan mini-peta di `/kontak` meng-*embed* aplikasi WebGIS Desa Maja lewat `<iframe>`
ke `https://bugsm.github.io/petadigital/`. Untuk mengubah sumber peta, ganti konstanta `PETA_URL`
di `src/pages/peta.astro` dan `src/pages/kontak.astro`.

## 🎨 Sanity Studio (admin konten)

Studio dikelola terpisah di folder `../studio-desa-maja/` (dideploy ke Sanity hosting, bukan bagian
dari situs ini).
