import { useEffect, useRef } from 'react';

/**
 * Starfield renders a performant canvas where small bright stars orbit around a sun.
 * - Uses requestAnimationFrame for smooth animation
 * - Respects prefers-reduced-motion
 * - Adapts to devicePixelRatio and resizes with the viewport
 */
export default function Starfield({ sunCenterRatioX = 1.05, sunCenterRatioY = 0.25, starCount = 160 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Initialize stars with random orbital radii and speeds
    function initStars() {
      const isMobile = width < 640;
      const count = isMobile ? Math.floor(starCount * 0.6) : starCount;
      const centerX = width * sunCenterRatioX; // slightly offscreen to the right
      const centerY = height * sunCenterRatioY; // upper portion of the viewport
      starsRef.current = Array.from({ length: count }).map(() => {
        const orbitRadius = (Math.random() ** 1.7) * Math.max(width, height) * 0.9 + 40;
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.001 + Math.random() * 0.0018) * (Math.random() < 0.5 ? 1 : -1); // cw/ccw
        const size = Math.random() * 1.8 + 0.6; // star size in px
        const brightness = 0.75 + Math.random() * 0.25;
        return { orbitRadius, angle, speed, size, brightness, centerX, centerY };
      });
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background stars glow behind animated stars for depth
      // (low-cost: faint radial gradient near sun)
      const grad = ctx.createRadialGradient(
        width * sunCenterRatioX,
        height * sunCenterRatioY,
        10,
        width * sunCenterRatioX,
        height * sunCenterRatioY,
        Math.max(width, height)
      );
      grad.addColorStop(0, 'rgba(255, 190, 120, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw orbiting stars
      for (const star of starsRef.current) {
        star.angle += star.speed; // advance orbit
        const x = star.centerX + Math.cos(star.angle) * star.orbitRadius;
        const y = star.centerY + Math.sin(star.angle) * star.orbitRadius;
        // Subtle twinkle by modulating alpha with angle
        const alpha = Math.max(0.15, Math.abs(Math.cos(star.angle * 3)) * 0.7) * star.brightness;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(step);
    }

    function start() {
      resize();
      initStars();
      if (!mediaQuery.matches) {
        animationRef.current = requestAnimationFrame(step);
      }
    }

    function stop() {
      cancelAnimationFrame(animationRef.current);
    }

    const onResize = () => {
      resize();
      initStars();
    };

    start();
    window.addEventListener('resize', onResize);
    const onMotionChange = () => {
      stop();
      if (!mediaQuery.matches) start();
    };
    mediaQuery.addEventListener('change', onMotionChange);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      mediaQuery.removeEventListener('change', onMotionChange);
    };
  }, [sunCenterRatioX, sunCenterRatioY, starCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-dvh w-dvw"
    />
  );
}

