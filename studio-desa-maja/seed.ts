import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function main() {
  console.log("Seeding Profil Desa...");
  
  await client.createOrReplace({
    _id: 'profil',
    _type: 'profil',
    sejarah: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: 'Desa Maja memiliki sejarah panjang yang erat kaitannya dengan perkembangan budaya di kawasan pesisir Lampung Selatan. Konon, nama "Maja" diambil dari kata "Maju", yang mencerminkan harapan para pendahulu agar desa ini terus berkembang mengikuti perubahan zaman.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: 'Sejak didirikan pada awal abad ke-20, masyarakat Desa Maja dikenal dengan kearifan lokalnya yang menjunjung tinggi semangat gotong royong, menjaga kelestarian alam, dan merawat tradisi leluhur. Hingga kini, nilai-nilai tersebut masih menjadi fondasi utama dalam kehidupan bermasyarakat.'
          }
        ]
      }
    ],
    visi: "Menjadi desa wisata yang mandiri, berbudaya, dan berwawasan lingkungan menuju masyarakat yang sejahtera.",
    misi: [
      "Meningkatkan kualitas pelayanan publik melalui tata kelola pemerintahan desa yang baik dan transparan.",
      "Mendorong partisipasi aktif masyarakat dalam pembangunan dan pengembangan potensi lokal.",
      "Mengoptimalkan pengelolaan sumber daya alam dengan tetap menjaga kelestarian lingkungan.",
      "Meningkatkan pemberdayaan ekonomi kerakyatan melalui dukungan terhadap UMKM dan sektor pariwisata."
    ],
    namaKepalaDesa: "H. Ahmad Sudirman",
    sambutanKepalaDesa: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: "Assalamu'alaikum Warahmatullahi Wabarakatuh,"
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: "Puji syukur kita panjatkan ke hadirat Allah SWT atas segala rahmat dan karunia-Nya. Atas nama Pemerintah Desa Maja, saya menyampaikan selamat datang di website resmi Desa Maja."
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: "Website ini kami hadirkan sebagai wujud komitmen kami dalam mewujudkan transparansi dan keterbukaan informasi publik. Melalui portal ini, kami berharap seluruh warga desa dan masyarakat umum dapat mengakses informasi terkait pembangunan, pelayanan, dan potensi Desa Maja dengan mudah."
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            marks: [],
            text: "Wassalamu'alaikum Warahmatullahi Wabarakatuh."
          }
        ]
      }
    ],
    aparat: [
      { _key: 'k1', name: "H. Ahmad Sudirman", gelar: "", position: "Kepala Desa" },
      { _key: 'k2', name: "Siti Aminah", gelar: "S.Pd.", position: "Sekretaris Desa" },
      { _key: 'k3', name: "Budi Santoso", gelar: "", position: "Kaur Keuangan" },
      { _key: 'k4', name: "Rina Wati", gelar: "", position: "Kaur Perencanaan" },
      { _key: 'k5', name: "Joko Widodo", gelar: "", position: "Kasi Pemerintahan" },
      { _key: 'k6', name: "Dewi Sartika", gelar: "", position: "Kasi Kesejahteraan" },
      { _key: 'k7', name: "Agus Setiawan", gelar: "", position: "Kasi Pelayanan" },
      { _key: 'k8', name: "Maryam", gelar: "", position: "Kepala Dusun 1" },
      { _key: 'k9', name: "Suparman", gelar: "", position: "Kepala Dusun 2" },
      { _key: 'k10', name: "Rustam", gelar: "", position: "Kepala Dusun 3" },
    ]
  });

  console.log("Seeding Potensi Desa...");
  
  const potensiDesa = [
    {
      title: "Pertanian Padi & Palawija",
      category: "Pertanian",
      description: "Desa Maja memiliki lahan persawahan yang subur dengan hasil padi berkualitas. Selain padi, petani desa juga menanam jagung, singkong, dan kacang tanah sebagai komoditas penunjang.",
      highlights: ["Padi organik", "Jagung hibrida", "Singkong"],
    },
    {
      title: "Perkebunan Kelapa & Kakao",
      category: "Perkebunan",
      description: "Perkebunan kelapa dan kakao menjadi sumber ekonomi penting bagi sebagian warga. Produk turunan seperti minyak kelapa dan cokelat lokal mulai dikembangkan.",
      highlights: ["Kelapa", "Kakao", "Minyak kelapa"],
    },
    {
      title: "UMKM Keripik & Olahan",
      category: "UMKM",
      description: "Warga desa aktif memproduksi keripik singkong, keripik pisang, dan berbagai olahan makanan khas Lampung yang dijual ke pasar lokal dan daerah sekitar.",
      highlights: ["Keripik singkong", "Keripik pisang", "Kopi bubuk"],
    },
    {
      title: "Kerajinan Tapis Lampung",
      category: "Kerajinan",
      description: "Beberapa warga memiliki keahlian membuat kain tapis, kerajinan khas Lampung yang bernilai seni tinggi. Produk ini diminati wisatawan dan kolektor.",
      highlights: ["Kain tapis", "Sulaman", "Souvenir"],
    },
    {
      title: "Wisata Alam Air Terjun",
      category: "Pariwisata",
      description: "Di kawasan perbukitan Desa Maja terdapat air terjun kecil yang masih alami dan asri. Lokasi ini berpotensi dikembangkan menjadi destinasi ekowisata.",
      highlights: ["Air terjun", "Trekking", "Ekowisata"],
    },
    {
      title: "Peternakan Kambing & Unggas",
      category: "Peternakan",
      description: "Peternakan kambing dan unggas (ayam kampung, bebek) menjadi usaha sampingan yang menjanjikan bagi beberapa warga, terutama menjelang hari raya.",
      highlights: ["Kambing", "Ayam kampung", "Bebek"],
    }
  ];

  for (let i = 0; i < potensiDesa.length; i++) {
    await client.create({
      _type: 'potensi',
      ...potensiDesa[i]
    });
  }

  console.log("Seed complete!");
}

main().catch(console.error);
