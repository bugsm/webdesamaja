import { defineType, defineField } from 'sanity'

export const statistik = defineType({
  name: 'statistik',
  title: 'Statistik Desa',
  type: 'document',
  fields: [
    defineField({ name: 'totalPenduduk', title: 'Total Penduduk', type: 'number' }),
    defineField({ name: 'totalKeluarga', title: 'Total Kepala Keluarga', type: 'number' }),
    defineField({ name: 'totalRT', title: 'Total RT', type: 'number' }),
    defineField({ name: 'totalDusun', title: 'Total Dusun', type: 'number' }),
    defineField({
      name: 'dataDusun',
      title: 'Data Penduduk per Dusun (Untuk Grafik)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'namaDusun', title: 'Nama Dusun', type: 'string' },
            { name: 'laki', title: 'Jumlah Laki-laki', type: 'number' },
            { name: 'perempuan', title: 'Jumlah Perempuan', type: 'number' },
            { name: 'kk', title: 'Jumlah KK', type: 'number' },
          ],
          preview: {
            select: {
              title: 'namaDusun',
              laki: 'laki',
              perempuan: 'perempuan',
            },
            prepare(selection) {
              const { title, laki, perempuan } = selection
              return {
                title: title,
                subtitle: `L: ${laki || 0} | P: ${perempuan || 0}`
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      totalPenduduk: 'totalPenduduk',
    },
    prepare(selection) {
      return {
        title: 'Data Statistik Desa',
        subtitle: `Total Penduduk: ${selection.totalPenduduk || 0} Jiwa`
      }
    }
  }
})
