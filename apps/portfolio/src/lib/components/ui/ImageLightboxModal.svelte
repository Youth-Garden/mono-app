<script lang="ts">
	import { closeModal, modalStack } from '$lib/stores/modalStore';
	import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-svelte';

	export let modalId: string;
	export let data: {
		src: string;
		alt?: string;
		images?: string[];
		index?: number;
	};

	$: images = data.images && data.images.length > 0 ? data.images : [data.src];
	$: currentIndex = data.index ?? 0;
	$: hasMultiple = images.length > 1;
	$: currentSrc = images[currentIndex] || data.src;

	function setIndex(newIndex: number) {
		const nextIdx = (newIndex + images.length) % images.length;
		modalStack.update((stack) =>
			stack.map((item) => {
				if (item.id === modalId && item.type === 'image') {
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

	function handlePrev(e: MouseEvent) {
		e.stopPropagation();
		setIndex(currentIndex - 1);
	}

	function handleNext(e: MouseEvent) {
		e.stopPropagation();
		setIndex(currentIndex + 1);
	}
</script>

<!-- Screen Edge Fixed Arrows (Far Left & Far Right of screen) -->
{#if hasMultiple}
	<button
		type="button"
		on:click={handlePrev}
		class="fixed left-4 sm:left-10 top-1/2 -translate-y-1/2 z-[100000] flex size-12 items-center justify-center rounded-full bg-black/80 text-white shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:bg-black hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
		aria-label="Previous image"
	>
		<ChevronLeft class="size-6" />
	</button>

	<button
		type="button"
		on:click={handleNext}
		class="fixed right-4 sm:right-10 top-1/2 -translate-y-1/2 z-[100000] flex size-12 items-center justify-center rounded-full bg-black/80 text-white shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:bg-black hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
		aria-label="Next image"
	>
		<ChevronRight class="size-6" />
	</button>
{/if}

<!-- Center Main Image Viewport (Clicking empty background space closes modal) -->
<div
	class="flex h-screen w-screen flex-col items-center justify-center p-4 sm:p-8 select-none pointer-events-auto cursor-pointer"
	on:click={() => closeModal(modalId)}
>
	<div class="pb-20 cursor-default" on:click|stopPropagation>
		<!-- Thin White Border Image Frame -->
		<div class="relative inline-flex items-center justify-center rounded-xl border border-white/20 bg-white p-1 sm:p-1.5 shadow-2xl backdrop-blur-sm">
			<img
				src={currentSrc}
				alt={data.alt || ''}
				class="max-h-[66vh] max-w-[80vw] h-auto w-auto object-contain block rounded-lg bg-white"
			/>
		</div>
	</div>
</div>

<!-- Screen Bottom Fixed Controls -->
<div
	class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100000] flex flex-col items-center gap-2 max-w-[90vw] pointer-events-auto select-none"
	on:click|stopPropagation
>
	{#if data.alt}
		<div class="flex items-center gap-2 rounded-full bg-black/80 px-4 py-1.5 backdrop-blur-md border border-white/20 shadow-lg">
			<ZoomIn class="size-4 text-white/70" />
			<p class="text-xs font-medium text-white/90">{data.alt}</p>
		</div>
	{/if}

	{#if hasMultiple}
		<div class="flex items-center gap-2.5 overflow-x-auto max-w-[84vw] p-2 no-scrollbar select-none">
			{#each images as imgUrl, idx}
				<button
					type="button"
					on:click={() => setIndex(idx)}
					class="relative h-12 aspect-video shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer {idx === currentIndex ? 'border-white ring-2 ring-white/50 opacity-100 scale-105 z-10 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}"
				>
					<img
						src={imgUrl}
						alt="Thumbnail {idx + 1}"
						class="size-full object-cover"
					/>
				</button>
			{/each}
		</div>
	{/if}
</div>
