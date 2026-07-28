import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'p5cmbg2a',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,

    // ID aplikasi Studio yang dibuat saat deploy pertama — supaya `sanity deploy`
    // berikutnya tidak menanyakan application id.
    appId: 'o9gstu5hy4gsn25rf4mu7h3q',
  },

  // Alamat Studio online: https://desamaja.sanity.studio
  // Dipin di sini supaya `sanity deploy` tidak menanyakan hostname tiap kali.
  studioHost: 'desamaja',
})
