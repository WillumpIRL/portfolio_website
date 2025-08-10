import { useEffect, useMemo, useRef } from 'react';

/**
 * TorusBelt3D: Enhanced CSS 3D torus-shaped asteroid belt with natural randomness and infinite looping.
 * - Stars have randomized positions, sizes, and brightness for natural variance
 * - Continuous infinite rotation with stars seamlessly cycling from left to right
 * - 3D depth effects: scaling, opacity, and brightness based on z-position
 * - Smooth animation using requestAnimationFrame with proper cleanup
 */
export default function TorusBelt3D({ majorRadius = 320, minorRadius = 80, rings = 32, slices = 12 }) {
  const rootRef = useRef(null);
  const beltRef = useRef(null);
  const starRefs = useRef([]);
  const sunCenterRef = useRef({ x: 0, y: 0 });
  const reduceMotion = useRef(false);
  const animationRef = useRef(null);

  // Precompute torus grid samples with enhanced randomness
  const samples = useMemo(() => {
    const arr = [];
    
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < slices; j++) {
        // Base angles with natural randomness to break uniformity
        const baseTheta = (i / rings) * Math.PI * 2;
        const basePhi = (j / slices) * Math.PI * 2;
        
        // Add randomness to theta (orbit position) - creates natural spacing variation
        const thetaJitter = (Math.random() - 0.5) * 0.4; // ±0.2 radians
        const theta = baseTheta + thetaJitter;
        
        // Add randomness to phi (tube position) - creates depth variation
        const phiJitter = (Math.random() - 0.5) * 0.3; // ±0.15 radians
        const phi = basePhi + phiJitter;
        
        // Randomize star properties for natural variance
        const sizeVariation = 0.7 + Math.random() * 0.6; // 0.7x to 1.3x base size
        const brightnessVariation = 0.6 + Math.random() * 0.8; // 0.6x to 1.4x brightness
        const orbitSpeedVariation = 0.8 + Math.random() * 0.4; // 0.8x to 1.2x speed
        
        arr.push({ 
          theta, 
          phi, 
          sizeVariation,
          brightnessVariation,
          orbitSpeedVariation,
          // Store base values for consistent animation
          baseTheta,
          basePhi
        });
      }
    }
    
    return arr;
  }, [rings, slices]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function onSun(e) {
      // Track sun center so we can position the torus origin accordingly
      sunCenterRef.current = e.detail;
      const { x, y, r } = e.detail;
      
      // Move root to sun center projected into screen; we anchor the belt container at that point
      const root = rootRef.current;
      root.style.left = `${x}px`;
      root.style.top = `${y}px`;
      
      // Match torus vertical diameter to sun: set minorRadius dynamically to ~sun radius
      if (beltRef.current) {
        beltRef.current.style.setProperty('--torusMinor', `${Math.max(40, r * 0.9)}px`);
      }
    }

    window.addEventListener('sun:position', onSun);
    return () => window.removeEventListener('sun:position', onSun);
  }, []);

  useEffect(() => {
    const belt = beltRef.current;
    const refs = starRefs.current;
    let thetaOffset = 0; // global rotation angle for continuous belt movement

    function animate() {
      // Continuous rotation: negative value for counter-clockwise, positive for clockwise
      thetaOffset -= 0.008; // Smooth, consistent rotation speed
      
      // Ensure thetaOffset stays within reasonable bounds to prevent precision issues
      if (thetaOffset < -Math.PI * 4) {
        thetaOffset += Math.PI * 4;
      }

      // Dynamic perspective based on viewport width for responsive 3D effect
      const perspectivePx = Math.min(1200, Math.max(700, window.innerWidth));
      belt.style.perspective = `${perspectivePx}px`;

      for (let i = 0; i < samples.length; i++) {
        const el = refs[i];
        if (!el) continue;
        
        const { theta, phi, sizeVariation, brightnessVariation, orbitSpeedVariation } = samples[i];
        
        // Apply individual orbit speed variation for natural movement
        const th = theta + (thetaOffset * orbitSpeedVariation);

        // Parametric torus coordinates with enhanced 3D positioning
        const R = majorRadius;
        // Use runtime-adjusted minor radius if provided via CSS var, else default prop
        const rVar = parseFloat(getComputedStyle(belt).getPropertyValue('--torusMinor')) || minorRadius;
        const r = rVar;
        
        // Calculate 3D coordinates
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const cosTh = Math.cos(th);
        const sinTh = Math.sin(th);
        
        // Torus parametric equations
        const x = (R + r * cosPhi) * cosTh;
        const y = r * sinPhi;
        const z = (R + r * cosPhi) * sinTh;

        // Visibility culling: only render near-side stars (negative z = toward camera)
        // This ensures we only show stars on the visible left half of the torus
        if (z > 0) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          continue;
        }

        // Enhanced 3D depth effects based on z-position
        const zFront = -50;   // Closest stars (front of torus)
        const zBack = -600;   // Farthest stars (back of torus)
        const depth01 = Math.max(0, Math.min(1, (z - zBack) / (zFront - zBack)));
        
        // Dynamic opacity based on depth and individual brightness variation
        const baseOpacity = 0.2 + depth01 * 0.8; // 0.2 to 1.0 range
        const finalOpacity = baseOpacity * brightnessVariation;
        
        // Dynamic scaling based on depth for 3D perspective effect
        const baseScale = 0.5 + depth01 * 1.0; // 0.5x to 1.5x range
        const finalScale = baseScale * sizeVariation;
        
        // Apply transforms with enhanced 3D positioning
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${finalScale})`;
        el.style.opacity = Math.min(1, Math.max(0, finalOpacity)).toFixed(3);
        el.style.pointerEvents = 'auto';
      }

      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    }

    // Start animation only if motion is not reduced
    if (!reduceMotion.current) {
      animationRef.current = requestAnimationFrame(animate);
    }

    // Cleanup function to cancel animation frame
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [samples, majorRadius, minorRadius]);

  return (
    <div 
      aria-hidden 
      ref={rootRef} 
      className="pointer-events-none fixed -z-10" 
      style={{ left: '100vw', top: '100vh' }}
    >
      {/* Torus belt container: positioned at sun center, shifted left by major radius for visibility */}
      <div
        ref={beltRef}
        className="relative [transform-style:preserve-3d] will-change-transform"
        style={{ 
          perspective: '1000px', 
          transform: `translateX(-${majorRadius}px)` 
        }}
      >
        {/* Individual stars with enhanced styling */}
        {samples.map((_, i) => (
          <span
            key={i}
            ref={(r) => (starRefs.current[i] = r)}
            className="absolute left-0 top-0 block rounded-full bg-white shadow-[0_0_6px_#fff,0_0_12px_#fff] will-change-transform"
            style={{ 
              transform: 'translateZ(0)', 
              opacity: 0,
              // Dynamic sizing based on depth and randomness
              width: '2px',
              height: '2px'
            }}
          />
        ))}
      </div>
    </div>
  );
}

