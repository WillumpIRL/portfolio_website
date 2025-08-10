import { useEffect, useRef } from 'react';

/**
 * SunDynamic: sun that moves along the right edge with scroll (bottom->top off-screen).
 * - y position maps to scroll progress through the initial 2x viewport heights
 * - emits a custom event with its screen position for lighting consumers
 */
export default function SunDynamic() {
  const sunRef = useRef(null);

  useEffect(() => {
    const el = sunRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function update() {
      const vh = window.innerHeight;
      const total = vh * 2; // move over first ~2 screens
      const y = Math.max(0, Math.min(total, window.scrollY));
      const t = y / total; // 0 at start, 1 at end
      // Map t: 0 -> bottom (85vh), 1 -> off top (-30vh)
      const sunYvh = 85 - t * 115; // from 85vh to -30vh
      el.style.top = `calc(${sunYvh}vh)`;

      // Broadcast sun position for lighting
      const event = new CustomEvent('sun:position', {
        detail: {
          x: window.innerWidth * 0.9, // near right edge
          y: (sunYvh / 100) * window.innerHeight,
          t,
        },
      });
      window.dispatchEvent(event);
    }

    update();
    if (!reduce) window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={sunRef}
      aria-hidden
      className="pointer-events-none fixed right-[-20vw] -z-10 h-[70vh] w-[70vh] sm:h-[85vh] sm:w-[85vh]"
      style={{ top: '85vh' }}
    >
      {/* Core sun and glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,120,1),rgba(255,160,80,0.85),rgba(255,120,40,0.5),rgba(255,100,20,0.25),transparent)]" />
      <div className="absolute inset-0 blur-[40px] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,120,0.8),rgba(255,160,80,0.35),transparent)]" />
      <div className="absolute inset-0 blur-[80px] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,120,0.4),transparent)]" />
    </div>
  );
}

