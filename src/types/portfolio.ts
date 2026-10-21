export type Identity = 'artist' | 'engineer';

export interface ProjectContent {
  title: string;
  description: string;
  image?: string;
  demoUrl?: string;
  tags: string[];
}

export interface Project {
  id: string;
  // If a property is optional, it means it's only shown in specific modes.
  // If it's missing for a mode, that mode won't show that project.
  artist?: ProjectContent;
  engineer?: ProjectContent;
}

export interface IdentityContent {
  name: string;
  bio: string;
  image: string;
  skills: string[];
}

export interface PortfolioData {
  identities: {
    artist: IdentityContent;
    engineer: IdentityContent;
  };
  projects: Project[];
}
