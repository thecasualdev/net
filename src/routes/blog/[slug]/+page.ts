import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad, EntryGenerator } from './$types';

type Post = {
    default: Component;
    metadata: {
        title: string;
        date: string;
        description: string;
        updated?: string;
        image?: string;
        tags?: string[];
        color?: string;
        [key: string]: unknown
    };
};

const posts = import.meta.glob<Post>('/blog/*.svx', { eager: true });

export const prerender = true;

export const entries: EntryGenerator = () =>
    Object.keys(posts).map((path) => ({
        slug: path.replace('/blog/', '').replace('.svx', '')
    }));

export const load: PageLoad = ({ params }) => {
    const post = posts[`/blog/${params.slug}.svx`];

    if (!post) error(404, 'Post not found');

    return {
        content: post.default,
        meta: post.metadata
    };
};
