<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { openImageModal } from '$lib/stores/modal';
	import { marked } from 'marked';

	export let title: string;
	export let description: string;
	export let dates: string;
	export let location: string;
	export let image: string = '';
	export let links: readonly {
		icon?: any;
		title: string;
		href: string;
	}[] = [];
</script>

<li class="relative ml-10 py-4">
	<div class="absolute -left-16 top-2 flex items-center justify-center rounded-full bg-white">
		<button
			type="button"
			on:click={() => openImageModal(image, title)}
			class="group rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
			title="Click to view full image"
		>
			<Avatar.Root class="m-auto size-12 border transition-transform duration-200 group-hover:scale-105">
				<Avatar.Image src={image} alt={title} class="size-full object-cover object-center cursor-zoom-in" />
				<Avatar.Fallback>{title[0]}</Avatar.Fallback>
			</Avatar.Root>
		</button>
	</div>
	<div class="flex flex-1 flex-col justify-start gap-1">
		{#if dates}
			<time class="text-xs text-muted-foreground">{dates}</time>
		{/if}
		<h2 class="font-semibold leading-none">{title}</h2>
		{#if location}
			<p class="text-sm text-muted-foreground">{location}</p>
		{/if}
		{#if description}
			<span class="prose dark:prose-invert text-sm text-muted-foreground">
				{@html marked(description)}
			</span>
		{/if}
	</div>
	{#if links && links.length > 0}
		<div class="mt-2 flex flex-row flex-wrap items-start gap-2">
			{#each links as link, idx}
				<a href={link.href}>
					<Badge key={idx} title={link.title} class="flex gap-2">
						<svelte:component this={link.icon} class="h-4 w-4 " strokeWidth={1.6} />
						{link.title}
					</Badge>
				</a>
			{/each}
		</div>
	{/if}
</li>
