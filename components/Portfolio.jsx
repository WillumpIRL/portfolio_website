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
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-2xl sm:text-3xl font-bold">Projects</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />)
        )}
      </div>
    </section>
  );
}

