import { ArrowRight } from "@/components/ui";
import { CaseTile } from "@/components/work/CaseTile";
import type { CaseStudy } from "@/content/work";

/**
 * 7Span-style case card: image with the industry label bar over it, one
 * sentence, client and link. Used by the /work grid and "More of our work".
 * Stretched link: the whole card is clickable, only the sentence is anchor
 * text (the tile is decorative).
 */
export function CaseCard({
  href,
  industry,
  tile,
  cover,
  text,
  client,
  linkLabel = "Read case study",
  snapshot = false,
  hidden = false,
}: {
  href: string;
  industry: string;
  tile: CaseStudy["tile"];
  cover?: CaseStudy["cover"];
  text: string;
  client: string;
  linkLabel?: string;
  snapshot?: boolean;
  hidden?: boolean;
}) {
  return (
    <li hidden={hidden} className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-white transition-colors hover:border-ink focus-within:ring-2 focus-within:ring-orange">
      <div className="relative">
        <CaseTile kind={tile} cover={cover} rounded={false} className="aspect-[3/2]" />
        <div className="absolute inset-x-0 bottom-0">
          <div aria-hidden="true" className="h-1.5 w-full" style={{ backgroundImage: "repeating-linear-gradient(135deg, #0a0a0a 0 4px, transparent 4px 8px)" }} />
          <p className="flex items-center justify-between bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            <span>{industry}</span>
            {snapshot && <span className="text-white/60">Snapshot</span>}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] leading-relaxed text-ink">
          <a href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {text}
          </a>
        </h3>
        <p className="mt-auto flex items-center justify-between gap-3 pt-5 text-[12.5px] text-ink/55">
          <span>{client}</span>
          <span className="link-arrow shrink-0 whitespace-nowrap text-[13px] text-ink group-hover:text-orange">
            {linkLabel} <ArrowRight />
          </span>
        </p>
      </div>
    </li>
  );
}
