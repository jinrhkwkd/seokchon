"use client";

import { useState } from "react";
import { BlogCard, type BlogCardData } from "./BlogCard";

export type { BlogCardData };

const PER_PAGE = 6;

export function BlogCardGrid({ posts }: { posts: BlogCardData[] }) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const go = (n: number) => {
    setPage(Math.min(Math.max(1, n), pageCount));
  };

  return (
    <div>
      {/*
        One list, two layouts:
        - < md: horizontal snap slider, every post (swipe through)
        - >= md: 2/3-column grid, only the current page's 6 shown (others md:hidden)
        Every card link stays in the DOM at all sizes for crawlers.
      */}
      <ul
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post, i) => {
          const onPage = i >= start && i < end;
          return (
            <li
              key={post.slug}
              className={`w-[78%] shrink-0 snap-start md:w-auto md:shrink ${
                onPage ? "" : "md:hidden"
              }`}
            >
              <BlogCard post={post} />
            </li>
          );
        })}
      </ul>

      {pageCount > 1 && (
        <nav
          className="mt-10 hidden items-center justify-center gap-1.5 md:flex"
          aria-label="블로그 페이지 이동"
        >
          <PageButton
            onClick={() => go(current - 1)}
            disabled={current === 1}
            label="이전 페이지"
          >
            ‹
          </PageButton>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => go(n)}
              aria-current={n === current ? "page" : undefined}
              className={`h-9 min-w-9 rounded-md border px-2 text-sm transition-colors ${
                n === current
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-foreground-muted hover:border-accent hover:text-accent"
              }`}
            >
              {n}
            </button>
          ))}
          <PageButton
            onClick={() => go(current + 1)}
            disabled={current === pageCount}
            label="다음 페이지"
          >
            ›
          </PageButton>
        </nav>
      )}
    </div>
  );
}

function PageButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground-muted"
    >
      {children}
    </button>
  );
}
