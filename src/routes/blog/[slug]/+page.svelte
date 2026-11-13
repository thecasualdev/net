<script lang="ts">
    import type { PageProps } from "./$types";
    import { SITE_URL } from "#lib/site.ts";
    import { page } from "$app/state";

    let { data }: PageProps = $props();

    const url = $derived(new URL(page.url.pathname, SITE_URL).href);
    const short_url = $derived(`https://thecasual.dev/b/${page.params.slug}`);

    async function copyLink() {
        await navigator.clipboard.writeText(short_url);
    }
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

<div class="main">
    <article>
        <data.content />
    </article>

    <div class="copy-link">
        <div class="copy-text"><p>{short_url}</p></div>
        <button class="copy-button" onclick={copyLink}>copy</button>
    </div>
</div>

<style>
    article :global(.heading-link) {
        color: inherit;
        text-decoration: none;
    }

    .main {
        gap: 3rem;
    }

    .copy-link {
        align-self: flex-start;
        display: flex;
        margin-top: auto;
        border: 4px solid #d1dde6;
        border-radius: 10px;
    }
    .copy-text {
        color: #f3f4f7;
        padding: 0px 5px;
        border-right: 2px solid #d1dde6;
    }
    .copy-button {
        all: unset;
        color: #f3f4f7;
        cursor: pointer;
        padding: 0px 5px;
    }
</style>
