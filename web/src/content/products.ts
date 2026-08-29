/**
 * Product pages (OpsDeck, GarageZone, LoopIQ). Structure modelled on
 * 7Span's Vepaar page: brand banner with a big tagline and floating icons,
 * product mark tile overlapping the banner, H1 + one line, "Visit"-style
 * strip with the demo button, "The idea" with a big screen, feature block
 * one (four cards + screen), a two-beat dark statement, feature block two
 * (AI and automation), a "works with" row, "The impact" with four numbers,
 * FAQ, closing CTA.
 *
 * Copy is a verified rewrite of the product pages published on infoloop.co
 * (site/src/pages/attendance-management-system.astro,
 * garage-management-system.astro, lms-testing-platform.astro). Only numbers
 * and capabilities from those pages. Rules: no "system(s)", no em dashes,
 * "Infoloop" with a capital I, one H1, an H2 per section, H3 per card.
 */
import type { IndustryKey, TileKind } from "./work";

export type Feature = { h3: string; body: string };

export type Product = {
  slug: string;
  name: string;
  /** Descriptor under the name, e.g. "Attendance software for manufacturing". */
  kicker: string;
  /** Banner slogan, two or three short lines. */
  tagline: string[];
  h1: string;
  lede: string;
  industryKey: IndustryKey;
  tile: Extract<TileKind, "attendance" | "garage" | "lms" | "verko">;
  /** Related case study slug, if any. */
  caseSlug: string;
  /** The product's own website; the hatched strip shows "Visit <name>" when set (7Span "Visit"). */
  website?: string;
  idea: { h2: string; paragraph: string };
  block1: { h2: string; sub: string; features: Feature[] };
  dark: { h2: string; paragraph: string };
  block2: { h2: string; sub: string; features: Feature[] };
  /** Things it works with, from the source only. */
  worksWith: string[];
  impact: { paragraph: string; metrics: { value: string; label: string }[] };
  faq: { q: string; a: string }[];
  cta: { h2: string; lede: string; button: string };
  seo: { title: string; description: string; image?: { url: string; alt?: string }; llmSummary?: string; noindex?: boolean };
  /** Optional real screenshots from the CMS; the drawn tile is the fallback. */
  screens?: { url: string; alt?: string }[];
  order?: number;
};

export type ProductsIndex = {
  h1: string;
  lede: string;
  seo: { title: string; description: string; image?: { url: string; alt?: string }; llmSummary?: string; noindex?: boolean };
  cta: { h2: string; lede: string; button: { label: string; href: string } };
};

export const PRODUCTS_INDEX: ProductsIndex = {
  h1: "Products",
  lede: "Ready-built software we run for you: attendance for plants, garage management for workshops, a learning and testing platform for training teams, and AI governance and compliance for AI teams. Set to how you work, live in weeks.",
  seo: {
    title: "Products: OpsDeck, GarageZone, LoopIQ, Verko | Infoloop",
    description: "Ready-built software from Infoloop: OpsDeck attendance, GarageZone for workshops, LoopIQ training, Verko AI compliance. Live in weeks, run by us.",
  },
  cta: { h2: "Not sure this is [[the exact fit]]?", lede: "These products are ready to deploy. When your workflow needs something different, we build custom software and run it the same way.", button: { label: "Book a call", href: "/contact" } },
};

