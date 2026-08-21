import { Mark } from "@/components/Logo";

/**
 * 7Span's author card: bordered box with the square photo left, name, role
 * in caps and a short bio; below it a hatched strip with the LinkedIn box on
 * the left and "MORE BY <NAME>" on the right.
 */
export type Author = { name: string; role?: string; bio: string; photo?: string; linkedin: string; moreHref: string };

const HATCH = { backgroundImage: "repeating-linear-gradient(135deg, rgba(10,10,10,0.35) 0 1px, transparent 1px 7px)" };

export function AuthorCard({ a }: { a: Author }) {
  const initials = a.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div>
      <div className="grid gap-6 border border-b-0 border-ink bg-white p-6 sm:grid-cols-[168px_1fr] sm:gap-8 sm:p-8">
        <div className="relative aspect-square w-[168px] overflow-hidden bg-mist" aria-hidden="true">
          {a.photo ? (
            <img src={a.photo} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <span className="font-display text-[40px] font-bold leading-none tracking-[-0.03em] text-ink">{initials}</span>
              <Mark size={22} />
            </div>
          )}
        </div>
        <div>
          <p className="font-display text-[24px] font-bold leading-tight tracking-[-0.01em] text-ink">{a.name}</p>
          {a.role && <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/55">{a.role}</p>}
          <p className="mt-4 text-[16px] leading-relaxed text-ink/80">{a.bio}</p>
        </div>
      </div>
      {/* Full-bleed hatched strip: the end-of-article divider (7Span). The two boxes stay inside the article width. */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 border-y border-ink" style={HATCH}>
        <div className="container-x">
          {/* Inside the card width: white, the card's side lines continue down, no lines between the two items (7Span). */}
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between border-x border-ink bg-white px-3">
            <a
              href={a.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${a.name} on LinkedIn`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] bg-ink text-white transition-colors hover:bg-orange hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 13.2c0-3.3-1.76-4.94-4.1-4.94-1.9 0-2.75 1.04-3.22 1.78V8.5H9.75V20h3.38v-6.42c0-1.7.32-3.34 2.42-3.34 2.07 0 2.1 1.94 2.1 3.45V20h3.38l-.01-6.8z" />
              </svg>
            </a>
            <a href={a.moreHref} className="font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-orange">
              More by {a.name.split(/\s+/)[0]}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
