export interface Reward {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export const REWARDS: Reward[] = [
  {
    id: '01',
    title: 'ancient8-jam',
    category: '1st Place / Consumer App',
    role: 'lead-developer',
    description:
      'Architecting a decentralized consumer application that leverages zero-knowledge proofs for privacy-preserving interactions. Integrated Next.js with Ancient8 Layer 2 to deliver sub-second transaction confirmations and seamless user onboarding experiences through account abstraction.',
    tech: ['Next.js', 'Ancient8', 'Smart Contracts'],
    link: '#',
    image: '/rewards/builder-jam/reward-1.jpg',
  },
  {
    id: '02',
    title: 'cardano-hack',
    category: '2nd Place / Blockchain',
    role: 'full-stack-engineer',
    description:
      'Pioneering a novel DeFi protocol on Cardano utilizing Plutus smart contracts to enable trustless peer-to-peer lending. Implemented off-chain governance mechanisms and a highly responsive frontend interface demonstrating complex UTXO model interactions.',
    tech: ['Haskell', 'Plutus', 'React'],
    link: '#',
    image: '/rewards/cardano/cardano_runner-up.jpg',
  },
  {
    id: '03',
    title: 'polkadot-ui',
    category: 'Best UI/UX Award',
    role: 'ui-architect',
    description:
      'Crafting an award-winning user interface for the Polkadot ecosystem. Focusing on accessibility and reducing cognitive load for users navigating cross-chain bridges and staking dashboards. Utilizing advanced Framer Motion animations for fluid state transitions.',
    tech: ['Polkadot.js', 'Framer Motion', 'Tailwind'],
    link: '#',
    image: '/rewards/reward-2.jpg',
  },
];

export const REWARDS_META = {
  sectionNumber: '02 / Rewards',
  title: 'Rewards & Awards',
  scrollHint: '[ SCROLL TO NAVIGATE ]',
};
