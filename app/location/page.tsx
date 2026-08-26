import type { Metadata } from "next";
import { business } from "@/lib/content";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
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
        <ImagePlaceholder
          alt="석촌 위치 지도 이미지 (준비 중)"
          caption="지도 이미지는 추후 업데이트 예정입니다."
          aspect="aspect-square"
        />

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
              전화 예약을 권장합니다. 예약은 전화로만 받습니다.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">야외 좌석</dt>
            <dd>
              {business.facilities.outdoorSeating.capacity}석 규모의 야외 테라스 좌석을
              갖추고 있습니다.
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
              화장실은 남녀로 구분되어 있으며, 무선 결제를 지원합니다.
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
