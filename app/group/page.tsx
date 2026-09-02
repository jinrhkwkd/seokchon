import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/content";
import { PhoneCTA } from "@/components/PhoneCTA";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "단체·대형 예약",
  description:
    "남한산성 석촌 단체·회식·대형 예약 안내. 실내 100석 + 야외 테라스 100석으로 한 번에 최대 200명, 전 좌석 좌식, 카드·무선 결제, 승용차 20대 주차. 최소 1주일 전 전화 예약.",
  alternates: {
    canonical: "/group",
  },
};

const groupFaqs = [
  {
    question: "남한산성에서 100명 넘는 단체도 예약할 수 있나요?",
    answer:
      "석촌은 실내 100석과 야외 테라스 100석을 갖추고 있어 한 번에 최대 200명까지 단체 예약을 받습니다. 100명 이상 대규모는 되도록 여유 있게 전화(031-749-9338)로 날짜와 인원을 확인해 주세요.",
  },
  {
    question: "단체석은 좌식인가요, 입식인가요?",
    answer: "석촌은 전 좌석이 좌식입니다. 좌식이 불편한 일행이 있으면 예약 시 미리 알려주세요.",
  },
  {
    question: "관광버스(대형버스)를 주차할 수 있나요?",
    answer:
      "승용차는 20대까지 자체 주차가 가능하지만, 대형버스 주차는 어렵습니다. 버스 단체는 예약 시 미리 문의해 주세요.",
  },
  {
    question: "단체도 테이블별로 나눠서 계산할 수 있나요?",
    answer:
      "카드·무선 결제가 가능해 여러 테이블로 나뉜 단체도 자리에서 바로 나눠 계산할 수 있습니다.",
  },
  {
    question: "단체 예약은 며칠 전에 해야 하나요?",
    answer:
      "10~30명 모임은 전화로 날짜와 인원을 미리 확인하고, 50명 이상은 최소 1주일 전, 100명 이상 대규모는 되도록 여유 있게 예약하시길 권장합니다.",
  },
];

export default function GroupPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "홈", url: "/" },
          { name: "단체·대형 예약", url: "/group" },
        ])}
      />
      <JsonLd data={buildFaqPageSchema(groupFaqs)} />

      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent">
        Group
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
        남한산성 단체·회식·대형 예약 안내
      </h1>

      <div className="mt-8 rounded-lg border-l-4 border-accent bg-background-alt px-5 py-4">
        <p className="font-serif-kr font-bold text-foreground">
          Q. 남한산성에서 100명 넘는 단체도 받는 곳이 있나요?
        </p>
        <p className="mt-2 leading-relaxed text-foreground-muted">
          <span className="font-semibold text-foreground">A. </span>
          석촌은 실내 100석과 야외 테라스 100석을 갖춰 한 번에 최대 200명까지 단체
          예약을 받습니다. 20년간 남한산성면에서 백숙·삼계탕을 전문으로 해왔고,
          농림축산식품부 안심식당 인증과 KBS 방송 2회 이력이 있습니다.
        </p>
      </div>

      <h2 className="mt-12 font-serif-kr text-xl md:text-2xl font-bold text-foreground">
        수용 규모
      </h2>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["실내 좌석", "약 100석 (전 좌석 좌식)"],
              ["야외 테라스", "약 100석"],
              ["한 번에 수용", "최대 200명"],
              ["결제", "카드·무선 결제 — 테이블별 나눠 계산 가능"],
              ["주차", "승용차 20대 · 대형버스 주차는 어려움"],
              [
                "영업시간",
                `매일 ${business.openingTime} ~ ${business.closingTime} · 별도 대기 없음`,
              ],
            ].map(([key, value]) => (
              <tr
                key={key}
                className="border-b border-border align-top last:border-0"
              >
                <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">
                  {key}
                </td>
                <td className="px-4 py-3 text-foreground-muted">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImagePlaceholder
        alt="석촌 단체석 (준비 중)"
        aspect="aspect-[16/9]"
        className="mt-8"
      />

      <h2 className="mt-12 font-serif-kr text-xl md:text-2xl font-bold text-foreground">
        인원별 예약 방법
      </h2>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-background-alt text-left">
              <th className="border-b border-border px-4 py-2.5 font-semibold text-foreground">
                인원
              </th>
              <th className="border-b border-border px-4 py-2.5 font-semibold text-foreground">
                안내
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2~6명", "전화로 당일 자리 확인 가능"],
              ["10~30명", "전화로 날짜·인원 미리 확인 권장"],
              ["50~100명", "최소 1주일 전 전화 예약, 메뉴 구성 사전 협의"],
              ["100~200명", "되도록 여유 있게 예약 · 실내와 야외로 나눠 배치"],
            ].map(([key, value]) => (
              <tr
                key={key}
                className="border-b border-border align-top last:border-0"
              >
                <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">
                  {key}
                </td>
                <td className="px-4 py-3 text-foreground-muted">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-serif-kr text-xl md:text-2xl font-bold text-foreground">
        단체 메뉴 구성
      </h2>
      <p className="mt-3 leading-relaxed text-foreground-muted">
        백숙은 한 마리 기준으로 보통 2~4인이 함께 먹습니다. 단체는
        한방백숙·누룽지백숙을 중심으로 감자전·해물파전·도토리묵을 곁들이고, 1인
        방문객이나 아이용으로 전복한방삼계탕(1인)을 추가하는 구성이 무난합니다.
        인원별 예산은{" "}
        <Link
          href="/blog/namhansanseong-baeksuk-gagyeok"
          className="text-accent hover:text-accent-hover"
        >
          남한산성 백숙 가격 예산표
        </Link>
        에 정리해 두었습니다.
      </p>

      <h2 className="mt-12 font-serif-kr text-xl md:text-2xl font-bold text-foreground">
        예약 전 체크리스트
      </h2>
      <ul className="mt-4 space-y-2.5">
        {[
          "날짜·시간·인원을 먼저 정해 전화",
          "50명 이상은 최소 1주일 전, 100명 이상은 더 여유 있게",
          "메뉴 구성(백숙 종류·마릿수·사이드) 사전 협의",
          "대형버스 이용 시 주차 가능 여부 미리 문의",
          "전 좌석 좌식 — 좌식이 불편한 일행이 있으면 미리 알려주세요",
          "백숙 조리 30~40분 — 도착 시간을 알려주면 맞춰 준비",
        ].map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-relaxed text-foreground-muted"
          >
            <span
              aria-hidden
              className="mt-1 h-3.5 w-3.5 shrink-0 rounded-[3px] border border-accent"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="font-serif-kr text-xl md:text-2xl font-bold text-foreground">
          자주 묻는 질문
        </h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {groupFaqs.map((faq) => (
            <details key={faq.question} className="group py-4" open>
              <summary className="cursor-pointer list-none font-serif-kr font-semibold text-foreground">
                Q. {faq.question}
              </summary>
              <p className="mt-2 leading-relaxed text-foreground-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-1 rounded-lg border border-border bg-background-alt p-6 text-sm text-foreground-muted">
        <p className="font-serif-kr text-base font-semibold text-foreground">
          {business.name}
        </p>
        <p>
          {business.address.full} (우 {business.address.postalCode})
        </p>
        <p>
          전화{" "}
          <a href={business.phoneHref} className="hover:text-accent">
            {business.phone}
          </a>{" "}
          · 영업 매일 {business.openingTime}~{business.closingTime}
        </p>
      </section>

      <div className="mt-8">
        <PhoneCTA label={`단체 예약 문의 전화하기 (${business.phone})`} />
      </div>
    </article>
  );
}
