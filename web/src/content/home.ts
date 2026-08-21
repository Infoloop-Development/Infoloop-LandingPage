/**
 * Landing page copy.
 *
 * Structure follows 7Span's homepage (hero, trusted-by, value props, tagline
 * band, services, process, stats, products, why us, industries, results, FAQ,
 * CTA, ratings). Tone and phrasing follow 7Span too: confident, benefit-led,
 * business language, short.
 *
 * Reader: a decision maker in manufacturing, healthcare, SaaS or
 * biorenewables. Not a CTO. So: plain words, outcomes over technology, no
 * engineering jargon, no em dashes.
 *
 * SEO / AEO / GEO rules applied on this page:
 * - One H1 that names what we do and for whom (primary keywords), followed by
 *   a real paragraph and a one-sentence definition of the company that an
 *   answer engine can quote verbatim.
 * - Every section has an H2; every card an H3. Headings say what the section
 *   is about, not just a slogan.
 * - Every service and product on the page links to its own page.
 * - FAQ answers are complete sentences (FAQPage schema is emitted from page.tsx).
 *
 * double brackets mark the phrase that gets the orange highlight, the
 * way 7Span uses red type. One highlight per headline or title.
 *
 * Every number here already appears on infoloop.co. Nothing is invented.
 */

export const HERO = {
  // Roundsite Home V1 hero, matched for length: short rating line, a
  // two-line headline (5 to 7 words), a two-line sub, one button, then three
  // rounded panels (photo | quote | photo) and a small "trusted by" line.
  rating: { score: "Rated 4.8", label: "across four review platforms" },
  h1: "We design, [[build and run]]\ndigital products.",
  lede: "Custom software, AI automation and websites for manufacturing, healthcare, SaaS and biorenewables. Live in weeks, run by us.",
  primary: { label: "Start a project", href: "/contact" },
  card: {
    quote: "We build it, launch it and keep it running. One team, one price, and a clear report every month.",
    name: "Nimit Kaneria",
    role: "Founder, Infoloop",
    leftAlt: "Photo slot: the Infoloop team at work",
    rightAlt: "Photo slot: a client site running Infoloop software",
  },
  trustedLine: "Trusted by teams in 6 countries",
};

/** Platforms we build on. Truthful stand-in for 7Span's client logo strip
    until named client logos are cleared for use. */
export const TRUST = {
  h2: "Trusted by global brands",
  sub: "Partnering with enterprises and institutions where reliability, scale and execution matter most.",
  stack: ["Webflow", "Shopify", "Stripe", "Slack", "AWS", "OpenAI", "Anthropic", "WordPress", "Next.js", "React", "Node.js", "Flutter"],
};

export const BAND_WORDS = ["We build.", "We run."];

/** Services section, 7Span style: left heading and sub, six bordered
    cards with plain bullet lists, and a hatched strip with one button. Card
    titles link to their main page; bullets link where a page exists. All
    services come from the approved sitemap. */
