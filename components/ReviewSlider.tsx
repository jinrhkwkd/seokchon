"use client";

import { useRef } from "react";
import { reviews } from "@/lib/content";

export function ReviewSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="이전 후기"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="다음 후기"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
        >
          →
        </button>
      </div>

      <div
        ref={trackRef}
        className="mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <a
            key={review.url}
            data-review-card
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[82%] shrink-0 snap-start flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <p className="text-xs text-foreground-muted">
              {review.blogId} · 네이버 블로그
            </p>
            <p className="mt-2 font-serif-kr font-semibold text-foreground">
              {review.title ?? "석촌 방문 후기"}
            </p>
            <p className="mt-2 line-clamp-4 flex-1 text-sm text-foreground-muted">
              {review.excerpt ??
                "네이버 블로그에 올라온 석촌 방문 후기입니다. 전체 내용은 블로그에서 확인할 수 있습니다."}
            </p>
            <span className="mt-4 inline-block text-sm text-accent group-hover:text-accent-hover">
              블로그에서 보기 →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
