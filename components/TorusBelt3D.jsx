import { useEffect, useMemo, useRef } from 'react';

/**
 * TorusBelt3D: CSS 3D torus-shaped asteroid belt centered on the moving sun.
 * - Positions stars via parametric torus math: R = major radius, r = minor radius (tube radius)
 *   x(θ,φ) = (R + r cos φ) cos θ
 *   y(θ,φ) = r sin φ
 *   z(θ,φ) = (R + r cos φ) sin θ
 * - We render only the near-side hemisphere (left half from the viewer perspective on right edge)
 * - The belt rotates smoothly by advancing θ over time
 * - Center follows the latest sun position broadcast via `sun:position`
 */
export default function TorusBelt3D({ majorRadius = 320, minorRadius = 80, rings = 28, slices = 10 }) {
  const rootRef = useRef(null);
  const beltRef = useRef(null);
  const starRefs = useRef([]);
  const sunCenterRef = useRef({ x: 0, y: 0 });
  const reduceMotion = useRef(false);

  // Precompute torus grid samples
  const samples = useMemo(() => {
    const arr = [];
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < slices; j++) {
        // base angles evenly across torus
        const theta = (i / rings) * Math.PI * 2;
        const phi = (j / slices) * Math.PI * 2;
        arr.push({ theta, phi, jitter: (Math.random() - 0.5) * 0.2 });
      }
    }
    return arr;
  }, [rings, slices]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function onSun(e) {
      // Track sun center so we can position the torus origin accordingly
      sunCenterRef.current = e.detail;
      const { x, y } = e.detail;
      // Move root to sun center projected into screen; we anchor the belt container at that point
      const root = rootRef.current;
      root.style.left = `${x}px`;
      root.style.top = `${y}px`;
    }

    window.addEventListener('sun:position', onSun);
    return () => window.removeEventListener('sun:position', onSun);
  }, []);

  useEffect(() => {
    const belt = beltRef.current;
    const refs = starRefs.current;
    let raf = 0;
    let thetaOffset = 0; // global rotation angle

    function frame() {
      thetaOffset += 0.01; // global belt rotation speed
      const perspectivePx = Math.min(1200, Math.max(700, window.innerWidth));
      belt.style.perspective = `${perspectivePx}px`;

      for (let i = 0; i < samples.length; i++) {
        const el = refs[i];
        if (!el) continue;
        const { theta, phi, jitter } = samples[i];
        // Advance theta for rotation and add slight jitter to break uniformity
        const th = theta + thetaOffset + jitter;

        // Parametric torus coordinates
        const R = majorRadius;
        const r = minorRadius;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const cosTh = Math.cos(th);
        const sinTh = Math.sin(th);
        const x = (R + r * cosPhi) * cosTh;
        const y = r * sinPhi;
        const z = (R + r * cosPhi) * sinTh;

        // Only render near-side (left half from viewer looking toward right edge):
        // On the right side of screen, near-side corresponds to negative z values (toward camera)
        // We also horizontally clip to avoid drawing off the left side when the sun is near edge.
        if (z > 0) {
          el.style.opacity = '0';
          continue;
        }

        // Depth normalization for opacity/scale
        const zFront = -50;
        const zBack = -600;
        const depth01 = Math.max(0, Math.min(1, (z - zBack) / (zFront - zBack)));
        const opacity = 0.15 + depth01 * 0.85;
        const scale = 0.6 + depth01 * 0.9;

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        el.style.opacity = opacity.toFixed(3);
      }

      raf = requestAnimationFrame(frame);
    }

    if (!reduceMotion.current) raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [samples, majorRadius, minorRadius]);

  return (
    <div aria-hidden ref={rootRef} className="pointer-events-none fixed -z-10" style={{ left: '100vw', top: '100vh' }}>
      {/* Position at the sun center; shift belt left by its major radius so near side is on-screen */}
      <div
        ref={beltRef}
        className="relative [transform-style:preserve-3d] will-change-transform"
        style={{ perspective: '1000px', transform: `translateX(-${majorRadius}px)` }}
      >
        {samples.map((_, i) => (
          <span
            key={i}
            ref={(r) => (starRefs.current[i] = r)}
            className="absolute left-0 top-0 block h-[1.5px] w-[1.5px] rounded-full bg-white shadow-[0_0_4px_#fff] will-change-transform"
            style={{ transform: 'translateZ(0)', opacity: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

