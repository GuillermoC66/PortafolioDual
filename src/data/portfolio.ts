import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  identities: {
    artist: {
      name: "MEMX.TV L'ARISTE",
      bio: "Hago arte lol.",
      image: "https://res.cloudinary.com/drajm83r/image/upload/v1792595843/DSCF0234.jpg",
      skills: ["Watercolor", "Animation", "Digital Art"]
    },
    engineer: {
      name: "MEMX.TV",
      bio: "Computer Engineering graduate specializing in project management and videogame development. I have experience as Scrum Master and Project Manager leading multidisciplinary teams across web development and software design, driving deliverables from inception to launch.",
      image: "https://res.cloudinary.com/drajm83r/image/upload/v1792595833/20260129_143513.jpg",
      skills: ["Unity", "TypeScript", "React", "Git", "CSS"]
    }
  },
  projects: [
    {
      id: 'p1',
      artist: {
        title: "Tu Ciudad en Agua",
        description: "A series watercolor drawings exploring cities in a way that connects with me",
        image: "https://res.cloudinary.com/drajm83r/image/upload/v1792552739/20250826.jpg",
        tags: ["Watercolor", "Exploration", "Urban"]
      },
      engineer: {
        title: "PingPing PongPong",
        description: "A high-performance intensity vr videogame built with Unity and C#.",
        image: "https://res.cloudinary.com/drajm83r/image/upload/v1792597154/Screenshot_20260520_194511_Gallery.jpg",
        repoUrl: "https://github.com/GuillermoC66/VR_GCR",
        tags: ["Unity", "C#", "Virtual Reality"]
      }
    },
    {
      id: 'p2',
      artist: {
        title: "Birds on birds",
        description: "I was in a gift giving mood, so I gave away all of my birds.",
        image: "https://res.cloudinary.com/drajm83r/image/upload/v1792552574/20260810.jpg",
        tags: ["Watercolor", "Nature", "Animals"]
      },
      engineer: {
        title: "Rainbow Relax",
        description: "I contributed to Rainbow Relax, a breathing exercise experience created by The Trevor Project.",
        demoUrl: "https://rainbowrelax.web.app/",
        tags: ["The Trevor Project", "Web App", "Wellness"]
      }
    },
    {
      id: 'p3',
      artist: {
        title: "Animation Courses",
        description: "As part of the Society of Videogame Development at the Engineering Faculty of UNAM, I taught a series of animation courses to students.",
        image: "https://res.cloudinary.com/drajm83r/video/upload/v1792552769/2025-07-30_final.mp4",
        tags: ["Animation", "Teaching"]
      },
      engineer: {
        title: "SODVI",
        description: "As part of the Society of Videogame Development at the Engineering Faculty of UNAM, I participated in several development projects.",
        image: "https://res.cloudinary.com/drajm83r/video/upload/v1792596864/prueba_item_get.mp4",
        tags: ["Game Development", "Music", "Management"]
      }
    },
  ]
};
