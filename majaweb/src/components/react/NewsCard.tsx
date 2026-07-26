import { motion } from "framer-motion";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  slug?: string;
}

export default function NewsCard({
  title,
  excerpt,
  date,
  category,
  image = "/images/placeholder-news.jpg",
  slug = "#",
}: NewsCardProps) {
  return (
    <motion.article
      className="group h-full bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F0EBD8]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-lg bg-[var(--color-primary)] text-white">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 md:p-6 flex flex-col">
        {/* Date */}
        <time className="text-xs text-[#6B7280] mb-2 flex items-center gap-1.5" dateTime={date}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          {new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>

        <h3 className="text-base md:text-lg font-bold text-[#1B4332] mb-2 line-clamp-2 group-hover:text-[#2D6A4F] transition-colors duration-200" style={{ fontFamily: "Lexend, sans-serif" }}>
          {title}
        </h3>

        <p className="text-sm text-[#6B7280] line-clamp-3 flex-1">
          {excerpt}
        </p>

        <a
          href={`/berita/${slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D6A4F] hover:text-[#40916C] transition-colors duration-200 cursor-pointer"
        >
          Baca Selengkapnya
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
