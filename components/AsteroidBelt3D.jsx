import { useEffect, useMemo, useRef } from 'react';

/**
 * AsteroidBelt3D: CSS-3D transform based star/asteroid belt.
 * - Stars are positioned in a ring around the sun and revolve around the vertical axis
 * - As stars approach the front, they translateZ outward (toward viewer) and drift right
 * - Opacity/scale increase at the front and decrease at the back
 * - Stars recycle seamlessly to create a continuous belt
 * - Uses requestAnimationFrame for a single composited transform update per star
 */
export default function AsteroidBelt3D({ count = 120, ringRadius = 420 }) {
  const containerRef = useRef(null);
  const starRefs = useRef([]);
  const reduceMotion = useRef(false);

  const stars = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      baseAngle: (i / count) * Math.PI * 2, // even distribution around the ring
      yOffset: (Math.random() - 0.5) * 60, // slight vertical jitter for depth
      size: 1 + Math.random() * 2,
      speed: 0.0007 + Math.random() * 0.0015,
      drift: 10 + Math.random() * 20, // right drift when near front
    })),
  [count]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = containerRef.current;
    const refs = starRefs.current;
    let raf = 0;
    let globalAngle = 0;

    function frame() {
      globalAngle += 0.004; // belt rotation speed
      const perspectivePx = Math.min(1200, Math.max(600, window.innerWidth));
      el.style.perspective = `${perspectivePx}px`;

      for (let i = 0; i < stars.length; i++) {
        const starEl = refs[i];
        if (!starEl) continue;
        const s = stars[i];
        const theta = s.baseAngle + globalAngle * s.speed * 600; // per-star variation

        // phase in range [-π, π] where 0 is front-facing
        let phase = ((theta + Math.PI) % (Math.PI * 2)) - Math.PI;

        // TranslateZ magnitude: larger near front (phase≈0), smaller at back
        const zFront = 280;
        const zBack = -300;
        const z = zBack + (1 - Math.abs(phase) / Math.PI) * (zFront - zBack);

        // Compute opacity and scale based on z depth
        const depth01 = (z - zBack) / (zFront - zBack);
        const opacity = 0.15 + depth01 * 0.85;
        const scale = 0.6 + depth01 * 0.9;

        // Horizontal drift to the right near the front to imply passing by
        const driftX = s.drift * depth01;

        // Compose transform: rotate around Y, then push out by translateZ, slight vertical offset
        // Using will-change on each star keeps this on the compositor
        starEl.style.transform = `
          rotateY(${theta}rad)
          translateZ(${ringRadius}px)
          translateZ(${z}px)
          translateX(${driftX}px)
          translateY(${s.yOffset}px)
          scale(${scale})
        `;
        starEl.style.opacity = opacity.toFixed(3);
      }

      raf = requestAnimationFrame(frame);
    }

    if (!reduceMotion.current) raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [ringRadius, stars]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 [transform-style:preserve-3d]"
      style={{ perspective: '1000px' }}
    >
      {/* Belt origin near right edge where the sun lives */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
        {stars.map((s, i) => (
          <span
            key={i}
            ref={(r) => (starRefs.current[i] = r)}
            className="absolute left-0 top-0 block h-1 w-1 rounded-full bg-white shadow-[0_0_4px_#fff] will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          />
        ))}
      </div>
    </div>
  );
}

