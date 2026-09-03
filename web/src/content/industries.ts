/**
 * Industry pages (/industry/<slug>), 7Span's industry page format
 * (their /industry/manufacturing): hero (eyebrow, H1 left, line right,
 * wide visual with the button overlapping) → context (hatched rail: H2,
 * lede, paragraphs, bullets) → four numbers → challenges we solve (stacked
 * cards + visual) → marquee → case studies (tabs) → business outcomes (dark,
 * visual + list) → trusted-by strip → one client quote → blogs → FAQs → CTA.
 * First page: Manufacturing, the template for the rest. Copy is a plain
 * rewrite of the old site's page (site/src/content/pages/manufacturing.json);
 * numbers only where published.
 */
import type { TileKind } from "./work";

export type IndustryDetail = {
  slug: string;
  name: string;
  eyebrow: string;
  h1: string;
  lede: string;
  button: string;
  /** One drawn case screen for the wide hero visual (until a photo exists). */
  heroTile: TileKind;
  context: { h2: string; lede: string; paragraphs: string[]; bullets: string[]; close: string };
  numbers: { value: string; label: string; href: string }[];
  challenges: { h2: string; lede: string; items: { title: string; body: string }[]; tile: TileKind };
  band: [string, string];
  cases: { h2: string; lede: string; items: { slug: string; label: string }[]; button: string };
  outcomes: { h2: string; lede: string; items: { title: string; body: string }[]; tile: TileKind };
  trust: { h2: string; sub: string };
  quote: { text: string; role: string; caseSlug: string };
  faq: { eyebrow: string; h2: string; lede: string; items: { q: string; a: string }[] };
  cta: { h2: string; lede: string; button: string };
  blogCategory: string;
  seo: { title: string; description: string; image?: { url: string; alt?: string }; llmSummary?: string; noindex?: boolean };
};

