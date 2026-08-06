import { writable, derived } from 'svelte/store';

export type ModalType = 'project' | 'image';

export interface ModalItem<T = any> {
	id: string;
	type: ModalType;
	data: T;
}

export const modalStack = writable<ModalItem[]>([]);

export const activeProjectModal = derived(modalStack, ($stack) => {
	const item = $stack.find((m) => m.type === 'project');
	return item ? item.data : null;
});

export const activeImageModal = derived(modalStack, ($stack) => {
	const item = $stack.find((m) => m.type === 'image');
	return item ? item.data : null;
});

if (typeof document !== 'undefined') {
	modalStack.subscribe((stack) => {
		if (stack.length > 0) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
}

export function openModal<T = any>(type: ModalType, data: T): string {
	const id = `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
	modalStack.update((stack) => [...stack, { id, type, data }]);
	return id;
}

export function closeModal(id?: string) {
	modalStack.update((stack) => {
		if (!id) return stack.slice(0, -1);
		return stack.filter((item) => item.id !== id);
	});
}

export function closeAllModals() {
	modalStack.set([]);
}

export function openProjectModal(project: any) {
	return openModal('project', project);
}

export function closeProjectModal() {
	modalStack.update((stack) => stack.filter((item) => item.type !== 'project'));
}

export function openImageModal(src: string, alt: string = '') {
	return openModal('image', { src, alt });
}

export function closeImageModal() {
	modalStack.update((stack) => stack.filter((item) => item.type !== 'image'));
}
