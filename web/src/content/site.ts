/**
 * Site-wide constants and navigation. One source of truth for the header,
 * footer, sitemap and structured data.
 *
 * The information architecture follows the approved sitemap
 * (Documents/Solutions.pdf): Solutions (Services / Industries / Hire talent),
 * Work, Products (OpsDeck, GarageZone, LoopIQ), Blog, Company.
 *
 * Copy follows the brand book: the name is always lowercase "infoloop";
 * "Infoloop Technologies Inc." in legal lines only; sentence case for labels
 * except proper nouns.
 */

export const SITE = {
  name: "Infoloop",
  legalName: "Infoloop Technologies Inc.",
  url: "https://infoloop.co",
  // <= 60 characters
  title: "Infoloop | Custom software, AI and websites, built and run",
  // 110 to 158 characters
  description:
    "We design, build and run custom applications, AI automation and Webflow and Shopify websites for manufacturing, healthcare, SaaS and biorenewables companies.",
  tagline: "We build. We run.",
  email: "hi@infoloop.co",
  careersEmail: "careers@infoloop.co",
  salesPhone: { display: "+91 97261 81000", tel: "+919726181000" },
  hrPhone: { display: "+91 70166 74182", tel: "+917016674182" },
  usSalesPhone: { display: "+1 (773) 717-9128", tel: "+17737179128" },
  bookHref: "/contact",
  ctaLabel: "Get in touch",
  linkedin: "https://www.linkedin.com/company/infoloop-technologies/",
  checklistLabel: "AI readiness checklist",
  checklistHref: "/ai-readiness-checklist",
  areaServed: "United States",
};

/**
 * /404. Worth more attention than a 404 usually gets: redirects.mjs maps 46
 * known old URLs, so anything that reaches this page is a link we did not
 * anticipate. The copy therefore does two jobs, get the visitor moving again,
 * and ask them to tell us, because an unmapped inbound link is something we
 * want to hear about rather than lose quietly.
 */
export const NOT_FOUND = {
  eyebrow: "404",
  h1: "That page is not here [[any more]]",
  lede: "The link may be old, or we may have moved the page when we rebuilt this site. Nothing is broken on your end.",
  destinationsH2: "Try one of these instead",
  destinations: [
    { label: "Services", href: "/services", blurb: "Everything we build, grow, transform and advise on." },
    { label: "Industries", href: "/industries", blurb: "The sectors we know well enough to argue with you." },
    { label: "Hire talent", href: "/hire", blurb: "Experienced people, in weeks rather than months." },
    { label: "Work", href: "/work", blurb: "Case studies with the measured result." },
    { label: "Blog", href: "/blog", blurb: "Plain writing on software, AI and websites." },
    { label: "Sitemap", href: "/sitemap", blurb: "Every page on this site, in one list." },
  ],
  reportTitle: "Followed a link to get here?",
  reportBody: "Then something on our side is out of date and we would like to fix it. Tell us where the link was and we will sort it.",
  reportButton: "Report a broken link",
  cta: {
    h2: "Or just tell us what you are looking for",
    lede: "Describe the problem in plain words. We will point you at the right page, or tell you honestly that we are not the right firm for it.",
    button: "Talk to us",
  },
  seo: {
    title: "Page not found | Infoloop",
    description: "That page is not here any more. Links to our services, industries, hire talent, work and blog, and a way to tell us if a link brought you here.",
  },
};

export type NavLink = { label: string; href: string; blurb?: string };
export type NavGroup = { title: string; href?: string; blurb?: string; items: NavLink[] };

