<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import ImageModal from '$lib/components/ui/ImageModal.svelte';
	import ProjectDetailModal from '$lib/components/ui/ProjectDetailModal.svelte';
	import '../app.css';
	import { ModeWatcher, setMode } from 'mode-watcher';

	setMode('dark');

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
</script>

<ModeWatcher />
<ImageModal />
<ProjectDetailModal />
<div class="relative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24">
	<slot></slot>
	<Navbar />
</div>
