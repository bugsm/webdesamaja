/**
 * facilityData.ts
 *
 * Data fasilitas umum Desa Maja untuk marker di peta.
 * Data ini bersifat PLACEHOLDER / dummy.
 * Nantinya akan dipindahkan ke Sanity CMS agar admin bisa mengelola
 * titik-titik fasilitas tanpa perlu edit kode.
 */

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  lat: number;
  lng: number;
  description: string;
  photo?: string;
}

export type FacilityType =
  | "kantor-desa"
  | "sekolah"
  | "kesehatan"
  | "ibadah"
  | "pasar"
  | "wisata";

export const facilityTypeLabels: Record<FacilityType, string> = {
  "kantor-desa": "Kantor Desa",
  sekolah: "Sekolah",
  kesehatan: "Kesehatan",
  ibadah: "Tempat Ibadah",
  pasar: "Pasar / Ekonomi",
  wisata: "Wisata",
};

export const facilityTypeColors: Record<FacilityType, string> = {
  "kantor-desa": "#DC2626", // merah
  sekolah: "#2563EB",       // biru
  kesehatan: "#16A34A",     // hijau
  ibadah: "#7C3AED",        // ungu
  pasar: "#D97706",         // amber
  wisata: "#0891B2",        // cyan
};

/**
 * Data dummy fasilitas — koordinat perkiraan di sekitar Kalianda.
 * GANTI dengan data aktual setelah admin input melalui Sanity.
 */
export const facilities: Facility[] = [
  {
    id: "kantor-desa-maja",
    name: "Kantor Desa Maja",
    type: "kantor-desa",
    lat: -5.783,
    lng: 105.580,
    description:
      "Kantor Pemerintah Desa Maja. Pusat pelayanan administrasi kependudukan dan pemerintahan desa.",
  },
  {
    id: "sdn-1-maja",
    name: "SDN 1 Maja",
    type: "sekolah",
    lat: -5.780,
    lng: 105.577,
    description:
      "Sekolah Dasar Negeri 1 Desa Maja. Fasilitas pendidikan dasar untuk anak-anak desa.",
  },
  {
    id: "sdn-2-maja",
    name: "SDN 2 Maja",
    type: "sekolah",
    lat: -5.786,
    lng: 105.584,
    description: "Sekolah Dasar Negeri 2 Desa Maja.",
  },
  {
    id: "posyandu-mawar",
    name: "Posyandu Mawar",
    type: "kesehatan",
    lat: -5.781,
    lng: 105.582,
    description:
      "Pos Pelayanan Terpadu untuk ibu hamil, ibu menyusui, dan balita.",
  },
  {
    id: "puskesmas-pembantu",
    name: "Puskesmas Pembantu Maja",
    type: "kesehatan",
    lat: -5.784,
    lng: 105.578,
    description:
      "Pusat kesehatan masyarakat pembantu. Menyediakan layanan kesehatan dasar.",
  },
  {
    id: "masjid-al-ikhlas",
    name: "Masjid Al-Ikhlas",
    type: "ibadah",
    lat: -5.782,
    lng: 105.579,
    description:
      "Masjid utama Desa Maja. Digunakan untuk sholat jamaah dan kegiatan keagamaan.",
  },
  {
    id: "musholla-ar-rahman",
    name: "Musholla Ar-Rahman",
    type: "ibadah",
    lat: -5.787,
    lng: 105.583,
    description: "Musholla di Dusun 3 Desa Maja.",
  },
  {
    id: "pasar-desa-maja",
    name: "Pasar Desa Maja",
    type: "pasar",
    lat: -5.785,
    lng: 105.581,
    description:
      "Pasar desa untuk kegiatan jual beli hasil pertanian dan kebutuhan sehari-hari warga.",
  },
  {
    id: "air-terjun-curug",
    name: "Air Terjun Curug Maja",
    type: "wisata",
    lat: -5.790,
    lng: 105.575,
    description:
      "Objek wisata alam berupa air terjun kecil di kawasan perbukitan Desa Maja. Cocok untuk rekreasi keluarga.",
  },
];
