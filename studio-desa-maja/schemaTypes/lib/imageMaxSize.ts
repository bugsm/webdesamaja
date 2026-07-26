/**
 * Validasi ukuran maksimal unggahan gambar (default 5 MB).
 *
 * Dipakai pada field `type: "image"`:
 *   validation: maxImageSize(5)
 *
 * Catatan: aset sudah terunggah saat validasi berjalan, tetapi dokumen tidak
 * dapat dipublikasikan bila melebihi batas — pengguna diminta mengganti gambar.
 */
export const maxImageSize =
  (maxMB = 5) =>
  (Rule: any) =>
    Rule.custom(async (value: any, context: any) => {
      const ref = value?.asset?._ref;
      if (!ref) return true;

      const client = context.getClient({ apiVersion: "2023-05-03" });
      const size: number | undefined = await client.fetch(
        `*[_id == $id][0].size`,
        { id: ref }
      );

      if (typeof size === "number" && size > maxMB * 1024 * 1024) {
        const currentMB = (size / 1024 / 1024).toFixed(1);
        return `Ukuran gambar maksimal ${maxMB}MB (saat ini ${currentMB}MB). Silakan kompres atau ganti gambar.`;
      }
      return true;
    });
