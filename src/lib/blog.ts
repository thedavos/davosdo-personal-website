import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

const WORDS_PER_MINUTE = 200;

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
	return [...posts].sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export function getReadingTime(body: string): { minutes: number; label: string } {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
	return { minutes, label: `${minutes} min` };
}

export function getPostUrl(post: BlogPost): string {
	return `/blog/${post.id}/`;
}

export function enrichPost(post: BlogPost) {
	const readingTime = getReadingTime(post.body ?? "");
	return {
		post,
		readingTimeLabel: readingTime.label,
		url: getPostUrl(post),
	};
}

export function enrichPosts(posts: BlogPost[]) {
	return posts.map(enrichPost);
}
