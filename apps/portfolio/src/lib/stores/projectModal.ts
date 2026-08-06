export {
	openProjectModal,
	closeProjectModal,
	activeProjectModal,
	modalStack
} from './modalStore';

export interface ProjectModalData {
	title: string;
	dates?: string;
	description?: string;
	technologies?: readonly string[];
	links?: readonly { icon?: any; type?: string; href: string }[];
	image?: string;
	images?: readonly string[];
}
