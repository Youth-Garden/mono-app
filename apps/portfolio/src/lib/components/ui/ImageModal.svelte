<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { X } from 'lucide-svelte';

	export let src: string = '';
	export let alt: string = '';
	export let isOpen: boolean = false;

	function close() {
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && src}
	<button
		type="button"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md cursor-zoom-out border-0 w-full h-full text-left"
		transition:fade={{ duration: 200 }}
		on:click={close}
	>
		<!-- Modal Content Box -->
		<div
			class="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-neutral-900/90 p-2 shadow-2xl cursor-default"
			transition:scale={{ duration: 250, start: 0.92 }}
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				on:click={close}
				class="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white/80 transition-all hover:bg-black hover:text-white"
				aria-label="Close image preview"
			>
				<X class="size-5" />
			</button>

			<img
				{src}
				{alt}
				class="max-h-[82vh] max-w-[88vw] rounded-lg object-contain"
			/>
			{#if alt}
				<p class="mt-2 text-center text-xs font-medium text-white/75">{alt}</p>
			{/if}
		</div>
	</button>
{/if}
