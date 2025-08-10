import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProjectCard({ imageSrc, title, description, tech = [], liveUrl, repoUrl }) {
  return (
    <motion.article
      className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
        {tech.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {tech.map((t) => (
              <li
                key={t}
                className="text-xs px-2 py-1 rounded bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200 border border-brand-100/60 dark:border-brand-900/40"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex items-center gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-brand-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-brand-700"
            >
              Live
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 px-3 py-1.5 text-sm font-medium hover:bg-white/60 dark:hover:bg-neutral-800/60"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
