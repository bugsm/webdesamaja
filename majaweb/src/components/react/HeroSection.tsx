import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  image: string;
  title: string;
  category?: string;
}

interface HeroSectionProps {
  slides?: Slide[];
}

const FALLBACK_SLIDES: Slide[] = [
  { image: "/images/hero-desa.jpg", title: "Keindahan Alam Desa Maja", category: "Potensi Desa" },
];

const ROTATE_MS = 4500;

export default function HeroSection({ slides }: HeroSectionProps) {
  const data = slides && slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (data.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % data.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [data.length]);

  const current = data[index] ?? data[0];
  // Foto berikutnya untuk kartu-latar (kesan tumpukan)
  const nextImages = [
    data[(index + 1) % data.length]?.image,
    data[(index + 2) % data.length]?.image,
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-muted)] via-[var(--color-background)] to-[var(--color-background)]">
      {/* Blob dekoratif */}
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />

      <div className="container-village relative z-10 grid items-center gap-8 py-12 md:grid-cols-2 md:gap-12 md:py-20 lg:gap-16">
        {/* --- Teks --- */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-primary)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Kec. Kalianda, Lampung Selatan
            </span>
          </motion.div>

          <motion.h1
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-primary-dark)] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "Lexend, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Selamat Datang di{" "}
            <span className="text-gradient-accent">Desa Maja</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)] md:mx-0 md:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Portal informasi resmi Pemerintah Desa Maja. Menuju desa yang maju,
            mandiri, dan sejahtera melalui pelayanan publik yang transparan dan
            akuntabel.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="/profil"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary-light)] hover:shadow-lg"
            >
              Profil Desa
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/peta"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--color-primary)]/30 bg-white px-6 py-3 text-base font-semibold text-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Lihat Peta
            </a>
          </motion.div>
        </div>

        {/* --- Tumpukan foto potensi (stack) + transisi blur (4:3) --- */}
        <motion.div
          className="relative order-1 px-3 md:order-2 md:px-0"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="relative aspect-[4/3] w-full">
            {/* Kartu latar (kesan setumpuk foto) — pakai foto berikutnya */}
            {data.length > 1 && (
              <div
                aria-hidden="true"
                className="absolute inset-0 rotate-[6deg] scale-[0.94] overflow-hidden rounded-3xl bg-[var(--color-muted)] opacity-40 shadow-lg"
              >
                <img src={nextImages[1]} alt="" className="h-full w-full object-cover blur-[1px]" />
              </div>
            )}
            {data.length > 1 && (
              <div
                aria-hidden="true"
                className="absolute inset-0 rotate-[3deg] scale-[0.97] overflow-hidden rounded-3xl bg-[var(--color-muted)] opacity-70 shadow-lg"
              >
                <img src={nextImages[0]} alt="" className="h-full w-full object-cover blur-[0.5px]" />
              </div>
            )}

            {/* Kartu depan (aktif) dengan transisi blur */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl bg-[var(--color-muted)] shadow-xl ring-1 ring-black/5">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(16px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(16px)" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Overlay gradasi untuk keterbacaan caption */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Caption potensi */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                {current.category && (
                  <span className="inline-block rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    {current.category}
                  </span>
                )}
                <p
                  className="mt-2 text-lg font-bold text-white drop-shadow-sm md:text-xl"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  {current.title}
                </p>
              </div>

              {/* Titik indikator */}
              {data.length > 1 && (
                <div className="absolute right-3 top-3 flex gap-1.5">
                  {data.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Tampilkan gambar potensi ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Label kecil pojok kiri atas */}
              <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white">
                Potensi Desa
              </span>
            </div>
          </div>

          {/* Aksen dekoratif di belakang kartu */}
          <div className="absolute -bottom-4 -right-2 -z-10 h-24 w-24 rounded-2xl bg-[var(--color-primary)]/15" />
        </motion.div>
      </div>
    </section>
  );
}
