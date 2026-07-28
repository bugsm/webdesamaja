// Grafik penduduk per dusun — CSS murni (tanpa library chart), ringan & pasti
// tampil (di-render statik, tak bergantung hidrasi/JS).

export interface DusunData {
  // Sanity memakai `namaDusun`; `dusun` didukung untuk kompatibilitas lama.
  namaDusun?: string;
  dusun?: string;
  laki: number;
  perempuan: number;
  kk: number;
}

const fallbackData: DusunData[] = [
  { namaDusun: "Dusun 1 (Maja Induk)", laki: 450, perempuan: 480, kk: 210 },
  { namaDusun: "Dusun 2 (Maja Pesisir)", laki: 380, perempuan: 395, kk: 185 },
  { namaDusun: "Dusun 3 (Suka Maju)", laki: 320, perempuan: 310, kk: 150 },
];

const COLOR_LAKI = "#15803d";
const COLOR_PEREMPUAN = "#d97706";

function fmt(n: number) {
  return (Number(n) || 0).toLocaleString("id-ID");
}

export default function PopulationChart({ data }: { data?: DusunData[] }) {
  const rows = Array.isArray(data) && data.length > 0 ? data : fallbackData;
  const max = Math.max(
    1,
    ...rows.map((d) => Math.max(Number(d.laki) || 0, Number(d.perempuan) || 0))
  );

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--color-border)]">
      <h3
        className="text-center text-base md:text-lg font-bold text-[var(--color-primary-dark)]"
        style={{ fontFamily: "Lexend, sans-serif" }}
      >
        Jumlah Penduduk per Dusun
      </h3>

      {/* Legenda */}
      <div className="mt-3 flex items-center justify-center gap-5 text-sm text-[var(--color-muted-foreground)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLOR_LAKI }} />
          Laki-laki
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLOR_PEREMPUAN }} />
          Perempuan
        </span>
      </div>

      {/* Grafik batang */}
      <div className="mt-6 flex items-end justify-around gap-3 h-[280px] md:h-[320px]">
        {rows.map((d, i) => {
          const laki = Number(d.laki) || 0;
          const perempuan = Number(d.perempuan) || 0;
          const nama = d.namaDusun ?? d.dusun ?? `Dusun ${i + 1}`;
          return (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end">
              <div className="flex h-full w-full items-end justify-center gap-1.5 md:gap-2">
                {/* Laki-laki */}
                <div className="flex h-full flex-col items-center justify-end">
                  <span className="mb-1 text-[11px] font-semibold text-[var(--color-primary-dark)]">
                    {fmt(laki)}
                  </span>
                  <div
                    className="w-7 md:w-10 rounded-t-md transition-all"
                    style={{ height: `${(laki / max) * 100}%`, backgroundColor: COLOR_LAKI, minHeight: laki > 0 ? "4px" : "0" }}
                    title={`Laki-laki: ${fmt(laki)} jiwa`}
                  />
                </div>
                {/* Perempuan */}
                <div className="flex h-full flex-col items-center justify-end">
                  <span className="mb-1 text-[11px] font-semibold text-[var(--color-accent-dark)]">
                    {fmt(perempuan)}
                  </span>
                  <div
                    className="w-7 md:w-10 rounded-t-md transition-all"
                    style={{ height: `${(perempuan / max) * 100}%`, backgroundColor: COLOR_PEREMPUAN, minHeight: perempuan > 0 ? "4px" : "0" }}
                    title={`Perempuan: ${fmt(perempuan)} jiwa`}
                  />
                </div>
              </div>
              <span className="mt-2 max-w-[7rem] truncate text-center text-xs font-medium text-[var(--color-foreground)]">
                {nama}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-[var(--color-muted-foreground)]/80">
        Sumber: data kependudukan Desa Maja (dapat diperbarui melalui admin).
      </p>
    </div>
  );
}
