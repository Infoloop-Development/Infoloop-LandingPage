/**
 * Hire talent pages (/hire-<role>), 7Span's hire page format (their
 * /hire-javascript-developers): hero (tech badge, H1 with the technology
 * highlighted, sub line, paragraph, four check bullets, two buttons, side
 * panel) → thin band → why companies hire from Infoloop (bordered card grid)
 * → how you can hire from us (4 dark tiles) → <tech> expertise (table) →
 * engagement models (3 cards) → one client quote → three case cards →
 * schedule a meeting (form) → FAQs → CTA → related blogs → more roles →
 * ratings. First page: JavaScript developers, the template for the rest.
 * Copy is a plain rewrite of site/src/content/pages/hire-javascript-developers.json.
 */
import type { TechRow } from "./solutions";

export type HireDetail = {
  slug: string;
  role: string; // "JavaScript developers"
  badge: string; // "JS"
  h1: string;
  sub: string;
  lede: string;
  bullets: string[];
  buttons: { primary: string; secondary: string };
  band: [string, string];
  why: { h2: string; lede: string; items: { title: string; body: string }[] };
  how: { eyebrow: string; h2: string; lede: string; steps: { n: string; title: string; body: string }[] };
  expertise: { h2: string; rows: TechRow[] };
  models: { h2: string; lede: string; items: { title: string; tags: string[]; body: string; button: string; tone: "orange" | "ink" | "mist" }[] };
  quote: { text: string; role: string; caseSlug: string };
  cases: { slugs: string[]; button: string };
  meeting: { h2: string; lede: string };
  faq: { eyebrow: string; h2: string; lede: string; items: { q: string; a: string }[] };
  cta: { h2: string; lede: string; button: string };
  /** Six related roles that work side by side with this one (hrefs from the Hire menu). */
  more: { h2: string; roles: string[] };
  seo: { title: string; description: string };
};

