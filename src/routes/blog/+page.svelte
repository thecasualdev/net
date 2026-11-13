<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    const getYear = $derived.by(() => {
        const groups = new Map<string, typeof data.posts>();

        for (const post of data.posts) {
            const year = String(post.date).slice(0, 4);
            if (!groups.has(year)) groups.set(year, []);
            groups.get(year)!.push(post);
        }

        return [...groups];
    });
</script>

<svelte:head>
    <title>~ blog</title>
</svelte:head>

<div class="main">
    <!-- <h1>the super casual blog</h1> -->
    <p>
        Welcome to my super casual blog, <a href="/rss.xml" class="rss"
            >Subscribe via RSS</a
        >
    </p>

    <div>
        {#if data.posts.length}
            {#each getYear as [year, posts] (year)}
                <div>
                    <h2>{year}</h2>
                    <ul>
                        {#each posts as post (post.slug)}
                            <li class="post">
                                <a href="/blog/{post.slug}"
                                    ><p>{post.title}</p></a
                                >
                                <p>, <i>{post.description ?? ""}</i></p>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        {:else}
            <p>no posts</p>
        {/if}
    </div>
</div>

<style>
    .post {
        display: flex;
    }
    .rss {
        color: #fb914a;
    }
</style>
