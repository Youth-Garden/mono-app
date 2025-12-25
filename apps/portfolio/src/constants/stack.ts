export interface TechItem {
  name: string;
  category?: string;
  slug?: string; // For simpleicons.org (e.g. "cplusplus" for "C++")
  hex?: string; // Brand color for hover effect
}

export interface StackCategory {
  domain: string;
  color: string;
  technologies: TechItem[];
}

export const TECH_STACK: StackCategory[] = [
  {
    domain: 'CORE',
    color: 'from-blue-500/20 to-cyan-500/20',
    technologies: [
      { name: 'TypeScript', slug: 'typescript', hex: '#3178C6' },
      { name: 'JavaScript', slug: 'javascript', hex: '#F7DF1E' },
    ],
  },
  {
    domain: 'FRONTEND',
    color: 'from-purple-500/20 to-pink-500/20',
    technologies: [
      { name: 'Next.js 15', slug: 'nextdotjs', hex: '#000000' },
      { name: 'React', slug: 'react', hex: '#61DAFB' },
      { name: 'Shadcn UI', slug: 'shadcnui', hex: '#000000' },
      { name: 'GSAP', slug: 'greensock', hex: '#88CE02' },
      { name: 'Tailwind CSS', slug: 'tailwindcss', hex: '#06B6D4' },
    ],
  },
  {
    domain: 'BACKEND',
    color: 'from-green-500/20 to-emerald-500/20',
    technologies: [
      { name: 'Spring Boot', slug: 'springboot', hex: '#6DB33F' },
      { name: 'NestJS', slug: 'nestjs', hex: '#E0234E' },
      { name: 'Prisma', slug: 'prisma', hex: '#2D3748' },
      { name: 'PostgreSQL', slug: 'postgresql', hex: '#4169E1' },
      { name: 'MongoDB', slug: 'mongodb', hex: '#47A248' },
    ],
  },
  {
    domain: 'INFRA',
    color: 'from-orange-500/20 to-red-500/20',
    technologies: [
      { name: 'Docker', hex: '#2496ED' },
      { name: 'AWS', slug: 'amazonaws', hex: '#232F3E' },
      { name: 'Redis', hex: '#DC382D' },
      { name: 'Vercel', hex: '#000000' },
      { name: 'Turborepo', hex: '#EF4444' },
    ],
  },

  {
    domain: 'SOFT SKILLS',
    color: 'from-teal-500/20 to-cyan-500/20',
    technologies: [
      { name: 'Architecture', hex: '#3B82F6' },
      { name: 'Research', hex: '#8B5CF6' },
      { name: 'Mentoring', hex: '#10B981' },
      { name: 'Problem Solving', hex: '#F59E0B' },
    ],
  },
];

export const STACK_META = {
  sectionNumber: '03 / ARSENAL',
  title: 'SKILLS',
  subtitle: 'Capabilities & Tools',
};
