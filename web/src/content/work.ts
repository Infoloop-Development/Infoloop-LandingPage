/**
 * Work (case studies). Structure adapted from 7Span's Work page: hero,
 * a featured project, filter by industry (we add filter by service), a card
 * grid, then a CTA band. Each case page follows 7Span's case layout (outcome
 * H1, metadata, challenge, approach, impact metrics, technology, testimonial,
 * CTA) with our own "day to day" and "run by us" sections kept from the
 * published case studies.
 *
 * Every number, quote and client name here was already published on
 * infoloop.co (site/src/pages/case-*.astro, work-*.astro). Nothing invented.
 * Rules: no "system(s)", no em dashes, "Infoloop" with a capital I, only
 * published numbers, one H1 per page, an H2 per section, H3 per item.
 */

export type IndustryKey = "manufacturing" | "automotive" | "retail" | "financial-services" | "saas" | "staffing";
export type ServiceKey = "ai" | "custom-software" | "ecommerce" | "web" | "products" | "modernization";
export type TileKind = "erp" | "attendance" | "shopify" | "copilot" | "garage" | "webflow" | "lms" | "verko";

export type CaseCard = { title: string; blurb: string; metric: string; metricLabel: string };

export type CaseStudy = {
  slug: string;
  client: string;
  named: boolean;
  industry: string;
  industryKey: IndustryKey;
  services: string[];
  serviceKeys: ServiceKey[];
  tags: string;
  tile: TileKind;
  featured?: boolean;
  title: string;
  lede: string;
  card: CaseCard;
  metrics: { value: string; label: string }[];
  meta: { industry: string; services: string[]; stack: string[]; timeline: string; status: string };
  /** Introduction (7Span "Product Vision"): one subtitle line + 1 to 2 paragraphs. */
  intro: { sub: string; paragraphs: string[] };
  /** Not shown on the page (kept for the index and future use). */
  glance?: string[];
  /** The challenge: intro paragraph(s), then bullet points (7Span), then one closing line. */
  situation: string[];
  challenges: string[];
  challengeClose?: string;
  approach: string[];
  /** What we built, as titled steps (7Span "Our Approach" cards). */
  built: { h3: string; body: string }[];
  /** One or two sentences under "The results" (7Span "The Impact"). Paragraphs are kept in the data but not shown. */
  resultsSub: string;
  results: string[];
  quote: { text: string; name: string; role: string };
  /** Not shown on the page since the 7Span layout; kept in the data. */
  dayToDay?: { h2: string; lede?: string; items: { h3: string; body: string }[] };
  extra?: { eyebrow: string; h2: string; items: { h3: string; body: string }[] };
  tech: string[];
  note: string;
  seo: { title: string; description: string; noindex?: boolean };
  /** Slugs of related case studies (defaults to same industry, then others). */
  related?: string[];
  /** Service, product and industry pages behind this case (internal links). */
  links?: { label: string; href: string }[];
  /** Industry-specific closing CTA. The button names the service we gave them (7Span: "Launch my website"). */
  cta?: { h2: string; lede: string; button?: { label: string; href: string } };
  /** ISO dates for Article schema. */
  datePublished?: string;
  dateModified?: string;
  /** Optional real cover image from the CMS; falls back to the drawn tile. */
  cover?: { url: string; alt?: string };
  /** Optional screenshots shown after "What we built". */
  gallery?: { url: string; alt?: string; caption?: string }[];
};

/** Outcomes without a full case page yet; the card links out. */
export type Snapshot = {
  slug: string;
  client: string;
  industry: string;
  industryKey: IndustryKey;
  serviceKeys: ServiceKey[];
  tags: string;
  tile: TileKind;
  card: CaseCard;
  href: string;
  linkLabel: string;
};

export type WorkIndex = {
  eyebrow: string;
  h1: string;
  lede: string;
  filters: {
    label: string;
    allLabel: string;
    industryLabel: string;
    serviceLabel: string;
    industries: { key: IndustryKey; label: string }[];
    services: { key: ServiceKey; label: string }[];
  };
  snapshots: Snapshot[];
  /** Featured tabs (7Span shows four): short uppercase label + case slug. */
  featured: { label: string; slug: string }[];
  /** Toolbar and grid labels (WorkBrowser). */
  browser: { searchPlaceholder: string; filterLabel: string; allLabel: string; loadMore: string; empty: string; featuredButton: string };
  /** Hatched CTA band under the grid (7Span "Got An Idea?"). */
  band: { h2: string; lede: string; button: { label: string; href: string } };
  /** Case-page aside button. */
  heroButton: { label: string; href: string };
  cta: { eyebrow: string; h2: string; lede: string; button: { label: string; href: string }; secondary: { label: string; href: string } };
  seo: { title: string; description: string };
};

// Content: verified rewrite of the case studies published on infoloop.co
// (source: site/src/pages/case-*.astro and work-*.astro). Product mapping
// (OpsDeck, GarageZone, LoopIQ) follows content/home.ts and is still to be
// confirmed with the product owner.
export const WORK: WorkIndex = {
  "eyebrow": "Work",
  "h1": "Work",
  "lede": "We do well in the IT industry because we bring a broad range of expertise, skills and talent to every project. Our confidence in a service-first approach, build it and then run it, sets us apart from the competition.",
  "heroButton": {
    "label": "Book a call",
    "href": "/contact"
  },
  "filters": {
    "label": "Filter by industry",
    "allLabel": "All work",
    "industryLabel": "By industry",
    "serviceLabel": "By service",
    "industries": [
      {
        "key": "manufacturing",
        "label": "Manufacturing"
      },
      {
        "key": "automotive",
        "label": "Automotive"
      },
      {
        "key": "retail",
        "label": "Retail and DTC"
      },
      {
        "key": "financial-services",
        "label": "Financial services"
      },
      {
        "key": "saas",
        "label": "SaaS"
      },
      {
        "key": "staffing",
        "label": "Staffing and HR"
      }
    ],
    "services": []
  },
  "snapshots": [],
  "cta": {
    "eyebrow": "Next step",
    "h2": "Want results like these? Let us [[scope your project]].",
    "lede": "Tell us the number you want to move. We will tell you how we would build and run the software to move it, with a price in writing.",
    "button": {
      "label": "Scope my project",
      "href": "/contact"
    },
    "secondary": {
      "label": "See our process",
      "href": "/#process"
    }
  },
  "seo": {
    "title": "Case studies: software we build and run | Infoloop",
    "description": "Infoloop case studies: $1.2M a year saved with a multi-plant ERP, 72% less manual support work, Shopify conversion up 38%. Software we built and still run."
  },
  "featured": [
    {
      "label": "Machinery ERP",
      "slug": "manufacturing-erp-predictive-maintenance"
    },
    {
      "label": "Brightlane Auto Group",
      "slug": "brightlane-auto-group-garagezone"
    },
    {
      "label": "Fintech assistant",
      "slug": "fintech-support-assistant"
    },
    {
      "label": "DTC Shopify store",
      "slug": "dtc-shopify-rebuild"
    }
  ],
  "browser": {
    "searchPlaceholder": "Search case studies",
    "filterLabel": "Filter by industry",
    "allLabel": "All industries",
    "loadMore": "Load more case studies",
    "empty": "No case study matches that yet. Clear the search or pick another industry, or tell us what you are looking for on a call.",
    "featuredButton": "Read case study"
  },
  "band": {
    "h2": "Got an idea?",
    "lede": "Get in touch with our experts.",
    "button": {
      "label": "Get an estimate",
      "href": "/contact"
    }
  }
};

