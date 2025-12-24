export interface HeroProfile {
  name: string;
  role: string;
  tagline: string;
  location: {
    latitude: string;
    longitude: string;
    city: string;
    country: string;
  };
  established: string;
  imagePath: string;
}

export const HERO_PROFILE: HeroProfile = {
  name: 'Kai Tou',
  role: 'Full Stack / Web3',
  tagline:
    'Building immutable ledgers and pixel-perfect interfaces. Focusing on performance, decentralization, and precision.',
  location: {
    latitude: '10.8231° N',
    longitude: '106.6297° E',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
  },
  established: 'EST. 2024',
  imagePath: '/me.jpg',
};

export const HERO_TITLE = {
  line1: 'WE ARE',
  line2: 'ARCHITECTS',
};

export const HERO_CTA = {
  label: 'Start the Journey',
  action: 'Scroll Down',
};
