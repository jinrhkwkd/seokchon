export function ImagePlaceholder({
  alt,
  caption,
  aspect = "aspect-[4/3]",
  className = "",
  fill = false,
  dark = false,
}: {
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
  /** Absolutely fill the nearest relatively-positioned ancestor instead of using an aspect ratio box. */
  fill?: boolean;
  /** Dark backdrop variant for hero/overlay use over light text. */
  dark?: boolean;
}) {
  const boxClasses = fill
    ? "absolute inset-0"
    : `${aspect} w-full rounded-lg border border-border`;

  const toneClasses = dark
    ? "bg-gradient-to-b from-[#241c15] via-[#1a140f] to-[#0f0b08]"
    : "bg-background-alt";

  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={alt}
        className={`${boxClasses} ${toneClasses} flex items-center justify-center text-center px-4`}
      >
        <span
          className={`text-sm ${dark ? "text-white/50" : "text-foreground-muted"} tracking-wide`}
        >
          {alt}
        </span>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-foreground-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
