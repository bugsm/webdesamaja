import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Mode hybrid: default-nya statik (beranda, profil, potensi, kontak, peta di-build
// jadi HTML), KECUALI halaman berita yang memakai `export const prerender = false`
// sehingga dirender saat diakses. Dengan begitu berita baru dari Sanity langsung
// muncul tanpa perlu deploy ulang.
export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://desamaja.my.id',
  integrations: [
    react(),
    sanity({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2023-05-03',
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
