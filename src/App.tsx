import { useTheme } from './context/ThemeContext';
import { portfolioData } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';

function App() {
  const { theme } = useTheme();
  const { identities, projects } = portfolioData;
  const currentIdentity = identities[theme];

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-0 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center py-20 max-w-3xl mx-auto">
          <div className="relative inline-block mb-8">
            {currentIdentity.image.endsWith('.mp4') || currentIdentity.image.endsWith('.webm') ? (
              <video 
                src={currentIdentity.image} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-32 h-32 rounded-full object-cover border-4 border-accent shadow-xl"
              />
            ) : (
              <img 
                src={currentIdentity.image} 
                alt={currentIdentity.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-accent shadow-xl"
              />
            )}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6">
            {currentIdentity.name}
          </h1>
          <p className="text-xl md:text-2xl text-text/80 leading-relaxed mb-8">
            {currentIdentity.bio}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {currentIdentity.skills.map(skill => (
              <span 
                key={skill} 
                className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-primary">
              {theme === 'artist' ? 'Creative Works' : 'Technical Projects'}
            </h2>
            <div className="h-1 flex-grow mx-6 bg-accent/10 rounded-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} mode={theme} />
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-accent/10 text-center text-text/50 text-sm">
        <p>© {new Date().getFullYear()} {currentIdentity.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
