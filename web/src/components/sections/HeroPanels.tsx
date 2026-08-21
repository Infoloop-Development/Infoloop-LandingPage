import { useEffect, useRef } from "react";
import { Lockup, Mark } from "@/components/Logo";
import { HERO } from "@/content/home";

/**
 * The three hero panels (photo | quote | photo) with Roundsite's scroll
 * behaviour: at the top of the page the side panels sit pushed outward
 * (±72% of their width) and glide to their resting place over the first
 * ~500px of scroll. Off under reduced motion; without JS the panels simply
 * sit in place.
 */
export function HeroPanels({ data = HERO }: { data?: typeof HERO } = {}) {
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const MAX = 72; // percent, matches the template
    const RANGE = 500; // px of scroll to settle
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => {
      raf = 0;
      if (!md.matches) {
        if (left.current) left.current.style.transform = "";
        if (right.current) right.current.style.transform = "";
        return;
      }
      const t = Math.min(1, Math.max(0, window.scrollY / RANGE));
      const eased = 1 - Math.pow(1 - t, 2);
      const x = MAX * (1 - eased);
      if (left.current) left.current.style.transform = `translate3d(${x}%, 0, 0)`;
      if (right.current) right.current.style.transform = `translate3d(${-x}%, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const c = data.card;
  return (
    // Three across only from lg. On a tablet the quote would be a 225px column
    // of text, so there it goes full width with the two photos side by side
    // beneath it.
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div ref={left} className="hero-side relative z-0">
        <PhotoSlot alt={c.leftAlt} />
      </div>
      <figure className="relative z-10 flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-8 text-white sm:-order-1 sm:col-span-2 sm:p-10 lg:order-none lg:col-span-1 lg:min-h-[520px]">
        {/* Brand texture at the edges, echoing the kit's virtual backgrounds */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[
            ["-6%", "62%", "34%"],
            ["-10%", "72%", "40%"],
            ["-4%", "82%", "28%"],
            ["72%", "6%", "34%"],
            ["78%", "16%", "28%"],
          ].map(([left, top, w], i) => (
            <span
              key={i}
              className={`absolute h-[6%] rounded-full ${i === 1 ? "bg-orange/25" : "bg-white/[0.06]"}`}
              style={{ left, top, width: w }}
            />
          ))}
        </div>
        <div className="relative">
          <blockquote className="font-display text-[24px] font-bold leading-[1.25] tracking-[-0.015em] sm:text-[26px]">
            &ldquo;{c.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8">
            <p className="font-display text-[16px] font-semibold text-white">{c.name}</p>
            <p className="text-[15px] text-gray-40">{c.role}</p>
          </figcaption>
        </div>
        <div className="relative mt-8 opacity-70">
          <Lockup tone="white" variant="mono" wordmarkSize={18} href="" />
        </div>
      </figure>
      <div ref={right} className="hero-side relative z-20">
        <PhotoSlot alt={c.rightAlt} flip />
      </div>
    </div>
  );
}

/**
 * Image slot for the hero panels. Until real photos are cleared it carries
 * the brand's bar texture (as on the kit's virtual backgrounds) on a Mist
 * field. Replace with <Image fill className="object-cover" /> when photos
 * exist.
 */
function PhotoSlot({ alt, flip = false }: { alt: string; flip?: boolean }) {
  const bars = [
    ["12%", "8%", "62%"],
    ["8%", "24%", "48%"],
    ["4%", "40%", "72%"],
    ["10%", "56%", "40%"],
    ["6%", "72%", "58%"],
  ];
  return (
    <div aria-hidden="true" data-photo-slot={alt} className="relative h-full min-h-[280px] overflow-hidden rounded-2xl bg-mist">
      <div className={`absolute inset-0 ${flip ? "scale-x-[-1]" : ""}`} aria-hidden="true">
        {bars.map(([left, top, w], i) => (
          <span
            key={i}
            className={`absolute h-[9%] rounded-full ${i === 1 ? "bg-orange/80" : "bg-white/70"}`}
            style={{ left, top, width: w }}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-md bg-white/85 px-2.5 py-1.5 text-[11px] text-ink/70" aria-hidden="true">
        <Mark size={14} />
        Photo slot
      </div>
    </div>
  );
}
