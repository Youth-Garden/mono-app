<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import { closeModal } from '$lib/stores/modalStore';

	export let isActive: boolean = true;
	export let className: string = '';

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}
</script>

<div
	class="fixed inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-auto cursor-pointer"
	style="z-index: {isActive ? 100 : 98};"
	on:click={handleBackdropClick}
	role="presentation"
>
	<div
		class="relative origin-center select-text cursor-default {className}"
		in:scale={{ duration: 220, start: 0.9, opacity: 0, easing: cubicOut }}
		out:fade={{ duration: 180 }}
		on:click|stopPropagation
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<slot />
	</div>
</div>
