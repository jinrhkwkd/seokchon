export function ImagePlaceholder({
  alt,
  caption,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={alt}
        className={`${aspect} w-full rounded-lg border border-border bg-background-alt flex items-center justify-center text-center px-4`}
      >
        <span className="text-sm text-foreground-muted">{alt}</span>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-foreground-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
