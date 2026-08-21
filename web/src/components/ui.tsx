import type React from "react";
import type { ReactNode } from "react";

/* Small shared primitives. Kept deliberately thin: sections own their layout,
   these only remove repetition (arrow icon, eyebrow + heading stack, CTA). */

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`btn-arrow ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8.5 6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.6l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.4l-6 3.3 1.3-6.6L2.4 9.5l6.7-.8L12 2.6z"
      />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ink" | "outline" | "outline-light";
  arrow?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", arrow = true, className = "" }: ButtonProps) {
  const external = /^https?:/.test(href);
  const cls = `btn btn-${variant} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        {arrow && <ArrowRight />}
      </a>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
      {arrow && <ArrowRight />}
    </a>
  );
}

type SectionHeadProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  /** Optional right-aligned action for left-aligned heads on desktop */
  action?: ReactNode;
  as?: "h1" | "h2";
  /** id placed on the heading so the parent section can use aria-labelledby */
  id?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  className = "",
  action,
  as = "h2",
  id,
}: SectionHeadProps) {
  const isCenter = align === "center";
  const Heading = as;
  const eyebrowColor = tone === "dark" ? "text-gray-40" : "text-ink/60";
  const ledeColor = tone === "dark" ? "text-gray-40" : "text-ink/70";
  return (
    <div
      className={`${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${
        action ? "lg:flex lg:items-end lg:justify-between lg:max-w-none lg:gap-10" : ""
      } ${className}`}
    >
      <div className={action ? "max-w-3xl" : ""}>
        {eyebrow && (
          <p className={`eyebrow ${eyebrowColor} reveal`}>
            {eyebrow}
          </p>
        )}
        <Heading id={id} className={`display-h2 mt-3 reveal ${tone === "dark" ? "text-white" : "text-ink"}`} style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
          {title}
        </Heading>
        {lede && (
          <p className={`lede mt-5 ${ledeColor} reveal ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`} style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            {lede}
          </p>
        )}
      </div>
      {action && <div className="mt-6 lg:mt-0 shrink-0 reveal" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>{action}</div>}
    </div>
  );
}

/**
 * Renders copy that carries [[double-bracket]] highlights as orange spans.
 * Lets every headline and card title in content/home.ts say exactly which
 * words get the eye-catching accent (7Span does this with red type).
 */
export function Hi({ text, className }: { text: string; className?: string }) {
  // "\n" in the source string is an explicit line break (desktop only, so
  // narrow screens keep wrapping naturally).
  const parts = text.split(/(\[\[.*?\]\]|\n)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p === "\n" ? (
          // Desktop: a line break. Narrower: the words need a space between
          // them, so a plain space stands in where the break is hidden.
          <span key={i}>
            <span className="lg:hidden"> </span>
            <br className="hidden lg:block" />
          </span>
        ) : p.startsWith("[[") ? (
          <span key={i} className={className ?? "text-orange"}>
            {p.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
