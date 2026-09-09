import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Tv, Star, CookingPot, type LucideIcon } from "lucide-react";
import { business, menus, faqs, trustSignals } from "@/lib/content";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { PhoneCTA } from "@/components/PhoneCTA";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { MapEmbed } from "@/components/MapEmbed";
import { BlogCard, type BlogCardData } from "@/components/BlogCard";
import {
  JsonLd,
  buildRestaurantSchema,
  buildFaqPageSchema,
} from "@/lib/schema";

const won = (value: number) => `${value.toLocaleString("ko-KR")}원`;

const FEATURED_SLUGS = [
  "hanbang-baeksuk",
  "nurungji-baeksuk",
  "jeonbok-nurungji-baeksuk",
];

export default function Home() {
  const homeFaqs = faqs.filter((faq) => faq.onHomepage);
  const latestCards: BlogCardData[] = getAllPosts()
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      dateLabel: formatPostDate(post.publishedAt),
      publishedAt: post.publishedAt,
      readingMinutes: post.readingMinutes,
      targetQuery: post.targetQuery,
      thumbnail: post.thumbnail,
    }));
  const featured = menus.filter((menu) => FEATURED_SLUGS.includes(menu.slug));

  return (
    <>
      <JsonLd data={buildRestaurantSchema()} />
      <JsonLd data={buildFaqPageSchema(homeFaqs)} />

      {/* Hero */}
      <section className="relative flex h-[86vh] min-h-[520px] items-end overflow-hidden">
        <video
          className="hero-media absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/store-exterior.webp"
          aria-label="석촌의 백숙이 끓고 있는 영상"
        >
          <source src="/videos/baeksuk-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16">
          <p
            className="hero-rise text-xs tracking-[0.3em] text-white/70 uppercase md:text-sm"
            style={{ animationDelay: "0s" }}
          >
            Since {business.foundedYearApprox}
          </p>
          <h1 className="hero-title mt-4 font-serif-kr text-4xl leading-[1.25] font-bold text-balance text-white md:text-5xl">
            남한산성 {business.yearsInOperation}년 전통<br />
            백숙 전문점 {business.name}
          </h1>
          <p
            className="hero-rise mt-5 max-w-xl text-base text-white/80 md:text-lg"
            style={{ animationDelay: "0.55s" }}
          >
            20년간 직접 개발한 한방백숙·누룽지백숙, 농림축산식품부 안심식당, KBS
            방송 2회. 실내·야외 각 100석으로 단체도 받습니다.
          </p>
          <div
            className="hero-rise mt-8 flex flex-wrap gap-4"
            style={{ animationDelay: "0.75s" }}
          >
            <PhoneCTA />
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              메뉴·가격 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 여장(성가퀴) — 성벽 위 낮은 담 */}
      <div className="wall-crest" aria-hidden="true" />

      {/* 숫자 스트립 — 화강암 현판 */}
      <section className="bg-stone">
        <dl
          data-reveal-stagger
          className="mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-4"
        >
          {[
            { n: `${business.yearsInOperation}년`, l: "한자리에서 운영" },
            {
              n: `${business.reviewCount.toLocaleString("ko-KR")}개`,
              l: `${business.reviewSource} 리뷰`,
            },
            { n: "2회", l: "KBS 방송 출연" },
            { n: "200명", l: "실내·야외 단체 수용" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="border-t border-stone-foreground/15 px-4 py-8 text-center first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0"
            >
              <dt
                data-countup
                className="font-serif-kr text-2xl font-bold text-stone-foreground md:text-3xl"
              >
                {stat.n}
              </dt>
              <dd className="mt-1 text-xs text-stone-foreground/70 md:text-sm">
                {stat.l}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 대표 메뉴 + 가격 */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <SectionHeading eyebrow="Menu" title="석촌 대표 메뉴와 가격" />
        <p data-reveal className="mt-3 max-w-2xl text-foreground-muted">
          <span className="text-gold">★</span> 표시는 석촌의 대표 백숙입니다. 이
          중 한방백숙과 누룽지백숙은 석촌이 20년간 직접 개발해 이어온 메뉴입니다.
          백숙류는 한 마리 기준으로 보통 2~4인이 함께 먹습니다.
        </p>

        <div data-reveal-stagger className="mt-10 grid gap-6 sm:grid-cols-3">
          {featured.map((menu) => (
            <article
              key={menu.slug}
              className="rounded-lg border border-border bg-background-alt p-5"
            >
              {menu.photo ? (
                <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={menu.photo}
                    alt={`${menu.name} 사진`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
              ) : (
                <ImagePlaceholder
                  alt={`${menu.name} 사진 (준비 중)`}
                  className="mb-4"
                />
              )}
              <h3 className="font-serif-kr text-lg font-semibold text-foreground">
                {menu.name}
                {menu.signature && (
                  <span className="ml-1.5 text-gold" title="석촌 대표 백숙">
                    ★
                  </span>
                )}
                {menu.developedInHouse && (
                  <span className="ml-2 align-middle text-xs font-normal text-foreground-muted">
                    직접 개발
                  </span>
                )}
              </h3>
              <p className="mt-1 font-serif-kr text-xl font-bold text-accent">
                {won(menu.price)}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {menu.description}
              </p>
            </article>
          ))}
        </div>

        <div
          data-reveal
          className="mt-10 overflow-x-auto rounded-lg border border-border"
        >
          <table className="w-full border-collapse text-sm">
            <tbody>
              {menus.map((menu) => (
                <tr
                  key={menu.slug}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 text-foreground">
                    {menu.name}
                    {menu.signature && (
                      <span className="ml-1.5 text-gold" title="석촌 대표 백숙">
                        ★
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap text-foreground-muted">
                    {won(menu.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-foreground-muted">
          백숙류는 한 마리 기준입니다. 전복한방삼계탕은 1인 20,000원이며, 가격은
          변동될 수 있습니다.
        </p>

        <div
          data-reveal
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          <Link href="/menu" className="text-accent hover:text-accent-hover">
            전체 메뉴 보기 →
          </Link>
          <Link
            href="/blog/namhansanseong-baeksuk-gagyeok"
            className="text-accent hover:text-accent-hover"
          >
            인원별 가격·예산표 →
          </Link>
        </div>
      </section>

      {/* 왜 석촌인가 */}
      <section className="border-y border-border bg-background-alt">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <SectionHeading
            eyebrow="Why"
            title="남한산성 백숙 전문점 석촌을 고르는 이유"
          />
          <div data-reveal-stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            <TrustCard
              icon={BadgeCheck}
              title="농림축산식품부 공식 인증 안심식당"
            >
              {trustSignals.certification.description}
            </TrustCard>
            <TrustCard icon={Tv} title="KBS 방송 출연 2회">
              {trustSignals.broadcasts[0].description}{" "}
              {trustSignals.broadcasts[1].description}
            </TrustCard>
            <TrustCard
              icon={Star}
              title={`${business.reviewSource} 리뷰 ${business.reviewCount.toLocaleString(
                "ko-KR",
              )}개`}
            >
              {business.reviewCountYear}년 기준으로 남한산성 인근 백숙 전문점 중
              최다 수준입니다.{" "}
              <a
                href={business.naverPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                네이버 플레이스에서 보기 →
              </a>
            </TrustCard>
            <TrustCard
              icon={CookingPot}
              title="직접 개발한 한방백숙·누룽지백숙"
            >
              20년간 이어온 석촌만의 조리법입니다. 백숙 육수에 누룽지를 더해
              죽으로 마무리하는 누룽지백숙은 남한산성 인근에서도 흔치 않은
              구성입니다.
            </TrustCard>
          </div>
        </div>
      </section>

      {/* 단체·대형 예약 */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <SectionHeading eyebrow="Group" title="남한산성 단체·회식·대형 예약" />
        <div data-reveal className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border">
            <Image
              src="/images/group-terrace.webp"
              alt="석촌 야외 테라스 단체석 — 긴 원목 테이블이 창가를 따라 늘어선 실내 단체 좌석"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <ul className="space-y-3 text-foreground-muted">
            {[
              ["수용 규모", "실내 100석 + 야외 테라스 100석, 한 번에 최대 200명"],
              ["좌석", "전 좌석 좌식"],
              ["결제", "카드·무선 결제 — 테이블별 나눠 계산 가능"],
              ["주차", "승용차 20대 (대형버스 주차는 어렵습니다)"],
              ["예약", "전화로 최소 1주일 전, 날짜·인원·메뉴 미리 전달"],
            ].map(([key, value]) => (
              <li key={key} className="flex gap-3">
                <span className="w-16 shrink-0 font-medium text-foreground">
                  {key}
                </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          data-reveal
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <PhoneCTA label={`단체 예약 문의 (${business.phone})`} />
          <Link href="/group" className="text-sm text-accent hover:text-accent-hover">
            단체·대형 예약 안내 자세히 →
          </Link>
        </div>
      </section>

      {/* 후기 */}
      <section className="border-y border-border bg-background-alt">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <SectionHeading eyebrow="Reviews" title="석촌 방문 후기" />
          <p data-reveal className="mt-3 max-w-2xl text-foreground-muted">
            석촌은 {business.reviewSource} 기준 방문자 리뷰{" "}
            {business.reviewCount.toLocaleString("ko-KR")}개(
            {business.reviewCountYear}년 기준)로 남한산성 인근 백숙 전문점 중 최다
            수준입니다. 실제 방문 후기는 네이버 플레이스에서 확인하실 수 있습니다.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={business.naverPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              네이버 플레이스 리뷰 {business.reviewCount.toLocaleString("ko-KR")}개
              보기 →
            </a>
            <Link
              href="/media"
              className="text-sm text-accent hover:text-accent-hover"
            >
              KBS 방송·안심식당 인증 이력 →
            </Link>
          </div>
        </div>
      </section>

      {/* 블로그 */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Blog" title="남한산성 백숙 이야기" />
          <Link
            href="/blog"
            className="text-sm whitespace-nowrap text-accent hover:text-accent-hover"
          >
            블로그 전체 보기 →
          </Link>
        </div>
        <ul
          data-reveal-stagger
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {latestCards.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-background-alt">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="FAQ"
              title="남한산성 백숙 자주 묻는 질문"
            />
            <Link
              href="/faq"
              className="text-sm whitespace-nowrap text-accent hover:text-accent-hover"
            >
              전체 보기 →
            </Link>
          </div>
          <div
            data-reveal
            className="mt-8 divide-y divide-border border-y border-border"
          >
            {homeFaqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none font-serif-kr font-semibold text-foreground">
                  Q. {faq.question}
                </summary>
                <p className="mt-2 text-foreground-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 + CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <SectionHeading eyebrow="Location" title="남한산성 석촌 오시는 길" />
        <div data-reveal className="mt-8 grid gap-8 md:grid-cols-2">
          <MapEmbed className="h-[320px] md:h-[420px]" />
          <div>
            <dl className="grid gap-5 text-foreground-muted sm:grid-cols-2 md:grid-cols-1">
              <div>
                <dt className="font-medium text-foreground">주소</dt>
                <dd>
                  {business.address.full} (우 {business.address.postalCode})
                </dd>
                <dd className="mt-1 text-sm">남한산성 로타리에서 북문 방향</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">전화</dt>
                <dd>
                  <a href={business.phoneHref} className="hover:text-accent">
                    {business.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">영업시간</dt>
                <dd>
                  매일 {business.openingTime} ~ {business.closingTime} ·{" "}
                  {business.facilities.waitTime}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">주차·좌석</dt>
                <dd>
                  승용차 {business.parking.capacity}대 ·{" "}
                  {business.facilities.seatingStyle}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <PhoneCTA />
              <a
                href={business.naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent-hover"
              >
                네이버 지도에서 보기 →
              </a>
              <Link
                href="/location"
                className="text-sm text-accent hover:text-accent-hover"
              >
                오시는 길 자세히 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div data-reveal>
      <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.25em] text-foreground-muted uppercase">
        <span aria-hidden className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
        {title}
      </h2>
    </div>
  );
}

function TrustCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine/10 text-pine">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif-kr text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm text-foreground-muted">{children}</p>
    </div>
  );
}
