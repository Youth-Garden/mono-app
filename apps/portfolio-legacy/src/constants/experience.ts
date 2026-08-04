export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  logo: string | null;
  tech: string[];
  achievements?: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  gpa: string;
  description: string;
  type: 'edu';
  achievements?: string[];
}

export type ExperienceItem = Experience | Education;

export const EXPERIENCES: Experience[] = [
  {
    id: '01',
    role: 'Frontend Developer',
    company: 'Alchemy',
    period: 'Apr 2024 - Present',
    description:
      'Constructed interfaces, integrated APIs, and implemented blockchain features (token integration). Built creative UIs for short-term campaigns (15-30 days) to maximize user acquisition. Optimized state management, wrote unit tests, and enhanced UI/UX layouts. Developed AI chatbot interfaces to support customer service across multiple platforms (Instagram, X, Zalo, Facebook, Telegram).',
    logo: '/experiences/alchemy/logo.png',
    tech: ['Next.js', 'Blockchain', 'TypeScript', 'AI Integration'],
    achievements: [
      'Built creative UIs for 15-30 day campaigns to drive user growth',
      'Integrated blockchain tokens and optimized API performance',
      'Developed AI chatbot interfaces for multi-platform support',
      'Refined State Management and overall UI architecture',
    ],
  },
  {
    id: '02',
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: '2024 - Present',
    description:
      'Specialized in architecting and delivering high-performance web solutions for diverse business needs. Key projects include a comprehensive personal finance ecosystem with real-time tracking and analytics, as well as various custom enterprise dashboards. Focused on building scalable, type-safe applications using modern stacks (Next.js, NestJS) while ensuring pixel-perfect implementation and seamless user experiences across all devices.',
    logo: null,
    tech: ['Next.js', 'NestJS', 'TypeScript', 'Tailwind'],
    achievements: [
      'Developed personal finance management platforms',
      'Built custom web solutions for diverse client requirements',
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    school: 'UNIVERSITY OF TRANSPORT',
    degree: 'Information Technology',
    period: '2022 - 2026',
    gpa: '3.64/4',
    description:
      'Pursuing comprehensive education in Information Technology with focus on software engineering, algorithms, and modern web technologies. Maintaining excellent academic standing while actively participating in coding competitions and tech communities.',
    type: 'edu',
    achievements: [
      'Excellent Student Certification (2023)',
      "Dean's List for Academic Excellence",
      'Active member of University Tech Innovation Club',
      'Participated in multiple national coding competitions',
    ],
  },
];

export const ALL_EXPERIENCE_ITEMS: ExperienceItem[] = [
  ...EXPERIENCES,
  ...EDUCATION,
];

export const EXPERIENCE_META = {
  sectionNumber: '01 / Journey',
  title: 'Experience & Edu',
  scrollHint: '[ SCROLL TO NAVIGATE ]',
};
