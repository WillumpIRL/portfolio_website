import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    imageSrc: "/images/project-1.jpg",
    title: "Next.js Dashboard",
    description: "Analytics dashboard with Next.js, Charts, and SSR.",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/",
  },
  {
    imageSrc: "/images/project-2.jpg",
    title: "E-commerce Store",
    description: "Headless commerce storefront with payments integration.",
    tech: ["Next.js", "Stripe", "Prisma"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/",
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const tags = useMemo(() => ["All", ...Array.from(new Set(projects.flatMap((p) => p.tech)))], []);
  const filtered = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter))), [filter]);

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-2xl sm:text-3xl font-bold">Projects</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-3 py-1.5 rounded-md text-sm border ${
              filter === tag
                ? "bg-brand-600 text-white border-brand-600"
                : "border-black/10 dark:border-white/15 hover:bg-white/60 dark:hover:bg-neutral-800/60"
            }`}
            aria-pressed={filter === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}

