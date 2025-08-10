import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-950/75 backdrop-blur supports-[backdrop-filter]:bg-white/50 supports-[backdrop-filter]:dark:bg-neutral-950/60">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <Link href="#" className="flex items-center gap-2 font-extrabold text-base">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-white"
          >
            WJ
          </span>
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(e) => {
                    const target = document.querySelector(item.href);
                    if (target) {
                      e.preventDefault();
                      const y = target.getBoundingClientRect().top + window.scrollY - 64; // offset navbar height
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md bg-brand-600 text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Get in touch
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
