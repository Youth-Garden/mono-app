<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let isActive: boolean = true;
	export let className: string = '';
</script>

<div
	class="fixed inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none select-none"
	style="z-index: {isActive ? 100 : 98};"
>
	<div
		class="relative pointer-events-auto cursor-default origin-center {className}"
		in:scale={{ duration: 220, start: 0.9, opacity: 0, easing: cubicOut }}
		out:fade={{ duration: 180 }}
		on:click|stopPropagation
		on:keydown|stopPropagation
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<slot />
	</div>
</div>