export const CASES: CaseStudy[] = [
  {
    "slug": "manufacturing-erp-predictive-maintenance",
    "client": "A global industrial machinery manufacturer",
    "named": false,
    "industry": "Manufacturing",
    "industryKey": "manufacturing",
    "services": [
      "Custom software development",
      "Legacy modernization"
    ],
    "serviceKeys": [
      "custom-software",
      "modernization"
    ],
    "tags": "ERP and manufacturing",
    "title": "$1.2M saved a year with predictive maintenance and a multi-plant ERP",
    "lede": "A machinery maker was losing $1.8M a year to machines stopping without warning and three plants that could not see each other. We put all three plants on one ERP and gave them warning before things broke.",
    "intro": {
      "sub": "The vision: one ERP for three plants, and warning before things break",
      "paragraphs": [
        "This manufacturer builds machinery for construction, mining and agriculture. It runs three plants, serves 1,200+ B2B clients and turns over $350M+ a year.",
        "The aim was simple to say and hard to do: one ERP holding orders, stock, jobs and suppliers in one place instead of five, put in without stopping a single shift, with warning before a machine fails instead of a scramble after it stops."
      ]
    },
    "card": {
      "title": "Multi-plant ERP for a machinery maker",
      "blurb": "Predictive maintenance and one ERP across three plants cut unplanned downtime 72% and saved a global machinery manufacturer $1.2M a year.",
      "metric": "$1.2M",
      "metricLabel": "saved a year"
    },
    "metrics": [
      {
        "value": "-72%",
        "label": "unplanned downtime"
      },
      {
        "value": "$1.2M",
        "label": "saved each year"
      },
      {
        "value": "98%",
        "label": "order fulfilment accuracy"
      },
      {
        "value": "-65%",
        "label": "supplier delays"
      }
    ],
    "meta": {
      "industry": "Manufacturing",
      "services": [
        "Custom software development",
        "Legacy modernization"
      ],
      "stack": [
        "IoT sensors",
        "Predictive analytics",
        "Cloud ERP",
        "Multi-plant integration"
      ],
      "timeline": "Results measured within six months",
      "status": "Live, run by Infoloop"
    },
    "glance": [
      "Five legacy tools across three plants replaced by one ERP, switched on one plant at a time without losing a shift.",
      "Sensors flag a likely machine failure 10 to 14 days ahead, so repairs are planned work instead of emergencies.",
      "Unplanned downtime down 72%, order fulfilment accuracy up from 84% to 98%, and $1.2M a year saved on maintenance."
    ],
    "situation": [
      "All of that ran on five fragmented legacy tools, and nothing was joined up."
    ],
    "approach": [
      "The machines came from several different makers, and each reported in its own way. We got them all feeding one model first. And we made sure the floor wanted to use the new software, which is the part most projects skip."
    ],
    "built": [
      {
        "h3": "Warning before a breakdown",
        "body": "Small sensors on the machines report how hard they are working, and the software flags a likely failure 10 to 14 days ahead so the repair can be booked in."
      },
      {
        "h3": "One order book",
        "body": "Every job scheduled, tracked and dispatched in one place, with alerts when something is about to be late rather than after it already is."
      },
      {
        "h3": "A supplier panel",
        "body": "Scores who actually delivers on time, tracks what is due in, and raises the routine purchase orders on its own."
      },
      {
        "h3": "All three plants on the same numbers",
        "body": "Head office can see spare capacity at one site and work stacking up at another."
      }
    ],
    "results": [
      "Within six months, unplanned downtime fell 72% and order fulfilment accuracy rose from 84% to 98%. Supplier delays dropped 65% and decision-making sped up 40%. Predictive insights cut annual maintenance costs by $1.2M. Maintenance went from firefighting to planned work, and the savings showed up on the bottom line within two quarters.",
      "The ERP is built to grow with the business and now scales to five or more plants. It is still live, and Infoloop keeps running it, so the client's team spends its time on production rather than on keeping the software up. That is the point of building it and running it as one job."
    ],
    "resultsSub": "Three plants now run on one ERP with warning before a machine fails. Maintenance went from firefighting to planned work, and the savings showed up on the bottom line within two quarters.",
    "quote": {
      "text": "",
      "name": "",
      "role": ""
    },
    "dayToDay": {
      "h2": "What changed on the floor: planned work instead of panic",
      "lede": "Six things that work differently now, from the maintenance diary to the board pack.",
      "items": [
        {
          "h3": "Repairs go in the diary",
          "body": "A breakdown used to arrive in the middle of a shift and take the rest of the day with it. The warning now comes 10 to 14 days ahead, far enough that the fix is booked for a quiet slot, with the part already on the shelf when the engineer arrives. Planned work replaces panic."
        },
        {
          "h3": "Where is my order has an answer",
          "body": "Sales used to walk to the floor and ask. They now look at the same screen the plant is working from, tell the customer exactly where the machine is, and are right. Nobody has to promise a date and hope, and the customer gets a straight answer the first time they call."
        },
        {
          "h3": "Plants stopped competing for parts",
          "body": "One site would be waiting on a component that was sitting on a rack at another. Stock is visible across all three plants now, so a part moves between sites instead of being ordered twice. Less cash tied up in duplicate stock, and fewer jobs held up waiting on a delivery."
        },
        {
          "h3": "Supplier conversations changed tone",
          "body": "Chasing a late delivery used to be a matter of who remembered what. There is now a record of what was promised and what arrived, so the conversation is about the facts. The good suppliers get the credit they are owed, and the ones who slip get asked about it with the numbers in hand."
        },
        {
          "h3": "Handover between shifts is written down",
          "body": "What was half finished, what needs watching and what is waiting on a part used to be passed on verbally at the gate. The next shift now picks up the same job cards on the same screen, so nothing is lost between one shift and the next, and nobody restarts a job that was nearly done."
        },
        {
          "h3": "The board sees one set of numbers",
          "body": "Monthly reporting used to mean three plant managers sending three spreadsheets and someone reconciling them. The figures now come straight from the ERP that ran the work, so arguments in the boardroom are about what to do next, not whose numbers are right. Decisions come faster because the debate about the data is over."
        }
      ]
    },
    "extra": {
      "eyebrow": "The switch-over",
      "h2": "How you replace five legacy tools without losing a shift",
      "items": [
        {
          "h3": "One plant at a time",
          "body": "A single switch-over date across three sites is how these projects go wrong. We took one plant, ran it on the new ERP while the others carried on as they were, fixed what the first site taught us, and only then moved to the second. Slower on paper, and far less frightening in practice."
        },
        {
          "h3": "The old history came with them",
          "body": "Years of orders, parts and machine records lived in the tools being replaced, and a plant cannot work without them. We moved that history across, then had the client's own people check a sample of it against what they remembered before anybody agreed to go live. Clean data, not approximate data."
        },
        {
          "h3": "The floor was asked, not told",
          "body": "Supervisors and machine operators used the screens weeks before launch and told us what was wrong with them. Software the floor dislikes gets worked around almost immediately, and then you are paying for something nobody uses. Listening early is cheaper than fixing later."
        },
        {
          "h3": "We stayed after it went live",
          "body": "Launch day is the middle of the job, not the end. The people who built this ERP are the ones who answer when a sensor goes quiet or a plant rings up with a problem. It was not handed over to an account manager who has never walked the plant. That is what we mean when we say we run it."
        }
      ]
    },
    "tech": [
      "IoT sensors",
      "Predictive analytics",
      "Cloud ERP",
      "Multi-plant integration"
    ],
    "note": "Client identified on request under NDA. Figures are this engagement's measured outcomes.",
    "seo": {
      "title": "ERP case study: $1.2M saved, 72% less downtime | Infoloop",
      "description": "Predictive maintenance and a multi-plant ERP for an industrial machinery maker: three plants on one ERP, downtime cut 72%, $1.2M saved a year."
    },
    "tile": "erp",
    "featured": true,
    "links": [
      {
        "label": "Custom software development",
        "href": "/custom-software-development"
      },
      {
        "label": "Legacy app modernization",
        "href": "/legacy-app-modernization"
      },
      {
        "label": "Software for manufacturing",
        "href": "/industry/manufacturing"
      }
    ],
    "cta": {
      "h2": "Run every plant on [[one ERP]]",
      "lede": "From warning before a breakdown to one order book, Infoloop builds ERPs plants actually use, and runs them after launch.",
      "button": {
        "label": "Plan my ERP",
        "href": "/contact"
      }
    },
    "datePublished": "2026-08-01",
    "challenges": [
      "A machine ran until it stopped, then everybody dropped what they were doing: around 12 hours of unplanned downtime a month and $1.8M in annual losses",
      "Orders were tracked by hand, so a customer asking where their machine had got to meant somebody walking the floor to find out",
      "Suppliers were judged on memory and goodwill rather than a record",
      "Each plant kept its own numbers, so any question that crossed a site boundary turned into a round of phone calls",
      "Head office had three plants and nobody with the whole picture"
    ],
    "challengeClose": "The business needed one ERP across all three plants, put in without stopping a single shift."
  },
  {
    "slug": "brightlane-auto-group-garagezone",
    "client": "Brightlane Auto Group",
    "named": true,
    "industry": "Automotive",
    "industryKey": "automotive",
    "services": [
      "GarageZone garage management software",
      "AI booking and reorder agents",
      "Ongoing run under a monthly retainer"
    ],
    "serviceKeys": [
      "products",
      "ai"
    ],
    "tags": "Garage management and automotive",
    "title": "Bay utilization up 28% across nine garage branches, on one platform we run",
    "lede": "Brightlane Auto Group grew fast and ended up with nine branches booking work nine different ways. We put every site on GarageZone, added AI only where it earned its place, and stayed on to run it.",
    "intro": {
      "sub": "The vision: nine branches booking work one way, on one diary",
      "paragraphs": [
        "Brightlane Auto Group grew from two sites to nine in four years. Head office wanted every branch booking work the same way, one view of how busy each site was, and no closed days while the change happened.",
        "We put every branch on GarageZone, our garage management software, added AI only where it earned its place, and stayed on to run it."
      ]
    },
    "card": {
      "title": "Nine garage branches on one diary",
      "blurb": "Brightlane Auto Group moved all nine branches onto GarageZone in 11 weeks. Bay utilization rose 28%, and we still run it.",
      "metric": "+28%",
      "metricLabel": "bay utilization"
    },
    "metrics": [
      {
        "value": "+28%",
        "label": "bay utilization"
      },
      {
        "value": "4.5 hrs",
        "label": "admin saved per branch, daily"
      },
      {
        "value": "99.9%",
        "label": "uptime since launch"
      },
      {
        "value": "10th",
        "label": "branch opened on the same platform, no extra back-office staff"
      }
    ],
    "meta": {
      "industry": "Automotive",
      "services": [
        "GarageZone garage management software",
        "AI booking and reorder agents",
        "Ongoing run under a monthly retainer"
      ],
      "stack": [
        "GarageZone",
        "AI booking and reorder agents",
        "Ongoing run under a monthly retainer"
      ],
      "timeline": "11 weeks to all nine branches",
      "status": "Live, run by Infoloop"
    },
    "glance": [
      "9 branches on one platform in 11 weeks, moved branch by branch with zero closed days.",
      "AI handles booking triage, reminders and parts reorder. Staff handle the cars.",
      "Live since launch under our ongoing run under a monthly retainer, with a report every month."
    ],
    "situation": [
      "The way work got booked had never caught up with the growth."
    ],
    "approach": [
      "We started with booking, where the pain was worst and the rules were clearest. AI went in only where it gave a person their time back. The counter and the workshop kept the parts of the job people do better."
    ],
    "built": [
      {
        "h3": "One diary across nine branches",
        "body": "Head office can finally see which bays are free and which are stacked out."
      },
      {
        "h3": "A booking assistant",
        "body": "Sorts incoming enquiries, offers canceled slots to people on the waiting list and sends reminders, which brings no-shows down."
      },
      {
        "h3": "Parts reordering tied to the job book",
        "body": "So the van is not waiting on a part that should already have been on the shelf."
      },
      {
        "h3": "One screen for the numbers",
        "body": "Takings, bay use and technician output, per branch and for the group."
      }
    ],
    "results": [
      "Within one quarter, bay utilization rose 28% as head office could shift work to branches with capacity. No-shows fell by more than a third thanks to AI reminders and easy rebooking. Each branch manager got back around four and a half hours a day that used to go on admin. Parts stockouts dropped sharply.",
      "The group then opened its tenth branch on the same platform without adding back-office headcount. The owner no longer runs the business from a spreadsheet at 10pm. GarageZone shows what every branch is doing in real time, and Infoloop keeps it running so nobody at Brightlane has to think about it. Uptime since launch is 99.9%."
    ],
    "resultsSub": "Nine branches on one diary, run by Infoloop. More cars through the same bays, with fewer staff hours on admin, and a tenth branch opened without adding back-office headcount.",
    "quote": {
      "text": "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
      "name": "",
      "role": "Operations Director, Brightlane Auto Group"
    },
    "dayToDay": {
      "h2": "What changed on the counter and in the workshop",
      "lede": "Less phone, more cars.",
      "items": [
        {
          "h3": "The front desk stops guessing",
          "body": "Booking a car in used to mean knowing, in your head, how long a job takes and who is on that day. The diary now knows both, so a new person on the counter can book work correctly without years of local knowledge."
        },
        {
          "h3": "A cancellation is not a lost morning",
          "body": "When somebody cancels at nine, the slot used to sit empty. It is now offered straight away to people who wanted an earlier date, and it often goes before the branch manager has noticed it was free. That is the booking assistant doing its job."
        },
        {
          "h3": "Technicians see the day, not a clipboard",
          "body": "Job cards, the previous work on that vehicle and the parts needed for today are all on one screen in the workshop. Nobody walks back to the office to find out what was agreed with the customer, because the answer is already in front of them."
        },
        {
          "h3": "Customers get told before they ring",
          "body": "Reminders go out before the appointment and an update goes out when the car is ready. The phone still rings, but far less of it is somebody asking a question that the reminder or the update has already answered. Staff can get on with the cars."
        },
        {
          "h3": "Branches lend each other work",
          "body": "A busy site can see a quiet one, so a customer gets offered a slot down the road today instead of a slot here next week. That is the change behind most of the extra bay use, and it is why the 28% did not need a single new bay."
        },
        {
          "h3": "Opening a branch is a settings job",
          "body": "Site ten did not need a new diary, a new price list or a new way of working. It was added to the platform that already existed, with the same services, prices and job times, which is why the back office did not have to grow with it."
        }
      ]
    },
    "extra": {
      "eyebrow": "The switch-over",
      "h2": "How you move nine branches onto one diary without closing for a day",
      "items": [
        {
          "h3": "One branch at a time",
          "body": "A single switch-over date across nine sites is how these projects go wrong. We switched sites on one at a time. Each branch went live while the others carried on booking the way they always had, so nobody lost a working day. All nine were on the same diary in 11 weeks, with zero closed days."
        },
        {
          "h3": "Set up around how Brightlane already works",
          "body": "GarageZone was set up with Brightlane's own services, prices and job times rather than a generic list, and each branch's history was moved across before it went live. The diary knows how long a job takes because it was told, in Brightlane's terms, before anyone at a branch had to use it."
        },
        {
          "h3": "AI only where it earned its place",
          "body": "We put AI in only where it saved a person real time, and left it out everywhere else. It sorts incoming enquiries, offers canceled slots to the waiting list, sends reminders and raises parts reorders from the job book. The rest is left to the people who know the cars."
        },
        {
          "h3": "We stayed after launch",
          "body": "Launch was not the end of the job. GarageZone runs under our managed retainer, and Brightlane gets a report every month on what it did. Uptime since launch is 99.9%, and when the group opened branch ten it went onto the same platform without adding back-office headcount."
        }
      ]
    },
    "tech": [
      "GarageZone",
      "AI booking and reorder agents",
      "Ongoing run under a monthly retainer"
    ],
    "note": "Published with the client's permission. Company name used by agreement; some figures rounded.",
    "seo": {
      "title": "Brightlane Auto Group: 9 garages on GarageZone | Infoloop",
      "description": "Nine Brightlane Auto Group garages on one GarageZone diary in 11 weeks: bay utilization up 28%, 4.5 hours of admin saved per branch a day, 99.9% uptime."
    },
    "tile": "garage",
    "links": [
      {
        "label": "GarageZone, garage management software",
        "href": "/products/garagezone"
      },
      {
        "label": "AI and advanced tech solutions",
        "href": "/ai-and-emerging-technologies"
      },
      {
        "label": "Software for automotive and mobility",
        "href": "/industry/automotive"
      }
    ],
    "cta": {
      "h2": "Put every branch on [[one diary]]",
      "lede": "GarageZone runs multi-site garages from one screen, set up branch by branch and run by Infoloop.",
      "button": {
        "label": "Put my garages on one diary",
        "href": "/contact"
      }
    },
    "datePublished": "2026-08-01",
    "challenges": [
      "One branch kept a paper diary on the counter, another ran a spreadsheet only one person really understood, a third had a free booking form on the website that nobody was watching",
      "Head office had no way to see how busy any branch was, so cars were turned away at one site while a bay stood empty down the road",
      "The same slot got promised twice more often than anyone liked to admit",
      "Customers who forgot their appointment were never chased, and parts got ordered when a technician noticed the shelf was bare",
      "The owner spent his evenings adding branch numbers together by hand instead of thinking about branch ten"
    ],
    "challengeClose": "Nine branches needed one diary, switched on without closing a single day."
  },
  {
    "slug": "fintech-support-assistant",
    "client": "A fintech scale-up",
    "named": false,
    "industry": "Financial services",
    "industryKey": "financial-services",
    "services": [
      "AI support assistant",
      "Ongoing run and monthly tuning"
    ],
    "serviceKeys": [
      "ai"
    ],
    "tags": "AI support assistant and fintech",
    "title": "An AI support assistant that cut manual ticket work by 72%",
    "lede": "A fintech scale-up was buried under customer messages. Infoloop built an AI support assistant that does the routine part of the job while a person decides, and we still run it today.",
    "intro": {
      "sub": "The vision: routine questions answered in minutes, with a person still deciding",
      "paragraphs": [
        "A fintech scale-up was signing up customers faster than it could hire people to look after them, and the support inbox was buried.",
        "The brief was an AI assistant that does the routine part of the job while a person decides, live quickly, and run by Infoloop after launch."
      ]
    },
    "card": {
      "title": "Support assistant for a fintech scale-up",
      "blurb": "An AI support assistant took first response from hours to under two minutes and cut manual ticket handling by 72%.",
      "metric": "-72%",
      "metricLabel": "manual ticket hours"
    },
    "metrics": [
      {
        "value": "-72%",
        "label": "manual ticket hours"
      },
      {
        "value": "<2 min",
        "label": "first response time"
      },
      {
        "value": "5 weeks",
        "label": "to first version live"
      }
    ],
    "meta": {
      "industry": "Financial services",
      "services": [
        "AI support assistant",
        "Ongoing run and monthly tuning"
      ],
      "stack": [
        "AI support assistant",
        "Support inbox connection",
        "Payments platform connection",
        "Customer records connection",
        "Approval step for money actions",
        "Live reporting screen"
      ],
      "timeline": "5 weeks to first version live",
      "status": "Live, run by Infoloop"
    },
    "glance": [
      "Refund, account status and payment lookup messages are drafted by the assistant and approved by a person",
      "First response fell from hours to under two minutes",
      "Manual handling of the top categories fell 72% within a quarter"
    ],
    "situation": [
      "Most of the messages were the same handful of questions asked in different words."
    ],
    "approach": [
      "We read a week of real messages instead of asking managers. Three kinds of request followed rules the team knew by heart, using information the company already held: exactly the work software can take over. Everything else stayed with a person, agreed on day one."
    ],
    "built": [
      {
        "h3": "An assistant that sees what the agent sees",
        "body": "Joined up to the support inbox, the payments platform and the customer records, so it can see what an agent would otherwise have to go and look up."
      },
      {
        "h3": "Ready-written replies",
        "body": "Ready-written replies and one-click actions for the three commonest kinds of message."
      },
      {
        "h3": "A person approves anything involving money",
        "body": "A person has to press approve before anything involving money actually happens."
      },
      {
        "h3": "One screen for the queue",
        "body": "How much is coming in, how quickly it is answered, and how much the assistant handled on its own."
      }
    ],
    "results": [
      "A working version shipped in five weeks. Within a quarter, manual handling of the top categories fell 72% and first response dropped from hours to under two minutes. Agents moved to complex cases instead of copy-paste work, and the queue that used to build up over the weekend was mostly drafted and waiting for a yes by Monday morning.",
      "We still run the assistant. Each month we tune it as ticket patterns shift, teach it the new questions worth teaching, and tell the team plainly which ones should stay with a person. The client gets a support desk that keeps up with the business, without adding a row of desks every time sign-ups jump."
    ],
    "resultsSub": "A working version shipped in five weeks. Routine questions are now answered in minutes, agents work the cases that need a person, and we still run and tune the assistant every month.",
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "name": "",
      "role": "COO, fintech scale-up"
    },
    "dayToDay": {
      "h2": "What changed for the people on the desk",
      "lede": "The job got better, not smaller.",
      "items": [
        {
          "h3": "Monday morning stopped being dreaded",
          "body": "The weekend queue used to be waiting when the team logged on, and the first hours of the week went on clearing it. The routine messages are now drafted and waiting for a yes, so the day starts with checking work rather than digging out of it."
        },
        {
          "h3": "Nobody looks up the same thing twice",
          "body": "An agent used to hop between three screens to answer one question. The assistant gathers the same facts and puts them next to the message, with each figure labelled so the agent can see where it came from."
        },
        {
          "h3": "New starters are useful sooner",
          "body": "Learning the job used to mean shadowing someone until the standard answers stuck. A new agent now reads a draft, checks it against what the customer asked, and presses send or edits it. They are correcting rather than guessing."
        },
        {
          "h3": "Hard cases get the time they need",
          "body": "The messages that need a human, the upset customer or the case that does not fit, used to sit behind a long queue of easy ones. They now go to a person straight away, with the routine traffic already dealt with, so the agent has time to read properly and reply well."
        },
        {
          "h3": "The answer is the same whoever replies",
          "body": "Customers used to get slightly different answers depending on who picked the message up. The wording comes from one place now, so a policy change is made once and everybody is saying it by the afternoon. The support desk sounds like one company."
        },
        {
          "h3": "It keeps up with the business",
          "body": "Every new product brings new questions. Each month we read the messages the assistant struggled with, teach it the ones worth teaching, and tell the team plainly about the ones that should stay with a person. The assistant gets better as the business changes, rather than slowly going stale."
        }
      ]
    },
    "extra": {
      "eyebrow": "Control",
      "h2": "The rules we put around the assistant",
      "items": [
        {
          "h3": "It does not move money on its own",
          "body": "Anything that touches a customer's balance is prepared, not done. It goes to a person with the reason attached and waits for a yes. That line was drawn on the first day and it has not moved since, because it is the difference between a useful assistant and a very fast mistake."
        },
        {
          "h3": "Every answer shows its working",
          "body": "When the assistant writes a reply it also shows the records it read to write it. An agent can check the source in a glance instead of taking the answer on trust. If the reasoning looks wrong, it is obvious before the customer ever sees it, and the agent simply edits or rejects the draft."
        },
        {
          "h3": "It is allowed to say it does not know",
          "body": "Software that guesses confidently is worse than software that stops. When a message falls outside what the assistant has been taught, it hands over to a person and says why. We would rather it passed too much across than too little, and we review that balance every month."
        },
        {
          "h3": "You can switch it off in seconds",
          "body": "There is a single control that puts every message back in front of a human, and the team knows where it is. Nothing about the desk stops working without the assistant. We will not put an AI assistant live until that switch exists and somebody on your side has tried it."
        }
      ]
    },
    "tech": [
      "AI support assistant",
      "Support inbox connection",
      "Payments platform connection",
      "Customer records connection",
      "Approval step for money actions",
      "Live reporting screen"
    ],
    "note": "Client identified on request under NDA. Figures are this engagement's measured outcomes.",
    "seo": {
      "title": "AI support assistant cuts manual ticket work 72% | Infoloop",
      "description": "How Infoloop built and runs an AI support assistant for a fintech scale-up: manual ticket work down 72%, first response from hours to under two minutes."
    },
    "tile": "copilot",
    "links": [
      {
        "label": "AI and advanced tech solutions",
        "href": "/ai-and-emerging-technologies"
      },
      {
        "label": "Software for B2B SaaS",
        "href": "/industry/b2b-saas"
      }
    ],
    "cta": {
      "h2": "Take the routine out of [[your support desk]]",
      "lede": "Infoloop builds AI assistants that draft the routine replies while your people decide, and keeps them tuned every month.",
      "button": {
        "label": "Build my AI assistant",
        "href": "/contact"
      }
    },
    "datePublished": "2026-08-01",
    "challenges": [
      "Where has my refund got to, why is my account on hold, what was this payment for: the same three questions, all day",
      "Answering any one of them meant opening three different screens and copying numbers between them",
      "Agents were writing sentences they had already written many times that week",
      "The wait for a first reply had crept from minutes into hours, and customers had started to say so out loud",
      "Hiring another row of desks would only buy a few months"
    ],
    "challengeClose": "The business needed the routine questions answered quickly without taking judgement away from the people on the desk."
  },
  {
    "slug": "dtc-shopify-rebuild",
    "client": "A DTC brand",
    "named": false,
    "industry": "DTC retail",
    "industryKey": "retail",
    "services": [
      "Shopify development",
      "Conversion optimization",
      "Ongoing management"
    ],
    "serviceKeys": [
      "ecommerce"
    ],
    "tags": "Shopify and DTC retail",
    "title": "A Shopify rebuild that lifted conversion 38% and paid for itself in a quarter",
    "lede": "A DTC brand, one that sells straight to shoppers rather than through the high street, had a shop that looked lovely and sold badly. We rebuilt it on Shopify to be quick and easy to buy from, and we run it now.",
    "intro": {
      "sub": "The vision: a shop that sells as well as it looks",
      "paragraphs": [
        "A DTC brand, one that sells straight to shoppers rather than through the high street, had a shop that looked lovely and sold badly.",
        "The owners did not need a prettier shop. They needed one that turned the people already arriving into orders, on the same traffic, and they wanted it run and tuned after launch."
      ]
    },
    "card": {
      "title": "Storefront rebuild for a DTC brand",
      "blurb": "A faster, conversion-led Shopify rebuild lifted conversion 38% and added six figures of revenue in the first quarter.",
      "metric": "+38%",
      "metricLabel": "conversion"
    },
    "metrics": [
      {
        "value": "+38%",
        "label": "conversion rate"
      },
      {
        "value": "6 figures",
        "label": "added revenue in Q1"
      },
      {
        "value": "-1.8s",
        "label": "faster load time"
      }
    ],
    "meta": {
      "industry": "DTC retail",
      "services": [
        "Shopify development",
        "Conversion optimization",
        "Ongoing management"
      ],
      "stack": [
        "Shopify"
      ],
      "timeline": "",
      "status": "Live, run by Infoloop"
    },
    "glance": [
      "A DTC brand with a beautiful shop that people admired and did not buy from",
      "Conversion up 38% and six figures of revenue added in the first quarter, on the same traffic",
      "Rebuilt on Shopify, kept on brand, and run and tuned by Infoloop every month"
    ],
    "situation": [
      "The photography was beautiful and the brand had a following. People arrived, looked, and left."
    ],
    "approach": [
      "We did not start with opinions about the design. We watched recordings of shoppers on their phones until they gave up. Three things did most of the damage, one a checkout split across three screens. We rebuilt beside the old shop, which never shut."
    ],
    "built": [
      {
        "h3": "A storefront that appears quickly",
        "body": "Rebuilt on Shopify to appear quickly, on a phone first and a laptop second."
      },
      {
        "h3": "Product pages built around one question",
        "body": "Arranged around the one question a shopper is actually asking: is this right for me."
      },
      {
        "h3": "A shorter checkout",
        "body": "Only asks for what is needed to take the money and post the order."
      },
      {
        "h3": "One setting for the delivery promise",
        "body": "The product page, the cart and the checkout all say the same thing."
      },
      {
        "h3": "Reporting that shows where people leave",
        "body": "Exactly which step people leave at, so a bad week has an answer."
      }
    ],
    "results": [
      "Conversion rose 38% in the first quarter and the rebuild paid for itself within it, adding six figures of revenue on the same traffic. Mobile load time dropped by 1.8 seconds, nearly two seconds off every page a shopper on a phone opens. The extra orders came from people who were already visiting, not from a bigger advertising bill. The brand looks the same as it did. It simply sells now.",
      "The store did not go quiet after launch. We continue to run and tune it every month, keeping it patched, watching it live on busy days, and sending a short report on what stayed up, what we fixed and what we think is worth doing next."
    ],
    "resultsSub": "The rebuild paid for itself in the first quarter. More orders came from the people already visiting, not from a bigger advertising bill, and the brand looks the same as it did.",
    "quote": {
      "text": "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
      "name": "",
      "role": "Founder, DTC brand"
    },
    "dayToDay": {
      "h2": "What changed for the people running the shop",
      "lede": "Fewer arguments, faster answers.",
      "items": [
        {
          "h3": "A bad week has a cause",
          "body": "A quiet Monday used to start a debate about whether it was the adverts, the weather or the website. There is now one screen showing where shoppers stop. The answer is something you look up rather than something you argue about."
        },
        {
          "h3": "Adding a product no longer needs a developer",
          "body": "A new line used to mean waiting in a queue for somebody technical. The team now adds products, edits the wording and swaps images themselves, without a ticket or a delay. Nobody has to ring us to change a price on a Friday afternoon."
        },
        {
          "h3": "The phone is no longer the weak spot",
          "body": "Most of their shoppers arrive on a phone, often on a patchy signal, often standing up. The shop is now built for that first and the laptop version follows from it, rather than the other way round. Pages appear before the shopper has a reason to give up."
        },
        {
          "h3": "The delivery promise is written once",
          "body": "The cut-off time, the postage cost and the returns window used to sit in four places and agree in none. They now come from one setting, so what the product page promises is what the checkout charges. Nobody has to remember where else it needs updating."
        },
        {
          "h3": "A sale weekend is not a gamble",
          "body": "Busy days used to be the moment the shop slowed to a crawl. We test the shop against the rush before it happens and watch it live while it runs, so the best trading day of the season does not become the worst one. The team plans the offer, not the outage."
        },
        {
          "h3": "Somebody is still watching",
          "body": "We did not hand over a folder of notes and disappear. We keep the shop patched, keep an eye on it, and send a short report every month: what stayed up, what we fixed, what we think is worth doing next. That is what running the software means in practice."
        }
      ]
    },
    "extra": {
      "eyebrow": "Before they said yes",
      "h2": "The questions they asked first, and the honest answers",
      "items": [
        {
          "h3": "Will we drop out of Google?",
          "body": "This is the fear that stops most rebuilds, and it is a fair one. Every old web address is matched to its new home before launch, so a link in an old newsletter, an old advert or somebody else's blog still lands on the right page. We check the list with you rather than trusting it to sort itself out."
        },
        {
          "h3": "Does the brand have to change?",
          "body": "No. We kept the photography, the typefaces and the tone of voice. We changed the parts a shopper struggles with, not the parts they like. A rebuild that makes the shop faster and the brand unrecognisable has solved the wrong problem, and we would not put our name to it."
        },
        {
          "h3": "What happens to all our add-ons?",
          "body": "We list every add-on the shop uses, what it actually does and what it costs you in speed. Some earn their place. Some are doing a job the shop can do on its own, and a few are doing nothing at all. You decide which stay, with the trade-off written down in front of you."
        },
        {
          "h3": "How long are we shut for?",
          "body": "You are not shut at all. The new shop is built alongside the old one and you click through a private copy of it first. The swap only happens once you have tried it yourself, placed a test order and said you are happy. Your customers never see a closed sign."
        }
      ]
    },
    "tech": [
      "Shopify",
      "Session recordings",
      "Drop-off reporting",
      "Load testing",
      "Redirect mapping"
    ],
    "note": "Client identified on request under NDA. Figures are this engagement's measured outcomes.",
    "seo": {
      "title": "Shopify rebuild lifts conversion 38% | Infoloop",
      "description": "How Infoloop rebuilt a DTC brand's Shopify store to load faster and sell more: conversion up 38%, six figures added in the first quarter, and we still run it."
    },
    "tile": "shopify",
    "links": [
      {
        "label": "eCommerce and digital storefronts",
        "href": "/ecommerce-development"
      },
      {
        "label": "Software for D2C brands",
        "href": "/industry/d2c-brands"
      }
    ],
    "cta": {
      "h2": "Turn your visitors [[into orders]]",
      "lede": "Infoloop rebuilds Shopify stores to be quick and easy to buy from, on brand, and runs them after launch.",
      "button": {
        "label": "Rebuild my Shopify store",
        "href": "/contact"
      }
    },
    "datePublished": "2026-08-01",
    "challenges": [
      "On a phone the pages took an uncomfortable moment to appear, and a shopper on a train or in a queue does not wait",
      "The product page put the price in one place, the sizing in another and the delivery promise further down, so a simple question took real effort to answer",
      "The checkout asked for details nobody needs to hand over to receive a parcel",
      "The advertising budget kept climbing while sales stayed where they were, so every new visitor cost more than the last"
    ],
    "challengeClose": "The shop had to become quick and easy to buy from, without changing the brand."
  },
  {
    "slug": "manufacturing-attendance-opsdeck",
    "client": "A manufacturer with three plants",
    "named": false,
    "industry": "Manufacturing",
    "industryKey": "manufacturing",
    "services": [
      "OpsDeck attendance software",
      "Per-plant setup and rollout",
      "Ongoing run with a monthly report"
    ],
    "serviceKeys": [
      "products"
    ],
    "tags": "Attendance and manufacturing",
    "title": "90% less timesheet admin across three manufacturing plants",
    "lede": "A manufacturer was adding up hours by hand across three sites, and payday was an argument. We put in OpsDeck, our attendance software, set it to their shifts, and we run it for them.",
    "intro": {
      "sub": "The vision: payday as a file, not a week of chasing hours",
      "paragraphs": [
        "A manufacturer with three plants was adding up hours by hand, and payday was an argument.",
        "The brief was OpsDeck, our attendance software for manufacturing, set to their shifts, breaks and overtime bands, live quickly across all three sites, and run by Infoloop after launch."
      ]
    },
    "card": {
      "title": "Attendance across three manufacturing plants",
      "blurb": "OpsDeck went live across three plants in three weeks. Daily error flags stop missed punches before payroll, and timesheet admin fell 90%.",
      "metric": "90%",
      "metricLabel": "less timesheet admin"
    },
    "metrics": [
      {
        "value": "90%",
        "label": "less timesheet admin"
      },
      {
        "value": "0",
        "label": "missed punches in payroll"
      },
      {
        "value": "3 weeks",
        "label": "to go live across sites"
      }
    ],
    "meta": {
      "industry": "Manufacturing",
      "services": [
        "OpsDeck attendance software",
        "Per-plant configuration and rollout",
        "Ongoing run with a monthly report"
      ],
      "stack": [
        "OpsDeck",
        "Wall-mounted clock-in readers",
        "Phone clock-in",
        "Daily error flags",
        "Payroll-ready export"
      ],
      "timeline": "3 weeks to go live across three sites",
      "status": "Live, run by Infoloop"
    },
    "glance": [
      "Three plants, one attendance product, live in three weeks",
      "Missed punches caught the next morning, before they reach payroll",
      "One button produces the file payroll already accepts, with a record behind every hour"
    ],
    "situation": [
      "Across three plants, attendance lived in a mix of paper sign-in sheets, spreadsheets nobody fully trusted and an old clock on a wall."
    ],
    "approach": [
      "We did not start from a blank page. OpsDeck was already running elsewhere, so the work was fitting it to their three plants. It flags impossible hours: a shift twice as long as it should be, or one person at two sites at once."
    ],
    "built": [
      {
        "h3": "Clock-in at the gate or on a phone",
        "body": "Working the same way across all three sites."
      },
      {
        "h3": "Rules set per plant",
        "body": "Shift, break and overtime rules set up separately for each plant, because each plant runs differently."
      },
      {
        "h3": "Daily flags on anything that looks wrong",
        "body": "Sent to the supervisor who can actually ask the person about it."
      },
      {
        "h3": "One button for payroll",
        "body": "Produces the file payroll already accepts, with a record behind every hour on it."
      }
    ],
    "results": [
      "OpsDeck went live across all three sites in three weeks. Missed punches stopped reaching payroll. Timesheet admin dropped by 90%. Disputes are now settled in minutes from the audit trail, because there is a record showing when somebody was in and who changed it if it was changed.",
      "Payday is now a file, not a week of chasing. And the software did not stop being our responsibility at launch. Infoloop monitors and improves OpsDeck for this manufacturer every month, and the client gets a report, the fixes and one clear next step each time."
    ],
    "resultsSub": "OpsDeck went live across all three sites in three weeks. Payday became a file, disputes are settled from the record, and Infoloop monitors and improves it every month.",
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "name": "",
      "role": "Operations lead, manufacturer"
    },
    "dayToDay": {
      "h2": "What changed for the people who deal with hours",
      "lede": "The week back, and what the office, the supervisors and the plants do with it.",
      "items": [
        {
          "h3": "Payday is a quiet day",
          "body": "The run-up to payroll used to fill the office diary. The hours are already agreed by the time the file is produced, so the job is checking and sending rather than reconstructing the month from memory. Nobody is ringing supervisors about a name with no finish time the day before wages go out."
        },
        {
          "h3": "Supervisors fix things the same day",
          "body": "A missing finish time used to surface weeks later, when the only honest answer was a guess. It now appears on the supervisor's list the next morning, while the person is still on site and can simply be asked. The correction is recorded next to the original, so nothing is quietly overwritten."
        },
        {
          "h3": "Arguments end with a record",
          "body": "When somebody says they were in, there is a record showing when and where, and who changed it if it was changed. That turns a difficult conversation into a short one, and it protects the person as often as it protects the company. Nobody has to rely on memory or take a side."
        },
        {
          "h3": "Agency hours match the invoice",
          "body": "Contract and agency staff used to be counted by one set of paperwork and billed on another. Both now come from the same clock-in, so the invoice can be checked against the gate rather than taken on trust. Two versions of the same week no longer have to be reconciled by hand."
        },
        {
          "h3": "Who is on site is a live question",
          "body": "In a fire drill, the answer used to be a headcount and a hope. There is now a current list of everybody clocked in at each site, permanent and agency staff alike, which matters far more on the one day you need it than on the other three hundred."
        },
        {
          "h3": "The three plants can be compared",
          "body": "Absence, lateness and overtime used to be counted differently at each site, which made comparing them meaningless. They are counted the same way now, so a pattern at one plant is visible rather than buried in three different spreadsheets, and a manager can act on it."
        }
      ]
    },
    "extra": {
      "eyebrow": "The awkward bits",
      "h2": "Where hours actually go wrong, and what we built for it",
      "items": [
        {
          "h3": "The shift that crosses midnight",
          "body": "A night shift starts on one day and ends on the next, and a surprising amount of attendance software gets that wrong or asks a human to sort it out afterwards. The rules were set up so the hours land on the right day and the right rate without anybody intervening."
        },
        {
          "h3": "The contractor gate",
          "body": "Agency and contract staff come and go on different terms, sometimes at short notice, often through a different entrance. They clock in on the same software as everybody else, so the headcount is a real number rather than the permanent staff plus an estimate."
        },
        {
          "h3": "The forgotten punch",
          "body": "People forget. They will forget on your software too. The point is not to stop it but to catch it immediately, put it in front of somebody who can ask, and record the correction so the fix is as traceable as the original."
        },
        {
          "h3": "The rule that only applies at one plant",
          "body": "Every site has one: a break that is paid here and not there, a bank holiday handled differently, an overtime band nobody wrote down. We collected those before configuring anything, because they are exactly what makes standard software feel wrong on the floor."
        }
      ]
    },
    "tech": [
      "OpsDeck",
      "Wall-mounted clock-in readers",
      "Phone clock-in",
      "Daily error flags",
      "Per-plant shift, break and overtime rules",
      "Payroll-ready export",
      "Audit trail",
      "Live on-site headcount"
    ],
    "note": "Client identified on request under NDA. Figures are this engagement's measured outcomes.",
    "seo": {
      "title": "Attendance case study: 90% less timesheet admin | Infoloop",
      "description": "How Infoloop put OpsDeck attendance software live across three manufacturing plants in three weeks, stopping missed punches and cutting timesheet admin 90%."
    },
    "tile": "attendance",
    "links": [
      {
        "label": "OpsDeck, attendance for manufacturing",
        "href": "/products/opsdeck"
      },
      {
        "label": "Software for manufacturing",
        "href": "/industry/manufacturing"
      }
    ],
    "cta": {
      "h2": "Make payday a file, [[not a week]]",
      "lede": "OpsDeck sets attendance to your shifts and plants, and Infoloop runs it for you every month.",
      "button": {
        "label": "Set up OpsDeck for my plants",
        "href": "/contact"
      }
    },
    "datePublished": "2026-08-01",
    "challenges": [
      "Every payday the office lost days adding hours up and ringing supervisors about a name with no finish time",
      "Overtime arguments had no record to settle them from",
      "Some of it was honest confusion, some of it a machine that had not read a card properly, and once in a while a genuine mistake reached somebody's wage packet",
      "Good people were spending days every month on arithmetic instead of running the plants"
    ],
    "challengeClose": "The plants needed one way to count hours, and a record behind every one of them."
  }
];
