import { useEffect, useRef } from 'react';

/**
 * SunlightOverlay creates a warm hue overlay that expands downward with scroll.
 * - Positioned behind content but above background (z-index lower than content wrappers)
 * - Uses transform scaleY to expand smoothly based on scroll position
 * - Tied to the sun glow color for cohesion
 */
export default function SunlightOverlay() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const el = overlayRef.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function onScroll() {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      // Expand faster at start, then slow: ease via tanh-like curve
      const t = Math.min(1, scrollY / (viewportH * 1.25));
      const eased = t * (2 - t); // quadratic ease-out
      // scale from ~1 to ~6x to tint lower sections as you scroll
      const scale = 1 + eased * 5;
      el.style.transform = `translateZ(0) scaleY(${scale.toFixed(3)})`;
      // Increase opacity slightly with scroll for stronger tint
      el.style.opacity = (0.35 + eased * 0.25).toFixed(3);
    }

    function onResize() {
      onScroll();
    }

    onScroll();
    if (!prefersReduced) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={overlayRef}
      className="fixed inset-x-0 top-0 -z-10 h-[120vh] origin-top bg-[radial-gradient(120%_80%_at_80%_0%,rgba(255,200,120,0.45),rgba(255,150,60,0.25)_40%,rgba(255,120,30,0.15)_65%,rgba(0,0,0,0)_100%)] transition-[transform,opacity] duration-300 will-change-transform"
    />
  );
}