// Verified rewrite of the published product pages (site/src/pages/*-system.astro, lms-testing-platform.astro).
export const PRODUCTS: Product[] = [
  {
    "slug": "opsdeck",
    "name": "OpsDeck",
    "kicker": "Attendance software for manufacturing",
    "tagline": [
      "Every punch counted.",
      "Every hour approved.",
      "Payroll in one click."
    ],
    "h1": "OpsDeck: attendance software that tracks every shift on the floor",
    "lede": "OpsDeck is ready-built attendance software for manufacturing teams: shifts, breaks and overtime with biometric clock-in, AI flags on anything that looks wrong, and payroll-ready exports in one click.",
    "industryKey": "manufacturing",
    "tile": "attendance",
    "caseSlug": "manufacturing-attendance-opsdeck",
    "website": "https://opsdeck.app",
    "idea": {
      "h2": "The idea: attendance built for shift work, not office hours",
      "paragraph": "Plants run on rotating shifts, night shifts and overtime bands, and hours are still added up by hand across sites. OpsDeck was built for that. People clock in with a fingerprint, a card or a phone. Breaks, overtime and late starts are captured against each shift as they happen. Anything that looks wrong goes to a supervisor the same day. When payroll comes round, the approved hours are already there, ready to export in one click."
    },
    "block1": {
      "h2": "What OpsDeck does on the floor",
      "sub": "Clock-in, shifts and payroll in one place, set to how your plant works.",
      "features": [
        {
          "h3": "Shift and roster tracking",
          "body": "Plan shifts, track attendance against them and see who is on the floor right now, across every line and site."
        },
        {
          "h3": "Biometric and clock-in",
          "body": "Fingerprint, face, RFID card or a phone app with geofencing. Accurate to the minute and hard to game. Mix methods across sites and lines."
        },
        {
          "h3": "Breaks and overtime",
          "body": "Breaks, overtime and late starts are captured automatically against each shift, so nobody reconstructs the week from memory before payroll."
        },
        {
          "h3": "Payroll-ready exports",
          "body": "Approved hours export to your payroll in one click, with overtime and breaks already calculated. No spreadsheets, and a record behind every hour."
        }
      ]
    },
    "dark": {
      "h2": "A clock on the wall counts hours. OpsDeck notices when they look wrong.",
      "paragraph": "A start with no finish. A shift twice as long as it should be. Someone marked in at two sites at once. A spreadsheet never notices, and payroll pays it. OpsDeck puts it in front of a supervisor while the day is still fresh, so the fix happens before the file goes out, not after."
    },
    "block2": {
      "h2": "AI that catches what a spreadsheet never will",
      "sub": "Anomalies, overtime creep and compliance gaps surface before they hit payroll.",
      "features": [
        {
          "h3": "Anomaly detection",
          "body": "Missed punches, duplicate scans, buddy-punching and unusual patterns are flagged for a supervisor to check, the same day rather than weeks later."
        },
        {
          "h3": "Overtime and cost alerts",
          "body": "Get warned when overtime is trending over budget, by line and by shift, while there is still time to do something about it."
        },
        {
          "h3": "Compliance and audit trail",
          "body": "Every change is logged next to the original, so audits and disputes are settled in minutes from the record, not from memory."
        },
        {
          "h3": "Multi-site dashboards",
          "body": "Roll up attendance across lines, shifts and sites in a single view, with permissions per supervisor so each plant sees its own."
        }
      ]
    },
    "worksWith": [
      "Fingerprint and face readers",
      "RFID cards",
      "Mobile app with geofencing",
      "Wall-mounted clock-in readers",
      "Common payroll software",
      "Multiple sites and lines"
    ],
    "impact": {
      "paragraph": "For a manufacturer with three plants, OpsDeck went live across all sites in three weeks. Missed punches stopped reaching payroll, timesheet admin dropped by 90% and disputes are now settled in minutes from the audit trail. Payday became a file, and Infoloop monitors, fixes and reports on it every month.",
      "metrics": [
        {
          "value": "0",
          "label": "missed punches slipping into payroll"
        },
        {
          "value": "90%",
          "label": "less time on timesheets"
        },
        {
          "value": "2 to 4 weeks",
          "label": "from sign-off to live"
        },
        {
          "value": "1 click",
          "label": "to a payroll export"
        }
      ]
    },
    "faq": [
      {
        "q": "What clock-in methods does OpsDeck support?",
        "a": "Biometric clock-in with fingerprint or face, RFID cards, and a mobile app with geofencing. You can mix methods across sites and lines, so a wall reader at the gate and a phone for people on the move both feed the same record."
      },
      {
        "q": "Does OpsDeck export to our payroll?",
        "a": "Yes. Approved hours export to common payroll software in one click, with overtime and breaks already calculated. There is a record behind every hour on the file, so the numbers can be checked rather than taken on trust."
      },
      {
        "q": "Can it handle multiple shifts and sites?",
        "a": "Yes. Rotating shifts, night shifts and multiple sites roll up into one dashboard, with permissions per supervisor. Shift, break and overtime rules can be set separately for each plant, because each plant runs differently."
      },
      {
        "q": "How does the AI help?",
        "a": "It flags missed punches, buddy-punching and overtime creep so supervisors fix issues before payroll runs, not after. Flags go to the person who can actually ask about them, while the day is still fresh."
      }
    ],
    "cta": {
      "h2": "See OpsDeck on [[your shifts]].",
      "lede": "A 20 minute walkthrough on your use case, then a clear scope, timeline and price. Live in 2 to 4 weeks, and we run it after launch.",
      "button": "Book an OpsDeck demo"
    },
    "seo": {
      "title": "OpsDeck: attendance software for manufacturing | Infoloop",
      "description": "OpsDeck is attendance software for manufacturing: biometric clock-in, AI flags on missed punches and payroll exports in one click. Live in 2 to 4 weeks."
    },
    "order": 1
  },
  {
    "slug": "garagezone",
    "name": "GarageZone",
    "kicker": "Garage management software for workshops",
    "tagline": [
      "Every car.",
      "Every bay.",
      "One screen."
    ],
    "h1": "GarageZone: garage software that runs the whole workshop from one screen",
    "lede": "Ready-built garage management software for automotive workshops and service centers: job cards, bookings, parts, invoicing and reminders, with AI handling the follow-ups and stock alerts.",
    "industryKey": "automotive",
    "tile": "garage",
    "caseSlug": "brightlane-auto-group-garagezone",
    "website": "https://garagezone.com",
    "idea": {
      "h2": "The idea: the whole workshop on one screen",
      "paragraph": "Most workshops run on a diary, a whiteboard, a parts shelf and a stack of invoices that only one person really understands. GarageZone puts job cards, bookings, parts, invoicing and reminders in one place, so the counter, the bays and the office all see the same day. It is ready to deploy. We set it up around your job types, bays and pricing, then run it after launch."
    },
    "block1": {
      "h2": "Everything a busy workshop needs, in one place",
      "sub": "Four things GarageZone does every day, from check-in to handover.",
      "features": [
        {
          "h3": "Digital job cards",
          "body": "Every job is tracked from check-in to handover, with the full service history for each vehicle. Technicians see the day on one screen instead of walking back to the office to ask."
        },
        {
          "h3": "Online bookings",
          "body": "Customers book online and the slot lands against a free bay and an available technician. The calendar fills itself and the counter stops playing phone tag."
        },
        {
          "h3": "Parts inventory",
          "body": "Stock is tracked in real time, with suppliers and costs attached to each part so margins stay accurate. GarageZone flags what to reorder before a job is held up."
        },
        {
          "h3": "Invoicing and payments",
          "body": "Quote, invoice and take payment in a few taps, synced to your accounts. Unpaid invoices are chased automatically, so the money comes in without a phone call."
        }
      ]
    },
    "dark": {
      "h2": "Booking the car in was the first step. Bringing it back was the next.",
      "paragraph": "A workshop makes its money on repeat work, and repeat work depends on somebody remembering to call. GarageZone remembers for you. Reminders, stock alerts and follow-ups run on their own, on top of the data your team already captures on the job card."
    },
    "block2": {
      "h2": "The AI does the chasing, so your team does the work",
      "sub": "Reminders, stock alerts and follow-ups run on their own, on top of the data you already capture.",
      "features": [
        {
          "h3": "Automatic service reminders",
          "body": "SMS and email go out when a service or inspection is due, with one-tap rebooking, so customers come back without anyone at the counter picking up the phone."
        },
        {
          "h3": "Smart stock reorder",
          "body": "GarageZone watches parts usage and flags what to reorder before a job is held up waiting on a part that should already have been on the shelf."
        },
        {
          "h3": "No-show and follow-up nudges",
          "body": "Missed appointments and unpaid invoices get chased without you lifting a finger, so the diary stays full and the invoices get paid."
        },
        {
          "h3": "Reports and KPIs",
          "body": "See technician productivity, revenue per bay and what to fix this week, per site and across the group, on one screen instead of a spreadsheet at 10pm."
        }
      ]
    },
    "worksWith": [
      "SMS",
      "Email",
      "Online booking",
      "Payments",
      "Your accounts"
    ],
    "impact": {
      "paragraph": "GarageZone is ready to deploy. We set it up around your job types, bays and pricing, and most workshops are live in about three weeks. Workshops get back around three hours of admin a day, reminders bring customers back with 28% more repeat bookings, and the whole shop runs from one screen.",
      "metrics": [
        {
          "value": "3 hrs",
          "label": "admin saved per day, per workshop"
        },
        {
          "value": "+28%",
          "label": "repeat bookings from reminders"
        },
        {
          "value": "3 wks",
          "label": "from sign-off to live"
        },
        {
          "value": "1 screen",
          "label": "to run the whole shop"
        }
      ]
    },
    "faq": [
      {
        "q": "Will it fit how my workshop already works?",
        "a": "Yes. GarageZone is ready to deploy, and we configure job types, bays, pricing and reminders to match your workshop before you go live. Brightlane Auto Group, for example, runs it with their own services, prices and job times rather than a generic list."
      },
      {
        "q": "Can customers book online?",
        "a": "Yes. Online booking is built in and syncs with your bays and technician availability, so the calendar fills without phone tag. Canceled slots can be offered straight away to people on the waiting list, so a cancellation is not a lost morning."
      },
      {
        "q": "Does it handle parts and suppliers?",
        "a": "Yes. Parts are tracked in real time and GarageZone flags items to reorder before a job is held up. You can attach suppliers and costs to each part so margins stay accurate."
      },
      {
        "q": "How fast can we be live?",
        "a": "Most workshops are live in about three weeks. We migrate your customer and vehicle data, set up your job types and pricing, and train your team before launch. Multi-site groups go live one branch at a time, so nobody loses a working day."
      }
    ],
    "cta": {
      "h2": "See GarageZone on [[your workshop]].",
      "lede": "A 20 minute walkthrough on a problem you pick, then a clear scope, timeline and price. Most workshops are live in about three weeks.",
      "button": "Book a GarageZone demo"
    },
    "seo": {
      "title": "GarageZone garage management software | Infoloop",
      "description": "Ready-built garage management software for workshops and service centers: job cards, bookings, parts, invoicing and AI reminders. Live in about three weeks."
    },
    "order": 2
  },
  {
    "slug": "loopiq",
    "name": "LoopIQ",
    "kicker": "Learning and testing platform for training providers",
    "tagline": [
      "Every course.",
      "Every exam.",
      "Every certificate."
    ],
    "h1": "LoopIQ: deliver courses, run tests, issue certificates",
    "lede": "LoopIQ is a ready-built learning and online testing platform for training providers, staffing firms and assessors, with course delivery, proctored exams, AI-assisted grading and certificates that renew on time.",
    "industryKey": "staffing",
    "tile": "lms",
    "caseSlug": "",
    "website": "https://loopiq.io",
    "idea": {
      "h2": "The idea: one platform from enrollment to certificate",
      "paragraph": "Most training teams run courses in one tool, tests in another and certificates in a spreadsheet. LoopIQ puts the whole journey in one place. Learners take the course, sit a timed exam under AI proctoring and receive a branded certificate the moment they pass. Your team sees pass rates, compliance and a full audit trail for every cohort, without chasing paperwork."
    },
    "block1": {
      "h2": "Core features: courses, tests, proctoring and certificates",
      "sub": "The four things a training team needs every day, built in from the start.",
      "features": [
        {
          "h3": "Course delivery",
          "body": "Build and deliver courses with video and documents, and track progress for every learner, so you know who has finished and who needs a nudge."
        },
        {
          "h3": "Online testing",
          "body": "Question banks, randomized exams and timed tests that scale to thousands of candidates at once, so a big intake does not mean a big queue."
        },
        {
          "h3": "Proctoring",
          "body": "AI proctoring watches the webcam and screen during remote exams and flags suspicious behavior for review, so results earned at home stay credible."
        },
        {
          "h3": "Certification",
          "body": "Branded certificates are issued automatically when a learner passes, with expiry tracking and renewals, so nobody's qualification quietly lapses."
        }
      ]
    },
    "dark": {
      "h2": "Delivering the course was the first step. Proving the result came next.",
      "paragraph": "A test only counts if people trust it. LoopIQ pairs randomized, timed exams with AI proctoring and a complete audit trail on every result, so a certificate from your organization means the learner did the work. Assessors keep the final say. The software makes it hard to cheat and easy to check."
    },
    "block2": {
      "h2": "AI takes the admin out of assessment",
      "sub": "Grading, proctoring and reminders run on their own, so your team focuses on teaching, not paperwork.",
      "features": [
        {
          "h3": "AI-assisted grading",
          "body": "Open-text and short answers are pre-graded, then your assessors confirm in seconds. Grading runs 5x faster with AI assist, with a human in the loop on every mark."
        },
        {
          "h3": "AI proctoring",
          "body": "Flags tab-switching, multiple faces and absence during remote exams, so you can trust the results without watching every candidate yourself."
        },
        {
          "h3": "Renewal reminders",
          "body": "Learners are nudged before their certificate expires, so renewals happen on time and repeat enrollments come in without a chase."
        },
        {
          "h3": "Reporting and compliance",
          "body": "Pass rates, compliance status and audit trails for every cohort, ready the moment an auditor or a client asks for them."
        }
      ]
    },
    "worksWith": [
      "Your CRM",
      "Your HR tools",
      "Result and certificate exports",
      "Video and document courses",
      "Webcam and screen proctoring"
    ],
    "impact": {
      "paragraph": "LoopIQ is ready to deploy. We configure your courses, assessment rules and branding, and you are live in 3 to 5 weeks from sign-off. Grading runs 5x faster with AI assist, thousands of exams can run at once, and every result carries a full audit trail. We run it after launch, monitored, fixed and reported every month.",
      "metrics": [
        {
          "value": "5x",
          "label": "faster grading with AI assist"
        },
        {
          "value": "1,000s",
          "label": "of exams run at once"
        },
        {
          "value": "3 to 5 wks",
          "label": "from sign-off to live"
        },
        {
          "value": "100%",
          "label": "audit trail on every result"
        }
      ]
    },
    "faq": [
      {
        "q": "Who is LoopIQ built for?",
        "a": "Training providers, staffing and recruitment firms, assessors and any team that delivers courses and needs credible testing and certification. If you enrol learners, examine them and issue a certificate at the end, LoopIQ covers the whole journey in one place."
      },
      {
        "q": "How does proctoring work?",
        "a": "AI proctoring monitors the webcam and screen during an exam and flags suspicious behavior, such as tab-switching, multiple faces or absence, for your team to review. Remote results stay trustworthy, and a person makes the final call on every flag."
      },
      {
        "q": "Can we use our own branding and certificates?",
        "a": "Yes. Courses, the learner portal and certificates all carry your brand, and we configure your assessment rules before launch, so LoopIQ looks and behaves like your own product from the first day your learners log in."
      },
      {
        "q": "Does it connect to the tools we already use?",
        "a": "Yes. LoopIQ connects to your CRM or HR tools and exports results and certificates, so learner records stay in sync and nobody has to re-key a pass mark into another app."
      }
    ],
    "cta": {
      "h2": "See LoopIQ on [[your use case]].",
      "lede": "A 20 minute walkthrough, no slides. Live in 3 to 5 weeks from sign-off.",
      "button": "Book a LoopIQ demo"
    },
    "seo": {
      "title": "LoopIQ: LMS and online testing platform | Infoloop",
      "description": "LoopIQ: a ready-built LMS and testing platform for training providers, staffing firms and assessors. Courses, proctored exams, AI grading and certificates."
    },
    "order": 3
  },
  {
    "slug": "verko",
    "name": "Verko",
    "kicker": "AI governance and compliance platform",
    "tagline": [
      "Every model.",
      "Every framework.",
      "Audit-ready."
    ],
    "h1": "Verko: AI governance and privacy on autopilot",
    "lede": "Verko automates risk assessments, evidence collection and audit preparation across 15+ regulatory frameworks, from the EU AI Act to SOC 2, on one platform.",
    "industryKey": "saas",
    "tile": "verko",
    "caseSlug": "",
    "website": "https://verko.ai",
    "idea": {
      "h2": "The idea: compliance that keeps up with the AI you ship",
      "paragraph": "Teams building with AI now answer to more than one rulebook: the EU AI Act, NIST AI RMF, SOC 2, GDPR, ISO 42001 and more. Doing that by hand means spreadsheets, screenshots and a scramble before every audit. Verko connects to the tools you already use, maps your controls to each framework, collects the evidence as you work, scores the risk of each AI model, and keeps you audit-ready without a separate project every quarter."
    },
    "block1": {
      "h2": "Everything you need for AI compliance",
      "sub": "Six things Verko does so your team does not have to.",
      "features": [
        {
          "h3": "15+ frameworks",
          "body": "EU AI Act, NIST AI RMF, SOC 2, GDPR, ISO 42001, DPDPA and more, mapped once and kept in step, so one set of controls answers many rulebooks."
        },
        {
          "h3": "Auto evidence collection",
          "body": "Evidence is gathered from your connected tools as you work, filed against the right control, and ready when an auditor asks for it."
        },
        {
          "h3": "Risk scoring",
          "body": "Each AI model gets a risk score, so you can see which ones need attention first and show your reasoning when asked."
        },
        {
          "h3": "Approval workflows and compliance calendar",
          "body": "Policies and changes go through approvals, and deadlines for every framework sit on one calendar with automated tracking."
        }
      ]
    },
    "dark": {
      "h2": "Passing one audit was the first step. Staying compliant every day came next.",
      "paragraph": "Compliance is not a document, it is a state you have to keep. Verko keeps the evidence flowing, the risk scores current and the calendar honest, so the next audit is a report you download rather than a month you lose."
    },
    "block2": {
      "h2": "Up and running in minutes",
      "sub": "Three steps from sign-up to a live compliance picture, with setup in about five minutes.",
      "features": [
        {
          "h3": "Connect your stack",
          "body": "Link AWS, GitHub, Okta and 20+ other tools. Verko starts reading the signals it needs from the places your team already works."
        },
        {
          "h3": "Auto-map controls",
          "body": "Your existing controls are mapped to every framework you select, so you see the gaps on day one instead of after the first audit."
        },
        {
          "h3": "Stay compliant",
          "body": "Audit-ready reports, a live compliance score and deadline tracking keep the picture current as your models and your rules change."
        }
      ]
    },
    "worksWith": [
      "AWS",
      "GitHub",
      "Okta",
      "20+ tools",
      "SSO and on-premise (Enterprise)"
    ],
    "impact": {
      "paragraph": "Verko is built for compliance and AI teams at startups and large organizations. It starts free with one model and one framework, scales through Starter and Growth plans, and every paid plan comes with a 14-day free trial on Growth. Enterprise adds unlimited models, all frameworks, unlimited seats, SSO and on-premise.",
      "metrics": [
        {
          "value": "15+",
          "label": "regulatory frameworks on one platform"
        },
        {
          "value": "20+",
          "label": "tools it connects to, from AWS to Okta"
        },
        {
          "value": "5 min",
          "label": "setup, then auto-mapped controls"
        },
        {
          "value": "14 days",
          "label": "free trial on the Growth plan"
        }
      ]
    },
    "faq": [
      {
        "q": "Which frameworks does Verko cover?",
        "a": "The EU AI Act, NIST AI RMF, SOC 2, GDPR, ISO 42001 and DPDPA among 15+ frameworks. Controls are mapped once and reused across every framework you select, so adding a new one does not mean starting again."
      },
      {
        "q": "How does evidence collection work?",
        "a": "Verko connects to the tools your team already uses, such as AWS, GitHub and Okta, and collects evidence from them automatically. Each item is filed against the right control and stays ready for the next audit."
      },
      {
        "q": "How long does setup take?",
        "a": "About five minutes to connect your stack and pick your frameworks. Verko then maps your existing controls automatically, so you see gaps and risk scores on day one."
      },
      {
        "q": "What does Verko cost?",
        "a": "There is a free plan with one AI model, one framework and one seat. Starter is $249 a month, Growth is $799 a month with all frameworks, and Enterprise is custom with unlimited models, seats, SSO and on-premise. Every paid plan starts with a 14-day free trial on Growth."
      }
    ],
    "cta": {
      "h2": "Put your AI compliance [[on autopilot]].",
      "lede": "Start free, or book a demo and see your frameworks mapped in one call.",
      "button": "Book a Verko demo"
    },
    "seo": {
      "title": "Verko: AI governance and compliance platform | Infoloop",
      "description": "Verko automates AI risk assessments, evidence collection and audit preparation across 15+ frameworks, from the EU AI Act to SOC 2. Setup in minutes."
    },
    "order": 4
  }
];
