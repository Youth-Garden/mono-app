<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import ModalProvider from '$lib/components/ui/ModalProvider.svelte';
	import { modalStack } from '$lib/stores/modalStore';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let lenis: Lenis | null = null;

	onMount(() => {
		lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});

		function raf(time: number) {
			lenis?.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis?.destroy();
		};
	});

	$: if (typeof window !== 'undefined') {
		if ($modalStack.length > 0) {
			lenis?.stop();
			document.body.style.overflow = 'hidden';
		} else {
			lenis?.start();
			document.body.style.overflow = '';
		}
	}
</script>

<ModeWatcher defaultMode="dark" />
<ModalProvider />
<div class="relative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24">
	<slot></slot>
	<Navbar />
</div>
