import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Boxes, Film, Gamepad2, Globe2, Palette, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Identity } from '../types/portfolio';

interface PracticeCard {
  number: string;
  title: string;
  description: string;
  detail: string;
  Icon: LucideIcon;
  background: string;
  foreground: string;
  accent: string;
}

const PRACTICES: Record<Identity, PracticeCard[]> = {
  engineer: [
    {
      number: '01',
      title: 'Worlds you can play.',
      description: 'Game development is where systems become places, and mechanics become stories.',
      detail: 'GAME DEVELOPMENT / UNITY',
      Icon: Gamepad2,
      background: '#153a31',
      foreground: '#f0f7f3',
      accent: '#a9e5c4',
    },
    {
      number: '02',
      title: 'The web, made human.',
      description: 'I build thoughtful interfaces that make useful technology feel clear and alive.',
      detail: 'WEB DEVELOPMENT / REACT',
      Icon: Globe2,
      background: '#d7e8dc',
      foreground: '#18392e',
      accent: '#396e57',
    },
    {
      number: '03',
      title: 'Good ideas, engineered.',
      description: 'From the first sketch to the final detail, I enjoy turning a rough idea into a working thing.',
      detail: 'PROTOTYPING / SYSTEMS',
      Icon: Boxes,
      background: '#e8b07d',
      foreground: '#362316',
      accent: '#754323',
    },
  ],
  artist: [
    {
      number: '01',
      title: 'Color with a pulse.',
      description: 'Watercolor studies shaped by texture, instinct, and the happy accidents of the medium.',
      detail: 'WATERCOLOR / STUDIES',
      Icon: Palette,
      background: '#f2c6bd',
      foreground: '#48251f',
      accent: '#9a5143',
    },
    {
      number: '02',
      title: 'A familiar world, reimagined.',
      description: 'Fan art is a way to revisit the characters and stories that stay with me.',
      detail: 'FAN ART / ILLUSTRATION',
      Icon: Sparkles,
      background: '#d8c9e4',
      foreground: '#30243b',
      accent: '#71588a',
    },
    {
      number: '03',
      title: 'Drawing in time.',
      description: 'Small animations bring expressive gestures, characters, and ideas into motion.',
      detail: 'ANIMATION / MOTION',
      Icon: Film,
      background: '#d8dfb3',
      foreground: '#31361e',
      accent: '#69733c',
    },
  ],
};

interface StickyCardsProps {
  mode: Identity;
}

export function StickyCards({ mode }: StickyCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cards = PRACTICES[mode];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={sectionRef} id="practice" className="scroll-mt-24 py-24" aria-labelledby="practice-title">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">How I work / 02</p>
        <h2 id="practice-title" className="text-3xl font-bold text-primary md:text-5xl">
          {mode === 'engineer' ? 'A practice in making.' : 'A practice in seeing.'}
        </h2>
      </div>

      <div className="relative pb-12">
        {cards.map((card, index) => (
          <PracticePanel
            key={`${mode}-${card.number}`}
            card={card}
            index={index}
            total={cards.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

interface PracticePanelProps {
  card: PracticeCard;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function PracticePanel({ card, index, total, progress }: PracticePanelProps) {
  const start = index / total;
  const scale = useTransform(progress, [start, Math.min(start + 1 / total, 1)], [1, 0.94]);
  const Icon = card.Icon;

  return (
    <motion.article
      style={{ scale, backgroundColor: card.background, color: card.foreground, zIndex: index + 1 }}
      className="sticky top-24 mb-6 flex min-h-[340px] origin-top flex-col justify-between overflow-hidden rounded-xl p-7 shadow-xl sm:min-h-[390px] sm:p-10 md:flex-row md:items-end md:p-12"
    >
      <span className="absolute -right-6 -top-16 select-none text-[16rem] font-black leading-none opacity-[0.045]" aria-hidden="true">
        {card.number}
      </span>
      <div className="relative z-10 max-w-2xl">
        <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: card.accent }}>
          {card.detail}
        </p>
        <h3 className="max-w-xl text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">{card.title}</h3>
        <p className="mt-5 max-w-lg text-base leading-relaxed opacity-75 sm:text-lg">{card.description}</p>
      </div>
      <div className="relative z-10 mt-8 grid size-16 shrink-0 place-items-center rounded-full border md:ml-8 md:size-20" style={{ borderColor: `${card.accent}80`, color: card.accent }}>
        <Icon size={30} strokeWidth={1.5} />
      </div>
    </motion.article>
  );
}