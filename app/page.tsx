import Link from "next/link";
import { business, menus, trustSignals } from "@/lib/content";
import { PhoneCTA } from "@/components/PhoneCTA";
import { JsonLd, buildRestaurantSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={buildRestaurantSchema()} />

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
            농림축산식품부 공식 인증 안심식당이며, KBS 방송에 두 차례 소개된
            남한산성 백숙 전문 한정식집입니다.
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
              메뉴 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 신뢰 신호 */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <SectionHeading eyebrow="Trust" title="숫자와 기록으로 확인하는 석촌" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <TrustCard title="농림축산식품부 공식 인증 안심식당">
            {trustSignals.certification.description}
          </TrustCard>
          <TrustCard title="KBS 방송 출연 2회">
            {trustSignals.broadcasts[0].description} {trustSignals.broadcasts[1].description}
          </TrustCard>
          <TrustCard title={`네이버 플레이스 리뷰 ${business.reviewCount}개`}>
            {business.reviewSource} 기준 리뷰 {business.reviewCount}개({business.reviewCountYear}년
            기준)로, 남한산성 인근 백숙 전문점 중 최다 수준입니다.
          </TrustCard>
          <TrustCard title={`${business.yearsInOperation}년 전통`}>
            {business.foundedYearApprox}년 무렵부터 {business.yearsInOperation}년간 남한산성에서
            운영해온 백숙 전문점입니다.
          </TrustCard>
        </div>
      </section>

      {/* 대표 메뉴 요약 */}
      <section className="bg-background-alt border-y border-border">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Menu" title="대표 메뉴" />
            <Link
              href="/menu"
              className="text-sm text-accent hover:text-accent-hover whitespace-nowrap"
            >
              전체 메뉴 보기 →
            </Link>
          </div>
          <ul className="mt-10 divide-y divide-border">
            {menus.map((menu) => (
              <li key={menu.slug} className="flex items-baseline justify-between gap-6 py-5">
                <div>
                  <h3 className="font-serif-kr text-lg font-semibold text-foreground">
                    {menu.name}
                    {menu.developedInHouse && (
                      <span className="ml-2 text-gold align-middle" title="석촌 직접 개발">
                        ★
                      </span>
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm text-foreground-muted max-w-2xl">
                    {menu.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NAP 정보 */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <SectionHeading eyebrow="Visit" title="오시는 정보" />
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 text-foreground-muted">
          <div>
            <dt className="font-medium text-foreground">주소</dt>
            <dd>{business.address.full}</dd>
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
            <dd>{business.openingTime} ~ {business.closingTime}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">주차</dt>
            <dd>
              {business.parking.capacity}대 수용 · {business.parking.note}
            </dd>
          </div>
        </dl>
        <Link
          href="/location"
          className="mt-6 inline-block text-sm text-accent hover:text-accent-hover"
        >
          오시는 길 자세히 보기 →
        </Link>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
  );
}

function TrustCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <h3 className="font-serif-kr text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{children}</p>
    </div>
  );
}
