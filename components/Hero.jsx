import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-b from-brand-50 to-white dark:from-brand-900/20 dark:to-neutral-950 p-8 sm:p-12"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h1 id="hero-heading" className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          William James
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted">
          Software Engineer crafting performant web apps with Next.js, TypeScript, and great UX.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
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
        </div>
      </div>
    </section>
  );
}

