<script lang="ts">
	import favicon from "#lib/assets/favicon.svg";
	import Header from "#lib/components/header.svelte";
	import Footer from "#lib/components/footer.svelte";
	import type { LayoutProps } from "./$types";

	import "#lib/styles/main.css";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<title>~</title>
</svelte:head>

<div><Header /></div>
<main class="page">
	{@render children()}
</main>
<div><Footer /></div>
