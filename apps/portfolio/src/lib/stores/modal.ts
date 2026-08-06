export {
	openImageModal,
	closeImageModal,
	activeImageModal,
	modalStack
} from './modalStore';

export interface ImageModalState {
	src: string;
	alt?: string;
}
