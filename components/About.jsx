import Image from 'next/image';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="grid gap-8 sm:grid-cols-5 items-center"
    >
      <motion.div
        className="sm:col-span-2"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative aspect-square overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
          <Image
            src="/images/profile.jpg"
            alt="Portrait of William James"
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
      <motion.div
        className="sm:col-span-3"
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold">
          About
        </h2>
        <p className="mt-3 text-muted">
          I’m a software engineer focused on building delightful, accessible, and performant web
          applications. I love working across the stack with Next.js, TypeScript, and modern
          tooling.
        </p>
      </motion.div>
    </section>
  );
}
