import SpaceHero from '@/components/SpaceHero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <SpaceHero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
    </div>
  );
}
