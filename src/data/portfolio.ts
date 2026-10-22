import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  identities: {
    artist: {
      name: "MEMX.TV L'ARISTE",
      bio: "Hago arte lol.",
      image: 'artistIdentityImage',
      skills: ["Watercolor", "Animation", "Digital Art"]
    },
    engineer: {
      name: "MEMX.TV",
      bio: "Computer Engineering graduate specializing in project management and videogame development. I have experience as Scrum Master and Project Manager leading multidisciplinary teams across web development and software design, driving deliverables from inception to launch.",
      image: 'engineerIdentityImage',
      skills: ["Unity", "TypeScript", "React", "Git", "CSS"]
    }
  },
  projects: [
    {
      id: 'p1',
      artist: {
        title: "Tu Ciudad en Agua",
        description: "A series watercolor drawings exploring cities in a way that connects with me",
        image: 'artistCarousel20250826',
        tags: ["Watercolor", "Exploration", "Urban"]
      },
      engineer: {
        title: "PingPing PongPong",
        description: "A high-performance intensity vr videogame built with Unity and C#.",
        image: 'engineerCarousel20260415',
        repoUrl: 'engineerProjectRepository',
        tags: ["Unity", "C#", "Virtual Reality"]
      }
    },
    {
      id: 'p2',
      artist: {
        title: "Birds on birds",
        description: "I was in a gift giving mood, so I gave away all of my birds.",
        image: 'artistCarousel20260810',
        tags: ["Watercolor", "Nature", "Animals"]
      },
      engineer: {
        title: "Rainbow Relax",
        description: "I contributed to Rainbow Relax, a breathing exercise experience created by The Trevor Project.",
        demoUrl: 'engineerProjectDemo',
        tags: ["The Trevor Project", "Web App", "Wellness"]
      }
    },
    {
      id: 'p3',
      artist: {
        title: "Animation Courses",
        description: "As part of the Society of Videogame Development at the Engineering Faculty of UNAM, I taught a series of animation courses to students.",
        image: 'artistAnimationVideo',
        tags: ["Animation", "Teaching"]
      },
      engineer: {
        title: "SODVI",
        description: "As part of the Society of Videogame Development at the Engineering Faculty of UNAM, I participated in several development projects.",
        image: 'engineerProjectVideo',
        tags: ["Game Development", "Music", "Management"]
      }
    },
  ]
};
