import TorusBelt3D from '@/components/TorusBelt3D';
import SunDynamic from '@/components/SunDynamic';
import SunlightOverlay from '@/components/SunlightOverlay';

export default function SpaceHero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate">
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 bg-neutral-950" aria-hidden />
      <TorusBelt3D />
      <SunDynamic />
      <SunlightOverlay />

      {/* Hero content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 pb-24 sm:pt-32 sm:pb-28">
        <h1 id="hero-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          William James
        </h1>
        <p className="mt-4 max-w-prose text-base sm:text-lg text-slate-300">
          Software Engineer crafting performant web apps with Next.js, TypeScript, and great UX.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <a href="#projects" className="rounded-md bg-brand-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-brand-700">
            View Projects
          </a>
          <a href="#contact" className="rounded-md border border-white/20 bg-white/10 text-white px-5 py-2.5 text-sm font-medium backdrop-blur hover:bg-white/20">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

