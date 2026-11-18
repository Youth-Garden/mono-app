<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';
	import { ChevronRightIcon } from 'lucide-svelte';
	import { quartOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	export let logoUrl: string = '';
	export let company: string = '';
	export let title: string = '';
	export let subtitle: string = '';
	export let href: string = '';
	export let badges: string[]=[''];
	export let description: string = '';
	export let start: string = '';
	export let end: string = '';
	let isExpanded = false;

	$: bullets = description
		? description
				.split('\n')
				.map((line) => line.trim())
				.filter(Boolean)
		: [];

	let handleClick = (e: MouseEvent) => {
		if (description) {
			e.preventDefault();
			isExpanded = !isExpanded;
		}
	};
</script>

<a href={href || '#'} target={href && href !== '#' ? '_blank' : undefined} rel={href && href !== '#' ? 'noreferrer' : undefined} on:click={handleClick}>
	<div class="flex rounded-lg bg-card text-card-foreground">
		<div class="flex-none">
			<Avatar.Root class="bg-muted-background m-auto size-12 border dark:bg-foreground">
				<Avatar.Image src={logoUrl} alt={company} class="object-contain" />
				<Avatar.Fallback>{company[0]}</Avatar.Fallback>
			</Avatar.Root>
		</div>
		<div class="group ml-4 flex-grow flex-col items-center">
			<div class="flex flex-col">
				<div class="flex items-center justify-between gap-x-2 text-base">
					<h3
						class="inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm"
					>
						{company}
						{#if badges?.length > 0 && badges[0] !== ''}
							<span class="inline-flex gap-x-1 ml-2">
								{#each badges as badge, index}
									<Badge variant="secondary" class="align-middle text-xs" key={index}>
										{badge}
									</Badge>
								{/each}
							</span>
						{/if}
						<ChevronRightIcon
							class={cn(
								'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100',
								isExpanded ? 'rotate-90' : 'rotate-0'
							)}
						/>
					</h3>
					<div class="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
						{start} - {end || 'Present'}
					</div>
				</div>
				{#if title}
					<div class="font-sans text-xs">{title}</div>
				{/if}
				{#if subtitle}
					<div class="font-sans text-xs text-muted-foreground">{subtitle}</div>
				{/if}
			</div>
			{#if description}
				{#if isExpanded}
					<div
						class="mt-2 text-xs sm:text-sm"
						transition:slide={{
							duration: 700,
							easing: quartOut
						}}
					>
						{#if bullets.length > 1}
							<ul class="space-y-1.5 text-muted-foreground">
								{#each bullets as bullet}
									<li class="flex items-start gap-2 leading-relaxed">
										<span class="select-none text-muted-foreground/70 font-mono">—</span>
										<span class="flex-1">{bullet.replace(/^[•\-\*–—]\s*/, '')}</span>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="leading-relaxed text-muted-foreground">{description}</p>
						{/if}
					</div>
				{/if}
			{/if}
		</div>
	</div>
</a>
