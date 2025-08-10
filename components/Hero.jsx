import Link from "next/link";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-b from-brand-50 to-white dark:from-brand-900/20 dark:to-neutral-950 p-8 sm:p-12"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          id="hero-heading"
          className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          William James
        </motion.h1>
        <motion.p
          className="mt-3 text-base sm:text-lg text-muted"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Software Engineer crafting performant web apps with Next.js, TypeScript, and great UX.
        </motion.p>
        <motion.div
          className="mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="#projects"
            className="inline-flex items-center rounded-md bg-brand-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-neutral-900/60 text-foreground px-5 py-2.5 text-sm font-medium hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

