/**
 * Sun: a partially offscreen glowing sun with warm radial gradient.
 * - Positioned to the right side
 * - Uses layered blurred circles to create glow
 */
export default function Sun() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-[-20vw] top-[-10vh] -z-10 h-[70vh] w-[70vh] sm:h-[85vh] sm:w-[85vh]"
    >
      {/* Core sun */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,120,1),rgba(255,160,80,0.85),rgba(255,120,40,0.5),rgba(255,100,20,0.25),transparent)]" />
      {/* Glow layers */}
      <div className="absolute inset-0 blur-[40px] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,120,0.8),rgba(255,160,80,0.35),transparent)]" />
      <div className="absolute inset-0 blur-[80px] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,120,0.4),transparent)]" />
    </div>
  );
}

