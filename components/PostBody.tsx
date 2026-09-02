import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { PostBlock } from "@/lib/posts";

/** Renders `[label](/path)` links inside otherwise-plain body text. */
function renderInline(text: string): ReactNode[] {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    const [, label, href] = match;
    const className =
      "text-accent underline underline-offset-2 hover:text-accent-hover";
    nodes.push(
      href.startsWith("/") ? (
        <Link key={`${href}-${match.index}`} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      ),
    );
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="mt-8 space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="pt-4 font-serif-kr text-xl md:text-2xl font-bold text-foreground"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                className="pt-2 font-serif-kr text-lg font-bold text-foreground"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="text-foreground-muted leading-relaxed">
                {renderInline(block.text)}
              </p>
            );
          case "list":
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-5 text-foreground-muted marker:text-accent"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="leading-relaxed">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          case "checklist":
            return (
              <ul key={index} className="space-y-2.5">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex gap-3 leading-relaxed text-foreground-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-1 h-3.5 w-3.5 shrink-0 rounded-[3px] border border-accent"
                    />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={index}
                className="rounded-lg border border-border bg-background-alt p-5 leading-relaxed text-foreground"
              >
                {block.title && (
                  <p className="font-serif-kr font-bold text-foreground">
                    {block.title}
                  </p>
                )}
                {block.text && (
                  <p className={block.title ? "mt-2" : undefined}>
                    {renderInline(block.text)}
                  </p>
                )}
                {block.items && block.items.length > 0 && (
                  <ul
                    className={`list-disc space-y-1.5 pl-5 marker:text-accent ${
                      block.title || block.text ? "mt-3" : ""
                    }`}
                  >
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{renderInline(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          case "qa":
            return (
              <div
                key={index}
                className="rounded-lg border-l-4 border-accent bg-background-alt px-5 py-4"
              >
                <p className="font-serif-kr font-bold text-foreground">
                  Q. {block.question}
                </p>
                <p className="mt-2 leading-relaxed text-foreground-muted">
                  <span className="font-semibold text-foreground">A. </span>
                  {renderInline(block.answer)}
                </p>
              </div>
            );
          case "table":
            return (
              <figure key={index} className="my-2">
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-background-alt text-left">
                        {block.headers.map((header, headerIndex) => (
                          <th
                            key={headerIndex}
                            className="border-b border-border px-3 py-2.5 font-semibold text-foreground"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="align-top">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border-b border-border px-3 py-2.5 text-foreground-muted last:border-r-0"
                            >
                              {renderInline(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-xs text-foreground-muted">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
