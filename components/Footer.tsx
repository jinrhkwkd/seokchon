import { business } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background-alt">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-foreground-muted space-y-1">
        <p className="font-serif-kr text-base font-semibold text-foreground">
          {business.name}
        </p>
        <p>{business.category} · {business.yearsInOperation}년 전통</p>
        <p>주소: {business.address.full}</p>
        <p>
          전화:{" "}
          <a href={business.phoneHref} className="hover:text-accent">
            {business.phone}
          </a>
        </p>
        <p>영업 종료: {business.closingTime}</p>
        <p className="pt-2 text-xs">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
