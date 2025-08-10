export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-muted flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          © {year} William James. All rights reserved.
        </p>
        <p className="flex items-center gap-2">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <span aria-hidden>•</span>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}

