import { writable } from 'svelte/store';

export interface ImageModalState {
	src: string;
	alt?: string;
}

export const activeImageModal = writable<ImageModalState | null>(null);

export function openImageModal(src: string, alt: string = '') {
	if (!src) return;
	activeImageModal.set({ src, alt });
}

export function closeImageModal() {
	activeImageModal.set(null);
}
