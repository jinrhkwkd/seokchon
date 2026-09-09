import type { Metadata } from "next";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { JsonLd, buildBlogListingSchema } from "@/lib/schema";
import { BlogCardGrid, type BlogCardData } from "@/components/BlogCardGrid";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "남한산성 백숙·삼계탕, 등산 후 식사, 단체 회식, 메뉴 이야기까지 — 남한산성면에서 20년간 백숙을 해온 석촌이 직접 정리한 안내 글 모음.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const cards: BlogCardData[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    dateLabel: formatPostDate(post.publishedAt),
    publishedAt: post.publishedAt,
    readingMinutes: post.readingMinutes,
    targetQuery: post.targetQuery,
    thumbnail: post.thumbnail,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <JsonLd data={buildBlogListingSchema(posts)} />

      <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.25em] text-foreground-muted uppercase">
        <span aria-hidden className="h-px w-6 bg-accent" />
        Blog
      </p>
      <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
        석촌 블로그
      </h1>
      <p className="mt-4 max-w-2xl text-foreground-muted">
        남한산성에서 백숙 한 그릇 하기 좋은 상황과 메뉴 이야기를 석촌이 직접
        정리합니다.
      </p>

      <div className="mt-10">
        <BlogCardGrid posts={cards} />
      </div>
    </div>
  );
}
