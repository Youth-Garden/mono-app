export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  location: {
    city: string;
    country: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  status: {
    availability: string;
    types: string;
  };
  copyright: {
    year: string;
    name: string;
  };
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/Quantaphocpython',
    label: 'GitHub',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/qu%C3%A2n-tr%E1%BA%A7n-714134398/',
    label: 'LinkedIn',
  },
  {
    platform: 'Email',
    url: 'mailto:hoangquan.tran.work@gmail.com',
    label: 'Email',
  },
];

export const CONTACT_INFO: ContactInfo = {
  email: 'hoangquan.tran.work@gmail.com',
  location: {
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    coordinates: {
      latitude: '10.8231° N',
      longitude: '106.6297° E',
    },
  },
  status: {
    availability: 'Open to opportunities',
    types: 'Full-time / Freelance',
  },
  copyright: {
    year: '2024',
    name: 'Trần Hoàng Quân',
  },
};

export const CONTACT_META = {
  sectionNumber: '05 / Contact',
  availabilityStatus: 'Available for Contracts',
  ctaTitle: {
    line1: 'Initiate',
    line2: 'Collaboration',
  },
  sections: {
    connect: 'Connect',
    location: 'Location',
    status: 'Status',
  },
};
