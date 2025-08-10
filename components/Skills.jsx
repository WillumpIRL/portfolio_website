const skills = [
  { name: 'Next.js' },
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'Node.js' },
  { name: 'TailwindCSS' },
  { name: 'Framer Motion' },
  { name: 'Vercel' },
  { name: 'PostgreSQL' },
  { name: 'Prisma' },
];

import { motion } from 'framer-motion';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-2xl sm:text-3xl font-bold">
        Skills
      </h2>
      <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill, idx) => (
          <motion.li
            key={skill.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            viewport={{ once: true }}
            className="rounded-lg border border-black/5 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 px-4 py-3 text-sm font-medium text-foreground"
          >
            {skill.name}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