/** Solutions > Services, grouped Build / Grow / Transform / Consulting. */
export const SERVICES: NavGroup[] = [
  {
    title: "Build",
    href: "/solutions/build",
    blurb: "Something new, made for how you work.",
    items: [
      { label: "Custom applications", href: "/custom-software-development" },
      { label: "Enterprise applications", href: "/enterprise-application-solutions" },
      { label: "eCommerce and digital storefronts", href: "/ecommerce-development" },
      { label: "No-code and low-code solutions", href: "/low-code-no-code-development" },
      { label: "Custom web development", href: "/custom-web-development" },
      { label: "SaaS product development", href: "/saas-product-development" },
    ],
  },
  {
    title: "Grow",
    href: "/solutions/grow",
    blurb: "More out of the software you already have.",
    items: [
      { label: "UX optimization and accessibility", href: "/ui-ux-design" },
      { label: "IT strategy and process optimization", href: "/it-optimization" },
      { label: "Application maintenance and support", href: "/application-maintenance" },
      { label: "IT staff augmentation", href: "/it-staff-augmentation-services" },
    ],
  },
  {
    title: "Transform",
    href: "/solutions/transform",
    blurb: "Old software made safe, and AI that works.",
    items: [
      { label: "Legacy app modernization", href: "/legacy-app-modernization" },
      { label: "AI and advanced tech solutions", href: "/ai-and-emerging-technologies" },
    ],
  },
  {
    title: "Consulting",
    href: "/solutions/consulting",
    blurb: "A straight answer before you spend.",
    items: [
      { label: "Product consulting", href: "/product-strategy-and-management" },
      { label: "Tech consulting", href: "/technology-consulting" },
      { label: "Design consulting", href: "/ux-consulting" },
    ],
  },
];

/** Solutions > Industries. */
export const INDUSTRIES: NavGroup[] = [
  {
    title: "Industrial and manufacturing",
    items: [
      { label: "Manufacturing", href: "/industry/manufacturing" },
      { label: "Automotive and mobility", href: "/industry/automotive" },
      { label: "Agriculture and AgriTech", href: "/industry/agriculture-agritech" },
      { label: "Energy and utilities", href: "/industry/energy-utilities" },
    ],
  },
  {
    title: "Technology and software",
    items: [
      { label: "AI startups", href: "/industry/ai-startups" },
      { label: "B2B SaaS", href: "/industry/b2b-saas" },
      { label: "Enterprise software", href: "/industry/enterprise-software" },
      { label: "ISVs and technology companies", href: "/industry/isvs-technology-companies" },
    ],
  },
  {
    title: "Commerce and consumer",
    items: [
      { label: "eCommerce and retail", href: "/industry/ecommerce-retail" },
      { label: "D2C brands", href: "/industry/d2c-brands" },
      { label: "Consumer platforms", href: "/industry/consumer-platforms" },
    ],
  },
  {
    title: "Education and learning",
    items: [
      { label: "EdTech", href: "/industry/edtech" },
      { label: "Learning platforms", href: "/industry/learning-platforms" },
      { label: "Corporate training", href: "/industry/corporate-training" },
    ],
  },
];

/** Solutions > Hire talent. */
export const HIRE: NavGroup[] = [
  {
    title: "Frontend",
    items: [
      { label: "JavaScript developers", href: "/hire-javascript-developers" },
      { label: "TypeScript developers", href: "/hire-typescript-developers" },
      { label: "React developers", href: "/hire-react-developers" },
      { label: "Next.js developers", href: "/hire-nextjs-developers" },
      { label: "Nuxt.js developers", href: "/hire-nuxt-developers" },
      { label: "Vue.js developers", href: "/hire-vue-developers" },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Laravel developers", href: "/hire-laravel-developers" },
      { label: "Node.js developers", href: "/hire-nodejs-developers" },
      { label: "PHP developers", href: "/hire-php-developers" },
      { label: "NestJS developers", href: "/hire-nestjs-developers" },
    ],
  },
  {
    title: "CMS",
    items: [
      { label: "Webflow developers", href: "/hire-webflow-developers" },
      { label: "WordPress developers", href: "/hire-wordpress-developers" },
    ],
  },
  {
    title: "Design",
    items: [{ label: "Figma designers", href: "/hire-figma-designers" }],
  },
  {
    title: "Mobile",
    items: [
      { label: "Flutter developers", href: "/hire-flutter-developers" },
      { label: "Swift developers", href: "/hire-swift-developers" },
      { label: "React Native developers", href: "/hire-react-native-developers" },
    ],
  },
  {
    title: "eCommerce",
    items: [{ label: "Shopify developers", href: "/hire-shopify-developers" }],
  },
];

