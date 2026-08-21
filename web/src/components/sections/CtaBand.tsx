import type React from "react";
import { Button, Check, Hi } from "@/components/ui";
import { CTA } from "@/content/home";
import { SITE } from "@/content/site";

/**
 * 7Span closes with a black CTA band ("Ready to Build or Modernize Your
 * Digital Platform?" + "Talk to Our Experts") that sends visitors to the
 * contact page. Same here: one headline, one button, no form on the landing
 * page.
 */
export function CtaBand({ data = CTA }: { data?: typeof CTA } = {}) {
  return (
    <section className="bg-ink text-white" id="next-step" aria-labelledby="contact-h2">
      <div className="container-x section-y text-center">
        <p className="eyebrow text-gray-40 reveal">{data.eyebrow}</p>
        <h2 id="contact-h2" className="display-h2 mx-auto mt-3 max-w-3xl text-white reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
          <Hi text={data.h2} />
        </h2>
        <p className="lede mx-auto mt-5 max-w-2xl text-gray-40 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          {data.lede}
        </p>
        <div className="mt-8 reveal" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
          <Button href={data.button.href} variant="primary" className="px-7 py-4 text-[16px]">
            {data.button.label}
          </Button>
        </div>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 reveal" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
          {data.assurances.map((a) => (
            <li key={a} className="flex items-center gap-2 text-[14px] text-white/85">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange text-ink">
                <Check className="h-3 w-3" />
              </span>
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-gray-40 reveal" style={{ "--reveal-delay": "300ms" } as React.CSSProperties}>
          Prefer email?{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-white underline decoration-orange underline-offset-4">
            {SITE.email}
          </a>
        </p>
      </div>
    </section>
  );
}
