import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  identities: {
    artist: {
      name: "memx.tv l'artiste",
      bio: "Hago arte lol.",
      image: "https://res.cloudinary.com/drajm83r/video/upload/v1792553682/20260821_140948.mp4",
      skills: ["Watercolor", "Animation"]
    },
    engineer: {
      name: "memx.tv le PM",
      bio: "Software Engineer I really like making videogames and moving people to action.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      skills: ["Unity", "TypeScript", "React"]
    }
  },
  projects: [
    {
      id: 'p1',
      artist: {
        title: "Ethereal Dreams",
        description: "A series of abstract digital paintings exploring subconscious states.",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
        tags: ["Digital Art", "Abstract"]
      },
      engineer: {
        title: "Distributed Neural Net",
        description: "A high-performance implementation of a neural network using distributed computing principles.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
        tags: ["Python", "CUDA", "Distributed Systems"]
      }
    },
    {
      id: 'p2',
      artist: {
        title: "Urban Geometry",
        description: "Capturing the structural lines of modern architecture through a high-contrast lens.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
        tags: ["Photography", "Minimalism"]
      }
    },
    {
      id: 'p3',
      engineer: {
        title: "Real-time Analytics Engine",
        description: "An extremely low-latency data processing pipeline built with Go and Kafka.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        tags: ["Go", "Kafka", "Docker"]
      }
    },
    {
      id: 'rainbow-relax',
      engineer: {
        title: "Rainbow Relax",
        description: "I contributed to Rainbow Relax, a breathing exercise experience created by The Trevor Project.",
        demoUrl: "https://rainbowrelax.web.app/",
        tags: ["The Trevor Project", "Web App", "Wellness"]
      }
    }
  ]
};
