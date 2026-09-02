import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { JsonLd, buildBlogListingSchema } from "@/lib/schema";

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd data={buildBlogListingSchema(posts)} />

      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent">Blog</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">석촌 블로그</h1>
      <p className="mt-4 text-foreground-muted">
        남한산성에서 백숙 한 그릇 하기 좋은 상황과 메뉴 이야기를 석촌이 직접 정리합니다.
      </p>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <article key={post.slug} className="py-6">
            <div className="flex items-center gap-3 text-xs text-foreground-muted">
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes}분 읽기</span>
            </div>
            <h2 className="mt-2 font-serif-kr text-xl font-semibold text-foreground">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-accent"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {post.description}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-sm text-accent hover:text-accent-hover"
            >
              읽어보기 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
