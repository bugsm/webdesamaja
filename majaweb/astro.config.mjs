import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),
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
    ssr: {
      noExternal: ['react-leaflet', 'leaflet'],
    },
  },
  site: 'https://desamaja.id',
});
