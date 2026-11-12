export type PostMeta = {
    title: string;
    date: string;
    description: string;
    updated?: string;
    image?: string;
    tags?: string[];
    color?: string;
    [key: string]: unknown
}

export type PostSumary = PostMeta & { slug: string }

const modules = import.meta.glob<PostMeta>('/blog/*.svx', { eager: true, import: 'metadata' })

export function getPosts(): PostSumary[] {
    return Object.entries(modules).map(([path, meta]) => ({
        ...meta,
        slug: path.replace('/blog/', '').replace('.svx', '')
    })).sort((a, b) => b.date.localeCompare(a.date))
}
