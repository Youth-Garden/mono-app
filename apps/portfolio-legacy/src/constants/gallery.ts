export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'certificate' | 'reward';
  aspectRatio: 'landscape' | 'portrait' | 'square';
  span: number;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'cert-google-cloud',
    src: '/certificates/GG-cloud-skill-boost-Certificaton.jpg',
    alt: 'Google Cloud Skill Boost Certification',
    category: 'certificate',
    aspectRatio: 'landscape',
    span: 2,
  },
  {
    id: 'reward-builder-jam-1',
    src: '/rewards/builder-jam/reward-1.jpg',
    alt: 'Builder Jam Reward 1',
    category: 'reward',
    aspectRatio: 'landscape',
    span: 2,
  },
  {
    id: 'reward-builder-jam-2',
    src: '/rewards/builder-jam/reward-2.jpg',
    alt: 'Builder Jam Reward 2',
    category: 'reward',
    aspectRatio: 'landscape',
    span: 2,
  },
  {
    id: 'reward-builder-jam-3',
    src: '/rewards/builder-jam/reward-3.jpg',
    alt: 'Builder Jam Reward 3',
    category: 'reward',
    aspectRatio: 'portrait',
    span: 1,
  },
  {
    id: 'reward-builder-jam-claim',
    src: '/rewards/builder-jam/claim-reward.jpg',
    alt: 'Builder Jam Claim Reward',
    category: 'reward',
    aspectRatio: 'landscape',
    span: 2,
  },
  {
    id: 'reward-builder-jam-inform',
    src: '/rewards/builder-jam/inform-reward.jpg',
    alt: 'Builder Jam Inform Reward',
    category: 'reward',
    aspectRatio: 'landscape',
    span: 2,
  },
  {
    id: 'reward-cardano-runner-up',
    src: '/rewards/cardano/cardano_runner-up.jpg',
    alt: 'Cardano Runner Up',
    category: 'reward',
    aspectRatio: 'portrait',
    span: 1,
  },
  {
    id: 'reward-cardano-runner-up-2',
    src: '/rewards/cardano/cardano-runner-up-2.jpg',
    alt: 'Cardano Runner Up 2',
    category: 'reward',
    aspectRatio: 'landscape',
    span: 2,
  },
  {
    id: 'reward-cardano-cert-1',
    src: '/rewards/cardano/certificate-1.jpg',
    alt: 'Cardano Certificate 1',
    category: 'reward',
    aspectRatio: 'landscape',
    span: 2,
  },
  {
    id: 'reward-cardano-cert-2',
    src: '/rewards/cardano/certificate-2.jpg',
    alt: 'Cardano Certificate 2',
    category: 'reward',
    aspectRatio: 'landscape',
    span: 2,
  },
];
