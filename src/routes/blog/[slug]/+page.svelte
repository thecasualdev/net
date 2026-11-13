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
    <meta name="description" content={data.meta.description} />
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
        gap: 0.5rem;
        justify-content: space-between;
    }

    .copy-link {
        align-self: flex-end;
        display: flex;
        /* margin-top: auto; */
        /* border: 2px dotted #92caf5; */
    }
    .copy-text {
        color: #f3f4f7;
        padding: 8px 5px;
        border: 2px dashed #92caf5;
        border-right: none;
    }
    .copy-button {
        all: unset;
        color: #f3f4f7;
        cursor: pointer;
        padding: 0px 5px;
        border: 2px solid #92caf5;
        border-radius: 0px 8px 8px 0px;
        /* border-left: none; */
    }

    .copy-text p {
        margin: 0;
    }
</style>
