import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

/**
 * Peran & akses Studio
 * --------------------
 * - Administrator (admin desa / "superadmin"): melihat & mengelola SEMUA konten.
 * - Editor (karang taruna): Studio hanya menampilkan "Berita" — hanya bisa
 *   membuat/mengedit berita; menu & tool lain disembunyikan.
 *
 * Undang anggota lewat https://sanity.io/manage → Members → Invite:
 *   admin desa  = role Administrator
 *   karang taruna = role Editor
 */
function isAdmin(currentUser: {roles?: {name: string}[]} | null | undefined): boolean {
  return Boolean(currentUser?.roles?.some((r) => r.name === 'administrator'))
}

export default defineConfig({
  name: 'default',
  title: 'Desa Maja',

  projectId: 'p5cmbg2a',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) => {
        // Karang Taruna (Editor & non-admin): hanya Berita
        if (!isAdmin(context.currentUser)) {
          return S.list()
            .title('Berita')
            .items([S.documentTypeListItem('berita').title('Berita')])
        }

        // Admin Desa (Administrator): semua konten
        return S.list()
          .title('Konten Desa Maja')
          .items([
            S.documentTypeListItem('berita').title('Berita'),
            S.documentTypeListItem('potensi').title('Potensi Desa'),
            S.documentTypeListItem('fasilitas').title('Fasilitas (Peta)'),
            S.documentTypeListItem('statistik').title('Statistik Desa'),
            S.documentTypeListItem('profil').title('Profil Desa'),
          ])
      },
    }),
    visionTool(),
  ],

  // Sembunyikan tool Vision (query mentah) untuk non-admin
  tools: (prev, {currentUser}) =>
    isAdmin(currentUser) ? prev : prev.filter((t) => t.name !== 'vision'),

  document: {
    // Non-admin hanya bisa membuat dokumen "berita" baru
    newDocumentOptions: (prev, {currentUser}) =>
      isAdmin(currentUser) ? prev : prev.filter((t) => t.templateId === 'berita'),
  },

  schema: {
    types: schemaTypes,
  },
})
