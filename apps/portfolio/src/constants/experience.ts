export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  logo: string | null;
  tech: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  gpa: string;
  description: string;
  type: 'edu';
}

export type ExperienceItem = Experience | Education;

export const EXPERIENCES: Experience[] = [
  {
    id: '01',
    role: 'frontend-developer',
    company: 'alchemy',
    period: 'apr 2025 - present',
    description: 'Architecting next-generation Blockchain platforms...',
    logo: '/experiences/alchemy/logo.png',
    tech: ['react', 'blockchain', 'ai', 'ui/ux'],
  },
  {
    id: '02',
    role: 'fullstack-developer',
    company: 'freelance',
    period: '2024 - present',
    description: 'Engineering bespoke web solutions...',
    logo: null,
    tech: ['next.js', 'typescript', 'tailwind'],
  },
];

export const EDUCATION: Education[] = [
  {
    school: 'university-of-transport',
    degree: 'Major: Information Technology',
    period: '2022 - 2026',
    gpa: 'GPA: 3.64/4',
    description: 'Excellent Student Certification (2023)',
    type: 'edu',
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
