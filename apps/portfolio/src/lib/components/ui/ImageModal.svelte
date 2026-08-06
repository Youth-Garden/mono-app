<script lang="ts">
	import { activeImageModal, closeImageModal } from '$lib/stores/modal';
	import { X, ZoomIn } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeImageModal();
	}

	$: if (typeof document !== 'undefined') {
		if ($activeImageModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $activeImageModal}
	<div
		class="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black/60 p-4 sm:p-8 backdrop-blur-sm select-none"
		transition:fade={{ duration: 180 }}
		on:click={closeImageModal}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<button
			type="button"
			on:click={closeImageModal}
			class="fixed top-5 right-5 z-[1000000] flex size-12 items-center justify-center rounded-full bg-black/60 text-white shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:bg-black hover:scale-110 active:scale-95 cursor-pointer"
			aria-label="Close image preview"
		>
			<X class="size-7" />
		</button>

		<div
			class="relative flex max-h-[88vh] max-w-[92vw] flex-col items-center justify-center cursor-default"
			transition:scale={{ duration: 220, start: 0.94 }}
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="document"
		>
			<div class="relative overflow-hidden rounded-2xl border border-white/20 bg-neutral-950/80 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-sm">
				<img
					src={$activeImageModal.src}
					alt={$activeImageModal.alt || ''}
					class="max-h-[82vh] max-w-[90vw] h-auto w-auto object-contain block rounded-2xl"
				/>
			</div>

			{#if $activeImageModal.alt}
				<div class="mt-4 flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-md border border-white/20 shadow-lg">
					<ZoomIn class="size-4 text-white/70" />
					<p class="text-xs font-medium text-white/90">{$activeImageModal.alt}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
