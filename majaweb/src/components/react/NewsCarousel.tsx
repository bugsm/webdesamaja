import { useRef } from "react";

interface NewsItem {
  title: string;
  excerpt?: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
}

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Tombol navigasi (desktop) */}
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Berita sebelumnya"
        className="absolute -left-4 top-[28%] z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-md transition-all hover:bg-[var(--color-primary)] hover:text-white md:flex"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Berita berikutnya"
        className="absolute -right-4 top-[28%] z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-md transition-all hover:bg-[var(--color-primary)] hover:text-white md:flex"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Track carousel */}
      <div
        ref={trackRef}
        className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
      >
        {items.map((news) => (
          <article
            key={news.slug}
            className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <a
              href={`/berita/${news.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Gambar penuh 4:3 */}
              {news.image ? (
                <img
                  src={news.image}
                  alt={news.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/25 to-[var(--color-accent)]/25 text-white/50">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              )}

              {/* Overlay gradasi agar teks terbaca */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Badge kategori kiri-atas */}
              <span className="absolute left-3 top-3 rounded-lg bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {news.category}
              </span>

              {/* Tag tanggal + judul (di dalam gambar) */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <time dateTime={news.date}>
                    {new Date(news.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </span>
                <h3
                  className="mt-2 line-clamp-2 text-base font-bold text-white drop-shadow-sm md:text-lg"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  {news.title}
                </h3>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
