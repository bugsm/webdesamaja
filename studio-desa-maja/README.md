# Admin Desa Maja (Sanity Studio)

Studio konten untuk website Desa Maja (projectId `p5cmbg2a`, dataset `production`).

## Menjalankan

```
npm install
npm run dev      # buka http://localhost:3333
npm run deploy   # deploy studio ke <nama>.sanity.studio
```

## 👥 Akun & Peran (Akses)

Akun **tidak dibuat lewat kode** — anggota diundang lewat email di
[sanity.io/manage](https://sanity.io/manage) → pilih project **Desa Maja** →
**Members** → **Invite members**. Login memakai Google/GitHub/email.

Beri peran sesuai kebutuhan:

| Siapa | Peran (saat mengundang) | Bisa apa di Studio |
| :-- | :-- | :-- |
| **Admin Desa** (superadmin) | **Administrator** | Semua konten: Berita, Potensi, Fasilitas, Statistik, Profil |
| **Karang Taruna** | **Editor** | **Hanya Berita** — membuat & mengedit berita saja |

Pembatasan "hanya Berita" untuk Editor sudah diatur di `sanity.config.ts`
(menu & tool lain disembunyikan untuk non-Administrator).

> Catatan: pembatasan ini pada level tampilan Studio (cukup untuk pemakaian desa).
> Penguncian keras di level API (Editor benar-benar tak bisa menyentuh data lain
> lewat API) memerlukan **custom role** pada paket Sanity berbayar.

Langkah singkat mengundang karang taruna:
1. Buka Members → Invite members.
2. Masukkan email karang taruna, pilih role **Editor**, kirim undangan.
3. Mereka menerima email, login, dan otomatis hanya melihat menu **Berita**.
