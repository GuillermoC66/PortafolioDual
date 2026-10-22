export const links = {
  home: '#home',
  about: '#about',
  practice: '#practice',
  projects: '#projects',
  githubProfile: 'https://github.com/GuillermoC66',
  instagramProfile: 'https://www.instagram.com/memx.tv?srtk=Mm50M2FvcWZmazFu',
  linkedinProfile: 'https://www.linkedin.com/in/guillermo-carrillo-r/',
  artistIdentityImage: 'https://res.cloudinary.com/drajm83r/image/upload/v1792595843/DSCF0234.jpg',
  engineerIdentityImage: 'https://res.cloudinary.com/drajm83r/image/upload/v1792595833/20260129_143513.jpg',
  artistCarousel20260810: 'https://res.cloudinary.com/drajm83r/image/upload/v1792552574/20260810.jpg',
  artistCarousel20250826: 'https://res.cloudinary.com/drajm83r/image/upload/v1792552739/20250826.jpg',
  artistCarousel20250810: 'https://res.cloudinary.com/drajm83r/image/upload/v1792552740/20250810.jpg',
  artistCarousel20250427: 'https://res.cloudinary.com/drajm83r/image/upload/v1792705163/20250427_00.jpg',
  artistCarouselComic: 'https://res.cloudinary.com/drajm83r/image/upload/v1792694156/BigPageComic.jpg',
  artistCarousel20250225: 'https://res.cloudinary.com/drajm83r/image/upload/v1792705167/20250225.jpg',
  artistAnimationVideo: 'https://res.cloudinary.com/drajm83r/video/upload/v1792552769/2025-07-30_final.mp4',
  engineerCarousel20260415: 'https://res.cloudinary.com/drajm83r/image/upload/v1792705982/20260415.png',
  engineerCarouselLight: 'https://res.cloudinary.com/drajm83r/image/upload/v1792705927/light.png',
  engineerCarouselScreenshot: 'https://res.cloudinary.com/drajm83r/image/upload/v1792700534/Screenshot_2026-10-22_141632.png',
  engineerCarouselGithubIcon: 'https://res.cloudinary.com/drajm83r/image/upload/v1792704592/github-white-icon.webp',
  engineerProjectScreenshot: 'https://res.cloudinary.com/drajm83r/image/upload/v1792597154/Screenshot_20260520_194511_Gallery.jpg',
  engineerProjectRepository: 'https://github.com/GuillermoC66/VR_GCR',
  engineerProjectDemo: 'https://rainbowrelax.web.app/',
  engineerProjectVideo: 'https://res.cloudinary.com/drajm83r/video/upload/v1792596864/prueba_item_get.mp4',
} as const;

export type LinkId = keyof typeof links;

export const getLink = (id: LinkId): string => links[id];
