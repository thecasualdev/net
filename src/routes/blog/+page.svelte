<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
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
            <ul class="posts">
                {#each data.posts as post (post.slug)}
                    <li class="post">
                        <a href="/blog/{post.slug}"><p>{post.title}</p></a>
                        <p><i>, {post.description}</i></p>
                    </li>
                {/each}
            </ul>
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
