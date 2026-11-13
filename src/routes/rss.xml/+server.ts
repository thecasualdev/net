import { getPosts } from "#lib/posts.ts"
import { SITE_URL } from "#lib/site.ts"

export const prerender = true;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET() {

    const items = getPosts().map(
        (post) => {
            const link = new URL(`/blog/${post.slug}`, SITE_URL).href;
            return `
            <item>
                <title>${esc(post.title)}</title>
                <link>${link}</link>
                <guid>${link}</guid>
                <description>${esc(post.description ?? '')}</description>
                <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            </item>`;
        }
    ).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>thecasualdev blog</title>
            <link>${SITE_URL}</link>
            <description>some super casual blog posts</description>${items}
        </channel>
    </rss>`;


    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml' } });
}