export const SERVICES_SECTION = {
  eyebrow: "Services",
  h2: "Services built for modern businesses.",
  lede: "From custom software to AI, modernization and growth, we help businesses build and scale with confidence. And we can keep running it after launch.",
  cta: { label: "Explore our services", href: "/services" },
  cards: [
    {
      title: "Custom applications",
      href: "/custom-software-development",
      bullets: [
        { text: "Custom software built for how you work", href: "/custom-software-development" },
        { text: "Web apps and websites", href: "/custom-web-development" },
        { text: "SaaS products, from first version to scale", href: "/saas-product-development" },
        { text: "No-code and low-code when speed matters", href: "/low-code-no-code-development" },
      ],
    },
    {
      title: "Enterprise apps and modernization",
      href: "/enterprise-application-solutions",
      bullets: [
        { text: "Enterprise apps that connect ERP, CRM and reporting", href: "/enterprise-application-solutions" },
        { text: "Modernize old software step by step", href: "/legacy-app-modernization" },
        { text: "IT strategy and process optimization", href: "/it-optimization" },
        { text: "Connect the tools you already use" },
      ],
    },
    {
      title: "AI and advanced tech",
      href: "/ai-and-emerging-technologies",
      bullets: [
        { text: "AI assistants that answer in minutes, not hours" },
        { text: "Automate reports, reminders and follow-ups" },
        { text: "Trained on your data, with a person in control" },
        { text: "Safe to use every day" },
      ],
    },
    {
      title: "eCommerce and digital storefronts",
      href: "/ecommerce-development",
      bullets: [
        { text: "Shopify stores built to sell", href: "/ecommerce-development" },
        { text: "Webflow websites that bring in leads", href: "/custom-web-development" },
        { text: "Fast, mobile-friendly and easy to edit" },
        { text: "Certified Webflow and Shopify Partners" },
      ],
    },
    {
      title: "UX optimization and accessibility",
      href: "/ui-ux-design",
      bullets: [
        { text: "Simple design people can use without training", href: "/ui-ux-design" },
        { text: "Accessible from day one" },
        { text: "Turn more visitors into customers" },
        { text: "Product, tech and design advice before you build", href: "/product-strategy-and-management" },
      ],
    },
    {
      title: "Support and dedicated teams",
      href: "/application-maintenance",
      bullets: [
        { text: "Maintenance and support with a monthly report", href: "/application-maintenance" },
        { text: "Add experienced developers in 1 to 2 weeks", href: "/it-staff-augmentation-services" },
        { text: "Or hand us the whole project" },
        { text: "Flexible, month to month" },
      ],
    },
  ],
};

export const PROCESS = {
  eyebrow: "How we work",
  h2: "Our development process.",
  lede: "A clear plan that cuts risk and delivers on time. Four steps, scope in a week, no surprises.",
  steps: [
    {
      n: "01",
      title: "Discovery and alignment",
      body: "A 30-minute call. We agree on goals, users and limits, then plan the project in a week with a price in writing.",
    },
    {
      n: "02",
      title: "Design and prototyping",
      body: "You click through a prototype before we build, so the direction is agreed early and nothing is a surprise.",
    },
    {
      n: "03",
      title: "Build and quality checks",
      body: "We build in 4 to 8 weeks with continuous testing and security checks, and show you progress every week.",
    },
    {
      n: "04",
      title: "Launch, run and improve",
      body: "We take it live, keep it running, fix issues fast and keep improving it, with a short monthly report.",
    },
  ],
};

/** Company credibility numbers. Shown as a slim strip under the trusted-by
    logos and in the About fact panel. All published on infoloop.co. */
export const COMPANY_STATS = [
  { value: "50+", label: "projects delivered" },
  { value: "6", label: "countries" },
  { value: "99.9%", label: "uptime on software we run" },
  { value: "4.8", suffix: "★", label: "average client rating" },
];

/** In-house products, 7Span style: heading, one sub line, three cards with a
    thumbnail, the product name and a description of the same length. Names
    from the approved sitemap; the descriptors (MAMS, garage system, LMS) are
    the working names. Confirm the mapping with the product owner. */
export const PRODUCTS = {
  eyebrow: "Products",
  h2: "Products",
  lede: "Our in-house products are designed to solve real problems, scale reliably and deliver measurable value.",
  cta: { label: "All products", href: "/products" },
  items: [
    {
      name: "OpsDeck",
      kicker: "Attendance management for manufacturing (MAMS)",
      tile: "attendance" as const,
      href: "/products/opsdeck",
      body: "Attendance software for plants and factories: fingerprint clock-in, error flags and payroll-ready exports.",
    },
    {
      name: "GarageZone",
      kicker: "Garage management",
      tile: "garage" as const,
      href: "/products/garagezone",
      body: "Garage software for workshops and service centers: job cards, bookings, parts, invoices and automatic reminders.",
    },
    {
      name: "LoopIQ",
      kicker: "Learning management and testing platform (LMS)",
      tile: "lms" as const,
      href: "/products/loopiq",
      body: "Learning platform for training providers: online courses, supervised tests, automatic grading and certificates.",
    },
  ],
};

