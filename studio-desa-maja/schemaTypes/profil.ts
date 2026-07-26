import { defineField, defineType } from "sanity";
import { maxImageSize } from "./lib/imageMaxSize";

export default defineType({
  name: "profil",
  title: "Profil Desa (Singleton)",
  type: "document",
  fields: [
    defineField({
      name: "sejarah",
      title: "Sejarah Desa",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "visi",
      title: "Visi",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "misi",
      title: "Misi",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "namaKepalaDesa",
      title: "Nama Kepala Desa",
      type: "string",
      description: "Contoh: H. Ahmad Sudirman",
    }),
    defineField({
      name: "sambutanKepalaDesa",
      title: "Sambutan Kepala Desa",
      type: "array",
      of: [{ type: "block" }],
      description: "Sambutan yang akan ditampilkan di halaman depan",
    }),
    defineField({
      name: "fotoKantor",
      title: "Foto Kantor / Suasana Desa",
      type: "image",
      options: { hotspot: true },
      validation: maxImageSize(5),
    }),
    defineField({
      name: "aparat",
      title: "Struktur Organisasi (Aparat Desa)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nama Lengkap", type: "string" },
            { name: "gelar", title: "Gelar (Opsional)", type: "string" },
            { name: "position", title: "Jabatan", type: "string" },
            { name: "photo", title: "Foto", type: "image", options: { hotspot: true }, validation: maxImageSize(5) },
          ],
          preview: {
            select: { title: "name", subtitle: "position", media: "photo" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Profil & Struktur Organisasi",
      };
    },
  },
});
