import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import { JsonLd, buildFaqSchema } from "@/lib/schema";
import { PhoneCTA } from "@/components/PhoneCTA";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "남한산성 백숙 맛집, 주차, 한방백숙, 단체 예약 등 석촌에 대해 자주 묻는 질문과 답변 모음.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd data={buildFaqSchema()} />
      <h1 className="text-3xl font-bold text-foreground">자주 묻는 질문</h1>
      <p className="mt-4 text-foreground-muted">
        남한산성 백숙집을 찾는 분들이 자주 묻는 질문에 석촌이 직접 답합니다.
      </p>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5" open>
            <summary className="cursor-pointer list-none">
              <h2 className="inline font-serif-kr text-lg font-semibold text-foreground">
                Q. {faq.question}
              </h2>
            </summary>
            <p className="mt-3 text-foreground-muted">{faq.answer}</p>
          </details>
        ))}
      </div>

      <div className="mt-12">
        <PhoneCTA label="더 궁금한 점은 전화로 문의하기" />
      </div>
    </div>
  );
}
