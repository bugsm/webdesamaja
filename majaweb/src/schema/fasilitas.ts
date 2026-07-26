import { defineField, defineType } from "sanity";

export default defineType({
  name: "fasilitas",
  title: "Fasilitas Umum (Peta)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Fasilitas",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Kategori Fasilitas",
      type: "string",
      options: {
        list: [
          { title: "Kantor Desa", value: "kantor-desa" },
          { title: "Sekolah", value: "sekolah" },
          { title: "Kesehatan (Puskesmas/Posyandu)", value: "kesehatan" },
          { title: "Tempat Ibadah", value: "ibadah" },
          { title: "Pasar / Ekonomi", value: "pasar" },
          { title: "Wisata", value: "wisata" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Koordinat Lokasi",
      type: "object",
      fields: [
        {
          name: "lat",
          title: "Latitude",
          type: "number",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "lng",
          title: "Longitude",
          type: "number",
          validation: (Rule) => Rule.required(),
        },
      ],
      description: "Masukkan titik koordinat dari Google Maps (contoh Lat: -5.783, Lng: 105.580)",
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "type",
    },
  },
});