/** Products (SaaS). Names from the approved sitemap. */
export const PRODUCT_LINKS: NavLink[] = [
  { label: "OpsDeck", href: "/products/opsdeck", blurb: "Attendance and plant operations" },
  { label: "GarageZone", href: "/products/garagezone", blurb: "Garage and workshop management" },
  { label: "LoopIQ", href: "/products/loopiq", blurb: "Learning and testing platform" },
  { label: "Verko", href: "/products/verko", blurb: "AI governance and compliance platform" },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Career", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Technologies", href: "/technologies" },
  { label: "Trust center", href: "/trust-center" },
  { label: "Brand assets", href: "/brand-assets" },
];

/** Top-level nav after Solutions. Items with children open a small dropdown. */
export const NAV_PRIMARY: (NavLink & { children?: NavLink[] })[] = [
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products", children: PRODUCT_LINKS },
  { label: "Blog", href: "/blog" },
  { label: "Company", href: "/about", children: COMPANY_LINKS },
];

/** Footer columns mirror the menu and the approved sitemap: Services (all
    15), Industries (all 14), Hire talent, Products, Company. Built from the
    same arrays as the nav so the two can never drift apart. */
/** Footer link rows, like 7Span: Services and Industries only (all pages),
    each as a heading with the links flowing beneath. Built from the nav
    arrays so they cannot drift. */
export const FOOTER_COLUMNS: NavGroup[] = [
  { title: "Services", href: "/services", items: SERVICES.flatMap((g) => g.items) },
  { title: "Industries", href: "/industries", items: INDUSTRIES.flatMap((g) => g.items) },
];

/** Offices, shown in the footer and in the Organization schema. */
export const OFFICES = [
  {
    key: "in",
    name: "India (HQ)",
    lines: ["Suite 1101, Rajhans Skylar", "Surat 395007, Gujarat, India"],
    address: { streetAddress: "Suite 1101, Rajhans Skylar", addressLocality: "Surat", postalCode: "395007", addressRegion: "Gujarat", addressCountry: "IN" },
    contacts: [
      { label: "Sales", display: "+91 97261 81000", tel: "+919726181000" },
      { label: "HR", display: "+91 70166 74182", tel: "+917016674182" },
    ],
  },
  {
    key: "us",
    name: "United States",
    lines: ["8 The Green", "Dover, Delaware 19901, United States"],
    address: { streetAddress: "8 The Green", addressLocality: "Dover", postalCode: "19901", addressRegion: "DE", addressCountry: "US" },
    contacts: [{ label: "Sales", display: "+1 (773) 717-9128", tel: "+17737179128" }],
  },
];

/** Social profiles. LinkedIn is confirmed; confirm the other handles with the
    owner before launch. */
export const SOCIAL: { label: string; href: string; icon: "linkedin" | "x" | "instagram" | "facebook" | "youtube" | "behance" | "dribbble" | "github" }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/infoloop-technologies/", icon: "linkedin" },
  { label: "X", href: "https://x.com/infoloop", icon: "x" },
  { label: "Instagram", href: "https://www.instagram.com/infoloop", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/infoloop", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@infoloop", icon: "youtube" },
  { label: "Behance", href: "https://www.behance.net/infoloop", icon: "behance" },
  { label: "Dribbble", href: "https://dribbble.com/infoloop", icon: "dribbble" },
  { label: "GitHub", href: "https://github.com/infoloop", icon: "github" },
];

/**
 * Profiles that are Infoloop but are not social feeds, appended to the
 * Organization sameAs. The Google Business Profile URL belongs here once the
 * listing is claimed: it is the strongest signal tying this website to that
 * listing, and Google will not connect them on address alone.
 *
 * Get the URL from the Business Profile dashboard ("Share your Business
 * Profile"). It looks like https://g.page/... or a maps.app.goo.gl link.
 * Leave the array empty until the listing exists: a sameAs pointing at
 * nothing is worse than no sameAs.
 */
export const PROFILE_LINKS: string[] = [
  // "https://g.page/infoloop",
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** The proof strip. Always this exact format: orange star, bold score,
    gray platform name. Update scores quarterly. */
export const RATINGS = [
  { score: "4.9", platform: "Trustpilot" },
  { score: "4.8", platform: "Google" },
  { score: "4.7", platform: "Clutch" },
  { score: "4.7", platform: "GoodFirms" },
];
