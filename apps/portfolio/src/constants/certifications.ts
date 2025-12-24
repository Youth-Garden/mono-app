export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
  accent: string;
  isGeneric?: boolean;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Google Cloud Skill Boost',
    issuer: 'Google',
    date: '2024',
    image: '/certificates/GG-cloud-skill-boost-Certificaton.jpg',
    accent: 'border-blue-500/50',
  },
  {
    title: 'Top 10 Cardano Hackathon',
    issuer: 'Cardano',
    date: '2024',
    image: '/rewards/cardano/certificate-1.jpg',
    accent: 'border-blue-400/50',
  },
  {
    title: 'Excellent Student',
    issuer: 'University of Transport',
    date: '2023',
    image: '/certificates/GG-cloud-skill-boost-Certificaton.jpg',
    accent: 'border-yellow-500/50',
    isGeneric: true,
  },
];

export const CERTIFICATIONS_META = {
  sectionNumber: '04 / Recognition',
};
