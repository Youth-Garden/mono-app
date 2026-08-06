<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';

	async function handleToggleTheme(event: MouseEvent) {
		const isSupported =
			typeof document !== 'undefined' &&
			'startViewTransition' in document &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!isSupported) {
			toggleMode();
			return;
		}

		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = event.clientX || rect.left + rect.width / 2;
		const y = event.clientY || rect.top + rect.height / 2;

		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y)
		);

		const isDark = document.documentElement.classList.contains('dark');

		const transition = (document as any).startViewTransition(() => {
			toggleMode();
			if (isDark) {
				document.documentElement.classList.remove('dark');
			} else {
				document.documentElement.classList.add('dark');
			}
		});

		await transition.ready;

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${endRadius}px at ${x}px ${y}px)`
				]
			},
			{
				duration: 500,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)'
			}
		);
	}
</script>

<Button on:click={handleToggleTheme} variant="ghost" size="icon" class="rounded-full">
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>