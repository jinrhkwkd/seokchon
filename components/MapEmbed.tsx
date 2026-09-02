import { business } from "@/lib/content";

/**
 * Keyless Google Maps embed centred on the restaurant address.
 * Pass a height via `className` (e.g. "h-[380px]").
 */
export function MapEmbed({ className = "h-[360px]" }: { className?: string }) {
  const query = encodeURIComponent(
    `${business.name}, ${business.address.full}`,
  );

  return (
    <iframe
      title={`${business.name} 위치 지도`}
      src={`https://maps.google.com/maps?q=${query}&hl=ko&z=16&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full rounded-lg border border-border ${className}`}
      style={{ border: 0 }}
    />
  );
}
