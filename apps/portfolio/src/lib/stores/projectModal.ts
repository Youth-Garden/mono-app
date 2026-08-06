import { writable } from 'svelte/store';

export interface ProjectModalData {
	title: string;
	dates?: string;
	description?: string;
	technologies?: readonly string[];
	links?: readonly { icon?: any; type?: string; href: string }[];
	image?: string;
	images?: readonly string[];
}

export const activeProjectModal = writable<ProjectModalData | null>(null);

export function openProjectModal(project: ProjectModalData) {
	activeProjectModal.set(project);
}

export function closeProjectModal() {
	activeProjectModal.set(null);
}
