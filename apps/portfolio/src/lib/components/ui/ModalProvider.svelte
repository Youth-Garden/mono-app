<script lang="ts">
	import { closeModal, modalStack } from '$lib/stores/modalStore';
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import ImageLightboxModal from './ImageLightboxModal.svelte';
	import Modal from './Modal.svelte';
	import ProjectModalContent from './ProjectModalContent.svelte';

	function handleKeydown(e: KeyboardEvent) {
		if ($modalStack.length === 0) return;
		const topModal = $modalStack[$modalStack.length - 1];

		if (e.key === 'Escape') {
			e.preventDefault();
			closeModal();
		} else if (topModal.type === 'image' && topModal.data.images?.length > 1) {
			const images = topModal.data.images;
			const currentIndex = topModal.data.index || 0;
			let nextIdx = currentIndex;

			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				nextIdx = (currentIndex - 1 + images.length) % images.length;
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				nextIdx = (currentIndex + 1) % images.length;
			}

			if (nextIdx !== currentIndex) {
				modalStack.update((stack) =>
					stack.map((item) => {
						if (item.id === topModal.id) {
							return {
								...item,
								data: {
									...item.data,
									index: nextIdx,
									src: images[nextIdx]
								}
							};
						}
						return item;
					})
				);
			}
		}
	}

	$: activeModalIndex = $modalStack.length - 1;
	$: hasImageModal = $modalStack.some((m) => m.type === 'image');
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- 1 SINGLE GLOBAL BACKDROP LAYER -->
{#if $modalStack.length > 0}
	<div
		class="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm select-none"
		transition:fade={{ duration: 200 }}
		on:click={() => closeModal()}
		on:keydown={handleKeydown}
		role="button"
		tabindex="-1"
		aria-label="Close backdrop"
	></div>

	<!-- Fixed Top-Right Window Close Button for Image Lightbox -->
	{#if hasImageModal}
		<button
			type="button"
			on:click={() => closeModal()}
			class="fixed top-6 right-6 z-[99999] flex size-11 items-center justify-center rounded-full bg-black/80 text-white shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:bg-black hover:scale-110 active:scale-95 cursor-pointer"
			transition:fade={{ duration: 150 }}
			aria-label="Close modal"
		>
			<X class="size-6" />
		</button>
	{/if}
{/if}

<!-- MODALS LAYER -->
{#each $modalStack as modal, index (modal.id)}
	{@const isActive = index === activeModalIndex}

	<Modal {isActive}>
		{#if modal.type === 'project'}
			<ProjectModalContent project={modal.data} modalId={modal.id} />
		{:else if modal.type === 'image'}
			<ImageLightboxModal data={modal.data} modalId={modal.id} />
		{/if}
	</Modal>
{/each}
