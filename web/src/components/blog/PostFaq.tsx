/**
 * 7Span's blog FAQ: H2 "Frequently asked questions", then an accordion in a
 * bordered box framed by a hatched border. First item open (minus), the rest
 * closed (plus). Native <details>: no JavaScript, answers in the HTML.
 */
const HATCH = { backgroundImage: "repeating-linear-gradient(135deg, rgba(10,10,10,0.35) 0 1px, transparent 1px 7px)" };

export function PostFaq({ items }: { items: { q: string; a: string }[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-14" aria-labelledby="post-faq-h2">
      <h2 id="post-faq-h2" className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
        Frequently asked questions
      </h2>
      <div className="mt-6 p-5 sm:p-6" style={HATCH}>
        <ul className="divide-y divide-ink border border-ink bg-white">
          {items.map((f, i) => (
            <li key={f.q}>
              <details className="group px-6 py-5" open={i === 0}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-display text-[16.5px] font-bold text-ink [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center text-ink">
                    <span className="absolute h-[2px] w-4 bg-current" />
                    <span className="absolute h-4 w-[2px] bg-current transition-transform group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-ink/75">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
