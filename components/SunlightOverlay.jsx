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
      const t = Math.min(1, scrollY / (viewportH * 1.25));
      const eased = t * (2 - t);
      const scale = 1 + eased * 5;
      el.style.transform = `translateZ(0) scaleY(${scale.toFixed(3)})`;
      el.style.opacity = (0.35 + eased * 0.25).toFixed(3);
    }

    // React to sun position to move the overlay's gradient origin
    function onSunPosition(e) {
      // Position gradient focus based on sun x/y in viewport
      const { x, y } = e.detail;
      const xPct = (x / window.innerWidth) * 100;
      const yPct = (y / window.innerHeight) * 100;
      el.style.backgroundImage = `radial-gradient(120% 80% at ${xPct}% ${yPct}%, rgba(255,200,120,0.45), rgba(255,150,60,0.25) 40%, rgba(255,120,30,0.15) 65%, rgba(0,0,0,0) 100%)`;
    }

    function onResize() {
      onScroll();
    }

    onScroll();
    if (!prefersReduced) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
    }
    window.addEventListener('sun:position', onSunPosition);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('sun:position', onSunPosition);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={overlayRef}
      className="fixed inset-x-0 top-0 -z-10 h-[120vh] origin-top transition-[transform,opacity] duration-300 will-change-transform"
    />
  );
}

