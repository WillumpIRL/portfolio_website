import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-brand-600 text-white rounded px-3 py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

