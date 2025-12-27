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
      'Built a blockchain-based Q&A platform where user contributions are rewarded, ensuring every contribution adds value to the community.',
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
      'HeartGive is a blockchain-based fundraising platform enabling transparent donation management. Integrated with Cardano for traceability and verification. Smart contracts via Aiken automate fund allocation, eliminating intermediaries.',
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
      "This project aims to create a decentralized platform for identifying and tracking the ports visited by ships during their journeys. By utilizing blockchain technology, the platform ensures transparency and immutability of data, providing a reliable and verifiable record of the ship's journey.",
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
