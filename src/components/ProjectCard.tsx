import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  mode: 'artist' | 'engineer';
}

export function ProjectCard({ project, mode }: ProjectCardProps) {
  // Get the content for the current mode
  const content = project[mode];

  // If there's no content for this mode, don't render anything
  if (!content) return null;

  return (
    <div className="group overflow-hidden rounded-2xl border border-accent bg-background shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
      <div className="aspect-video overflow-hidden">
        <img 
          src={content.image} 
          alt={content.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{content.title}</h3>
        <p className="text-text mb-4 line-clamp-3 text-sm leading-relaxed">
          {content.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {content.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs font-medium rounded bg-accent/10 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
