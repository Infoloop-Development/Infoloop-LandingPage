import { Lockup } from "@/components/Logo";
import { Star } from "@/components/ui";
import { FOOTER_LEGAL, RATINGS, type NavGroup } from "@/content/site";
import { LOCAL_SITE, type SiteContent } from "@/lib/site-content";

export function ProofStrip({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const name = tone === "dark" ? "text-gray-40" : "text-gray-60";
  const score = tone === "dark" ? "text-white" : "text-ink";
  const divider = tone === "dark" ? "bg-line-dark" : "bg-line";
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${className}`}>
      {RATINGS.map((r, i) => (
        <span key={r.platform} className="inline-flex items-center gap-1.5 text-[14px]">
          <Star className="text-orange" />
          <span className={`font-display font-bold tabular-nums ${score}`}>{r.score}</span>
          <span className={name}>{r.platform}</span>
          {i === RATINGS.length - 1 && <span className={`ml-4 hidden h-4 w-px sm:inline-block ${divider}`} aria-hidden="true" />}
        </span>
      ))}
      <span className={`text-[14px] ${name}`}>Certified Webflow and Shopify Partners</span>
    </div>
  );
}

export function Footer({ site = LOCAL_SITE }: { site?: SiteContent } = {}) {
  const SITE = site.site;
  const OFFICES = site.offices;
  const SOCIAL = site.social;
  const FOOTER_COLUMNS: NavGroup[] = [
    { title: "Services", href: "/services", items: site.services.flatMap((g) => g.items) },
    { title: "Industries", href: "/industries", items: site.industries.flatMap((g) => g.items) },
  ];
  return (
    <footer className="border-t border-line-dark bg-ink text-white">
      {/* Link rows, 7Span style: heading, then links flowing beneath. (The
          tagline statement that used to open the footer was removed: it
          repeated the hero and the band, and added a fourth orange highlight.) */}
      <div>
        <div className="container-x">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="border-b border-line-dark py-10 last:border-b-0">
              <a href={col.href ?? "#"} className="inline-flex items-center gap-3 font-display text-[22px] font-bold text-white hover:text-orange max-lg:min-h-11">
                {col.title}
                <span className="font-sans text-[15px] font-normal text-gray-40 sm:hidden">
                  All {col.items.length} &rarr;
                </span>
              </a>
              {/* Three states, on purpose. On a phone the 29 links are hidden
                  and the heading takes you to the hub page that lists them: a
                  2.5 screen footer on every page is dead weight, and the menu
                  already links every one of these on every page. From sm they
                  are back as a two-column list of 44px rows, because a wrapped
                  pipe list gives 19px tap targets. From lg it is 7Span's
                  wrapped row. */}
              <ul className="mt-5 hidden grid-cols-2 gap-x-6 text-[14px] leading-snug sm:grid lg:flex lg:flex-wrap lg:items-center lg:gap-x-0 lg:gap-y-2.5">
                {col.items.map((it) => (
                  <li key={it.label} className="lg:after:mx-3 lg:after:text-white/20 lg:after:content-['|'] lg:last:after:content-none">
                    <a href={it.href} className="flex min-h-11 items-center py-1 text-gray-40 transition-colors hover:text-white lg:inline lg:min-h-0 lg:py-0">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Offices and contact (7Span: offices row under the link columns) */}
      <div className="border-t border-line-dark">
        <div className="container-x grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-14">
          {OFFICES.map((o) => (
            <address key={o.key} className="not-italic">
              <p className="eyebrow text-gray-40">{o.name}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-white">
                {o.lines.map((l, i) => (
                  <span key={i} className="block">{l}</span>
                ))}
              </p>
              <ul className="mt-3 space-y-1 text-[14px]">
                {o.contacts.map((c) => (
                  <li key={c.tel} className="flex gap-2">
                    <span className="w-10 shrink-0 text-gray-40">{c.label}</span>
                    <a href={`tel:${c.tel}`} className="inline-flex items-center font-display font-semibold text-white transition-colors hover:text-orange max-lg:min-h-11">
                      {c.display}
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          ))}
          <div>
            <p className="eyebrow text-gray-40">Email</p>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li>
                <span className="block text-gray-40">Sales and new projects</span>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center font-display font-semibold text-white transition-colors hover:text-orange max-lg:min-h-11">
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="block text-gray-40">Jobs</span>
                <a href={`mailto:${SITE.careersEmail}`} className="inline-flex items-center font-display font-semibold text-white transition-colors hover:text-orange max-lg:min-h-11">
                  {SITE.careersEmail}
                </a>
              </li>
            </ul>
            <p className="mt-3 text-[13px] text-gray-40">We reply within one business day.</p>
          </div>
          <div>
            <p className="eyebrow text-gray-40">Follow</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2" aria-label="Infoloop on social media">
              {SOCIAL.map((s) => (
                <li key={s.icon}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="group inline-flex items-center gap-3 text-[14px] text-gray-40 max-lg:min-h-11 transition-colors hover:text-white"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-[5px] border border-line-dark text-gray-40 transition-colors group-hover:border-white group-hover:text-white" aria-hidden="true">
                      <SocialIcon name={s.icon} />
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar (7Span): logo left, credential centre, legal right */}
      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col gap-4 py-6 text-[13px] text-gray-40 md:grid md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-4">
            <Lockup tone="white" wordmarkSize={18} />
          </div>
          <p className="text-white md:text-center">Certified Webflow and Shopify Partners</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex items-center transition-colors hover:text-white max-lg:min-h-11">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              {/* The readable sitemap page. The XML for search engines is
                  /sitemap-index.xml, linked from <head> and robots.txt. */}
              <a href="/sitemap" className="inline-flex items-center transition-colors hover:text-white max-lg:min-h-11">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function SocialIcon({ name }: { name: SiteContent["social"][number]["icon"] }) {
  const common = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true as const };
  switch (name) {
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 13.2c0-3.3-1.76-4.94-4.1-4.94-1.9 0-2.75 1.04-3.22 1.78V8.5H9.75V20h3.38v-6.42c0-1.7.32-3.34 2.42-3.34 2.07 0 2.1 1.94 2.1 3.45V20h3.38l-.01-6.8z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9L17.5 3zm-1.1 16.2h1.7L6.8 4.7H4.9l11.5 14.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17 5.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM21.5 8a5.6 5.6 0 0 0-1.5-3.9A5.6 5.6 0 0 0 16.1 2.5C14.5 2.4 9.5 2.4 7.9 2.5A5.6 5.6 0 0 0 4 4A5.6 5.6 0 0 0 2.5 7.9c-.1 1.6-.1 6.6 0 8.2A5.6 5.6 0 0 0 4 20a5.6 5.6 0 0 0 3.9 1.5c1.6.1 6.6.1 8.2 0A5.6 5.6 0 0 0 20 20a5.6 5.6 0 0 0 1.5-3.9c.1-1.6.1-6.6 0-8.1zm-2 9.9a3.2 3.2 0 0 1-1.8 1.8c-1.2.5-4.2.4-5.7.4s-4.4.1-5.7-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.2-.4-4.2-.4-5.7s-.1-4.4.4-5.7A3.2 3.2 0 0 1 6.3 4.7c1.2-.5 4.2-.4 5.7-.4s4.4-.1 5.7.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.2.4 4.2.4 5.7s.1 4.4-.4 5.7z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-7.5h2.6l.4-3H13.5V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
        </svg>
      );
    case "behance":
      return (
        <svg {...common}>
          <path d="M9.2 11.4c1-.5 1.6-1.4 1.6-2.6 0-2.3-1.7-3.3-3.9-3.3H2v13h5.1c2.4 0 4.3-1.2 4.3-3.8 0-1.6-.8-2.8-2.2-3.3zM4.6 7.7h2.1c1 0 1.7.4 1.7 1.4s-.7 1.4-1.6 1.4H4.6V7.7zm2.4 8.7H4.6v-3.3h2.4c1.2 0 2 .5 2 1.7s-.8 1.6-2 1.6zM18 8.6c-2.9 0-4.6 2.1-4.6 4.9 0 2.9 1.8 4.9 4.7 4.9 2.2 0 3.6-1 4.2-2.9h-2.3c-.3.7-.9 1.1-1.9 1.1-1.3 0-2.1-.8-2.2-2.2H22.4c.2-3.3-1.5-5.8-4.4-5.8zm-2.1 4.1c.2-1.2 1-1.9 2.1-1.9s1.9.8 2 1.9h-4.1zM15.1 5.5h5.5v1.4h-5.5z" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.6 4.6a8.5 8.5 0 0 1 1.9 5.3c-.3-.1-3.1-.6-5.9-.3l-.6-1.4a34 34 0 0 0 4.6-3.6zM12 3.5c2.2 0 4.1.8 5.6 2.1a29 29 0 0 1-4.3 3.4A46 46 0 0 0 10.2 4a8.7 8.7 0 0 1 1.8-.5zM8.5 4.6a45 45 0 0 1 3.1 4.9c-3.9 1-7.3 1-7.7 1a8.6 8.6 0 0 1 4.6-5.9zM3.5 12v-.2c.4 0 4.3.1 8.5-1.2l.7 1.4c-4.6 1.3-7 4.9-7.3 5.3A8.5 8.5 0 0 1 3.5 12zm8.5 8.5a8.5 8.5 0 0 1-5.2-1.8c.2-.4 2.2-4 7.6-5.9l.1-.1a35 35 0 0 1 1.8 6.6 8.4 8.4 0 0 1-4.3 1.2zm5.7-2.1a36 36 0 0 0-1.6-6c2.6-.4 4.9.3 5.2.4a8.5 8.5 0 0 1-3.6 5.6z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
        </svg>
      );
  }
}
