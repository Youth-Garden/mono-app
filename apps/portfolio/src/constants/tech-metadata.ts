export interface TechMetadata {
  name: string;
  slug?: string; // SimpleIcons slug
  hex?: string; // Brand color
  icon?: string; // Fallback Lucide icon name
}

export const TECH_METADATA: Record<string, TechMetadata> = {
  // Languages
  typescript: {
    name: 'TypeScript',
    slug: 'typescript',
    hex: '#3178C6',
  },
  javascript: {
    name: 'JavaScript',
    slug: 'javascript',
    hex: '#F7DF1E',
  },
  python: {
    name: 'Python',
    slug: 'python',
    hex: '#3776AB',
  },
  solidity: {
    name: 'Solidity',
    slug: 'solidity',
    hex: '#363636',
  },
  aiken: {
    name: 'Aiken',
    // slug removed to use fallback icon
    hex: '#AC38FF', // Custom color
    icon: 'Code2',
  },

  // Frameworks & Libraries
  react: {
    name: 'React',
    slug: 'react',
    hex: '#61DAFB',
  },
  nestjs: {
    name: 'NestJS',
    slug: 'nestjs',
    hex: '#E0234E',
  },
  nextjs: {
    name: 'Next.js',
    slug: 'nextdotjs',
    hex: '#FFFFFF', // White for dark mode
  },
  'next.js': {
    name: 'Next.js',
    slug: 'nextdotjs',
    hex: '#FFFFFF',
  },
  vue: {
    name: 'Vue.js',
    slug: 'vuedotjs',
    hex: '#4FC08D',
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    hex: '#06B6D4',
  },
  tailwind: {
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    hex: '#06B6D4',
  },
  gsap: {
    name: 'GSAP',
    slug: 'greensock',
    hex: '#88CE02',
  },
  cardano: {
    name: 'Cardano',
    slug: 'cardano',
    hex: '#0033AD',
  },
  polkadot: {
    name: 'Polkadot',
    slug: 'polkadot',
    hex: '#E6007A',
  },

  // Web3 / Tech Terms
  blockchain: {
    name: 'Blockchain',
    icon: 'Blocks',
    hex: '#E1CA96', // Gold-ish
  },
  web3: {
    name: 'Web3',
    icon: 'Globe',
    hex: '#F47F24',
  },
  'smart contracts': {
    name: 'Smart Contracts',
    icon: 'FileJson',
    hex: '#9CA3AF',
  },
  'ai integration': {
    name: 'AI Integration',
    icon: 'Brain',
    hex: '#10B981',
  },
  'qa platform': {
    name: 'Q&A Platform',
    icon: 'MessageSquare',
    hex: '#60A5FA',
  },
  'consumer app': {
    name: 'Consumer App',
    icon: 'Smartphone',
    hex: '#F43F5E',
  },
  'finance tech': {
    name: 'Finance Tech',
    icon: 'TrendingUp',
    hex: '#34D399',
  },
  tracking: {
    name: 'Tracking',
    icon: 'MapPin',
    hex: '#F59E0B',
  },
  'ui/ux': {
    name: 'UI/UX',
    icon: 'LayoutTemplate',
    hex: '#EC4899',
  },
  'unit testing': {
    name: 'Unit Testing',
    icon: 'TestTube',
    hex: '#8B5CF6',
  },
};

export const normalizeTechName = (name: string): string => {
  return name.toLowerCase().trim();
};