export const WHY = {
  eyebrow: "Why us",
  h2: "Why choose Infoloop?",
  lede: "A technology partner built for speed, ownership and quality, without the cost and complexity of a big IT firm. And we stay after launch.",
  items: [
    {
      title: "Senior engineers from day one",
      body: "Experienced people lead your project. The people you meet are the people who build.",
      icon: "user",
    },
    {
      title: "A price in writing, not a range",
      body: "Fixed scope, timeline and price before we start. Weekly demos on your real data, so nothing drifts.",
      icon: "tag",
    },
    {
      title: "Live in weeks, not quarters",
      body: "New software live in 4 to 8 weeks. Old software modernized step by step, without stopping the business.",
      icon: "bolt",
    },
    {
      title: "Custom delivery, not templates",
      body: "Every solution is shaped around your business and your goals. Fewer layers, faster decisions.",
      icon: "grid",
    },
    {
      title: "Security and NDAs as standard",
      body: "Encrypted, access-controlled and backed up. Strict NDAs. SOC 2 in progress.",
      icon: "shield",
    },
    {
      title: "We stay after launch",
      body: "Code, data and accounts in your name from day one. Then we monitor, fix and improve it every month, with a short report to you.",
      icon: "pulse",
    },
  ],
};

export const INDUSTRIES = {
  eyebrow: "Industries",
  h2: "Software built for your industry.",
  lede: "We build for decision makers who need software that works on the shop floor, in the clinic, inside the product and at the plant.",
  cta: { label: "All industries", href: "/industries" },
  items: [
    {
      name: "Manufacturing",
      linkLabel: "Software for manufacturing",
      href: "/industry/manufacturing",
      body: "Attendance and shift tracking, production and maintenance dashboards, and reports that pull from your ERP automatically.",
      proof: "90% less timesheet admin at a three-plant manufacturer",
    },
    {
      name: "Healthcare",
      linkLabel: "Software for healthcare",
      href: "/industries#healthcare",
      body: "Patient intake and scheduling, secure portals, and AI assistants that take admin off your staff. Privacy and access control built in.",
      proof: "Secure by design: encrypted, access-controlled, backed up",
    },
    {
      name: "SaaS",
      linkLabel: "Software for SaaS companies",
      href: "/industry/b2b-saas",
      body: "Product development from first release to scale, websites that turn visitors into demos, and extra engineers when you need them.",
      proof: "2.1x more qualified leads from a new website",
    },
    {
      name: "Biorenewables",
      linkLabel: "Software for biorenewables",
      href: "/industry/energy-utilities",
      body: "Plant, field and lab data in one place, simple compliance reporting, and monitoring and automation for the operation.",
      proof: "Plant software live in weeks, run by us every month",
    },
  ],
};

/** Proof: three featured outcomes as mini case studies (descriptive H3,
    what we did, before → after, sector), three secondary outcomes, and the
    honesty line. Every figure is one already published on infoloop.co. */
export const PROOF = {
  eyebrow: "Proof, not promises",
  h2: "Real results for real businesses.",
  lede: "Numbers you can check, from recent work.",
  cta: { label: "View case studies", href: "/work" },
  featured: [
    {
      sector: "Manufacturing",
      metric: "$1.2M",
      unit: "saved a year",
      title: "$1.2M a year saved for a three-plant manufacturer",
      what: "Plant maintenance software connected to the ERP that flags a likely failure 10 to 14 days ahead.",
      before: "Around 12 hours of unplanned downtime a month",
      after: "72% less downtime",
      bar: 72,
      href: "/work/manufacturing-erp-predictive-maintenance",
    },
    {
      sector: "SaaS",
      metric: "2.1x",
      unit: "qualified leads",
      title: "2.1x more qualified leads for a software company",
      what: "A new Webflow website, built to rank and easy to edit.",
      before: "Flat organic traffic, few demo requests",
      after: "Traffic doubled, demo requests more than doubled in four months",
      bar: 100,
      href: "/work",
    },
    {
      sector: "Financial services",
      metric: "-72%",
      unit: "manual support hours",
      title: "72% less manual support work with an AI assistant",
      what: "A support assistant trained on the help center and ticket history, with a person in control.",
      before: "First response in hours",
      after: "First response under two minutes",
      bar: 72,
      href: "/work/fintech-support-assistant",
    },
  ],
  more: [
    { metric: "+38%", text: "higher conversion rate after a Shopify store rebuild for a consumer brand", href: "/work/dtc-shopify-rebuild" },
    { metric: "90%", text: "less timesheet admin with attendance software for a manufacturer, live in three weeks", href: "/work/manufacturing-attendance-opsdeck" },
    { metric: "9", text: "garages on one platform in 11 weeks for Brightlane Auto Group", href: "/work/brightlane-auto-group-garagezone" },
  ],
};

