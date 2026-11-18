import { Globe, HomeIcon, Github, Linkedin, Send, Mail, Phone } from 'lucide-svelte';
// Navbar Icons
import GithubDarkSvg from '$lib/imgs/github-dark.svg';
import GithubSvg from '$lib/imgs/github.svg';

import GmailDarkSvg from '$lib/imgs/gmail-dark.svg';
import GmailSvg from '$lib/imgs/gmail.svg';

import LinkedinDarkSvg from '$lib/imgs/linkedin-dark.svg';
import LinkedinSvg from '$lib/imgs/linkedin.svg';

import TelegramDarkSvg from '$lib/imgs/telegram-dark.svg';
import TelegramSvg from '$lib/imgs/telegram.svg';

// Your resume data
export let DATA = {
	name: 'Trần Hoàng Quân',
	initials: 'THQ',
	url: 'https://kaitou.is-a.dev',
	img: '/me.jpg',
	location: 'Ho Chi Minh City, Vietnam',
	locationLink: 'https://www.google.com/maps/place/Ho+Chi+Minh+City',
	description:
		'Fullstack Developer with nearly 2 years of professional experience building fintech, blockchain, and healthcare products with NestJS, TypeScript, React, and React Native.',
	summary:
		'Fullstack developer with nearly 2 years of professional experience building fintech, blockchain, and healthcare products with NestJS, TypeScript, React, and React Native. Hands-on with authentication, rate limiting, input/output validation, payment flows, real-time features, and multichain Web3 (EVM, Solana, TON).\n\nThree-time blockchain hackathon winner who ships features end to end and tests his own work. Experienced in clean architecture, DDD, CQRS, and comfortable with AI-assisted development workflows (Copilot, Cursor, Claude).',
	avatarUrl: '/me.jpg',
	skills: [
		{ name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
		{ name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
		{ name: 'React', url: 'https://react.dev/' },
		{ name: 'Next.js', url: 'https://nextjs.org/' },
		{ name: 'React Native (Expo)', url: 'https://expo.dev/' },
		{ name: 'NestJS', url: 'https://nestjs.com/' },
		{ name: 'Fastify', url: 'https://fastify.dev/' },
		{ name: 'Node.js', url: 'https://nodejs.org/' },
		{ name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
		{ name: 'MongoDB', url: 'https://www.mongodb.com/' },
		{ name: 'Redis', url: 'https://redis.io/' },
		{ name: 'Prisma', url: 'https://www.prisma.io/' },
		{ name: 'TypeORM', url: 'https://typeorm.io/' },
		{ name: 'Docker', url: 'https://www.docker.com/' },
		{ name: 'Kafka & BullMQ', url: 'https://bullmq.io/' },
		{ name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
		{ name: 'shadcn/ui', url: 'https://ui.shadcn.com/' },
		{ name: 'Ant Design', url: 'https://ant.design/' },
		{ name: 'TanStack Query', url: 'https://tanstack.com/query' },
		{ name: 'Zustand & Redux', url: 'https://zustand.docs.pmnd.rs/' },
		{ name: 'Socket.IO', url: 'https://socket.io/' },
		{ name: 'Multichain Web3 (EVM, Solana, TON)', url: 'https://ethereum.org/' },
		{ name: 'ethers.js & WalletConnect', url: 'https://docs.ethers.org/' },
		{ name: 'Jest & Playwright', url: 'https://playwright.dev/' },
		{ name: 'Turborepo', url: 'https://turbo.build/repo' },
		{ name: 'AWS S3', url: 'https://aws.amazon.com/s3/' }
	],
	navbar: [],
	contact: {
		email: 'hoangquan.tran.work@gmail.com',
		tel: '0938601892',
		social: {
			GitHub: {
				name: 'GitHub',
				url: 'https://github.com/quantaphocpython',
				icon: GithubSvg,
				component: Github,
				navbar: true,
				dark_icon: GithubDarkSvg
			},
			LinkedIn: {
				name: 'LinkedIn',
				url: 'https://www.linkedin.com/in/quan-tran-hoang-714134398',
				icon: LinkedinSvg,
				component: Linkedin,
				navbar: true,
				dark_icon: LinkedinDarkSvg
			},
			Telegram: {
				name: 'Telegram',
				url: 'https://t.me/Kaitoudicode',
				icon: TelegramSvg,
				component: Send,
				navbar: true,
				dark_icon: TelegramDarkSvg
			},
			email: {
				name: 'Send Email',
				url: 'mailto:hoangquan.tran.work@gmail.com',
				icon: GmailSvg,
				component: Mail,
				navbar: true,
				dark_icon: GmailDarkSvg
			}
		}
	},
	work: [
		{
			company: 'Trieu An Hospital',
			href: 'https://trieuan.com/',
			badges: ['Contract'],
			location: 'Ho Chi Minh City, Vietnam',
			title: 'Software Engineer',
			logoUrl: '/experiences/trieuan/logo.png',
			start: 'Jul 2026',
			end: 'Oct 2026',
			description:
				'• Built a cross-platform hospital app with React Native, Expo, and Expo Router, integrating a headless PHP backend and a legacy hospital information system (HIS); Zustand for client state, TanStack Query for server state.\n• Integrated VNPay and Stripe payments and prevented double payments: guarded payment-return handler so confirmation runs exactly once, and reconciled timed-out charges through background polling.\n• Implemented NFC-based scanning of Vietnam\'s chip-embedded citizen ID card (CCCD) with QR/barcode fallback, auto-filling patient info and cutting manual data entry by ~60%.\n• Designed a HIS data-mapping layer normalizing legacy API responses into consistent domain models.\n• Enforced access control and input safety: role-based route groups (patient, doctor, admin) with Expo Router guards, Yup-validated forms, OTP resend cooldown, and credentials in expo-secure-store.\n• Built multi-step appointment booking with React Hook Form, TanStack Query, push notifications, FlashList, Reanimated, and multilingual UI (i18n).'
		},
		{
			company: 'Alchemy Technologies Ltd',
			href: '#',
			badges: ['Full-time'],
			location: 'Ho Chi Minh City, Vietnam',
			title: 'Software Engineer',
			logoUrl: '/experiences/alchemy/logo.png',
			start: 'Apr 2025',
			end: 'Jul 2026',
			description:
				'• Developed production Next.js, React, and TypeScript apps for blockchain products, turning Figma designs into reusable, responsive components with Tailwind CSS and Ant Design.\n• Built multichain Web3 integration covering EVM chains (incl. Optimism), Solana, and TON: organized a provider layer for wallet auth, transaction signing, and smart-contract interactions (ethers.js, WalletConnect).\n• Improved Core Web Vitals through rendering-strategy tuning, code splitting, lazy loading, and memoization, reducing bundle size by 30% and raising Lighthouse performance from ~70 to 90+.\n• Implemented real-time features with Socket.IO for live data updates and event-driven interactions.\n• Built type-safe API integration layers with TypeScript and TanStack Query (Redux for global state).\n• Wrote unit, component, and end-to-end tests with Jest, React Testing Library, and Playwright, covering ~70% of core modules.\n• Worked daily in Agile sprints; used AI coding assistants (Copilot, Cursor, Claude) for debugging and code review.'
		},
		{
			company: 'Hopper Solutions',
			href: '#',
			badges: ['Part-time'],
			location: 'Ho Chi Minh City, Vietnam',
			title: 'Fullstack Developer',
			logoUrl: '/experiences/hopper/logo.png',
			start: 'Jan 2025',
			end: 'Apr 2025',
			description:
				'• Developed modular backend features with NestJS and Fastify: REST APIs on Prisma and PostgreSQL following Clean Architecture, covering financial workflows.\n• Implemented JWT-based authentication and protected API routes, plus rate limiting on the API to limit abuse and brute-force attempts.\n• Built input/output filtering: request validation with class-validator DTOs, and response serialization with class-transformer.\n• Used Redis in the NestJS backend for caching to reduce repeated database reads.\n• Integrated AWS S3 for file upload and storage, connecting NestJS API with Next.js frontend.\n• Built fintech UI with Next.js, React, and Zustand: transaction workflows, Recharts dashboards, and data tables with infinite scrolling, sorting, and complex filtering.\n• Joined sprint planning and task estimation in an Agile Scrum team.'
		}
	],
	education: [
		{
			school: 'University of Transport Ho Chi Minh City (UTH)',
			href: 'https://uth.edu.vn/',
			degree: 'B.S. in Information Technology | GPA: 3.66/4',
			logoUrl: '/experiences/uth/logo.png',
			start: '2022',
			end: '2026'
		}
	],
	projects: [
		{
			title: 'Lumen – Vocabulary Learning Platform',
			href: 'https://github.com/quantaphocpython',
			dates: 'Jul 2026 – Present',
			active: true,
			description:
				'Full-stack English-learning platform for Vietnamese learners built as a Turborepo (NestJS + Fastify API, Next.js web app, PWA). Architected with DDD, CQRS, and Clean Architecture on TypeORM & PostgreSQL with Kafka and BullMQ for async jobs. Features SuperMemo SM-2 spaced-repetition engine, automated content pipeline with Oxford 5000 / Free Dictionary API, Anthropic API for reading/dictation generation, and Amazon Polly sentence-level Speech Marks synthesis.',
			technologies: ['Next.js', 'NestJS', 'Fastify', 'PostgreSQL', 'TypeORM', 'Docker', 'Kafka', 'BullMQ', 'DDD / CQRS', 'Tailwind CSS', 'PWA'],
			links: [
				{
					type: 'GitHub',
					href: 'https://github.com/quantaphocpython',
					icon: Globe
				}
			],
			image: '',
			images: [],
			video: ''
		},
		{
			title: 'InquireA - Q&A Creator Platform',
			href: 'https://www.inquirea.tech/',
			dates: 'Jan 2025',
			active: true,
			description:
				'Full-stack decentralized application built on smart contracts where user contributions are rewarded with tokens. Won 1st Place ($3,000 Prize) at Ancient8 Builder Jam 2025 (Consumer App track).',
			technologies: ['Blockchain', 'Web3', 'Next.js', 'TypeScript', 'TailwindCSS', 'Smart Contracts'],
			links: [
				{
					type: 'Website',
					href: 'https://www.inquirea.tech/',
					icon: Globe
				}
			],
			image: '/rewards/builder-jam/claim-reward.jpg',
			images: [
				'/rewards/builder-jam/banner.png',
				'/rewards/builder-jam/reward-1.jpg',
				'/rewards/builder-jam/reward-2.jpg',
				'/rewards/builder-jam/reward-3.jpg',
				'/rewards/builder-jam/claim-reward.jpg',
				'/rewards/builder-jam/inform-reward.jpg'
			],
			video: ''
		},
		{
			title: 'Transocean - Decentralized Logistics',
			href: 'https://www.facebook.com/share/p/1BzCCNaWtV/',
			dates: 'Jan 2025',
			active: true,
			description:
				'Decentralized platform for tracking visited shipping ports on the Polkadot blockchain with full data transparency and immutability. Awarded Best UI/UX Award among 12 finalist teams at Polkadot Vietnam Hackathon 2025.',
			technologies: ['Polkadot', 'Blockchain', 'UI/UX', 'TypeScript', 'Tailwind CSS'],
			links: [
				{
					type: 'Announcement',
					href: 'https://www.facebook.com/share/p/1BzCCNaWtV/',
					icon: Globe
				}
			],
			image: '/rewards/polkadot/banner.png',
			images: ['/rewards/polkadot/banner.png'],
			video: ''
		},
		{
			title: 'HeartGive - Transparent Fundraising',
			href: 'https://www.facebook.com/share/1GxEUHWjPd/',
			dates: 'Dec 2024',
			active: true,
			description:
				'Blockchain-based fundraising platform enabling transparent donation tracking and verification on Cardano, featuring smart contracts via Aiken for automated fund distribution. Won 2nd Place at Cardano Vietnam Hackathon 2024.',
			technologies: ['Cardano', 'Aiken', 'Smart Contracts', 'TypeScript', 'Web3'],
			links: [
				{
					type: 'Certificate',
					href: 'https://www.facebook.com/share/1AuxKKaVgQ/',
					icon: Globe
				}
			],
			image: '/rewards/cardano/cardano_runner-up.jpg',
			images: [
				'/rewards/cardano/banner.png',
				'/rewards/cardano/cardano_runner-up.jpg',
				'/rewards/cardano/cardano-runner-up-2.jpg',
				'/rewards/cardano/certificate-1.jpg',
				'/rewards/cardano/certificate-2.jpg'
			],
			video: ''
		}
	],
	hackathons: [
		{
			title: 'Ancient8 Builder Jam 2025',
			dates: 'January 2025',
			location: 'Vietnam / Global',
			description:
				'Won top prize with InquireA, a full-stack decentralized application built on smart contracts (Consumer App track).',
			image: '/rewards/builder-jam/banner.png',
			win: '1st Place / $3,000 Reward',
			links: [
				{
					title: 'Announcement',
					icon: Globe,
					href: 'https://twitter.com/Ancient8_gg/status/1878806673286205924'
				},
				{
					title: 'Proof',
					icon: Globe,
					href: 'https://twitter.com/ZKPLabs/status/1882839431125795076'
				}
			]
		},
		{
			title: 'Polkadot Vietnam Hackathon 2025',
			dates: 'January 2025',
			location: 'Vietnam',
			description:
				'Recognized for the best interface among 12 finalist teams across the NFT, PayFi, and DeFi tracks; designed and built the UI of Transocean.',
			image: '/rewards/polkadot/banner.png',
			win: 'Best UI/UX Award / $500 Reward',
			links: [
				{
					title: 'Post',
					icon: Globe,
					href: 'https://www.facebook.com/share/p/1BzCCNaWtV/'
				}
			]
		},
		{
			title: 'Cardano Vietnam Hackathon 2024',
			dates: 'December 2024',
			location: 'Vietnam',
			description:
				'Placed second among 31 teams at the hackathon run by VBI Academy with the Cardano Foundation, delivering HeartGive platform.',
			image: '/rewards/cardano/banner.png',
			win: '2nd Place / $500 Reward',
			links: [
				{
					title: 'Post',
					icon: Globe,
					href: 'https://www.facebook.com/share/1GxEUHWjPd/'
				},
				{
					title: 'Certificate',
					icon: Globe,
					href: 'https://www.facebook.com/share/1AuxKKaVgQ/'
				}
			]
		}
	],
	certifications: [
		{
			title: 'Google Cloud Computing Foundations',
			issuer: 'Google Cloud',
			dates: '2025',
			image: '/certificates/GG-cloud-skill-boost-Certificaton.jpg',
			description: 'Completed Google Cloud Computing Foundations covering cloud architecture, infrastructure, and core services.'
		},
		{
			title: 'TOEIC Listening & Reading 725',
			issuer: 'ETS / IIG Vietnam',
			dates: '2026',
			image: '/certificates/toeic-725.jpg',
			description: 'Certified working English proficiency in listening (350) and reading (375) comprehension for professional environments.'
		},
		{
			title: 'Excellent Student Award',
			issuer: 'University of Transport Ho Chi Minh City (UTH)',
			dates: '2023',
			image: '/experiences/uth/logo.png',
			imageFit: 'contain',
			imageBg: 'bg-white',
			description: 'Awarded for outstanding academic performance and tech achievements at UTH.'
		}
	]
};
