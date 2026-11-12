<script lang="ts">
    import type { PageProps } from "./$types";
    import { SITE_URL } from "#lib/site.ts";
    import { page } from "$app/state";

    let { data }: PageProps = $props();

    const url = $derived(new URL(page.url.pathname, SITE_URL).href);
</script>

<svelte:head>
    <title>~ blog / {data.meta.title}</title>
    <link rel="canonical" href={url} />

    <!-- META TAGS (FUCK ME) -->

    <meta name="fediverse:creator" content="@thecasualdev@mastodon.social" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
    <meta property="og:description" content={data.meta.description} />
    <meta property="og:url" content={url} />

    <meta property="article:published_time" content={data.meta.date} />

    {#if data.meta.updated}
        <meta property="article:modified_time" content={data.meta.updated} />
    {/if}

    {#each data.meta.tags as tag}
        <meta property="article:tag" content={tag} />
    {/each}

    {#if data.meta.color}
        <meta name="theme-color" content={data.meta.color} />
    {/if}
</svelte:head>

<article class="main">
    <data.content />
</article>
