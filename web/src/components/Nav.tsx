import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Lockup } from "@/components/Logo";
import { ArrowRight } from "@/components/ui";
import { ProductMark } from "@/components/ProductMark";
import { NAV_PRIMARY, type NavGroup, type NavLink } from "@/content/site";
import { LOCAL_SITE, type SiteContent } from "@/lib/site-content";

/* ------------------------------------------------------------------
   Header (7Span pattern). Fixed white bar; Solutions, Products and Company
   open a right-side drawer over a dark backdrop: title bar with close, a
   left rail of tabs, a promo tile bottom-left, and a scrollable stack of
   bordered group cards on the right. Opens on click, closes on backdrop,
   Escape or the X. Mobile keeps a full-screen accordion drawer.
   ------------------------------------------------------------------ */

type DrawerKey = "solutions" | "products" | "company";
type TabKey = "services" | "industries" | "hire" | "saas" | "company";

type Tab = { key: TabKey; label: string; allLabel: string; href: string; groups: NavGroup[] };

function buildDrawers(site: SiteContent): Record<DrawerKey, { title: string; tabs: Tab[] }> {
  const { services: SERVICES, industries: INDUSTRIES, hire: HIRE, products: PRODUCT_LINKS, company: COMPANY_LINKS, site: SITE } = site;
const SOLUTION_TABS: Tab[] = [
  { key: "services", label: "Services", allLabel: "All services", href: "/services", groups: SERVICES },
  { key: "industries", label: "Industries", allLabel: "All industries", href: "/industries", groups: INDUSTRIES },
  { key: "hire", label: "Hire talent", allLabel: "All roles", href: "/hire", groups: HIRE },
];
const PRODUCT_TABS: Tab[] = [
  { key: "saas", label: "SaaS", allLabel: "All products", href: "/products", groups: [{ title: "SaaS", href: "/products", items: PRODUCT_LINKS }] },
];
const COMPANY_TABS: Tab[] = [
  {
    key: "company",
    label: "Company",
    allLabel: "About Infoloop",
    href: "/about",
    groups: [
      { title: "Company", href: "/about", items: COMPANY_LINKS },
      {
        title: "Contact",
        href: "/contact",
        blurb: "We reply within one business day.",
        items: [
          { label: SITE.usSalesPhone.display, href: `tel:${SITE.usSalesPhone.tel}`, blurb: "Sales, US" },
          { label: SITE.salesPhone.display, href: `tel:${SITE.salesPhone.tel}`, blurb: "Sales, India" },
          { label: SITE.email, href: `mailto:${SITE.email}`, blurb: "Sales and new projects" },
          { label: SITE.hrPhone.display, href: `tel:${SITE.hrPhone.tel}`, blurb: "HR and careers" },
          { label: SITE.careersEmail, href: `mailto:${SITE.careersEmail}`, blurb: "Jobs" },
        ],
      },
    ],
  },
];

return {
  solutions: { title: "Solutions", tabs: SOLUTION_TABS },
  products: { title: "Products", tabs: PRODUCT_TABS },
  company: { title: "Company", tabs: COMPANY_TABS },
};
}

