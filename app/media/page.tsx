import type { Metadata } from "next";
import { trustSignals } from "@/lib/content";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "방송·인증 이력",
  description:
    "석촌의 KBS 방송 출연 2회 이력과 농림축산식품부 공식 인증 안심식당 정보를 소개합니다.",
  alternates: {
    canonical: "/media",
  },
};

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground">방송·인증 이력</h1>
      <p className="mt-4 text-foreground-muted">
        석촌은 정부 공식 인증과 방송 출연 이력을 통해 신뢰를 검증받아 왔습니다.
      </p>

      <section className="mt-12">
        <h2 className="font-serif-kr text-2xl font-semibold text-foreground">
          {trustSignals.certification.authority} 공식 인증 {trustSignals.certification.name}
        </h2>
        <p className="mt-3 text-foreground-muted">
          {trustSignals.certification.description} 안심식당 인증은 위생과 안전 기준을
          충족한 식당에 정부 기관이 부여하는 공식 인증입니다.
        </p>
      </section>

      <section className="mt-12 space-y-10">
        <h2 className="font-serif-kr text-2xl font-semibold text-foreground">
          KBS 방송 출연 이력
        </h2>
        {trustSignals.broadcasts.map((broadcast) => (
          <article
            key={broadcast.date}
            className="rounded-lg border border-border bg-background-alt p-6"
          >
            <ImagePlaceholder
              alt={`${broadcast.program} ${broadcast.dateDisplay} 방송 캡처 이미지 (준비 중)`}
              aspect="aspect-video"
              className="mb-4"
            />
            <h3 className="font-serif-kr text-lg font-semibold text-foreground">
              {broadcast.program}
              {broadcast.episode ? ` ${broadcast.episode}` : ""} ({broadcast.dateDisplay})
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">{broadcast.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