/** About block. Built for search and answer engines as much as for readers:
    an H2 that names the entity, a quotable definition paragraph, a fact panel
    (only published facts), a named founder (E-E-A-T), and internal links. */
export const ABOUT = {
  eyebrow: "About Infoloop",
  h2: "About Infoloop: one team to build and run your software.",
  paragraphs: [
    "Infoloop is a software development and IT consulting company serving businesses across the United States. We design, build and run custom software, AI assistants and automation, and Webflow and Shopify websites, with a focus on manufacturing, healthcare, SaaS and biorenewables companies.",
    "Most vendors hand over and leave. We stay: after launch we monitor, fix and improve what we built and send you a short report every month. You keep the code, the accounts and the data.",
  ],
  facts: [
    { k: "What we do", v: "Custom software, AI automation, Webflow and Shopify websites" },
    { k: "Who we serve", v: "Manufacturing, healthcare, SaaS and biorenewables companies in the US" },
    { k: "How we work", v: "Fixed price in writing, live in 4 to 8 weeks, then run by us monthly" },
    { k: "Partners", v: "Certified Webflow and Shopify Partners" },
    { k: "Reach", v: "Software running in 6 countries, 50+ projects delivered" },
    { k: "Rating", v: "4.8 average across Trustpilot, Google, Clutch and GoodFirms" },
    { k: "Response", v: "A named person replies within one business day" },
  ],
  founder: { name: "Nimit Kaneria", role: "Founder, Infoloop", note: "Talks to every new client personally on the first call." },
  links: [
    { label: "About the company", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Careers", href: "/careers" },
    { label: "Trust center", href: "/trust-center" },
  ],
};

export const FAQ = {
  eyebrow: "Questions",
  h2: "Things people ask us first.",
  lede: "Straight answers. If yours is not here, ask us on a call.",
  items: [
    {
      q: "What does Infoloop do?",
      a: "Infoloop designs, builds and runs software for businesses: custom software, AI assistants and automation, and Webflow and Shopify websites and online stores. After launch we can keep running it for you.",
    },
    {
      q: "Which industries does Infoloop work with?",
      a: "Mainly manufacturing, healthcare, SaaS and biorenewables companies, plus automotive, energy, eCommerce, education and training. If your business runs on software that needs to work every day, we are a fit.",
    },
    {
      q: "Do we need to be technical to work with you?",
      a: "No. You tell us how your business works and what needs to improve. We handle the technology and explain everything in plain English.",
    },
    {
      q: "How is Infoloop different from a typical IT vendor?",
      a: "Two things. You get a fixed price in writing before we start, and we do not hand over and leave. We monitor, fix and improve what we build and send you a short report every month.",
    },
    {
      q: "How fast can we go live?",
      a: "Planning takes about a week. Most projects are live in 4 to 8 weeks. Ready-made products and websites are usually faster.",
    },
    {
      q: "How much does custom software cost?",
      a: "Ready-made products start from $6k setup plus a monthly fee. Custom software from $15k. Websites and online stores from $4k. We confirm the price after a short call.",
    },
    {
      q: "Who owns the software?",
      a: "You do. Code, accounts, domains and data are in your name from day one, whether or not you keep us on to run it.",
    },
  ],
};

/** Final CTA band. 7Span style: one statement, one button, off to the
    contact page. No form on the landing page. */
export const CTA = {
  eyebrow: "Next step",
  h2: "Ready to build or modernize your [[software]]?",
  lede: "Tell us about your goals, challenges and roadmap. A 30-minute call, a price in writing, and a reply within one business day.",
  button: { label: "Talk to our experts", href: "/contact" },
  assurances: ["30-minute call", "A price in writing, not a range", "Reply within one business day"],
};
