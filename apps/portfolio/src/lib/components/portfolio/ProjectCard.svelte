<script lang="ts">
	import { marked } from 'marked';
	import Badge from '../ui/badge/badge.svelte';
	import { openProjectModal } from '$lib/stores/projectModal';
	import { openImageModal } from '$lib/stores/modalStore';

	let _class = '';
	export { _class as class };
	export let title: string;
	export let href: string = '';
	export let description: string = '';
	export let dates: string = '';
	export let tags: readonly string[] = [];
	export let link: string = '';
	export let image: string = '';
	export let images: readonly string[] = [];
	export let video: string = '';
	export let links: { icon: any; type: string; href: string }[] = [];
	export let issuer: string = '';
	export let hoverLabel: string = '';
	export let type: 'project' | 'certificate' = 'project';
	export let imageFit: 'cover' | 'contain' | string = 'cover';
	export let imageBg: string = '';

	function handleOpenDetail() {
		if (type === 'certificate') {
			openImageModal(image, title);
		} else {
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
	}
</script>

<!-- Shared Card Component for Projects & Certificates -->
<div
	class="flex h-full flex-col overflow-hidden border border-border transition-all duration-300 ease-out hover:shadow-lg hover:border-primary/50 rounded-lg bg-card text-card-foreground group cursor-pointer"
	on:click={handleOpenDetail}
	on:keydown={(e) => e.key === 'Enter' && handleOpenDetail()}
	role="button"
	tabindex="0"
>
	<!-- Media Header -->
	<div class="relative h-44 w-full overflow-hidden bg-muted flex-none">
		{#if video}
			<video
				class="pointer-events-none size-full object-cover object-center"
				src={video}
				autoplay
				loop
				muted
			></video>
		{:else if image}
			{#if imageFit === 'contain'}
				<div class="size-full flex items-center justify-center p-6 {imageBg || 'bg-white'}">
					<img
						class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
						src={image}
						alt={title}
					/>
				</div>
			{:else}
				<div class="size-full">
					<img
						class="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
						src={image}
						alt={title}
					/>
				</div>
			{/if}
		{/if}
	</div>

	<!-- Card Body -->
	<div class="flex flex-1 flex-col px-3 py-3">
		<div class="space-y-1">
			<!-- Title -->
			<h3 class="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
				{title}
			</h3>

			<!-- Dates on separate line below title -->
			{#if dates}
				<time class="block font-sans text-xs text-muted-foreground">{dates}</time>
			{/if}

			<!-- Issuer Badge (for Certificate) -->
			{#if issuer}
				<div class="flex items-center gap-1.5 pt-0.5">
					<Badge variant="secondary" class="rounded-[4px] px-1.5 py-0 text-[10px]">{issuer}</Badge>
				</div>
			{/if}

			<!-- Description -->
			{#if description}
				<div class="prose dark:prose-invert max-w-full text-pretty font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-0.5">
					{@html marked(description)}
				</div>
			{/if}
		</div>

		<!-- Tags (for Projects) -->
		{#if tags && tags.length > 0}
			<div class="mt-auto pt-3 flex flex-wrap gap-1">
				{#each tags as tag}
					<Badge class="rounded-[4px] px-1.5 py-0 text-[10px]" variant="secondary">
						{tag}
					</Badge>
				{/each}
			</div>
		{/if}

		<!-- External Links Footer (if any) -->
		{#if links && links.length > 0}
			<div class="mt-auto pt-3 flex flex-row flex-wrap items-center gap-1">
				{#each links as linkItem}
					<a
						href={linkItem?.href}
						target="_blank"
						on:click|stopPropagation
					>
						<Badge class="flex gap-1 px-2 py-1 text-[10px] items-center justify-center hover:bg-primary/90 transition-all">
							{#if linkItem.icon}
								<svelte:component this={linkItem.icon} class="size-3" strokeWidth={1.6} />
							{/if}
							{linkItem.type}
						</Badge>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
