<script lang="ts">
	import { Calendar, ExternalLink, X, ZoomIn } from 'lucide-svelte';
	import { marked } from 'marked';
	import { closeModal, openImageModal } from '$lib/stores/modalStore';
	import Badge from './badge/badge.svelte';

	export let project: any;
	export let modalId: string;
</script>

<div
	class="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
>
	<!-- Hero Image Banner -->
	{#if project.image}
		<div class="relative h-48 sm:h-56 w-full overflow-hidden bg-muted flex-none">
			<img
				src={project.image}
				alt={project.title}
				class="size-full object-cover object-center"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

			<!-- Close Button Top Right of Hero Banner -->
			<button
				type="button"
				on:click={() => closeModal(modalId)}
				class="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110 active:scale-95 border border-white/20 cursor-pointer"
				aria-label="Close"
			>
				<X class="size-5" />
			</button>
		</div>
	{/if}

	<!-- Title & Meta Header Section -->
	<div class="flex items-start justify-between border-b px-6 py-4 bg-card flex-none">
		<div class="space-y-1 pr-4">
			<h3 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
				{project.title}
			</h3>
			{#if project.dates}
				<div class="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
					<Calendar class="size-3.5" />
					<span>{project.dates}</span>
				</div>
			{/if}
		</div>
		{#if !project.image}
			<button
				type="button"
				on:click={() => closeModal(modalId)}
				class="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-accent hover:text-foreground cursor-pointer flex-none"
				aria-label="Close"
			>
				<X class="size-5" />
			</button>
		{/if}
	</div>

	<!-- Scrollable Body -->
	<div class="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 space-y-6 select-text no-scrollbar" data-lenis-prevent>
		<!-- About Project Description -->
		{#if project.description}
			<div class="space-y-2">
				<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">About Project</h4>
				<div class="prose dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
					{@html marked(project.description)}
				</div>
			</div>
		{/if}

		<!-- Tech Stack Tags -->
		{#if project.technologies && project.technologies.length > 0}
			<div class="space-y-2">
				<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Technologies Used</h4>
				<div class="flex flex-wrap gap-1">
					{#each project.technologies as tech}
						<Badge class="rounded-[4px] px-2 py-0.5 text-[11px]" variant="secondary">{tech}</Badge>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Photo Gallery Grid -->
		{#if project.images && project.images.length > 0}
			<div class="space-y-3">
				<div class="flex items-center gap-2">
					<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Project Photo Gallery
					</h4>
				</div>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{#each project.images as imgUrl, idx}
						<button
							type="button"
							on:click={() => openImageModal({ images: project.images, index: idx, alt: project.title })}
							class="group relative aspect-video overflow-hidden rounded-xl border bg-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:border-primary/50 cursor-pointer"
						>
							<img
								src={imgUrl}
								alt="{project.title} photo {idx + 1}"
								class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
								<ZoomIn class="size-5 text-white" />
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Footer Links -->
	{#if project.links && project.links.length > 0}
		<div class="flex flex-wrap items-center gap-2 border-t px-6 py-4 flex-none">
			{#each project.links as link}
				<a
					href={link.href}
					target="_blank"
					rel="noreferrer"
				>
					<Badge class="flex gap-1.5 px-3 py-1.5 text-xs items-center justify-center hover:bg-primary/90 transition-all">
						{#if link.icon}
							<svelte:component this={link.icon} class="size-3.5" strokeWidth={1.6} />
						{:else}
							<ExternalLink class="size-3.5" />
						{/if}
						{link.type || 'Visit Link'}
					</Badge>
				</a>
			{/each}
		</div>
	{/if}
</div>
