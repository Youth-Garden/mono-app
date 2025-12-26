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
      'Constructing interfaces, integrating APIs, and implementing blockchain features including token integration. Building creative, high-impact UIs for short-term campaigns (15-30 days) to attract users. Optimizing state management, writing unit tests, and improving layout and UI. Also involved in building AI chatbots and UI for AI interaction to support customer service across multiple platforms (Instagram, X, Zalo, Facebook, Telegram).',
    logo: '/experiences/alchemy/logo.png',
    tech: [
      'React',
      'Blockchain',
      'Web3',
      'TypeScript',
      'AI Integration',
      'Unit Testing',
    ],
    achievements: [
      'Built creative UIs for 15-30 day campaigns to maximize user acquisition',
      'Integrated blockchain tokens and optimized API interactions',
      'Developed AI chatbot interfaces for multi-platform customer support',
      'Improved state management and overall UI/UX architecture',
    ],
  },
  {
    id: '02',
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: '2024 - Present',
    description:
      'Participating in the development of personal finance management platforms and other custom web solutions. Delivering tailored applications that meet specific client needs focusing on functionality and user experience.',
    logo: null,
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Finance Tech'],
    achievements: [
      'Developed personal finance management platforms',
      'Built custom web solutions for various client requirements',
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    school: 'university-of-transport',
    degree: 'Major: Information Technology',
    period: '2022 - 2026',
    gpa: 'GPA: 3.64/4',
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
