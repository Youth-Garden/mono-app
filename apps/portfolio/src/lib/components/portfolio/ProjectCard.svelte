<script lang="ts">
	import { marked } from 'marked';
	import Badge from '../ui/badge/badge.svelte';
	import { openProjectModal } from '$lib/stores/projectModal';

	let _class = '';
	export { _class as class };
	export let title: string;
	export let href: string = '';
	export let description: string;
	export let dates: string;
	export let tags: readonly string[];
	export let link: string = '';
	export let image: string = '';
	export let images: readonly string[] = [];
	export let video: string = '';
	export let links: { icon: any; type: string; href: string }[] = [];

	function handleOpenDetail() {
		openProjectModal({
			title,
			dates,
			description,
			technologies: tags,
			links,
			image,
			images: images && images.length > 0 ? images : image ? [image] : []
		});
	}
</script>

<!-- Card -->
<div
	class="flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg rounded-lg bg-card text-card-foreground group cursor-pointer"
	on:click={handleOpenDetail}
	on:keydown={(e) => e.key === 'Enter' && handleOpenDetail()}
	role="button"
	tabindex="0"
>
	<div class="relative h-44 w-full overflow-hidden bg-muted">
		{#if video}
			<video
				class="pointer-events-none size-full object-cover object-center"
				src={video}
				autoplay
				loop
				muted
			></video>
		{:else if image}
			<div class="size-full">
				<img
					class="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
					src={image}
					alt={title}
				/>
			</div>
		{/if}
	</div>
	<!-- Card Header -->
	<div class="px-2 flex flex-col">
		<div class="space-y-1">
			<!-- Card Title -->
			<div class="mt-1 text-base font-semibold group-hover:text-primary transition-colors">{title}</div>
			<time class="font-sans text-xs text-muted-foreground">{dates}</time>
			<div class="hidden font-sans text-xs underline print:visible">
				{link?.replace('https://', '').replace('www.', '').replace('/', '')}
			</div>
			<div
				class="prose dark:prose-invert max-w-full text-pretty font-sans text-xs text-muted-foreground line-clamp-3"
			>
				{@html marked(description)}
			</div>
		</div>
	</div>
	<!-- Card Content -->
	<div class="mt-auto flex flex-col px-2 text-pretty font-sans text-sm text-muted-foreground">
		{#if tags && tags.length > 0}
			<div class="mt-2 flex flex-wrap gap-1">
				{#each tags as tag}
					<Badge class="rounded-[4px] px-1 py-0 text-[10px]" variant="secondary">
						{tag}
					</Badge>
				{/each}
			</div>
		{/if}
	</div>
	<!-- Card Footer -->
	<div class="px-2 pb-2 flex items-center pt-2">
		{#if links && links.length > 0}
			<div class="flex flex-row flex-wrap items-start gap-1">
				{#each links as linkItem}
					<a
						href={linkItem?.href}
						target="_blank"
						on:click|stopPropagation
					>
						<Badge class="flex gap-1 px-2 py-1 text-[10px] items-center justify-center hover:bg-primary/90">
							<svelte:component this={linkItem.icon} class="size-3 mb-px" strokeWidth={1.6} />
							{linkItem.type}
						</Badge>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
