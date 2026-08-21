import type React from "react";
import { Button, Hi } from "@/components/ui";
import { SERVICES_SECTION } from "@/content/home";

/**
 * Services, 7Span style: left-aligned heading and sub, six cards in a 3x2
 * grid with 1px ink borders (collapsed), an H3 title and a plain bullet
 * list, then a hatched strip with the "Explore our services" button flush
 * right.
 *
 * Nothing inside a card is a link, the same call 7Span makes: the card is a
 * summary you read, and the one thing to click is the button. The service
 * tree stays reachable from the menu, the footer and /services, so no page
 * loses its internal links. The hrefs stay in the content file because the
 * CMS shares this shape with the menu, they are simply not rendered here.
 */
export function Services({ data = SERVICES_SECTION }: { data?: typeof SERVICES_SECTION } = {}) {
  const s = data;
  return (
    <section className="section-y" id="services" aria-labelledby="services-h2">
      <div className="container-x">
        <p className="eyebrow text-ink/60 reveal">{s.eyebrow}</p>
        <h2 id="services-h2" className="display-h2 mt-3 text-ink reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
          <Hi text={s.h2} />
        </h2>
        <p className="lede mt-4 max-w-4xl text-ink/70 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          {s.lede}
        </p>

        {/* Collapsed 1px ink borders, like 7Span */}
        <ul className="mt-10 grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {s.cards.map((c, i) => (
            <li
              key={c.href + c.title}
              className="flex h-full flex-col bg-white p-7 reveal lg:p-9"
              style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
            >
              <h3 className="font-display text-[22px] font-bold leading-tight tracking-[-0.015em] text-ink lg:text-[24px]">
                {c.title}
              </h3>
              <ul className="mt-5 space-y-2.5 pl-5">
                {c.bullets.map((b) => (
                  <li key={b.text} className="list-disc text-[15.5px] leading-snug text-ink marker:text-ink">
                    {b.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Hatched strip with the button flush right (7Span) */}
        <div className="mt-4 flex items-stretch">
          <div
            className="hidden flex-1 border border-r-0 border-ink sm:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(10,10,10,0.9) 0 1px, transparent 1px 8px)",
            }}
            aria-hidden="true"
          />
          <Button href={s.cta.href} variant="ink" className="!rounded-none w-full px-8 py-5 text-[15px] sm:w-auto">
            {s.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
