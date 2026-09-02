import Link from "next/link";
import { business } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background-alt">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-foreground-muted space-y-1">
        <p className="font-serif-kr text-base font-semibold text-foreground">
          {business.name}
        </p>
        <p>{business.category} · {business.yearsInOperation}년 전통</p>
        <p>
          주소: {business.address.full} (우 {business.address.postalCode})
        </p>
        <p>
          전화:{" "}
          <a href={business.phoneHref} className="hover:text-accent">
            {business.phone}
          </a>
        </p>
        <p>영업시간: 매일 {business.openingTime} ~ {business.closingTime}</p>
        <p>사업자등록번호: {business.businessRegistrationNumber}</p>
        <p className="flex flex-wrap gap-x-4">
          <Link href="/group" className="hover:text-accent">
            단체·대형 예약
          </Link>
          <Link href="/blog" className="hover:text-accent">
            블로그
          </Link>
        </p>
        <p>
          <a
            href={business.naverPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            네이버 플레이스에서 보기
          </a>
        </p>
        <p className="pt-2 text-xs">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
