import type { Metadata } from "next";
import Image from "next/image";
import { business, menus } from "@/lib/content";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PhoneCTA } from "@/components/PhoneCTA";

export const metadata: Metadata = {
  title: "메뉴 소개",
  description:
    "석촌의 대표 메뉴 6종 소개. 직접 개발한 한방백숙·누룽지백숙을 비롯해 전복누룽지백숙, 능이버섯백숙, 오리주물럭, 닭볶음탕을 판매합니다.",
  alternates: {
    canonical: "/menu",
  },
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent">Menu</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">메뉴 소개</h1>
      <p className="mt-4 text-foreground-muted max-w-2xl">
        석촌은 백숙·삼계탕을 중심으로 총 6종의 메뉴를 판매합니다. 이 중 한방백숙과
        누룽지백숙(<span className="text-gold">★</span> 표시)은 석촌이 직접 개발한 메뉴입니다.
        백숙류 메뉴는 평균 {business.avgCookingTimeMinutes}의 조리 시간이 소요됩니다.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {menus.map((menu) => (
          <article
            key={menu.slug}
            className="rounded-lg border border-border bg-background-alt p-6"
          >
            {menu.photo ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-5">
                <Image
                  src={menu.photo}
                  alt={`${menu.name} 사진`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            ) : (
              <ImagePlaceholder
                alt={`${menu.name} 사진 (준비 중)`}
                aspect="aspect-[4/3]"
                className="mb-5"
              />
            )}
            <h2 className="font-serif-kr text-xl font-semibold text-foreground">
              {menu.name}
              {menu.developedInHouse && (
                <span className="ml-2 text-gold" title="석촌 직접 개발">
                  ★
                </span>
              )}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
              {menu.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <PhoneCTA label="메뉴 문의 및 예약 전화하기" />
      </div>
    </div>
  );
}
