import { defineField, defineType } from "sanity";

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
      name: "aparat",
      title: "Struktur Organisasi (Aparat Desa)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nama Lengkap", type: "string" },
            { name: "position", title: "Jabatan", type: "string" },
            { name: "photo", title: "Foto", type: "image", options: { hotspot: true } },
          ],
          preview: {
            select: { title: "name", subtitle: "position", media: "photo" },
          },
        },
      ],
    }),
    defineField({
      name: "statistik",
      title: "Statistik Penduduk",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "dusun", title: "Nama Dusun", type: "string" },
            { name: "laki", title: "Jumlah Laki-laki", type: "number" },
            { name: "perempuan", title: "Jumlah Perempuan", type: "number" },
            { name: "kk", title: "Jumlah Kepala Keluarga (KK)", type: "number" },
          ],
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
