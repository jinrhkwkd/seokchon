import Link from "next/link";
import { business } from "@/lib/content";
import { PhoneCTA } from "./PhoneCTA";
import { ThemeToggle } from "./ThemeToggle";
import { RoofMark } from "./RoofMark";

const navLinks = [
  { href: "/menu", label: "메뉴 소개" },
  { href: "/group", label: "단체·대형 예약" },
  { href: "/faq", label: "자주 묻는 질문" },
  { href: "/blog", label: "블로그" },
  { href: "/location", label: "오시는 길" },
  { href: "/media", label: "방송·인증 이력" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <RoofMark className="h-6 w-10 text-accent transition-transform group-hover:-translate-y-0.5" />
          <span className="font-serif-kr text-xl font-bold text-foreground tracking-tight">
            {business.name}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-foreground-muted hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <PhoneCTA label="전화 예약" className="text-sm px-4 py-2" />
        </div>
      </div>
      <nav className="md:hidden flex flex-wrap gap-x-4 gap-y-2 px-4 pb-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
