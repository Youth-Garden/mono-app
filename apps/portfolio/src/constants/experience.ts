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
    role: 'frontend-developer',
    company: 'alchemy',
    period: 'apr 2025 - present',
    description:
      'Architecting next-generation blockchain platforms with cutting-edge Web3 technologies. Leading frontend development initiatives to create seamless, intuitive interfaces for decentralized applications. Collaborating with cross-functional teams to deliver high-performance solutions that bridge traditional web experiences with blockchain innovation.',
    logo: '/experiences/alchemy/logo.png',
    tech: ['react', 'blockchain', 'web3', 'typescript', 'ai', 'ui/ux'],
    achievements: [
      'Designed and implemented scalable component architecture for Web3 applications',
      'Optimized blockchain transaction flows, improving user experience by 40%',
      'Integrated AI-powered features to enhance smart contract interactions',
      'Collaborated with design team to establish comprehensive design system',
    ],
  },
  {
    id: '02',
    role: 'fullstack-developer',
    company: 'freelance',
    period: '2024 - present',
    description:
      'Engineering bespoke web solutions for diverse clients across multiple industries. Specializing in modern full-stack development with emphasis on performance, scalability, and exceptional user experiences. Delivering end-to-end solutions from concept to deployment, ensuring pixel-perfect implementations and robust backend architectures.',
    logo: null,
    tech: ['next.js', 'typescript', 'tailwind', 'node.js', 'postgresql', 'aws'],
    achievements: [
      'Delivered 15+ production-ready applications with 100% client satisfaction',
      'Reduced page load times by average of 60% through optimization techniques',
      'Implemented CI/CD pipelines reducing deployment time from hours to minutes',
      'Architected microservices infrastructure handling 100K+ daily active users',
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
