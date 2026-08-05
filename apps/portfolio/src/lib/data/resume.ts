import { CodeIcon, Globe, HomeIcon } from 'lucide-svelte';
// Navbar Icons
import GithubDarkSvg from '$lib/imgs/github-dark.svg';
import GithubSvg from '$lib/imgs/github.svg';

import GmailDarkSvg from '$lib/imgs/gmail-dark.svg';
import GmailSvg from '$lib/imgs/gmail.svg';

import LinkedinDarkSvg from '$lib/imgs/linkedin-dark.svg';
import LinkedinSvg from '$lib/imgs/linkedin.svg';

// Your resume data
export let DATA = {
	name: 'Trần Hoàng Quân',
	initials: 'THQ',
	url: 'https://github.com/Quantaphocpython',
	img: '/me.jpg',
	location: 'Ho Chi Minh City, Vietnam',
	locationLink: 'https://www.google.com/maps/place/Ho+Chi+Minh+City',
	description:
		'Full Stack Developer (Frontend Focus) from Vietnam specializing in modern web technologies and decentralized systems.',
	summary:
		'Full Stack Developer with a strong Frontend focus from Vietnam, passionate about decentralized systems and modern web technologies.\n\nCurious, hands-on, and always exploring new ways to build software that feels effortless, reliable, and user-focused. I enjoy tackling challenges, collaborating with teams, and continuously pushing the boundaries of what web applications can achieve.\n\nI specialize in JavaScript, TypeScript, React, Next.js, SvelteKit, and NestJS, with practical experience in building both frontend and backend solutions. My strong English communication skills allow me to work effectively in collaborative environments and contribute meaningfully to team success.',
	avatarUrl: '/me.jpg',
	skills: [
		'TypeScript',
		'JavaScript',
		'Next.js',
		'React',
		'Svelte',
		'SvelteKit',
		'GSAP',
		'Tailwind CSS',
		'Shadcn UI',
		'NestJS',
		'Spring Boot',
		'Prisma',
		'PostgreSQL',
		'MongoDB',
		'Docker',
		'AWS',
		'Redis',
		'Vercel',
		'Turborepo',
		'Web3'
	],
	navbar: [
		{ href: '/', icon: HomeIcon, label: 'Home' },
		{ href: '#projects', icon: CodeIcon, label: 'Projects' }
	],
	contact: {
		email: 'hoangquan.tran.work@gmail.com',
		tel: '',
		social: {
			GitHub: {
				name: 'GitHub',
				url: 'https://github.com/Quantaphocpython',
				icon: GithubSvg,
				navbar: true,
				dark_icon: GithubDarkSvg
			},
			LinkedIn: {
				name: 'LinkedIn',
				url: 'https://www.linkedin.com/in/qu%C3%A2n-tr%E1%BA%A7n-714134398/',
				icon: LinkedinSvg,
				navbar: true,
				dark_icon: LinkedinDarkSvg
			},
			email: {
				name: 'Send Email',
				url: 'mailto:hoangquan.tran.work@gmail.com',
				icon: GmailSvg,
				navbar: true,
				dark_icon: GmailDarkSvg
			},
			X: {
				name: 'X',
				url: 'https://github.com/Quantaphocpython',
				icon: GithubSvg,
				navbar: false,
				dark_icon: GithubDarkSvg
			}
		}
	},
	work: [
		{
			company: 'Alchemy',
			href: '#',
			badges: ['Full-time'],
			location: 'Ho Chi Minh City, Vietnam',
			title: 'Frontend Developer',
			logoUrl: '/experiences/alchemy/logo.png',
			start: 'Apr 2024',
			end: 'Present',
			description:
				'Constructed web interfaces, integrated APIs, and implemented blockchain features (token integration). Built creative UIs for short-term campaigns (15-30 days) to maximize user acquisition. Optimized state management, wrote unit tests, and enhanced UI/UX layouts. Developed AI chatbot interfaces to support customer service across multiple platforms (Instagram, X, Zalo, Facebook, Telegram).'
		},
		{
			company: 'Freelance',
			href: '#',
			badges: ['Remote'],
			location: 'Ho Chi Minh City, Vietnam',
			title: 'Full Stack Developer',
			logoUrl: '',
			start: '2024',
			end: 'Present',
			description:
				'Specialized in architecting and delivering high-performance web solutions for diverse business needs. Key projects include a comprehensive personal finance ecosystem with real-time tracking and analytics, as well as various custom enterprise dashboards. Focused on building scalable, type-safe applications using modern stacks (Next.js, NestJS) while ensuring pixel-perfect implementation and seamless user experiences across all devices.'
		}
	],
	education: [
		{
			school: 'University of Transport Ho Chi Minh City (UTH)',
			href: 'https://uth.edu.vn/',
			degree: 'Bachelor of Information Technology (GPA: 3.64 / 4.0)',
			logoUrl: '/experiences/uth/logo.png',
			start: '2022',
			end: '2026'
		}
	],
	projects: [
		{
			title: 'InquireA - Q&A Creator Platform',
			href: 'https://www.inquirea.tech/',
			dates: 'Jan 2025',
			active: true,
			description:
				'Built a blockchain-based Q&A platform where user contributions are rewarded with tokens, ensuring every contribution adds value to the community. Awarded $3,000 Prize at Ancient8 Builder Jam.',
			technologies: [
				'Blockchain',
				'Web3',
				'Next.js',
				'TypeScript',
				'TailwindCSS',
				'Q&A System'
			],
			links: [
				{
					type: 'Website',
					href: 'https://www.inquirea.tech/',
					icon: Globe
				}
			],
			image: '/rewards/builder-jam/reward-1.jpg',
			video: ''
		},
		{
			title: 'HeartGive - Transparent Fundraising',
			href: 'https://www.facebook.com/share/1GxEUHWjPd/',
			dates: '2024',
			active: true,
			description:
				'HeartGive is a blockchain-based fundraising platform enabling transparent donation management. Integrated with Cardano for traceability and verification. Smart contracts via Aiken automate fund allocation. Won Runner-up ($500) at Cardano Vietnam Hackathon 2024.',
			technologies: [
				'Cardano',
				'Aiken',
				'Smart Contracts',
				'TypeScript',
				'Consumer App'
			],
			links: [
				{
					type: 'Certificate',
					href: 'https://www.facebook.com/share/1AuxKKaVgQ/',
					icon: Globe
				}
			],
			image: '/rewards/cardano/cardano_runner-up.jpg',
			video: ''
		},
		{
			title: 'Transocean - Decentralized Logistics',
			href: 'https://www.facebook.com/share/p/1BzCCNaWtV/',
			dates: '2025',
			active: true,
			description:
				'Decentralized platform for identifying and tracking ports visited by ships during their journeys. Utilizing Polkadot blockchain technology for data transparency and immutability. Awarded Best UI/UX ($500) at Polkadot Vietnam Hackathon 2025.',
			technologies: [
				'Polkadot',
				'Blockchain',
				'UI/UX',
				'Tracking',
				'TypeScript'
			],
			links: [
				{
					type: 'Announcement',
					href: 'https://www.facebook.com/share/p/1BzCCNaWtV/',
					icon: Globe
				}
			],
			image: '/rewards/polkadot/banner.png',
			video: ''
		}
	],
	hackathons: [
		{
			title: 'Ancient8 Builder Jam',
			dates: 'January 2025',
			location: 'Vietnam / Global',
			description:
				'Awarded $3,000 prize for developing InquireA, a blockchain-based Q&A creator platform.',
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
			title: 'Cardano Vietnam Hackathon 2024',
			dates: '2024',
			location: 'Vietnam',
			description:
				'Awarded $500 Runner-up Prize for HeartGive fundraising smart contract platform built on Cardano & Aiken.',
			image: '/rewards/cardano/banner.png',
			win: 'Runner-up / $500 Reward',
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
		},
		{
			title: 'Polkadot Vietnam Hackathon 2025',
			dates: '2025',
			location: 'Vietnam',
			description:
				'Awarded Best UI/UX Award ($500) for Transocean ship tracking logistics blockchain platform.',
			image: '/rewards/polkadot/banner.png',
			win: 'Best UI/UX Award / $500 Reward',
			links: [
				{
					title: 'Post',
					icon: Globe,
					href: 'https://www.facebook.com/share/p/1BzCCNaWtV/'
				}
			]
		}
	]
};
