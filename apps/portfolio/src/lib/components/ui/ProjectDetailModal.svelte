<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { X, ExternalLink, Images, ZoomIn, Calendar } from 'lucide-svelte';
	import { marked } from 'marked';
	import { activeProjectModal, closeProjectModal } from '$lib/stores/projectModal';
	import { openImageModal } from '$lib/stores/modal';
	import Badge from './badge/badge.svelte';

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeProjectModal();
	}

	$: if (typeof document !== 'undefined') {
		if ($activeProjectModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $activeProjectModal}
	<div
		class="fixed inset-0 z-[99990] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm select-none"
		transition:fade={{ duration: 180 }}
		on:click={closeProjectModal}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<!-- Modal Content Box -->
		<div
			class="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl cursor-default"
			transition:scale={{ duration: 220, start: 0.94 }}
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="document"
		>
			<!-- Hero Image Header -->
			{#if $activeProjectModal.image}
				<div class="relative h-44 sm:h-52 w-full overflow-hidden bg-muted flex-none">
					<img
						src={$activeProjectModal.image}
						alt={$activeProjectModal.title}
						class="size-full object-cover object-center"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent"></div>
					
					<!-- Close Button Top Right -->
					<button
						type="button"
						on:click={closeProjectModal}
						class="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110 active:scale-95 border border-white/20"
						aria-label="Close"
					>
						<X class="size-5" />
					</button>

					<!-- Overlay Title & Dates -->
					<div class="absolute bottom-4 left-6 right-6 space-y-1">
						<h3 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
							{$activeProjectModal.title}
						</h3>
						{#if $activeProjectModal.dates}
							<div class="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
								<Calendar class="size-3.5" />
								<span>{$activeProjectModal.dates}</span>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<!-- Header without Image -->
				<div class="flex items-start justify-between border-b px-6 py-4 flex-none">
					<div class="space-y-1">
						<h3 class="text-xl font-bold tracking-tight text-foreground">{$activeProjectModal.title}</h3>
						{#if $activeProjectModal.dates}
							<p class="text-xs text-muted-foreground font-sans">{$activeProjectModal.dates}</p>
						{/if}
					</div>
					<button
						type="button"
						on:click={closeProjectModal}
						class="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
						aria-label="Close"
					>
						<X class="size-5" />
					</button>
				</div>
			{/if}

			<!-- Scrollable Body -->
			<div class="flex-1 overflow-y-auto p-6 space-y-6">
				<!-- About Project Description -->
				{#if $activeProjectModal.description}
					<div class="space-y-2">
						<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">About Project</h4>
						<div class="prose dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
							{@html marked($activeProjectModal.description)}
						</div>
					</div>
				{/if}

				<!-- Tech Stack Tags -->
				{#if $activeProjectModal.technologies && $activeProjectModal.technologies.length > 0}
					<div class="space-y-2">
						<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Technologies Used</h4>
						<div class="flex flex-wrap gap-1">
							{#each $activeProjectModal.technologies as tech}
								<Badge class="rounded-[4px] px-2 py-0.5 text-[11px]" variant="secondary">{tech}</Badge>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Photo Gallery -->
				{#if $activeProjectModal.images && $activeProjectModal.images.length > 0}
					<div class="space-y-3">
						<div class="flex items-center gap-2">
							<Images class="size-4 text-muted-foreground" />
							<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Project Photo Gallery ({$activeProjectModal.images.length})
							</h4>
						</div>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{#each $activeProjectModal.images as imgUrl}
								<button
									type="button"
									on:click={() => openImageModal(imgUrl, $activeProjectModal?.title || '')}
									class="group relative aspect-video overflow-hidden rounded-xl border bg-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:border-primary/50"
								>
									<img
										src={imgUrl}
										alt={$activeProjectModal.title}
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
			{#if $activeProjectModal.links && $activeProjectModal.links.length > 0}
				<div class="flex flex-wrap items-center gap-2 border-t bg-muted/30 px-6 py-4 flex-none">
					{#each $activeProjectModal.links as link}
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
	</div>
{/if}