export const HIRE_DETAIL: HireDetail[] = [
  {
    slug: "hire-javascript-developers",
    role: "JavaScript developers",
    badge: "JS",
    h1: "Hire [[JavaScript]] developers who fix what is stuck",
    sub: "Experienced people on your team in weeks, not months",
    lede: "JavaScript is the language almost every website runs on. If a menu opens, a form checks itself or a total updates as you type, that is JavaScript. Add one of our engineers to your team and they work in your tools, on your list of jobs, alongside your own people.",
    bullets: ["Experienced engineers, in your team in 1 to 2 weeks", "You meet every person before they start", "They work in your tools, to your rules, on your daily calls", "The job, the dates and the price in writing first"],
    buttons: { primary: "Talk to us", secondary: "See how hiring works" },
    band: ["Experienced people in weeks.", "Not months of hiring."],
    why: {
      h2: "Why companies hire developers from Infoloop",
      lede: "One engineer covering both phones, from the web skills your team already has.",
      items: [
        { title: "We build it and we keep it running", body: "Most firms finish and disappear. We offer a monthly arrangement after launch: we watch it, fix problems within an agreed time, keep it up to date and report every month." },
        { title: "We fit round you", body: "Your tools, your job list, your standards for checking work. We do not ask you to run a second process alongside your own." },
        { title: "The price is settled first", body: "The job, the dates and the cost go in writing before anything starts. No open clock, no first guess that stops holding once the work gets awkward." },
        { title: "Finished means live", body: "A job is done when it is live and behaving properly with real customers using it. Anything before that is a step on the way, and we do not bill it as the finish." },
        { title: "You know who is doing the work", body: "You deal with the person writing the code, not a manager passing messages along. Questions get answered by whoever has the job open in front of them." },
      ],
    },
    how: {
      eyebrow: "How it works",
      h2: "How you can hire from us",
      lede: "A simple process that gets the right person into your team without delays.",
      steps: [
        { n: "01", title: "A half-hour call", body: "You tell us what you have, what is stuck and who looks after it now. We tell you straight whether this is work we take on. Nothing to pay for the conversation." },
        { n: "02", title: "The price, in writing", body: "We write down the job, the dates and the cost before anybody starts. If the work has no clear finish, we price the first chunk only rather than pretending we know the rest." },
        { n: "03", title: "You meet the people", body: "You meet every engineer before they start. They join your tools, your rules and your daily catch-up; every change is checked by one of your own people before it goes live." },
        { n: "04", title: "Carry on, change it, or stop", body: "At the end you take it in-house with notes and a walkthrough, or we keep looking after it for a monthly fee. Both are normal. You pick which." },
      ],
    },
    expertise: {
      h2: "JavaScript expertise",
      rows: [
        { label: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Nuxt.js"] },
        { label: "Backend and APIs", items: ["Node.js", "NestJS"] },
        { label: "Mobile", items: ["React Native"] },
        { label: "CMS and web", items: ["Webflow", "WordPress"] },
        { label: "eCommerce", items: ["Shopify"] },
      ],
    },
    models: {
      h2: "Our engagement models",
      lede: "Three ways to work with us. All three are put in writing before anything starts.",
      items: [
        { title: "A set piece of work", tags: ["Fixed price", "End date"], body: "One clear job with a finish: join two tools together, rebuild a section, move off something old. Priced and dated in writing, then handed over or looked after.", button: "Scope the job", tone: "orange" },
        { title: "An engineer in your team", tags: ["Monthly", "1 to 2 weeks to start"], body: "An experienced developer sits with your team for an agreed number of months, in your tools, on your list. You meet them first. Month to month after that.", button: "Meet an engineer", tone: "ink" },
        { title: "Build it, then we run it", tags: ["Monthly retainer"], body: "We build the piece, put it live, and then keep it running: watching, fixing within an agreed time, small improvements and a report every month.", button: "Ask about run", tone: "mist" },
      ],
    },
    quote: { text: "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.", role: "COO, fintech scale-up", caseSlug: "fintech-support-assistant" },
    cases: { slugs: ["fintech-support-assistant", "dtc-shopify-rebuild", "brightlane-auto-group-garagezone"], button: "View case study" },
    meeting: { h2: "Schedule a meeting", lede: "Tell us what is stuck and who looks after it now. A named person replies within one business day." },
    faq: {
      eyebrow: "FAQs",
      h2: "Common questions about hiring JavaScript developers",
      lede: "Straight answers. If yours is not here, ask us on the call.",
      items: [
        { q: "What will it cost, and how does the whole thing work?", a: "It begins with a half-hour call so we understand what you have and what is stuck. Then we send you the job, the dates and the cost, all three in writing, before a single line is typed. If the work has no clear finish, we price the first chunk instead of guessing at the whole thing. Two usual shapes: a set piece of work with an end date, or an engineer with your team for an agreed number of months, plus a monthly run arrangement after launch if you want it. Nothing is charged by the hour in the background." },
        { q: "What happens once the work is live?", a: "Your choice. Take it back completely, with notes, a walkthrough with your people and everything left tidy enough for someone else to pick up. Or we keep looking after it for a monthly fee: we watch it, fix faults within an agreed time, apply security updates, make small improvements and report each month. Software nobody is watching quietly rots, and the people who wrote it are the quickest at putting it right." },
        { q: "Our site was built years ago. Will you still work on it?", a: "Usually, yes. Old JavaScript is work we take on rather than avoid. We start by reading what is there and writing down how it actually behaves. Then we make small changes you can release one at a time, so you are never waiting on a big rebuild before anything improves. If something is worth replacing rather than repairing, we tell you plainly, with the cost either way." },
        { q: "Will you work in our tools and follow our rules?", a: "Yes, that is the whole point. Our engineer works in your code, uses your naming and branch habits, and proposes changes that go through whoever normally approves them on your side. They join whatever daily or weekly catch-up you already run. Your team keeps its own standards and the final say on what goes in." },
        { q: "How soon can somebody start?", a: "Usually within 1 to 2 weeks. A tightly described job in a healthy codebase can be agreed and started quickly. Work that needs access to live tools, a security review on your side, or a decision nobody has made yet takes longer to begin, and we would rather say so than promise a date we cannot keep. On the call we tell you what has to happen before day one." },
        { q: "What if the job turns out to be bigger than we thought?", a: "We tell you the moment we know, not at the end. If part of the code is more tangled than it looked, or a requirement grows once real customer information hits it, we come back with what changed, what it does to the dates and what it would cost to do properly. You decide whether to extend, drop something else, or stop at the original line. The written agreement stays the reference point for both sides." },
      ],
    },
    cta: { h2: "Tell us what is stuck", lede: "Describe what you have, the list you cannot reach and the job that keeps slipping. We will tell you whether it is a fit, what we would need from you and what it would cost.", button: "Book a half-hour call" },
    more: { h2: "Roles that work alongside JavaScript developers", roles: ["/hire-typescript-developers", "/hire-react-developers", "/hire-nextjs-developers", "/hire-vue-developers", "/hire-nodejs-developers", "/hire-nestjs-developers"] },
    seo: { title: "Hire JavaScript developers | Infoloop", description: "Add an experienced JavaScript engineer to your team in 1 to 2 weeks. They work in your tools, to your rules, for a price agreed in writing first." },
  },
  {
    "slug": "hire-figma-designers",
    "role": "Figma designers",
    "badge": "Fig",
    "h1": "Hire [[Figma]] designers who draw what can be built",
    "sub": "Experienced designers on your team in weeks, not months",
    "lede": "Figma is the drawing tool most design teams use to plan screens before anyone builds them. Our designers turn a messy file into one tidy set of parts, with colors, type and spacing written down once and used everywhere. Add one to your team and they draw what your builders can actually build.",
    "bullets": [
      "Experienced designers, in your team in 1 to 2 weeks",
      "You meet every designer before they open your file",
      "They work in your file, to your naming, on your calls",
      "The screens, the dates and the price in writing first"
    ],
    "buttons": {
      "primary": "Talk to a designer",
      "secondary": "See how it works"
    },
    "band": [
      "Buildable files in weeks.",
      "Not a hiring round that drags."
    ],
    "why": {
      "h2": "Why companies hire designers from Infoloop",
      "lede": "Design that gets built, one clear number, and the same hands all the way through.",
      "items": [
        {
          "title": "We build the file, not just draw it",
          "body": "Most design suppliers stop when the file is finished. We take it through to the live website or product, so nothing is drawn that cannot be built and nobody argues about whose problem the gap is."
        },
        {
          "title": "Files rot, and we stop that",
          "body": "A tidy file falls apart the moment the person who made it moves on. On the monthly plan we keep the parts current as the product changes and keep what is live matching what is drawn."
        },
        {
          "title": "The same hands all the way through",
          "body": "The people who choose the colors and spacing are the ones who put them into the build. No handover meeting where the intention gets lost between two companies."
        },
        {
          "title": "Reasons written on the part itself",
          "body": "Every piece carries a note saying when to use it and what it does. A new designer or developer can open the file and get on with it without booking a briefing call with us first."
        },
        {
          "title": "A plain list, and no creeping bill",
          "body": "The list, the price and the dates are agreed before we start. Want more? We price it and you decide. Nothing slides quietly into an open-ended monthly charge you never signed up for."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "A short process that gets the right designer into your file without delays.",
      "steps": [
        {
          "n": "01",
          "title": "Half an hour on the phone",
          "body": "You show us the product, or the file as it stands. We work out what exists, what is missing and what has to be drawn first. No slide deck and no paid discovery stage before you know the price."
        },
        {
          "n": "02",
          "title": "The list, the dates, the price",
          "body": "We write down which screens, which parts and which files you get, when each lands and what it costs. You approve that before anything begins. Anything added later is priced on its own, never absorbed quietly."
        },
        {
          "n": "03",
          "title": "You are in the file from day one",
          "body": "No unveiling at the end. You are in the file immediately, we work in short bursts, and you pin comments to the exact screen they are about, so nothing gets lost in an email thread."
        },
        {
          "n": "04",
          "title": "Handed over, built, kept current",
          "body": "You get the parts and the notes, and we can build the front of the product ourselves. Afterwards the file can go on the monthly plan so it keeps matching what is actually live."
        }
      ]
    },
    "expertise": {
      "h2": "Figma expertise",
      "rows": [
        {
          "label": "Design",
          "items": [
            "Figma"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "Webflow",
            "WordPress"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js"
          ]
        },
        {
          "label": "Mobile",
          "items": [
            "Flutter",
            "React Native",
            "Swift"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. Each one goes in writing before a single screen is drawn.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: pull a file into one set of parts, draw the screens for a rebuild, or check a file for drift. Priced and dated in writing, then handed over or kept current.",
          "button": "Scope the file",
          "tone": "orange"
        },
        {
          "title": "A designer in your team",
          "tags": [
            "Monthly",
            "Starts within weeks"
          ],
          "body": "An experienced Figma designer sits with your team for an agreed number of months, in your file, on your list. You meet them first. Month to month after that.",
          "button": "Meet a designer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We draw it, build it, put it live, and then keep the file and the live product in step: new parts into the shared set, fixes within an agreed time and a report every month.",
          "button": "Ask about upkeep",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
      "role": "Founder, DTC brand",
      "caseSlug": "dtc-shopify-rebuild"
    },
    "cases": {
      "slugs": [
        "dtc-shopify-rebuild",
        "brightlane-auto-group-garagezone",
        "manufacturing-attendance-opsdeck"
      ],
      "button": "See the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Show us the product, or the file as it stands. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Figma designers",
      "lede": "Plain answers. If yours is missing, ask us on the call.",
      "items": [
        {
          "q": "What do we get at the end?",
          "a": "A Figma file somebody can build straight from. One published set of parts with all their variations. Your colors, text sizes, spacing and corner rounding recorded once, under the same names the code uses. Screens drawn at every width you support. A clickable version of the main journeys. And written notes on what happens when somebody hovers, clicks, types the wrong thing or leaves a box empty. Because we also build websites, shops and product front ends ourselves, everything is drawn against what the platform can genuinely produce, not an ideal picture that gets compromised during the build."
        },
        {
          "q": "How do you charge?",
          "a": "Half an hour on the phone first. From that we write down the list, the dates and one price, all agreed before work begins, so you approve the number in advance instead of watching an hourly clock climb. What moves the price is how many distinct screens and parts are involved, how much of your existing file can be salvaged and reused, and whether you also want us to build the thing afterwards. If the job grows part way through, we price the extra bit and you decide. Nothing is quietly absorbed and nothing is quietly billed."
        },
        {
          "q": "How long will it take?",
          "a": "We commit to dates in writing before starting, so the honest answer for your project comes out of that first call rather than a number printed on a page. What stretches a timeline is the number of separate screens, how many parts must be drawn from scratch instead of merged from what exists, how many widths you support, and how fast your comments come back. Work happens in short bursts with progress visible in the file from the first day, so you are never waiting weeks to see anything. If a date looks like slipping, we tell you the week it becomes likely, not afterwards."
        },
        {
          "q": "Can you work in our file, alongside our own designers?",
          "a": "Yes, and salvaging what exists is usually cheaper than starting again. We go through the current file first: which pieces are genuine reusable parts and which are copies that have drifted, how many nearly identical grays and text sizes are floating about, and which screens cannot be built as drawn. Then we merge everything into one published set and redraw only what is holding the rest back. Where you have your own designers we work inside your file as an extra pair of hands, agree names and structure with them before publishing anything, and leave it reading as though your own team wrote it."
        },
        {
          "q": "Do you build it as well, or only draw it?",
          "a": "Both, and that is the point of coming to us rather than a drawing-only supplier. We build websites, online shops, content setups and AI assistants that go in front of real customers. So the same people who decide the colors and spacing can put them into the finished thing, with no handover meeting where the intention gets lost and no argument about whether something is buildable at all. If you already have developers in-house we hand over to them instead, with the parts, the names and the notes written clearly enough that they never need to call us."
        },
        {
          "q": "What happens to the file after launch?",
          "a": "It does not freeze on launch day, the way most design files do. On our monthly plan we keep the file and the live product in step as things change. New parts go into the shared set rather than being drawn alone in a corner. A color change lands in both places on the same day. Old patterns you have stopped using are taken out, so nobody copies them by mistake. The same plan covers watching the live product, repairs inside an agreed time, improvements, security updates and a written monthly report. Most suppliers hand the file over and leave. We stay, and the file stays true."
        }
      ]
    },
    "cta": {
      "h2": "Want a file your builders can actually work from?",
      "lede": "Show us the product, or the file as it stands today. You get back a written list, dates and a price for tidying it up, the notes, and the build itself if you want us to do that too.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside Figma designers",
      "roles": [
        "/hire-webflow-developers",
        "/hire-shopify-developers",
        "/hire-wordpress-developers",
        "/hire-react-developers",
        "/hire-nextjs-developers",
        "/hire-flutter-developers"
      ]
    },
    "seo": {
      "title": "Hire Figma designers | Infoloop",
      "description": "Add an experienced Figma designer to your team within weeks. One tidy file your builders can work from, for a price agreed in writing first."
    }
  },
  {
    "slug": "hire-flutter-developers",
    "role": "Flutter developers",
    "badge": "Fl",
    "h1": "Hire [[Flutter]] developers who build one app for both phones",
    "sub": "One app for iPhone and Android, one named developer, in weeks",
    "lede": "Flutter is a way of building one phone app that runs on iPhone and Android from a single set of code. Instead of paying two teams for two apps that slowly drift apart, you get one named developer, working inside your own accounts, building one app that reaches both app stores.",
    "bullets": [
      "An experienced Flutter developer in your team in 1 to 2 weeks",
      "You meet the person who will write the app before they start",
      "They work in your code, your store accounts and your daily calls",
      "The screens, the dates and the price in writing first"
    ],
    "buttons": {
      "primary": "Talk to us",
      "secondary": "See how hiring works"
    },
    "band": [
      "One app, both app stores.",
      "Not two teams drifting apart."
    ],
    "why": {
      "h2": "Why companies hire Flutter developers from Infoloop",
      "lede": "One named developer, one price, and somebody still there when the phones change.",
      "items": [
        {
          "title": "The phones keep changing after you stop",
          "body": "Every year brings new iPhone and Android software, a raised minimum requirement and store rule changes that reject an app which sailed through last time. Our monthly plan absorbs that and gets the next version through."
        },
        {
          "title": "The price is settled before day one",
          "body": "What the app has to do, in what order, by when and for how much, all written down before the developer opens anything. Add a screen halfway through and it is quoted on its own for you to approve or refuse."
        },
        {
          "title": "We build inside your accounts",
          "body": "Your code, your Apple and Google store accounts, your machines. Releases go out under your company's name, so the release history, your testers and the crash figures build up somewhere you keep when we leave."
        },
        {
          "title": "You cannot recall a phone app",
          "body": "Pulling a bad phone release is nothing like pulling a bad website change. So we release to a small slice of users first, watch crashes by handset, and put switches on anything worth turning off without another submission."
        },
        {
          "title": "You meet the developer before you commit",
          "body": "The person who would write the app is on the call, not a salesperson describing them, and you are free to say no. Whoever takes it leaves their reasoning beside the code so the next person can follow it."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire a Flutter developer from us",
      "lede": "A simple process that gets the right person building your app without delays.",
      "steps": [
        {
          "n": "01",
          "title": "A half-hour call",
          "body": "Bring the screens you have in mind, the handsets your people carry and any date the app has to be live by. We ask what it will talk to, who owns the designs and whether your store accounts exist yet. Nothing to pay for the conversation."
        },
        {
          "n": "02",
          "title": "The screens and the price, in writing",
          "body": "The screens, the phone features, the order they arrive in, the date and the price, all written down before anybody starts. If what you really need is a pair of hands on your team rather than a defined app, we say so and quote monthly instead."
        },
        {
          "n": "03",
          "title": "Meet them, then a practice release",
          "body": "You meet the developer before anything is signed and you can say no. Their first job is pushing something trivial all the way through to a test build on both phones, so publishing is proven before anything important depends on it."
        },
        {
          "n": "04",
          "title": "Build, submit, then keep going",
          "body": "Work arrives in pieces your own team can check, with a written note each week on what shipped and what is stuck. Then submission, any rejection answered, and a slow release to a few users first. After that, handover or a monthly plan."
        }
      ]
    },
    "expertise": {
      "h2": "Flutter expertise",
      "rows": [
        {
          "label": "Mobile",
          "items": [
            "Flutter",
            "React Native",
            "Swift"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          "label": "Design",
          "items": [
            "Figma"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: a first release in both app stores, a feature added to an existing app, or an old Flutter app brought up to date. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the app",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "1 to 2 weeks to start"
          ],
          "body": "An experienced Flutter developer joins your team for an agreed number of months, working in your repository, your store accounts and your board. You meet them first, and the arrangement renews month by month.",
          "button": "Meet a developer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the app, get it through both store reviews, and then keep it going: watching crashes, keeping up with each new round of phone software and reporting every month.",
          "button": "Ask about run",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "manufacturing-attendance-opsdeck",
        "brightlane-auto-group-garagezone",
        "fintech-support-assistant"
      ],
      "button": "View case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what the app has to do and which phones your people carry. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Flutter developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What does a Flutter developer cost?",
          "a": "There is no rate card here, because the figure depends on how experienced the person needs to be and how much of the app they own end to end. What we promise is the shape. A half-hour call, then the work written down with a date and a price beside it, agreed before anybody starts. A developer sitting inside your team is billed per person per month. A defined build, say a first release in both app stores, is quoted as one job. Looking after it afterwards is optional and separate. Anything added later is quoted on its own and approved by you first."
        },
        {
          "q": "How soon could somebody start, and what do you need from us?",
          "a": "Usually within 1 to 2 weeks, with the date written down beside the price so it is a commitment, not a hope. What speeds things up sits on your side: access to your code and designs, notes on the software the app must talk to, one person who can settle a question the same day, and Apple and Google store accounts registered in your company's name. If those accounts do not exist yet, signing up and getting verified takes its own time before any release can reach a tester. In the first week we push a throwaway change right through, because publishing is what catches phone projects out."
        },
        {
          "q": "Is Flutter right for us, or should we build two separate apps?",
          "a": "Flutter paints every screen itself rather than borrowing the phone's own buttons and menus. The gain: your app looks the same on both handsets and stays that way when Apple or Google restyle theirs. The cost: anything Flutter does not paint, such as a home screen widget or a watch app, needs a small piece of Apple or Android code. So it suits products with their own look and a lot of shared logic, and suits badly when the app is a thin cover over the phone's own features. We say so on the call. We would rather lose the work than build the wrong thing."
        },
        {
          "q": "Will they work in our code and follow our way of doing things?",
          "a": "Yes. They commit to your code repository, follow your branching rules, take jobs off your board and wait for your approvals. Phone work adds a few things worth settling in the first week, so we settle them: which versions of the app exist, who holds the signing certificates, what goes in the release notes and who presses submit. If you keep notes on how the code is arranged, or a list of standard parts, we read those first and build to them. If none of that exists, we write down what we assumed and leave it beside the code rather than keeping it in one person's head."
        },
        {
          "q": "What happens once the app is in the stores?",
          "a": "Two routes, and you choose before submission, not after. Either your own team takes it on, with a walkthrough, the certificates, the release steps and an honest list of what we left unfinished. Or we stay on a monthly plan and keep cutting the releases. What makes phones different from a website is the wait. You cannot patch a handset the way you patch a page. A fix has to pass a store review before anyone gets it, and old versions stay installed on real phones for months. Somebody has to watch which versions people are running and keep the app buildable against the next round of phone software."
        },
        {
          "q": "Do we own the app, the store accounts and the certificates?",
          "a": "All three, and the accounts matter most. The code sits in your repository under your license from day one, plain Flutter with no wrapper of ours around it. The Apple and Google store accounts are registered in your company's name and we work inside them as invited guests, so the listing, the ratings, the reviews and your testers belong to you rather than leaving with us. The certificates that let a release be published live somewhere your own team can reach, with the recovery steps written down, because losing the Android one is painful to unpick. End the arrangement tomorrow and your next release still goes out."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what the app has to do",
      "lede": "Bring the sketch, the design file or the half-built app that will not compile, and whatever is stopping it. By the end of the call you have the work written down, a date, a price and an honest view on whether Flutter suits it.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside Flutter developers",
      "roles": [
        "/hire-react-native-developers",
        "/hire-swift-developers",
        "/hire-nodejs-developers",
        "/hire-nestjs-developers",
        "/hire-laravel-developers",
        "/hire-figma-designers"
      ]
    },
    "seo": {
      "title": "Hire Flutter developers | Infoloop",
      "description": "Add an experienced Flutter developer to your team in 1 to 2 weeks. One app for iPhone and Android, built in your accounts, price agreed in writing first."
    }
  },
  {
    "slug": "hire-laravel-developers",
    "role": "Laravel developers",
    "badge": "La",
    "h1": "Hire [[Laravel]] developers who keep your business software running",
    "sub": "Business software built and kept healthy, in your tools",
    "lede": "Laravel is the most widely used way to build business software in PHP: the application that holds your orders and customers, and the screens your staff use all day. Many developers know it, so you are never tied to one supplier. Add one of our engineers to build it or keep it healthy.",
    "bullets": [
      "An experienced Laravel engineer in your team in 1 to 2 weeks",
      "You meet every person before day one",
      "They work in your code, to your patterns, on your daily catch-up",
      "The screens, the jobs, the dates and the price in writing first"
    ],
    "buttons": {
      "primary": "Talk to an engineer",
      "secondary": "See how it works"
    },
    "band": [
      "Business software that keeps working.",
      "Long after go-live."
    ],
    "why": {
      "h2": "Why companies hire Laravel developers from Infoloop",
      "lede": "Plain Laravel, your habits, and one price agreed before anyone types.",
      "items": [
        {
          "title": "Looking after it is unglamorous work",
          "body": "Updates applied while each is still a small step rather than a leap. Failed jobs cleared instead of piling up in a table nobody opens. A slow page traced back to the one line causing it. Done by the people who wrote the application, with a report every month."
        },
        {
          "title": "Plain Laravel, nothing exotic",
          "body": "What you own is an ordinary Laravel application, laid out the ordinary way, using parts anybody can look up. Hand it to any competent Laravel developer and they are productive. Nothing in it ties you to us, and no hosting arrangement traps it either."
        },
        {
          "title": "Your habits win, not ours",
          "body": "We follow whatever pattern already exists in your application, including the ones we would not have chosen. We make the case for changing something and put a price on it, so you decide. What we never do is stage a quiet rewrite inside work you asked for."
        },
        {
          "title": "Agreed before anyone types",
          "body": "Nobody starts until the price is signed off, and that price names the screens, the jobs, the connections and the checks. No argument later about whether something was included. It was on the list or it was not."
        },
        {
          "title": "The rest of the stack, same team",
          "body": "50+ projects delivered across 6 countries, and 99.9% uptime on the software we run. A Laravel engineer here sits beside people building websites, online stores and AI assistants, so when the application needs something that is not PHP you are not hunting for another supplier."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How hiring a Laravel developer works",
      "lede": "Four steps from a first call to an application that is live and looked after.",
      "steps": [
        {
          "n": "01",
          "title": "Half an hour on a call",
          "body": "Walk us through what you have: which version of Laravel, how the application is organized, what runs overnight. That is usually enough to tell whether the framework is being followed or fought. Nothing to sit through and nothing to pay for."
        },
        {
          "n": "02",
          "title": "One list, one price",
          "body": "The work comes back as a plain list of what changes: which screens, which records, which background jobs, which connections. Every line has a length of time and a figure. Anything outside that list is priced on its own instead of quietly pushing everything else back."
        },
        {
          "n": "03",
          "title": "You see it as it is built",
          "body": "You meet the engineer first. Then work arrives throughout, never in one lump at the end, so decisions about how it is put together surface while they are still cheap to change. Want something done differently? Say so at the time and it changes there."
        },
        {
          "n": "04",
          "title": "Live, then kept healthy",
          "body": "Going live means more than pushing the new version. Background workers have to come back on their own, timed tasks have to fire, and a failed job has to wake somebody. We stay close through the first busy week, then either carry on monthly or hand you the keys."
        }
      ]
    },
    "expertise": {
      "h2": "Laravel expertise",
      "rows": [
        {
          "label": "Backend and APIs",
          "items": [
            "Laravel",
            "PHP",
            "Node.js",
            "NestJS"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "Vue.js",
            "React",
            "JavaScript",
            "TypeScript"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "WordPress",
            "Webflow"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. Each one goes in writing before anybody starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: connect the application to your accounts package, build the staff screens, move an old PHP application onto Laravel in stages. Priced and dated in writing, then handed over or looked after.",
          "button": "Price a piece of work",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "1 to 2 weeks to start"
          ],
          "body": "An experienced Laravel developer sits with your team for an agreed number of months, in your code, on your list, following the patterns already there. You meet them first. Month to month after that.",
          "button": "Add an engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the application, put it live with the background workers and timed tasks running, then keep it healthy: watching, fixing within an agreed time, updates applied in small steps and a report every month.",
          "button": "Ask about upkeep",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "manufacturing-attendance-opsdeck",
        "manufacturing-erp-predictive-maintenance",
        "brightlane-auto-group-garagezone"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us which version of Laravel you are on and what the application has to do. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Laravel developers",
      "lede": "Plain answers. Anything else, ask us on the call.",
      "items": [
        {
          "q": "What will a Laravel developer cost us?",
          "a": "Not an hourly rate. A call first, then a written list of the work with a length of time and one figure, and that figure holds. A few things move it: which version of Laravel you are on, whether the application was built the ordinary way or in a private style, whether staff screens are needed, and whether background jobs have to be set up on the server too. An application that reads like the manual is quick to extend. Tell us what the thing does and you get a range on the call, never after a paid study."
        },
        {
          "q": "What happens after it goes live?",
          "a": "Two routes. Take everything and run it yourselves: the code, the release settings, a recorded walkthrough and logins for anything we set up. Or keep us on monthly, which for a Laravel application mostly means watching the parts that fail quietly. A background worker that dies and never comes back shows no error anywhere. The queue simply stops emptying, and nobody knows until a customer asks where their invoice went. We apply updates while each is still a small step, and a monthly report records what was touched. Handing over and walking away is how an application ends up years out of date without anyone choosing that."
        },
        {
          "q": "Can they work in our team and our existing application?",
          "a": "Yes, and it is the normal arrangement. Your code, your naming, your reviewers, your task list, your morning catch-up. Laravel has strong opinions and teams differ in how closely they follow them. Some keep their rules in one place, others do everything in one file. We match whatever is already there, so the application stays consistent with itself, and we tell you plainly what the current way costs you in testing time. Changing it is work you commission on purpose, not something that turns up uninvited. If you would rather we built a piece separately and delivered it finished, that works too."
        },
        {
          "q": "Do you work with Vue, React and older Laravel versions?",
          "a": "Yes. Laravel can render its own pages or drive a Vue.js or React front end, and the choice should follow what your team can maintain, not what is fashionable this year. Older releases are fine to work in. Plenty of useful applications sit a few versions behind, where an upgrade is not the first thing worth paying for. Staff screens get whatever is less work: a ready-made admin panel for listing and editing, or a page built by hand for an odd process. We will not pretend an upgrade is free. If your version no longer receives security fixes, we price the jump and the cost of waiting. You decide."
        },
        {
          "q": "How do you keep our data and our customers safe?",
          "a": "Through the framework rather than around it. The rules about who may do what live in one place, so a permission question has one answer instead of several scattered across the application. Everything a person types is checked before it is used. Records declare which fields an outsider may set, so a stray form value cannot quietly make somebody an administrator. Searches cannot be twisted into doing something else. The parts that invite abuse get limits. Keys and passwords stay out of the code, and the framework is patched on a schedule, not when something breaks. Where personal or payment details are involved, we say during pricing what that adds."
        },
        {
          "q": "How quickly can somebody start, and what do you need from us?",
          "a": "Usually within 1 to 2 weeks of the price being signed off. What we need in return: access to your code, somewhere that is not your live application to work on, logins for the outside services it talks to, and one named person who can answer questions about how the business is meant to work. That last person matters most. The software and the people using it often disagree about what is correct, and somebody on your side has to settle it. A first week spent waiting for access is a first week lost, so decide who grants each of those before the start date."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your Laravel application has to do",
      "lede": "Send a link to the code, or simply name the version you are stuck on and why. By the end of the call you should know what we would build, in what order, and the figure attached to it, written down on the day.",
      "button": "Book a 30 minute call"
    },
    "more": {
      "h2": "Roles that work alongside Laravel developers",
      "roles": [
        "/hire-php-developers",
        "/hire-vue-developers",
        "/hire-react-developers",
        "/hire-javascript-developers",
        "/hire-nodejs-developers",
        "/hire-figma-designers"
      ]
    },
    "seo": {
      "title": "Hire Laravel developers | Infoloop",
      "description": "Add an experienced Laravel engineer to your team in 1 to 2 weeks. Business software built and kept healthy, in your tools, for a price agreed in writing."
    }
  },
  {
    "slug": "hire-nestjs-developers",
    "role": "NestJS developers",
    "badge": "Ne",
    "h1": "Hire [[NestJS]] developers who keep your back end tidy",
    "sub": "Experienced back-end engineers on your team in weeks, not months",
    "lede": "NestJS is a way of building a product's back end: the part that stores records, checks logins and answers every screen. It forces a tidy layout, so several developers can work on it at once. Add one of our engineers and they work in your tools, on your list, alongside your own team.",
    "bullets": [
      "Experienced NestJS engineers, on your team in 1 to 2 weeks",
      "You meet each person before day one",
      "They work in your tools, to your rules, in your daily catch-up",
      "The work, the dates and the price in writing before anything starts"
    ],
    "buttons": {
      "primary": "Start with a call",
      "secondary": "See how hiring works"
    },
    "band": [
      "Tidy back ends, built to last.",
      "People in weeks, not months."
    ],
    "why": {
      "h2": "Why companies hire NestJS developers from Infoloop",
      "lede": "Structure, speed and one clear number from day one.",
      "items": [
        {
          "title": "We keep watching after launch",
          "body": "Most suppliers hand over the code and disappear. Our monthly arrangement means a person is watching the alarms, fixing what breaks inside an agreed time, applying security updates and sending you a page of notes each month."
        },
        {
          "title": "No hiring round",
          "body": "Advertising a job, sifting applications and waiting out a notice period takes months. This takes a call and an agreed piece of work. If you want it to end, it ends on notice, with none of the difficulty of letting an employee go."
        },
        {
          "title": "The code stays yours",
          "body": "It lives in your own accounts from the first day. Instructions, settings and notes are written as the work happens, not thrown together at the end, so a future developer can pick it up without calling us."
        },
        {
          "title": "Built for the day something goes wrong",
          "body": "Everything is set up so that when something fails, a person is told and the previous version can go back quickly. It is the same discipline we use to put AI assistants live, and it applies just as much to an ordinary product."
        },
        {
          "title": "The same team covers the rest",
          "body": "We also build the websites and online stores that sit in front of a product like this, and the place your marketing team edits wording without a developer. If both ends need doing, the same people can take on both."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "A simple process that gets the right engineer into your team without delays.",
      "steps": [
        {
          "n": "01",
          "title": "A half-hour call",
          "body": "We look at what you have, what you are trying to reach and by when. That call settles how experienced an engineer you need, how many, and whether NestJS suits the work at all. Nothing to pay for the conversation."
        },
        {
          "n": "02",
          "title": "The work, dates and price in writing",
          "body": "You approve each of them before anybody starts. Where the work is open-ended, we price the first block, agree what finished looks like, and price the next block once that is clear. No hourly bill at month end."
        },
        {
          "n": "03",
          "title": "The engineer joins your team",
          "body": "Your tools, your task list, your morning catch-up. Work arrives in readable pieces with a plain note of what changed, and your own people approve each one, so nothing reaches customers you have not seen."
        },
        {
          "n": "04",
          "title": "Live, then kept alive",
          "body": "Handover covers the code, the settings, the step-by-step instructions and how to release. If you would rather we stayed, the monthly arrangement takes on watching it, fixing it and keeping it patched."
        }
      ]
    },
    "expertise": {
      "h2": "NestJS expertise",
      "rows": [
        {
          "label": "Backend and APIs",
          "items": [
            "NestJS",
            "Node.js"
          ]
        },
        {
          "label": "Languages",
          "items": [
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js"
          ]
        },
        {
          "label": "Mobile",
          "items": [
            "React Native",
            "Flutter"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us, each put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: build the back end for a new product, add logins and permissions, untangle an inherited NestJS codebase. Priced and dated in writing, then handed over or looked after.",
          "button": "Price a piece of work",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "An experienced NestJS developer sits with your team for an agreed number of months, in your tools, on your task list. You meet them first. Month to month after that.",
          "button": "Meet the engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the back end, put it live, then keep it running: watching the alarms, fixing within an agreed time, small improvements and a page of notes every month.",
          "button": "Ask about running it",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "cases": {
      "slugs": [
        "fintech-support-assistant",
        "brightlane-auto-group-garagezone",
        "manufacturing-erp-predictive-maintenance"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what you are building, what is stuck and the date you are working toward. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring NestJS developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "How soon could somebody actually start?",
          "a": "It begins with a short call. We cover what you have, the date you are working toward and how experienced an engineer the work needs, then come back with the work, the dates and one price. Once you agree, an engineer usually starts in weeks rather than the months a hiring round takes. We do not put a name forward unless that person is genuinely free to begin on the date written down. We would rather turn down a start date than miss one, because a missed start is what puts your own plan back."
        },
        {
          "q": "How do you charge for this?",
          "a": "One agreed piece of work, one set of dates, one price, rather than an hourly meter running in the background. After the call we write down what will be built, when each part lands and what it costs, and you approve that before anything is built. Where the work cannot be pinned down in one go, we price the first block, agree what counts as finished, and price the next once that is clear. Looking after it afterward is a separate monthly amount, so the cost of building and the cost of running never blur into one number."
        },
        {
          "q": "Do we own what the developer writes?",
          "a": "Yes, all of it. Everything the engineer writes sits in your own accounts from the first day, including the record structure, the checks, the release settings and the hosting setup. Instructions and notes are written as the work happens rather than assembled at the end, so another developer can take the project over without a briefing from us. There is no private tool of ours involved, no license to renew, and nothing you would have to keep buying from us to keep the product running."
        },
        {
          "q": "How will they work with the developers we already have?",
          "a": "The engineer joins the way your team already works rather than running a separate operation alongside it. That means your task list, your rules about how work is submitted, your morning catch-up and your approval process. Work arrives in readable pieces with a plain description of what changed, and your own people approve it, so nothing reaches your customers that you have not looked at. If nobody on your side is free to do that approving, we put a second reviewer on ours and write that into the agreement rather than leaving it unsaid."
        },
        {
          "q": "What happens when the work is finished?",
          "a": "You can take it and run it yourselves. Handover covers how to release, what every setting means, the step-by-step instructions and a walkthrough with your team. Or we keep running it for a monthly fee: watching it, fixing what breaks within an agreed time, applying security updates, making small improvements and sending a monthly note on what changed. Most problems turn up weeks after launch, once real customers use it in ways nobody predicted, which is why we plan for that period rather than treating it as somebody else's problem."
        },
        {
          "q": "Could the same person build the AI features we want?",
          "a": "Often, yes. When we put an AI assistant live, it comes with limits on what it may do, a record of every request and reply, and a switch that turns it off without a new release. A NestJS back end is a sensible place to keep one, because the assistant sits next to your existing records and rules instead of off in a separate tool nobody is watching. If the work needs a specialist alongside the engineer, we say so while pricing it rather than stretching one person across both jobs."
        }
      ]
    },
    "cta": {
      "h2": "Add a NestJS engineer without the hiring round",
      "lede": "Tell us what you have and the date you are working toward. We send back the work, the dates and a price, and if NestJS is the wrong tool for the job, you will hear that on the call.",
      "button": "Book a call"
    },
    "more": {
      "h2": "Roles that work alongside NestJS developers",
      "roles": [
        "/hire-nodejs-developers",
        "/hire-typescript-developers",
        "/hire-javascript-developers",
        "/hire-react-developers",
        "/hire-nextjs-developers",
        "/hire-vue-developers"
      ]
    },
    "seo": {
      "title": "Hire NestJS developers | Infoloop",
      "description": "Add an experienced NestJS engineer to your team in weeks, not months. A back end several developers can work on, for a price agreed in writing first."
    }
  },
  {
    "slug": "hire-nextjs-developers",
    "role": "Next.js developers",
    "badge": "Nx",
    "h1": "Hire [[Next.js]] developers so Google can find your pages",
    "sub": "Fast, findable pages from engineers who join your team in weeks",
    "lede": "Next.js is a way of building React websites where each page is made on the server before it reaches the browser. That means Google reads it as soon as it lands, and pages load fast on a phone. Add one of our engineers and they own that job inside your team, in your tools.",
    "bullets": [
      "Experienced Next.js engineers, in your team in 1 to 2 weeks",
      "You meet the person before anything is signed",
      "They work in your codebase, to your rules, through your release checks",
      "The job, the dates and the price agreed in writing first"
    ],
    "buttons": {
      "primary": "Start with a call",
      "secondary": "See the hiring steps"
    },
    "band": [
      "Senior hands in weeks.",
      "Not a quarter of hiring."
    ],
    "why": {
      "h2": "Why companies hire developers from Infoloop",
      "lede": "Senior hands, a clear price and a site Google can read.",
      "items": [
        {
          "title": "We are still here after launch",
          "body": "Most firms hand over and go. We offer a monthly arrangement instead: we watch the site, put faults right within agreed times, apply security updates, make small improvements and send a report every month."
        },
        {
          "title": "Being found is an engineering job",
          "body": "Whether Google can read a page at all is decided by how it is made, the address it sits at and the signals it sends back. Our engineer owns that, rather than leaving marketing to patch it afterwards."
        },
        {
          "title": "Built to survive being live",
          "body": "Limits, alerts and a way back come with the work. It is the same discipline we use when we put AI assistants in front of real customers, applied to a public website."
        },
        {
          "title": "Your codebase, your approval",
          "body": "We work to your branches, your standards and your release checks, and write things down as we go. Nothing about the result depends on us being free next quarter."
        },
        {
          "title": "A price before anyone starts",
          "body": "The job, the dates and the cost are agreed up front, in writing. No clock quietly running, and no research phase that slowly turns into the project itself."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "A short process that gets the right engineer into your team without a hiring round.",
      "steps": [
        {
          "n": "01",
          "title": "One call, thirty minutes",
          "body": "We go through the site, what sits around it and what the engineer would own in the first month. You leave with the job, the dates and a price, not a proposal to read later. Nothing to pay for the call."
        },
        {
          "n": "02",
          "title": "Meet the person first",
          "body": "We put forward the engineer we would actually put on it, with what they have built before. You meet them before anything is signed, and you can say no at no cost."
        },
        {
          "n": "03",
          "title": "Into your setup, small job first",
          "body": "They join your codebase, your tracker and your approval process, and take one small job to begin. Together with your team they agree how page decisions get made and where they are written down."
        },
        {
          "n": "04",
          "title": "Live, then watched",
          "body": "Work goes out through whatever release checks you already have. Once it is live you keep the engineer on your plan, take it in-house, or move to the monthly arrangement so somebody is still watching."
        }
      ]
    },
    "expertise": {
      "h2": "Next.js expertise",
      "rows": [
        {
          "label": "Frontend",
          "items": [
            "Next.js",
            "React",
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "Webflow",
            "WordPress"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. Each one is put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: move your key pages to being made on the server, fix speed and search basics, or connect your editing tool to a Next.js front. Priced and dated in writing, then handed over or looked after.",
          "button": "Price a fixed job",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Weeks to start"
          ],
          "body": "An experienced Next.js developer sits with your team for an agreed number of months, in your codebase, on your list of page, caching and speed work. You meet them first. Month to month after that.",
          "button": "Add an engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the site or section, put it live, and then keep it running: watching it, fixing faults within an agreed time, small improvements and a report every month.",
          "button": "Ask about running it",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
      "role": "Founder, DTC brand",
      "caseSlug": "dtc-shopify-rebuild"
    },
    "cases": {
      "slugs": [
        "dtc-shopify-rebuild",
        "fintech-support-assistant",
        "brightlane-auto-group-garagezone"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what the site does now and where search is letting you down. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Next.js developers",
      "lede": "Plain answers. If yours is missing, ask us on the call.",
      "items": [
        {
          "q": "What does it cost?",
          "a": "We do not publish a rate, because it depends on how senior the person is and how much they own. What we do promise is the shape. A half-hour call, then the job, the dates and the cost in writing before anybody starts. An engineer in your team is charged monthly, per person. A set piece of work is one fixed figure, with a monthly run arrangement afterwards if you want it. You leave the first call with a number, not a range that moves later."
        },
        {
          "q": "Does this really help us get found, or is that oversold?",
          "a": "It fixes one specific problem: your words are in the page before anything else has to happen. A site that builds itself in the browser asks Google to do work before it sees anything. Making the page on the server removes that step. So it fixes whether you can be found at all, and how a link looks when somebody shares it. It does not create demand, earn recommendations or make thin writing rank. Think of it as the floor. Above the floor, the words still have to do their own job."
        },
        {
          "q": "Can they work in what we already have?",
          "a": "Yes, that is the normal arrangement. They join your codebase, your branches, your tracker and your approval process, and release through whatever checks you already run. We start with one small job so the settling-in is visible rather than assumed. Everything is written down as we go: how each page is made, what is kept as a copy and any logic that affects being found lives with the code, not in one person's head. If you later bring the work in-house, your team picks it up without needing us on a call."
        },
        {
          "q": "What happens after we go live?",
          "a": "You choose. Keep the engineer on your plan, take it fully in-house with the handover note, or move to the monthly arrangement. That covers watching the site, faults put right within agreed times, security updates, small improvements and a report each month on what changed and what difference it made. Most trouble here shows up after launch, not before: an old copy of a page still showing last month's price, or a deleted page still telling Google it is fine. Somebody should be looking for that."
        },
        {
          "q": "Do we own the code?",
          "a": "Yes. Everything the engineer writes is yours, in your own codebase, under your license, from day one. There is no wrapper of ours around it, no hosting you can only get through us, and no part of the build held back to keep you tied to us. Settings, passwords and the steps to put it live are handed over with the code. If the arrangement ends, nothing about your website depends on Infoloop still being around."
        },
        {
          "q": "Should we move to the newer way of building pages?",
          "a": "If you are starting from nothing, yes, because that is where the current thinking lives and where new work is going. If you already have a site running happily on the older approach, rebuilding it is rarely the right first move. We normally keep what you have, fix the problems where they really are, and move one section at a time only where there is a reason to. A rebuild that takes three months and changes nothing a visitor or Google would notice is not an improvement, and we will say so."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your Next.js site needs to do",
      "lede": "Thirty minutes to go through the site, what sits around it and what is going wrong in search. You leave with the job, the dates and the cost, and you meet the engineer before anything starts.",
      "button": "Book your half hour"
    },
    "more": {
      "h2": "Roles that work alongside Next.js developers",
      "roles": [
        "/hire-react-developers",
        "/hire-typescript-developers",
        "/hire-javascript-developers",
        "/hire-nodejs-developers",
        "/hire-nestjs-developers",
        "/hire-webflow-developers"
      ]
    },
    "seo": {
      "title": "Hire Next.js developers | Infoloop",
      "description": "Add an experienced Next.js engineer to your team in weeks. Pages Google can read, built in your tools, for a price agreed in writing first."
    }
  },
  {
    "slug": "hire-nodejs-developers",
    "role": "Node.js developers",
    "badge": "Node",
    "h1": "Hire [[Node.js]] developers for the part customers never see",
    "sub": "Engineers who build behind the screen and stay after launch",
    "lede": "Node.js is the software that runs behind your app or website. It checks logins, saves orders, sends the emails and talks to the other tools you pay for. Customers never see it, but nothing works without it. Add one of our engineers and they build that part in your tools, alongside your own people.",
    "bullets": [
      "Node.js engineers in your team in 1 to 2 weeks",
      "You meet each engineer before day one",
      "Your code, your task list, your review habits, your catch-ups",
      "The work, the dates and the cost written down first"
    ],
    "buttons": {
      "primary": "Start the conversation",
      "secondary": "See how it works"
    },
    "band": [
      "Built to keep working.",
      "Long after launch day."
    ],
    "why": {
      "h2": "Why companies hire Node.js developers from Infoloop",
      "lede": "Senior people, a written price and nobody disappearing at launch.",
      "items": [
        {
          "title": "We do not vanish at launch",
          "body": "Most suppliers finish the build and go. We offer to stay on for a monthly fee and keep it healthy, so the people who wrote it are the ones fixing it, within a time we agree with you."
        },
        {
          "title": "The price is agreed first",
          "body": "The work, the dates and the cost are in writing before day one. Ask for something extra later and we price that on its own, so the bill never creeps upwards while you are not looking."
        },
        {
          "title": "Built for the day after launch",
          "body": "Anyone can make software work on their own laptop. We build it to keep working when real customers arrive: alerts that reach a person when something goes wrong, and a way to undo a bad release in minutes."
        },
        {
          "title": "Everything is in your name",
          "body": "Your code, your hosting accounts, your passwords, from the first day. Nothing sits on an account of ours. If you ever want to leave, that is a decision you make, not a rescue you have to organize."
        },
        {
          "title": "You talk to the person doing the work",
          "body": "No account manager carrying messages back and forth, and no list of names on a contract you have never spoken to. You know who is writing your software, and you can reach them directly."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "Four plain steps from first call to an engineer working in your code.",
      "steps": [
        {
          "n": "01",
          "title": "We start with a call",
          "body": "Tell us what your app does, who works on it and what is stuck. We tell you whether Node.js developers are the right answer, and whether we are the right people. No slides, no charge, no obligation."
        },
        {
          "n": "02",
          "title": "A written price before anything starts",
          "body": "You get the work, the dates and the cost on one page. If part of it cannot be sized yet, we say so and put a check-in at that point rather than inventing a number."
        },
        {
          "n": "03",
          "title": "We work the way your team works",
          "body": "Our engineers use your code, your task list and your review process. Work goes in as small pieces your own people can read and approve. You see progress every week, not once at the end."
        },
        {
          "n": "04",
          "title": "Then you choose what happens next",
          "body": "Everything goes live with instructions written down and every account in your name. From there, take it in-house, or keep us on to look after it for a monthly fee. Both are fine, and you decide."
        }
      ]
    },
    "expertise": {
      "h2": "Node.js expertise",
      "rows": [
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS",
            "TypeScript"
          ]
        },
        {
          "label": "Frontend it serves",
          "items": [
            "JavaScript",
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js"
          ]
        },
        {
          "label": "Mobile front ends it serves",
          "items": [
            "React Native",
            "Flutter"
          ]
        },
        {
          "label": "eCommerce it connects to",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job behind the screen with a finish: connect your app to your accounts package, move slow jobs into the background, bring old Node.js code onto a current version. Priced and dated in writing, then handed over or looked after.",
          "button": "Price a fixed job",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "A senior Node.js engineer joins you for an agreed number of months, writing in your code, picking work off your task list and turning up to your catch-ups. You meet them before they start, and it runs month to month from there.",
          "button": "Add an engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the part behind your app, put it live, and stay on afterwards. Alerts reach a named person, faults are fixed within an agreed time, security updates go on as they land, and a report tells you what changed.",
          "button": "Ask about support",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "fintech-support-assistant",
        "manufacturing-erp-predictive-maintenance",
        "manufacturing-attendance-opsdeck"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what your app does and what is stuck behind the screen. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Node.js developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What is this going to cost?",
          "a": "We charge for the job, not by the hour. After a first call we write down the work, the dates and one price, and you agree it before anything starts. The number depends on how many engineers you need, for how long, and how much of your existing code they must learn first. Two shapes are common: a fixed price for a job with a clear end, or a monthly amount for engineers in your team for an agreed number of months. Ask for something extra part-way through and we price that change in writing. The call and the written price cost you nothing."
        },
        {
          "q": "Can your people work in the software we already have?",
          "a": "Yes, and that is the usual arrangement. Our engineers work in your code, follow the way your team already does things and join whatever meetings you run. We do not take a copy away and hand back a finished lump at the end. The first week is normally spent reading, getting the software running on their own machine and working out how the pieces connect. We tell you what we found before we change anything that matters. If the way your team works has never been written down, we write it down as we learn it and leave that with you."
        },
        {
          "q": "What happens once it is live?",
          "a": "You choose. Everything is handed over with instructions, a way to undo a bad release and every account already in your name, so your own people can take it on cleanly. Or we stay on for a monthly fee and keep it healthy: we watch it, fix what breaks within an agreed time, apply security updates, make small improvements and send a short report each month on what changed. Software drifts. Other companies change their tools without warning and busy periods find weak spots. The people who wrote it are the fastest at putting it right."
        },
        {
          "q": "Which tools would you actually use?",
          "a": "Node.js itself, with TypeScript by default unless your existing code says otherwise, and NestJS when the job wants more structure than a plain Node.js service gives you. On the front, our engineers are comfortable next to React, Next.js, Vue.js and Nuxt.js, so the part customers see and the part behind it are built by people who talk to each other. Where your records live, how background jobs run and where it is hosted follow what you already have. If you are on something we have not named, say so on the call and we tell you honestly whether we can pick it up quickly."
        },
        {
          "q": "How soon can somebody start, and can we change the number of people?",
          "a": "Weeks, not months. Start dates depend on what our engineers are already committed to, and we give you a real date on the call rather than a hopeful one. It is faster when your setup instructions exist, and slower on a large body of code nobody has written anything down about. Team size can change between stages. We agree the shape at each point, so you can add a second engineer when a deadline needs two people side by side, then drop back to one for quieter periods. You are not tied to a fixed number of people for the whole time."
        },
        {
          "q": "Who owns the work, and what if we want to stop?",
          "a": "You own all of it. The code, the hosting accounts, the domain name, the passwords and the release process sit under your company from day one, not ours. We work inside your accounts rather than keeping anything on ours, so there is nothing to move or hand back if you stop. Monthly support runs month to month with notice. Project work stops at the end of an agreed stage. If you leave, you leave with working software, current instructions and no need to call us to put a change live. We would rather you stayed because the work is good than because leaving is hard."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your app needs behind the scenes",
      "lede": "Tell us what you have and what is stuck, and we tell you whether Node.js developers are the right answer. If they are, you get the work, the dates and the price in writing before anyone starts.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside Node.js developers",
      "roles": [
        "/hire-nestjs-developers",
        "/hire-typescript-developers",
        "/hire-javascript-developers",
        "/hire-react-developers",
        "/hire-nextjs-developers",
        "/hire-vue-developers"
      ]
    },
    "seo": {
      "title": "Hire Node.js developers | Infoloop",
      "description": "Node.js engineers who build the part behind your app and stay on afterwards. In your code, on your task list, for a price agreed in writing before day one."
    }
  },
  {
    "slug": "hire-nuxt-developers",
    "role": "Nuxt.js developers",
    "badge": "Nu",
    "h1": "Hire [[Nuxt.js]] developers who stay on after launch",
    "sub": "Fast, findable Vue sites, with somebody still there afterwards",
    "lede": "Nuxt.js is a toolkit for building websites and apps with Vue.js. It makes each page on the server so it arrives complete, loads fast and search engines can read it without extra work. Add one of our Nuxt engineers to your team and they work in your tools, on your list, alongside your people.",
    "bullets": [
      "Experienced Nuxt engineers, in your team in 1 to 2 weeks",
      "You meet every person before day one",
      "Your tools, your rules, your daily catch-up",
      "The job, the dates and the price agreed in writing first"
    ],
    "buttons": {
      "primary": "Talk to us",
      "secondary": "See how it works"
    },
    "band": [
      "Pages that arrive complete.",
      "A report every month, not a goodbye."
    ],
    "why": {
      "h2": "Why companies hire Nuxt developers from Infoloop",
      "lede": "Fast pages, one clear number and somebody still there afterwards.",
      "items": [
        {
          "title": "Running it is not an afterthought",
          "body": "The monthly arrangement after launch is not tacked on at the end to lift the bill. We watch the site, fix faults within an agreed time, apply updates, make small improvements and send a report every month. We build. We run."
        },
        {
          "title": "The cost comes before the work",
          "body": "You approve the job, the dates and the figure before anything begins. If what you want changes, we quote again in writing. Nothing ticks away while you think it over."
        },
        {
          "title": "Engineers, not middlemen",
          "body": "You speak to the person writing the code. Questions get answered by somebody with the work open in front of them, not passed to a manager and answered a day later."
        },
        {
          "title": "Built for real use, not for a demo",
          "body": "Limits, alerts, logs and a way to undo a release come as standard. That habit comes from putting AI assistants in front of real customers, and it suits a website just as well."
        },
        {
          "title": "One team for the whole thing",
          "body": "Screens, the editing tool, the small server behind the pages and getting it live all sit with the same people. There is no cliff between who built it and who keeps it running."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "Four plain steps from first call to an engineer on your board.",
      "steps": [
        {
          "n": "01",
          "title": "Talk to an engineer",
          "body": "You describe what exists, what sits around it and what you want the person to own. We say plainly whether it is work we can do well. No form, no salesperson first, nothing to pay for the call."
        },
        {
          "n": "02",
          "title": "A written price, not a rate",
          "body": "You get what gets built, in what order, by when and for how much, all in writing. One figure, not a rate with an open end. Nobody writes code until you have read it and said yes."
        },
        {
          "n": "03",
          "title": "On your board from week one",
          "body": "The engineer joins your daily catch-up, your board and your codebase. Work arrives as changes your own people approve, so you follow it in the same place you follow everything else."
        },
        {
          "n": "04",
          "title": "Somebody still there afterwards",
          "body": "Take it in-house with notes and a walkthrough, or keep us on: watching, fixing within agreed times, updates, small improvements and a monthly report. Both are normal. You pick."
        }
      ]
    },
    "expertise": {
      "h2": "Nuxt.js expertise",
      "rows": [
        {
          "label": "Frontend",
          "items": [
            "Nuxt.js",
            "Vue.js",
            "JavaScript",
            "TypeScript"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "Webflow",
            "WordPress"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: a new Nuxt site, a half-built project to complete, or a move off an older Nuxt version. Priced and dated in writing, then handed over or looked after.",
          "button": "Price a set job",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "An experienced Nuxt engineer sits with your team for an agreed number of months, in your tools, on your board. You meet them first. Month to month after that.",
          "button": "Meet a Nuxt engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the site, put it live on hosting you control, then keep it running: watching, fixing within an agreed time, small improvements and a report every month.",
          "button": "Ask about the run plan",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "dtc-shopify-rebuild",
        "fintech-support-assistant",
        "manufacturing-attendance-opsdeck"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what exists, what is half built and who looks after it now. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Nuxt.js developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What would a Nuxt developer actually do day to day?",
          "a": "They work as part of your team. A typical week is building pages, shared layouts and reusable pieces in a current Nuxt project, plus the small server behind it and the wiring to your editing tool or an internal tool. They decide how each page is served and chase the odd fault that comes from a page being built twice, once on the server and again in the browser. They join your catch-ups, take jobs from your board and put changes forward for your people to approve. If you would rather hand over one self-contained piece and take it back finished, we price it that way instead."
        },
        {
          "q": "How quickly can somebody start?",
          "a": "Faster than a hiring round, because the slow parts of a hiring round are not in it. After the first call you get the job, the dates and the figure in writing, and the start date is one of the things written down. What sets that day is who is free, how big the piece of work is and how long your own access approvals take. There is no advertising, no shortlist, no notice period and no agency fee. If we cannot staff your work in a sensible time we say so on the call rather than hold the slot."
        },
        {
          "q": "What does it cost?",
          "a": "We quote one fixed figure for one agreed job rather than publishing a daily rate, because the number depends on what the engineer is being asked to own. After the first call you get it in writing: what gets built, in what order, by when and the price. You approve that before any code is written. If what you want changes partway through, we quote again in writing rather than letting hours quietly stack up. Anything ongoing once the site is live is a separate monthly fee, sized to what we are looking after."
        },
        {
          "q": "Will you work in our setup and follow our rules?",
          "a": "Yes. By default we work inside your codebase, your automatic checks, your branches and your approval process. Your team approves everything, so nothing lands that your engineers have not seen. We follow your formatting rules, your naming habits and your commit style rather than bringing our own. If you have no rules written down yet, we propose a set at the start, write them down and stick to them, so the project stays consistent long after we have left."
        },
        {
          "q": "Can you move an old Nuxt 2 site to the current version?",
          "a": "Yes, and we treat it as a mapped piece of work rather than a rebuild. We take stock first: which add-ons have no equivalent any more, where the way you store information has to change, which pieces rely on the old style of writing and which pages will misbehave once they are built on the server. You get a page by page plan with the risky areas named up front, so the site keeps earning while the move happens. We would rather tell you a move is not worth making than begin one that stalls half way."
        },
        {
          "q": "What happens once the site is live?",
          "a": "You can take the code and run it yourself. It is your project, and the handover includes the notes, the settings for putting it live and the automatic checks. Or you can leave it with us. The monthly arrangement covers watching it, fixing within agreed times, applying updates, small improvements and a monthly report on uptime, page speed and what we did. The point is that the people who built the site are the ones keeping it alive, so there is no cold handover to a support desk that has never seen it."
        }
      ]
    },
    "cta": {
      "h2": "Add a Nuxt developer to your team",
      "lede": "Describe what exists and what you need built. You get the job, the dates and the figure in writing before anything begins, and an honest answer if it is not work for us.",
      "button": "Book a call"
    },
    "more": {
      "h2": "Roles that work alongside Nuxt.js developers",
      "roles": [
        "/hire-vue-developers",
        "/hire-javascript-developers",
        "/hire-typescript-developers",
        "/hire-nextjs-developers",
        "/hire-nodejs-developers",
        "/hire-nestjs-developers"
      ]
    },
    "seo": {
      "title": "Hire Nuxt.js developers | Infoloop",
      "description": "Add an experienced Nuxt.js engineer to your team in weeks, not months. Fast, findable Vue sites, built in your tools for a price agreed in writing first."
    }
  },
  {
    "slug": "hire-php-developers",
    "role": "PHP developers",
    "badge": "PHP",
    "h1": "Hire [[PHP]] developers for the code nobody dares touch",
    "sub": "PHP people who read old code before they change it",
    "lede": "PHP is the language behind a large share of the web, from WordPress sites to the order screens and invoicing tools businesses have run for years. Often nobody who built it is still around. Our engineers join your team, read what is there, write down how it works and make the next change safe.",
    "bullets": [
      "Experienced PHP engineers, in your team in 1 to 2 weeks",
      "You meet every person before day one",
      "They work in your code, your tools and your review process",
      "The job, the dates and the price agreed in writing first"
    ],
    "buttons": {
      "primary": "Talk to us",
      "secondary": "See how hiring works"
    },
    "band": [
      "Old code read properly.",
      "Then changed safely."
    ],
    "why": {
      "h2": "Why companies hire PHP developers from Infoloop",
      "lede": "Senior people, plain prices and no quiet rewrites.",
      "items": [
        {
          "title": "We stay with code we did not write",
          "body": "For a monthly fee we keep watching it, fix what breaks within an agreed time, apply security updates and send a report every month. Doing that on somebody else's undocumented code is the harder version of the offer. It is the one we make."
        },
        {
          "title": "Nothing we leave behind needs us",
          "body": "We do not bolt a tool of our own on top of what you inherited. What stays is ordinary PHP and parts anyone can look up, with settings your own developers can read on their first morning."
        },
        {
          "title": "Written for whoever comes next",
          "body": "The test that matters is whether one of your own people can make the following change without calling us. So the maps, the named traps and the reasoning are handed over, and we walk through the work with the person who will keep it."
        },
        {
          "title": "Priced after reading, not before",
          "body": "No open-ended hourly arrangement on code whose true size nobody knows yet. The block of work has a stated edge and a stated cost, and when something we open changes that, you hear about it that day, not on the invoice."
        },
        {
          "title": "Not only PHP",
          "body": "We have delivered 50+ projects across 6 countries and hold 99.9% uptime on the software we run. Inherited PHP almost always has a website, a shop or a reporting layer hanging off it, and those sit with colleagues at the same desk, not a second supplier."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "A simple process that gets the right person into old code without breaking it.",
      "steps": [
        {
          "n": "01",
          "title": "Half an hour on a call",
          "body": "Show us the code, or just describe it if nobody can open it. We want to know who built it, who has left, what breaks most often and which corner everybody avoids. You finish knowing what we would read first and what we would leave alone."
        },
        {
          "n": "02",
          "title": "Priced on what can be seen",
          "body": "Pricing code nobody has read is guessing, so we price against what is visible from outside: the ways in, the parts it depends on, its age and spread. The agreement names the areas that could move the number. Anything that does is repriced in front of you."
        },
        {
          "n": "03",
          "title": "Small changes, one at a time",
          "body": "Changes arrive in small pieces, each with a note saying which existing behavior it keeps on purpose. Your developers see each one as it lands and can stop a direction after one step rather than at the end."
        },
        {
          "n": "04",
          "title": "Released in pieces, then handed on",
          "body": "New versions go out in parts, each watched against the exact screens it touched. At the end you get the map of the application and a recorded walkthrough for whoever inherits it after you. If the last handover never happened, this one does."
        }
      ]
    },
    "expertise": {
      "h2": "PHP expertise",
      "rows": [
        {
          "label": "Backend and APIs",
          "items": [
            "PHP",
            "Laravel"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "WordPress",
            "Webflow"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "JavaScript",
            "TypeScript",
            "Vue.js",
            "React"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: pin down what an old PHP application does, add a payment or courier connection, speed up the slow pages. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the job",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "An experienced PHP developer sits with your team for an agreed number of months, in your code, in your review process, on your list. You meet them first. Month to month after that.",
          "button": "Meet an engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We make the change, put it live and then keep the whole thing running: watching, fixing within an agreed time, security updates, small improvements and a report every month.",
          "button": "Ask about run",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "manufacturing-erp-predictive-maintenance",
        "manufacturing-attendance-opsdeck",
        "brightlane-auto-group-garagezone"
      ],
      "button": "View case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what the code does and who used to look after it. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring PHP developers",
      "lede": "Plain answers. If yours is missing, ask us on the call.",
      "items": [
        {
          "q": "What does this cost?",
          "a": "There is no hourly rate. We agree a written piece of work with dates and a single price, and that price holds. What moves the figure is how readable the code turns out to be: how many separate ways in it has, whether the outside parts it relies on were installed properly or copied in by hand, how many of your business rules are hidden in the page designs, and how much of it anyone still with you can explain. Tidy code with an owner is a small number. Describe what it does and where it came from and you get a range on the call itself."
        },
        {
          "q": "What happens once the work is done?",
          "a": "That is your decision. Take everything and run it yourself, and you leave with the map, the recorded walkthrough and access to every account we opened. Or keep us on for a monthly fee: we watch it, fix what breaks within an agreed time, apply security updates, do further work as you want it and send a written report each month. We offer the second option for a reason. Code that gets attention for a while and then none slides straight back to being the thing nobody will touch, and the notes go stale beside it."
        },
        {
          "q": "Can they work in our team and our code?",
          "a": "Yes, that is how it is set up to run. We take access to your code and work in small pieces through whatever review your team already does, in your task list and your catch-ups. On inherited code we deliberately match what is already there: the naming, the layout, the way errors are handled. Where a pattern is costing you money, we say so, put a price on changing it and wait for your decision. Nothing gets rewritten quietly because we preferred it another way. If you would rather we worked at arm's length and handed over at the end, that works too."
        },
        {
          "q": "Which versions and frameworks do you work with?",
          "a": "Current supported PHP, Laravel where it is in play, and WordPress. Just as important for this page: plain PHP with no framework at all, and homemade frameworks with no name and no manual, which is what a great many long-lived business applications genuinely run on. If yours is on a version that no longer receives security fixes, we tell you what that means for everything else on the list, because it changes the cost of each other item. And if PHP is honestly not where this thing should live any more, you hear that on the first call rather than after we have taken the work."
        },
        {
          "q": "The people who built this have gone. Where do you start?",
          "a": "By reading it and writing down what we read. We pick the routes that carry the most business, checkout, invoicing or dispatch, and follow each one end to end: the way in, the pieces it pulls in, the records it writes, the email or file it produces on the way out. That trace becomes a document you keep. Only then do we put checks around the behavior as it stands today, including the parts that look wrong, because the first job is being able to tell whether a change altered anything at all. Editing code nobody understands is how a small fix becomes a day of downtime."
        },
        {
          "q": "How quickly can somebody start, and what do you need from us?",
          "a": "Usually within a couple of weeks once the price is signed off. What we need first is access: the code, a copy of the records with realistic information in them, somewhere that is not your live setup to run it, and logins for the outside services it calls. After that, one person who can answer \"is it supposed to do that?\" when we find something odd, which in code this old comes up early and often. If nobody left in the business can answer that, tell us at the start. It does not stop the work, but it changes how we plan it."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what the application has to do",
      "lede": "Send the code, or simply describe what it does and who used to look after it. You will hear what we would read first, what we would fix, what we would leave well alone, and what that block of work costs. On the call, not in a document next week.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside PHP developers",
      "roles": [
        "/hire-laravel-developers",
        "/hire-wordpress-developers",
        "/hire-javascript-developers",
        "/hire-vue-developers",
        "/hire-nodejs-developers",
        "/hire-shopify-developers"
      ]
    },
    "seo": {
      "title": "Hire PHP developers | Infoloop",
      "description": "Add an experienced PHP developer who reads inherited code before changing it. They work in your tools and review process, at a price agreed in writing."
    }
  },
  {
    "slug": "hire-react-developers",
    "role": "React developers",
    "badge": "Re",
    "h1": "Hire [[React]] developers who get your list moving",
    "sub": "One named React engineer, in your product, within weeks",
    "lede": "React is the most widely used tool for building the screens people click on. It keeps the screen in step with the information behind it, so a total or a stock figure updates without the page reloading. Add one of our engineers to your team and they pick up jobs from your own list.",
    "bullets": [
      "Experienced React engineers, on your team in 1 to 2 weeks",
      "You meet every engineer before day one",
      "Your codebase, your tracker, your approval rules, your daily catch-up",
      "What gets built, by when and for how much, in writing first"
    ],
    "buttons": {
      "primary": "Book a call",
      "secondary": "See how hiring works"
    },
    "band": [
      "A React engineer in weeks.",
      "No hiring round needed."
    ],
    "why": {
      "h2": "Why companies hire React developers from Infoloop",
      "lede": "Speed, seniority and a figure you can hold us to.",
      "items": [
        {
          "title": "We stay on after launch",
          "body": "Most firms hand over and go. Our monthly arrangement keeps the product watched, faults put right within agreed times, everything patched and steadily improved, with a report each month."
        },
        {
          "title": "A figure before the work",
          "body": "You get the job, the dates and the cost out of the very first call, not a clock that only makes sense afterwards. If what you want changes, we price it again in writing before it is built."
        },
        {
          "title": "We fit your way of working",
          "body": "Your codebase, your branches, your job tracker and your approval rules. Nothing gets built off to one side and dropped on you as a surprise at the end."
        },
        {
          "title": "The knowledge stays with you",
          "body": "Decisions, trade-offs and setup steps are written down next to the code as we go. If we stopped tomorrow, your team could carry on without booking a call with us first."
        },
        {
          "title": "One named person",
          "body": "You know who is doing the work and you meet them first. Nobody is swapped out quietly halfway through, and if the match is wrong, say so and we will change it."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire a React developer from us",
      "lede": "Four steps from the first call to work landing in your product.",
      "steps": [
        {
          "n": "01",
          "title": "Half an hour on the phone",
          "body": "You tell us what the product is, what needs building and who signs it off. We ask how you release and what the deadline is. No presentation to sit through, and nothing to pay for the conversation."
        },
        {
          "n": "02",
          "title": "What you get, and what it costs",
          "body": "We write down what will be delivered, in what order, by when and for how much. Where the work has no natural end, we say so and suggest a monthly seat instead of pretending a fixed figure is honest."
        },
        {
          "n": "03",
          "title": "Access, then something small",
          "body": "Getting set up, reading the product, then releasing one small change early. Both sides get to see how approval and release truly work before anything large is under way."
        },
        {
          "n": "04",
          "title": "Deliver, then decide",
          "body": "Work lands at whatever rhythm your team already keeps, and every change is checked by one of your own people first. Once it is live you can stop there with a documented handover, or keep us on monthly."
        }
      ]
    },
    "expertise": {
      "h2": "React expertise",
      "rows": [
        {
          "label": "Frontend",
          "items": [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS"
          ]
        },
        {
          "label": "Mobile",
          "items": [
            "React Native"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "Webflow",
            "WordPress"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. Each one goes in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: a new set of screens, a rebuild of one section, or bringing an old React version up to date. Priced and dated in writing, then handed over or looked after.",
          "button": "Price a piece of work",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "1 to 2 weeks to start"
          ],
          "body": "A React engineer sits with your team for an agreed number of months, in your codebase, taking jobs from your tracker. You meet them first. Month to month after that.",
          "button": "Meet a React engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the screens, put them live, and then keep them running: watching, fixing within an agreed time, small improvements and a report every month.",
          "button": "Ask about the run plan",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "cases": {
      "slugs": [
        "fintech-support-assistant",
        "brightlane-auto-group-garagezone",
        "manufacturing-attendance-opsdeck"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what the product is and what is piling up on the screens. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring React developers",
      "lede": "Plain answers. If yours is missing, ask us on the call.",
      "items": [
        {
          "q": "What does it cost, and how does the whole thing work?",
          "a": "It starts with a half-hour call. From that we write down what will be delivered, in what order, by when and for how much, so you know the figure before anything begins. Where the work has no natural end, such as building features alongside your own team for months, we price it as a monthly seat per engineer instead of pretending a fixed quote is honest. Anything you add later is priced again in writing before it is built, never slipped onto an invoice at the end. There is no rate card here, because a rate on its own tells you nothing useful about what a job costs."
        },
        {
          "q": "How soon can somebody start, and what do you need from us?",
          "a": "Usually within 1 to 2 weeks. We agree the start date on the first call and put it in writing next to everything else, so you are not waiting on a vague promise. What speeds it up is mostly on your side: access to the code, setup notes that actually work, one person who can answer questions, and a small first job to run through your approval and release process. When an engineer joins an existing team, we like to release something small in the first few days, so both sides see how it all works in practice before anything large is under way."
        },
        {
          "q": "Will they work in our codebase and follow our rules?",
          "a": "Yes, and it is the default rather than something you have to ask for. The engineer works in your code, your branches, your job tracker and your automatic checks, and follows your approval rules, including who signs off what. We do not build off to one side and hand you a zip file at the end. If you have written standards, a set of building blocks or past decisions recorded somewhere, we read them first and build to them. If none of that is written down, we write down what we assumed and leave it with the code for whoever comes next."
        },
        {
          "q": "What happens once it is live?",
          "a": "You choose. One option is a documented handover: the code, the decisions, the setup steps and anything still outstanding, written down so your own engineers can carry on without us. The other is the monthly arrangement, where we keep it alive: watching, faults put right within agreed times, security updates, small improvements and a report each month showing what happened and what changed. Much of the reason we exist is that handing over and vanishing is how perfectly good software quietly rots over a year or two."
        },
        {
          "q": "Do we own the code?",
          "a": "Yes, entirely. Everything written for you is yours, in your own codebase, from the first day rather than at the end of the project. There is no license back to us, no shared library you have to keep paying for, and no part of the product only we can put live. Notes go into the code as the work goes, so the knowledge does not walk out of the door when the engagement finishes. You can bring the work in-house whenever you like, and we will help with the handover rather than make it awkward."
        },
        {
          "q": "Can the same person work on the back end or our content as well?",
          "a": "Often, yes, and it is worth being clear where the line sits. Alongside React we take on server work in Node.js and NestJS, databases, and the place your marketing team edits words and images, so one engineer can follow a feature from the information all the way through to the screen. For deeper specialist work, such as an AI assistant that needs limits and monitoring, or an online shop, we bring in the right person rather than stretch one thin. Tell us the whole picture on the call and we will say what we would and would not staff."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your React app needs",
      "lede": "Bring the product, the plan and whatever is blocking it. You will leave the call knowing what will be delivered, by when and for how much, and whether we are the right people for the job.",
      "button": "Start with a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside React developers",
      "roles": [
        "/hire-javascript-developers",
        "/hire-typescript-developers",
        "/hire-nextjs-developers",
        "/hire-nodejs-developers",
        "/hire-react-native-developers",
        "/hire-figma-designers"
      ]
    },
    "seo": {
      "title": "Hire React developers | Infoloop",
      "description": "Add an experienced React engineer to your team in 1 to 2 weeks. They work in your codebase, to your rules, for a price agreed in writing first."
    }
  },
  {
    "slug": "hire-react-native-developers",
    "role": "React Native developers",
    "badge": "RN",
    "h1": "Hire [[React Native]] developers for iPhone and Android apps",
    "sub": "One developer in your team in weeks, one app for both phones",
    "lede": "React Native builds a phone app for iPhone and Android from one set of code, using much the same skills a website team already has. If you have a web product and no mobile team, that matters. Add one of our engineers and they build the app in your tools, alongside your own people.",
    "bullets": [
      "Experienced mobile engineers, in your team in 1 to 2 weeks",
      "You meet every developer before day one",
      "They work in your tools, to your rules, in your daily catch-up",
      "The app, the dates and the price in writing first"
    ],
    "buttons": {
      "primary": "Talk to us",
      "secondary": "See how hiring works"
    },
    "band": [
      "One app for iPhone and Android.",
      "One developer, not two teams."
    ],
    "why": {
      "h2": "Why companies hire React Native developers from Infoloop",
      "lede": "Speed, seniority and one clear number from day one.",
      "items": [
        {
          "title": "Most phone trouble starts after launch",
          "body": "An app is fine until a phone update arrives and something it depends on stops working. Our monthly plan covers watching, repairs and version upgrades, so there is no cliff edge the week after everyone celebrates."
        },
        {
          "title": "Finished means live and watched",
          "body": "An app is not finished when it compiles on somebody's laptop. It is finished when real customers are using it, with monitoring, limits and a way back, and somebody can see how it is behaving."
        },
        {
          "title": "You get a person, not a queue",
          "body": "The developer joins your sprint and answers in your own chat. Nobody relays questions for them, and no request sits overnight because the person who wrote the code has moved on to another project."
        },
        {
          "title": "A number you can hold us to",
          "body": "The job, the dates and the price after one short call. You know the cost before work starts, and you can stop or extend at the end of an agreed period without an awkward conversation."
        },
        {
          "title": "A record across the whole stack",
          "body": "50+ projects delivered across 6 countries, a 4.8 average rating and 99.9% uptime on the software we run. The phone work sits next to the website, content and backend people who keep it fed."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "A simple process that gets the right mobile developer into your team without delays.",
      "steps": [
        {
          "n": "01",
          "title": "A half-hour call",
          "body": "You describe the app, the team and the deadline. We ask what already exists, who owns the software it talks to, and what happens if the date moves. If React Native is wrong for what you describe, we say so there and then."
        },
        {
          "n": "02",
          "title": "The price, in writing",
          "body": "You get it in writing: what the developer works on, which sprints they cover, the rate and the notice either side gives. No estimate that quietly grows. If the job changes later, we re-price before doing the work, not after."
        },
        {
          "n": "03",
          "title": "Inside your sprint, not beside it",
          "body": "Your board, your code, your daily catch-up, your review standards. Work lands as pieces a member of your team reads. You watch progress in real commits and installable builds each week, not in a month-end report."
        },
        {
          "n": "04",
          "title": "Still there after release",
          "body": "Once the app is out we can stay on a monthly plan: watching crashes, repairs within agreed times, keeping up with phone and library versions, small improvements, and a written note of what changed and what it cost."
        }
      ]
    },
    "expertise": {
      "h2": "React Native expertise",
      "rows": [
        {
          "label": "Mobile",
          "items": [
            "React Native",
            "Flutter",
            "Swift"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS",
            "Laravel"
          ]
        },
        {
          "label": "Design",
          "items": [
            "Figma"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: build the first version of your app, add a phone app to a web product, or adopt one nobody has touched in years. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the app",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "An experienced React Native developer joins your sprint for an agreed number of months, on your board and in your code. You meet them first. Month to month after that.",
          "button": "Meet a developer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the app, get it into both app stores, and then keep it running: crash watching, repairs within an agreed time, version updates and a report every month.",
          "button": "Ask about run",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "manufacturing-attendance-opsdeck",
        "brightlane-auto-group-garagezone",
        "fintech-support-assistant"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us the app, the team and the deadline. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring React Native developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "How do you charge?",
          "a": "On a fixed job, not an open clock. After a half-hour call we send the work in writing: what the developer works on, the rate, how long it runs and the notice needed to end it. No hourly meter runs in the background and no estimate changes once work has started. If the job grows, we re-price it before doing the extra, not on a bill afterwards. A React Native arrangement is usually a monthly commitment with one named person, and you can extend, reduce or stop it at the end of an agreed period."
        },
        {
          "q": "What happens after the app is launched?",
          "a": "Launch is a milestone, not the finish. Phone apps break after release, usually when a phone update lands or something the app relies on is retired by Apple or Google. We offer a monthly plan: crash and speed monitoring, repairs within agreed times, security and version updates, small improvements and a written note each month of what changed. That is the difference between us and a firm that hands over the code and disappears. If you would rather run it yourself, you get a handover document and a build routine your own team can operate without calling anybody."
        },
        {
          "q": "How quickly can somebody start?",
          "a": "Weeks, not the months a hiring round takes, which is the usual reason people ask. The order is a half-hour call, the work in writing within a few days, then a start date agreed inside that. No sifting through resumes, no notice period on their side and no probation risk on yours. Real timing depends on how big the brief is and how much access your side has to arrange. If we cannot staff the work to the standard we would want, we tell you on that first call rather than taking the brief and hoping to find somebody later."
        },
        {
          "q": "Is React Native right, or should we build two separate apps?",
          "a": "Usually right, but not always, and we tell you which on the call. It suits products whose screens are mostly forms, lists, feeds, dashboards and account pages, and where one team looking after one set of code matters more than squeezing the last drop of speed out of the handset. It is the wrong answer for heavy moving graphics, serious video or sound processing on the device, or an app whose whole value is doing something only one kind of phone allows. If your product is in that group, we say so rather than take the work and struggle with it for six months."
        },
        {
          "q": "Will they work inside our team and our process?",
          "a": "Yes, that is the point. The developer joins your board, your code store and your daily catch-up, and follows the branching and review habits you already have. Every change lands as a piece somebody on your side reads and approves, so nothing goes in that your own people have not seen. You talk to the person writing the code, not to a manager relaying messages. If nobody on your team has mobile experience to review the work, we set up the review routine and write the decisions down, so the code stays readable to whoever picks it up next year."
        },
        {
          "q": "Who owns the code, and can we take it in-house later?",
          "a": "You do. The code lives in your repository, under your accounts, from the first day. The app store listings, certificates and developer accounts stay in your company's name, which matters far more than people expect on the day a relationship ends. We write a handover that covers how the app fits together, the steps to build and release it, and its known limits, so a new hire or another supplier can pick it up without unpicking everything first. No framework only we understand, no hosting only we can provide, and no clause that makes leaving expensive."
        }
      ]
    },
    "cta": {
      "h2": "Need a phone app and no mobile team?",
      "lede": "Tell us the app, the team and the deadline. You get the work written down with dates and a price, and a straight answer if React Native is the wrong tool for what you are building.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside React Native developers",
      "roles": [
        "/hire-flutter-developers",
        "/hire-swift-developers",
        "/hire-react-developers",
        "/hire-javascript-developers",
        "/hire-typescript-developers",
        "/hire-nodejs-developers"
      ]
    },
    "seo": {
      "title": "Hire React Native developers | Infoloop",
      "description": "Add an experienced React Native developer to your team in weeks. One app for iPhone and Android, built in your tools, price agreed in writing first."
    }
  },
  {
    "slug": "hire-shopify-developers",
    "role": "Shopify developers",
    "badge": "Sh",
    "h1": "Hire [[Shopify]] developers who keep your store selling",
    "sub": "A named Shopify developer on your team in weeks, not months",
    "lede": "Shopify is the platform that runs an online store for you: the checkout, card payments, tax, stock and discount codes. What it cannot do is know your business. Our developer builds that part inside your team, in your tools and on your list, and stays on afterwards to keep the store healthy.",
    "bullets": [
      "Experienced Shopify developers, in your team in 1 to 2 weeks",
      "You meet the person before they touch your store",
      "They work in your tools, to your rules, in your weekly rhythm",
      "What gets built, by when and for how much, in writing first"
    ],
    "buttons": {
      "primary": "Tell us about your store",
      "secondary": "See how it works"
    },
    "band": [
      "Shopify developers in weeks.",
      "Not months of hiring."
    ],
    "why": {
      "h2": "Why companies hire Shopify developers from Infoloop",
      "lede": "One named person, honest advice and a store that keeps earning after launch.",
      "items": [
        {
          "title": "The people who built it answer the phone",
          "body": "Our monthly agreement covers watching the store, repairs inside agreed times, security and app updates, small improvements and a written report. The person who wrote the code is the one who picks it up when the checkout misbehaves."
        },
        {
          "title": "A developer, not a ticket queue",
          "body": "You get one named person in your channels who learns your range, your promotions and your quirks. Nobody relays your questions, and there is no rotating cast re-reading the brief every few weeks."
        },
        {
          "title": "We tell you when Shopify is the wrong choice",
          "body": "Some projects belong on a store platform, some on an ordinary website, plenty on both. We are certified Webflow and Shopify Partners and build on each. We say which suits your case on the first call, even when the answer means a smaller job for us."
        },
        {
          "title": "A store your own team can change",
          "body": "Editable sections and reusable fields set up so marketing can put a campaign page live without booking developer time. The handover includes written notes and a walkthrough, not simply a password."
        },
        {
          "title": "We have rebuilt a store and moved the numbers",
          "body": "One direct-to-consumer brand had us rebuild a store that looked smart and sold badly. Conversion went up, the build earned back what it cost, and the founder's own verdict on that job sits further down this page. That is a single project, not a promise about yours, but it is the kind of result the work is aimed at rather than a prettier home page."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "Four plain steps from first call to a store that is live and looked after.",
      "steps": [
        {
          "n": "01",
          "title": "A half-hour call",
          "body": "You describe the store, what sits around it and what is getting in the way. We ask about visitor numbers, how many products you carry, which apps you pay for and who edits the store today. No deck, no bill for the conversation."
        },
        {
          "n": "02",
          "title": "Written down, then agreed",
          "body": "We put in writing what gets built, in what order, by when and for how much. If something cannot be known up front, we say so and price finding out separately, rather than burying it in a padded guess."
        },
        {
          "n": "03",
          "title": "You watch it being built",
          "body": "The developer works in your chat and on your board, on a separate copy of the store you can look at whenever you like. Weekly demonstrations on the real thing, not screenshots. Nothing arrives as a surprise at the end."
        },
        {
          "n": "04",
          "title": "Open it, then look after it",
          "body": "We publish, watch the first real orders go through, and stay. The monthly agreement covers keeping an eye on it, repairs inside agreed times, app and platform updates, small improvements and a written note of what changed."
        }
      ]
    },
    "expertise": {
      "h2": "Shopify expertise",
      "rows": [
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "Webflow",
            "WordPress"
          ]
        },
        {
          "label": "Design",
          "items": [
            "Figma"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: rebuild the store front, add a feature Shopify does not come with, move off another platform, join the store to your accounts package. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the build",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "1 to 2 weeks to start"
          ],
          "body": "A Shopify developer sits with your team for an agreed number of months, in your chat and on your board, working through the queue of campaign pages, collections and fixes. You meet them first. Month to month after that.",
          "button": "Meet a developer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the store, put it live, watch the first real orders go through, and stay: alerts, repairs within an agreed time, Shopify and app updates, small improvements and a written note every month.",
          "button": "Ask about the monthly plan",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
      "role": "Founder, DTC brand",
      "caseSlug": "dtc-shopify-rebuild"
    },
    "cases": {
      "slugs": [
        "dtc-shopify-rebuild",
        "brightlane-auto-group-garagezone",
        "fintech-support-assistant"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us about your store, what sits around it and what is getting in the way. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Shopify developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What does a Shopify developer cost?",
          "a": "We do not publish day rates, because the answer depends on how much of a developer you need and for how long. The shape is always the same. Half an hour on a call, then the work, the dates and the price in writing before anything is built. Most arrangements run one of two ways: a set build with one price and a delivery date, or booked days each month with a named person alongside your team. Keeping the store healthy afterwards is a separate monthly fee. You know all three numbers before you agree to any of them."
        },
        {
          "q": "Should we be on Shopify at all, or on an ordinary website?",
          "a": "Shopify, if you are selling at any real volume. It handles the checkout, card payments, tax, stock, discount codes and delivery, and those are big things not to build yourself. An ordinary website platform suits you better if the site is mainly there to explain what you do and collect inquiries, with your marketing people editing pages freely. Plenty of businesses run both: a marketing site on one, a store on the other, sharing one look. We build on both, so nothing rides on the answer for us, and we tell you which fits on the first call."
        },
        {
          "q": "What happens after the store opens?",
          "a": "Opening is where our monthly agreement starts, not where we walk away. It covers alerts if the store goes down or starts throwing errors, so problems reach us before a customer emails you. Repairs inside agreed times. Shopify and app updates applied and checked. Security patches. A queue of small improvements each month, and a written note of what changed and what it did to your numbers. The same developer who built the store looks after it, so nobody has to relearn your setup. If you would rather bring it in-house, we hand over the notes and walk your team through it properly."
        },
        {
          "q": "Can you work with the team and the store we already have?",
          "a": "Yes. Working inside a team and a store that already exist is what this is built for. Our developer joins your chat, your board and your weekly rhythm, works in your repository and follows however you already check each other's work. We read the existing store front before changing any of it, including the parts earlier developers left behind that nobody understands. If it turns out to be in poor shape, we say so and give you a plain choice between repair and a rebuild, with the cost and the risk of each spelled out. We do not insist on starting again to make our lives easier."
        },
        {
          "q": "Can you move our store across without losing our Google traffic?",
          "a": "Yes. The parts that matter are the addresses and the data. We build a full list of every existing web address, decide where each one should now point, and put permanent redirects in place before the switch, so pages that rank and links from other sites keep working. Products, sizes and colors, collections, customer accounts and order history are moved and then checked line by line rather than glanced at. We run the new store beside the old one on a private address for testing, switch over at a quiet trading hour, and watch search figures and error rates closely for weeks afterwards."
        },
        {
          "q": "Do you work on Shopify's larger plan, and on custom store fronts?",
          "a": "Yes to both. On the larger plan we work with the extended checkout, trade ordering, higher limits and several stores under one roof. Building a fully custom store front, with Shopify running only the selling underneath, is something we do when there is a real reason: an unusual buying experience, one set of content feeding several sites, or speed a standard front cannot reach. It is not our default. That approach carries real build and upkeep costs, and for most stores a well-built standard front is quicker to launch and cheaper to keep. We tell you which camp you are in."
        }
      ]
    },
    "cta": {
      "h2": "Tell us about your Shopify store",
      "lede": "Describe what you sell, who edits the store today and the list of jobs you cannot reach. We will tell you what we would build, what we would leave alone, and whether Shopify is even the right home for it, with dates and a price in writing.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside Shopify developers",
      "roles": [
        "/hire-webflow-developers",
        "/hire-wordpress-developers",
        "/hire-javascript-developers",
        "/hire-react-developers",
        "/hire-nodejs-developers",
        "/hire-figma-designers"
      ]
    },
    "seo": {
      "title": "Hire Shopify developers | Infoloop",
      "description": "Add an experienced Shopify developer to your team in 1 to 2 weeks. Store front, custom features and connections to your tools, priced in writing first."
    }
  },
  {
    "slug": "hire-swift-developers",
    "role": "Swift developers",
    "badge": "Sw",
    "h1": "Hire [[Swift]] developers who ship real iPhone apps",
    "sub": "An experienced iPhone developer on your team, without a hiring round",
    "lede": "Swift is the language Apple built for iPhone and iPad apps. An app written in it is a proper iPhone app, not a website in a wrapper. Add one of our Swift developers to your team to build a new app or keep an existing one alive, working in your tools, on your list.",
    "bullets": [
      "An experienced Swift developer in your team in 1 to 2 weeks",
      "You meet the developer before they touch your code",
      "They work in your code, your board and your daily catch-up",
      "The job, the dates and the price written down first"
    ],
    "buttons": {
      "primary": "Talk about your app",
      "secondary": "See how it works"
    },
    "band": [
      "An iPhone developer in weeks.",
      "No advert, no shortlist."
    ],
    "why": {
      "h2": "Why companies hire Swift developers from Infoloop",
      "lede": "Speed to start, seniority, and one number agreed up front.",
      "items": [
        {
          "title": "Apple changes something every year",
          "body": "New iPhone software arrives each year and quietly breaks apps nobody is watching. On our monthly plan somebody tests against it early, fixes what it catches and keeps you ahead of Apple's deadlines instead of behind them."
        },
        {
          "title": "You talk to the person writing the code",
          "body": "There is no account manager between you and the developer. Questions go to the one person who can answer them, in your own chat, the same day, not relayed through somebody taking notes."
        },
        {
          "title": "Everything we make runs in the real world",
          "body": "We have delivered 50+ projects across 6 countries and keep the software we run at 99.9% uptime. The habits that come from being on the hook for live software show in how the code gets written."
        },
        {
          "title": "The price is agreed before we start",
          "body": "After one call you get the job, the dates and the price. If the work genuinely changes, we say so and quote again. Nothing lands on a bill you have not already seen and agreed to."
        },
        {
          "title": "Start without advertising a job",
          "body": "No advert, no shortlist, no notice period to wait out. You add somebody to the team you already have and stop when the work is done, instead of carrying a permanent salary you have to keep busy."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire a Swift developer from us",
      "lede": "A simple path from the first call to an app on the App Store.",
      "steps": [
        {
          "n": "01",
          "title": "Half an hour on the phone",
          "body": "Tell us about the app, the deadline and what it is built with today. We ask what somebody would need to be useful on day one. No forms, no screening panel, and you speak to people who write code."
        },
        {
          "n": "02",
          "title": "The work, the dates, the price",
          "body": "Within a few days you get the job written down with dates and a price. If it is really an ongoing seat rather than a defined project, you get a monthly figure instead. You decide before anything begins."
        },
        {
          "n": "03",
          "title": "Working inside your sprint",
          "body": "The developer joins your catch-up, your board and your code. Work arrives in pieces your team reads and approves. You see progress every week as a build on your own handset, not a status document."
        },
        {
          "n": "04",
          "title": "Out, then looked after",
          "body": "We put the app in for Apple's review, get it through and watch the first releases closely. From there you take it in-house or we keep it alive: watching, repairs, security updates and a short monthly report."
        }
      ]
    },
    "expertise": {
      "h2": "Swift expertise",
      "rows": [
        {
          "label": "Mobile",
          "items": [
            "Swift",
            "Flutter",
            "React Native"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS",
            "Laravel",
            "PHP"
          ]
        },
        {
          "label": "Design",
          "items": [
            "Figma"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: a first version of your iPhone app, a takeover of one somebody else wrote, or old screens moved onto Apple's newer tools. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the app",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "An experienced Swift developer sits with your iPhone team for an agreed number of months, in your code, on your board. You meet them first. Month to month after that.",
          "button": "Meet a Swift developer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the app, get it through Apple's review, and then keep it alive: testing against each new iPhone release, fixing within an agreed time, small improvements and a report every month.",
          "button": "Ask about aftercare",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "manufacturing-attendance-opsdeck",
        "fintech-support-assistant",
        "dtc-shopify-rebuild"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us about the app, the deadline and what it is built with today. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Swift developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What does a Swift developer cost?",
          "a": "There is no published rate, because the shape of the work sets the number. After half an hour on the phone you get the job written down with dates and one fixed price for a defined project, or a monthly figure for somebody sitting inside your team. You see that number before anything starts. If the work genuinely changes, we say so and quote again rather than slipping it onto a bill. Once the app is out, looking after it is priced separately each month, against what we are actually keeping alive."
        },
        {
          "q": "How quickly could somebody start?",
          "a": "Faster than advertising the job, which is why most people ask. The order is half an hour on the phone, then the work and the price in writing within a few days, then they start. No advert, no shortlist, no notice period. What sets the real date is access on your side: your code, a seat on your Apple developer account, the keys to whatever the app talks to, and a spare handset or two to test on. Teams that have those ready begin sooner, so sort them out while we are still pricing the work."
        },
        {
          "q": "Do you use Apple's newer way of building screens or the older one?",
          "a": "Both, and usually both in the same app. New screens are generally written with Apple's newer tools because they are quicker to build and easier to keep tidy afterward. The older tools stay where they earn their place: fiddly custom controls, screens that already work well, and layouts the newer approach handles awkwardly. If you want an older app moved across, we do it one screen at a time rather than as one big rewrite, so releases keep going out to your customers the whole time."
        },
        {
          "q": "Will they work in our code and follow our process?",
          "a": "Yes. The developer joins your code store, your board and your daily catch-up, and works inside whatever branching and review process you already run. Work arrives in pieces somebody on your team reads and approves, so your own people see and can challenge every change as it lands, not one enormous delivery at the end. If you have written rules on how the code is arranged, an automatic style checker or a release checklist, those get read first and followed. The point is to add capacity to the team you have, not to run a separate project beside it."
        },
        {
          "q": "What happens after the app is on the App Store?",
          "a": "You have two options and you pick one before it goes out. Either your team takes the code in-house, with a proper handover, written notes and a walkthrough. Or we keep it running for a monthly fee: watching it, repairs inside an agreed time, small improvements, security and dependency updates, and a short written report. That matters more on Apple's platform than most, because new iPhone software lands every year, and apps nobody is watching quietly stop working on handsets you cannot get back."
        },
        {
          "q": "Can we see iPhone apps you have made?",
          "a": "Not the ones you are hoping for, and we would rather be straight about it. Our published case studies include maintenance software for a machinery maker, a support assistant for a fintech, a rebuilt Shopify store, attendance software in factories and a garage group running nine branches on one platform. None of those is a consumer iPhone app. So judge the Swift work on the work itself. On the call, ask how a particular screen in your app would be built, what happens when the signal dies halfway through a save, and what the release routine looks like. You will learn more from that than from a slideshow."
        }
      ]
    },
    "cta": {
      "h2": "Need a Swift developer sooner than you can hire one?",
      "lede": "Tell us about the app, the deadline and what it is built with today. You get the job written down with dates and a price, and you speak to people who write code.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside Swift developers",
      "roles": [
        "/hire-flutter-developers",
        "/hire-react-native-developers",
        "/hire-figma-designers",
        "/hire-nodejs-developers",
        "/hire-laravel-developers",
        "/hire-nestjs-developers"
      ]
    },
    "seo": {
      "title": "Hire Swift developers for iPhone apps | Infoloop",
      "description": "Swift is Apple's language for iPhone apps. Add an experienced Swift developer to your team without a hiring round, in your tools, for a price in writing."
    }
  },
  {
    "slug": "hire-typescript-developers",
    "role": "TypeScript developers",
    "badge": "TS",
    "h1": "Hire [[TypeScript]] developers who catch mistakes before customers do",
    "sub": "Safety checks added to the code you already have, without starting over",
    "lede": "TypeScript is JavaScript with a safety check added. Developers write down what each price, name and date should look like, and the build stops when something does not match. Mistakes show up on a developer's screen, not in front of a customer. Our engineers add it to code you already have, inside your team.",
    "bullets": [
      "Experienced TypeScript engineers, in your team in 1 to 2 weeks",
      "You meet each person before they start",
      "They work in your codebase, to your rules, in your daily catch-up",
      "The job, the dates and the figure in writing before anything starts"
    ],
    "buttons": {
      "primary": "Talk to us",
      "secondary": "See how hiring works"
    },
    "band": [
      "Mistakes caught at the build, not on a live page.",
      "Experienced people in weeks."
    ],
    "why": {
      "h2": "Why companies hire TypeScript developers from Infoloop",
      "lede": "Fewer things break, and one settled number from day one.",
      "items": [
        {
          "title": "We build it, then we look after it",
          "body": "Most firms are gone the week after launch. We offer a monthly arrangement instead: we watch the software, put faults right within agreed times, keep it patched and send you a report every month."
        },
        {
          "title": "Written for whoever reads it next",
          "body": "It is easy to write checks that satisfy the computer and tell a person nothing. We describe the rules of your business instead, so a developer opening the file in a year can see how it is meant to work without calling somebody who has left."
        },
        {
          "title": "A settled figure, not a running clock",
          "body": "You agree the cost before we begin. The figure does not move because a task took longer than somebody guessed, and there are no timesheets to pick through at the end of the month."
        },
        {
          "title": "Your codebase, your standards",
          "body": "We take on your habits rather than bringing ours. If your team dislikes an approach it does not go in, and every change is approved by one of your own developers before it lands."
        },
        {
          "title": "One team, the whole picture",
          "body": "We also build the places teams edit their own content, online stores and AI assistants. The same engineer can follow one piece of information from where it is stored, through the middle, to the page it finally appears on."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "A simple process that gets the right person into your codebase without delays.",
      "steps": [
        {
          "n": "01",
          "title": "A short call",
          "body": "You describe what you have and what keeps going wrong. We say whether TypeScript is the right fix or a distraction. If your real problem is somewhere else, we tell you that rather than sell you this. Nothing to pay for the conversation."
        },
        {
          "n": "02",
          "title": "One number, one date",
          "body": "We put in writing what gets checked, what deliberately does not, and how we will both know it is finished. Anything added later is quoted on its own, also in writing, before it is built."
        },
        {
          "n": "03",
          "title": "Small pieces your team reads",
          "body": "You meet every engineer first. Work then reaches you in pieces small enough to read over a coffee, and your own developers approve each one. Nothing enters your codebase that somebody on your side has not understood."
        },
        {
          "n": "04",
          "title": "Keep it, or hand it back",
          "body": "You finish with notes and a recorded walkthrough for your developers. If you would rather not carry it yourself, a monthly arrangement keeps us watching it, patching it and improving it. Both are normal. You pick which."
        }
      ]
    },
    "expertise": {
      "h2": "TypeScript expertise",
      "rows": [
        {
          "label": "Frontend",
          "items": [
            "TypeScript",
            "JavaScript",
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt.js"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS"
          ]
        },
        {
          "label": "Mobile",
          "items": [
            "React Native"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us, each put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: add checks to the files that break most often, share one description between screen and server, or put a gate on every change. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the job",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "An experienced TypeScript developer joins your team for an agreed number of months, in your codebase, on your list, delivering in small pieces your people approve. You meet them first. Month to month after that.",
          "button": "Meet an engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the piece, put it live and keep it running: watching it, fixing faults within an agreed time, keeping the checks strict as the code grows, and a report every month.",
          "button": "Ask about run",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "They shipped our support agent in five weeks and it has run ever since. Response time dropped from hours to two minutes.",
      "role": "COO, fintech scale-up",
      "caseSlug": "fintech-support-assistant"
    },
    "cases": {
      "slugs": [
        "fintech-support-assistant",
        "brightlane-auto-group-garagezone",
        "manufacturing-erp-predictive-maintenance"
      ],
      "button": "View case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what keeps breaking and who looks after the code now. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring TypeScript developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What does it cost?",
          "a": "We do not print a daily rate, because the number means nothing without knowing the job. It starts with a short call. We agree what gets built or checked, and you get the job, the dates and the figure in writing before any work begins. Anything you add later is quoted on its own, so the figure you approve is the figure you pay. If you want us to keep the work running after it is live, that is a separate monthly fee, sized to how much we look after. Nothing is charged by the hour in the background."
        },
        {
          "q": "Can your engineer work inside our team?",
          "a": "Yes, and that is how this usually runs. We work in your codebase, follow your rules for branches and approvals, and deliver in small pieces your own developers read and sign off. We join the meetings and chat channels you want us in and stay out of the ones you do not. Nothing lands that your team has not seen. If you would rather we built one self-contained piece separately and handed it over complete, we can do that instead. Unless you ask for that, your developers keep control of everything that goes in."
        },
        {
          "q": "Do we have to start the whole thing again?",
          "a": "No, and we would talk you out of trying. TypeScript was designed to be added a little at a time. Old files and new files sit in the same project, and you tighten the checking as more of it is covered. We begin with the files that break most often and the points where information arrives from outside, because that is where the effort pays back first. The site keeps building the whole time. Before we start we agree how strict you want to end up, so the work has a finish line rather than drifting on."
        },
        {
          "q": "What happens when the work is done?",
          "a": "You choose. One route is a clean handover: notes, a walkthrough for your developers, and the whole thing in your hands. The other is our monthly arrangement, where we carry on running what we built. That means watching it, putting faults right within agreed times, making improvements, applying security updates, and a written report each month showing what changed and why. Most of the benefit of this work shows up over the following year, so somebody has to stop the standard slipping. That can be your team or it can be us, but it should be a decision rather than an accident."
        },
        {
          "q": "How do you stop the descriptions going out of date?",
          "a": "By producing them automatically rather than writing them out twice. Wherever your software already publishes a definition of what it holds, we generate the description from that, so a change at the source breaks the build right away. Where nothing like that exists, we inspect the information as it arrives and report anything unexpected, instead of letting a wrong shape flow inward as an assumption. A rule that only lives in one developer's head is a comment, not a safeguard. We treat the computer's checking as a test that runs on every proposed change."
        },
        {
          "q": "Who owns the code if we stop working with you?",
          "a": "You do. The work lives in your codebase, on your hosting, under your accounts, from the first day. There is no wrapper of ours to unpick and no license you have to keep paying for. If you end the monthly arrangement you keep everything: the code, the notes, the automatic checks and the handover material. We would rather you stayed because it works than because leaving would hurt. Notice periods, and anything we host on your behalf, are set out in writing at the start so there are no surprises later."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what keeps breaking",
      "lede": "Half an hour is enough to work out whether TypeScript is your fix or a distraction. You leave with the job, the dates and the figure. No obligation, and nothing to sit through.",
      "button": "Book a call"
    },
    "more": {
      "h2": "Roles that work alongside TypeScript developers",
      "roles": [
        "/hire-javascript-developers",
        "/hire-react-developers",
        "/hire-nextjs-developers",
        "/hire-vue-developers",
        "/hire-nodejs-developers",
        "/hire-nestjs-developers"
      ]
    },
    "seo": {
      "title": "Hire TypeScript developers | Infoloop",
      "description": "TypeScript catches mistakes before your customers do. Hire an experienced engineer to add it to code you already have, for a price agreed in writing first."
    }
  },
  {
    "slug": "hire-vue-developers",
    "role": "Vue.js developers",
    "badge": "Vue",
    "h1": "Hire [[Vue.js]] developers without running a hiring round",
    "sub": "A Vue engineer in your project in weeks, not after months of recruiting",
    "lede": "Vue.js is a tool for building the screens people use in a web application. Teams pick it because the code is easy to read and new developers can follow it without a guide. Add one of our Vue engineers to your team and they work in your project, on your board, with your people.",
    "bullets": [
      "Experienced Vue engineers, in your project in 1 to 2 weeks",
      "You meet each person before they join",
      "They work in your project, to your rules, in your catch-ups",
      "The work, the dates and the cost in writing before day one"
    ],
    "buttons": {
      "primary": "Start with a call",
      "secondary": "See how hiring works"
    },
    "band": [
      "A Vue engineer in weeks.",
      "Not a hiring round in months."
    ],
    "why": {
      "h2": "Why companies hire Vue developers from Infoloop",
      "lede": "No hiring round, one written price and people who stay after launch.",
      "items": [
        {
          "title": "We run what we build",
          "body": "Most firms finish at launch and leave the upkeep with you. Our monthly arrangement covers watching the app, fixing within agreed times, keeping it up to date and a written report on what changed."
        },
        {
          "title": "No hiring round",
          "body": "Job ads, agency fees, notice periods and probation add up to months. This starts with one call, and the work and the price are agreed before anything begins."
        },
        {
          "title": "Something you can hold us to",
          "body": "What will be delivered, by when and for how much, written down in advance. If the job turns out bigger than we thought, we come back and say so instead of quietly adding hours to the bill."
        },
        {
          "title": "Screens designed against the real thing",
          "body": "We also build the software behind the screens, online shops and AI assistants, so the Vue work is designed for the data, the words and the logins it has to deal with every day."
        },
        {
          "title": "A track record you can check",
          "body": "50+ projects delivered across 6 countries, 99.9% uptime on the software we run and a 4.8 average rating. The same standards apply whether we run a whole build or fill one gap in your team."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "A simple process that gets a Vue developer into your project without delays.",
      "steps": [
        {
          "n": "01",
          "title": "A call, not an interview round",
          "body": "You describe the work, what it sits in and when you need somebody. We say honestly whether we are right for it. No screening calls, no pile of CVs, no candidates who stop replying in week two."
        },
        {
          "n": "02",
          "title": "One agreement, including how to end it",
          "body": "We write down what the engineer works on, how long for, what it costs and how you can stop. You approve that before anything begins. The figure only moves if what you asked for moves."
        },
        {
          "n": "03",
          "title": "In your project from day one",
          "body": "Your Vue developer joins your catch-ups, your board and your code. Work arrives as changes your own engineers approve. You see progress daily instead of waiting for a demo at the end of the month."
        },
        {
          "n": "04",
          "title": "Afterwards, you choose",
          "body": "You are not tied in. Once the build is finished, either we hand everything across and stop, or the developer stays on for a monthly fee and looks after what they wrote."
        }
      ]
    },
    "expertise": {
      "h2": "Vue.js expertise",
      "rows": [
        {
          "label": "Frontend",
          "items": [
            "Vue.js",
            "Nuxt.js",
            "JavaScript",
            "TypeScript"
          ]
        },
        {
          "label": "Backend and APIs",
          "items": [
            "Node.js",
            "NestJS",
            "Laravel"
          ]
        },
        {
          "label": "CMS and web",
          "items": [
            "Webflow",
            "WordPress"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: a Vue 2 to Vue 3 upgrade, a new section of screens, a shared set of components. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the work",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Agreed start date"
          ],
          "body": "An experienced Vue developer sits with your team for an agreed number of months, in your project, on your board. You meet them first. Month to month after that.",
          "button": "Meet a Vue engineer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the screens, put them live, and then keep them running: watching, fixing within an agreed time, small improvements and a report every month.",
          "button": "Ask about run",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "manufacturing-attendance-opsdeck",
        "brightlane-auto-group-garagezone",
        "fintech-support-assistant"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what you are building in Vue and who looks after it now. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Vue.js developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "How quickly can a Vue developer start?",
          "a": "We confirm the start date on the first call rather than promise one we cannot keep, and it is normally weeks rather than months. This route skips the slow parts of a normal hire: writing the job ad, sifting applicants, several rounds of interviews and a notice period. After one call, Infoloop writes down the work, a start date, how long it runs and what it costs. Once you approve that, the engineer begins on the agreed day. There is no probation to sit through and no recruitment fee at the end."
        },
        {
          "q": "What does it cost, and how is it set up?",
          "a": "We do not quote a daily rate before we understand the work, because the honest answer depends on the job, the length and whether you want us looking after it afterwards. The shape is always the same: one call, then the work, the dates and the cost written down before anything starts. You approve that first. If it turns out bigger than we thought, we come back and rewrite it with you rather than quietly running up hours. How to end it sits in the same document, so you know the way out before you begin."
        },
        {
          "q": "Will they work in our project and follow our process?",
          "a": "Yes. Your Vue developer works inside your project, on your board and in your catch-ups, using your branches and your approval rules. Every change is put forward for your own engineers to approve, so nothing lands without your say-so. We match the habits already in the code rather than bringing our own. If your setup has gaps that will cause trouble later, such as missing automatic checks or nowhere to run tests, we point them out and leave it to you to decide whether to fix that as part of the work."
        },
        {
          "q": "Can you bring an old Vue 2 app up to date?",
          "a": "Yes, and we do it in tested steps rather than one long rebuild. First we take stock of what the app depends on and find anything with no modern equivalent. Then the build tools come up to date. Then the screens move across in batches, against a working copy, so you can still release at any point. Older-style code can stay where rewriting adds risk without adding value. The written agreement sets out which parts move, in what order, and what happens to any add-on with no supported replacement, so there are no surprises halfway through."
        },
        {
          "q": "What happens once the build is finished?",
          "a": "You choose. We can hand over completely, with the screen structure, the stored information and the tests all written down, so your own developers pick it up without needing us. Or the arrangement carries on monthly, which is what we mean when we say we run it. That covers watching the app, fixing faults within agreed times, small improvements, security updates and a report each month on what changed and what needs attention. Most firms skip this part: they hand over at launch and the upkeep quietly becomes your problem."
        },
        {
          "q": "Can one person do the back end as well?",
          "a": "It depends on the person and the work, and we will be straight with you rather than sell one engineer as a whole team. Infoloop also builds the software behind the screens, AI assistants and online shops, so we can staff the surrounding work when you need it. But some jobs genuinely need a back end engineer as well as a Vue developer. Where that is true we say so in the written agreement and price it that way. Stretching one person across both is how dates slip a month at a time."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your Vue plan needs",
      "lede": "One call is enough for us to understand the work and tell you whether we are right for it. You leave with the work, the dates and the cost. No recruitment round, no CVs, no obligation.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside Vue.js developers",
      "roles": [
        "/hire-nuxt-developers",
        "/hire-javascript-developers",
        "/hire-typescript-developers",
        "/hire-nodejs-developers",
        "/hire-laravel-developers",
        "/hire-nestjs-developers"
      ]
    },
    "seo": {
      "title": "Hire Vue.js developers | Infoloop",
      "description": "Add an experienced Vue.js engineer to your team, in your project and to your rules. Vue 2 upgrades, Nuxt pages and shared components, priced in writing first."
    }
  },
  {
    "slug": "hire-webflow-developers",
    "role": "Webflow developers",
    "badge": "Wf",
    "h1": "Hire [[Webflow]] developers who build pages your team can edit",
    "sub": "One named developer inside your own Webflow account, in weeks",
    "lede": "Webflow is a tool for building and running a company website without a developer on hand for every change. Your marketing team edits the words and photos; the layout stays put. Add one of our Webflow developers to your team and they build inside your own account, so everything stays yours.",
    "bullets": [
      "An experienced Webflow developer in your team in 1 to 2 weeks",
      "You interview every developer before they start, and you can say no",
      "They work in your Webflow account, to your rules, in your weekly catch-up",
      "What they do, the hours and the price in writing before day one"
    ],
    "buttons": {
      "primary": "Start a conversation",
      "secondary": "See how it works"
    },
    "band": [
      "Your site, your account.",
      "Our developer, in weeks."
    ],
    "why": {
      "h2": "Why companies hire Webflow developers from Infoloop",
      "lede": "One named person, your own account and a price that does not move.",
      "items": [
        {
          "title": "We look after it once it is live",
          "body": "Plenty of firms hand a site over and vanish. We would rather stay. For a monthly fee we keep an eye on the site, fix what breaks inside an agreed time, keep everything patched, make small improvements and send you a short report each month."
        },
        {
          "title": "The Webflow account is in your name",
          "body": "Your site sits in your own Webflow workspace, on your own plan, paid on your own card. Nothing is parked somewhere you cannot reach. If you stop working with us, you lose a developer, not your website."
        },
        {
          "title": "Google work happens during the build",
          "body": "We do not build the site and then sell you a separate search project six months later. Titles, headings, summaries and redirects go in as the pages go in, and we publish how we do it so you can hold us to it."
        },
        {
          "title": "One person, start to finish",
          "body": "You meet the developer and that is who you get. Nobody less experienced is swapped in quietly after you sign, and no account manager sits between you and the person doing the work."
        },
        {
          "title": "Written down, not kept in one head",
          "body": "How the styles are named, how the editable boxes work and what changed each week all live in your project from week one. If the developer changes or you bring the site in-house, that knowledge stays with you."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "Four short steps from first call to a developer working in your account.",
      "steps": [
        {
          "n": "01",
          "title": "A half-hour call",
          "body": "You tell us what needs doing, what state the site is in and who else is involved. We tell you honestly whether one developer covers it or whether this is a bigger piece of work than it looks. Nothing to pay for the conversation."
        },
        {
          "n": "02",
          "title": "The price, in writing",
          "body": "Before anyone starts you get it written down: what the developer does, how many hours, how much notice either side gives, and the cost. No finder's fee. If the work changes, we price that change in writing before doing it."
        },
        {
          "n": "03",
          "title": "You interview them",
          "body": "We put forward one named developer. You talk to them the way you would talk to anybody joining your team, and you can say no. The person you meet is the person who does the work."
        },
        {
          "n": "04",
          "title": "They start, and they can stay",
          "body": "They join your weekly catch-up and work in your own Webflow account. Each week they write down what they did. When the build is over you can keep them, move to a monthly care plan, or take the notes and carry on alone."
        }
      ]
    },
    "expertise": {
      "h2": "Webflow expertise",
      "rows": [
        {
          "label": "CMS and web",
          "items": [
            "Webflow",
            "WordPress"
          ]
        },
        {
          "label": "Design",
          "items": [
            "Figma"
          ]
        },
        {
          "label": "Custom code",
          "items": [
            "JavaScript",
            "TypeScript"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. All three are put in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: a new site built from your designs, a move across from WordPress, or an untidy Webflow project put straight. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the build",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "An experienced Webflow developer sits with your team for an agreed number of months, in your account, on your list of pages. You interview them first. Month to month after that.",
          "button": "Meet a developer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build the site, put it live, and then keep it running: watching, fixing inside an agreed time, new pages and small improvements, and a short report every month.",
          "button": "Ask about care",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "Our Shopify rebuild paid for itself in the first quarter. Conversion is up 38% and they still manage it for us.",
      "role": "Founder, DTC brand",
      "caseSlug": "dtc-shopify-rebuild"
    },
    "cases": {
      "slugs": [
        "dtc-shopify-rebuild",
        "brightlane-auto-group-garagezone",
        "fintech-support-assistant"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us what the site needs and who looks after it now. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring Webflow developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "What will it cost, and how is it charged?",
          "a": "Either a monthly fee for the developer, or one fixed price for a defined job, depending on how steady the work is. Both are agreed in writing before anybody starts. There is no finder's fee and no minimum term beyond the notice period we set at the beginning. Ask on the first call and you get a real number for your job, not a range copied off a page. If the work changes later, we price that change in writing before doing it."
        },
        {
          "q": "What happens once the site is live?",
          "a": "Going live is where the running starts, not where the job ends. You can keep the developer on for new pages, or move to a monthly care plan: we keep an eye on the site, fix problems inside an agreed time, keep everything patched, make small improvements and send a short written report each month. If you would rather look after it yourselves, we hand over the naming notes, the guide for your editors and the list of redirects from old addresses, and you carry on without us."
        },
        {
          "q": "Is the website ours if we stop working with you?",
          "a": "Yes. The work happens in your own Webflow workspace, on your own plan, paid on your own card, so nothing is parked in an account you cannot open. If you stop working with us, you lose a developer and keep everything else: the site, the words, the pictures, the web address and the notes. We would rather keep you because the work is good, not because leaving is hard."
        },
        {
          "q": "Can we meet the developer, and how soon could they start?",
          "a": "Yes, you meet them first, and you can say no. Interview them the way you would interview anybody joining your team. If they are not right for you, we put someone else forward. Start dates are usually a matter of weeks, not months. The date depends more on how quickly your side can arrange the meeting and hand over access than on us finding a person. It is quicker where there is a working Webflow project with some notes, and slower where the developer first has to work out how an undocumented site was put together."
        },
        {
          "q": "How will they work with our team?",
          "a": "They fit around how you already work: your catch-up, your review step, your way of naming things and your idea of when a job is finished. Before anything starts we agree the hours that overlap your own working day, because that is the thing most likely to cause friction later. If your people need to be at their desks at the same time to look over work together, say so at the beginning and we plan for it. We would rather do that than promise you can pass work back and forth overnight."
        },
        {
          "q": "Is Webflow right for us, or should we use something else?",
          "a": "Webflow suits a company website where a small team wants to publish without calling a developer, and where the look of the pages matters. If you mainly sell products, with stock levels, delivery and discount codes, a shop platform such as Shopify is the better answer. WordPress earns its place when you depend on a particular add-on or an established way of publishing articles. We build on all three, so we have nothing to gain by pushing you the wrong way. If Webflow is a poor fit for what you describe, we say so on the first call."
        }
      ]
    },
    "cta": {
      "h2": "Know what your website needs?",
      "lede": "Half an hour to understand the site, your team and the date it has to be ready by. Then we put a Webflow developer in front of you to interview. No finder's fee, and nothing to sign after the call.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside Webflow developers",
      "roles": [
        "/hire-wordpress-developers",
        "/hire-shopify-developers",
        "/hire-figma-designers",
        "/hire-javascript-developers",
        "/hire-react-developers",
        "/hire-nextjs-developers"
      ]
    },
    "seo": {
      "title": "Hire Webflow developers | Infoloop",
      "description": "Put a named Webflow developer inside your own Webflow account. Pages your marketing team can edit, built to your rules, for a price agreed in writing first."
    }
  },
  {
    "slug": "hire-wordpress-developers",
    "role": "WordPress developers",
    "badge": "WP",
    "h1": "Hire [[WordPress]] developers who make your site safe again",
    "sub": "One experienced developer for the site nobody dares touch",
    "lede": "WordPress is the free software behind many of the world's websites. It stores your pages and posts, and add-ons bolt on extra features like forms or bookings. Add one of our developers to your team and they tidy those add-ons, make the site quick and safe, and keep it that way.",
    "bullets": [
      "Experienced WordPress developers, in your team in weeks, not months",
      "You meet the person before anything is agreed",
      "They work in your tools, your chat and your release days",
      "The work, the date and the price in writing first"
    ],
    "buttons": {
      "primary": "Talk to us",
      "secondary": "How hiring works"
    },
    "band": [
      "A site that stays quick and safe.",
      "Not one nobody dares touch."
    ],
    "why": {
      "h2": "Why companies hire WordPress developers from Infoloop",
      "lede": "Somebody has to own the upkeep. With us, that is settled from day one.",
      "items": [
        {
          "title": "A WordPress site left alone goes wrong",
          "body": "Somebody has to apply the updates, check the backups and notice when the site stops responding. Either your own team owns that after a proper handover, or we do it for a monthly fee. What nobody does is leave it."
        },
        {
          "title": "Everything is registered to you",
          "body": "The hosting, the web address, any paid add-on licenses and the code sit in your name from the first day. Nothing renews through us, and no part of the site needs us before it can be edited."
        },
        {
          "title": "We tell you if WordPress is wrong",
          "body": "We build on other platforms too, Webflow among them, and no commission rides on the answer. If your team would be better served somewhere simpler, we say so out loud, before you have spent anything."
        },
        {
          "title": "Updates on a timetable, not in a panic",
          "body": "Patching happens on an agreed day, on a practice copy, with a backup taken first. The monthly cost of keeping the site patched is agreed at the start, not sent as a bill after something falls over."
        },
        {
          "title": "One developer who learns your site",
          "body": "You get the same experienced person month after month, not whoever happens to be free. They join your chat and your catch-up if you want them there, and you meet them before anything is agreed."
        }
      ]
    },
    "how": {
      "eyebrow": "How it works",
      "h2": "How you can hire from us",
      "lede": "Four steps from the first call to a site somebody actually looks after.",
      "steps": [
        {
          "n": "01",
          "title": "Half an hour on the phone",
          "body": "Tell us what the site does, who hosts it and what keeps going wrong. You get a straight read on whether this is a repair, a rebuild or a move somewhere else. Nothing to pay for the call."
        },
        {
          "n": "02",
          "title": "The price, before we begin",
          "body": "We write down the work, the price and the date it lands, and you approve that first. If we think WordPress is the wrong answer to what you have described, this is when we say so, not after the invoice."
        },
        {
          "n": "03",
          "title": "Everything tested on a copy first",
          "body": "Nothing is edited on the live site while customers are looking at it. Changes are made on a practice copy, checked, then released the way your team already releases things. There is always a way back."
        },
        {
          "n": "04",
          "title": "Live, then looked after",
          "body": "The site goes live with every login and password in your hands. From there you take it back in-house, or we keep it running: updates, watching for problems, repairs and a short report each month."
        }
      ]
    },
    "expertise": {
      "h2": "WordPress expertise",
      "rows": [
        {
          "label": "CMS and web",
          "items": [
            "WordPress",
            "Webflow"
          ]
        },
        {
          "label": "Backend",
          "items": [
            "PHP",
            "Laravel"
          ]
        },
        {
          "label": "Frontend",
          "items": [
            "JavaScript",
            "TypeScript",
            "React"
          ]
        },
        {
          "label": "eCommerce",
          "items": [
            "Shopify"
          ]
        },
        {
          "label": "Design",
          "items": [
            "Figma"
          ]
        }
      ]
    },
    "models": {
      "h2": "Our engagement models",
      "lede": "Three ways to work with us. Each one goes in writing before anything starts.",
      "items": [
        {
          "title": "A set piece of work",
          "tags": [
            "Fixed price",
            "End date"
          ],
          "body": "One clear job with a finish: tidy the add-ons, rebuild the pages your team edits most, or bring an old install up to a supported version. Priced and dated in writing, then handed over or looked after.",
          "button": "Scope the job",
          "tone": "orange"
        },
        {
          "title": "An engineer in your team",
          "tags": [
            "Monthly",
            "Starts in weeks"
          ],
          "body": "The same experienced WordPress developer works with your team for an agreed number of months, using your job list, your chat and your release days. You meet them before anything is signed, then carry on month to month.",
          "button": "Meet a developer",
          "tone": "ink"
        },
        {
          "title": "Build it, then we run it",
          "tags": [
            "Monthly retainer"
          ],
          "body": "We build or repair the site, put it live, then keep it that way: updates on a set day, alerts if it goes down, repairs inside an agreed time and a written note of what changed each month.",
          "button": "Ask about care",
          "tone": "mist"
        }
      ]
    },
    "quote": {
      "text": "The difference is they did not leave. Every month we get a report, fixes and one clear next step.",
      "role": "Operations lead, manufacturer",
      "caseSlug": "manufacturing-attendance-opsdeck"
    },
    "cases": {
      "slugs": [
        "dtc-shopify-rebuild",
        "manufacturing-attendance-opsdeck",
        "brightlane-auto-group-garagezone"
      ],
      "button": "Read the case study"
    },
    "meeting": {
      "h2": "Schedule a meeting",
      "lede": "Tell us who hosts the site and what keeps going wrong. A named person replies within one business day."
    },
    "faq": {
      "eyebrow": "FAQs",
      "h2": "Common questions about hiring WordPress developers",
      "lede": "Straight answers. If yours is not here, ask us on the call.",
      "items": [
        {
          "q": "How much will it cost?",
          "a": "We do not charge by the hour. After half an hour on the phone we write down the work, the date and one fixed price for the build, so you have the number before anybody starts. Looking after the site afterwards is a separate monthly fee, sized to what we are keeping alive: updates, watching for problems, repairs and small improvements. Keeping the two apart means you never pay for care you did not ask for, and never get a surprise bill for a build that ran long. If the job changes halfway through, we price that part in writing first."
        },
        {
          "q": "What happens after the site goes live?",
          "a": "You choose. Take the site back in-house with the handover notes and logins we produce, or stay with us on a monthly plan. That plan is the second half of what we do: updates applied on a set day, alerts if the site goes down or starts throwing errors, repairs inside an agreed time, security patches, a few improvements each month and a written note of what changed. WordPress punishes being ignored, because an out-of-date add-on is the most common way in for somebody with bad intentions. Either way, nothing about the build forces you to keep us."
        },
        {
          "q": "Can you work on the site we already have?",
          "a": "Yes. A site somebody else built is something we pick up as it stands. We start by going through what you have: the design, every add-on, the hosting, the database and how exposed the site is. Then you get a plain list in three piles: urgent, worth doing, leave alone. From there we repair in place, or rebuild only the parts genuinely holding you back. We do not insist on starting again. If the site turns out to be sound and simply needs somebody watching it, we say so, and the arrangement becomes a monthly plan rather than a project."
        },
        {
          "q": "Would you ever tell us to use something other than WordPress?",
          "a": "Yes, and before you have spent anything. We build on more than one platform, and no commission rides on which one we suggest. The short version: Webflow suits a company website that needs to be quick, safe and editable with almost no upkeep. WordPress earns its keep when you need a very particular add-on, an unusual way of organizing your content, or full control of the machine it runs on. The real cost of WordPress was never the software, which is free. It is the upkeep, and somebody has to own that. On the call we tell you which side of that line you are on."
        },
        {
          "q": "Who owns the site, the hosting and the paid add-ons?",
          "a": "You do, from day one. The hosting account, the web address, any add-ons with a yearly license and the code are all in your name, and we work inside them rather than parking your site somewhere only we can reach. Whatever we write is handed over as readable code with notes, and nothing renews through us. End the arrangement and you keep a site your own team, or another firm, could pick up the following morning. A client who stays because leaving would be painful is not really a client."
        },
        {
          "q": "How soon can somebody start, and how do we work together?",
          "a": "Usually within 1 to 2 weeks. Scoping happens on the first half-hour call, and work begins once the price and dates are agreed in writing. Day to day the developer uses your tools: your job list, your chat, your release days. Every change is built on the practice copy and looked over before it reaches a visitor, never typed straight into the live site. You get one named person rather than whoever is free that week, and you meet them before anything is signed. If you would rather we simply ran the whole thing and sent you a monthly report, that works too."
        }
      ]
    },
    "cta": {
      "h2": "Tell us what your WordPress site needs",
      "lede": "Bring the site, the list of add-ons and the thing that keeps going wrong. You leave with the work written down, a date, a price and an honest view on whether WordPress is still the right home for it.",
      "button": "Book a half-hour call"
    },
    "more": {
      "h2": "Roles that work alongside WordPress developers",
      "roles": [
        "/hire-php-developers",
        "/hire-laravel-developers",
        "/hire-webflow-developers",
        "/hire-shopify-developers",
        "/hire-javascript-developers",
        "/hire-figma-designers"
      ]
    },
    "seo": {
      "title": "Hire WordPress developers | Infoloop",
      "description": "Add an experienced WordPress developer to your team in weeks, not months. They tidy the add-ons, make the site quick and safe, and keep it that way."
    }
  },
];
