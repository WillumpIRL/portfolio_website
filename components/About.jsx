import Image from "next/image";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="grid gap-8 sm:grid-cols-5 items-center">
      <div className="sm:col-span-2">
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
      </div>
      <div className="sm:col-span-3">
        <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold">About</h2>
        <p className="mt-3 text-muted">
          I’m a software engineer focused on building delightful, accessible, and performant web applications.
          I love working across the stack with Next.js, TypeScript, and modern tooling.
        </p>
      </div>
    </section>
  );
}

