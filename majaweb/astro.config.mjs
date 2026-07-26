import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

// https://astro.build/config
// Situs di-render sepenuhnya statik (SSG) agar bisa dideploy gratis di Netlify
// tanpa server/adapter. Data Sanity diambil saat build time.
export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    sanity({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2023-05-03',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://desamaja.id',
});
