import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
  formatPostDate,
} from "@/lib/posts";
import { business } from "@/lib/content";
import {
  JsonLd,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
} from "@/lib/schema";
import { PostBody } from "@/components/PostBody";
import { PhoneCTA } from "@/components/PhoneCTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const hasFaq = Boolean(post.faq && post.faq.length > 0);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd data={buildBlogPostingSchema(post)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "홈", url: "/" },
          { name: "블로그", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      {hasFaq && <JsonLd data={buildFaqPageSchema(post.faq!)} />}

      <nav className="text-xs text-foreground-muted">
        <Link href="/" className="hover:text-accent">
          홈
        </Link>
        <span className="mx-1.5" aria-hidden>
          ›
        </span>
        <Link href="/blog" className="hover:text-accent">
          블로그
        </Link>
      </nav>

      <p className="mt-6 text-xs font-semibold tracking-[0.25em] uppercase text-accent">
        {post.targetQuery}
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight text-foreground">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-muted">
        <span className="font-semibold text-foreground">{business.name}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.publishedAt}>
          {formatPostDate(post.publishedAt)} 작성
        </time>
        {post.updatedAt && (
          <>
            <span aria-hidden>·</span>
            <time dateTime={post.updatedAt}>
              {formatPostDate(post.updatedAt)} 수정
            </time>
          </>
        )}
        <span aria-hidden>·</span>
        <span>{post.readingMinutes}분 읽기</span>
      </div>

      <PostBody blocks={post.body} />

      {hasFaq && (
        <section className="mt-12">
          <h2 className="font-serif-kr text-xl md:text-2xl font-bold text-foreground">
            자주 묻는 질문
          </h2>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {post.faq!.map((item) => (
              <details key={item.question} className="group py-4" open>
                <summary className="cursor-pointer list-none font-serif-kr font-semibold text-foreground">
                  Q. {item.question}
                </summary>
                <p className="mt-2 leading-relaxed text-foreground-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 space-y-1 rounded-lg border border-border bg-background-alt p-6 text-sm text-foreground-muted">
        <p className="font-serif-kr text-base font-semibold text-foreground">
          {business.name}
        </p>
        <p>
          {business.category} · {business.yearsInOperation}년 전통
        </p>
        <p>{business.address.full}</p>
        <p>
          전화{" "}
          <a href={business.phoneHref} className="hover:text-accent">
            {business.phone}
          </a>{" "}
          · 영업 {business.openingTime}~{business.closingTime}
        </p>
      </section>

      <div className="mt-8">
        <PhoneCTA label={`석촌 예약·문의 전화하기 (${business.phone})`} />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-foreground-muted">
        이 글에 적힌 가격·영업시간·예약 조건은 변동될 수 있습니다. 방문 전 석촌(
        {business.phone})으로 확인하시기 바랍니다.
      </p>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif-kr text-lg font-bold text-foreground">
            함께 읽으면 좋은 글
          </h2>
          <ul className="mt-3 space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="text-accent hover:text-accent-hover"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
