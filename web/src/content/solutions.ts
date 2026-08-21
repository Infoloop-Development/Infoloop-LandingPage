/**
 * Solutions group pages: /solutions/build, /grow, /transform, /consulting.
 * One format for all four (7Span's service page): hero (H1, line, button,
 * proof, marquee) → what we offer → our process → why Infoloop → client
 * quotes → CTA band → other services → latest blogs. `industries`, `tech`
 * and `beforeAfter` are kept in the data for the service pages under each
 * group; the group page itself does not render them (7Span). Copy is a plain rewrite of what the
 * old site published for each service (site/src/content/pages/*.json) and
 * the landing page; only published numbers.
 */
import { SERVICES, INDUSTRIES } from "./site";
import type { TileKind } from "./work";

export type Offer = { title: string; body: string; href: string };
export type Step = { n: string; title: string; body: string };
export type Quote = { text: string; role: string; caseSlug: string };
export type TechRow = { label: string; items: string[] };
export type BeforeAfter = { title: string; before: string; after: string; href: string };
/** Hero proof panel: three published numbers and one drawn case screen (in place of 7Span's team video). */
export type Proof = { metrics: { value: string; label: string; href: string }[]; tile: TileKind; caption: string; href: string };

export type SolutionGroup = {
  slug: "build" | "grow" | "transform" | "consulting";
  name: string;
  h1: string;
  lede: string;
  button: string;
  proof: Proof;
  band: [string, string];
  offer: { h2: string; lede: string; items: Offer[] };
  process: { eyebrow: string; h2: string; lede: string; steps: Step[] };
  why: { h2: string; items: string[]; photoAlt: string };
  industries: { h2: string; lede: string };
  tech?: { h2: string; rows: TechRow[] };
  beforeAfter?: { h2: string; lede: string; items: BeforeAfter[] };
  quotes: Quote[];
  cta: { h2: string; lede: string; button: string };
  other: { h2: string };
  seo: { title: string; description: string; image?: { url: string; alt?: string }; llmSummary?: string; noindex?: boolean };
};

/** Every industry link, flat, for the "Industries we serve" chips. */
export const INDUSTRY_CHIPS = [
  ...INDUSTRIES.flatMap((g) => g.items),
  // The two ICP sectors the menu does not list yet (see the open item in the sitemap).
  { label: "Healthcare", href: "/industries#healthcare" },
  { label: "Biorenewables", href: "/industry/energy-utilities" },
];

const group = (title: string) => SERVICES.find((g) => g.title === title)!;
const offers = (title: string, bodies: Record<string, string>): Offer[] => group(title).items.map((it) => ({ title: it.label, body: bodies[it.label] ?? "", href: it.href }));

