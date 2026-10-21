import { useTheme } from './context/ThemeContext';
import { portfolioData } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { CardCarousel } from './components/CardCarousel.tsx';
import { StickyCards } from './components/StickyCards.tsx';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';

function App() {
  const { theme } = useTheme();
  const { identities, projects } = portfolioData;
  const currentIdentity = identities[theme];

  return (
    <div className="flex min-h-screen flex-col overflow-clip bg-background text-text transition-colors duration-300">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-grow px-6">
        <section id="home" className="grid min-h-[68vh] scroll-mt-24 items-center gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            id="about"
            className="max-w-3xl"
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {theme === 'engineer' ? 'Engineer by logic / artist by instinct' : 'Artist by instinct / engineer by logic'}
            </p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] text-primary sm:text-6xl md:text-7xl">
              {currentIdentity.name}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text/75 sm:text-xl">
              {currentIdentity.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {currentIdentity.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-accent/25 px-4 py-2 text-sm font-medium text-text/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 rotate-3 rounded-2xl border border-accent/30" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-accent/10">
            {currentIdentity.image.endsWith('.mp4') || currentIdentity.image.endsWith('.webm') ? (
              <video 
                src={currentIdentity.image} 
                autoPlay 
                loop 
                muted 
                playsInline
                  className="h-full w-full object-cover"
              />
            ) : (
              <img 
                src={currentIdentity.image} 
                alt={currentIdentity.name}
                  className="h-full w-full object-cover"
              />
            )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6 pt-20 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  {theme === 'engineer' ? 'The engineer' : 'The artist'}
                </p>
                <p className="mt-1 text-2xl font-semibold">One person, two practices.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="border-t border-accent/15">
          <StickyCards mode={theme} />
        </div>

        <div className="border-t border-accent/15 py-20">
          <CardCarousel projects={projects} mode={theme} />
        </div>
      </main>

      <Footer name={currentIdentity.name} />
    </div>
  );
}

export default App;
