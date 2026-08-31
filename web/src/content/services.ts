/**
 * Service pages (one per item in the Solutions menu), 7Span's service page
 * format thoroughly: hero (H1, line, button, proof panel, marquee) →
 * "<service> for your industry" (rounded cards on hatch) → our process →
 * why Infoloop for <service> (dark) → industries we serve (chips) →
 * technologies we use → client quotes → CTA panel → other services in the
 * same group → marquee → latest blogs → closing line. First page: Build →
 * Custom applications, the template for the rest. Copy is a plain rewrite
 * of the old site's page (site/src/content/pages/<slug>.json); numbers only
 * where published. FAQ is kept in the data for answer engines but 7Span's
 * page has no FAQ block, so it is not rendered until Nimit says so.
 */
import type { Proof, Step, Quote, TechRow } from "./solutions";

export type IndustryCard = { title: string; body: string };

export type ServiceDetail = {
  slug: string;
  group: "build" | "grow" | "transform" | "consulting";
  name: string;
  h1: string;
  lede: string;
  button: string;
  proof: Proof;
  band: [string, string];
  industryFit: { h2: string; lede: string; items: IndustryCard[] };
  process: { eyebrow: string; h2: string; lede: string; steps: Step[] };
  why: { h2: string; items: string[]; photoAlt: string };
  industries: { h2: string; lede: string };
  tech: { h2: string; rows: TechRow[] };
  quotes: Quote[];
  cta: { h2: string; lede: string; button: string };
  other: { h2: string };
  faq: { q: string; a: string }[];
  seo: { title: string; description: string; image?: { url: string; alt?: string }; llmSummary?: string; noindex?: boolean };
};

