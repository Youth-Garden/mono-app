<script lang="ts">
	import { modalStack, closeModal, openImageModal } from '$lib/stores/modalStore';
	import { fade } from 'svelte/transition';
	import { X, ExternalLink, Images, ZoomIn, Calendar } from 'lucide-svelte';
	import { marked } from 'marked';
	import Badge from './badge/badge.svelte';
	import Modal from './Modal.svelte';

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
	}

	$: activeModalIndex = $modalStack.length - 1;
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- 1 SINGLE GLOBAL BACKDROP LAYER at z-index: 99 -->
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
{/if}

<!-- MODALS LAYER -->
{#each $modalStack as modal, index (modal.id)}
	{@const isActive = index === activeModalIndex}

	<Modal {isActive}>
		<!-- Project Detail Modal -->
		{#if modal.type === 'project'}
			{@const project = modal.data}
			<div
				class="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
			>
				<!-- Hero Image Header -->
				{#if project.image}
					<div class="relative h-44 sm:h-52 w-full overflow-hidden bg-muted flex-none">
						<img
							src={project.image}
							alt={project.title}
							class="size-full object-cover object-center"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent"></div>
						
						<!-- Close Button Top Right -->
						<button
							type="button"
							on:click={() => closeModal(modal.id)}
							class="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110 active:scale-95 border border-white/20 cursor-pointer"
							aria-label="Close"
						>
							<X class="size-5" />
						</button>

						<!-- Overlay Title & Dates -->
						<div class="absolute bottom-4 left-6 right-6 space-y-1">
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
					</div>
				{:else}
					<!-- Header without Image -->
					<div class="flex items-start justify-between border-b px-6 py-4 flex-none">
						<div class="space-y-1">
							<h3 class="text-xl font-bold tracking-tight text-foreground">{project.title}</h3>
							{#if project.dates}
								<p class="text-xs text-muted-foreground font-sans">{project.dates}</p>
							{/if}
						</div>
						<button
							type="button"
							on:click={() => closeModal(modal.id)}
							class="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-accent hover:text-foreground cursor-pointer"
							aria-label="Close"
						>
							<X class="size-5" />
						</button>
					</div>
				{/if}

				<!-- Scrollable Body -->
				<div class="flex-1 overflow-y-auto p-6 space-y-6">
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

					<!-- Photo Gallery -->
					{#if project.images && project.images.length > 0}
						<div class="space-y-3">
							<div class="flex items-center gap-2">
								<Images class="size-4 text-muted-foreground" />
								<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Project Photo Gallery ({project.images.length})
								</h4>
							</div>
							<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
								{#each project.images as imgUrl}
									<button
										type="button"
										on:click={() => openImageModal(imgUrl, project?.title || '')}
										class="group relative aspect-video overflow-hidden rounded-xl border bg-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:border-primary/50 cursor-pointer"
									>
										<img
											src={imgUrl}
											alt={project.title}
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
					<div class="flex flex-wrap items-center gap-2 border-t bg-muted/30 px-6 py-4 flex-none">
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

		<!-- Image Fullscreen Lightbox Modal -->
		{:else if modal.type === 'image'}
			{@const imgData = modal.data}
			<div
				class="flex max-h-[88vh] max-w-[92vw] flex-col items-center justify-center"
			>
				<button
					type="button"
					on:click={() => closeModal(modal.id)}
					class="fixed top-5 right-5 z-[101] flex size-12 items-center justify-center rounded-full bg-black/60 text-white shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:bg-black hover:scale-110 active:scale-95 cursor-pointer"
					aria-label="Close image preview"
				>
					<X class="size-7" />
				</button>

				<div class="relative overflow-hidden rounded-2xl border border-white/20 bg-neutral-950/80 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-sm">
					<img
						src={imgData.src}
						alt={imgData.alt || ''}
						class="max-h-[82vh] max-w-[90vw] h-auto w-auto object-contain block rounded-2xl"
					/>
				</div>

				{#if imgData.alt}
					<div class="mt-4 flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-md border border-white/20 shadow-lg">
						<ZoomIn class="size-4 text-white/70" />
						<p class="text-xs font-medium text-white/90">{imgData.alt}</p>
					</div>
				{/if}
			</div>
		{/if}
	</Modal>
{/each}
