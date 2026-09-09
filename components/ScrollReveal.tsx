"use client";

import { useEffect } from "react";

/**
 * Progressive scroll-in animation. Adds `.reveal-in` to `[data-reveal]` and
 * `[data-reveal-stagger]` elements as they scroll into view (once each), and
 * runs a count-up on any `[data-countup]` inside. Everything is gated behind the
 * `reveal-ready` class this adds to <html>, so with no JS (or under reduced
 * motion) the page just renders normally. See globals.css for the transitions.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pending = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-reveal-stagger]",
      ),
    );
    if (reduce || pending.length === 0) return;

    const runCountUp = (el: HTMLElement) => {
      if (el.dataset.countupDone) return;
      el.dataset.countupDone = "1";
      const m = (el.textContent ?? "").trim().match(/^(\D*?)([\d,]+)(.*)$/);
      if (!m) return;
      const [, prefix, digits, suffix] = m;
      const target = parseInt(digits.replace(/,/g, ""), 10);
      if (!Number.isFinite(target) || target <= 0) return;

      const duration = 1000;
      const startedAt = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - startedAt) / duration);
        const value = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = `${prefix}${value.toLocaleString("ko-KR")}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const reveal = (el: HTMLElement) => {
      el.classList.add("reveal-in");
      el.querySelectorAll<HTMLElement>("[data-countup]").forEach(runCountUp);
    };

    // True once the element's top has reached the reveal line — stays true if it
    // later scrolls off the top, so a fast scroll can't leave anything hidden.
    const reached = (el: Element) =>
      el.getBoundingClientRect().top < window.innerHeight * 0.88;

    const sweep = () => {
      for (let i = pending.length - 1; i >= 0; i--) {
        if (reached(pending[i])) reveal(pending.splice(i, 1)[0]);
      }
      if (pending.length === 0) {
        window.removeEventListener("scroll", sweep);
        window.removeEventListener("resize", sweep);
      }
    };

    document.documentElement.classList.add("reveal-ready");
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    // Reveal whatever is already on screen (after a frame so layout is settled).
    requestAnimationFrame(sweep);

    return () => {
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    };
  }, []);

  return null;
}
