import Image from "next/image";
import Link from "next/link";
import { RoofMark } from "./RoofMark";

export type BlogCardData = {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
  publishedAt: string;
  readingMinutes: number;
  targetQuery: string;
  thumbnail?: string;
};

export function BlogCard({ post }: { post: BlogCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-colors hover:border-accent"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background-alt">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 78vw"
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
            <RoofMark className="h-9 w-14 text-border" />
            <span className="text-xs tracking-wide text-foreground-muted/70">
              {post.targetQuery}
            </span>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold tracking-wide text-accent">
          {post.targetQuery}
        </p>
        <h3 className="mt-1.5 line-clamp-2 font-serif-kr text-base leading-snug font-semibold text-foreground group-hover:text-accent">
          {post.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-foreground-muted">
          <time dateTime={post.publishedAt}>{post.dateLabel}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes}분 읽기</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground-muted">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
