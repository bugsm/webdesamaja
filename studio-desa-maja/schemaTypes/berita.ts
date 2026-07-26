import { defineType, defineField } from 'sanity'
import { maxImageSize } from './lib/imageMaxSize'

export const berita = defineType({
  name: 'berita',
  title: 'Berita',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'date', title: 'Tanggal', type: 'date' }),
    defineField({ 
      name: 'category', 
      title: 'Kategori', 
      type: 'string',
      options: {
        list: [
          { title: 'Pengumuman', value: 'Pengumuman' },
          { title: 'Kegiatan', value: 'Kegiatan' },
          { title: 'Pembangunan', value: 'Pembangunan' }
        ]
      }
    }),
    defineField({ name: 'excerpt', title: 'Ringkasan', type: 'text' }),
    defineField({ name: 'image', title: 'Gambar Utama', type: 'image', options: { hotspot: true }, validation: maxImageSize(5) }),
    defineField({ 
      name: 'youtubeUrl', 
      title: 'Link YouTube (Opsional)', 
      type: 'url',
      description: 'Masukkan link video YouTube (contoh: https://www.youtube.com/watch?v=...)'
    }),
    defineField({ name: 'body', title: 'Isi Berita', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'views',
      title: 'Jumlah Dilihat',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Dihitung otomatis oleh sistem saat pengunjung membuka berita.',
    }),
  ],
})