export const INDUSTRIES_DETAIL: IndustryDetail[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    eyebrow: "Manufacturing",
    h1: "Software for factories and plants, built [[around your shifts]]",
    lede: "You make things. We make the software that keeps track of it all: who turned up, what each machine is doing, what is left on the shelf, which order goes out today. We build it, then we look after it.",
    button: "Talk to our experts",
    heroTile: "erp",
    context: {
      h2: "Factories run on more software every year",
      lede: "Several sites. Several shifts. Contract labor at the gate. An accounts package, a machine log and a few spreadsheets that matter more than anyone admits.",
      paragraphs: [
        "Plant managers are not short of software. They are short of software that agrees with itself. Hours live on paper or in a workbook two people understand. Orders, stock and job cards sit in three places. The report that matters gets built by hand every Monday.",
        "The quotes for the big platforms come back priced for a company ten times your size, and half of what you would pay for does not apply to you. Or somebody built you something a few years ago and vanished, and now a small change takes weeks to get an answer on.",
      ],
      bullets: ["Hours that payroll can trust.", "Orders, stock and jobs in one place.", "Reports a plant manager will actually read."],
      close: "Infoloop builds that software around your shift patterns and the way your supervisors already work, connects it to what you run, and stays to keep it running. One plant first, then the rest.",
    },
    numbers: [
      { value: "90%", label: "less timesheet paperwork for a three-plant manufacturer, live in three weeks", href: "/work/manufacturing-attendance-opsdeck" },
      { value: "$1.2M", label: "saved a year with maintenance software connected to a machinery maker's ERP", href: "/work/manufacturing-erp-predictive-maintenance" },
      { value: "72%", label: "less unplanned downtime, from around 12 hours a month", href: "/work/manufacturing-erp-predictive-maintenance" },
      { value: "3 wks", label: "to go live with attendance software across three plants", href: "/work/manufacturing-attendance-opsdeck" },
    ],
    challenges: {
      h2: "Manufacturing problems we solve",
      lede: "We build and run software for the way a plant really works, not the way a brochure says it should.",
      items: [
        { title: "Hours are still on paper or a spreadsheet", body: "Several sites, several shifts, contract labor. Payroll takes days every month and nobody quite believes the numbers. We clock people in across every shift and site and give payroll one clean file." },
        { title: "Orders, stock and jobs live in three places", body: "What is on order, what is on the shelf and what is on the floor never agree. We put them in one place and connect it to your accounts package and machine log, so a figure is typed once." },
        { title: "Machines fail with no warning", body: "Unplanned downtime eats the month. Maintenance software connected to the ERP flags a likely failure 10 to 14 days ahead, so the fix happens on your schedule, not the machine's." },
        { title: "Software nobody supports any more", body: "Somebody built it, handed over a folder and left. Every small change is a risk. We take it on, get it back under control and stay to run it, one safe change at a time." },
      ],
      tile: "erp",
    },
    band: ["Built around your shifts.", "Run by us."],
    cases: { h2: "Case studies", lede: "Measured results from plants like yours.", items: [{ slug: "manufacturing-erp-predictive-maintenance", label: "Machinery ERP" }, { slug: "manufacturing-attendance-opsdeck", label: "Attendance" }], button: "Read case study" },
    outcomes: {
      h2: "What working with Infoloop gets you",
      lede: "For plants that need software live quickly, without a day of lost production.",
      items: [
        { title: "Live in weeks", body: "Planning in a week, most projects live in 4 to 8 weeks, one plant switched on at a time." },
        { title: "One price, agreed first", body: "What we build, when it lands and what it costs, in writing before anything starts." },
        { title: "Reports people read", body: "One screen with the first coffee: output against plan, machines down, people in." },
        { title: "Connects to what you run", body: "Accounts package, machine log, payroll. Typed once, everywhere it should be." },
        { title: "Run by us afterwards", body: "We watch it, fix faults to an agreed time, keep it patched, and report every month." },
      ],
      tile: "attendance",
    },
    trust: { h2: "Trusted by plants that need it to just work", sub: "Built on the tools you already run and the platforms we know well." },
    quote: { text: "The difference is they did not leave. Every month we get a report, fixes and one clear next step.", role: "Operations lead, manufacturer", caseSlug: "manufacturing-attendance-opsdeck" },
    faq: {
      eyebrow: "FAQs",
      h2: "Questions plant managers ask us",
      lede: "Straight answers. If yours is not here, ask us on the call.",
      items: [
        { q: "What will this cost us?", a: "One price for one agreed piece of work, so you know the number before we start. To get there we need a 30-minute call: how many sites, how many people on the books, what the shifts look like and what software you already use. Then we write down what we will build, in what order and by when, with the price next to it. Running it afterwards is a separate monthly fee, quoted at the same time. Anything you add while we build is priced and approved first." },
        { q: "Have you really done this for factories before?", a: "Yes. We built the hours and attendance software for a three-plant manufacturer, covering shifts, contract labor and the file payroll needs. It cut their timesheet paperwork by 90% and took three weeks. We also built maintenance software connected to a machinery maker's ERP, which saved $1.2M a year and cut unplanned downtime by 72%. That is the factory work we can point to, and we would rather say it plainly than hint at a longer list." },
        { q: "What happens once it is switched on?", a: "We look after it. We watch the software, mend faults within a time we agree with you, keep it patched and secure, and keep improving it as the plant changes. Every month you get a short report: what stayed up, what we fixed, what you asked for and what we think should come next. Software in a factory is not finished the day it goes live. That is the day it starts." },
        { q: "Will it work with the software we already have?", a: "Nearly always. Most factories already run something for the accounts, plus a machine log and a handful of spreadsheets. We do the joining-up, so a figure is typed in once instead of three times. If one of your tools has no sensible way of being connected, we say so straight away and suggest a simple import and export instead." },
        { q: "How long before it is running at all our sites?", a: "We switch on one plant at a time rather than everywhere at once. The first site takes the longest: that is where you find the shift pattern nobody mentioned. Later sites go quicker because the surprises are behind you. The dates are written down before we start and depend on how many sites and shift patterns you have and how much joining-up is needed." },
        { q: "Will we have to change how the plant works?", a: "No. Software that fights the way a plant really runs gets worked around within a fortnight, and then you are paying for something nobody uses. We build around your shift patterns, your contractor arrangements and the way your supervisors already write things down. Supervisors and operators get their hands on it while we are still building." },
      ],
    },
    cta: { h2: "Tell us what goes wrong in your plant", lede: "Bring the thing that costs you days every month: sorting out hours, chasing a job through the factory, or software nobody supports. You will leave the call knowing what it would take to fix it.", button: "Book a 30-minute call" },
    blogCategory: "Manufacturing",
    seo: { title: "Manufacturing software: attendance and ERP | Infoloop", description: "Software for factories and plants, built around your shifts: attendance payroll can trust, orders and stock in one place, maintenance tied to the ERP." },
  },
  {
    "slug": "agriculture-agritech",
    "name": "Agriculture and AgriTech",
    "eyebrow": "Agriculture and AgriTech",
    "h1": "Software for farms, growers and packhouses, [[ready before harvest]]",
    "lede": "Field records, machinery, traceability and crew hours in one place, on a phone that keeps working when the signal drops. We build it before the season starts, then we stay to keep it running through the busiest week of your year.",
    "button": "Talk to our experts",
    "heroTile": "erp",
    "context": {
      "h2": "Every season leaves more data behind",
      "lede": "Several sites. Crews on piece rate and day rate. A machinery log in the workshop, an agronomy app on one phone, and an audit pack built by hand every year.",
      "paragraphs": [
        "Growers are not short of records. They are short of records that live in one place. Soil tests sit in one workbook and application records in another. Notes from a field walk end up on a phone or in a notebook that goes home in a jacket pocket. When a buyer or an auditor asks what went on that crop, days of paperwork follow.",
        "The labor bill tells the same story. Crews across several sites, on a mix of piece rate and day rate, and the hours that reach payroll never quite match the hours worked. Or you know the agronomy and what your product should do, and there is nobody in-house to build it and still be there when growers lean on it in the middle of a season."
      ],
      "bullets": [
        "One record per field, per season.",
        "Crew hours that match what payroll pays.",
        "Batch records that follow the crop from field to truck."
      ],
      "close": "Infoloop builds that software around your seasons and your sites, makes it work on a phone in a field with no signal, pulls in what your tractors and weather stations already record, and stays to keep it running. Whatever you need before planting or picking goes first."
    },
    "numbers": [
      {
        "value": "50+",
        "label": "software projects delivered, from attendance and stock to AI helpers and online shops",
        "href": "/work"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run for clients, watched every day of the season",
        "href": "/work"
      },
      {
        "value": "6",
        "label": "countries where clients run software we built and still look after",
        "href": "/about"
      },
      {
        "value": "4.8",
        "label": "average client rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "Farm and agritech problems we solve",
      "lede": "Built for wet Tuesdays, weak signal and the week when everything happens at once.",
      "items": [
        {
          "title": "Everything lives in spreadsheets and notebooks",
          "body": "Field data in one workbook, application records in another, the audit pack rebuilt by hand every year. We put soil tests, applications, walking notes and yields against the field they belong to, typed once, out in the field, by the person who did the job."
        },
        {
          "title": "Nobody can explain the labor bill",
          "body": "Crews across several sites, piece rate and day rate side by side, and hours that reach payroll never match hours worked. We clock crews in at every site and give payroll one file it can trust, starting from attendance software we have already built."
        },
        {
          "title": "The audit pack takes days",
          "body": "A buyer or an auditor asks what went on that crop, where, and who did it. Batch records follow the crop from field to pack to truck, so the answer takes a minute, and a machine fault in August gets written down and closed off instead of forgotten by Tuesday."
        },
        {
          "title": "An agritech idea and nobody to build it",
          "body": "You know the agronomy and what the product should do. You have nobody in-house to make it. We build it, launch it and stay on when growers are leaning on it mid-season, with the price agreed in writing before we start."
        }
      ],
      "tile": "attendance"
    },
    "band": [
      "Ready before harvest.",
      "Kept running through it."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "No farm job yet, and we will not pretend otherwise. These are the same shapes of problem, with the results measured.",
      "items": [
        {
          "slug": "manufacturing-attendance-opsdeck",
          "label": "Attendance"
        },
        {
          "slug": "manufacturing-erp-predictive-maintenance",
          "label": "Machinery ERP"
        },
        {
          "slug": "brightlane-auto-group-garagezone",
          "label": "Workshop platform"
        }
      ],
      "button": "Read case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For growers who need it live before the season, and still standing at the end of it.",
      "items": [
        {
          "title": "Live before the season",
          "body": "Planning in about a week, most projects live in 4 to 8 weeks, the seasonal piece first."
        },
        {
          "title": "One price, in writing",
          "body": "What we build, by when and for how much, agreed before anything starts."
        },
        {
          "title": "Works with no signal",
          "body": "The phone saves the record and sends it later. It does not lose a morning's work."
        },
        {
          "title": "Reads what you already run",
          "body": "Tractors, weather stations, agronomy apps, payroll. Typed once, or not at all."
        },
        {
          "title": "Run by us afterwards",
          "body": "Watched every day, faults fixed to an agreed time, kept patched, and a short report each month."
        }
      ],
      "tile": "garage"
    },
    "trust": {
      "h2": "Built for teams who cannot stop for a demo at harvest",
      "sub": "Built with the platforms we know well, on top of what you already run."
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions growers ask us",
      "lede": "Straight answers. If yours is not here, bring it to the call.",
      "items": [
        {
          "q": "Have you built anything for farming before?",
          "a": "Not yet, and we will not pretend otherwise. There is no farm job we can show you. What we can show is the same work in different clothes. We built attendance software for a multi-site manufacturer that cut timesheet paperwork by 90% and went live in three weeks. We built maintenance software connected to a machinery maker's ERP that saved $1.2M a year and cut unplanned downtime by 72%. We run AI helpers live every day, and we build online shops. Field records, machine maintenance, batch records and crew hours are those same shapes of problem. On the call we will say plainly which bits are new for us."
        },
        {
          "q": "What does it cost, and how does it work?",
          "a": "It starts with a short call. From that we write down what gets built, by when and for how much, before any building starts. You agree to a number, not to an hourly rate that creeps upward. The price depends on how much is new: shaping our attendance software around your crews costs less than building field records from nothing. Once it is live, keeping it running is a separate monthly fee that covers watching it, fixing faults, patching it, improving it and reporting to you. You can take the build without that arrangement, though we would rather you did not."
        },
        {
          "q": "What happens once it goes live?",
          "a": "Going live is the start of our job, not the end of it. We watch the software, fix what breaks within a time we agree with you, keep it patched, and improve it as each season throws up something new. Every month you get a short report: what stayed up, what went wrong, what we fixed and what we think should come next. In practice that means when a clock-in terminal dies at five in the morning at the height of picking, somebody is already looking at it before anyone thinks to call us."
        },
        {
          "q": "Will it work out in a field with no phone signal?",
          "a": "Yes, as long as it is built that way from the start, which is how we build it. The phone or tablet saves the record on the device, stamps the time on it, and sends it up once there is signal again, at the gate or back at the packhouse. Storing it is the easy part. The tricky bit is what happens when two people edit the same field record while both are out of range. We agree those rules with you before we build, rather than finding them in the middle of the season. The buttons are big enough for gloves and readable in bright sun."
        },
        {
          "q": "Can it read from our tractors and weather stations?",
          "a": "Usually, yes. Most machinery, weather station and agronomy tools will hand their data over, either automatically or as a file on a schedule. We list what you already pay for, connect what can be connected, and bring the rest in on a timer rather than asking anyone to retype it. Where a tool will not give its data up, we tell you early instead of promising a link that quietly turns back into someone copying figures by hand. We do not rip out things that work just to make our own software look neat. The aim is one place to read from, not one more place to fill in."
        },
        {
          "q": "Can we trust AI with spray records and audits?",
          "a": "Only within limits, and we set those limits before it goes near your records. The useful jobs are narrow ones: telling somebody what went on a field and when, straight from your own records; drafting the first answer to an audit question; working out how serious a machine fault is before anyone drives out to look. The rule is simple. The AI reads and drafts. A person approves anything that touches a compliance record, a payment or a spraying decision. If it cannot find the answer in your own records, it says so rather than making something up. We see every answer and can switch it off in seconds."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what falls over at harvest",
      "lede": "Bring your worst spreadsheet and the week when everything goes wrong at once. You will leave the call knowing what we would build, in what order, and roughly what it costs.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "Operations",
    "seo": {
      "title": "AgriTech software: field records, crew hours | Infoloop",
      "description": "Software for farms, packhouses and agritech firms: field records, machinery, traceability and crew hours, working with no signal. Built and run by Infoloop."
    }
  },
  {
    "slug": "ai-startups",
    "name": "AI startups",
    "eyebrow": "AI startups",
    "h1": "We build your AI product [[so you can keep selling]]",
    "lede": "You have something that works in a demo. People are waiting to use it. Nobody on the team has the free weeks to build the real version. We build it, put it live and keep it running, while you stay in front of customers and investors.",
    "button": "Talk to our team",
    "heroTile": "copilot",
    "context": {
      "h2": "The demo is done. Now the real version.",
      "lede": "A prototype that convinced people. Design partners waiting. A seed round on the clock, and nobody on the team with the free weeks to build it properly.",
      "paragraphs": [
        "Founders are not short of ideas or of proof. They are short of weeks. The prototype works in a demo and falls over with two users on it. There is no sign-in, one customer's information sits next to another's, and the whole thing breaks the moment the model returns something odd.",
        "Hiring is the obvious answer, and it takes months. Good engineers are hard to find and slower to become useful. Meanwhile three companies want access, the launch page is queued behind the product, and every hour spent building is an hour not spent with customers or investors."
      ],
      "bullets": [
        "An assistant or agent with firm limits, live.",
        "Sign-in, separate customer data, queues and records.",
        "A launch page your team edits without an engineer."
      ],
      "close": "Infoloop builds the real version, puts it live with monitoring already on it, and runs it while you sell and hire. A small first release, then the rest, and a planned handover the day your own team is ready."
    },
    "numbers": [
      {
        "value": "72%",
        "label": "less manual support work with an AI support assistant for a fintech scale-up",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "50+",
        "label": "projects delivered, each from a written scope before work started",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "2.1x",
        "label": "qualified leads from a new Webflow website for a software company",
        "href": "/work"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run for clients after launch",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "AI startup problems we solve",
      "lede": "We build and run the product for the way an early company really works: fast, changing, and short of hands.",
      "items": [
        {
          "title": "The demo won the meetings, the product cannot hold them",
          "body": "Three companies want access and the prototype falls over with two users on it. We build the real version: sign-in, one customer's information kept apart from the next, queues so nothing is dropped, and a record of what happened and when."
        },
        {
          "title": "Nobody knows what the AI is doing in production",
          "body": "Knowing the site is up tells you very little. We measure how often the AI fails to finish a task, how often it refuses, how long it takes, what it costs per customer and how often it hands off to a person. You see it drift before a design partner emails you."
        },
        {
          "title": "Every early customer wants something slightly different",
          "body": "Design partners each ask for a tweak. We build the settings layer that absorbs it, so a request becomes a switch someone flips rather than a separate copy of your product nobody can merge back."
        },
        {
          "title": "The founders are the build queue",
          "body": "You could write it yourself, but your hours are worth more with customers and investors, and hiring takes months. We hold the build queue and the on-call phone, and build tidily enough that the team you hire can pick it up."
        }
      ],
      "tile": "copilot"
    },
    "band": [
      "Built while you sell.",
      "Run by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from AI products in front of real users.",
      "items": [
        {
          "slug": "fintech-support-assistant",
          "label": "AI support assistant"
        },
        {
          "slug": "brightlane-auto-group-garagezone",
          "label": "AI booking agents"
        }
      ],
      "button": "Read the case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For founders who need the product live this quarter, without losing a week of selling.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, the first release live in 4 to 8 weeks, with monitoring on it from day one."
        },
        {
          "title": "One price, in writing first",
          "body": "Scope, date and cost agreed before we start, so a seed round is not spent on surprises."
        },
        {
          "title": "An AI you can put in front of customers",
          "body": "Firm limits on what it can reach, tests before every release, and a fast way back if a change makes it worse."
        },
        {
          "title": "Your team edits without us",
          "body": "Wording, prompts and settings in Webflow or an editor your team can change the day they spot something."
        },
        {
          "title": "Run by us until you hire",
          "body": "We watch it, fix faults to an agreed time, keep it patched, and send a monthly report your board can read."
        }
      ],
      "tile": "webflow"
    },
    "trust": {
      "h2": "Trusted by founders who need it live, not demoed",
      "sub": "Built on tools your future engineers already know: Next.js, Node.js, React and Webflow."
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions founders ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What will this cost us?",
          "a": "You will know before we start. Every job begins with a 30-minute call. After it you get one price for the build, a date, and a written list of what is in and what is out. There is no hourly billing and no open-ended discovery, because you are spending investor money against a clock and cannot absorb a bill that keeps growing. Running the product afterwards is a separate monthly fee, quoted at the same time. It covers watching it, fixing faults inside an agreed time, small improvements, security patches and a monthly report. Anything you add later is priced in writing before we build it, never after."
        },
        {
          "q": "How soon can we be live?",
          "a": "It depends on what your design partners need first, which is why we start narrow. The first release is the smallest version that does the thing they actually asked for, live, with monitoring already on it. Something real in front of an early customer this month is worth more than a finished product in six. Your website or launch page can usually go live well before the product, because nothing is holding it up. After the first call you get a date for your build, not a rough estimate, and it is written down next to the price."
        },
        {
          "q": "If we hire our own engineers, can they take it over?",
          "a": "Yes, and we build for that from day one. You own the code, the accounts and the data all the way through. We use ordinary, well-known tools such as Next.js and Node.js, write down how it is deployed and keep every setting in one place. There is no private layer of ours that only we can maintain. When your engineers arrive, the handover is a planned piece of work with documents and walkthroughs, not a negotiation. You can also keep us running things through the hiring period and wind us down as your own team takes on more."
        },
        {
          "q": "How do you stop the AI doing something we did not intend?",
          "a": "By limiting what it can reach and watching everything it does. Each assistant gets access only to the tools and data that particular job needs. Before any change goes out we run it against a set of real examples and check the answers. There is a tested way to put the old version back, not a hopeful plan in a document. Once live, its behavior is measured, so a problem shows up as a number on a screen rather than as a customer complaint. Where a wrong answer would really matter, it passes the question to a person instead of guessing."
        },
        {
          "q": "Can I stay involved in the build?",
          "a": "As much or as little as you like. Plenty of founders could write the thing themselves and have decided their hours are worth more elsewhere. Because we release in stages rather than revealing everything at the end, you can look at each one, change what comes next and make the calls that matter without sitting in the queue yourself. You can write code alongside our team, or read the changes each week and leave the rest to us. Either works. What stays with us is the delivery date and the phone that rings when something breaks."
        },
        {
          "q": "What if we change direction after the first release?",
          "a": "Early companies usually do, and the way we build assumes it. Work goes out in stages, so between stages you can point us somewhere else without throwing away what is done. Wording, prompts and settings live in an editor your own team controls, so a change of message does not need us at all. If the change is bigger than that, we price the new piece of work in writing before starting, so you can decide whether it is worth the money and the weeks. What we will not do is quietly keep building the January plan in March."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your design partners want",
      "lede": "Half an hour on a call. Show us what you have and who is waiting for it. You leave with one price, a date and a straight answer on whether we should build it.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "AI",
    "seo": {
      "title": "Software for AI startups: build and run | Infoloop",
      "description": "We build the product for early-stage AI companies and run it: an assistant with firm limits, sign-in and customer data done right, and a Webflow launch page."
    }
  },
  {
    "slug": "automotive",
    "name": "Automotive and mobility",
    "eyebrow": "Automotive and mobility",
    "h1": "Software for garages and workshops, with [[fewer empty bays]]",
    "lede": "You fix cars and sell parts. We build the software that takes the booking, moves the job through the bay, keeps parts straight and gets the invoice out the door. Then we look after it, along with the website that feeds it.",
    "button": "Talk to our experts",
    "heroTile": "garage",
    "context": {
      "h2": "More branches, more bays, more places a booking gets lost",
      "lede": "A paper diary at one site. A spreadsheet at another. A free widget on the website that somebody checks at lunchtime. Head office adding the day up by hand every evening.",
      "paragraphs": [
        "Garage owners are not short of ways to take a booking. They are short of one that every branch uses. A car gets booked twice, a bay sits empty while another site turns work away, and the customer's history is in a folder at the branch they visited last time.",
        "The parts side is no tidier. The trade counter, the workshop and the online shop all take off the same shelf and each counts it somewhere different. So a car sits on a ramp waiting for a part that nobody put on order, and the invoice goes out late because the job card was never finished."
      ],
      "bullets": [
        "Every bay at every branch on one screen.",
        "Bookings, job cards, parts and invoices in one place.",
        "Reminders that bring customers back before they drift."
      ],
      "close": "Infoloop starts from GarageZone, our own garage and workshop platform, shapes it around your services, prices and bay layout, connects it to your accounts package and supplier catalog, and stays to run it. One branch first, then the rest."
    },
    "numbers": [
      {
        "value": "28%",
        "label": "more work through the same bays for a nine-branch auto group on one platform",
        "href": "/work/brightlane-auto-group-garagezone"
      },
      {
        "value": "11 wks",
        "label": "for the whole group to go live on one platform, one branch at a time",
        "href": "/work/brightlane-auto-group-garagezone"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we build and run for clients",
        "href": "/about"
      },
      {
        "value": "50+",
        "label": "projects delivered across 6 countries, with a named person who replies within one business day",
        "href": "/work"
      }
    ],
    "challenges": {
      "h2": "Automotive problems we solve",
      "lede": "We build and run software for the way a workshop really runs, not the way a brochure says it should.",
      "items": [
        {
          "title": "Every branch books its own way",
          "body": "A diary at one site, a spreadsheet at another, a widget on the website. Head office cannot see who has room and cars get double booked. We put every branch's bays on one diary, so a job moves to the site that can take it today."
        },
        {
          "title": "The day disappears into the phone",
          "body": "One workshop, one phone and paper job cards. The work is there but the day goes on calls and chasing invoices. We give customers online booking, an AI helper that sorts inquiries and fills cancellations, and one screen instead of four."
        },
        {
          "title": "Parts are counted in three places",
          "body": "Trade counter, workshop and online shop take off the same shelf. We tie stock to the diary, so you know what is promised to open jobs and what to order today, with a warning before a car is stuck on a ramp."
        },
        {
          "title": "Your history is on paper and spreadsheets",
          "body": "Customers, vehicles and job history sit in a diary and a few workbooks. We move it all across as part of the build, and where something works, such as your accounts package, we link to it rather than make you type it twice."
        }
      ],
      "tile": "garage"
    },
    "band": [
      "One diary for every branch.",
      "Run by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results: nine garages on one platform, and a Shopify store rebuild for a DTC brand.",
      "items": [
        {
          "slug": "brightlane-auto-group-garagezone",
          "label": "Brightlane garages"
        },
        {
          "slug": "dtc-shopify-rebuild",
          "label": "DTC Shopify store"
        }
      ],
      "button": "Read case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For garages and groups that need software live quickly, without a branch losing a working day.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, most projects live in 4 to 8 weeks, one branch switched on at a time."
        },
        {
          "title": "One price, agreed first",
          "body": "What we build, when it lands and what it costs, in writing before a job card is touched."
        },
        {
          "title": "Every bay on one screen",
          "body": "Head office sees who has room at every site and can move a job to the branch that can take it."
        },
        {
          "title": "Connects to what you run",
          "body": "Accounts package, supplier catalog, the booking form on your website. Typed once, everywhere it should be."
        },
        {
          "title": "Run by us afterwards",
          "body": "We watch it, fix faults to an agreed time, keep it patched, and send a short report every month."
        }
      ],
      "tile": "copilot"
    },
    "trust": {
      "h2": "Trusted by workshops that cannot afford a lost day",
      "sub": "Built on the tools you already use, by certified Webflow and Shopify Partners."
    },
    "quote": {
      "text": "More cars through the same bays, with fewer staff hours on admin. That is growth that did not cost us a new building.",
      "role": "Operations Director, Brightlane Auto Group",
      "caseSlug": "brightlane-auto-group-garagezone"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions garage owners ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "Do you only work with big groups, or single garages too?",
          "a": "Both. GarageZone suits a one-bay independent as well as it suits a group, and the setup work is much the same either way. What changes is how much of it you need. A single workshop mostly wants bookings, job cards, parts and invoices. A group also wants every branch's bays on one screen, figures per site, and the ability to shift a job to whichever branch has room. We work out which one you are on the first call and price it to match. Nobody pays for branch features when they do not have branches."
        },
        {
          "q": "How long until we can use it?",
          "a": "It depends how many sites you run and how much history has to move across. Brightlane Auto Group put nine branches on one platform, going live one site at a time so no branch lost a working day. A single workshop is a much shorter job. Whatever the size, the finish date is written into the agreement before we start rather than being an estimate that quietly slips. Moving your customers, vehicles and job history is part of that date, not an extra bolted on afterwards once you have committed."
        },
        {
          "q": "What does it cost?",
          "a": "It starts with a 30-minute call. From that we write down what we will build, when it will be done and what it costs, so you know the number before you commit rather than watching a daily rate add up. After it goes live there is a monthly fee for looking after it, which covers watching the software, fixing faults, keeping it patched and making improvements. What you pay depends on how many branches you run, how much old data has to move, and whether you want the website or the online shop as well."
        },
        {
          "q": "Once it is live, do you hand us the keys and leave?",
          "a": "No. Looking after it afterwards is the main thing we do. For a monthly fee we watch the software and fix problems within a time we agree with you. We keep it secure and up to date, make small changes as your shop changes, and once a month send you a short report on what we did and what difference it made. That carries on for as long as you want it to. If you would rather bring it in-house one day, you can. It is your platform and your data, and we hand it over properly."
        },
        {
          "q": "Can we keep some of the software we already use?",
          "a": "Usually it is a mix. Paper diaries, booking spreadsheets and standalone job card tools get folded into the one platform, and your data comes with them. Some things are doing their job well and you have no wish to move them, such as your accounts package or a supplier's parts catalog. We link to those instead of copying them, so no figure is typed in twice. We work out which is which before the build and put it in writing, so there is no argument later about what was meant to stay."
        },
        {
          "q": "Is it safe to let AI near our customers?",
          "a": "It is if you keep it to the dull jobs and keep watching it, which is what we do. The AI helper sorts booking inquiries, offers a slot when somebody cancels, sends service and inspection reminders, and flags a part to reorder before a car gets stuck on a ramp. Everything it says is recorded, and we can turn it off in seconds if it starts getting things wrong. Anything needing a judgment call, a price change or an unhappy customer goes to one of your people."
        }
      ]
    },
    "cta": {
      "h2": "Tell us how you take bookings today",
      "lede": "Bring the number of bays and branches you run and the way a booking reaches the diary now. You will leave the call with a plan, a date and a price.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "Operations",
    "seo": {
      "title": "Garage and workshop software for auto groups | Infoloop",
      "description": "Software for garages, workshops and parts firms: bookings, job cards, bays, parts and invoices on one platform for every branch. Built and run by Infoloop."
    }
  },
  {
    "slug": "b2b-saas",
    "name": "B2B SaaS",
    "eyebrow": "B2B SaaS",
    "h1": "Features, AI and integrations inside [[the product you already sell]]",
    "lede": "You sell software. We build the parts of it that keep slipping: the features customers were promised, AI that is safe in front of paying accounts, the single sign-on and integrations sales keep offering. We build it in your code, then we keep it running.",
    "button": "Talk to our experts",
    "heroTile": "copilot",
    "context": {
      "h2": "The roadmap slips a little more every week",
      "lede": "Tickets. Bug fixes. Last month's release. A large account asking how its staff will sign in. And the feature you promised customers moves again.",
      "paragraphs": [
        "SaaS teams are not short of work. They are short of hands that can take a piece of the product and land it. Support eats the week, the release everyone agreed on gets pushed back, and the roadmap you showed customers stops matching the one you are actually building.",
        "Hiring takes months and only moves the problem down the road. Agencies want to start again because your code is unfamiliar to them. Meanwhile the AI feature on your roadmap waits for someone who has shipped one to paying users before."
      ],
      "bullets": [
        "Features that land without stalling the roadmap.",
        "AI you can defend to a nervous buyer.",
        "Integrations that unblock the big contract."
      ],
      "close": "Infoloop works inside your repository, with your conventions and your release checks, ships in small pieces behind a switch, and stays to keep it running, the way we run our own SaaS products. A few accounts first, then everyone."
    },
    "numbers": [
      {
        "value": "72%",
        "label": "less manual support work for a fintech scale-up, from an assistant we still run",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "2.1x",
        "label": "qualified leads for a software company after a new Webflow site",
        "href": "/work"
      },
      {
        "value": "4.8",
        "label": "average rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run, including our own products",
        "href": "/products/loopiq"
      }
    ],
    "challenges": {
      "h2": "B2B SaaS problems we solve",
      "lede": "We build and run the parts of a SaaS product a small team never gets to, without asking that team to stop.",
      "items": [
        {
          "title": "The support queue is eating the roadmap",
          "body": "Refunds, lookups and status questions fill the week, and another hire only moves the problem along. We put an assistant on the ticket types that repeat most, with a person approving anything that touches money. We built one for a fintech support desk and we run it still."
        },
        {
          "title": "The first version got you customers, and now it creaks",
          "body": "Permissions were added late. One customer's records do not fit the shape the next one needs. Releases wait for a quiet Tuesday. We rebuild the part that hurts, behind a switch, without parking the roadmap for a quarter."
        },
        {
          "title": "An AI feature is already promised",
          "body": "It has been announced, or a large account asked for it, and nobody has put a model in front of paying users before. We build it with limits, approvals and an off switch, measure it once live, and stay answerable for it."
        },
        {
          "title": "Single sign-on and integrations hold up the deal",
          "body": "The bigger buyer wants staff signing in with their work account, updates pushed to their tools, links to the CRM and billing, and API docs their developers can follow. We build the pieces that get the contract signed."
        }
      ],
      "tile": "lms"
    },
    "band": [
      "Inside the product you sell.",
      "Kept running by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from software we built and still run.",
      "items": [
        {
          "slug": "fintech-support-assistant",
          "label": "Support assistant"
        },
        {
          "slug": "brightlane-auto-group-garagezone",
          "label": "Multi-branch platform"
        }
      ],
      "button": "Read the case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For SaaS teams that need features live without a quarter lost to it.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, most work live in 4 to 8 weeks, a few accounts first."
        },
        {
          "title": "One price, agreed first",
          "body": "What we build, when it lands and what it costs, in writing before any code."
        },
        {
          "title": "Your code, your review",
          "body": "Your repository, your conventions, your release checks. No pitch to start again."
        },
        {
          "title": "AI with an off switch",
          "body": "Limits, approvals and a log of every action, and it turns off without a release."
        },
        {
          "title": "Run by us afterwards",
          "body": "Alerts, fixes to an agreed time, patches, and a monthly report on one number."
        }
      ],
      "tile": "verko"
    },
    "trust": {
      "h2": "Trusted by teams with paying customers to keep",
      "sub": "Built in the stack you already run and the frameworks we know well."
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions SaaS founders and CTOs ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What does this cost?",
          "a": "One price for one agreed piece of work, and you see it before we start. It begins with a short call about the product, the plan and the part that keeps slipping. A named person replies within one business day, and the written scope, the date and the single figure follow the call. Builds are not billed by the hour, and anything you add later is priced on its own, so the number does not creep. Most teams then add a monthly fee for us to keep it running, sized to how much software we look after. You can pause or end it with notice."
        },
        {
          "q": "Will you work in our code, or want to rebuild it?",
          "a": "We work in your repository, with your conventions and your release checks. Starting again is a last resort, never our opening suggestion. Sometimes one part does need replacing. In a young SaaS product it is usually one of three things: how each customer's records are kept apart, the rules about who can see what, or a design that assumed a single customer. We price that part on its own, agree it with you, and build it behind a switch so the rest of the roadmap carries on. Our changes go through the same review as anyone else's on your team."
        },
        {
          "q": "How long before our customers see anything?",
          "a": "Work lands in your test environment in small pieces, not one drop at the end, so there is something running to look at in the first few weeks. The first release to real accounts normally goes to a handful, gets watched, then widens. We do not quote a date before that opening call, because the honest answer depends on what your product is built with, how your review works and how much of the job is still unknown. Once it is scoped, the date is written down next to the price, and we hold ourselves to it."
        },
        {
          "q": "Is it safe to put AI in front of customers who pay us?",
          "a": "It is, if it is built the way we built the fintech support assistant we still look after. The feature reaches only the tools it genuinely needs. Anything sensitive or financial goes to a person to approve. Every action it takes is written down. And the whole thing can be switched off without a release. We start narrow, on the tasks with the clearest rules, and widen only once the numbers hold up. How it is behaving sits on a screen you can see, so the decision to expand rests on measured results, not a good demo."
        },
        {
          "q": "What do you actually do each month once it is live?",
          "a": "The team that built it keeps it alive. That means alerts when something goes wrong, fixes inside an agreed time, improvements shipped every month rather than only after a breakage, and security and dependency updates as they come. Every month you get a short report on the one number we agreed to move, with a single recommended next step. It is one monthly fee sized to what we look after, not an hourly meter you have to check. We hold our own software to the same standard, so we know what a bad week costs."
        },
        {
          "q": "What if we want to stop, or bring it in-house?",
          "a": "You can. The code sits in your repository under your accounts and runs in your own cloud, so nothing depends on us holding a key. The monthly arrangement is exactly that: monthly, ended with notice, not a lock-in. If you hire your own team later, you get a documented codebase, a written explanation of how customer records and permissions work, and a walkthrough with the engineers who built it. We would rather keep running it for you, and we would rather say that plainly than bury an exit clause in the contract."
        }
      ]
    },
    "cta": {
      "h2": "Tell us which release keeps slipping",
      "lede": "A short call on your product and the release you cannot get out of the door. You leave with one price, a date and a clear view of what keeping it running would cost each month.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "AI",
    "seo": {
      "title": "B2B SaaS development: features, AI, integrations | Infoloop",
      "description": "Features, AI assistants and integrations built inside the SaaS product you already sell, for one agreed price, then kept running by Infoloop."
    }
  },
  {
    "slug": "consumer-platforms",
    "name": "Consumer platforms",
    "eyebrow": "Consumer platforms",
    "h1": "Marketplaces and consumer apps, built to [[grow without falling over]]",
    "lede": "You run a marketplace where both sides have to show up, or an app that grew faster than the software behind it. We build the matching, the payments, the safety checks and the nudges that bring people back. Then we run it for a monthly fee.",
    "button": "Talk to our experts",
    "heroTile": "shopify",
    "context": {
      "h2": "Consumer platforms outgrow their software fast",
      "lede": "Buyers and sellers to match. Money to hold and pay out. Complaints, fake reviews and fraud. And a single engineer who holds the whole thing in their head.",
      "paragraphs": [
        "Marketplace teams rarely lack ideas. They lack a clear view of what is happening. Nobody can say which step loses people after sign-up, because it was never measured. Payouts, refunds and disputes get balanced in a spreadsheet. Complaints land in a shared inbox, and a ban from six months ago cannot be explained.",
        "Meanwhile the to-do list is all maintenance, and every campaign feels risky because nobody is sure what breaks when it gets busy. Growth got ahead of the software, and now the software is what slows the growth down. Nobody has time to fix that while keeping the lights on."
      ],
      "bullets": [
        "Both sides matched and booked in a few taps.",
        "Money held, split and paid out with a record.",
        "Users measured first, then brought back."
      ],
      "close": "Infoloop builds the matching, the payments, the safety queue and the nudges that bring people back, measures every step before changing it, and stays to run the platform. Small releases, each with an off switch."
    },
    "numbers": [
      {
        "value": "38%",
        "label": "more conversion for a DTC brand's Shopify store rebuild, which paid for itself in the first quarter",
        "href": "/work/dtc-shopify-rebuild"
      },
      {
        "value": "72%",
        "label": "less manual support work at a fintech scale-up after its AI support assistant went live",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run for clients, watched and patched every month",
        "href": "/work"
      },
      {
        "value": "4.8",
        "label": "average client rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "Consumer platform problems we solve",
      "lede": "We build and run the parts of a marketplace nobody demonstrates: cancellations, refunds, disputes and the user who signed up and never came back.",
      "items": [
        {
          "title": "Not enough buyers, or not enough sellers",
          "body": "Plenty of sellers and not enough buyers, or the other way around. More advertising rarely fixes it. Better search, honest availability and a quick first sale usually do. We start there."
        },
        {
          "title": "People sign up, then go quiet",
          "body": "Getting people in works. Keeping them past the first month does not, and nobody can name the step that loses them. We fix the measuring first, then the emails, notifications and in-app nudges it points at."
        },
        {
          "title": "Fraud, fake reviews and complaints pile up",
          "body": "Listings need checking, disputes need answers and every ban needs a reason. We build a queue with written rules, a route to a person and a record of every decision, so a call can be explained months later."
        },
        {
          "title": "The platform has outgrown the people running it",
          "body": "Whoever knows how it all fits together is also the person keeping it alive, and every campaign is a gamble. We take on the running, put an off switch behind every release, and give your own team room to build again."
        }
      ],
      "tile": "copilot"
    },
    "band": [
      "Built for both sides.",
      "Run by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from consumer-facing work close to yours.",
      "items": [
        {
          "slug": "dtc-shopify-rebuild",
          "label": "DTC Shopify store"
        },
        {
          "slug": "fintech-support-assistant",
          "label": "Support assistant"
        }
      ],
      "button": "Read the case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For teams that need the platform to grow without a rebuild weekend or a broken checkout on a Friday afternoon.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, most builds live in 4 to 8 weeks, shipped in pieces you can see running."
        },
        {
          "title": "One price, agreed first",
          "body": "What we build, in what order, by when and for how much, written down before anything starts."
        },
        {
          "title": "An off switch on every release",
          "body": "A change to checkout or search ranking comes back off in minutes, not a patch at midnight."
        },
        {
          "title": "Support that keeps up",
          "body": "A helper drafts replies from your own help pages and order records. Your agent sends it, and can switch it off."
        },
        {
          "title": "Run by us afterwards",
          "body": "Somebody watching, fixes to an agreed time, security updates and a monthly report you can forward to your board."
        }
      ],
      "tile": "webflow"
    },
    "trust": {
      "h2": "Trusted by teams with the public on the other end",
      "sub": "Built with React, Next.js, Node.js and Flutter, on the platforms your team already knows."
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions platform teams ask us",
      "lede": "Straight answers, including the awkward question about what we have not built yet.",
      "items": [
        {
          "q": "Have you built a marketplace before?",
          "a": "Nothing we can show you as a finished case study, and we would rather say so than dress something else up. What we have built sits next door: a Shopify store for a DTC brand that we still run, an AI support assistant live in front of a fintech's customers, maintenance software tied to a machinery maker's ERP, and attendance software across three plants. Between them that covers checkout and product pages, several sites at once, reports people rely on, and AI with limits on it. On the call we say plainly which parts of your platform are familiar ground and which we would be learning alongside you."
        },
        {
          "q": "What will it cost, and how do you charge?",
          "a": "It starts with a call, no slides and no charge. Then we come back with a written list of what we will build, a date and a price, not an hourly rate and a shrug. If a piece of work cannot be pinned down yet, such as moving off software we have never seen, we price that small piece on its own instead of hiding it in a wide range. The build and the running are separate numbers, quoted together. Once you are live, the monthly fee covers somebody watching, fixes within agreed times, security updates, improvements and a report."
        },
        {
          "q": "What happens after launch?",
          "a": "Launch moves you onto the monthly arrangement, which is how our work normally ends rather than something we sell at the last minute. It covers alerts on the parts that matter, fixes within the times we agreed, security updates, a steady stream of improvements, and a report each month on uptime, what went wrong, what we did and what we suggest next. In practice, whoever wrote the ranking rules or the seller payout job gets the alert when it misbehaves, and there is a way to undo it instead of a panic."
        },
        {
          "q": "Will it cope when a campaign or a busy season hits?",
          "a": "We build for the load you can measure, then test well above it. That means testing the busiest pages, search, listings and feeds, before a campaign rather than after. It means keeping copies of anything that does not change by the minute, so the same work is not done twice. And it means keeping the things that must never fail, like taking payment and paying sellers, well clear of everything else. Every release has an off switch, so if a rush exposes a problem the change comes off in minutes. If the honest answer is to change how it is built rather than rent more servers, we say so."
        },
        {
          "q": "How do you use AI without it embarrassing us?",
          "a": "Narrow job, clear limits, somebody watching, and a way to undo it. A helper gets a single defined task: drafting a support reply, sorting a complaint into the right pile, or summarizing an order history. It has explicit limits on what it can touch, and a person confirms anything you cannot take back, such as a refund or closing an account. Everything it does is written down, so a decision can be explained later. We keep checking the quality of its answers after launch, not only at the demo, and if they slip the off switch is right there."
        },
        {
          "q": "Will you work with the platform we already have, or start again?",
          "a": "We work with what is there unless there is a good reason not to. Starting again is slow and expensive, and it often recreates the same problems in newer code. We would rather steady what you have, measure it properly, and replace only the parts that need replacing. Sometimes we do suggest starting again, usually because the software it was built with is no longer supported, or because the way your data is stored cannot carry the next feature. When we say it, we tell you which part, why, and what it costs. Then we do it piece by piece so the platform keeps working. No big switchover weekend."
        }
      ]
    },
    "cta": {
      "h2": "Tell us where your platform loses users",
      "lede": "Bring the step that loses you people: thin supply, users going quiet, a checkout nobody dares touch. A short call, then a written scope, a date and a price.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "Web and SEO",
    "seo": {
      "title": "Marketplace and consumer app development | Infoloop",
      "description": "Marketplaces and consumer apps built to grow: matching, payments, safety checks and the nudges that bring people back. Built and run by Infoloop."
    }
  },
  {
    "slug": "corporate-training",
    "name": "Corporate training",
    "eyebrow": "Corporate training",
    "h1": "Staff training software that keeps [[every certificate in date]]",
    "lede": "You train a workforce, keep certificates current and produce the evidence when an auditor asks. We build the software that tracks all of it, on a learning platform and attendance software we already own, then we keep it running.",
    "button": "Talk to our experts",
    "heroTile": "lms",
    "context": {
      "h2": "Training teams carry more records every year",
      "lede": "Mandatory courses. Certificates with expiry dates. Staff on shifts and sites. A spreadsheet that one person chases off a calendar reminder.",
      "paragraphs": [
        "Training teams are not short of effort. The courses run and the classroom days happen. The record is the problem. Completions sit in a platform from one supplier, registers sit on paper, and certificates sit in a spreadsheet HR keeps. Whether one named person is cleared for one named task takes a whole morning to answer.",
        "That holds until headcount grows, until the person doing the chasing leaves, or until an auditor asks for evidence you cannot produce quickly. And half your people are on a shop floor or a shift rota, so emailing them a link does not reach them."
      ],
      "bullets": [
        "One record per person: courses, registers, certificates.",
        "Reminders before a certificate lapses, not after.",
        "Audit files you can hand over the same day."
      ],
      "close": "Infoloop sets that up on the learning platform and attendance software we already own, builds the part that is particular to you, your training matrix, your deadlines and your reporting, and stays to keep it running. One department first, then the rest."
    },
    "numbers": [
      {
        "value": "90%",
        "label": "less timesheet paperwork for a three-plant manufacturer on our attendance software",
        "href": "/work/manufacturing-attendance-opsdeck"
      },
      {
        "value": "4 to 8 wks",
        "label": "to go live on most projects, once the plan is agreed",
        "href": "/about"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run for clients",
        "href": "/about"
      },
      {
        "value": "4.8",
        "label": "average client rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "Corporate training problems we solve",
      "lede": "We build and run software for the way training really happens, across sites and shifts, not the way a brochure says it should.",
      "items": [
        {
          "title": "Compliance chased on a spreadsheet",
          "body": "The training happens, but the record lives in a workbook and one person chases off a calendar reminder. We give every course a due date, remind the person first and their manager next, and put the overdue list on a screen."
        },
        {
          "title": "Training people who are not at a desk",
          "body": "Your staff are on a shop floor, a site or a shift rota. A link in an email does not reach them. Registers are taken on the day on a device already on site, staff are identified by employee number, and material is cut into short pieces that work on a phone."
        },
        {
          "title": "Three tools and no single record",
          "body": "Courses with one supplier, registers on paper, certificates in a spreadsheet HR keeps. Nothing agrees. We put courses, registers and certificates in one record per person, so whether someone is cleared for a task is a lookup, not a morning."
        },
        {
          "title": "Certificates lapse before anyone notices",
          "body": "Every certificate carries its issue and expiry date. Reminders start on a schedule you choose, so a place on a course is booked before it runs out, not after somebody has been pulled off the job it covers."
        }
      ],
      "tile": "lms"
    },
    "band": [
      "Everyone in date.",
      "Evidence on hand."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "The same shift and multi-site work, measured: attendance across three plants, and an assistant that answers from your own records.",
      "items": [
        {
          "slug": "manufacturing-attendance-opsdeck",
          "label": "Attendance"
        },
        {
          "slug": "fintech-support-assistant",
          "label": "AI assistant"
        }
      ],
      "button": "Read case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For training teams that need the record right before the next audit, without a semester of setup.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, then most projects go live in weeks, one department or site at a time."
        },
        {
          "title": "One price, agreed first",
          "body": "What we set up, what we build, when it lands and what it costs, in writing before work starts."
        },
        {
          "title": "Built on what we already own",
          "body": "Courses, tests and certificates work from day one on our learning platform. You pay for the part that is yours."
        },
        {
          "title": "Reaches every shift",
          "body": "Registers, reminders and short modules that work on a phone, for people with no desk and no company email."
        },
        {
          "title": "Run by us afterwards",
          "body": "We watch it, fix faults to an agreed time, keep it patched, and send a report every month."
        }
      ],
      "tile": "attendance"
    },
    "trust": {
      "h2": "Trusted by teams that have to prove it",
      "sub": "Built on the platforms we own and the tools you already run."
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions training and compliance leads ask us",
      "lede": "Plain answers. Bring anything else to the call.",
      "items": [
        {
          "q": "What will it cost, and how does the work run?",
          "a": "The price turns on one question: how much of your training model our own platform already covers. Setting up software that exists costs far less than writing rules that do not, so most of the first call goes on separating the two. After the call you get one document with the work, the date and the price on it, agreed before anybody builds anything. The monthly fee for running it afterwards is quoted at the same time, not sprung on you later, so you can budget for the whole year."
        },
        {
          "q": "Do we have to replace the training software we already have?",
          "a": "Not always. If your current platform delivers courses well and the pain sits elsewhere, in renewals, attendance, reporting and chasing, we build around it and leave it where it is. If it is the reason your records cannot be trusted, our own learning platform is usually the shorter route: courses, groups, enrollments, question banks, tests and certificates are already in it, so you are setting it up rather than building it. We tell you which of the two you are in on the call, including when the honest answer is that nothing needs replacing."
        },
        {
          "q": "How do certificate renewals work?",
          "a": "Each certificate is stored with its issue date and its expiry date, against the person rather than the course. Reminders follow a schedule you set: a first notice weeks ahead, then a nudge to the line manager, then a flag on every report until it is renewed. Where a certificate is a condition of doing a task or entering a site, the platform shows that person as not cleared rather than letting it slide. Renewal cycles vary, so the schedule is set per certificate type, not one rule for all of them."
        },
        {
          "q": "Will this reach shift workers and people without a computer?",
          "a": "Yes, and that is usually the harder half of the job. Our attendance software already runs across a manufacturer's plants, so shift patterns, several sites and people with no company email are the normal case for us. Classroom sessions are registered on the day, on a device already on site, instead of typed up from paper later. People can be identified by employee number where there is no email address, and course material can be cut into short pieces that work on a phone between shifts."
        },
        {
          "q": "What would an auditor actually be able to see?",
          "a": "The record behind each completion: who did it, on what date, how long it took, what they scored if there was a test, and which version of the material they saw. Version matters. If a policy changed in March, you need to prove who saw the old one, who saw the new one and that everybody was moved across. Certificate records show issue and expiry dates with the renewal history behind them. All of it comes out as a file you can hand over, not a dashboard somebody has to be walked through."
        },
        {
          "q": "What happens after we go live?",
          "a": "We keep running it, and that is half of what we do. The monthly fee covers watching the software, fixing faults inside agreed times, security updates, changes as your obligations shift, and a written report on uptime and the work done. The team does not change hands, so nobody needs your escalation rules explained a second time. Agencies that build and leave are the reason a renewal reminder quietly stops sending in month fourteen and nobody notices until the audit."
        }
      ]
    },
    "cta": {
      "h2": "Tell us how your training runs today",
      "lede": "Bring your obligations, your renewal dates and wherever the chasing happens now. We will tell you what our training and attendance software already covers, what needs building, and what it costs.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "Operations",
    "seo": {
      "title": "Staff training and compliance software | Infoloop",
      "description": "Training and compliance software: courses with due dates, certificates tracked to expiry, registers for shift workers and audit files. Run by Infoloop."
    }
  },
  {
    "slug": "d2c-brands",
    "name": "D2C brands",
    "eyebrow": "D2C brands",
    "h1": "Shopify stores for D2C brands, [[built for drop day]]",
    "lede": "You sell straight to the customer, so a slow product page or a wrong stock number costs you money the same afternoon. We build the store, connect it to the tools you already pay for, and stay on to watch it, drop after drop.",
    "button": "Talk to our Shopify team",
    "heroTile": "shopify",
    "context": {
      "h2": "Selling direct means the store is the business",
      "lede": "One store. A pile of apps. A warehouse partner, a subscription tool, an email platform, and ad bills that climb every quarter.",
      "paragraphs": [
        "D2C founders are not short of tools. Shopify, a subscription app, a reviews app, an email platform, a warehouse partner and a reporting dashboard, each with its own stock number and its own idea of who the customer is. The store carries all of it on every page and gets slower for every visitor, including the ones about to buy.",
        "Then the drop lands. An hour of traffic no practice run can copy, at a time you chose and announced yourself. Whoever built the store has moved on, or a support desk is meeting your code for the first time while it is under load. Traffic costs more to buy every quarter, and the same share of people check out."
      ],
      "bullets": [
        "Product pages that load fast on a phone.",
        "Stock, orders and subscriptions joined up.",
        "Somebody watching on drop day."
      ],
      "close": "Infoloop builds the store around what you actually sell, takes out what is not earning its place, connects it to the tools you already pay for, and stays on to watch it. Live before the next drop, then looked after every month."
    },
    "numbers": [
      {
        "value": "38%",
        "label": "more visitors buying after a Shopify rebuild for a DTC brand, still run by us",
        "href": "/work/dtc-shopify-rebuild"
      },
      {
        "value": "1 quarter",
        "label": "for that same rebuild to pay for itself, counted from the day it went live",
        "href": "/work/dtc-shopify-rebuild"
      },
      {
        "value": "72%",
        "label": "less manual support work after an AI support assistant, shipped for a fintech scale-up",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run for clients, month after month",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "D2C problems we solve",
      "lede": "We build and run Shopify stores for the way a brand really sells, not the way an app listing says it should.",
      "items": [
        {
          "title": "A store weighed down by apps",
          "body": "Every good idea of the last two years arrived as another installed app, and now every page carries all of them. Nobody left in the business knows which bits still do anything. We clear the clutter, replace overlapping apps with one clean link, and keep it clear."
        },
        {
          "title": "Ads cost more, sales stay flat",
          "body": "Traffic gets pricier to buy and the same share of people check out, so every order costs more than the last. The leak is in the store, not the ads. We find it: product pages built around the buying decision and a checkout that does not lose people on a phone."
        },
        {
          "title": "Stock numbers that are wrong by lunchtime",
          "body": "Shopify, the warehouse and the accounts each hold their own figure. We join up stock, deliveries and returns between them, so if you are about to sell something you do not have, an alert tells you first, not an angry customer three days later."
        },
        {
          "title": "Growing past what the store can carry",
          "body": "Subscriptions, a second country or a new warehouse partner are coming, and the store cannot take any of them without something else breaking. We rebuild it on a practice copy loaded with your real products, and we are still there afterwards."
        }
      ],
      "tile": "shopify"
    },
    "band": [
      "Built around what you sell.",
      "Watched on drop day."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "What a Shopify rebuild and a support assistant did for real clients.",
      "items": [
        {
          "slug": "dtc-shopify-rebuild",
          "label": "Shopify rebuild"
        },
        {
          "slug": "fintech-support-assistant",
          "label": "Support assistant"
        }
      ],
      "button": "See the full story"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets your brand",
      "lede": "For brands that need the store live before the next drop, without losing a day of sales.",
      "items": [
        {
          "title": "Live before the next drop",
          "body": "Planning in about a week, most builds live in 4 to 8 weeks. If a drop is booked, we plan backwards from it."
        },
        {
          "title": "One price, agreed first",
          "body": "Templates, apps replaced, links, product migration, a date and a figure, in writing before anyone opens the design."
        },
        {
          "title": "Connected to what you pay for",
          "body": "Warehouse, subscriptions, email, accounts and reporting, tested with test orders before anything points at the real store."
        },
        {
          "title": "Your team runs it day to day",
          "body": "Swap a hero photo, reorder a collection or put up a launch page at nine at night without asking us first."
        },
        {
          "title": "Watched by us afterwards",
          "body": "We watch load times, checkout and orders, fix faults to an agreed time, and send a plain report every month."
        }
      ],
      "tile": "webflow"
    },
    "trust": {
      "h2": "Trusted by founders who cannot afford a slow store",
      "sub": "Certified Shopify and Webflow Partners, working with the tools you already pay for."
    },
    "quote": {
      "text": "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
      "role": "Founder, DTC brand",
      "caseSlug": "dtc-shopify-rebuild"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions D2C founders ask us",
      "lede": "Plain answers. Anything else, bring it to the call.",
      "items": [
        {
          "q": "Do you only build on Shopify?",
          "a": "Shopify is where we build stores for brands selling direct. Brand and campaign work, such as a launch page or your story pages, we build in Webflow. Some content sits awkwardly inside a store: ingredients, care advice, lookbooks, size guides, a founder's journal. For that we put a simple content tool behind the store, one screen where your team types and edits and the store pages update from it. If your store runs somewhere we do not build, say so on the first call and you will get a straight answer about whether we suit you, not a pitch about moving."
        },
        {
          "q": "What will a rebuild cost, and how does it work?",
          "a": "It starts with a half-hour call and ends in one document: what we will build, by when, for how much. That document names your templates, the apps being replaced, every link to other software and the move of your products across, so none of it can turn up later as an extra. The figure holds unless you ask for work nobody discussed. Looking after the store afterwards is billed separately, month by month, and covers watching it, fixing it within agreed times, security updates, improvements and a written report. Two numbers, kept apart on purpose, so you always know which one is buying what."
        },
        {
          "q": "What happens after the store goes live?",
          "a": "You move onto a monthly arrangement. Somebody is watching the store, breakages get fixed within the times we agreed, security updates go on, improvements ship between launches, and a short written report lands each month. It stays the same people throughout: whoever wrote the code is whoever reads the alert. That matters most on a drop day, when the traffic you announced yourself arrives inside an hour and a fault nobody notices costs you orders by the minute. Going live is the start of the job, not the end of it."
        },
        {
          "q": "Will a rebuild wreck our search traffic?",
          "a": "No. Search traffic is what most rebuilds quietly break, so we treat it as part of the job, not a tidy-up at the end. Every page that ranks today gets a matching page on the new store, and the old address sends visitors and Google straight to it. We check the whole map of old address to new, page by page, on a practice copy before the switch. For weeks afterwards we watch your search visits and paid landing pages, because a dead landing page during a live ad campaign costs money fast. Plan the switch away from a drop week and there is very little to feel."
        },
        {
          "q": "Can you handle subscriptions, bundles and our warehouse?",
          "a": "Yes, and for most brands selling direct this is where the real work sits. We set up repeat deliveries, bundles, free gifts and offers after checkout, and we join up stock, deliveries and returns between Shopify, your warehouse or delivery partner and your accounts. We would rather replace three overlapping apps with one clean link than keep stacking code onto the store, because too many apps is a common reason a store sells badly on a phone. Send us your installed app list before the first call and we will tell you which ones we would keep."
        },
        {
          "q": "Where does AI genuinely help a brand like ours?",
          "a": "Nothing of ours reaches a live store without limits, somebody watching it and a way to switch it off again. For a brand selling direct the honest candidates are narrow. A helper answering where-is-my-order, delivery and returns questions against your real order records is one. An assistant for whoever handles your customer care is another. We built a support assistant for a fintech scale-up that took first response from hours to under two minutes, and this is the same kind of build. If it will not plainly beat a good help page and a clear returns policy, we will say so, not sell it to you."
        }
      ]
    },
    "cta": {
      "h2": "Bring us whatever is losing you sales",
      "lede": "Half an hour, your product list and your installed apps. You leave knowing what a rebuild would cost, when it would land, and who would be watching the store on your next drop day.",
      "button": "Book a half-hour call"
    },
    "blogCategory": "Web and SEO",
    "seo": {
      "title": "Shopify development for D2C brands | Infoloop",
      "description": "Shopify stores for D2C brands, built for drop day: fast product pages, subscriptions, warehouse links, somebody watching after launch. Run by Infoloop."
    }
  },
  {
    "slug": "ecommerce-retail",
    "name": "eCommerce and retail",
    "eyebrow": "eCommerce and retail",
    "h1": "Online stores for retail brands, built to [[keep selling]]",
    "lede": "You sell products. We build the store that sells them: fast on a phone, easy to buy from, and still standing on your busiest day. We build it, then we look after it.",
    "button": "Talk to our experts",
    "heroTile": "shopify",
    "context": {
      "h2": "Your store has to work on its busiest day",
      "lede": "A template three freelancers have patched. Products in a spreadsheet nobody trusts. A checkout that loses people on a phone. And a sale week coming up.",
      "paragraphs": [
        "Retail brands are not short of tools. They are short of a store that behaves. Sizes, colors and collections were loaded in a hurry and never tidied. The theme is slow on a phone, so people drop out at checkout. Changing a banner means asking a developer and waiting for a free slot.",
        "The agency that built it handed over the passwords and moved on. Now the store works until it does not, and when it breaks in the middle of a sale you are calling whoever built it two years ago and hoping they pick up."
      ],
      "bullets": [
        "A store that loads fast and is easy to buy from.",
        "Products, collections and content your team edits themselves.",
        "Somebody already watching it when the sale starts."
      ],
      "close": "Infoloop builds your store on Shopify and your brand pages in Webflow, moves your products and web addresses across without losing your place on Google, and stays to look after it, month after month."
    },
    "numbers": [
      {
        "value": "38%",
        "label": "more visitors buying after a Shopify store rebuild for a DTC brand",
        "href": "/work/dtc-shopify-rebuild"
      },
      {
        "value": "1 qtr",
        "label": "for that rebuild to pay for itself, and we still run the store",
        "href": "/work/dtc-shopify-rebuild"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run for clients",
        "href": "/about"
      },
      {
        "value": "4.8",
        "label": "average client rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "eCommerce and retail problems we solve",
      "lede": "We build and run stores for the way a retail brand really sells, not the way a theme demo suggests.",
      "items": [
        {
          "title": "You have outgrown a bought template",
          "body": "Three freelancers have patched it, it is slow on a phone and people drop out at checkout. Nobody knows what half the extra code does. We rebuild it properly on Shopify: the look, the product pages, the cart and the checkout. Then we keep it that way."
        },
        {
          "title": "You sell in person but not online yet",
          "body": "You have a physical store, a market stand or a wholesale list, and no real store online. We build the store, load your products and are still around when the first orders and the first problems arrive together."
        },
        {
          "title": "Your products are in a mess",
          "body": "Sizes, colors, collections, tags, descriptions and photos were loaded in a hurry. We set them up once in a sensible order, so customers can filter and search, your team can group products for a sale in a minute, and the sales reports add up."
        },
        {
          "title": "Nobody is looking after the store",
          "body": "It works, until it does not. Then you are calling whoever built it two years ago. We watch the store, fix faults within an agreed time, keep it patched and safe, and are already there when the sale starts."
        }
      ],
      "tile": "shopify"
    },
    "band": [
      "Fast to buy from.",
      "Looked after by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from work we shipped and still run.",
      "items": [
        {
          "slug": "dtc-shopify-rebuild",
          "label": "Shopify rebuild"
        },
        {
          "slug": "fintech-support-assistant",
          "label": "Support assistant"
        }
      ],
      "button": "Read the case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For brands that need a store live quickly, and want the same people still there after launch.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, most stores live in 4 to 8 weeks, tested on a practice version first."
        },
        {
          "title": "One price, in writing",
          "body": "What we build, when it goes live and what it costs, agreed before anything starts."
        },
        {
          "title": "Your team edits it",
          "body": "Change a banner, add a product or put up a page yourselves, with no developer in the way."
        },
        {
          "title": "Moved without losing Google",
          "body": "Products, pages and old web addresses brought across, so rankings and links hold."
        },
        {
          "title": "Looked after afterwards",
          "body": "We watch it, fix faults to an agreed time, keep it safe, and report every month."
        }
      ],
      "tile": "webflow"
    },
    "trust": {
      "h2": "Trusted by brands that need the store to just work",
      "sub": "Certified Shopify and Webflow Partners, working on the tools you already sell with."
    },
    "quote": {
      "text": "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
      "role": "Founder, DTC brand",
      "caseSlug": "dtc-shopify-rebuild"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions store owners ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What do you build stores on?",
          "a": "Shopify for the store itself: products, cart and payment. Webflow for your brand and marketing pages, set up so your team changes words and pictures without asking us. Writing that does not fit neatly in a store, like care guides, size charts or buying advice, goes in one place your team edits, and it appears on the store by itself. We are certified Shopify and Webflow Partners and have rebuilt a direct-to-consumer Shopify store already. If your store runs on something else, tell us on the first call and you get a straight answer on whether we suit you, not a push to move."
        },
        {
          "q": "What will it cost, and how do you charge?",
          "a": "It starts with a half-hour call. After it we write down one price, one date and a list of exactly what is included: the pages, the templates, the links to other software and moving your products across. You see that number before any building starts, and it only changes if you ask for something that was never on the list. Once the store is live, looking after it is a separate monthly fee: watching it, fixing faults, keeping it safe, small improvements and a report. Two numbers, kept apart, so you always know what each one buys you."
        },
        {
          "q": "What happens once the store is live?",
          "a": "That is when the monthly job starts. We watch the store and fix what breaks within the response times we agreed. We keep the software up to date and safe and make small improvements as we go. Each month you get a short report: whether the store stayed up, what we did and what we think is worth doing next. It is the same people throughout. Nobody hands your store to a support desk that has never seen it, and a named person replies within one business day."
        },
        {
          "q": "Can you move our store without losing our place on Google?",
          "a": "Yes, and the move is part of the price rather than an extra later. We bring your products, collections, pages and photographs across, then point every old web address at its new home so links from other sites still work and your rankings hold. All of it is tested on a practice version before anything goes live, and we watch your traffic closely for weeks afterwards. Tell us how big your product list is on the first call so that work sits inside the agreed price."
        },
        {
          "q": "Can we add products and change the store ourselves?",
          "a": "Yes. That is how we build. Products, descriptions, photographs and pages are set up so the people who do your buying and marketing can add a product, change a banner, put up a page or fix a typo themselves. Nobody should have to raise a request to change a headline the day before a sale. We show your team how it works before the store goes live. Anything that genuinely needs a developer stays with us under the monthly fee, so it never holds up a campaign."
        },
        {
          "q": "What can AI actually do for a store like ours?",
          "a": "The useful jobs are narrow. A helper that tells customers where their order is, when it arrives and how to send something back. A lookup that tells your team what is in stock without opening three screens. We only switch one on with clear limits on what it can do, somebody watching what it says and a way to turn it off in seconds. We built a support assistant for a fintech scale-up in five weeks that cut manual support work by 72%. This is the same kind of build. If a well written help page would do the job better, we say so."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your store needs",
      "lede": "Bring the thing that costs you sales: a slow checkout, products nobody can find, or a store nobody watches. You will leave the call with one price, one date and a written list.",
      "button": "Book a half-hour call"
    },
    "blogCategory": "Web and SEO",
    "seo": {
      "title": "eCommerce and retail: Shopify stores, run by us | Infoloop",
      "description": "Shopify stores and Webflow brand pages for retail brands: fast to load, easy to buy from, moved without losing Google, and looked after monthly by Infoloop."
    }
  },
  {
    "slug": "edtech",
    "name": "EdTech",
    "eyebrow": "EdTech",
    "h1": "Learning and exam software, built [[for the busiest morning]]",
    "lede": "Your product teaches people, tests them and hands them a certificate. Your customers are schools, colleges and training companies, and they ask hard questions before they sign. We build the product, then keep it running through every exam window.",
    "button": "Talk to our team",
    "heroTile": "lms",
    "context": {
      "h2": "Education products are judged in exam week",
      "lede": "A whole year group logging in at nine. Term dates that will not move. Buying teams that want the accessibility answer, the data answer and the audit trail before they sign.",
      "paragraphs": [
        "Most education companies are not short of features. They are short of a product that holds up when it matters. The exam page that worked for ten people in the office slows down when a whole year group logs in. Marking runs late. Results get typed into the school's own software by hand.",
        "Often the agency that built the product has gone. Nobody on your team wrote the code, connections drift, and there is no one to call in exam week. Or you are adding AI to something institutions already pay for, and one wrong flag or wrong mark could cost you the account."
      ],
      "bullets": [
        "Exams that hold up on the busiest morning.",
        "AI marking and proctoring with a person deciding.",
        "Results pushed back into what schools already run."
      ],
      "close": "Infoloop builds the learning and exam software you sell, often starting from LoopIQ, the platform we already own, connects it to the tools your customers run, and stays to keep it running through every term and exam window."
    },
    "numbers": [
      {
        "value": "99.9%",
        "label": "uptime on the software we run, through sign-up weeks and exam windows",
        "href": "/about"
      },
      {
        "value": "50+",
        "label": "projects delivered, each from a written scope before work started",
        "href": "/work"
      },
      {
        "value": "4.8",
        "label": "average client rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      },
      {
        "value": "1 day",
        "label": "at most for a named person to reply, on any business day",
        "href": "/contact"
      }
    ],
    "challenges": {
      "h2": "EdTech problems we solve",
      "lede": "We build and run software for the way institutions really buy and use it, not the way a pitch deck says they should.",
      "items": [
        {
          "title": "Your exam date is fixed and close",
          "body": "You have sold a live assessment product for this term and the date will not move. We build it end to end, load test it against your busiest morning and put one real group through, sign-up to certificate, before the paying ones arrive."
        },
        {
          "title": "The agency that built your product has gone",
          "body": "You inherited code nobody on your team wrote. Marking breaks quietly, connections drift, and there is nobody to call in exam week. We take it over, steady it and stay to run it, one safe change at a time."
        },
        {
          "title": "AI marking or proctoring that could misfire",
          "body": "Institutions already depend on your product, so a wrong flag or a wrong mark costs you the account. We build AI with limits: a first mark against your own guide, every flag on a review list with the recording, a person deciding, and a switch to turn it off."
        },
        {
          "title": "Results stuck outside your customers' tools",
          "body": "Schools want one login, student lists and results pushed back into the software they already pay for. We build to SCORM, xAPI and LTI, the exchange standards buying teams ask for by name, and connect directly where an institution runs something unusual."
        }
      ],
      "tile": "copilot"
    },
    "band": [
      "Built for the busiest morning.",
      "Run by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from products we built and still run.",
      "items": [
        {
          "slug": "fintech-support-assistant",
          "label": "AI assistant"
        },
        {
          "slug": "manufacturing-attendance-opsdeck",
          "label": "OpsDeck rollout"
        }
      ],
      "button": "See the case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For education companies that need software live before term starts, and watched once it is.",
      "items": [
        {
          "title": "Live before term starts",
          "body": "Planning in about a week, most builds live in 4 to 8 weeks, with one real group put through first."
        },
        {
          "title": "One price, agreed first",
          "body": "Scope, dates and price in writing before anything is built. Term dates go in as fixed walls."
        },
        {
          "title": "Start from working software",
          "body": "LoopIQ, our own learning and testing platform, already does courses, question banks and certificates. You pay to shape it, not invent it."
        },
        {
          "title": "Answers ready for the buying team",
          "body": "Accessibility, where data is kept, how long records are held and what trail exists, written down for you."
        },
        {
          "title": "Watched through exam week",
          "body": "We watch uptime, exam completions and the marking queue, fix faults to an agreed time, and report every month."
        }
      ],
      "tile": "lms"
    },
    "trust": {
      "h2": "Trusted by companies whose product has to work on the day",
      "sub": "Built with tools your team already knows, on a platform we own and run."
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions education companies ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What exactly do you build for education companies?",
          "a": "The parts of an education product that cost you an account when they go wrong. Courses and learner records. Question banks and timed exams. Exams taken at home with somebody watching. Marking help. Certificates with expiry dates and renewal reminders. And the connections that push results back into your customers' own software. We also own LoopIQ, a working learning and testing platform, so some of this is setting up what already exists rather than building from nothing. After launch we keep it running for a monthly fee, with somebody watching it, fixing it and keeping it safe."
        },
        {
          "q": "Can we let software mark work that counts?",
          "a": "Only with a person at the end of it. The software gives a first mark on written and short answers against your own marking guide, and shows how it got there. A marker then confirms or changes every mark before a learner sees anything. Every change is recorded, so moderation, appeals and awarding body audits have a trail to follow. We also track how often the software and your markers agree, and the feature can be switched off without taking the exam platform down with it."
        },
        {
          "q": "What happens when the software wrongly flags a student?",
          "a": "Nothing, until a person looks. During an exam taken at home the software watches the camera and the screen and flags things like a switched tab, an empty seat or a second face. Every flag lands on a review list with the recording attached, and one of your people makes the call. Wrong flags are common when exams happen at home. A student failed by a machine, with no evidence and no way to appeal, is a complaint you cannot answer, so we never let the software decide on its own."
        },
        {
          "q": "Will it work with the software our customers already use?",
          "a": "That is usually what decides a tender, so we scope it first. We build one login, student lists, and results going back into the student record software, CRMs and HR tools your customers run. We also build to SCORM, xAPI and LTI, the exchange standards buying teams ask for by name, which are agreed ways for course software to swap material and results with other tools. Where an institution runs something unusual, we connect to it directly. All of it goes into the fixed price with everything else, so it never turns up later as a surprise line."
        },
        {
          "q": "What will it cost, and how do you charge?",
          "a": "It starts with a 30-minute call. After that you get the scope, the dates and the price in writing before anything is built, so you know what is in and what is not. The price depends on whether LoopIQ, the platform we already own, fits your product or whether this is a build from scratch, and on how many other tools your customers need it to talk to. Keeping it running afterwards is a separate monthly fee. We quote both on the same call, so you can budget for the year rather than only for the launch."
        },
        {
          "q": "What happens after launch?",
          "a": "We keep it running. A monthly fee covers somebody watching it, fixes within a promised time, small improvements, security updates and a report each month showing what broke, what changed and what we would do next. For an education product that means somebody paying attention during sign-up week and exam windows, not only on a quiet Tuesday. If you would rather run it yourself, we hand over written instructions and stay reachable. Either way our advice is the same: an exam window cannot be moved, so somebody has to be watching the morning it opens."
        }
      ]
    },
    "cta": {
      "h2": "Show us how your product works today",
      "lede": "A 30-minute call, then a written scope with dates and a price. If LoopIQ fits, we say so and you pay less. If not, we build to your product and keep it running.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "AI",
    "seo": {
      "title": "EdTech software: courses, exams and marking | Infoloop",
      "description": "Learning and exam software for education companies: courses, timed exams, remote proctoring, AI marking with a person deciding. Run by Infoloop."
    }
  },
  {
    "slug": "energy-utilities",
    "name": "Energy and utilities",
    "eyebrow": "Energy and utilities",
    "h1": "Software for energy and water companies, [[built for the van]]",
    "lede": "You keep the power on and the water running. We build the software that keeps track of it: which equipment is wearing out, which crew is where, what went off and when it came back, and what the regulator wants to see. Then we keep it running.",
    "button": "Talk to our experts",
    "heroTile": "erp",
    "context": {
      "h2": "Utilities run on readings, crews and returns",
      "lede": "Meters and sensors that record everything. Vans spread across the region. A regulator that wants proof, in a set layout, on a set day. And software that was never built for any of it.",
      "paragraphs": [
        "The control room, the meters and the sensors all record plenty. Getting a straight answer about which equipment is wearing out means somebody exporting files on a Friday afternoon. Jobs go out over the phone, the sheets come back in a van three days later, and half of them cannot be read.",
        "Inspection records sit in spreadsheets, email attachments and a shared drive, so every regulatory return is put together by hand. When the supply goes off, one person updates the customer page while another logs the fault, and the two rarely agree. Nobody chose this. It just built up."
      ],
      "bullets": [
        "One screen for every reading, and an alert that reaches whoever is on call.",
        "A job board that knows who is qualified, who is free and how far they must drive.",
        "Returns that come out of the records on their own, on the day they are due."
      ],
      "close": "Infoloop builds that software for the tablet in the van and the screen in the office, reads from what you already run without touching anything that controls equipment, and stays to keep it running. One type of equipment first, then the rest."
    },
    "numbers": [
      {
        "value": "50+",
        "label": "projects delivered for companies that needed software to just work",
        "href": "/work"
      },
      {
        "value": "6",
        "label": "countries where teams run software we built and look after",
        "href": "/about"
      },
      {
        "value": "4.8",
        "label": "average client rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run, watched around the clock",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "Energy and utilities problems we solve",
      "lede": "We build and run software for the way field work really happens: bad signal, gloves on, and a return due on Friday.",
      "items": [
        {
          "title": "The readings exist but nobody can see them",
          "body": "Meters, sensors and the control room software each hold part of the picture. We pull the readings onto one screen, you set the level that counts as a problem, and the alert goes to the engineer on call with the reading that set it off kept for later."
        },
        {
          "title": "Field work runs on phone calls and paper",
          "body": "Jobs arrive from an alarm, a planned inspection or a customer call. We put them on a board against who is qualified, who is free and how far they must drive. The form on the tablet works underground and sends itself once the van is back in signal."
        },
        {
          "title": "One person spends a month on the returns",
          "body": "Inspection results, test certificates and safety paperwork are captured once, in a proper form, instead of scattered across spreadsheets. The return comes out in the layout your regulator or auditor asks for, on the day it is due, without anyone rebuilding it."
        },
        {
          "title": "When the supply goes off, two things get updated",
          "body": "Logging the fault, listing who is affected, sending crews out and recording when it came back on, all in one flow. The page customers look at and the messages they get come from the same record, so nobody is keeping two things in step during an incident."
        }
      ],
      "tile": "garage"
    },
    "band": [
      "Works without a signal.",
      "Watched at 3am."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "No published energy job yet, and we say so plainly. These are the nearest ones: equipment that fails, crews spread across sites, and a support helper that runs on its own.",
      "items": [
        {
          "slug": "manufacturing-erp-predictive-maintenance",
          "label": "Machinery maintenance"
        },
        {
          "slug": "brightlane-auto-group-garagezone",
          "label": "Nine-branch garages"
        },
        {
          "slug": "fintech-support-assistant",
          "label": "AI support helper"
        }
      ],
      "button": "Read case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For energy and water companies that need software live quickly, out in the field, without a second project to keep it alive.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, most builds live in 4 to 8 weeks, one type of equipment or one crew at a time."
        },
        {
          "title": "One price, agreed first",
          "body": "What we build, when it lands and what it costs, in writing, with every feed we must read from named on its own line."
        },
        {
          "title": "Built for the van, not the desk",
          "body": "Bad signal, gloves on, a tablet bolted in the cab and a paper fallback. Designed for on day one, not complained about in week one."
        },
        {
          "title": "AI only where it earns its place",
          "body": "A helper that sorts fault calls or drafts an incident report, watched by us and switched off in seconds if it misbehaves."
        },
        {
          "title": "Somebody is watching it at 3am",
          "body": "We watch it, fix faults to an agreed time, keep it patched, report every month, and a named person replies within one business day."
        }
      ],
      "tile": "copilot"
    },
    "trust": {
      "h2": "Trusted by teams whose software cannot go off with the supply",
      "sub": "Built on the platforms you already run and the tools we know well."
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions energy and utilities teams ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "Can you read from the software in our control room?",
          "a": "Yes, and it is usually the biggest part of the job, so we treat it as the main risk rather than a footnote. Before we quote, we list every place your numbers live: control room software, meter readings, maps, customer records, finance and the contractors' own tools. For each one we work out how it hands data over and who controls access. Each goes into the plan on its own line. Where something has no clean way of handing data over, we say so up front and price the way round it. And we only read from operational software. We never write into anything that controls equipment."
        },
        {
          "q": "What does it cost?",
          "a": "It starts with one call. After that you get what we will build, when, and for how much, in writing, before anyone starts. You are not paying by the hour and hoping for the best. The build is a project with a price on it. Once it is live, keeping it running is a separate monthly fee that covers watching the software, fixing faults within an agreed time, improvements, security patches and a monthly report. We do not publish a rate card, because the price depends almost entirely on how many feeds we must read from and how many types of equipment are in scope."
        },
        {
          "q": "What happens after it goes live?",
          "a": "We keep it running. That is the second half of what we do. For a monthly fee we watch the software, so a problem is spotted by us rather than reported by a crew standing in a field. We fix faults within a time we agree with you, keep improving it and keep it patched. Every month you get a report showing what broke, what we fixed, what changed and how the whole thing is performing. If you ever want to bring it in-house, we hand over the code and the access properly. The default, though, is that we stay."
        },
        {
          "q": "Will the tablets work in a basement substation?",
          "a": "Yes, and it is built in from the start, not patched on later. The tablet holds the job list, the equipment details and the forms on the device itself, so an engineer can finish an inspection in a basement or halfway up a hill and the record is captured properly. Photos, signatures and forms queue up and send when the tablet gets a signal again. If two people worked on the same piece of equipment, neither wipes out the other's notes. We test this in real conditions before launch, not on the office wifi, because a field tool that needs a signal is a paper form with extra steps."
        },
        {
          "q": "Can you produce the returns our regulator asks for?",
          "a": "We build the report to whatever layout you are obliged to produce, under whichever rules you work to. The trick is to capture the underlying evidence once and properly: what was inspected, what the test said, what condition the equipment is in, what was done about it, when, and who did it. The return is then generated from that. When the required layout changes, and it will, that is a change to one output rather than a month of retyping. We ask to see your current returns and the guidance you follow during the first call, so what we store lines up with what you have to prove."
        },
        {
          "q": "Have you done work in this industry before?",
          "a": "No published energy job, and we will not pretend otherwise. What we have done sits right next door. We built maintenance software connected to a machinery maker's ERP that flags a likely failure 10 to 14 days ahead, saved $1.2M a year and cut unplanned downtime by 72%. We built attendance software for a three-plant manufacturer, a support assistant for a fintech with a first reply in under two minutes, and one platform for a garage group across nine branches. The shared shape is work out on site, crews spread about, records that must stand up to inspection, and joining up software nobody wants to replace."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your crews and equipment do",
      "lede": "Bring the equipment, the crews and the returns you owe. You will leave the call with a plan, a date and a price, or an honest answer that this is not a fit.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "Operations",
    "seo": {
      "title": "Energy and water software: equipment and crews | Infoloop",
      "description": "Energy and water software built for the van: readings on one screen, crews on a board, tablet forms with no signal, returns on time. Run by Infoloop."
    }
  },
  {
    "slug": "enterprise-software",
    "name": "Enterprise software",
    "eyebrow": "Enterprise software",
    "h1": "Move your product forward [[without breaking your customers]]",
    "lede": "You sell a product that works. Paying customers sit on four different versions of it, and every upgrade has hurt somebody. We build the next part, roll it out carefully across the versions people actually run, and stay on to look after it.",
    "button": "Talk to our experts",
    "heroTile": "erp",
    "context": {
      "h2": "Selling the product is easier than changing it",
      "lede": "Four versions in the field. A branch cut for one big account. A renewal that now hinges on an AI feature nobody inside has built.",
      "paragraphs": [
        "Software vendors are not short of ideas for the roadmap. They are short of safe ways to ship them. Every release has hurt an account at some point, so upgrades get put off, and support ends up keeping alive behavior that stopped shipping years ago. The people who wrote the core moved on, and nobody dares touch it.",
        "Meanwhile the biggest customer wants AI in the product, an auditor wants to know what it will record, and a prospect's security team has stalled the deal on single sign-on and an API. The roadmap loses to support again."
      ],
      "bullets": [
        "Releases that reach every version you still support.",
        "Upgrades your own support team can run.",
        "AI features with a switch per customer."
      ],
      "close": "Infoloop builds the next part of your product, tests it against every release line you still stand behind, rolls it out one account at a time, and stays on to keep it standing."
    },
    "numbers": [
      {
        "value": "$1.2M",
        "label": "saved a year by maintenance software we connected to a machinery maker's ERP",
        "href": "/work/manufacturing-erp-predictive-maintenance"
      },
      {
        "value": "72%",
        "label": "less manual support work after an AI support assistant for a fintech scale-up",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "5 wks",
        "label": "to ship an AI support assistant for a fintech scale-up, running ever since",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "99.9%",
        "label": "uptime on the software we run for clients",
        "href": "/about"
      }
    ],
    "challenges": {
      "h2": "Enterprise software problems we solve",
      "lede": "We build and run software for vendors whose customers cannot afford a bad release.",
      "items": [
        {
          "title": "Customers stranded on old versions",
          "body": "Accounts three releases behind because the last upgrade hurt them. We map who is on what, write data changes that can be practiced first and reversed afterwards, and turn the upgrade into a job your own support team can run."
        },
        {
          "title": "A big account wants AI in the product",
          "body": "It came up at renewal and now it is on a slide. We build narrow helpers that draft, sort or summarize, behind a switch set per customer, with anything sensitive waiting for a person and everything written down for that account's auditor."
        },
        {
          "title": "One-off branches carried for single customers",
          "body": "A branch cut years ago to keep one account happy, still maintained today. We move what we can into settings and switches, so the next bespoke request becomes a configuration change rather than another branch somebody keeps forever."
        },
        {
          "title": "The product sells and nobody dares touch it",
          "body": "The revenue is real. The people who built it have moved on. We work out what each awkward part does and which accounts depend on it, then replace it one releasable piece at a time behind the screens people already use."
        }
      ],
      "tile": "copilot"
    },
    "band": [
      "Shipped without breaking customers.",
      "Run by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from heavy software with real users on it.",
      "items": [
        {
          "slug": "manufacturing-erp-predictive-maintenance",
          "label": "Machinery ERP"
        },
        {
          "slug": "fintech-support-assistant",
          "label": "AI support assistant"
        }
      ],
      "button": "Read case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For vendors that need the roadmap moving again, without a support crisis.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, most projects live in 4 to 8 weeks, a pilot account first, then the rest."
        },
        {
          "title": "One price, agreed first",
          "body": "The releases it has to reach and the places it has to run, with dates and price in writing before we start."
        },
        {
          "title": "Works where your customers run it",
          "body": "Hosted by you, in their cloud, or on their own hardware. One install and update route for all three."
        },
        {
          "title": "Answers for the purchase review",
          "body": "Single sign-on, exportable activity records and versioned API docs, built once and reused for the next deal."
        },
        {
          "title": "Run by us afterwards",
          "body": "We watch it across every supported version, fix faults to an agreed time, keep it patched, and report every month."
        }
      ],
      "tile": "verko"
    },
    "trust": {
      "h2": "Trusted by vendors whose product cannot go down",
      "sub": "Built in your repository, your cloud accounts and the platforms we know well."
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions software vendors ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "How is the price worked out?",
          "a": "Two figures, both agreed before anyone writes code. The build is a written scope with dates against it, not a day rate, so anything you add later is a separate quote you approve first. Keeping it running afterwards has its own monthly figure, sized to how much we look after. Where the code is old enough that nobody inside your company can say what a part does, we sell a short paid review first, and that written review is yours whatever you decide next. The call that starts it all takes 30 minutes and costs nothing."
        },
        {
          "q": "Do you have to rebuild the old parts?",
          "a": "Almost never, and we do not open with it. A product sold for years carries behavior that particular customers depend on and that nobody wrote down. Throw it away and you rediscover all of it through angry tickets. We work in your repository, your branches and your build checks, and our changes go through the review your team already runs. Sometimes one part has to go: a record structure written for a single installation, or a platform whose supplier has stopped patching it. We price that part on its own, agree it with you first, and replace it behind the screens people already use."
        },
        {
          "q": "Our customers are on old versions. How do upgrades work?",
          "a": "First we map it: who is on what, what was customized for them, and which of those customizations can move into settings instead of staying a branch. Then the upgrade is built as steps, each one releasable and each one reversible. Data changes are practiced against a copy of a real customer database before they are run for real. The first release goes to a pilot account, gets watched through a month of normal work, then widens across the rest. The aim is an upgrade your support team can run on a Tuesday afternoon, not one that needs an engineer on a call with every account."
        },
        {
          "q": "How would you add AI to a product people already pay for?",
          "a": "Narrowly, and behind a switch your account managers control. We pick two or three jobs where the rules are already written down, limit what the feature can reach to the tools those jobs need, and require a person to decide anything that moves money or changes a record a customer may have to justify to an auditor. Everything it does is recorded. Because one feature has to suit accounts with different rules, the switch is per customer, and an account that says no never sees it. Our fintech support assistant is built this way. We read its numbers every month and widen it only when they hold."
        },
        {
          "q": "Our product runs on customer hardware. Does that still work?",
          "a": "Yes. It changes what gets built, not whether we take the job. Install and update routes are designed for every environment you actually ship into, so a fix can reach an installation at a customer's site without somebody traveling there. For AI features it matters most: the model, the data and the records can all stay inside that customer's own boundary where their contract demands it. We work in your accounts rather than ours, so our access can be withdrawn at any moment, and we develop against masked or made-up records rather than real customer data."
        },
        {
          "q": "Who looks after it once the release is out?",
          "a": "We do, across every version it is installed on, which for a vendor is the harder half of the job. That means alerts on the environments we can see, fixes inside agreed times, and security patches applied to each release line still under support, not only the newest. Once a month you get a written report: what changed, what the numbers did and the next step. One monthly figure, sized to what we look after, and the software we run stays up. Your repositories, your cloud accounts and written instructions stay yours, so ending the arrangement costs only the notice period."
        }
      ]
    },
    "cta": {
      "h2": "Tell us the part nobody wants to touch",
      "lede": "Bring the list of versions and the accounts you dare not upgrade. Half an hour later you know how we would approach it and what we need to see before we can price it properly.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "AI",
    "seo": {
      "title": "Enterprise software: upgrades and AI features | Infoloop",
      "description": "Software vendors: careful upgrades across every version, AI features behind a per-customer switch, and a team that stays on. Run by Infoloop."
    }
  },
  {
    "slug": "isvs-technology-companies",
    "name": "ISVs and technology companies",
    "eyebrow": "ISVs and technology companies",
    "h1": "Senior engineers inside your team, [[without the wait to hire]]",
    "lede": "Your roadmap is longer than your team and hiring will not close the gap this quarter. We add senior engineers who work inside your process, or take one whole module off your hands. Either way you get code your own people can keep, and we can run it if you prefer.",
    "button": "Talk to our engineers",
    "heroTile": "copilot",
    "context": {
      "h2": "Software companies run out of hands before they run out of ideas",
      "lede": "Features promised to customers. A module nobody has room for. Connectors sales keeps promising. Buyers who now expect AI inside the product.",
      "paragraphs": [
        "Product teams are not short of work. They are short of senior people who can pick up a piece of the plan and finish it without being managed. Recruitment takes a quarter, the plan does not wait, and the last contractor you tried needed one of your leads to keep them straight.",
        "Meanwhile the connectors your sales team keeps promising sit in the backlog, the marketing site drifts away from what the product actually does, and buyers have started asking where the AI is. The prototype was never the hard part. Making it safe under live traffic is."
      ],
      "bullets": [
        "Engineers who work inside your process, not beside it.",
        "One module priced, built and handed back.",
        "AI features that survive live users."
      ],
      "close": "Infoloop puts senior engineers inside your team or takes one defined piece of the product off your plate, builds it in your repository to your standards, and can stay to run it afterwards. Your code, your process, your name on the release."
    },
    "numbers": [
      {
        "value": "2.1x",
        "label": "more qualified leads for a software company after a new Webflow site, in four months",
        "href": "/work"
      },
      {
        "value": "72%",
        "label": "less manual support work with an AI support assistant for a fintech scale-up",
        "href": "/work/fintech-support-assistant"
      },
      {
        "value": "50+",
        "label": "projects delivered across 6 countries, with a 4.8 average client rating",
        "href": "/about"
      },
      {
        "value": "1 to 2 wks",
        "label": "to add senior developers to your team, working inside your own process",
        "href": "/contact"
      }
    ],
    "challenges": {
      "h2": "Problems software companies bring us",
      "lede": "We build and run the parts of the product your team has no room for, to your standards, in your repository.",
      "items": [
        {
          "title": "The roadmap is longer than the team",
          "body": "Features are promised for this quarter and recruitment will not land in time. We add two or three senior engineers who join your stand-ups, use your repository and your definition of done, and do not need one of your leads to manage them."
        },
        {
          "title": "One module is holding up the release",
          "body": "A reporting layer, an admin screen, a move off an aging part of the stack. Nobody has room for it. We price it, build it to fit how your product is already put together, and hand back code your engineers can maintain without calling us."
        },
        {
          "title": "Customers want AI inside the product",
          "body": "Buyers now expect search, summaries or an assistant. The prototype was never the hard part. We ship AI features with firm limits, checked against real examples, measured once live and reversible in minutes. Under your name, not ours."
        },
        {
          "title": "The connector backlog keeps growing",
          "body": "The integrations sales keeps promising. We build them against other companies' software and handle the awkward parts: signing in, rate limits, retries and half-finished jobs. Then we write the tests that catch it the day the other side changes something."
        }
      ],
      "tile": "verko"
    },
    "band": [
      "Your process, your repository.",
      "Our senior engineers."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from AI features and platforms we shipped for other companies.",
      "items": [
        {
          "slug": "fintech-support-assistant",
          "label": "AI support assistant"
        },
        {
          "slug": "brightlane-auto-group-garagezone",
          "label": "Platform with AI agents"
        }
      ],
      "button": "See the case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For product teams that need senior hands now, without a second process to manage.",
      "items": [
        {
          "title": "Senior people, no bench filling",
          "body": "Engineers who have shipped products before. Two who need no supervision, not five who need managing."
        },
        {
          "title": "Code your team inherits",
          "body": "Your repository, your tools, with tests and notes written for whoever picks it up next."
        },
        {
          "title": "One price, agreed first",
          "body": "Scope, dates, price and a start date in writing before any work begins."
        },
        {
          "title": "AI features that hold up live",
          "body": "Firm limits, real examples before release, measured once live, reversible in minutes."
        },
        {
          "title": "Run by us afterwards",
          "body": "We watch it, fix faults to an agreed time, keep it patched, and report every month."
        }
      ],
      "tile": "webflow"
    },
    "trust": {
      "h2": "Built for teams who have to maintain the code after we leave",
      "sub": "Built in the languages and frameworks your team already uses, on platforms we know well."
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions CTOs and product leads ask us",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "How do your engineers fit in with our team?",
          "a": "Inside your process, not next to it. They use your repository, your branching and release habits, your build checks, your tracker and your stand-ups. Your engineers review everything we submit, so nothing merges that your own team would not have written. There is no second list of work and no separate status process to reconcile later. This matters more for a software company than for most clients: whatever we write becomes part of a product you will be maintaining for years after we have gone."
        },
        {
          "q": "What does it cost and how is it set up?",
          "a": "It starts with a 30-minute call. After it you get the scope, the dates, the price and a start date in writing, before any work begins. Two shapes cover most software companies: senior engineers added to your team for an agreed period, or one defined module priced and delivered as a single piece of work. Running it afterwards is a separate monthly fee covering watching, fixes inside agreed times, security updates and improvements. We do not publish a rate card, because it depends on how senior the people are, how long you need them and how much of the running you want us to take on."
        },
        {
          "q": "What happens when the work is finished?",
          "a": "You get documents, tests and a walkthrough with the engineer who will own the code from here, so your team can maintain it without us. That is the default, not a paid extra. If you would rather we kept it alive, the monthly arrangement covers alerts, fixes inside agreed times, security updates, small improvements and a monthly report on uptime, what broke, what we fixed and what we suggest next. We run to 99.9% uptime on the software we look after. You can end that arrangement and keep everything, because the code, the pipeline and the documents have been yours from the first day."
        },
        {
          "q": "Who owns the code?",
          "a": "You do, from the first commit. The same goes for the designs, the documents, the tests and the deployment configuration. There is no private framework of ours underneath that ties you to us, and work built for one client never turns up inside another client's product. Where we use free, openly available components we tell you which ones and under which license, so the security reviews your own customers put you through do not find a surprise months later. Nothing we do should ever make your product harder to sell."
        },
        {
          "q": "Can you build AI features our customers will use?",
          "a": "Yes, and we put them in front of live users rather than into demos. One example is a support assistant for a fintech scale-up that still runs today. In practice it means agreeing what the feature must never do, restricting it to the information it is allowed to see, checking it against real examples before release, recording what it does once live, and keeping a way to reverse a bad change in minutes rather than in a release cycle. If your own customers are in a regulated industry, we build the written record in from the start, not after the first awkward question in a security review."
        },
        {
          "q": "How do you handle access to our code and our customers' information?",
          "a": "On the least access that lets us do the job. Named engineers only, access limited to the repositories and environments the work needs, and no real customer information in development. Where realistic material is needed for testing we use anonymized or made-up records. Access is withdrawn when the work ends. We work inside the controls you already have, including your own security review and the promises you have made to your customers, and we fill in your supplier questionnaire honestly. We do not claim certifications we do not hold, and we say plainly where a control sits with you rather than with us."
        }
      ]
    },
    "cta": {
      "h2": "Tell us where the roadmap is stuck",
      "lede": "Bring the roadmap, the module or the AI feature that keeps slipping. You leave knowing how we would approach it, and if we are not the right fit we say so on the call.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "AI",
    "seo": {
      "title": "Senior engineers for ISVs and tech companies | Infoloop",
      "description": "Senior engineers who work inside your team, or one whole module built and handed back. Your repository, your standards, AI features that hold up live."
    }
  },
  {
    "slug": "learning-platforms",
    "name": "Learning platforms",
    "eyebrow": "Learning platforms",
    "h1": "A learning platform that [[holds up on exam day]]",
    "lede": "You run the courses. We build the platform behind them: who is enrolled, which paper they sit, who passed, which certificate is still in date. We build it, test it against your busiest sitting, then stay on to keep it running.",
    "button": "Talk to our team",
    "heroTile": "lms",
    "context": {
      "h2": "Training runs on software whether you chose it or not",
      "lede": "Bookings in one sheet. Attendance in another. Certificates typed by hand. A bought platform that handles courses but not your assessment rules, and an auditor who wants the full attempt history by Friday.",
      "paragraphs": [
        "Training providers are rarely short of software. They are short of software that agrees with itself. Enrollments live in one tool, results in another and certificates in a mail merge. When an employer asks who is still in date, somebody spends an afternoon working it out.",
        "The bought platform charges per person and still cannot follow your retake rules or your certificate logic, so you export to a spreadsheet to answer a simple question. Or the platform you own was built once by someone who moved on, and now nobody wants to touch it."
      ],
      "bullets": [
        "Courses, sittings and results in one place.",
        "Certificates issued the moment somebody passes.",
        "Reports in the shape your auditor asks for."
      ],
      "close": "Infoloop builds the platform around your courses, your assessment rules and your exam calendar, starts from the learning platform we already own so you pay only for what is particular to you, and stays to keep it running."
    },
    "numbers": [
      {
        "value": "99.9%",
        "label": "uptime across the software we run for clients",
        "href": "/about"
      },
      {
        "value": "50+",
        "label": "projects delivered for clients in 6 countries",
        "href": "/work"
      },
      {
        "value": "4.8",
        "label": "average client rating across Trustpilot, Google, Clutch and GoodFirms",
        "href": "/about"
      },
      {
        "value": "4 to 8 wks",
        "label": "from a written plan to a live platform on most projects",
        "href": "/contact"
      }
    ],
    "challenges": {
      "h2": "Learning platform problems we solve",
      "lede": "We build and run platforms for the way training is really delivered, with the exam calendar in mind from day one.",
      "items": [
        {
          "title": "Training still runs on spreadsheets",
          "body": "Bookings in one sheet, attendance in another, certificates typed by hand. It works until an employer asks who is still in date or an auditor wants the full attempt history. We put courses, sittings, results and certificates in one place, with exports on demand."
        },
        {
          "title": "A bought platform you have outgrown",
          "body": "It handles courses well but not your assessment rules, certificate logic or reporting, and you pay per person for the privilege. We build the parts it will not do, join it up with your other tools, or replace it. The call decides which costs you least."
        },
        {
          "title": "Exam day is the one hour that matters",
          "body": "Traffic does not spread itself across the week. It lands in one window, often the same one for every learner. We size the platform for your biggest sitting, test against it before launch, and make sure a dropped connection does not cost anyone their paper."
        },
        {
          "title": "A platform you own that nobody maintains",
          "body": "Built once, the developer moved on, and now nothing changes because nobody wants to touch it. We take it on, write down how it works, clear the security backlog and put it under proper watch, one safe change at a time."
        }
      ],
      "tile": "lms"
    },
    "band": [
      "Ready for exam day.",
      "Kept running by us."
    ],
    "cases": {
      "h2": "Case studies",
      "lede": "Measured results from software we built and still run.",
      "items": [
        {
          "slug": "manufacturing-attendance-opsdeck",
          "label": "Attendance"
        },
        {
          "slug": "fintech-support-assistant",
          "label": "AI assistant"
        }
      ],
      "button": "Read the case study"
    },
    "outcomes": {
      "h2": "What working with Infoloop gets you",
      "lede": "For training providers that need a platform live before the next intake, and standing on the day everyone sits the paper.",
      "items": [
        {
          "title": "Live in weeks",
          "body": "Planning in about a week, then a working platform in weeks, tested against your biggest sitting first."
        },
        {
          "title": "One price, agreed first",
          "body": "What we build, what the platform we already own covers, when it lands and what it costs, in writing before we start."
        },
        {
          "title": "Certificates that check themselves",
          "body": "Issued the moment somebody passes, with expiry dates, reminders and a way for employers to verify them."
        },
        {
          "title": "Reports an auditor accepts",
          "body": "Pass rates by group, course and employer, attempt logs nobody can quietly edit, exports in the shape your awarding body asks for."
        },
        {
          "title": "Run by us afterwards",
          "body": "We watch it, fix faults within an agreed time, keep it patched, and send a written report every month."
        }
      ],
      "tile": "copilot"
    },
    "trust": {
      "h2": "Built for teams that cannot afford a bad exam day",
      "sub": "Built with tools we know well, on a learning platform we already own and run."
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Questions training providers ask us",
      "lede": "Plain answers. If yours is not here, bring it to the call.",
      "items": [
        {
          "q": "Do you build from scratch or start from something you already have?",
          "a": "Usually a mix. We already own a learning and testing platform that covers courses, groups, assessments, certificates and reporting, so most jobs start there and we build only what is particular to your organization. If you already pay for an off-the-shelf platform, we can extend it, join it up with your other tools, or replace the parts it cannot do. The first call is where we work out which of those costs you least, and the answer goes into a written price before anything is built."
        },
        {
          "q": "What happens when everybody logs in at once?",
          "a": "That is the whole test of a learning platform. Exam traffic does not spread itself across the week. It lands in one window, often the same window for every learner. We size the platform for the biggest sitting you expect, test it against that before it goes live rather than after, and keep a way to undo a release that goes wrong. Once live it sits under constant watch with alerts. Timed sittings, attempt limits and automatic saving mean a dropped connection does not cost somebody their paper."
        },
        {
          "q": "What will it cost, and how do you charge?",
          "a": "Every job starts with a call, then a written price, a date and a list, before any code is written. You are not billed by the hour against an open-ended discovery. The price depends on how much of the platform we already own fits you and how much is particular to your rules, so the call is where that gets decided. After launch, keeping it going is a separate monthly fee: somebody watching it, fixes within a promised time, security updates, improvements and a written report. Both numbers are on the table before you commit to either."
        },
        {
          "q": "What happens after launch?",
          "a": "We keep it going. That is half of what we do, and it is a paid monthly arrangement rather than a favor. It covers alerts, fixes within a promised time, security updates, and a queue of improvements that you put in order. Every month you get a written report: what changed, what broke, what we fixed and what is next. The people who built the platform are the people who maintain it, so nothing is handed to a support desk that has never seen it."
        },
        {
          "q": "Who owns the learner records, and how long are they kept?",
          "a": "You do. Learner details, attempt logs and certificate history are yours, and so is the code. We build export routes so you can pull all of it out in a usable file without asking us first. You set how long records are kept and the platform enforces it, so they last exactly as long as your awarding body, regulator or employer contracts require, and no longer. Attempt logs and marker actions are timestamped and cannot be quietly altered, which is usually what an auditor wants to see. Where you have to, we can pin which country the records sit in."
        },
        {
          "q": "Can you move our existing courses, learners and certificates across?",
          "a": "Yes, and it is a proper part of the build, not an afterthought. First we write down what you hold now: a download from your current platform, old course files, spreadsheets, or a mix of all three. Then we agree what comes over: learner records, completion history, certificates with their expiry dates, and question banks. The move is rehearsed on a copy first, so you see the result before it becomes real. Where old course material has to keep working, we support the common file formats rather than asking you to rebuild every course."
        }
      ]
    },
    "cta": {
      "h2": "Tell us about your next exam day",
      "lede": "Bring what you run today, how many learners sit assessments and when your busiest week falls. You will leave the call knowing what we would build, what we can reuse from the platform we already own, and what it costs.",
      "button": "Book a 30-minute call"
    },
    "blogCategory": "Operations",
    "seo": {
      "title": "Learning and exam platform development | Infoloop",
      "description": "Learning and exam platforms for training providers: courses, question banks, certificates and audit reports. Built to hold up on exam day, run by Infoloop."
    }
  },
];
