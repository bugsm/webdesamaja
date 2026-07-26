import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface DusunData {
  dusun: string;
  laki: number;
  perempuan: number;
  kk: number;
}

const fallbackData: DusunData[] = [
  { dusun: "Dusun 1 (Maja Induk)", laki: 450, perempuan: 480, kk: 210 },
  { dusun: "Dusun 2 (Maja Pesisir)", laki: 380, perempuan: 395, kk: 185 },
  { dusun: "Dusun 3 (Suka Maju)", laki: 320, perempuan: 310, kk: 150 },
];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          family: "'Source Sans 3', sans-serif",
          size: 13,
        },
        usePointStyle: true,
        pointStyle: "rectRounded",
        padding: 20,
      },
    },
    title: {
      display: true,
      text: "Jumlah Penduduk per Dusun",
      font: {
        family: "'Lexend', sans-serif",
        size: 16,
        weight: 700 as const,
      },
      color: "#1B4332",
      padding: { bottom: 20 },
    },
    tooltip: {
      backgroundColor: "#1B4332",
      titleFont: {
        family: "'Lexend', sans-serif",
        size: 13,
      },
      bodyFont: {
        family: "'Source Sans 3', sans-serif",
        size: 12,
      },
      cornerRadius: 8,
      padding: 12,
      callbacks: {
        label: (context: { dataset: { label?: string }; parsed: { y: number | null } }) => {
          return `${context.dataset.label}: ${context.parsed.y?.toLocaleString("id-ID")} jiwa`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Source Sans 3', sans-serif",
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0,0,0,0.05)",
      },
      ticks: {
        font: {
          family: "'Source Sans 3', sans-serif",
          size: 12,
        },
        callback: (value: string | number) => {
          return Number(value).toLocaleString("id-ID");
        },
      },
    },
  },
};

export default function PopulationChart({ data = fallbackData }: { data?: DusunData[] }) {
  const chartData = {
    labels: data.map((d) => d.dusun),
    datasets: [
      {
        label: "Laki-laki",
        data: data.map((d) => d.laki),
        backgroundColor: "#2D6A4F",
        borderRadius: 6,
      },
      {
        label: "Perempuan",
        data: data.map((d) => d.perempuan),
        backgroundColor: "#D4A373",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#D4D4AA]">
      <div className="h-[350px] md:h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
      <p className="mt-4 text-center text-xs text-[#6B7280]/70">
        * Data bersifat ilustrasi. Data resmi akan diperbarui melalui admin CMS.
      </p>
    </div>
  );
}
