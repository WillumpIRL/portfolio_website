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
      const vw = window.innerWidth;
      const total = vh * 2; // move over first ~2 screens
      const yScroll = Math.max(0, Math.min(total, window.scrollY));
      const t = yScroll / total; // 0 at start, 1 at end

      // Compute sun dimensions and radius for quadrant placement
      const sunH = el.offsetHeight || vh * 0.8;
      const sunW = el.offsetWidth || sunH;
      const r = Math.min(sunW, sunH) / 2;

      // Initial position (scroll 0): center just outside bottom-right by radius in both axes
      // This makes only the top-left quadrant visible at the lower-right edge
      const startTopPx = vh - r; // center.y = vh + r -> top = (vh + r) - sunH/2 => vh - r
      const startRightPx = -r; // center.x = vw + r -> right = -r

      // End position: move center up so sun is fully off-screen above top by a radius
      const endTopPx = -sunH; // fully off-screen

      // Interpolate top between start and end based on scroll t
      const topPx = Math.round(startTopPx + (endTopPx - startTopPx) * t);
      el.style.top = `${topPx}px`;
      el.style.right = `${startRightPx}px`;

      // Sun center for lighting: (vw + r, top + r)
      const centerX = vw + r;
      const centerY = topPx + r;

      const detail = { x: centerX, y: centerY, t };
      window.dispatchEvent(new CustomEvent('sun:position', { detail }));
      // Dispatch once more on next frame to ensure late listeners receive initial position
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('sun:position', { detail }));
      });
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

