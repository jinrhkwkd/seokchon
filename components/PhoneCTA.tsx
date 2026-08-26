import { business } from "@/lib/content";

export function PhoneCTA({
  label = `전화로 예약하기 (${business.phone})`,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={business.phoneHref}
      className={`inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-accent-foreground font-medium hover:bg-accent-hover transition-colors ${className}`}
    >
      {label}
    </a>
  );
}
