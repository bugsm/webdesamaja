import { defineField, defineType } from "sanity";

export default defineType({
  name: "berita",
  title: "Berita Desa",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul Berita",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Tanggal Publikasi",
      type: "date",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Pengumuman", value: "Pengumuman" },
          { title: "Kegiatan", value: "Kegiatan" },
          { title: "Pembangunan", value: "Pembangunan" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Gambar Utama",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan Singkat (Excerpt)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: "Muncul di kartu berita depan. Maksimal 200 karakter.",
    }),
    defineField({
      name: "content",
      title: "Isi Berita",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "image",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString("id-ID") : "Tanpa tanggal",
        media,
      };
    },
  },
});