const BUILD_TECH: TechRow[] = [
  { label: "Frontend", items: ["React", "Next.js", "Vue.js", "Nuxt.js", "TypeScript", "JavaScript"] },
  { label: "Backend", items: ["Node.js", "NestJS", "Laravel", "PHP"] },
  { label: "Mobile", items: ["Flutter", "React Native", "Swift"] },
  { label: "CMS and web", items: ["Webflow", "WordPress"] },
  { label: "eCommerce", items: ["Shopify"] },
  { label: "Design", items: ["Figma"] },
];

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    slug: "custom-software-development",
    group: "build",
    name: "Custom applications",
    h1: "Custom applications built around the way your business [[already works]]",
    lede: "From staff software to customer logins and multi-site platforms, we build applications around your real work, connect them to the tools you already pay for, and stay to run them. Live in 4 to 8 weeks, price in writing.",
    button: "Request a quote",
    proof: {
      metrics: [
        { value: "11 wks", label: "to put nine garage branches on one platform", href: "/work/brightlane-auto-group-garagezone" },
        { value: "90%", label: "less timesheet admin for a three-plant manufacturer", href: "/work/manufacturing-attendance-opsdeck" },
        { value: "72%", label: "less unplanned downtime with maintenance software on the ERP", href: "/work/manufacturing-erp-predictive-maintenance" },
      ],
      tile: "garage",
      caption: "Nine garages on one platform for Brightlane Auto Group, live in 11 weeks",
      href: "/work/brightlane-auto-group-garagezone",
    },
    band: ["Built around your work.", "Run by us."],
    industryFit: {
      h2: "Custom applications built for your industry",
      lede: "We know the workflows, the connections and the record-keeping rules that are unique to each industry.",
      items: [
        { title: "Manufacturing", body: "Attendance and shift software, maintenance connected to the ERP, plant dashboards, payroll-ready exports" },
        { title: "Automotive and garages", body: "Workshop diaries, job cards, parts reorder, customer reminders across every branch" },
        { title: "Healthcare", body: "Appointment and patient portals, staff rotas, records with a full audit trail" },
        { title: "SaaS and technology", body: "Customer portals, admin screens, plans and billing, records kept apart per customer" },
        { title: "Biorenewables and energy", body: "Site and asset tracking, compliance records, reporting your auditors can read" },
        { title: "Financial services", body: "Support assistants, approval steps for money actions, customer records with a log" },
        { title: "eCommerce and D2C", body: "The software behind the store: orders, stock, delivery and accounts talking to each other" },
        { title: "Education and training", body: "Learning and testing platforms, course records, results and certificates" },
      ],
    },
    process: {
      eyebrow: "How we work",
      h2: "Our custom application process",
      lede: "Four steps, the price in writing before anything starts.",
      steps: [
        { n: "01", title: "A half-hour call", body: "You tell us the problem and how the work runs now. We tell you whether building is the right answer, whether one of our products fits, or whether to buy off the shelf." },
        { n: "02", title: "A written price before anything starts", body: "We map how your work flows today, agree what the first version does and leaves out, and put the price, the date and the list in writing." },
        { n: "03", title: "You see it working, stage by stage", body: "You get a login and try each part as it is finished. If something is wrong you find out in week three, when it is cheap to change." },
        { n: "04", title: "Live, then looked after", body: "We move your records across, train your team and go live. Then we watch it, fix things within an agreed time, and send a short report every month." },
      ],
    },
    why: {
      h2: "Why Infoloop for custom applications",
      items: ["We look after what we build", "You know the price before you say yes", "Our own products, already up and running", "You talk to the people doing the work", "50+ projects delivered in six countries", "Security and NDAs as standard", "Live in weeks, not quarters"],
      photoAlt: "Photo slot: the Infoloop team building an application with a client",
    },
    industries: { h2: "Industries we serve", lede: "Owner-led and mid-sized companies, mostly in manufacturing, healthcare, SaaS and biorenewables, for the software their staff and customers use every day." },
    tech: { h2: "Technologies we use", rows: BUILD_TECH },
    quotes: [
      { text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.", role: "Operations Director, Brightlane Auto Group", caseSlug: "brightlane-auto-group-garagezone" },
      { text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.", role: "Operations lead, manufacturer", caseSlug: "manufacturing-attendance-opsdeck" },
      { text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.", role: "COO, fintech scale-up", caseSlug: "fintech-support-assistant" },
    ],
    cta: {
      h2: "Tell us how the work runs today",
      lede: "Bring the spreadsheet, the product that does not fit, or the software nobody dares touch. One call, then a plan and a price in writing.",
      button: "Book a free consultation",
    },
    other: { h2: "Other Build services" },
    faq: [
      { q: "What will a custom application cost?", a: "There is no single price, because a small tool for one team and a platform for a whole company are different jobs. What we can promise is how you get the number: a half-hour call, then we map how your work runs, then the price, what it covers and the delivery date in writing before we build anything. If one of our products fits, that costs less and lands sooner, so we check that first. Running it afterwards is a separate monthly fee, quoted at the same time." },
      { q: "How long will it take?", a: "It depends how much of your business the application covers and how many other tools it has to talk to. You get the date in writing alongside the price, and we build in stages so you are using real parts of it well before the finish date. Brightlane, a group of nine garage branches, was live in eleven weeks." },
      { q: "What happens once it goes live?", a: "Going live is halfway, not the end. For a monthly fee we watch the software, fix problems within an agreed time, keep it safe and make a few improvements each month, with a short written report. If you would rather run it yourself, you can: you get the code, the instructions and the training either way." },
      { q: "Is the software ours to keep?", a: "Yes. The code sits in your own account and belongs to you. We build with ordinary, widely used tools and write the instructions so another team could pick it up. If you later want your own staff or another company to take over, the code, your records and the instructions go with you." },
      { q: "Should we build something, or just buy a product?", a: "Buy, if something on the market genuinely fits; it is cheaper and quicker, and we will say so on the call. Building is the right call when the way you work is what makes you money, when your team keeps a spreadsheet next to the product you already pay for, when the yearly bill climbs every time you hire, or when nothing covers the gap between two parts of your business." },
      { q: "Will it work with the tools we already use?", a: "Nearly always. Most of what we build has to talk to an accounts package, a customer list or a card payment provider, and we treat that as part of the job. If the other tool has a proper connection point we plug straight into it; if not, we pass files on a schedule. We also build what happens when a connection drops, and we tell you which of your tools will connect easily before you commit." },
    ],
    seo: { title: "Custom application development | Infoloop", description: "Custom applications built around the way your business works: staff software, customer portals and multi-site platforms. Live in 4 to 8 weeks, then run by us." },
  },
  {
    slug: "enterprise-application-solutions",
    group: "build",
    name: "Enterprise applications",
    h1: "Enterprise applications that get your tools [[talking to each other]]",
    lede: "We build the one main platform your business works from, often called an ERP, connect it to the tools you already run, and stay to keep it going. First version live in 4 to 8 weeks, price in writing.",
    button: "Request a quote",
    proof: {
      metrics: [
        {
          value: "$1.2M",
          label: "saved a year with maintenance software connected to the ERP",
          href: "/work/manufacturing-erp-predictive-maintenance"
        },
        {
          value: "72%",
          label: "less unplanned downtime across three plants",
          href: "/work/manufacturing-erp-predictive-maintenance"
        },
        {
          value: "11 wks",
          label: "to put nine garage branches on one platform",
          href: "/work/brightlane-auto-group-garagezone"
        }
      ],
      tile: "erp",
      caption: "Maintenance software connected to the ERP for a three-plant manufacturer, saving $1.2M a year",
      href: "/work/manufacturing-erp-predictive-maintenance"
    },
    band: [
      "Your tools talking.",
      "Your numbers agreeing."
    ],
    industryFit: {
      h2: "Enterprise applications built for your industry",
      lede: "We know which tools each industry already runs, what has to pass between them and which records the auditors will ask for.",
      items: [
        {
          title: "Manufacturing",
          body: "Orders, stock, maintenance and suppliers on one platform, connected to the ERP and the shop floor"
        },
        {
          title: "Automotive and garages",
          body: "One platform across every branch: job cards, parts, bookings and head-office reporting"
        },
        {
          title: "Healthcare",
          body: "Patient records, scheduling and billing joined up, with an audit trail on every change"
        },
        {
          title: "SaaS and technology",
          body: "Multi-customer platforms with each customer's records kept apart, plus admin screens for your team"
        },
        {
          title: "Biorenewables and energy",
          body: "Site, asset and compliance records in one place, with reporting your auditors can read"
        },
        {
          title: "Financial services",
          body: "Approval steps, customer records and a log of every action, connected to your core tools"
        },
        {
          title: "eCommerce and D2C",
          body: "Orders, stock, warehouse and accounts passing information between them without a spreadsheet"
        },
        {
          title: "Education and training",
          body: "Learning platforms, enrollment, results and certificates joined to your finance package"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our enterprise application process",
      lede: "Four steps, from a map of what you run to a platform we keep alive.",
      steps: [
        {
          n: "01",
          title: "A look at what you already run",
          body: "A half-hour call, then a look at your tools, records and the work to cover. Price, date and what is included come in writing: a number you can take to your board."
        },
        {
          n: "02",
          title: "One job, working end to end",
          body: "We build on your real records, not test data, and show progress every week. One job runs start to finish first, so you are judging something working, not a document."
        },
        {
          n: "03",
          title: "Move across one site at a time",
          body: "We move your records, check them line by line, train staff, then switch on one site at a time. The old software stays available, with a way back, for a full month."
        },
        {
          n: "04",
          title: "We keep it running",
          body: "The team that built it keeps it alive: watching, fixing problems within an agreed time, keeping it safe and improving it each month. One fee, one team, no handover to a stranger."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for enterprise applications",
      items: [
        "We do not hand it over and leave",
        "The price is agreed before we start",
        "We will work on someone else's software",
        "Going live without stopping work",
        "The same people from start to finish",
        "Security and NDAs as standard",
        "Live in weeks, not quarters"
      ],
      photoAlt: "Photo slot: the Infoloop team mapping a client's tools and records on a whiteboard"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Companies with more than one site, plant or branch, from manufacturing and garages to healthcare and SaaS, whose whole business depends on the software we build."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "TypeScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native"
          ]
        },
        {
          label: "Design",
          items: [
            "Figma"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      },
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      }
    ],
    cta: {
      h2: "Tools that no longer fit the company?",
      lede: "Tell us which tools you run and where the manual work sits. We will map it, say what to connect and what to replace, and put a number on each.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Build services"
    },
    faq: [
      {
        q: "What counts as an enterprise application?",
        a: "Software the whole company depends on, rather than one team's tool: order handling, stock and maintenance, supplier portals, the main platform the business works from, and the connections holding them together. You can usually spot one by four signs. Many job roles use it. More than one site or department relies on it. Other software feeds off its records. And when it stops, work stops. That last sign changes how it has to be built: careful control of who sees what, a record of every change, going live in stages and a way back stop being optional extras."
      },
      {
        q: "Do we have to replace everything, or can you connect what we already have?",
        a: "Connect first. Replace only where keeping something alive costs more than starting again. Most of this work begins by joining up the tools a company already runs, with an alert when a record fails to pass across and a log you can check afterwards. Replacing software that works is expensive and disruptive. We would rather map what you have, build a proper layer between it all, and retire only the parts that cannot be kept going. Where replacing really is the honest answer, we say so and put a price on it."
      },
      {
        q: "How is the work priced?",
        a: "We price the job, not the hour, and the figure is agreed in writing before anything starts. After a half-hour call we map the work, then put in front of you what you get, when, and for how much. If one of our own products fits, that costs less and lands sooner, and we will tell you. Running it afterwards is a separate monthly fee, quoted at the same time so the whole cost is visible from the start. Anything new you ask for later is priced on its own, so no surprise bill turns up halfway through."
      },
      {
        q: "How soon will something be working, and will we lose any working days?",
        a: "A first working version usually takes four to eight weeks. It covers one job from start to finish using your real records, so you can judge something real. How long the full move takes depends on how many sites are involved and how much history has to come across. You avoid losing working days by going live in stages rather than all at once: one site or one team moves first, the old software stays available, and there is a way back until the new one has been through a full cycle of real work."
      },
      {
        q: "What happens after it goes live?",
        a: "We run it. For one monthly fee we watch the platform, fix problems within an agreed time, keep it safe, make improvements and send you a short report on the thing it was built to change. The fee is sized to what we are keeping alive, and you can pause or stop it with notice. The team that built it is the team that runs it, so nothing is lost handing over to a help desk. If you would rather your own staff ran it, we write the instructions and train them instead."
      },
      {
        q: "Who owns it, and will you take on software we already have?",
        a: "You own the software, the records in it and the accounts it runs on. Everything is delivered into your own accounts with written instructions, so you never have to wait for us to make a change. We also take on software other people built, after a short look to see what state it is in and what it would cost to keep going. If that look says the honest answer is to rebuild rather than patch it up, we tell you, along with what each option would cost."
      }
    ],
    seo: {
      title: "Enterprise applications and ERP development | Infoloop",
      description: "One main platform for companies with more than one site: we connect the tools you already run, replace old software in stages and keep it all going."
    }
  },
  {
    slug: "ecommerce-development",
    group: "build",
    name: "eCommerce and digital storefronts",
    h1: "Online stores that sell more and [[need less admin]]",
    lede: "We build Shopify stores for the public and for trade buyers, move you off a platform you have outgrown, and connect orders to your stock, accounts and delivery firms. Live in 4 to 8 weeks, one written price.",
    button: "Price my store",
    proof: {
      metrics: [
        {
          value: "+38%",
          label: "conversion after a Shopify store rebuild for a DTC brand",
          href: "/work/dtc-shopify-rebuild"
        },
        {
          value: "2.1x",
          label: "qualified leads from a new website for a software company",
          href: "/work.html"
        },
        {
          value: "11 wks",
          label: "to put nine garage branches on one platform",
          href: "/work/brightlane-auto-group-garagezone"
        }
      ],
      tile: "shopify",
      caption: "A Shopify rebuild for a DTC brand, conversion up 38% and still run by us",
      href: "/work/dtc-shopify-rebuild"
    },
    band: [
      "Built to sell.",
      "Kept selling."
    ],
    industryFit: {
      h2: "Online stores built for your industry",
      lede: "We know how each industry sells, who buys, and what the store has to talk to behind the scenes.",
      items: [
        {
          title: "Manufacturing",
          body: "Trade portals with customer price lists, minimum orders and purchase orders, feeding your ERP and stock"
        },
        {
          title: "Automotive and garages",
          body: "Parts and accessories stores by make and model, click and collect at branch, fitting booked at checkout"
        },
        {
          title: "Healthcare",
          body: "Stores for supplies and devices with account approval, paperwork checks and repeat orders"
        },
        {
          title: "SaaS and technology",
          body: "Checkout for plans, add-ons and hardware, with subscription billing joined to your customer records"
        },
        {
          title: "Biorenewables and energy",
          body: "Bulk and contract ordering for feedstock, pellets or fuel, with delivery slots and volume pricing"
        },
        {
          title: "Financial services",
          body: "Secure checkout for paid products and memberships, card providers connected, every order logged"
        },
        {
          title: "eCommerce and D2C",
          body: "Faster pages, sharper product pages and shorter checkouts, measured against your own figures"
        },
        {
          title: "Education and training",
          body: "Course and materials stores with seat licenses, enrollment passed straight to your learning platform"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our online store process",
      lede: "Four steps, from a half-hour call to a store we look after.",
      steps: [
        {
          n: "01",
          title: "A half-hour call",
          body: "You tell us what the store has to do and what gets in the way. We ask about products, weekly orders, trade buyers and what sits behind it. Nothing to pay."
        },
        {
          n: "02",
          title: "One figure, written down",
          body: "We come back with what we will build, in what order, by when and for how much. Moving data, connections and the store are separate lines, so no surprises later."
        },
        {
          n: "03",
          title: "Build and go live",
          body: "You get a practice store to click through early, so you are never guessing. We rehearse the data move, test every old web address, and launch on the date we agreed."
        },
        {
          n: "04",
          title: "We look after it",
          body: "For a monthly fee we watch it, fix things within an agreed time, keep Shopify and its add-ons updated, and report monthly on what changed and what it did to sales."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for online stores",
      items: [
        "We are still here after launch",
        "We build the software behind the store too",
        "Orders, not just visitors",
        "Certified Shopify and Webflow Partners",
        "A price in writing before you say yes",
        "Live in weeks, not quarters",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team reviewing a Shopify store with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies selling to the public and to trade, from D2C brands to manufacturers and distributors moving orders off email."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        },
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "Design",
          items: [
            "Figma"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      }
    ],
    cta: {
      h2: "Planning a store, a move or a rebuild?",
      lede: "Whether the store is slow, trade orders arrive by email, or you have outgrown your platform, tell us on a half-hour call. We reply with one price and one date.",
      button: "Book a half-hour call"
    },
    other: {
      h2: "Other Build services"
    },
    faq: [
      {
        q: "What does a Shopify store cost?",
        a: "One agreed figure for the build, and a monthly fee for looking after it. The figure comes after a half-hour call, not before it, because it depends on how many products you sell, how many other tools the store has to talk to, and whether we are moving you from another platform. We write down the price, what it covers and the date before any work starts. Anything you add later is quoted on its own, so you decide on it rather than finding it on the final bill. The call costs nothing."
      },
      {
        q: "What happens once the store is live?",
        a: "It goes onto a monthly fee, which is the looking-after half of what we do. We watch it, fix problems within an agreed time, update Shopify and its add-ons, patch anything unsafe, make a handful of improvements, and send a written report on what changed and what it did to sales. You do not have to take it: the store is yours and your team can run it. Most clients keep us on, because a store nobody tends loses money quietly rather than obviously."
      },
      {
        q: "Can you move our store without losing our place on Google?",
        a: "Yes, and it is the part most often skipped. Before anything moves we list every web address on the current store and match each product, category and page to its new address. On launch day the old addresses point permanently at the new ones. Products, sizes and colors, customers and order history come across with them. Search positions usually wobble for a short while after any move, while Google works through the new pages. A tested list of redirects is what keeps that a wobble rather than a drop."
      },
      {
        q: "Can you handle trade customers as well as the public?",
        a: "Yes. Shopify can give business customers their own login, their own price list, minimum order quantities, purchase orders and payment terms, and we set all of it up. The usual trigger is a business selling to the public through a smart modern store while trade buyers still call or send a spreadsheet. Putting both on one platform gives you one product list, one stock figure and one flow of orders into your accounts, instead of two tools somebody has to reconcile every week."
      },
      {
        q: "When is a bespoke storefront worth the money?",
        a: "A bespoke storefront means we build the part shoppers see ourselves and leave Shopify to handle the cart, the tax and the payment. It is worth it when the front of the store has to do something a ready-made design genuinely cannot: customers configuring a complicated product to order, articles and products woven tightly together, or several brands and countries selling from one product list and one stock figure. For most stores it is not worth it, because you take on hosting and upkeep that a ready-made design gives you for nothing. We tell you which side of that line you are on before you commit."
      },
      {
        q: "Can our own staff run the store afterwards?",
        a: "Yes, and that is exactly why we build on Shopify. Products, prices, categories, wording and offers can all be changed by your team without calling a developer. At launch you get written instructions and a training session, and anything we add on top is written up in the same place. Clients who keep us on still edit their own product list day to day. What they hand to us is the watching, the updating, and the work that genuinely needs a developer."
      }
    ],
    seo: {
      title: "Shopify and eCommerce development | Infoloop",
      description: "Shopify stores for the public and trade buyers, platform moves, and orders connected to your stock and delivery. Built to sell, then looked after."
    }
  },
  {
    slug: "low-code-no-code-development",
    group: "build",
    name: "No-code and low-code solutions",
    h1: "Websites and staff tools on ready-made platforms, [[working in weeks]]",
    lede: "Not everything needs code written from scratch. We build websites, staff screens and automatic handoffs on Webflow and platforms like it, on accounts in your name. Live in weeks, the price and the licenses in writing.",
    button: "Get a price",
    proof: {
      metrics: [
        {
          value: "2.1x",
          label: "qualified leads from a new Webflow website for a software company",
          href: "/work.html"
        },
        {
          value: "+38%",
          label: "conversion after a Shopify store rebuild for a DTC brand",
          href: "/work/dtc-shopify-rebuild"
        },
        {
          value: "90%",
          label: "less timesheet admin with attendance software live in three weeks",
          href: "/work/manufacturing-attendance-opsdeck"
        }
      ],
      tile: "webflow",
      caption: "A new Webflow website for a software company: 2.1x qualified leads in four months",
      href: "/work.html"
    },
    band: [
      "Built on ready-made platforms.",
      "Working in weeks."
    ],
    industryFit: {
      h2: "No-code and low-code tools built for your industry",
      lede: "We know which platform fits each industry, where it runs out of room, and which handoffs your team needs first.",
      items: [
        {
          title: "Manufacturing",
          body: "Shift request forms, approval queues and supplier handoffs automated between the tools the plant already uses"
        },
        {
          title: "Automotive and garages",
          body: "Booking pages, service reminders and job handoffs wired to your garage software across every branch"
        },
        {
          title: "Healthcare",
          body: "Appointment request forms, intake screens and reminder steps, with records kept where your clinical tools already hold them"
        },
        {
          title: "SaaS and technology",
          body: "Marketing sites your team edits without engineers, plus lead handoffs into your CRM and demo calendar"
        },
        {
          title: "Biorenewables and energy",
          body: "Site pages, compliance forms and inspection checklists that file themselves into the right place"
        },
        {
          title: "Financial services",
          body: "Landing pages, onboarding forms and approval steps, with a person kept in the loop for any money decision"
        },
        {
          title: "eCommerce and D2C",
          body: "Shopify and Webflow storefronts, plus orders, stock and customer details passed to your other tools"
        },
        {
          title: "Education and training",
          body: "Course catalogs, enrollment forms and results handoffs into your learning platform"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our no-code and low-code process",
      lede: "Four steps, with the price and the platform licenses in writing before anything starts.",
      steps: [
        {
          n: "01",
          title: "A half-hour call",
          body: "You describe the site or the process and what goes wrong with it now. We say whether a ready-made platform fits, where it runs out of room, and what to build first."
        },
        {
          n: "02",
          title: "The price and the licenses, up front",
          body: "We write down what gets built, on which platform, by when and for how much. Platform licenses are listed separately, so you see the running cost before you commit."
        },
        {
          n: "03",
          title: "A link you can open any day",
          body: "The work goes onto a practice site you can open any time. You see pages and automatic steps as they finish. A change in week two costs less than in week six."
        },
        {
          n: "04",
          title: "Launch, then your choice",
          body: "We move the content, point old web addresses at new pages, test forms and automatic steps with real traffic, and hand over the logins. Then you run it, or we do."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for no-code and low-code tools",
      items: [
        "We say when it is the wrong tool",
        "Accounts in your name, exit written down",
        "We stay after launch",
        "Built to be found from day one",
        "Price and licenses in writing first",
        "Live in weeks, not quarters",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team building a Webflow site with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies, from manufacturing and SaaS to eCommerce and healthcare, that need a website or a working process this quarter."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        },
        {
          label: "Design",
          items: [
            "Figma"
          ]
        },
        {
          label: "Frontend",
          items: [
            "JavaScript",
            "TypeScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      }
    ],
    cta: {
      h2: "Need something working this quarter?",
      lede: "Bring the site stuck behind product work, or the process living in spreadsheets and email. One call, and you leave with a price, a date and a scope.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Build services"
    },
    faq: [
      {
        q: "When is this the wrong way to build something?",
        a: "When the rules are complicated, the information is sensitive, the volume is high, or the thing you are building is the product you sell. Ready-made platforms are good at websites, forms, simple processes and a first version of a staff screen. They get costly and fragile once you push them into heavy calculation, fine control over who sees what, or serious order volume. We tell you on the first call which side of that line you are on. If it is the wrong side, we build it properly instead."
      },
      {
        q: "What does it cost, and how do the platform fees work?",
        a: "It starts with a half-hour call. Then we write down what you get, when, and for how much, so you have the figure before any work begins rather than watching an hourly count climb. The platforms charge their own monthly license, quoted separately and paid by you, because the accounts are yours. Our price depends on how many pages there are, how many processes need automating, and how much existing content has to move. If the job changes halfway through, we re-quote the change instead of absorbing it quietly and surprising you at the end."
      },
      {
        q: "Are we stuck with the platform?",
        a: "No. The accounts are in your name and billed to you, with us added as a helper, so nothing depends on us keeping our access. Webflow lets you export the site's code, your content comes out as a spreadsheet file, and we write down every automatic step: what starts it, what it touches, what it does if it fails. Before we start we also put in writing what moving off the platform would involve, so leaving is a known piece of work, not a surprise two years on."
      },
      {
        q: "Can a site like this get found on Google?",
        a: "Yes, if it is built for it. The platform is rarely what holds a site back. Thin pages, slow pages, a structure nobody planned and wording search engines cannot make sense of are. We settle the web addresses, the headings, the page descriptions and the redirects before launch, keep the pages quick, and make sure every page your team adds later comes out just as clean. That last part matters most: the site has to hold up at the hundredth page, not just the ten we built."
      },
      {
        q: "What happens after it goes live?",
        a: "You either run it yourselves or we run it for you. If you run it, you get the logins, a recorded handover and written notes for whoever edits the site. If we run it, the monthly fee covers watching it, fixing problems within an agreed time, improvements, patches and platform updates, and a short report on what changed and what we are keeping an eye on. Building something and walking away is where most of these projects quietly fall apart, which is why we would rather stay."
      },
      {
        q: "What if we grow out of it later?",
        a: "Then we build the next version, and this one has earned its keep by showing us what to build. Real use answers questions no written brief can: which boxes nobody fills in, which step people skip, where the volume really sits. From the start we keep your content easy to take out again and write down how every process works, so the next step is a move rather than a blank page. That holds whether you go to a proper content store such as Strapi with a bespoke front, or to software written from scratch."
      }
    ],
    seo: {
      title: "No-code and low-code development | Infoloop",
      description: "Websites, staff screens and automatic handoffs on Webflow and platforms like it, on accounts in your name. Working in weeks, price and licenses in writing."
    }
  },
  {
    slug: "custom-web-development",
    group: "build",
    name: "Custom web development",
    h1: "Custom web development for websites that have [[outgrown their template]]",
    lede: "Websites and web tools written in code, for when a template stops coping: a price calculator, a login, figures from another tool. Built, connected and looked after by us. Live in 4 to 8 weeks, price in writing.",
    button: "Get a price",
    proof: {
      metrics: [
        {
          value: "+38%",
          label: "conversion after a Shopify store rebuild for a DTC brand",
          href: "/work/dtc-shopify-rebuild"
        },
        {
          value: "2.1x",
          label: "qualified leads from a new Webflow website for a software company",
          href: "/work.html"
        },
        {
          value: "11 wks",
          label: "to put nine garage branches on one platform",
          href: "/work/brightlane-auto-group-garagezone"
        }
      ],
      tile: "shopify",
      caption: "A Shopify store rebuilt for a DTC brand, conversion up 38% and paid for itself in the first quarter",
      href: "/work/dtc-shopify-rebuild"
    },
    band: [
      "Written in code.",
      "Built to do real work."
    ],
    industryFit: {
      h2: "Custom web development built for your industry",
      lede: "We know the pages, the logins and the connections a website has to carry in each industry.",
      items: [
        {
          title: "Manufacturing",
          body: "Dealer and distributor logins, product configurators, spec sheets and quote requests that land in your ERP"
        },
        {
          title: "Automotive and garages",
          body: "Online booking across every branch, service reminders, price estimates and a customer login with job history"
        },
        {
          title: "Healthcare",
          body: "Appointment booking, patient portals behind a secure login, forms with a full audit trail"
        },
        {
          title: "SaaS and technology",
          body: "Marketing sites built to rank, pricing pages, signup flows and docs your team edits without a developer"
        },
        {
          title: "Biorenewables and energy",
          body: "Site and project pages, investor and partner logins, compliance documents published on a schedule"
        },
        {
          title: "Financial services",
          body: "Calculators, application forms with approval steps, secure client areas with a record of every change"
        },
        {
          title: "eCommerce and D2C",
          body: "Storefronts and custom pages beyond the theme, price rules, stock and delivery talking to your store"
        },
        {
          title: "Education and training",
          body: "Course catalogs, enrollment and payment, learner logins linked to a learning and testing platform"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our custom web development process",
      lede: "Four steps, and you approve the price before a line of code is written.",
      steps: [
        {
          n: "01",
          title: "A half-hour call",
          body: "You tell us what the site has to do and what is in the way. We ask what you run and your deadline, then say whether this needs code at all."
        },
        {
          n: "02",
          title: "One price, agreed in writing",
          body: "We write down what is being built, what it costs and when it lands. You approve it before any code is written. Anything outside it is a conversation, not a surprise."
        },
        {
          n: "03",
          title: "Watch it being built",
          body: "Every stage goes to a practice web address you can open any time. You see real screens, not progress reports, and changes stay cheap while it is on the practice site."
        },
        {
          n: "04",
          title: "Launch, then your call",
          body: "We put it live, watch the first weeks closely and hand over the code, accounts and instructions. Then you run it yourselves, or we keep it running for a monthly fee."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for custom web development",
      items: [
        "We can keep it alive afterwards",
        "The price comes before the work",
        "We will talk you out of it",
        "All of it is yours",
        "Built for whoever comes next",
        "Live in weeks, not quarters",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team reviewing a website build with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies in manufacturing, healthcare, SaaS, eCommerce and biorenewables, whose website has to do a job, not just show pages."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js",
            "TypeScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        },
        {
          label: "Design",
          items: [
            "Figma"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      }
    ],
    cta: {
      h2: "Outgrown the template? Let us price the build",
      lede: "Show us the site that fights you, the stack of add-ons or the spreadsheet doing a job. You get an honest answer, then a price and a date in writing.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Build services"
    },
    faq: [
      {
        q: "What will a custom website cost?",
        a: "There is no price list, because the same brief can mean a four-page website or a full tool behind a login. The price depends on how many screens there are, how much thinking sits behind them, how many other tools it has to talk to, and whether existing content has to move. After a half-hour call we write down the price, what it covers and the date, and you approve that before anything is built. You are not buying hours. If our estimate is wrong, that is on us, not on a change request."
      },
      {
        q: "Should we just use a template instead?",
        a: "Start with the template. If your site is mostly pages, pictures and a blog, a Webflow build is quicker to launch and cheaper to keep, and we build those too. Code earns its cost when there is real thinking behind the pages: logins and permissions, calculations, figures arriving from another tool, or a way of organizing content the platform cannot express. The usual sign is a pile of add-ons doing something the platform was never meant to do. We tell you which side of the line you are on before you commit."
      },
      {
        q: "How long will it take?",
        a: "It depends what is being built. Most sites are live in 4 to 8 weeks, but we will not name your date before we understand the job. You get it at the end of the scoping call, in writing, next to the price, and we work to it. Longer builds are cut into releases, so something is live and useful before the whole thing is finished. If you have a hard deadline, tell us on the first call. It changes what we build first, which is worth more than a promise to type faster."
      },
      {
        q: "What happens after it goes live?",
        a: "You can take it away or leave it with us. Either way, on launch day you get the code, the hosting accounts, the passwords and a written handover. If we keep it running, the monthly fee covers watching it, fixing problems within an agreed time, small improvements, keeping everything patched, and a short monthly report on what changed and what it did. We hold 99.9% uptime across the software we run. Websites decay quietly rather than loudly, which is why this is the part most builds are missing, not an upsell."
      },
      {
        q: "Do we own it, or are we tied to you?",
        a: "You own it. The code, the domain name, the hosting and every other account are set up in your name at the start of the project, not handed over at the end when everyone is tired. We build with ordinary, widely used tools rather than something only we know, so another developer can pick it up. There is no license to renew and no per-person fee for your own website. Ending the monthly arrangement takes notice, not a negotiation."
      },
      {
        q: "Will rebuilding hurt our position on Google?",
        a: "It can, if the web addresses move and nothing catches them. Before anything is switched over we go through the current site, list every address that gets visits or has links pointing at it, and match each one to where it is going. The redirects are written and tested on the practice site, page titles and descriptions come across, and the pages that earn your traffic are rebuilt first, not last. After launch we keep watching, because problems show up in the weeks after the switch, not on the day."
      }
    ],
    seo: {
      title: "Custom web development | Infoloop",
      description: "Websites and web tools written in code, for when a template stops coping: logins, calculators, figures from other tools. Price in writing, live in weeks."
    }
  },
  {
    slug: "saas-product-development",
    group: "build",
    name: "SaaS product development",
    h1: "SaaS products you can sell and [[rely on every day]]",
    lede: "Sign-up, plans, monthly payments and every customer's records kept apart from every other customer's. We build the software you sell to other businesses, put it live and stay to run it. First version live in weeks, price in writing.",
    button: "Request a quote",
    proof: {
      metrics: [
        {
          value: "11 wks",
          label: "to put nine garage branches on one platform",
          href: "/work/brightlane-auto-group-garagezone"
        },
        {
          value: "90%",
          label: "less timesheet admin, attendance software live in three weeks",
          href: "/work/manufacturing-attendance-opsdeck"
        },
        {
          value: "<2 min",
          label: "first response with an AI support assistant, shipped in five weeks",
          href: "/work/fintech-support-assistant"
        }
      ],
      tile: "garage",
      caption: "GarageZone, our garage platform, running nine Brightlane Auto Group branches on one platform, live in 11 weeks",
      href: "/work/brightlane-auto-group-garagezone"
    },
    band: [
      "Software you sell.",
      "Software that stays up."
    ],
    industryFit: {
      h2: "SaaS products built for your industry",
      lede: "We know what buyers in each industry expect from a product before they sign up, and what their auditors ask afterwards.",
      items: [
        {
          title: "Manufacturing",
          body: "Attendance, maintenance and plant tools sold to many factories, each with its own records, users and plan"
        },
        {
          title: "Automotive and garages",
          body: "Workshop and booking platforms many garages sign up to, with per-branch access and monthly billing"
        },
        {
          title: "Healthcare",
          body: "Clinic and patient products with strict record separation, consent and a full audit trail per practice"
        },
        {
          title: "SaaS and technology",
          body: "The core product itself: sign-up, plans, billing, admin screens and a safe way to release every week"
        },
        {
          title: "Biorenewables and energy",
          body: "Site and asset tracking sold to operators, with compliance records and reports their auditors can read"
        },
        {
          title: "Financial services",
          body: "Customer-facing products with approval steps for money actions, a log of every change and a support assistant"
        },
        {
          title: "eCommerce and D2C",
          body: "Tools merchants subscribe to: stock, orders, delivery and reporting connected to their store"
        },
        {
          title: "Education and training",
          body: "Learning and testing platforms with courses, results and certificates for many schools or teams at once"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our SaaS product process",
      lede: "Four steps, and you agree the price before anyone builds.",
      steps: [
        {
          n: "01",
          title: "A 30 minute call",
          body: "You tell us what the product does, who pays for it and when you need it. We tell you what we would build first and where the risk sits."
        },
        {
          n: "02",
          title: "The price in writing before any work",
          body: "We write down the first version in full: every screen, how payments behave, what it connects to, the date and the cost. You read it and agree it, then building starts."
        },
        {
          n: "03",
          title: "You see it every week",
          body: "You get a login to a working version early and keep it. You use the real thing each week, not pictures of it, so a wrong assumption costs days, not the project."
        },
        {
          n: "04",
          title: "Live, then looked after",
          body: "We put it live, watch how it copes with real customers and fix what the first weeks show. Then a fixed monthly fee covers watching, fixes and the next round of features."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for SaaS products",
      items: [
        "The people who build it run it",
        "The hardest decision is made first",
        "Built so your own staff can run it",
        "One price, agreed in writing up front",
        "50+ projects delivered, 99.9% uptime",
        "Security and NDAs as standard",
        "First version live in weeks, not quarters"
      ],
      photoAlt: "Photo slot: the Infoloop team reviewing a SaaS product release with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Founder-led and mid-sized software companies, and operating businesses turning an in-house tool into a product other firms pay for every month."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js",
            "TypeScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow"
          ]
        },
        {
          label: "Design",
          items: [
            "Figma"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      }
    ],
    cta: {
      h2: "Thirty minutes to know what to build first",
      lede: "Bring the prototype customers are paying for, the in-house tool other firms want, or the launch date investors expect. One call, then the first version and its price in writing.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Build services"
    },
    faq: [
      {
        q: "What will it cost?",
        a: "There is no figure we can honestly put on this page. A first version with two types of user and a simple monthly charge is a different job from one with trials, upgrades and refunds on day one. What we can promise is the shape: a 30 minute call, then a written description of what we will build, the date and the price. You agree it and it does not change unless you ask for something extra, which we price in writing first. Looking after the product once it is live is a separate monthly fee, and you are free not to take it."
      },
      {
        q: "How long until the first version is live?",
        a: "You get a real date in the written scope, not a range on a web page, because the honest answer depends on how much the product must do on day one. Two things move it most: how many types of user there are and what each may see, and whether payments must handle upgrades, part-months and failed cards from the start. We usually suggest a smaller first version than you had in mind, in front of real customers in weeks, with the rest added once you can see which parts they actually use."
      },
      {
        q: "Could one of my customers ever see another customer's information?",
        a: "That is the right question, and the answer is decided by how the software is built, not by good intentions. There are two approaches. Everyone's records sit in one store with a customer stamp on every row, which is cheaper to run and fine for most products. Or each customer gets a store of their own, which costs more but answers the question a bank or a hospital will ask, and lets one large customer be moved or restored alone. We choose with you before building, write down the reason, and put the barrier in one place in the code so it cannot be forgotten in a rush."
      },
      {
        q: "What happens once it is live?",
        a: "The same team that built it can stay on for a fixed monthly fee. That covers watching the product day and night, fixing faults within response times agreed in advance, keeping everything patched and secure, a small amount of improvement work each month, and a written report on what happened and what we suggest next. You are not handed a pile of code and left to go recruiting. If you later want your own developers to take over, we write the documentation and work alongside them until they are comfortable running it alone."
      },
      {
        q: "We already have something built. Do you start again?",
        a: "We read what you have first. Something slow or untidy but sensibly put together is usually worth keeping, and the job becomes adding separate customer records, payments, access levels and a proper way to release updates around what exists. Starting again is only worth it when the records genuinely cannot be split per customer, or when the tools it was built with are no longer supported. We tell you which case you are in, and why, before we quote. If it needs rebuilding we quote it as a rebuild. We never begin one quietly under the heading of maintenance."
      },
      {
        q: "Who owns the software?",
        a: "You do. The code sits in your account from day one, and the hosting, the payment company and the web address are all in your name, with us working inside them. There is nothing of ours in the middle that you would have to keep paying for, and no setup only we can get into. If we stopped working together tomorrow you would keep everything running, along with the notes, the setup instructions and the guides we wrote as we went. We would rather be kept on because the work is good than because leaving is hard."
      }
    ],
    seo: {
      title: "SaaS product development | Infoloop",
      description: "SaaS product development for growing firms: sign-up, plans, monthly payments and separate customer records, live in weeks and run by us afterwards."
    }
  },
  {
    slug: "ui-ux-design",
    group: "grow",
    name: "UX optimization and accessibility",
    h1: "Make your website work for [[everyone who visits it]]",
    lede: "Some visitors cannot use a mouse. Some cannot see the screen. Others give up before they buy. We test your site the way they use it, fix what stops them, then retest. Price in writing before we start.",
    button: "Get your site tested",
    proof: {
      metrics: [
        {
          value: "+38%",
          label: "conversion after a Shopify store rebuild for a DTC brand",
          href: "/work/dtc-shopify-rebuild"
        },
        {
          value: "2.1x",
          label: "qualified leads from a new Webflow website for a software company",
          href: "/work.html"
        },
        {
          value: "90%",
          label: "less timesheet admin once a three-plant manufacturer's attendance software went live",
          href: "/work/manufacturing-attendance-opsdeck"
        }
      ],
      tile: "shopify",
      caption: "A Shopify store rebuilt for a DTC brand: conversion up 38%",
      href: "/work/dtc-shopify-rebuild"
    },
    band: [
      "Tested by hand.",
      "Fixed for good."
    ],
    industryFit: {
      h2: "UX and accessibility work built for your industry",
      lede: "We know which journeys matter, who gets stuck, and what customers, buyers and auditors expect of a website in each industry.",
      items: [
        {
          title: "Manufacturing",
          body: "Dealer portals, spec sheets and quote forms that work on a phone in a plant, with fewer boxes to fill"
        },
        {
          title: "Automotive and garages",
          body: "Online booking a customer finishes in one go, on any phone, with clear wording when something goes wrong"
        },
        {
          title: "Healthcare",
          body: "Appointment booking and patient forms usable by keyboard and screen reader, in plain wording"
        },
        {
          title: "SaaS and technology",
          body: "Sign-up, onboarding and pricing pages with fewer steps, and app screens tested for keyboard and read-aloud use"
        },
        {
          title: "Biorenewables and energy",
          body: "Tender, investor and compliance pages that public bodies and large buyers can use and audit"
        },
        {
          title: "Financial services",
          body: "Application and login journeys with clear errors, contrast that passes and no dead ends for assistive tools"
        },
        {
          title: "eCommerce and D2C",
          body: "Product pages and checkout with fewer fields, readable colors and a keyboard-only path to pay"
        },
        {
          title: "Education and training",
          body: "Course catalogs, enrollment and learning screens every learner can use, on every device"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our UX and accessibility process",
      lede: "Four steps, the price in writing before any fixing starts.",
      steps: [
        {
          n: "01",
          title: "A half-hour call",
          body: "You tell us the site, which journeys matter and what prompted this: a complaint, a customer email, a tender question. We say what we would test first, and whether we fit."
        },
        {
          n: "02",
          title: "We test, then rank by who is stuck",
          body: "We work through your main page types and journeys by hand, then rank each problem by who is blocked and how badly. The price and timeline go in writing before fixing begins."
        },
        {
          n: "03",
          title: "We do the fixes",
          body: "We start with anything that stops someone dead, such as a form nobody can complete. Each fix is retested against the problem it was raised for, with a before and after."
        },
        {
          n: "04",
          title: "We stop it slipping back",
          body: "It slips the moment someone adds a new page. We can check new work before it goes live, rerun the tests on a schedule you set, and report each month."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for UX and accessibility",
      items: [
        "We do the fixing, not just the telling",
        "Tested by hand, not just by software",
        "You know the price before we test",
        "The fixes land in your real site",
        "No score out of a hundred",
        "We stay to stop it slipping back",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team testing a client's website by keyboard and screen reader"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies, mostly in manufacturing, healthcare, SaaS and biorenewables, whose websites and shops have to work for every customer, buyer and auditor."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        },
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js",
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          label: "Design",
          items: [
            "Figma"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      }
    ],
    cta: {
      h2: "Find out who your site is turning away",
      lede: "Bring the complaint, the tender question or the checkout people abandon. Thirty minutes on a call, then a written list of what we would test, with the price.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Grow services"
    },
    faq: [
      {
        q: "What will this cost?",
        a: "We give you a fixed price after a half-hour call and a short look at the site. The cost depends on how many kinds of page you have and how many journeys matter, not on the total page count. A site with eight page designs and one checkout is a smaller job than a product with forty screens, even if it has more pages. Testing is priced separately from fixing, so you can hand the findings to your own developers if you prefer. Everything is in writing before we start, and staying on afterwards is quoted on its own."
      },
      {
        q: "What rules are you checking against?",
        a: "There is an internationally agreed rulebook for making websites usable by disabled people. It is called WCAG and comes in three levels: A, AA and AAA. We test against WCAG 2.2 at level AA, the level most large customers, public bodies and European law now ask for. We go through the parts that apply to your content and tell you plainly which ones your site fails and where. We are not an official body and do not hand out certificates, and you should be wary of anyone who says they can. You get an honest test, the repairs and a retest showing what changed."
      },
      {
        q: "Can a free online scanner not do this?",
        a: "No. Automatic tools reliably spot missing image descriptions, some color problems and broken code, which is genuinely useful. But they check only a minority of the rules and cannot judge whether anything makes sense to a person. A scanner will happily pass a photo described as \"image1.jpg\" and a form whose only error message is the word \"invalid\". It cannot tell you that pressing tab jumps from the top of the page straight to the footer, skipping everything a customer needs. We run the scanners first because they are quick, then test the site by hand with a keyboard and with read-aloud software."
      },
      {
        q: "Will this change how our site looks?",
        a: "Very rarely, and where there is a genuine clash we bring you choices rather than a ruling. Most repairs are invisible to someone using a mouse: headings in the right order, labels joined to the right boxes, the keyboard kept inside a pop-up while it is open, sensible names on buttons. The two that show are an outline around whatever you have selected, and a color adjustment. Where a brand color fails against its background we find the closest shade that passes and show it next to the original, so it is a small shift rather than a new palette. Your designers have the final say every time."
      },
      {
        q: "What stops it going backwards again?",
        a: "Nothing, unless somebody keeps an eye on it. It slips the first time a colleague adds a page, changes a color or drops in a new form. That is why we offer to stay on. We watch the site, repair what breaks within an agreed time, and keep it updated and improving, with a short monthly note of what we found and did. We can also check new work before it goes live, which is cheaper than fixing it after, and run the full test again as often as you want. If your team would rather handle it, we hand over the rebuilt page pieces and our test notes."
      },
      {
        q: "How long does it take?",
        a: "Testing a normal business site or shop takes a small number of weeks, because the work is set by how many page designs and journeys there are, not the page count. Repairs take longer and depend on what we find and where it lives in your site, which is why we price them after testing rather than guessing beforehand. Anything that stops someone dead, such as a checkout that cannot be finished with a keyboard, we tell you about the day we find it. We do not sit on a problem like that until the final report is ready."
      }
    ],
    seo: {
      title: "UX optimization and accessibility | Infoloop",
      description: "Some visitors cannot use your website at all: keyboard users, blind users, anyone in a hurry. We test it the way they do, fix what stops them, and retest."
    }
  },
  {
    slug: "it-optimization",
    group: "grow",
    name: "IT strategy and process optimization",
    h1: "Your team should not be [[doing the same job twice]]",
    lede: "Software bought one tool at a time leaves your staff as the glue: retyping numbers and chasing approvals. We sit with the people doing the work, write down what really happens, and price every step in writing.",
    button: "Book a call",
    proof: {
      metrics: [
        {
          value: "$1.2M",
          label: "saved a year for a three-plant manufacturer, maintenance software connected to the ERP",
          href: "/work/manufacturing-erp-predictive-maintenance"
        },
        {
          value: "90%",
          label: "less timesheet admin, attendance software live in three weeks",
          href: "/work/manufacturing-attendance-opsdeck"
        },
        {
          value: "72%",
          label: "less manual support work with an AI assistant, shipped in five weeks",
          href: "/work/fintech-support-assistant"
        }
      ],
      tile: "erp",
      caption: "$1.2M a year saved for a three-plant manufacturer by connecting maintenance software to the ERP",
      href: "/work/manufacturing-erp-predictive-maintenance"
    },
    band: [
      "Buy, build or leave alone.",
      "A price on every step."
    ],
    industryFit: {
      h2: "Process optimization built for your industry",
      lede: "We know which tools each industry runs on, where they stop talking to each other and where the retyping hides.",
      items: [
        {
          title: "Manufacturing",
          body: "Attendance, maintenance and the ERP talking to each other, plant reports without the monthly spreadsheet"
        },
        {
          title: "Automotive and garages",
          body: "One job card from booking to invoice across every branch, parts and reminders without retyping"
        },
        {
          title: "Healthcare",
          body: "Booking, records and billing joined up, approval steps with an audit trail your regulator can read"
        },
        {
          title: "SaaS and technology",
          body: "The tools behind the product: billing, support and CRM in step, one customer record instead of three"
        },
        {
          title: "Biorenewables and energy",
          body: "Site, asset and compliance records in one place, reports built once instead of every month"
        },
        {
          title: "Financial services",
          body: "Approval chains that leave email, support automation with limits and a log, one customer record"
        },
        {
          title: "eCommerce and D2C",
          body: "Store, stock, delivery and accounts passing orders along without a person in between"
        },
        {
          title: "Education and training",
          body: "Enrollment, course records and results in one flow, certificates without the manual chase"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our IT optimization process",
      lede: "Four steps, one job at a time, a price on each before it starts.",
      steps: [
        {
          n: "01",
          title: "A 30 minute call",
          body: "You describe what is slow, expensive or held together with tape, and who it hurts most. We say whether we can help and what the next step costs. No charge."
        },
        {
          n: "02",
          title: "We come and watch the work",
          body: "We sit with the people doing the job and write down the real steps: handovers, waiting, retyping, the spreadsheet quietly holding it together. As it is, not as the handbook claims."
        },
        {
          n: "03",
          title: "A verdict and a price on each job",
          body: "Job by job we mark it buy, build or leave alone, with the alternatives written beside it. Each step carries a price, so you compare numbers, not opinions."
        },
        {
          n: "04",
          title: "We build it, then we run it",
          body: "You approve each step and we build it to a set scope, date and price. Once live, we run it or hand it over with full notes. You choose before we start."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for IT strategy and process optimization",
      items: [
        "We can build what we recommend",
        "Buying is a real answer here",
        "We are still here a year later",
        "One verdict per job, not for everything",
        "A price in writing before work starts",
        "Live in weeks, not quarters",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team mapping a client's workflow on a whiteboard"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies, from manufacturing and garages to SaaS and healthcare, whose tools were bought one at a time and no longer talk to each other."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "TypeScript"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      },
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      }
    ],
    cta: {
      h2: "Bring us the job that costs you most",
      lede: "Show us the spreadsheet everyone depends on, the approval stuck in email, or the report rebuilt each month. We will tell you what it costs and what fixing it costs.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Grow services"
    },
    faq: [
      {
        q: "What does this cost?",
        a: "It starts with a 30 minute call that costs nothing. From that we size the job and come back with a set scope, date and price, so you never sign up to an open-ended day rate. The mapping work is one fixed price and covers watching the work, the verdicts and a plan with costs on it. Anything we then build is quoted separately, step by step, so you approve one job at a time and can stop whenever you want. If you want us to keep it running afterwards, that is a monthly fee sized to how much we look after."
      },
      {
        q: "Will you tell us to throw everything out?",
        a: "No, and usually you should not. Replacing everything is the most expensive answer and the one picked most often by default. For each job we ask one question first: is the tool itself failing you? Often it is not. The real problem is a missing link between two tools, a manual step nobody owns, or a report somebody rebuilds by hand every month. If the tool is fine and the process around it is not, we fix the process, which is far cheaper. We only suggest replacing something when keeping it clearly costs more than moving off it, and we show you both numbers."
      },
      {
        q: "How do you decide whether to buy something or build it?",
        a: "Three questions on each job. First, is this how you compete, or the same plumbing every company has? Second, does something you can already buy fit without bending your process out of shape? Third, who keeps it working in two years? Plumbing a product already handles should be bought. Work that is specific to how you win, or that nothing fits without painful compromise, is worth building. Anything already working and low risk should be left alone and looked after properly. The reasoning goes in writing so you can push back on it."
      },
      {
        q: "You build things too. Is that not a conflict?",
        a: "It is a fair question and we would rather answer it in the open. Every decision is written down with the alternatives we weighed and what doing nothing would cost you. That document belongs to you. Hand it to your own staff or to another supplier and it will make sense without us in the room. In practice the cheapest recommendation is very often to keep what you have and fix the process around it. We would rather say that than sell you a rebuild that quietly falls over in its second year and takes the relationship with it."
      },
      {
        q: "Who looks after it once it is live?",
        a: "This is the part most projects skip. Anything we build can go onto our monthly service: we watch it, fix what breaks within an agreed time, and keep it updated and secure. We also make small improvements and send a short report each month covering what changed and what it cost. You are not left with software nobody owns the moment the project closes. If you would rather run it yourselves, we write it all down, hand over the code and the passwords, and walk your people through it properly. Either way, that choice is made before we start, not in a rush at the end."
      },
      {
        q: "How much of our time will this take?",
        a: "Two kinds of people from your side. Somebody senior enough to agree a change in how work gets done, usually an owner, an operations director or whoever holds the money. And the people who do the job every day, because the real process is never the one in the handbook. We map in short sessions rather than all-day workshops, so a few hours from each person spread over the engagement is normally plenty. We come to you, take the notes and write everything up, so nobody on your side has to produce paperwork for us."
      }
    ],
    seo: {
      title: "IT strategy and process optimization | Infoloop",
      description: "Your staff type the same information into three tools. We map how the work really flows, cut the double entry, and put a price in writing on every fix."
    }
  },
  {
    slug: "application-maintenance",
    group: "grow",
    name: "Application maintenance and support",
    h1: "Application maintenance that keeps your live software [[working every day]]",
    lede: "We look after software that is already live, ours or someone else's. We watch it day and night, fix what breaks inside an agreed time, keep it safe and up to date, and send a plain report every month.",
    button: "Get a support quote",
    proof: {
      metrics: [
        {
          value: "+38%",
          label: "conversion after a Shopify rebuild we still look after",
          href: "/work/dtc-shopify-rebuild"
        },
        {
          value: "<2 min",
          label: "first response from an AI support assistant we shipped and still run",
          href: "/work/fintech-support-assistant"
        },
        {
          value: "90%",
          label: "less timesheet admin for a manufacturer we report to every month",
          href: "/work/manufacturing-attendance-opsdeck"
        }
      ],
      tile: "shopify",
      caption: "A Shopify store rebuilt for a DTC brand, conversion up 38%, still looked after by us",
      href: "/work/dtc-shopify-rebuild"
    },
    band: [
      "Watched, fixed and updated.",
      "So it keeps working."
    ],
    industryFit: {
      h2: "Application maintenance for your industry",
      lede: "We know which parts of each industry's software cannot go down, and what has to be kept on record.",
      items: [
        {
          title: "Manufacturing",
          body: "Attendance, shift and maintenance software kept running across every plant, updates applied outside production hours"
        },
        {
          title: "Automotive and garages",
          body: "Workshop diaries and job-card platforms watched across every branch, fixed before the morning rush"
        },
        {
          title: "Healthcare",
          body: "Patient portals and staff rotas kept safe and up to date, every change logged for the audit trail"
        },
        {
          title: "SaaS and technology",
          body: "Customer portals and admin screens watched round the clock, security updates applied on a schedule"
        },
        {
          title: "Biorenewables and energy",
          body: "Site and asset tracking tools kept running, backups tested, compliance records intact"
        },
        {
          title: "Financial services",
          body: "Support assistants and customer records watched for behavior as well as uptime, with a way to undo any change"
        },
        {
          title: "eCommerce and D2C",
          body: "Shopify stores and the order, stock and delivery software behind them, watched so checkout never stops quietly"
        },
        {
          title: "Education and training",
          body: "Learning and testing platforms kept up to date through term time, with results and certificates safe"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our application maintenance process",
      lede: "Four steps, and the price in writing before we take anything on.",
      steps: [
        {
          n: "01",
          title: "Half an hour on the phone",
          body: "Tell us what you have, what it does for the business and what has gone wrong before. We ask what an hour of downtime really costs you. No forms, no charge."
        },
        {
          n: "02",
          title: "We look under the hood",
          body: "We take access, read how it was built, find where it is hosted and what it talks to, and write it down. Problems already there come out now, not in an emergency."
        },
        {
          n: "03",
          title: "One page: what you get, what it costs",
          body: "Response times for each level of seriousness, improvement hours a month, what is covered, what is not, and the price. One page in plain words, and nothing changes unless you agree."
        },
        {
          n: "04",
          title: "Then we look after it",
          body: "The watching starts, the updates start, your improvement hours start and the report lands every month. If your software outgrows the agreement we tell you and rework it instead of cutting corners."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for maintenance and support",
      items: [
        "Looking after software is half our business",
        "Response times agreed in writing",
        "We take on software others built",
        "We already look after AI in daily use",
        "A price in writing before you pay",
        "99.9% uptime on software we run",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team walking a client through their monthly report"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies, mostly in manufacturing, healthcare, SaaS and biorenewables, whose software is live and needs someone to own it."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js",
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native",
            "Swift"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      },
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      }
    ],
    cta: {
      h2: "Tell us who is watching your software",
      lede: "Bring the software nobody owns, the site nobody updates, or the one person who holds it all. One call, then a written price and agreed response times.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Grow services"
    },
    faq: [
      {
        q: "What will this cost?",
        a: "It depends on what you have, where it is hosted, how fast you need us to react and how many improvement hours you want each month. There is no price list, because a marketing website and an AI assistant that talks to your customers are not the same job. The route to a number is always the same: half an hour on the phone, then a written price with a fixed list of what is covered before any work starts. The agreement also says what is not covered and what happens if your software grows past it. You are never charged for anything you did not agree to first."
      },
      {
        q: "How fast do you react when something breaks?",
        a: "You agree the times with us before you start paying. They are set by how serious the problem is, so software that is down completely is treated differently from a page that looks a bit wrong. Those timings go into the agreement rather than being argued over in the middle of a crisis. Because we are watching your software, the alert reaches us first, so we can be working on the problem before anyone on your side has noticed. Every incident goes into your monthly report, so over time you can check for yourself whether we hit the times we promised."
      },
      {
        q: "We are about to launch. When does the looking after begin?",
        a: "Straight away, with no gap. If we built it, the watching is switched on before you go live, so your first day in the real world is already covered. There is never a stretch where your software is out there and nobody is responsible for it. If somebody else built it, we start with a handover: we take access, read through the work, and find out where it is hosted and what it connects to. Then we write down what we found, including anything that already worries us. The response times and improvement hours begin once that is done and you have seen our findings."
      },
      {
        q: "Will you look after something another company built?",
        a: "Yes. We take on software other firms built, including work the original agency has finished with and moved on from. We start by looking at what is there: what it is built from, where it is hosted, what is out of date, what nobody wrote down and what looks fragile. You get that assessment in plain words before you commit to anything, including what we think should be fixed first and in what order. If the honest answer is that it needs rebuilding rather than patching, we will say so, even though it is not the cheaper answer or the one you were hoping for."
      },
      {
        q: "What is in the monthly report?",
        a: "How much of the month your software was up and working. Anything that went wrong, what caused it and how we sorted it out. The repairs we made. The security updates we applied. The improvement work we did, set against the hours you had available. And what we suggest doing next. It is written as sentences a business owner can read, not a list of ticket numbers. It arrives on the same schedule every month without you asking. That is the point: you should be able to see what your money bought without chasing anybody."
      },
      {
        q: "Can you look after AI tools too, not just websites?",
        a: "Yes. We put AI assistants to work for clients, and looking after them afterwards is part of the same job. It is a little different from looking after ordinary software, which either works or does not. AI can slowly start behaving differently when the wording behind it, the underlying model or the information it draws on changes. So we watch how it answers as well as whether it is switched on, keep firm limits on what it is allowed to do, and any change to it can be undone. We also look after Webflow and Shopify sites, and anything we have built ourselves."
      }
    ],
    seo: {
      title: "Application maintenance and support | Infoloop",
      description: "We look after software that is already live: watched day and night, fixed inside agreed times, kept up to date, with a plain report every month."
    }
  },
  {
    slug: "it-staff-augmentation-services",
    group: "grow",
    name: "IT staff augmentation",
    h1: "Experienced developers on your team in weeks, [[not months]]",
    lede: "You have work waiting and nobody free to do it. We add experienced developers, designers and specialists to your team, in your tools, on your daily calls. You meet every person first. They start in 1 to 2 weeks.",
    button: "Request developers",
    proof: {
      metrics: [
        {
          value: "<2 min",
          label: "first response with an AI support assistant, shipped in five weeks",
          href: "/work/fintech-support-assistant"
        },
        {
          value: "+38%",
          label: "conversion after a Shopify store rebuild for a DTC brand",
          href: "/work/dtc-shopify-rebuild"
        },
        {
          value: "11 wks",
          label: "to put nine garage branches on one platform",
          href: "/work/brightlane-auto-group-garagezone"
        }
      ],
      tile: "copilot",
      caption: "AI support assistant for a fintech scale-up, shipped in five weeks and running ever since",
      href: "/work/fintech-support-assistant"
    },
    band: [
      "Your tools, your rules.",
      "Our people, in weeks."
    ],
    industryFit: {
      h2: "Developers who already know your industry",
      lede: "We match people to your industry, so they arrive knowing the workflows, the tools and the record-keeping rules you work under.",
      items: [
        {
          title: "Manufacturing",
          body: "Developers for attendance, shift and maintenance software, ERP connections and plant dashboards"
        },
        {
          title: "Automotive and garages",
          body: "Builders for booking, job card and parts tools that work the same across every branch"
        },
        {
          title: "Healthcare",
          body: "Developers used to patient portals, staff schedules and records that keep a full audit trail"
        },
        {
          title: "SaaS and technology",
          body: "Product engineers and designers who join your sprint, ship features and clear the backlog"
        },
        {
          title: "Biorenewables and energy",
          body: "People for site and asset tracking, compliance records and reporting your auditors can read"
        },
        {
          title: "Financial services",
          body: "AI and backend engineers for support assistants, approval steps and customer records with a log"
        },
        {
          title: "eCommerce and D2C",
          body: "Shopify builders and developers for the store, and the stock, delivery and accounts behind it"
        },
        {
          title: "Education and training",
          body: "Developers for learning and testing platforms, course records, results and certificates"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our staff augmentation process",
      lede: "Four steps, the rate and the notice period in writing before anyone starts.",
      steps: [
        {
          n: "01",
          title: "Tell us what is stuck",
          body: "Half an hour on the phone: the work, what it runs on, how senior a person you need, and for how long. If a fixed project fits better, we say so."
        },
        {
          n: "02",
          title: "You meet the people",
          body: "We put forward named people with the right experience, not a list of who is free. You interview each one and set your own test. Say no, and we go again."
        },
        {
          n: "03",
          title: "Settling them in",
          body: "Before day one we agree logins, hours and who they answer to. They join your daily calls, job list and reviews. Their first work passes the same checks as everyone else's."
        },
        {
          n: "04",
          title: "Carry on, change it, or stop",
          body: "We meet on a fixed schedule: what is done, what is stuck, whether the skills still fit. Add or drop people, or stop on agreed notice. Nothing leaves in someone's head."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for extra developers",
      items: [
        "The right person, not the free one",
        "They work your way, not ours",
        "They build products, not just fill seats",
        "Everything is written down as they go",
        "The rate and notice period in writing",
        "On your team in 1 to 2 weeks",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: an Infoloop developer on a daily call with a client team"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies, mostly in manufacturing, healthcare, SaaS and biorenewables, whose teams have more work than people to do it."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js",
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native",
            "Swift"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        },
        {
          label: "Design",
          items: [
            "Figma"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      }
    ],
    cta: {
      h2: "You have the work. We have the people.",
      lede: "You get named people to interview, a rate and a notice period in writing, and no obligation to take anyone we put forward. We reply within one business day.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Grow services"
    },
    faq: [
      {
        q: "People call this staff augmentation. What does it actually mean?",
        a: "It is a clumsy phrase for a simple thing. Individual people join the team you already have, instead of you hiring them. They answer to your manager, work through your job list and use your tools. You decide what gets done first and what counts as finished. Handing a whole project to an agency is the opposite: you describe the end result and they run it their way. Infoloop does both, and on the first call we tell you which fits. A working team with a gap: extra people is faster. No team and a clear thing to build: a fixed project is the better deal."
      },
      {
        q: "What does it cost, and how does it work?",
        a: "You pay a monthly amount per person. It depends on the job, how senior the person is and how long you need them. We do not publish a price list, because a senior AI engineer and a website builder are not the same purchase, and six weeks is not a year. The path is always the same: half an hour on the phone, then a written agreement with the job, the rate, the start date and the notice period, all agreed before anyone starts. Interviewing people costs nothing. You can add people, drop people or stop, on the notice you agreed at the start."
      },
      {
        q: "How do you check people are good, and what if one is not right?",
        a: "Everyone we put forward has been assessed on real work: a proper technical conversation, things they have built before, and how they behave when their work is picked apart in review. Then you interview them yourself and set your own test if you want to. Saying no costs nothing and slows nothing down: we bring you someone else. If a person starts and it is not working, tell us early. We replace them at our cost, and we make sure what they knew is written up, so the next person does not start from a blank page."
      },
      {
        q: "Will they work with the tools and security rules we already have?",
        a: "Yes, that is the whole point. They work in your tools, your job list, your Slack or Teams, your review rules and your own definition of finished. They get access only to what they need, agreed before day one. Confidentiality agreements are signed by us and by the individual. We follow your own joining and security checks rather than asking for an exception. If your setup is one we do not know well, we tell you, instead of putting someone in to learn it at your expense. Working hours, and how much of the day they overlap with yours, are agreed in writing up front."
      },
      {
        q: "What happens when it ends?",
        a: "Two things are settled before anyone leaves. Everything they knew is written up: the code, the decisions they made, the instructions for keeping things running, and anything unfinished. And there is a period afterward when your team can still ask them questions. Nothing walks out of the door in someone's head. After that you choose. Your own team can pick it up, or we carry on looking after it for a monthly fee: watching it, fixing what breaks within agreed times, applying security updates, making improvements and sending you a report each month."
      },
      {
        q: "Who employs these people, and who owns the work they do?",
        a: "The people are employed and paid by Infoloop Technologies Inc, so you carry no employment risk and no payroll to run. You own the code and everything else they produce from the first day. It is written into the agreement at the start, not argued over at the end when you are in a weaker position. Everything lives in your accounts and your tools, never in ours. We work across six countries, so how many hours of the day they overlap with your own team is agreed up front rather than discovered in week two."
      }
    ],
    seo: {
      title: "IT staff augmentation services | Infoloop",
      description: "Add experienced developers and designers to your team in 1 to 2 weeks. You meet every person first, and they work in your tools, your way. Rate in writing."
    }
  },
  {
    slug: "legacy-app-modernization",
    group: "transform",
    name: "Legacy app modernization",
    h1: "Old software nobody dares touch, made [[safe to change again]]",
    lede: "It works, but the person who built it has gone and every change feels like a risk. We read the code, get it back under control and stay to run it. Risks and price in writing before we start.",
    button: "Book a free call",
    proof: {
      metrics: [
        {
          value: "$1.2M",
          label: "saved a year with maintenance software connected to an existing ERP",
          href: "/work/manufacturing-erp-predictive-maintenance"
        },
        {
          value: "11 wks",
          label: "to move nine garage branches onto one platform",
          href: "/work/brightlane-auto-group-garagezone"
        },
        {
          value: "90%",
          label: "less timesheet admin after attendance software went live in three weeks",
          href: "/work/manufacturing-attendance-opsdeck"
        }
      ],
      tile: "erp",
      caption: "Maintenance software connected to a three-plant manufacturer's existing ERP, saving $1.2M a year",
      href: "/work/manufacturing-erp-predictive-maintenance"
    },
    band: [
      "Fixed in small steps.",
      "Never switched off."
    ],
    industryFit: {
      h2: "Legacy software modernized for your industry",
      lede: "We know the old tools, the connections and the record-keeping rules that each industry has grown up around.",
      items: [
        {
          title: "Manufacturing",
          body: "Old plant and stock software brought up to date, connected to the ERP, records tidied and kept live through every shift"
        },
        {
          title: "Automotive and garages",
          body: "Aging workshop and booking tools upgraded one piece at a time, with every branch still taking jobs while we work"
        },
        {
          title: "Healthcare",
          body: "Out-of-date patient and staff scheduling software patched, checked and moved to supported hosting, with the audit trail kept intact"
        },
        {
          title: "SaaS and technology",
          body: "Early versions of your product on frameworks that lost support, upgraded release by release without breaking paying customers"
        },
        {
          title: "Biorenewables and energy",
          body: "Site and compliance tools built by a contractor who has left, read, documented and made safe to change again"
        },
        {
          title: "Financial services",
          body: "Customer and approval software brought up to date, with automatic checks around the paths where a failure costs money"
        },
        {
          title: "eCommerce and D2C",
          body: "Old order, stock and store software connected to Shopify and modern tools instead of rebuilt from nothing"
        },
        {
          title: "Education and training",
          body: "Course and results platforms on old versions upgraded step by step, with student records moved on a practice copy first"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our legacy modernization process",
      lede: "Four steps, and we read the software before we quote.",
      steps: [
        {
          n: "01",
          title: "A half-hour call, free",
          body: "Tell us what the software does, what breaks and what you want to change. We say whether it is worth saving or better replaced. No charge, no obligation."
        },
        {
          n: "02",
          title: "We look at it properly",
          body: "We take read-only access to the code and where it runs, spend a fixed few days on it, and write up the risks in order and the cost of each route."
        },
        {
          n: "03",
          title: "One price, agreed before we start",
          body: "You pick a route from the report. We turn it into a written plan with dates and one price. Nothing begins until you say yes, and extras are priced first."
        },
        {
          n: "04",
          title: "We do the work, then look after it",
          body: "Changes go out in small releases, never one long silence, and each can be undone. Then you take it in-house, or we stay and keep it running month to month."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for modernizing old software",
      items: [
        "We are still here next year",
        "Someone else's code is normal work",
        "We look before we quote",
        "Nothing changes overnight",
        "You can leave whenever you like",
        "A price in writing, not a range",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team reading an older codebase with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies in manufacturing, healthcare, SaaS, energy and beyond, whose day-to-day software has outlived the people who built it."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "WordPress",
            "Webflow"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      },
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      }
    ],
    cta: {
      h2: "Find out what your old software really needs",
      lede: "Been quoted a rebuild and flinched? Bring the software the last developer left behind and get a second opinion: the cost of fixing next to the cost of replacing.",
      button: "Get a second opinion"
    },
    other: {
      h2: "Other Transform services"
    },
    faq: [
      {
        q: "Should we fix what we have or start again?",
        a: "Whichever the report supports. Starting again is right when the way your records are stored is wrong at the root, when there is nothing left to upgrade to, or when the business has changed so much that the software fights every request. Otherwise fixing what you have is cheaper and safer: it already copes with years of odd cases nobody wrote down, and anything new must learn them again. We read the code, then put both routes in writing with a price on each, and you choose. We will say when a rebuild is not needed, even though it would be the bigger job for us."
      },
      {
        q: "What will it cost and how do you charge?",
        a: "In two parts. First, a paid look at what you have: we take access, spend a set number of days on it and hand you a written report with the risks in order and a price against each option. That part is deliberately small, and the report is yours whether or not you carry on. Second, the work itself, at one price agreed before it begins. We do not bill open-ended hours. If you ask for something extra part way through, we price it and you say yes before we do it. Looking after the software afterward is a separate monthly fee."
      },
      {
        q: "Will our software keep working while you fix it?",
        a: "Yes. We work in small releases rather than disappearing for months. When we replace a part, the new version goes in behind the screens your staff already use, so they carry on as normal until it has proved itself, then that one piece swaps over. There is no single night when everything moves at once. Before we move any of your records we run the whole thing on a copy first, check the result and keep a tested way back ready in case."
      },
      {
        q: "What happens when the work is finished?",
        a: "Your choice. Everything sits in your own accounts from the start, with instructions, notes and passwords handed over, so walking away with it is clean. Or we stay on for a monthly fee and look after it: watching it, fixing what breaks within an agreed time, keeping it patched, making small improvements and sending you a short report each month. Software that has just been brought up to date goes stale again if nobody owns it. The monthly arrangement exists so that somebody does."
      },
      {
        q: "How much access do you need, and is our information safe?",
        a: "To look at the software we need to read the code and see enough of where it runs to understand how it is set up and where your information lives. Read-only is enough at that stage. To do the work we need to write to a code store and a test copy. We work inside your accounts, not ours, so you can cut our access off at any moment and nothing depends on us holding it. We do not need your real customer information: a copy with names and details scrambled is enough, and that is what we ask for first. NDAs are standard."
      },
      {
        q: "Ours has no instructions and no tests. Is that a problem?",
        a: "No. That is the normal state of the software we are asked to take on, and usually the reason nobody dares touch it. We do not try to write everything down or test every corner, because that spends a lot of money on parts nobody uses. Instead we put automatic checks around the parts you change most and the paths where a failure costs you money, so those become safe to work on first. We write notes as we go and keep them to what somebody would genuinely need: how to put a change live, what it depends on, and what to do when it stops."
      }
    ],
    seo: {
      title: "Legacy app modernization services | Infoloop",
      description: "Software nobody dares change, made safe to change again. We read the code, upgrade it in small steps and stay to run it. Risks and price in writing first."
    }
  },
  {
    slug: "ai-and-emerging-technologies",
    group: "transform",
    name: "AI and advanced tech solutions",
    h1: "AI that does real work every day, [[not just demos]]",
    lede: "AI assistants and agents built on your own records, with firm limits and a person on anything risky. We connect them to the tools you already use and stay to run them. Live in weeks, price in writing.",
    button: "Tell us the job",
    proof: {
      metrics: [
        {
          value: "<2 min",
          label: "first response with an AI support assistant, down from hours",
          href: "/work/fintech-support-assistant"
        },
        {
          value: "72%",
          label: "less manual support work for a fintech scale-up",
          href: "/work/fintech-support-assistant"
        },
        {
          value: "$1.2M",
          label: "saved a year with maintenance software connected to the ERP",
          href: "/work/manufacturing-erp-predictive-maintenance"
        }
      ],
      tile: "copilot",
      caption: "An AI support assistant for a fintech scale-up, first response under two minutes, shipped in five weeks",
      href: "/work/fintech-support-assistant"
    },
    band: [
      "Your records, firm limits.",
      "Real work, every day."
    ],
    industryFit: {
      h2: "AI built for your industry",
      lede: "We know the records, the approval steps and the risk rules that differ from one industry to the next.",
      items: [
        {
          title: "Manufacturing",
          body: "Maintenance software that flags a likely failure early, shift and attendance assistants, plant reports written for you"
        },
        {
          title: "Automotive and garages",
          body: "Booking and reminder assistants, job cards drafted for approval, parts reorder suggestions across every branch"
        },
        {
          title: "Healthcare",
          body: "Appointment and inquiry assistants, notes drafted for staff to approve, records with a full audit trail"
        },
        {
          title: "SaaS and technology",
          body: "Support assistants trained on your help pages, in-app helpers, answers with a source your customers can check"
        },
        {
          title: "Biorenewables and energy",
          body: "Asset and site monitoring, compliance paperwork drafted from your own records, reports your auditors can read"
        },
        {
          title: "Financial services",
          body: "Support and inquiry assistants, approval steps for money actions, every answer and change logged"
        },
        {
          title: "eCommerce and D2C",
          body: "Order and returns assistants, product content drafted from your catalog, stock and delivery questions answered from live figures"
        },
        {
          title: "Education and training",
          body: "Tutoring and marking helpers on your learning platform, course content drafted for review, results tracked per learner"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our AI delivery process",
      lede: "Four steps, one price in writing before anything is built.",
      steps: [
        {
          n: "01",
          title: "A half-hour call",
          body: "We ask what the job is today: who does it, how often, and what it costs when it goes wrong. If a rule or a form would do it, we say so."
        },
        {
          n: "02",
          title: "One written plan, one price",
          body: "You get the job written down, the tools it would touch, the limits around it, and one price. Nothing starts until you agree, and anything added later is priced separately."
        },
        {
          n: "03",
          title: "Built on your real information",
          body: "We build on your real records and put it in front of the people who do the job today. They try real cases and tell us what is wrong early."
        },
        {
          n: "04",
          title: "Live, and then we run it",
          body: "It goes live with the limits switched on and someone watching from day one. After that we run it: fixes within an agreed time, improvements, patches and a report every month."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for AI and advanced tech",
      items: [
        "We are still here in month two",
        "Built for the boring days",
        "We say when AI is the wrong answer",
        "The people who built it run it",
        "A price in writing, not a range",
        "Live in weeks, not quarters",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team reviewing an AI assistant with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies, from manufacturing and garages to financial services and SaaS, where the job has to be done right on a normal Tuesday."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "TypeScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      }
    ],
    cta: {
      h2: "Bring us the job AI might do",
      lede: "Bring the trial that never went live, the inbox nobody keeps up with, or the report rebuilt every week. We will tell you if AI fits, and what it costs.",
      button: "Book a free consultation"
    },
    other: {
      h2: "Other Transform services"
    },
    faq: [
      {
        q: "What will this cost us?",
        a: "We price the job, not the hours. A half-hour call is usually enough to work out what it would do, which tools it touches and where the limits belong, and you leave with the plan, the dates and one price in writing. There are two parts: a one-off fee to build it, and a monthly fee to keep it running, sized to how much we look after. Anything you add later is priced on its own, so no invoice ever surprises you."
      },
      {
        q: "What happens once it is switched on?",
        a: "Switching it on is the start, not the finish. Once it is live we run it: someone watching, fixes within an agreed time, improvements each month, patches, and a report showing what it handled, what it passed to a person and what it cost to run. If the quality slips we put the old version back and find out why. If your workload changes we tune it. The monthly fee is one number, and you can pause or stop it with notice."
      },
      {
        q: "How do you stop it doing something damaging?",
        a: "The limits are designed before we build, never bolted on afterward. It gets the smallest access that lets it do the job, so it cannot reach records it has no business reading. Anything that spends money, changes an important record or contacts a customer waits for a person. Where it is not confident, it asks instead of guessing. Everything it reads and changes is written down. There is a tested way back to the previous version, and an off switch that stops it without disturbing anything else you run."
      },
      {
        q: "Will it work with the tools we already use?",
        a: "Usually, yes. We connect to your customer records, your inquiry inbox, your accounts package, your spreadsheets and your own in-house tools, using the connection points those products provide, with access cut to the minimum. Where a product has no connection point we look at exports or whatever the supplier offers, and tell you honestly what that costs in reliability. Working on today's figures matters: anything reasoning over last month's export looks fine in a demo and is wrong in real use. If a connection is a bad idea, we say so while planning, not after you have paid."
      },
      {
        q: "Where does our information go?",
        a: "That is agreed in writing before anything is built. It covers which tools it may read, which fields it may change, what leaves your business, where it is handled and how long anything is kept. Access is cut to the minimum, and passwords sit in your own accounts wherever the product allows it. Everything read and changed is recorded, so a decision can still be checked months later. If your business has its own rules about where information may go, bring them to the first call and we design around them."
      },
      {
        q: "How will we know if it is actually helping?",
        a: "We agree the measure before we build: hours saved on a named job, cost per inquiry, how long a customer waits, the mistake rate, whatever that work is judged on today. Then we build a set of real examples, so each new version is marked against cases rather than opinions, and the live figures go on a screen you can open yourself. The monthly report shows what it handled, what it passed to a person and what it got wrong. If the figures say it is not earning its keep, we will tell you and suggest turning it off."
      }
    ],
    seo: {
      title: "AI and advanced tech solutions | Infoloop",
      description: "AI assistants and agents built on your own records, with firm limits and a person on anything risky. Live in weeks, then run by Infoloop."
    }
  },
  {
    slug: "product-strategy-and-management",
    group: "consulting",
    name: "Product consulting",
    h1: "Decide what to build first, [[and what to leave out]]",
    lede: "More ideas than people to build them? We turn the ambition into a short first version, in the right order, with one number attached, and put the plan, the order and the price in writing before you commit.",
    button: "Talk to a consultant",
    proof: {
      metrics: [
        {
          value: "11 wks",
          label: "to get nine garage branches live on one platform",
          href: "/work/brightlane-auto-group-garagezone"
        },
        {
          value: "$1.2M",
          label: "saved a year by connecting maintenance software to the ERP",
          href: "/work/manufacturing-erp-predictive-maintenance"
        },
        {
          value: "<2 min",
          label: "first response from an AI support assistant, shipped in five weeks",
          href: "/work/fintech-support-assistant"
        }
      ],
      tile: "erp",
      caption: "Maintenance software connected to the ERP for a three-plant manufacturer: $1.2M saved a year",
      href: "/work/manufacturing-erp-predictive-maintenance"
    },
    band: [
      "Build less first.",
      "Prove it sooner."
    ],
    industryFit: {
      h2: "Product plans shaped for your industry",
      lede: "We know the workflows, the tools and the record-keeping rules that decide what a sensible first release looks like in each industry.",
      items: [
        {
          title: "Manufacturing",
          body: "Decide which plant tool comes first, attendance, maintenance or dashboards, and the number each one has to move"
        },
        {
          title: "Automotive and garages",
          body: "A first version for one branch, then a rollout order across the rest, with bay use as the measure"
        },
        {
          title: "Healthcare",
          body: "Portals and staff schedules scoped around clinic time saved, with record-keeping rules written into the plan"
        },
        {
          title: "SaaS and technology",
          body: "A roadmap that tests the riskiest guess first, and a first release your sales team can sell"
        },
        {
          title: "Biorenewables and energy",
          body: "Site tracking and compliance reporting put in the order your operators and auditors need first"
        },
        {
          title: "Financial services",
          body: "Support assistants and approval flows scoped so the first release is small, safe and measurable"
        },
        {
          title: "eCommerce and D2C",
          body: "The store rebuild list cut to what moves conversion, with everything else dated for a later release"
        },
        {
          title: "Education and training",
          body: "Course, testing and certificate features ordered by what learners and admins need first"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our product consulting process",
      lede: "Four steps, the plan and the price in writing before you commit.",
      steps: [
        {
          n: "01",
          title: "A half-hour call",
          body: "Tell us what you want to change and what is in the way. We ask what success looks like as a number. If this is not what you need, we say so."
        },
        {
          n: "02",
          title: "We look at how the work runs now",
          body: "We talk to the people doing the job, read what already exists and look at your figures, hunting for the gap between how the work is described and how it really happens."
        },
        {
          n: "03",
          title: "The plan, the order and the price",
          body: "You get the first version written down, the order of releases and one price for building it, before you commit. It is yours whether or not you carry on with us."
        },
        {
          n: "04",
          title: "If you want, we build it too",
          body: "The same people who wrote the plan do the work and show you something real every week. Once live, it moves to a monthly arrangement: watching, fixes, improvements and a report."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for product consulting",
      items: [
        "The people who plan it build it",
        "One number, agreed at the start",
        "We will argue for building less",
        "The plan keeps going after launch",
        "A price in writing, not a range",
        "Live in weeks, not quarters",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team planning a first release with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies, mostly in manufacturing, healthcare, SaaS and biorenewables, deciding what their next piece of software should be."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Design",
          items: [
            "Figma"
          ]
        },
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "TypeScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      }
    ],
    cta: {
      h2: "Bring us the idea, we will shape it",
      lede: "Bring the long list, the signed-off budget or the software nobody can prove paid off. One free call, and you leave knowing what to build first, whoever builds it.",
      button: "Book a free call"
    },
    other: {
      h2: "Other Consulting services"
    },
    faq: [
      {
        q: "What do you actually do?",
        a: "Three things. We help you decide what to build, help you decide the order to build it in, and agree the number it has to move. In practice we sit with the people who do the work, write down what is in the first version and what is left out, and put the releases in an order that tests the riskiest part first. Before anything is built, we agree how the result gets counted. If you want, we also run the week-to-week list: writing up the jobs, showing you progress and chasing the decisions that hold everyone up."
      },
      {
        q: "How much does it cost?",
        a: "It starts with a free half-hour call. If it looks like a fit, we spend a short period looking at how the work is done today, then come back with the plan, a date and one price, so you approve a number rather than an hourly rate. The cost depends on how much we are planning and whether we go on to build it, which is why we quote each job rather than publish a price list. Once software is live, ongoing work moves to a monthly fee. Anything added to the plan is priced and agreed before it happens."
      },
      {
        q: "Do we have to build it with you afterwards?",
        a: "No. The plan, the order and the way you will measure it are yours, written so another team can pick them up. Some clients hand them to their own people or to a supplier they already use. We would rather write something that survives without us than something that only makes sense while we hold the pen. If you do want us to build it, the same people who wrote the plan do the work, which removes a handover and everything that usually gets lost in one."
      },
      {
        q: "What happens after the first version is live?",
        a: "Launch is where you find out whether it was worth doing. For a monthly fee we keep watch, fix what breaks within an agreed time, keep it patched and improving, and send a report each month against the number agreed at the start. The plan is kept up to date, so the next release is chosen from what real use is telling you rather than from a list written before anyone had touched it. Most firms stop at launch. We do not."
      },
      {
        q: "How do you decide what to leave out?",
        a: "By asking what each item is meant to change, and whether the first version can prove the idea without it. Anything on the list because somebody asked for it, rather than because it moves the number, goes to a later release or off the list altogether. We write down what was cut and why, so it can be brought back rather than quietly forgotten. Cutting is not about doing less work. It is about getting a real answer sooner, on a smaller bet."
      },
      {
        q: "We already have a plan. Is this still worth doing?",
        a: "Often, yes, because most plans are a list of features with dates rather than an order of decisions. We read what you have and ask three things of every item: what is it supposed to change, what has to be true for it to work, and does the order test the risky guesses first. Sometimes the answer is that your plan is sound and what you need is help delivering it, not help planning it. We will tell you that rather than restart work you have already done."
      }
    ],
    seo: {
      title: "Product consulting: what to build first | Infoloop",
      description: "More ideas than time to build them? Infoloop helps you decide what to build first, what to leave out, and the one number the work has to move."
    }
  },
  {
    slug: "technology-consulting",
    group: "consulting",
    name: "Tech consulting",
    h1: "A second opinion on big software decisions, [[before you sign]]",
    lede: "Which platform to buy, whether to build, which supplier to trust. We look at what you already run, compare the real options, and write down what each costs in three years. One recommendation in writing, priced before we start.",
    button: "Get a second opinion",
    proof: {
      metrics: [
        {
          value: "$1.2M",
          label: "saved a year by connecting maintenance software to the ERP",
          href: "/work/manufacturing-erp-predictive-maintenance"
        },
        {
          value: "72%",
          label: "less manual support work once AI took the right tasks",
          href: "/work/fintech-support-assistant"
        },
        {
          value: "11 wks",
          label: "to move nine garage branches onto one platform",
          href: "/work/brightlane-auto-group-garagezone"
        }
      ],
      tile: "erp",
      caption: "Maintenance software connected to the ERP for a three-plant manufacturer, $1.2M saved a year",
      href: "/work/manufacturing-erp-predictive-maintenance"
    },
    band: [
      "Advice from people who build.",
      "Priced before you sign."
    ],
    industryFit: {
      h2: "Tech consulting built for your industry",
      lede: "We know the platforms, the connections and the record-keeping rules that shape a software decision in each industry.",
      items: [
        {
          title: "Manufacturing",
          body: "ERP fit checks, buy or build calls on attendance and maintenance software, a clear picture of what runs the plant"
        },
        {
          title: "Automotive and garages",
          body: "One platform or many: choosing garage software for every branch, and what it costs to run in year three"
        },
        {
          title: "Healthcare",
          body: "Which patient portal or records tool to trust, and how it stays compliant and connected to the rest"
        },
        {
          title: "SaaS and technology",
          body: "Build, buy or partner decisions, platform reviews before a rebuild, and where AI belongs in your product"
        },
        {
          title: "Biorenewables and energy",
          body: "Site and asset tracking options, compliance tools, and which connections will hold up over time"
        },
        {
          title: "Financial services",
          body: "Where an AI assistant genuinely helps, approval steps for money actions, supplier reviews with the risk written down"
        },
        {
          title: "eCommerce and D2C",
          body: "Which store platform to move to, what the move costs, and how orders, stock and accounts will connect"
        },
        {
          title: "Education and training",
          body: "Learning platform choices, off the shelf or built, with a plan for course records, results and certificates"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our tech consulting process",
      lede: "Four steps, one recommendation in writing at the end.",
      steps: [
        {
          n: "01",
          title: "A free half-hour call",
          body: "You tell us the decision and what you already run. We say how big the job is, what we need to see, and what it will cost."
        },
        {
          n: "02",
          title: "We look at what you really run",
          body: "Read-only access to the software in question, plus short conversations with the people who use it every day. We want how it works in practice, not what the handbook says."
        },
        {
          n: "03",
          title: "One recommendation, in writing",
          body: "The option we recommend and the ones we turned down, each with its cost, its risk and what it ties you into. Plain enough for a board, detailed enough for developers."
        },
        {
          n: "04",
          title: "Build it with us, or take it elsewhere",
          body: "If you want us to build, you get one price and one date, and nothing is worked out twice. Prefer your own people? The document is yours and stands alone."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for tech consulting",
      items: [
        "We would be the ones building it",
        "Advice backed by 50+ delivered projects",
        "We have to live with the upkeep",
        "You can see how we got there",
        "We will tell you not to build",
        "A price in writing, not a range",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team reviewing a client's software options at a whiteboard"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies facing a software decision they cannot easily undo, whatever the industry."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "TypeScript"
          ]
        },
        {
          label: "Backend",
          items: [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      },
      {
        text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
        role: "COO, fintech scale-up",
        caseSlug: "fintech-support-assistant"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      }
    ],
    cta: {
      h2: "About to sign for something big?",
      lede: "The quote on your desk, the software that is straining, the AI idea nobody has priced. One free call, then a straight answer, even if the answer is no.",
      button: "Book a free call"
    },
    other: {
      h2: "Other Consulting services"
    },
    faq: [
      {
        q: "What does tech consulting actually cover?",
        a: "The decisions made before anybody writes any software: which product to buy, whether to build at all, how your tools should fit together, and where AI is worth the trouble. We look at what you already run, put the credible options side by side with cost, risk and what each one ties you into, and write a recommendation you can act on. What you get is a document and a plan, not a workshop and a feeling."
      },
      {
        q: "What does it cost?",
        a: "We charge for a defined piece of work, not a day rate that runs and runs. The first half-hour call is free. After it you get what we will do, when it lands and what it costs, in writing, before you commit. That number does not move unless you change the brief. The price depends on how many tools are involved and how many people we need to speak to, which is why we quote after the call rather than publish a figure that would be wrong for most companies. If you go on to build with us, none of the thinking is paid for twice."
      },
      {
        q: "You build software. Will you just tell us to build?",
        a: "Only when building is the right answer, and often it is not. A product you already pay for, set up properly, a change to how you work, or a fix to one link between two tools will often get you further for less. We say so in the document. We can afford to, because we keep running what we build, so software nobody needed becomes our problem too. You are free to take the recommendation and have somebody else deliver it. It is written to be handed over."
      },
      {
        q: "How long does it take?",
        a: "It depends on how much is involved, and you get the dates before you commit, not after. One decision, such as which product to buy or whether to build, is a short piece of work. Reading a whole set of connected tools across more than one team takes longer, mostly because it depends on getting time with the people who use them every day. We agree the dates on the first call and work to them. If something slips, we tell you while it is happening, not at the end."
      },
      {
        q: "What happens after you give us the recommendation?",
        a: "You choose. If you want us to build it, you get one price and one date for the first phase, and the thinking carries straight through so nothing is worked out twice. Once it is live we can keep it running for a monthly fee: watching, fixes within agreed times, patches, improvements and a short report each month. That is the part most people skip and later regret. If you would rather build in-house or with another firm, the document is written to hand over, reasoning included, so your developers can argue with it."
      },
      {
        q: "Do you need access to our software?",
        a: "Read-only access to the tools in question, yes. A recommendation based only on a description is really a recommendation about how something is supposed to work, which is rarely how it does. We ask for the least access that answers the question, tell you exactly what we are looking at, and hand it back when the work ends. If something cannot be opened up for legal reasons, we work from documents and conversations, and say plainly in the report which conclusions are weaker because of it."
      }
    ],
    seo: {
      title: "Technology consulting and software advice | Infoloop",
      description: "About to commit to a platform or supplier? We read what is in front of you, compare the real options, and write down what each one costs you later."
    }
  },
  {
    slug: "ux-consulting",
    group: "consulting",
    name: "Design consulting",
    h1: "Design consulting that finds the screen where people [[give up]]",
    lede: "People sign up, then get stuck in your product. We go through it screen by screen, say what to fix first, and build the parts that keep it consistent. Every finding ranked, the price in writing before we start.",
    button: "Request a review",
    proof: {
      metrics: [
        {
          value: "+38%",
          label: "conversion after a Shopify store rebuild for a DTC brand",
          href: "/work/dtc-shopify-rebuild"
        },
        {
          value: "2.1x",
          label: "qualified leads from a new Webflow website for a software company",
          href: "/work.html"
        },
        {
          value: "90%",
          label: "less timesheet admin for a three-plant manufacturer, live in three weeks",
          href: "/work/manufacturing-attendance-opsdeck"
        }
      ],
      tile: "shopify",
      caption: "A Shopify store rebuilt for a DTC brand, conversion up 38%",
      href: "/work/dtc-shopify-rebuild"
    },
    band: [
      "Every screen reviewed.",
      "Worst fixed first."
    ],
    industryFit: {
      h2: "Design consulting for your industry",
      lede: "We know which screens matter in each industry, who uses them, and where a confusing one costs money.",
      items: [
        {
          title: "Manufacturing",
          body: "Attendance, shift and maintenance screens reviewed for the people on the floor, not the office"
        },
        {
          title: "Automotive and garages",
          body: "Job cards, bookings and reminders that front-desk staff and mechanics get right first time"
        },
        {
          title: "Healthcare",
          body: "Patient portals and staff screens checked for accessibility, clear labels and fewer wrong clicks"
        },
        {
          title: "SaaS and technology",
          body: "Sign-up and onboarding journeys reworked end to end, one set of parts across the whole product"
        },
        {
          title: "Biorenewables and energy",
          body: "Site and compliance forms simplified so field staff fill them in right, and reports auditors can read"
        },
        {
          title: "Financial services",
          body: "Onboarding, payment and approval screens made clear, with error states and awkward cases covered"
        },
        {
          title: "eCommerce and D2C",
          body: "Product, cart and checkout journeys reviewed against your figures, fixes ranked by lost sales"
        },
        {
          title: "Education and training",
          body: "Course, lesson and test screens that learners of every ability can get through on any device"
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      h2: "Our design consulting process",
      lede: "Four steps, and you approve the scope and the price before anything starts.",
      steps: [
        {
          n: "01",
          title: "A free half-hour call",
          body: "You tell us about the product, who uses it and what is going wrong. If this is not what you need, we say so on the call instead of selling a project."
        },
        {
          n: "02",
          title: "Everything agreed before we start",
          body: "We write down what we will look at or build, what you get, when it lands and what it costs. You approve that first. Nothing billed by the hour, nothing open-ended."
        },
        {
          n: "03",
          title: "Look first, build second",
          body: "The review comes first and stands on its own. If a set of parts follows, we build it against what the review found, in stages, with something to comment on each week."
        },
        {
          n: "04",
          title: "It is yours, and we can keep it current",
          body: "You get the files, the code and the rules, and they are yours. If you would rather not maintain them, we keep them current for a monthly fee as the product changes."
        }
      ]
    },
    why: {
      h2: "Why Infoloop for design consulting",
      items: [
        "We build software too, so it is buildable",
        "You get a document, not a feeling",
        "We say what to fix first",
        "No redesign for the sake of it",
        "A price in writing before we start",
        "We can stay after handover",
        "Security and NDAs as standard"
      ],
      photoAlt: "Photo slot: the Infoloop team reviewing product screens with a client"
    },
    industries: {
      h2: "Industries we serve",
      lede: "Owner-led and mid-sized companies with a product already in use, where one confusing screen costs real money and nobody has had time to fix it."
    },
    tech: {
      h2: "Technologies we use",
      rows: [
        {
          label: "Design",
          items: [
            "Figma"
          ]
        },
        {
          label: "Frontend",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "TypeScript"
          ]
        },
        {
          label: "CMS and web",
          items: [
            "Webflow",
            "WordPress"
          ]
        },
        {
          label: "eCommerce",
          items: [
            "Shopify"
          ]
        },
        {
          label: "Mobile",
          items: [
            "Flutter",
            "React Native"
          ]
        }
      ]
    },
    quotes: [
      {
        text: "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
        role: "Founder, DTC brand",
        caseSlug: "dtc-shopify-rebuild"
      },
      {
        text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
        role: "Operations lead, manufacturer",
        caseSlug: "manufacturing-attendance-opsdeck"
      },
      {
        text: "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
        role: "Operations Director, Brightlane Auto Group",
        caseSlug: "brightlane-auto-group-garagezone"
      }
    ],
    cta: {
      h2: "Got a product? Let us look at it",
      lede: "Bring your visitor figures, support messages and the screen that loses people. In half an hour you will know whether a review, a set of parts, or neither is right.",
      button: "Book a free call"
    },
    other: {
      h2: "Other Consulting services"
    },
    faq: [
      {
        q: "What does design consulting cost?",
        a: "One agreed amount for a defined piece of work, never by the hour. After a free half-hour call we write down what we will do, what you get, when it lands and what it costs, and you approve all of it before anything starts. Going through an existing product is a smaller job than building a full set of parts, and the two are priced separately, so you can take the review on its own and decide about the rest later. If what you want changes part way through, we re-quote rather than quietly bill more."
      },
      {
        q: "Do we have to rebuild the product to act on your advice?",
        a: "No. Most of what we find can be fixed inside the product you already have: colors, spacing, labels, the order of things on a page, error messages, the wording on a button. We look for changes your developers can make without starting again, and we mark which are cheap and which need real work. If we honestly think a rebuild is the answer we will say so and explain why, but that is a conclusion we reach, not where we start."
      },
      {
        q: "What happens after you hand the design over?",
        a: "It is yours: the design file, the code and the notes, with no license and nothing locking you in. A set of parts falls apart if nobody keeps it current, so you have two choices. Your team owns it, and we leave the rules and a handover session so they can. Or we keep it current for a monthly fee, which also covers fixes within an agreed time, improvements and a short report each month. You can start with the first and move to the second when the product begins changing faster than the file does."
      },
      {
        q: "How long does a review take?",
        a: "That depends on the size of the product and how much of it you want looked at. One journey is a far shorter job than a whole application, and we agree that line before we start. Whatever the size, the dates go in writing up front, including the day the written review lands. We would rather do a narrow review you get quickly and can act on than a wide one that arrives after the decision has been made."
      },
      {
        q: "Can you work with our designer or our developers?",
        a: "Yes, and it usually works better that way. If you have a designer, the parts belong to them once they exist, and we follow their judgment on how the brand should look and feel. If you have developers, we agree the names and the structure with them early, because a set of parts named the way designers think and built the way nobody codes gets abandoned within a year. We can work in your files and your code, or hand over files you bring in yourselves. We are not trying to replace anybody on your team."
      },
      {
        q: "We have no research and barely any figures. Can you still help?",
        a: "Yes, and we will be clear about which findings are evidence and which are judgment. Parts that do not match, broken states, accessibility failures and well-known usability problems can all be found by looking. Anything about what your users want, or why they give up at one step, is a guess without figures, and we label it as a guess rather than dress it up as a finding. If you want that evidence first, we can set up the counting or run a small round of sessions with real users, priced separately."
      }
    ],
    seo: {
      title: "Design and UX consulting | Infoloop",
      description: "People sign up and then get stuck. We review your product screen by screen, say what to fix first, and build one set of parts that keeps it consistent."
    }
  },
];
