// Credit to sveltekit.io
// https://sveltekit.io/blog/svelte-sitemaps

import { SITE_URL } from '#lib/site.js';
import { getPosts } from '#lib/posts.js';

const pages: string[] = ['/', '/blog', '/about']; // populate this with all the slugs you wish to include
const posts = getPosts();

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const body = sitemap(pages);
    const response = new Response(body);
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
    response.headers.set('Content-Type', 'application/xml');
    return response;
}

const sitemap = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
    ${pages
        .map(
            (page) => `
    <url>
        <loc>${new URL(page, SITE_URL).href}</loc>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>
    `
        )
        .join('')}
    
    ${posts
        .map((post) => `
    <url>
        <loc>${new URL(`/blog/${post.slug}`, SITE_URL).href}</loc>
        <lastmod>${post.updated ?? post.date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>`)
    }

</urlset>`;