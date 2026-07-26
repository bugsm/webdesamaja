import { defineField, defineType } from "sanity";
import { maxImageSize } from "./lib/imageMaxSize";

export default defineType({
  name: "potensi",
  title: "Potensi Desa",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama Potensi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Pertanian", value: "Pertanian" },
          { title: "Perkebunan", value: "Perkebunan" },
          { title: "Pariwisata", value: "Pariwisata" },
          { title: "UMKM", value: "UMKM" },
          { title: "Kerajinan", value: "Kerajinan" },
          { title: "Peternakan", value: "Peternakan" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights (Kata Kunci)",
      type: "array",
      of: [{ type: "string" }],
      description: "Contoh: Padi organik, Air terjun, Keripik singkong",
    }),
    defineField({
      name: "image",
      title: "Gambar Visual (Opsional)",
      type: "image",
      options: { hotspot: true },
      validation: maxImageSize(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
