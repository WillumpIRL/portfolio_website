import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== "undefined" && localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="rounded-md border border-black/10 dark:border-white/15 px-2.5 py-1.5 text-sm hover:bg-white/60 dark:hover:bg-neutral-800/60"
      onClick={() => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
      }}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

