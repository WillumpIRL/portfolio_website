export default function Card({ className = "", children }) {
  return (
    <div className={`rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 ${className}`}>
      {children}
    </div>
  );
}

