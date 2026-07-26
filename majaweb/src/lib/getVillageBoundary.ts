/**
 * getVillageBoundary.ts
 *
 * Mengembalikan GeoJSON FeatureCollection berisi polygon batas wilayah Desa Maja.
 *
 * =====================================================================
 * PLACEHOLDER — DATA BATAS WILAYAH DUMMY
 * =====================================================================
 * File shapefile (.shp) resmi batas wilayah Desa Maja sedang dalam proses
 * pembuatan oleh pihak terkait dan BELUM tersedia saat ini.
 *
 * Polygon di bawah ini adalah perkiraan kasar di sekitar koordinat
 * Kecamatan Kalianda, Lampung Selatan (-5.78, 105.58) dan BUKAN
 * batas desa yang sebenarnya.
 *
 * LANGKAH SAAT DATA RESMI TERSEDIA:
 * 1. Konversi file .shp ke GeoJSON menggunakan:
 *    - mapshaper (CLI/web): mapshaper input.shp -o output.geojson
 *    - ogr2ogr: ogr2ogr -f GeoJSON output.geojson input.shp
 *    - QGIS: Export → Save As → GeoJSON
 * 2. Letakkan file GeoJSON hasil konversi di public/data/village-boundary.geojson
 * 3. Update fungsi ini untuk fetch dari file tersebut, atau langsung
 *    replace data di bawah dengan data asli.
 * =====================================================================
 */

import type { FeatureCollection, Polygon } from "geojson";

export function getVillageBoundary(): FeatureCollection<Polygon> {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Desa Maja",
          kecamatan: "Kalianda",
          kabupaten: "Lampung Selatan",
          provinsi: "Lampung",
          // Kode Wilayah Kemendagri (placeholder)
          kodeWilayah: "18.05.xx.xxxx",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              // Polygon dummy — perkiraan wilayah sekitar Kalianda
              // Titik-titik ini membentuk area ~3x3 km di sekitar pusat Kalianda
              [105.565, -5.770],
              [105.580, -5.765],
              [105.595, -5.770],
              [105.600, -5.780],
              [105.595, -5.795],
              [105.580, -5.800],
              [105.565, -5.795],
              [105.560, -5.785],
              [105.565, -5.770], // close the ring
            ],
          ],
        },
      },
    ],
  };
}

/**
 * Titik pusat perkiraan Desa Maja (untuk center peta)
 */
export const VILLAGE_CENTER: [number, number] = [-5.783, 105.580];

/**
 * Zoom level default untuk peta desa
 */
export const DEFAULT_ZOOM = 14;
