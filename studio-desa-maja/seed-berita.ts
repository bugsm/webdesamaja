/**
 * Menambah 11 berita contoh ke Sanity (dengan foto asli Desa Maja dari petadigital).
 *
 * Jalankan dari folder studio-desa-maja:
 *   npx sanity exec seed-berita.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {readFileSync, existsSync} from 'fs'

const client = getCliClient()

const PHOTO_DIR = 'C:/laragon/www/petadigital/assets/photos'
const PHOTOS = [
  'Pantai_Maja.jpeg',
  'Dermaga_Maja.jpeg',
  'Lapangan_Nichimayan.jpeg',
  'Kantor_Desa_Maja.jpeg',
  'Masjid_AlMutaqin.jpeg',
  'Paud_GucciMaja.jpeg',
  'Bank_Sampah.jpeg',
  'Pantai_GuciBatuKapal_.jpeg',
  'Sekretariat_Destana.jpeg',
  'Pertamina_Shop.jpeg',
  'Penginapan_LambanQueen.jpeg',
]

type Item = {title: string; category: string; excerpt: string; body: string}

const items: Item[] = [
  {
    title: 'Musyawarah Desa Bahas Rencana Pembangunan 2027',
    category: 'Pembangunan',
    excerpt:
      'Pemerintah Desa Maja menggelar musyawarah desa untuk menyusun prioritas pembangunan tahun anggaran 2027.',
    body: 'Musyawarah desa (Musdes) dihadiri perangkat desa, BPD, tokoh masyarakat, dan perwakilan warga. Beberapa usulan prioritas meliputi perbaikan jalan usaha tani, drainase, dan penerangan jalan umum.',
  },
  {
    title: 'Panen Raya Padi Kelompok Tani Makmur',
    category: 'Kegiatan',
    excerpt:
      'Kelompok Tani Makmur menggelar panen raya padi dengan hasil yang memuaskan berkat sistem irigasi baru.',
    body: 'Panen raya kali ini menandai keberhasilan penerapan pola tanam serentak. Hasil gabah meningkat dibanding musim sebelumnya, dan sebagian akan dikelola menjadi beras kemasan desa.',
  },
  {
    title: 'Pelatihan UMKM Digital untuk Pelaku Usaha Desa',
    category: 'Kegiatan',
    excerpt:
      'Puluhan pelaku UMKM mengikuti pelatihan pemasaran digital untuk memperluas jangkauan pasar produk lokal.',
    body: 'Pelatihan membahas foto produk, pemasaran media sosial, dan marketplace. Peserta antusias mempraktikkan langsung pembuatan akun toko online.',
  },
  {
    title: 'Posyandu Mawar Layani Imunisasi Balita',
    category: 'Pengumuman',
    excerpt:
      'Posyandu Mawar mengumumkan jadwal pelayanan imunisasi dan penimbangan balita bulan ini.',
    body: 'Pelayanan meliputi penimbangan, pengukuran tinggi badan, imunisasi dasar, serta pemberian makanan tambahan. Orang tua diimbau membawa buku KIA.',
  },
  {
    title: 'Gotong Royong Bersihkan Pantai Maja',
    category: 'Kegiatan',
    excerpt:
      'Warga bersama karang taruna melaksanakan gotong royong membersihkan kawasan wisata Pantai Maja.',
    body: 'Kegiatan bersih pantai bertujuan menjaga daya tarik wisata dan kelestarian lingkungan pesisir. Sampah yang terkumpul dipilah untuk didaur ulang di bank sampah desa.',
  },
  {
    title: 'Pembangunan Drainase Dusun 1 Rampung',
    category: 'Pembangunan',
    excerpt:
      'Proyek pembangunan saluran drainase sepanjang 500 meter di Dusun 1 telah selesai dan diresmikan.',
    body: 'Drainase baru diharapkan mengatasi genangan saat musim hujan. Pembangunan menggunakan dana desa dan melibatkan tenaga kerja lokal.',
  },
  {
    title: 'Penyaluran Bantuan Langsung Tunai Dana Desa',
    category: 'Pengumuman',
    excerpt:
      'Pemerintah Desa Maja menyalurkan BLT Dana Desa kepada keluarga penerima manfaat yang berhak.',
    body: 'Penyaluran dilakukan secara tertib di balai desa dengan verifikasi data penerima. Warga diimbau membawa KTP dan kartu keluarga.',
  },
  {
    title: 'Festival Budaya Desa Maja Meriah',
    category: 'Kegiatan',
    excerpt:
      'Festival budaya menampilkan kesenian tradisional, kuliner khas, dan produk UMKM warga desa.',
    body: 'Festival menjadi ajang promosi potensi desa sekaligus mempererat kebersamaan warga. Pengunjung dari desa tetangga turut memeriahkan acara.',
  },
  {
    title: 'Pemasangan Lampu Penerangan Jalan Umum',
    category: 'Pembangunan',
    excerpt:
      'Sejumlah titik jalan desa kini dilengkapi lampu penerangan jalan umum bertenaga surya.',
    body: 'Penerangan jalan meningkatkan keamanan dan kenyamanan warga pada malam hari. Lampu tenaga surya dipilih agar hemat biaya operasional.',
  },
  {
    title: 'Sosialisasi Pengelolaan Sampah dan Bank Sampah',
    category: 'Pengumuman',
    excerpt:
      'Desa mengadakan sosialisasi pemilahan sampah dan pemanfaatan bank sampah bagi warga.',
    body: 'Warga diajak memilah sampah organik dan anorganik. Bank sampah desa menerima sampah bernilai ekonomis yang dapat ditukar dengan tabungan.',
  },
  {
    title: 'Pelantikan Pengurus Karang Taruna Periode Baru',
    category: 'Kegiatan',
    excerpt:
      'Pengurus Karang Taruna Desa Maja periode baru resmi dilantik untuk menggerakkan kegiatan kepemudaan.',
    body: 'Kepala desa berharap karang taruna aktif dalam kegiatan sosial, olahraga, dan pengembangan wisata desa. Program kerja disusun bersama seluruh anggota.',
  },
]

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, ' dan ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function dateStr(daysAgo: number): string {
  const d = new Date('2026-07-25T00:00:00Z')
  d.setUTCDate(d.getUTCDate() - daysAgo)
  return d.toISOString().slice(0, 10)
}

async function uploadPhoto(file: string) {
  const path = `${PHOTO_DIR}/${file}`
  if (!existsSync(path)) return undefined
  const asset = await client.assets.upload('image', readFileSync(path), {filename: file})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    const image = await uploadPhoto(PHOTOS[i % PHOTOS.length])
    const doc: Record<string, unknown> = {
      _type: 'berita',
      title: it.title,
      slug: {_type: 'slug', current: `${slugify(it.title)}`},
      date: dateStr(i * 4), // paling atas = terbaru
      category: it.category,
      excerpt: it.excerpt,
      body: [
        {
          _type: 'block',
          _key: `b${i}`,
          style: 'normal',
          children: [{_type: 'span', _key: `s${i}`, marks: [], text: it.body}],
        },
      ],
      views: 0,
    }
    if (image) doc.image = image
    const created = await client.create(doc)
    console.log(`✅  (${i + 1}/${items.length}) ${it.title}  [${created._id}]`)
  }
  console.log('Selesai menambahkan 11 berita contoh.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