export function Nav({ site = LOCAL_SITE }: { site?: SiteContent } = {}) {
  const DRAWERS = useMemo(() => buildDrawers(site), [site]);
  const SITE = site.site;
  const NAV = NAV_PRIMARY.map((l) => (l.children ? { ...l, children: l.label === "Products" ? site.products : site.company } : l));
  const [drawer, setDrawer] = useState<DrawerKey | null>(null);
  const [tab, setTab] = useState<TabKey>("services");
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((key: DrawerKey, e?: React.MouseEvent<HTMLElement>) => {
    opener.current = (e?.currentTarget as HTMLElement) ?? null;
    setDrawer(key);
    setTab(DRAWERS[key].tabs[0].key);
  }, [DRAWERS]);
  const close = useCallback(() => {
    setDrawer(null);
    setMobile(false);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Scroll lock while any drawer is open; focus the close button on open
  useEffect(() => {
    document.documentElement.style.overflow = drawer || mobile ? "hidden" : "";
    if (drawer) window.setTimeout(() => closeBtn.current?.focus(), 30);
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawer, mobile]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => {
      if (mq.matches) setMobile(false);
      else setDrawer(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const current = drawer ? DRAWERS[drawer] : null;
  const activeTab = current ? current.tabs.find((t) => t.key === tab) ?? current.tabs[0] : null;
  // Top-level nav is set like 7Span: uppercase, wide tracking, small.
  const linkCls = "rounded-md px-3.5 py-2 font-display text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper";
  /* Life @ Infoloop (7Span: "Life @ 7Span" LinkedIn promo), shared by the rail and the Company panel */
  const promo = (
    <div className="mt-8">
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-ink hover:text-orange"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[4px] bg-ink text-white">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 13.2c0-3.3-1.76-4.94-4.1-4.94-1.9 0-2.75 1.04-3.22 1.78V8.5H9.75V20h3.38v-6.42c0-1.7.32-3.34 2.42-3.34 2.07 0 2.1 1.94 2.1 3.45V20h3.38l-.01-6.8z" />
          </svg>
        </span>
        Life @ Infoloop
      </a>
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Life at Infoloop on LinkedIn"
        className="mt-3 flex aspect-[16/9] items-center justify-center bg-ink px-6 text-center transition-colors hover:bg-charcoal"
      >
        <span className="font-display text-[26px] font-bold leading-none tracking-[-0.03em] text-white">
          We build. <span className="text-orange">We run.</span>
        </span>
      </a>
    </div>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-shadow ${
          scrolled ? "border-line shadow-[0_1px_0_0_rgba(10,10,10,0.04),0_8px_24px_-16px_rgba(10,10,10,0.18)]" : "border-line"
        }`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Lockup wordmarkSize={22} />

          <div className="hidden items-center gap-6 lg:flex">
          <nav aria-label="Primary" className="flex items-center gap-2">
            <button type="button" className={`inline-flex items-center ${linkCls} ${drawer === "solutions" ? "bg-paper" : ""}`} aria-expanded={drawer === "solutions"} aria-controls="site-drawer" onClick={(e) => open("solutions", e)}>
              Solutions
            </button>
            {NAV.map((l) =>
              l.children ? (
                <button
                  key={l.href}
                  type="button"
                  className={`inline-flex items-center ${linkCls} ${drawer === l.label.toLowerCase() ? "bg-paper" : ""}`}
                  aria-expanded={drawer === l.label.toLowerCase()}
                  aria-controls="site-drawer"
                  onClick={(e) => open(l.label.toLowerCase() as DrawerKey, e)}
                >
                  {l.label}
                </button>
              ) : (
                <a key={l.href} href={l.href} className={linkCls}>
                  {l.label}
                </a>
              ),
            )}
          </nav>

          <a href={SITE.bookHref} className="btn btn-primary px-5 py-3">
            {SITE.ctaLabel}
            <ArrowRight />
          </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-drawer"
            onClick={() => setMobile((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {mobile ? (
                <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] hidden bg-ink/60 transition-opacity duration-300 lg:block ${drawer ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
        onClick={close}
      />

      {/* Right-side drawer (desktop) */}
      <aside
        id="site-drawer"
        inert={!drawer}
        role="dialog"
        aria-modal="true"
        aria-label={current?.title ?? "Menu"}
        className={`fixed inset-y-0 right-0 z-[70] hidden flex-col bg-white shadow-[-24px_0_60px_-30px_rgba(10,10,10,0.5)] transition-transform duration-300 ease-[var(--ease-drawer)] lg:flex ${drawer === "company" ? "w-[min(440px,40vw)]" : "w-[min(960px,66vw)]"} ${
          drawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Title bar */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-line px-8">
          <p className="font-display text-[22px] font-bold text-ink">{current?.title}</p>
          <button ref={closeBtn} type="button" onClick={close} aria-label="Close menu" className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-paper">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {current && drawer === "company" && (
          <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto p-8">
            <ul aria-label="Company">
              {site.company.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={close} className="group flex items-center justify-between py-3.5 font-display text-[26px] font-semibold tracking-[-0.01em] text-ink hover:text-orange">
                    {l.label}
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-ink group-hover:text-orange">
                      <path d="M6 14 14 6M7 6h7v7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            {promo}
          </div>
        )}

        {current && activeTab && drawer !== "company" && (
          <div className="grid min-h-0 flex-1 grid-cols-[260px_1fr]">
            {/* Rail */}
            <div className="flex flex-col justify-between border-r border-line p-8">
              <ul className="space-y-1" aria-label={`${current.title} sections`}>
                {current.tabs.map((t) => {
                  const active = t.key === activeTab.key;
                  return (
                    <li key={t.key}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setTab(t.key)}
                        onMouseEnter={() => setTab(t.key)}
                        className={`flex w-full items-center justify-between rounded-md py-2.5 text-left font-display text-[22px] font-semibold tracking-[-0.01em] transition-colors ${
                          active ? "text-ink" : "text-ink/70 hover:text-ink"
                        }`}
                      >
                        {t.label}
                        {/* Straight when the section is open, diagonal when
                            it is not, and it has to move smoothly between the
                            two. So it is ONE straight arrow that rotates: a
                            right arrow turned -45 degrees IS the diagonal, and
                            unlike swapping two <path> shapes, a rotation is a
                            number the browser can tween. 150ms on the standard
                            curve, same as every other arrow on the site. */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className={`shrink-0 transition duration-150 ${active ? "translate-x-1 rotate-0 text-orange" : "translate-x-0 -rotate-45 text-ink/35"}`}
                        >
                          <path d="M3 10h13M11 5l5 5-5 5" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {promo}
            </div>

            {/* Right column: product rows (7Span: logo | name + line) or group cards */}
            <div className="min-h-0 overflow-y-auto p-6">
              {activeTab.key === "saas" ? (
                <>
                  <ul className="space-y-4">
                    {activeTab.groups.flatMap((g) => g.items).map((p) => (
                      <ProductRow key={p.href} item={p} onNavigate={close} />
                    ))}
                  </ul>
                  <a href={activeTab.href} className="link-arrow mt-6 inline-flex text-ink" onClick={close}>
                    {activeTab.allLabel} <ArrowRight />
                  </a>
                </>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="eyebrow text-ink/60">{activeTab.label}</p>
                    <a href={activeTab.href} className="link-arrow text-ink" onClick={close}>
                      {activeTab.allLabel} <ArrowRight />
                    </a>
                  </div>
                  <div className="space-y-4">
                    {activeTab.groups.map((g, gi) => (
                      <GroupCard key={g.title} group={g} index={gi} tab={activeTab.key} onNavigate={close} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        inert={!mobile}
        className={`fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white transition-opacity duration-200 lg:hidden ${
          mobile ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x py-6">
          {[
            { label: "Solutions", tabs: DRAWERS.solutions.tabs },
            { label: "Products", tabs: DRAWERS.products.tabs },
            { label: "Company", tabs: DRAWERS.company.tabs },
          ].map((section) => (
            <details key={section.label} className="group border-b border-line py-3">
              <summary className="flex min-h-11 items-center justify-between font-display text-[17px] font-semibold text-ink">
                {section.label}
                <Plus />
              </summary>
              <div className="mt-3 space-y-4 pb-2">
                {section.tabs.map((t) => (
                  <div key={t.key} className="rounded-md bg-paper px-4 py-3">
                    {section.tabs.length > 1 && <p className="font-display text-[15px] font-semibold text-ink">{t.label}</p>}
                    {t.groups.map((g) => (
                      <div key={g.title} className="mt-3">
                        {section.tabs.length > 1 && <p className="font-display text-[12px] font-bold uppercase tracking-wide text-ink/60">{g.title}</p>}
                        {/* 44px rows: this is the primary navigation on a
                            phone, and 28px links sit closer together than a
                            fingertip can resolve. */}
                        <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2">
                          {g.items.map((it) => (
                            <li key={it.label}>
                              <a href={it.href} className="flex min-h-11 items-center py-1 text-[15px] text-ink" onClick={close}>
                                {it.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <a href={t.href} className="link-arrow mt-1 inline-flex min-h-11 items-center text-ink" onClick={close}>
                      {t.allLabel} <ArrowRight />
                    </a>
                  </div>
                ))}
              </div>
            </details>
          ))}
          {NAV.filter((l) => !l.children).map((l) => (
            <a key={l.href} href={l.href} className="flex items-center justify-between border-b border-line py-3.5 font-display text-[17px] font-semibold text-ink" onClick={close}>
              {l.label}
              <ArrowRight className="text-ink/60" />
            </a>
          ))}
          <div className="mt-6 grid gap-3">
            <a href={SITE.bookHref} className="btn btn-primary w-full" onClick={close}>
              {SITE.ctaLabel} <ArrowRight />
            </a>
            <a href={`mailto:${SITE.email}`} className="flex min-h-11 items-center justify-center text-center text-[14px] text-ink/60">
              Prefer email? {SITE.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- */

/**
 * Product row (7Span products drawer): a bordered row with the product mark
 * on the left and the name plus one line on the right. No group heading.
 */
function ProductRow({ item, onNavigate }: { item: NavLink; onNavigate: () => void }) {
  return (
    <li>
      <a
        href={item.href}
        onClick={onNavigate}
        className="group grid grid-cols-[112px_1fr] border border-ink bg-white transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange"
      >
        <span className="flex items-center justify-center border-r border-ink p-5" aria-hidden="true">
          <ProductMark name={item.label} />
        </span>
        <span className="px-6 py-6">
          <span className="block font-display text-[19px] font-bold leading-tight text-ink group-hover:text-orange">{item.label}</span>
          {item.blurb && <span className="mt-1.5 block text-[14.5px] leading-snug text-ink/70">{item.blurb}</span>}
        </span>
      </a>
    </li>
  );
}

function GroupCard({ group, index, tab, onNavigate }: { group: NavGroup; index: number; tab: string; onNavigate: () => void }) {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 border border-ink p-7" aria-label={group.title}>
      <div className="flex flex-col justify-between">
        <div>
          {group.href ? (
            <a href={group.href} onClick={onNavigate} className="font-display text-[22px] font-bold leading-tight text-ink underline decoration-ink decoration-2 underline-offset-8 hover:text-orange">
              {group.title}
            </a>
          ) : (
            <p className="font-display text-[22px] font-bold leading-tight text-ink">{group.title}</p>
          )}
          {group.blurb && <p className="mt-2 max-w-[22ch] text-[13.5px] leading-snug text-ink/60">{group.blurb}</p>}
        </div>
        <Glyph tab={tab} i={index} />
      </div>
      <ul className="space-y-2.5">
        {group.items.map((it: NavLink) => (
          <li key={it.label}>
            <a href={it.href} onClick={onNavigate} className="block text-[15px] leading-snug text-ink decoration-orange underline-offset-4 hover:underline">
              {it.label}
              {it.blurb && <span className="block text-[12.5px] text-ink/60">{it.blurb}</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Small geometric glyphs, one per group card (7Span uses outlined shapes
    with red fills; ours use ink outlines with one orange fill). Every group
    across Services, Industries and Hire talent gets its own shape, so the
    three tabs never repeat a figure (Nimit, 2026-08-17). */
const GLYPH_OFFSET: Record<string, number> = { services: 0, industries: 4, hire: 8 };
function Glyph({ tab, i }: { tab: string; i: number }) {
  const s = { viewBox: "0 0 64 64", width: 56, height: 56, fill: "none", stroke: "#0A0A0A", strokeWidth: 1.5, "aria-hidden": true as const };
  const O = "#F47B00";
  const shapes = [
    /* Services */
    // Build: a triangle inside a triangle
    <svg key="build" {...s}><path d="M32 6 58 56H6z" /><path d="M32 30 45 56H19z" fill={O} /></svg>,
    // Grow: three rising bars, the tallest orange
    <svg key="grow" {...s}><rect x="8" y="38" width="12" height="18" /><rect x="26" y="26" width="12" height="30" /><rect x="44" y="10" width="12" height="46" fill={O} /></svg>,
    // Transform: a square becoming a circle
    <svg key="transform" {...s}><rect x="8" y="14" width="30" height="30" /><circle cx="40" cy="38" r="16" /><path d="M38 22.1 V44 H25.2 A16 16 0 0 1 38 22.1 Z" fill={O} /></svg>,
    // Consulting: a compass, one quarter lit
    <svg key="consulting" {...s}><circle cx="32" cy="32" r="24" /><path d="M32 32 V8 A24 24 0 0 1 56 32 Z" fill={O} /><circle cx="32" cy="32" r="4" fill="#0A0A0A" /></svg>,
    /* Industries */
    // Industrial and manufacturing: a sawtooth factory roof
    <svg key="manufacturing" {...s}><path d="M8 56 V30 l16 -12 v12 l16 -12 v12 l16 -12 V56 Z" /><rect x="14" y="40" width="10" height="16" fill={O} /></svg>,
    // Technology and software: nested squares
    <svg key="tech" {...s}><rect x="8" y="14" width="30" height="30" /><rect x="26" y="26" width="30" height="30" /><rect x="26" y="26" width="12" height="18" fill={O} /></svg>,
    // Commerce and consumer: a price tag
    <svg key="commerce" {...s}><path d="M8 8 h24 l24 24 -24 24 -24 -24 Z" /><circle cx="20" cy="20" r="4" fill={O} /><path d="M32 8 56 32 32 56 Z" fill={O} opacity="0.9" /></svg>,
    // Education and learning: an open book
    <svg key="education" {...s}><path d="M8 14 32 20 56 14 V50 L32 56 8 50 Z" /><path d="M32 20 V56" /><path d="M32 20 56 14 V50 L32 56 Z" fill={O} /></svg>,
    /* Hire talent */
    // Frontend: a browser window
    <svg key="frontend" {...s}><rect x="8" y="12" width="48" height="40" /><path d="M8 22 H56" /><rect x="8" y="12" width="48" height="10" fill={O} /></svg>,
    // Backend: stacked discs
    <svg key="backend" {...s}><ellipse cx="32" cy="16" rx="20" ry="7" /><path d="M12 16 V48 a20 7 0 0 0 40 0 V16" /><path d="M12 32 a20 7 0 0 0 40 0" /><path d="M12 32 a20 7 0 0 0 40 0 V48 a20 7 0 0 1 -40 0 Z" fill={O} /></svg>,
    // CMS: a grid of blocks, one filled
    <svg key="cms" {...s}><rect x="8" y="8" width="22" height="22" /><rect x="34" y="8" width="22" height="22" /><rect x="8" y="34" width="22" height="22" /><rect x="34" y="34" width="22" height="22" fill={O} /></svg>,
    // Design: a half circle on a square
    <svg key="design" {...s}><rect x="10" y="10" width="44" height="44" rx="22" /><rect x="10" y="32" width="44" height="22" fill={O} /></svg>,
    // Mobile: a phone
    <svg key="mobile" {...s}><rect x="18" y="6" width="28" height="52" rx="5" /><path d="M18 14 H46 M18 48 H46" /><circle cx="32" cy="53" r="2" fill="#0A0A0A" /><rect x="18" y="14" width="28" height="34" fill={O} /></svg>,
    // eCommerce: a shopping bag
    <svg key="ecommerce" {...s}><path d="M12 22 H52 L48 58 H16 Z" /><path d="M24 22 a8 8 0 0 1 16 0" /><path d="M12 40 H50.5 L48 58 H16 Z" fill={O} /></svg>,
  ];
  const idx = ((GLYPH_OFFSET[tab] ?? 0) + i) % shapes.length;
  return <div className="mt-8">{shapes[idx]}</div>;
}

function Plus() {
  return (
    <span className="text-ink/60 transition-transform group-open:rotate-45" aria-hidden="true">
      +
    </span>
  );
}
