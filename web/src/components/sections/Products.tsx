import type React from "react";
import { Mark } from "@/components/Logo";
import { Hi } from "@/components/ui";
import { PRODUCTS } from "@/content/home";

/**
 * 7Span: three bordered product cards with an illustrated thumbnail on top
 * and the product logo centered on it. Here the thumbnail is a light well
 * with a faded product UI tile (job card, clock-in ledger, grade sheet) and
 * a centered "logo card" carrying the product name and the mark. Brand
 * imagery rules: real product surfaces, no stock, no gradients.
 */
export function Products({ data = PRODUCTS }: { data?: typeof PRODUCTS } = {}) {
  return (
    <section className="section-y" id="products" aria-labelledby="products-h2">
      <div className="container-x">
        <h2 id="products-h2" className="display-h2 text-ink reveal">
          <Hi text={data.h2} />
        </h2>
        <p className="lede mt-3 max-w-4xl text-ink/80 reveal" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
          {data.lede}
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((p, i) => (
            <li key={p.name} className="reveal" style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
              <a
                href={p.href}
                aria-label={`${p.name}: ${p.kicker}`}
                className="group flex h-full flex-col overflow-hidden border border-ink bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange"
              >
                <div className="relative flex aspect-[4/3] items-center overflow-hidden border-b border-ink bg-paper p-6">
                  <div className="w-full opacity-40 transition-opacity duration-300 group-hover:opacity-70">
                    <ProductTile kind={p.tile} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-6 py-4 shadow-[0_12px_30px_-18px_rgba(10,10,10,0.35)]">
                      <Mark size={28} />
                      <span className="font-display text-[26px] font-bold tracking-[-0.02em] text-ink">{p.name}</span>
                    </div>
                  </div>
                </div>
                <div className="p-7 lg:p-8">
                  <h3 className="font-display text-[22px] font-bold leading-tight text-ink">
                    {p.name}
                    <span className="sr-only">, {p.kicker}</span>
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink/80">{p.body}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductTile({ kind }: { kind: "garage" | "attendance" | "lms" }) {
  // Three tiny "screens" that hint at what each product does.
  if (kind === "garage") {
    return (
      <div className="frame bg-white p-3 text-[11px]" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-ink">Job card #4821</span>
          <span className="rounded bg-orange px-1.5 py-0.5 font-display font-semibold text-ink">In bay 3</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {[
            ["Brake pads, front", "Fitted"],
            ["Oil + filter", "Fitted"],
            ["Wheel alignment", "Waiting"],
          ].map(([a, b]) => (
            <li key={a} className="flex justify-between border-t border-line pt-1.5">
              <span className="text-ink/80">{a}</span>
              <span className={b === "Waiting" ? "text-ink/70" : "text-ink"}>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t border-line pt-1.5">
          <span className="text-ink/70">Reminder sent</span>
          <span className="font-display font-semibold text-ink">SMS, 09:12</span>
        </div>
      </div>
    );
  }
  if (kind === "attendance") {
    return (
      <div className="frame bg-white p-3 text-[11px]" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-ink">Plant 2, shift A</span>
          <span className="text-ink/70">142 clocked in</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className={`h-3 rounded-sm ${i === 9 || i === 16 ? "bg-orange" : "bg-ink/80"}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between border-t border-line pt-1.5">
          <span className="text-ink/70">2 errors flagged</span>
          <span className="font-display font-semibold text-ink">Payroll export ready</span>
        </div>
      </div>
    );
  }
  return (
    <div className="frame bg-white p-3 text-[11px]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="font-display font-bold text-ink">Forklift cert, cohort 12</span>
        <span className="text-ink/70">Supervised</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {[
          ["Written test", "38 / 40", "Pass"],
          ["Practical", "Graded by AI", "Pass"],
          ["Renewal due", "Mar 2027", ""],
        ].map(([a, b, c]) => (
          <li key={a} className="flex justify-between border-t border-line pt-1.5">
            <span className="text-ink/80">{a}</span>
            <span className="text-ink/70">{b}</span>
            <span className="font-display font-semibold text-ink">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
