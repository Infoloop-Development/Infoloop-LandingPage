import type React from "react";
import { ArrowRight, Hi } from "@/components/ui";

/**
 * The site's closing CTA: a rounded ink panel inside the container with a
 * headline (one [[highlight]] allowed), one line and one button. Minimal on
 * purpose (Nimit, 2026-08-17: "minimal and light content"). Centred and
 * stacked, button at the bottom, so it closes a page cleanly and stacks the
 * same way on phones. `align="split"` gives the work-page variant (copy left,
 * button right).
 */
export function CtaPanel({ id = "cta-h2", h2, lede, button, align = "center", external = false }: { id?: string; h2: string; lede?: string; button: { label: string; href: string }; align?: "center" | "split"; external?: boolean }) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <section aria-labelledby={id} className="bg-white">
      <div className="container-x py-14 sm:py-20">
        <div className={`relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 ${align === "center" ? "text-center" : ""}`}>
          <div className={`relative ${align === "center" ? "mx-auto max-w-3xl" : "grid gap-8 lg:grid-cols-12 lg:items-center"}`}>
            <div className={align === "split" ? "lg:col-span-7" : ""}>
              <h2 id={id} className="font-display text-[30px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[38px] reveal">
                <Hi text={h2} />
              </h2>
              {lede && (
                <p className={`mt-3 text-[17px] leading-relaxed text-gray-40 reveal ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"}`} style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
                  {lede}
                </p>
              )}
            </div>
            <div className={`${align === "center" ? "mt-8" : "lg:col-span-5 lg:justify-self-end"} reveal`} style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <a href={button.href} className="btn btn-primary px-7 py-4 text-[16px]" {...linkProps}>
                {button.label} <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
