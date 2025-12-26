export interface Reward {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  tech: string[];
  website?: string;
  socials?: { label: string; url: string }[];
  image: string;
}

export const REWARDS: Reward[] = [
  {
    id: '01',
    title: 'Ancient8 Builder Jam',
    category: 'Reward: $3000 / Creator Platform',
    role: 'InquireA',
    description:
      'Built a Q&A platform aimed at valuing user contributions to the community through blockchain rewards. The platform ensures that every contribution has meaning and value.',
    tech: ['Blockchain', 'Q&A Platform', 'Web3'],
    website: 'https://www.inquirea.tech/',
    socials: [
      {
        label: 'Announcement',
        url: 'https://twitter.com/Ancient8_gg/status/1878806673286205924',
      },
      {
        label: 'Reward Proof',
        url: 'https://twitter.com/ZKPLabs/status/1882839431125795076',
      },
    ],
    image: '/rewards/builder-jam/reward-1.jpg',
  },
  {
    id: '02',
    title: 'Cardano Vietnam Hackathon 2024',
    category: 'Reward: $500 / Consumer App',
    role: 'Heartgive',
    description:
      'HeartGive is a blockchain-based fundraising platform that helps charity organizations receive and manage donations transparently. Integrated with Cardano, it ensures traceability, safety, and verification. Smart contracts written in Aiken automate fund management, eliminating intermediaries and increasing trust.',
    tech: ['Cardano', 'Aiken', 'Smart Contracts', 'Consumer App'],
    socials: [
      {
        label: 'Reward Post',
        url: 'https://www.facebook.com/share/1GxEUHWjPd/',
      },
      {
        label: 'Certificate',
        url: 'https://www.facebook.com/share/1AuxKKaVgQ/',
      },
    ],
    image: '/rewards/cardano/cardano_runner-up.jpg',
  },
  {
    id: '03',
    title: 'Polkadot Vietnam Hackathon 2025',
    category: 'Reward: $500 / Best UI/UX',
    role: 'Transocean',
    description:
      'Transocean creates a decentralized platform for identifying and tracking ships and their port visits. Utilizing blockchain technology ensures data transparency and immutability, providing reliable and verifiable journey records with unique ship identifiers.',
    tech: ['Polkadot', 'Blockchain', 'UI/UX', 'Tracking'],
    socials: [
      {
        label: 'Announcement',
        url: 'https://www.facebook.com/share/p/1BzCCNaWtV/',
      },
    ],
    image: '/rewards/reward-2.jpg',
  },
];

export const REWARDS_META = {
  sectionNumber: '02 / Rewards',
  title: 'Rewards & Awards',
  scrollHint: '[ SCROLL TO NAVIGATE ]',
};
