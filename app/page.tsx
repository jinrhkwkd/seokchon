import Link from "next/link";
import { business, menus, trustSignals } from "@/lib/content";
import { PhoneCTA } from "@/components/PhoneCTA";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { JsonLd, buildRestaurantSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={buildRestaurantSchema()} />

      {/* Hero */}
      <section className="border-b border-border bg-background-alt">
        <div className="mx-auto max-w-5xl px-4 py-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              남한산성 {business.yearsInOperation}년 전통 백숙 전문점, {business.name}
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              {business.name}은 경기 광주시 남한산성면에서 {business.yearsInOperation}년간
              백숙·삼계탕을 전문으로 운영해온 한정식집입니다. 농림축산식품부 공식 인증
              안심식당이며, KBS 방송에 두 차례 소개되었습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PhoneCTA />
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 font-medium text-foreground hover:bg-background transition-colors"
              >
                메뉴 보기
              </Link>
            </div>
          </div>
          <ImagePlaceholder
            alt="석촌 매장 전경 사진 (준비 중)"
            caption="실제 매장 사진은 추후 업데이트 예정입니다."
          />
        </div>
      </section>

      {/* 신뢰 신호 */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">
          숫자와 기록으로 확인하는 석촌
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">대표 메뉴</h2>
            <Link href="/menu" className="text-sm text-accent hover:text-accent-hover">
              전체 메뉴 보기 →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {menus.map((menu) => (
              <div
                key={menu.slug}
                className="rounded-lg border border-border bg-background p-5"
              >
                <h3 className="font-serif-kr text-lg font-semibold text-foreground">
                  {menu.name}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">{menu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAP 정보 */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">오시는 정보</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-foreground-muted">
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
            <dt className="font-medium text-foreground">영업 종료</dt>
            <dd>{business.closingTime}</dd>
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

function TrustCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <h3 className="font-serif-kr text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{children}</p>
    </div>
  );
}
