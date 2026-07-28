import { motion } from "framer-motion";

export interface Official {
  name: string;
  gelar?: string;
  position: string;
  photo?: any; // Sanity image object
}

const fallbackOfficials: Official[] = [
  { name: "H. Ahmad Sudirman", gelar: "", position: "Kepala Desa" },
  { name: "Siti Aminah", gelar: "S.Pd.", position: "Sekretaris Desa" },
  { name: "Budi Santoso", position: "Kaur Keuangan" },
  { name: "Rina Wati", position: "Kaur Perencanaan" },
  { name: "Joko Widodo", position: "Kasi Pemerintahan" },
  { name: "Dewi Sartika", position: "Kasi Kesejahteraan" },
  { name: "Agus Setiawan", position: "Kasi Pelayanan" },
  { name: "Maryam", position: "Kepala Dusun 1" },
  { name: "Suparman", position: "Kepala Dusun 2" },
  { name: "Rustam", position: "Kepala Dusun 3" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((w) => !w.startsWith("(") && !w.endsWith(")"))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function OrgChart({ officials = fallbackOfficials }: { officials?: Official[] }) {
  // Kepala Desa first, then the rest
  const kepala = officials[0];
  const perangkat = officials.slice(1);

  return (
    <div>
      {/* Kepala Desa - featured card */}
      <motion.div
        className="max-w-sm mx-auto mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-[#2D6A4F] rounded-2xl p-6 text-center shadow-lg">
          {kepala.photo ? (
            <img src={kepala.photo} alt={kepala.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white/20" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold" style={{ fontFamily: "Lexend, sans-serif" }}>
              {getInitials(kepala.name)}
            </div>
          )}
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Lexend, sans-serif" }}>
            {kepala.name}{kepala.gelar ? `, ${kepala.gelar}` : ''}
          </h3>
          <span className="inline-block mt-2 px-4 py-1 rounded-full bg-[#D4A373] text-[#1B4332] text-sm font-semibold">
            {kepala.position}
          </span>
        </div>
      </motion.div>

      {/* Perangkat Desa Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {perangkat.map((person, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-5 text-center shadow-sm border border-[#D4D4AA]/50 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {person.photo ? (
              <img src={person.photo} alt={person.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-[#D4D4AA]" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#1B4332]/5 flex items-center justify-center mx-auto mb-3 text-[#2D6A4F] text-xl font-bold" style={{ fontFamily: "Lexend, sans-serif" }}>
                {getInitials(person.name)}
              </div>
            )}
            <h4 className="font-bold text-[#1B4332] text-sm md:text-base leading-tight mb-1" style={{ fontFamily: "Lexend, sans-serif" }}>
              {person.name}{person.gelar ? `, ${person.gelar}` : ''}
            </h4>
            <p className="mt-1 text-xs text-[#6B7280]">{person.position}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
