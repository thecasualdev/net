<script lang="ts">
	import favicon from "#lib/assets/favicon.svg";
	import Header from "#lib/components/header.svelte";
	import Footer from "#lib/components/footer.svelte";
	import type { LayoutProps } from "./$types";

	import "#lib/styles/main.css";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>~</title>
	<link rel="icon" href={favicon} />
	<link rel="me" href="https://mastodon.social/@thecasualdev" />

	<!-- YAY MORE TAGS !!! I FUCKING HATE WEB DEV -->
	<meta property="og:site_name" content="thecasualdev.net" />
	<meta property="og:locale" content="en_AU" />
	<meta name="twitter:site" content="@_thecasualdev" />
	<meta name="author" content="thecasualdev" />
</svelte:head>

<div><Header /></div>
<main class="page">
	{@render children()}
</main>
<div><Footer /></div>