const QUOTES: Record<string, Quote> = {
  shopify: { text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.", role: "Founder, DTC brand", caseSlug: "dtc-shopify-rebuild" },
  fintech: { text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.", role: "COO, fintech scale-up", caseSlug: "fintech-support-assistant" },
  garages: { text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.", role: "Operations Director, Brightlane Auto Group", caseSlug: "brightlane-auto-group-garagezone" },
  attendance: { text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.", role: "Operations lead, manufacturer", caseSlug: "manufacturing-attendance-opsdeck" },
};

export const SOLUTIONS: SolutionGroup[] = [
  {
    slug: "build",
    name: "Build",
    h1: "Build software that fits your business and [[grows with it]]",
    lede: "From custom applications and ERP to Shopify stores, Webflow sites and SaaS products, we design, build and launch software around the way you already work, then stay to run it. Live in 4 to 8 weeks, price in writing.",
    button: "Let us build it together",
    proof: {
      metrics: [
        { value: "+38%", label: "conversion after a Shopify rebuild", href: "/work/dtc-shopify-rebuild" },
        { value: "$1.2M", label: "saved a year with ERP-connected maintenance software", href: "/work/manufacturing-erp-predictive-maintenance" },
        { value: "2.1x", label: "qualified leads from a new Webflow website", href: "/work" },
      ],
      tile: "shopify",
      caption: "Shopify rebuild for a DTC brand, live in weeks and still run by us",
      href: "/work/dtc-shopify-rebuild",
    },
    band: ["Live in 4 to 8 weeks.", "Then we run it."],
    offer: {
      h2: "What we build",
      lede: "Six ways to get something new, each made for how your business works.",
      items: offers("Build", {
        "Custom applications": "The software your staff use all day: jobs, bookings, stock, approvals, deliveries. Built around the way your team already works.",
        "Enterprise applications": "One main platform for companies with more than one site, the kind often called an ERP, joined to everything else you run.",
        "eCommerce and digital storefronts": "Shopify stores for the public and for trade buyers, connected to your stock, your accounts and your delivery partner.",
        "No-code and low-code solutions": "Websites, staff screens and automatic handoffs on Webflow and platforms like it, so you have something real in weeks.",
        "Custom web development": "Websites and web tools written in code, for when a template stops coping: pricing, logins, figures pulled from other tools.",
        "SaaS product development": "Software you sell to other businesses: sign-up, plans, monthly payments and every customer's records kept apart.",
      }),
    },
    process: {
      eyebrow: "How we work",
      h2: "Our development process",
      lede: "Four steps, scope in a week, no surprises.",
      steps: [
        { n: "01", title: "A 30-minute call", body: "You tell us the problem and how the work runs now. We tell you whether building is the right answer, whether one of our products fits, or whether to buy off the shelf." },
        { n: "02", title: "A price in writing", body: "We agree what the first version does and what it leaves out. You get the price, the date and the list of what is included before anything starts." },
        { n: "03", title: "You see it working, stage by stage", body: "We build in 4 to 8 weeks with continuous testing and security checks, and show you progress on your real data every week." },
        { n: "04", title: "Live, then looked after", body: "We take it live, watch it, fix issues fast and keep improving it, with a short report every month. Code, data and accounts stay in your name." },
      ],
    },
    why: {
      h2: "Why Infoloop for building software",
      items: ["Senior engineers from day one", "A price in writing, not a range", "Live in weeks, not quarters", "Built around your business, not a template", "Our own products, already up and running", "Security and NDAs as standard", "We stay after launch"],
      photoAlt: "Photo slot: the Infoloop team at a planning session",
    },
    industries: { h2: "Industries we serve", lede: "We work with owner-led and mid-sized companies, mostly in manufacturing, healthcare, SaaS and biorenewables, for new products, upgrades and the software behind them." },
    tech: {
      h2: "Technologies we use",
      rows: [
        { label: "Frontend", items: ["React", "Next.js", "Vue.js", "Nuxt.js", "TypeScript", "JavaScript"] },
        { label: "Backend", items: ["Node.js", "NestJS", "Laravel", "PHP"] },
        { label: "Mobile", items: ["Flutter", "React Native", "Swift"] },
        { label: "CMS and web", items: ["Webflow", "WordPress"] },
        { label: "eCommerce", items: ["Shopify"] },
        { label: "Design", items: ["Figma"] },
      ],
    },
    quotes: [QUOTES.shopify, QUOTES.fintech, QUOTES.attendance],
    cta: { h2: "Let us build software that fits your business", lede: "Tell us the job it has to do. You get a clear recommendation, a fixed scope and a price in writing.", button: "Book a free consultation" },
    other: { h2: "Other services" },
    seo: { title: "Custom software, ERP, eCommerce and SaaS | Infoloop", description: "Infoloop builds custom applications, ERPs, Shopify stores, Webflow sites and SaaS products, live in 4 to 8 weeks with a price in writing, then runs them." },
  },
  {
    slug: "grow",
    name: "Grow",
    h1: "Grow faster with better UX, [[steady support]] and the right people",
    lede: "You have built it, now let us grow it. From UX and accessibility fixes and process clean-ups to maintenance with a monthly report and developers who join your team, we help you get more from the software you already run.",
    button: "Let us grow it together",
    proof: {
      metrics: [
        { value: "90%", label: "less timesheet admin for a three-plant manufacturer", href: "/work/manufacturing-attendance-opsdeck" },
        { value: "+38%", label: "conversion after a store rebuild we still manage", href: "/work/dtc-shopify-rebuild" },
        { value: "2.1x", label: "qualified leads from a website built to rank", href: "/work" },
      ],
      tile: "attendance",
      caption: "Attendance software for a manufacturer, live in three weeks, run monthly",
      href: "/work/manufacturing-attendance-opsdeck",
    },
    band: ["A clear report.", "Every month."],
    offer: {
      h2: "What we do to grow it",
      lede: "Four services for software that is already live and already busy.",
      items: offers("Grow", {
        "UX optimization and accessibility": "We test your site the way real people use it, keyboard and screen reader included, find where they get stuck, and fix it in your real site.",
        "IT strategy and process optimization": "We sit with the people doing the work, write down how it really flows, cut the double entry and put a price on every fix.",
        "Application maintenance and support": "We look after software that is already live: watch it day and night, fix what breaks inside an agreed time, and send a plain report every month.",
        "IT staff augmentation": "Experienced developers and designers in your team in weeks. You meet every person first. They work your way, in your tools.",
      }),
    },
    process: {
      eyebrow: "How we work",
      h2: "How it works",
      lede: "Look first, fix second, then keep it that way.",
      steps: [
        { n: "01", title: "A 30-minute call", body: "You tell us what is slow, what breaks and who is stuck. We tell you what we would look at first." },
        { n: "02", title: "We look at what you really run", body: "We test the site by hand, watch the work being done, or look under the bonnet of the software. Then we rank the fixes by who is stuck." },
        { n: "03", title: "A price on each fix", body: "One page: what you get, what it costs, and how fast we respond. Nothing starts before you have it in writing." },
        { n: "04", title: "We do it, then we run it", body: "The fixes land in your real site or software. Then we keep watching, so it does not slip back, and report every month." },
      ],
    },
    why: {
      h2: "Why Infoloop for growth",
      items: ["We do the fixing, not just the telling", "Tested by hand, not just by software", "Our response times are in writing", "The report comes without you asking", "You did not have to build it with us", "The right person, not the free one", "We are still here a year later"],
      photoAlt: "Photo slot: the Infoloop support team at work",
    },
    industries: { h2: "Industries we serve", lede: "Live software in manufacturing, healthcare, SaaS and biorenewables companies, and the teams that depend on it every day." },
    quotes: [QUOTES.attendance, QUOTES.shopify, QUOTES.garages],
    cta: { h2: "Get more from what you already run", lede: "Book a review. We look at your site or software and come back with the fixes, ranked, with a price on each.", button: "Book a review" },
    other: { h2: "Other services" },
    seo: { title: "UX, support, IT strategy and staff augmentation | Infoloop", description: "Infoloop makes the software you already run work better: UX and accessibility fixes, IT strategy, support with a monthly report, developers for your team." },
  },
  {
    slug: "transform",
    name: "Transform",
    h1: "Modernize legacy software and put AI to work, [[without the risk]]",
    lede: "From old applications nobody dares change to AI that does a real job on your own data, we modernize step by step, keep the business running while we do it, and stay to run what we build.",
    button: "Let us modernize it together",
    proof: {
      metrics: [
        { value: "72%", label: "less unplanned downtime after ERP-connected maintenance software", href: "/work/manufacturing-erp-predictive-maintenance" },
        { value: "<2 min", label: "first response with an AI support assistant, down from hours", href: "/work/fintech-support-assistant" },
        { value: "11 wks", label: "to put nine garages on one platform", href: "/work/brightlane-auto-group-garagezone" },
      ],
      tile: "erp",
      caption: "Maintenance software connected to a three-plant manufacturer's ERP",
      href: "/work/manufacturing-erp-predictive-maintenance",
    },
    band: ["Step by step.", "Without stopping the business."],
    offer: {
      h2: "What we transform",
      lede: "Two services, one rule: nothing changes overnight and nothing stops working.",
      items: offers("Transform", {
        "Legacy app modernization": "Software that still runs but nobody dares touch. We take it on, get it back under control, modernize it in stages, and stay to keep it running.",
        "AI and advanced tech solutions": "AI built around your own information, with firm limits on what it may do and a person checking anything risky. Then we keep it running.",
      }),
    },
    process: {
      eyebrow: "How we work",
      h2: "Our transformation model",
      lede: "We look before we quote, and we change one thing at a time.",
      steps: [
        { n: "01", title: "A 30-minute call", body: "You tell us what the software does, who built it and what worries you. We tell you honestly whether it is worth modernizing or replacing." },
        { n: "02", title: "We look at it properly", body: "Code, data, hosting, the people who use it. For AI, your real information and the decisions it would touch. Then one written plan and one price." },
        { n: "03", title: "One step at a time", body: "We modernize the riskiest part first and keep the rest running. AI goes live on real data with a person in the loop and clear limits." },
        { n: "04", title: "Live, and then we run it", body: "We monitor, fix and improve it every month, with a short report. You can leave whenever you like; the code and accounts are yours." },
      ],
    },
    why: {
      h2: "Why Infoloop for transformation",
      items: ["We look before we quote", "Someone else's code is normal work for us", "Nothing changes overnight", "Built for the boring days, not the demo", "We will tell you when AI is the wrong answer", "The people who build it are the people who run it", "You can leave whenever you like"],
      photoAlt: "Photo slot: Infoloop engineers reviewing an older codebase",
    },
    industries: { h2: "Industries we serve", lede: "Manufacturers with old ERPs, healthcare and financial services teams with rules to keep, SaaS companies with a first version to outgrow." },
    beforeAfter: {
      h2: "Transformation: before and after",
      lede: "Measured on recent work. Details in each case study.",
      items: [
        { title: "Three-plant manufacturer, maintenance software connected to the ERP", before: "Around 12 hours of unplanned downtime a month", after: "72% less downtime, $1.2M a year saved", href: "/work/manufacturing-erp-predictive-maintenance" },
        { title: "Fintech scale-up, AI support assistant", before: "First response in hours", after: "First response under two minutes, 72% less manual support work", href: "/work/fintech-support-assistant" },
        { title: "Brightlane Auto Group, garages on one platform", before: "Nine branches booking work nine different ways", after: "One platform in 11 weeks, AI booking and reorder agents", href: "/work/brightlane-auto-group-garagezone" },
      ],
    },
    quotes: [QUOTES.fintech, QUOTES.garages, QUOTES.attendance],
    cta: { h2: "Make your old software safe to change", lede: "Book an audit. We look at what you run and come back with a plan, one price, and the first safe step.", button: "Book an audit" },
    other: { h2: "Other services" },
    seo: { title: "Legacy modernization and AI that runs every day | Infoloop", description: "Infoloop modernizes legacy software step by step without stopping the business, and builds AI on your own data with a person in control. Then we run it." },
  },
  {
    slug: "consulting",
    name: "Consulting",
    h1: "Make the right call on product, technology and design, [[before you spend]]",
    lede: "From what to build first to which platform to buy and where users give up, you get one written recommendation from the people who would build it, so you commit once and commit right.",
    button: "Let us talk it through",
    proof: {
      metrics: [
        { value: "50+", label: "projects delivered behind the advice", href: "/work" },
        { value: "6", label: "countries where software we built runs", href: "/about" },
        { value: "4.8", label: "average client rating across four review platforms", href: "/about" },
      ],
      tile: "copilot",
      caption: "AI support assistant for a fintech, shipped in five weeks after one written plan",
      href: "/work/fintech-support-assistant",
    },
    band: ["One recommendation.", "In writing."],
    offer: {
      h2: "Our consulting services",
      lede: "Three kinds of advice, each ending in a written document you can act on.",
      items: offers("Consulting", {
        "Product consulting": "More ideas than time to build them? We help you decide what to build first, what to leave out, and the one number the work has to move.",
        "Tech consulting": "A second opinion before you sign: which platform to buy, whether to build your own, which supplier to commit to, and what each costs later.",
        "Design consulting": "People sign up and then get stuck. We go through your product screen by screen, say what to fix first, and build one set of parts that keeps it tidy.",
      }),
    },
    process: {
      eyebrow: "How we work",
      h2: "Our consulting approach",
      lede: "Look first. Then one recommendation, in writing.",
      steps: [
        { n: "01", title: "A free 30-minute call", body: "You tell us the decision in front of you and the date it has to be made by. We tell you what we would need to see." },
        { n: "02", title: "We look at what you really run", body: "The tools, the data, the screens people get stuck on and how the work flows today. Not a survey; we come and look." },
        { n: "03", title: "One recommendation, in writing", body: "The plan, the order and the price. What to build first, what to buy, what to leave out, and one number to judge it by." },
        { n: "04", title: "Build it with us, or take it elsewhere", body: "The document is yours. If you want, we build what we recommended and stay to run it. If not, hand it to anyone." },
      ],
    },
    why: {
      h2: "Why Infoloop for consulting",
      items: ["The people who plan it are the people who build it", "50+ finished projects behind the advice", "You get a document, not a feeling", "We will argue for building less", "We will tell you not to build", "One price, one date, agreed first", "You can see how we got there"],
      photoAlt: "Photo slot: an Infoloop advisor with a client team",
    },
    industries: { h2: "Industries we serve", lede: "Decision makers in manufacturing, healthcare, SaaS and biorenewables companies who have to choose once and live with it." },
    quotes: [QUOTES.shopify, QUOTES.attendance, QUOTES.garages],
    cta: { h2: "Get a second opinion before you commit", lede: "A free 30-minute call. Bring the decision; leave with the questions to ask and what we would look at first.", button: "Book the call" },
    other: { h2: "Other services" },
    seo: { title: "Product, technology and design consulting | Infoloop", description: "Infoloop consulting: what to build first, a second opinion before you buy, and where people give up. One written recommendation from the people who build." },
  },
];
