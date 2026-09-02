import type { Metadata } from "next";
import { business } from "@/lib/content";
import { MapEmbed } from "@/components/MapEmbed";
import { PhoneCTA } from "@/components/PhoneCTA";

export const metadata: Metadata = {
  title: "오시는 길",
  description:
    "석촌 오시는 길 안내. 경기 광주시 남한산성면 남한산성로780번길 33, 주차 20대 가능, 남한산성 로타리에서 북문 방향.",
  alternates: {
    canonical: "/location",
  },
};

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent">Visit</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">오시는 길</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <MapEmbed className="h-[380px]" />
          <a
            href={business.naverPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-accent hover:text-accent-hover"
          >
            네이버 지도에서 보기 →
          </a>
        </div>

        <dl className="space-y-6 text-foreground-muted">
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
            <dd>
              {business.openingTime} ~ {business.closingTime}, {business.facilities.waitTime}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">주차 안내</dt>
            <dd>
              {business.parking.capacity}대 수용 가능합니다. {business.parking.note}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">예약 및 단체 이용</dt>
            <dd>
              하루 최대 {business.capacity.maxDailyReservations}명까지 예약을 받고 있으며,
              단체 이용이 가능합니다. 단체 예약은 {business.capacity.groupReservationLeadTime}{" "}
              전화 예약을 권장합니다. 예약은 전화로 받습니다.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">좌석</dt>
            <dd>
              실내 약 {business.capacity.indoorSeats}석, 야외 테라스 약{" "}
              {business.capacity.outdoorSeats}석으로 한 번에 최대{" "}
              {business.capacity.maxGroupAtOnce}명까지 이용할 수 있습니다. 전 좌석 좌식입니다.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">휠체어 접근성</dt>
            <dd>{business.facilities.accessibility.note}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">식이 제한 안내</dt>
            <dd>{business.facilities.dietaryOptions.note}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">편의 시설</dt>
            <dd>
              화장실은 남녀로 구분되어 있으며, 카드·무선 결제를 지원합니다.
              승용차 주차는 20대까지 가능하며 대형버스 주차는 어렵습니다.
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-12">
        <PhoneCTA />
      </div>
    </div>
  );
}
