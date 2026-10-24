import type { Identity } from '../types/portfolio';
import { getLink, type LinkId } from './links';

export interface MediaItemConfig {
  type: 'media';
  id: string;
  src: string;
  title: string;
  description: string;
  tags: string[];
  actionLabel: string;
  actionHref: string;
  colorClass: string;
}

export interface RainbowRelaxItemConfig {
  type: 'rainbowRelax';
  id: string;
  demoUrl: string;
}

export type CarouselItemData = MediaItemConfig | RainbowRelaxItemConfig;

// Configuration for artist media items with info from CardCarousel.tsx / portfolio.ts & stubs
export const ARTIST_CAROUSEL_CONFIG: Omit<MediaItemConfig, 'type' | 'src'>[] = [
  {
    id: 'artistCarousel20260810',
    title: 'Birds on birds',
    description: 'I was in a gift giving mood, so I gave away all of my birds.',
    tags: ['Watercolor', 'Nature', 'Animals'],
    actionLabel: 'View series',
    actionHref: '#projects',
    colorClass: 'bg-rose-600 hover:bg-rose-500 shadow-rose-950/40',
  },
  {
    id: 'artistCarousel20250826',
    title: 'Tu Ciudad en Agua',
    description: 'A series watercolor drawings exploring cities in a way that connects with me.',
    tags: ['Watercolor', 'Exploration', 'Urban'],
    actionLabel: 'View series',
    actionHref: '#projects',
    colorClass: 'bg-pink-600 hover:bg-pink-500 shadow-pink-950/40',
  },
  {
    id: 'artistCarousel20250810',
    title: 'Plants',
    description: 'I visited various parks, and I started drawing the plants I found interesting.',
    tags: ['Watercolor', 'Plants', 'Nature'],
    actionLabel: 'View series',
    actionHref: '#projects',
    colorClass: 'bg-fuchsia-700 hover:bg-fuchsia-600 shadow-fuchsia-950/40',
  },
  {
    id: 'artistCarousel20250427',
    title: 'Perritos!',
    description: 'As a way of getting commisions, I started drawing my loved ones dogs',
    tags: ['Comission', 'Dogs', 'Illustration'],
    actionLabel: 'View series',
    actionHref: '#projects',
    colorClass: 'bg-red-600 hover:bg-red-500 shadow-red-950/40',
  },
  {
    id: 'artistCarouselComic',
    title: '1',
    description: 'My first self publications, covering topics from love, family and life, added fanarts and poetry as well as comics',
    tags: ['Comic', 'Poetry', 'Illustration'],
    actionLabel: 'Read comic',
    actionHref: '#projects',
    colorClass: 'bg-pink-700 hover:bg-pink-600 shadow-pink-950/40',
  },
  {
    id: 'artistCarousel20250225',
    title: 'FanArt for social media',
    description: 'I started posting fanarts online, a way to grow my artist identity online, focusing in characters from shows that I love, and a way to connect with other artists',
    tags: ['Fanart', 'Art', 'Community'],
    actionLabel: 'View series',
    actionHref: '#projects',
    colorClass: 'bg-rose-500 hover:bg-rose-400 shadow-rose-950/40',
  },
  {
    id: 'artistAnimationVideo',
    title: 'Animation Courses',
    description: 'As part of the Society of Videogame Development at the Engineering Faculty of UNAM, I taught a series of animation courses to students.',
    tags: ['Animation', 'Teaching', 'UNAM'],
    actionLabel: 'Watch more animations',
    actionHref: '#projects',
    colorClass: 'bg-purple-600 hover:bg-purple-500 shadow-purple-950/40',
  },
];

// Configuration for engineer media items with info from CardCarousel.tsx / portfolio.ts & stubs
export const ENGINEER_CAROUSEL_CONFIG: Record<
  string,
  {
    title: string;
    description: string;
    tags: string[];
    actionLabel: string;
    actionHref: string;
    colorClass: string;
  }
> = {
  engineerCarousel20260415: {
    title: 'PingPing PongPong',
    description: 'A high-performance intensity vr videogame built with Unity and C#.',
    tags: ['Unity', 'C#', 'Virtual Reality'],
    actionLabel: 'View project',
    actionHref: getLink('engineerProjectRepository'),
    colorClass: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40',
  },
  engineerCarouselLight: {
    title: 'SODVI',
    description: 'As part of the Society of Videogame Development at the Engineering Faculty of UNAM, I participated in several development projects.',
    tags: ['Shaders', 'Computer Graphics', 'Unity'],
    actionLabel: 'Explore SODVI',
    actionHref: getLink('sodviWebsite'),
    colorClass: 'bg-teal-600 hover:bg-teal-500 shadow-teal-950/40',
  },
  engineerCarouselGithubIcon: {
    title: 'Open Source & Repositories',
    description: 'Developer tools, VR prototypes, and interactive experiences open-sourced on GitHub.',
    tags: ['GitHub', 'Open Source', 'Software Engineering'],
    actionLabel: 'Visit GitHub',
    actionHref: getLink('githubProfile'),
    colorClass: 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-600/50 shadow-black/50',
  },
  engineerProjectVideo: {
    title: 'Interna',
    description: 'My first attempt at serious videogame development using Godot Engine, I made lots of assets for it, great learning experience',
    tags: ['Game Development', 'Music', 'Godot'],
    actionLabel: 'View project',
    actionHref: getLink('internaProjectRepository'),
    colorClass: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-950/40',
  },
};

/**
 * Returns the carousel items configured for a given theme (artist or engineer).
 */
export function getCarouselItems(theme: Identity): CarouselItemData[] {
  if (theme === 'artist') {
    return ARTIST_CAROUSEL_CONFIG.map((config) => ({
      type: 'media' as const,
      id: config.id,
      src: getLink(config.id as LinkId),
      title: config.title,
      description: config.description,
      tags: config.tags,
      actionLabel: config.actionLabel,
      actionHref: config.actionHref,
      colorClass: config.colorClass,
    }));
  }

  return [
    {
      type: 'media' as const,
      id: 'engineerCarousel20260415',
      src: getLink('engineerCarousel20260415'),
      ...ENGINEER_CAROUSEL_CONFIG.engineerCarousel20260415,
    },
    {
      type: 'media' as const,
      id: 'engineerCarouselLight',
      src: getLink('engineerCarouselLight'),
      ...ENGINEER_CAROUSEL_CONFIG.engineerCarouselLight,
    },
    {
      type: 'rainbowRelax' as const,
      id: 'rainbowRelax',
      demoUrl: getLink('engineerProjectDemo'),
    },
    {
      type: 'media' as const,
      id: 'engineerCarouselGithubIcon',
      src: getLink('engineerCarouselGithubIcon'),
      ...ENGINEER_CAROUSEL_CONFIG.engineerCarouselGithubIcon,
    },
    {
      type: 'media' as const,
      id: 'engineerProjectVideo',
      src: getLink('engineerProjectVideo'),
      ...ENGINEER_CAROUSEL_CONFIG.engineerProjectVideo,
    },
  ];
}
