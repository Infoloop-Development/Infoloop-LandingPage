/**
 * /about content. Structure and section order follow 7Span's About page:
 * Our story (H1, sub, paragraphs, photo) → About → tagline marquee → Our
 * vision → Values (horizontal card rail) → Life @ Infoloop band → Core
 * priorities (list with thumbnails) → Our team (photo cards, no QR codes)
 * → tagline marquee → closing statement. Only published facts: founder,
 * offices, partner status, project count, countries, rating.
 */

export type ValueKey = "clarity" | "ownership" | "transparency" | "simplicity" | "speed" | "craft" | "partnership";
export type Value = { key: ValueKey; title: string; tag: string; body: string };
export type Priority = { key: "people" | "clarity" | "door" | "words"; text: string };
/** One row on a personal page: icon tile, title, one-line sub, link. */
export type ProfileLink = { icon: "infoloop" | "opsdeck" | "garagezone" | "loopiq" | "verko" | "work" | "contact" | "globe"; title: string; sub: string; href: string };
export type ProfileSocial = {
  kind: "linkedin" | "x" | "github" | "instagram" | "whatsapp" | "mail" | "phone";
  href: string;
  label: string;
  /** True only for the person's own profile URLs (feeds Person.sameAs). Company pages stay false. */
  personal?: boolean;
  /*
   * The icon row follows 7span.com/kaushal: LinkedIn, X, WhatsApp, Call, Email.
   * Theirs runs WhatsApp and Call off one personal mobile (tel:+919724515451 /
   * wa.me/919724515451). We have no personal mobiles yet, so all three people
   * carry the published sales line (+91 97261 81000) for both, the same way the
   * company LinkedIn and X stand in for personal profiles. Two things to fix
   * when the real details arrive: swap in each person's own number, and CONFIRM
   * THE NUMBER IS ACTUALLY ON WHATSAPP, because wa.me sends a visitor to an
   * "invalid number" screen if it is not.
   */
};
/**
 * Personal page (7Span: 7span.com/kaushal, the page their QR codes open).
 * A standalone card: photo + tags on ink, name, role, bio, a row of contact
 * icons, a list of link rows, three photo slots. Lives at /<slug>.
 */
export type Profile = {
  slug: string;
  tags: string[];
  bio: string;
  socials: ProfileSocial[];
  links: ProfileLink[];
  photoAlts: string[];
  seo: { title: string; description: string };
};
export type TeamMember = {
  name: string;
  role: string;
  /** Marks the founder for the Organization schema (role titles can change). */
  founder?: boolean;
  /** Personal LinkedIn and X profile URLs, shown as icons on the team card. */
  linkedin?: string;
  x?: string;
  /** Personal page at /<profile.slug>; the team card's "personal page" icon and name link there. */
  profile?: Profile;
  /** Optional: ISO country of the person's base, shows a small flag under the role. Off by default (Nimit's call, 2026-08-17). */
  country?: "in" | "us";
  photo?: string;
  /** True until a real name, role and photo are supplied. */
  placeholder?: boolean;
};

export type AboutContent = {
  story: { h1: string; sub: string; paragraphs: string[]; photoAlt: string };
  about: { h2: string; paragraphs: string[] };
  band: [string, string];
  vision: { h2: string; statement: string; body: string };
  values: { h2: string; sub: string; items: Value[] };
  life: { h2: string; sub: string; button: { label: string; href: string } };
  priorities: { h2: string; sub: string; items: Priority[] };
  team: { h2: string; sub: string; members: TeamMember[] };
  closing: { band: [string, string]; statement: string };
  seo: { title: string; description: string };
};

export const ABOUT: AboutContent = {
  story: {
    h1: "Our story",
    sub: "One team on a simple mission: build it, then run it.",
    paragraphs: [
      "Infoloop started with one observation. Most software vendors build a project, hand it over and leave. The business is then left to keep it running on its own. We wanted to be the team that stays.",
      "So Nimit Kaneria set up Infoloop, with its head office in Surat, India, and a second office in the United States. Today the same team that plans and builds your software is the team that monitors, fixes and improves it every month. Software we built runs in 6 countries, across 50+ projects, and every new client still speaks to the founder on the first call.",
    ],
    photoAlt: "Photo slot: the Infoloop team together at the Surat office",
  },
  about: {
    h2: "About",
    paragraphs: [
      "Infoloop is a software development and IT consulting company. We design, build and run custom software, AI assistants and automation, and Webflow and Shopify websites, mostly for manufacturing, healthcare, SaaS and biorenewables companies in the United States.",
      "We work from two places: our head office in Surat, India, and our office in Dover, Delaware. To us it is one team, one price and one clear report every month, wherever you are.",
      "The way we work is simple. Plain words instead of jargon. A fixed price in writing before we start. Software that runs on real data, not demos. And after launch we stay: we keep it running, fix issues fast and keep improving it. You keep the code, the accounts and the data. We are certified Webflow and Shopify Partners, and our clients rate us 4.8 on average across Trustpilot, Google, Clutch and GoodFirms.",
    ],
  },
  band: ["Build it. Launch it.", "Run it."],
  vision: {
    h2: "Our vision",
    statement: "We see a future where every growing business\nruns on software that simply works.",
    body: "We help business owners and their teams get there with clear advice, software built for their real work, and a team that stays to run it long after launch.",
  },
  values: {
    h2: "7 values we hold",
    sub: "The guiding light of how we work.",
    items: [
      { key: "clarity", title: "Clarity", tag: "Plain words, real numbers", body: "We say it like a person and back every claim with a number. No jargon, no surprises, and you always know what is happening with your project." },
      { key: "ownership", title: "Ownership", tag: "We run what we build", body: "Most vendors hand over and leave. We stay. The team that builds your software is the team that monitors, fixes and improves it every month." },
      { key: "transparency", title: "Transparency", tag: "A price in writing, before we start", body: "You get a fixed scope and a fixed price before any work begins, and a short report every month that shows what changed and why." },
      { key: "simplicity", title: "Simplicity", tag: "The simplest thing that works", body: "We build what your team will actually use, on the tools you already have where we can. Simple software is faster to ship and easier to run." },
      { key: "speed", title: "Speed", tag: "Live in weeks, not quarters", body: "Planning takes about a week and most projects are live in 4 to 8 weeks. Small steps, real users early, and fewer things that go wrong." },
      { key: "craft", title: "Craft", tag: "Details done properly", body: "We care about the small things: how a screen loads, how a report reads, how a mistake is caught. That is what makes software feel reliable." },
      { key: "partnership", title: "Partnership", tag: "Your goals are the brief", body: "We are measured on the outcome you care about, not on hours. Fewer errors, faster work, more sales. That is the only score that counts." },
    ],
  },
  life: {
    h2: "Discover life @ Infoloop",
    sub: "See how the team works, learns and celebrates.",
    button: { label: "Life @ Infoloop", href: "https://www.linkedin.com/company/infoloop-technologies/" },
  },
  priorities: {
    h2: "Core priorities",
    sub: "Do the work properly, keep it running,\nand keep the people happy on both sides.",
    items: [
      { key: "people", text: "Clients and team are the real backbone." },
      { key: "clarity", text: "No politics. More clarity for everyone." },
      { key: "door", text: "Open door policy, and we mean it for everyone." },
      { key: "words", text: "Plain words, real numbers, always." },
    ],
  },
  team: {
    h2: "Our team",
    sub: "The people who plan, build and run the software you read about on this site.",
    members: [
      {
        name: "Nimit Kaneria",
        role: "Chief Executive Officer",
        founder: true,
        // Personal LinkedIn and X URLs pending from Nimit; the company profiles stand in until then.
        linkedin: "https://www.linkedin.com/company/infoloop-technologies/",
        x: "https://x.com/infoloop",
        profile: {
          slug: "nimit",
          tags: ["Founder and CEO", "Build and run", "Plain words", "Fixed price in writing", "On every first call"],
          bio: "I started Infoloop to be the team that stays. Most software vendors build a project, hand it over and leave; we design and build the software, launch it, and then keep running and improving it every month. I still talk to every new client personally on the first call, and I keep the promise simple: one team, one price in writing, and a clear report every month. If you run a manufacturing, healthcare, SaaS or biorenewables business and your software is slowing you down, I would like to hear about it.",
          socials: [
            { kind: "linkedin", href: "https://www.linkedin.com/company/infoloop-technologies/", label: "Infoloop on LinkedIn" },
            { kind: "x", href: "https://x.com/infoloop", label: "Infoloop on X" },
            { kind: "whatsapp", href: "https://wa.me/919726181000", label: "Message on WhatsApp" },
            { kind: "phone", href: "tel:+919726181000", label: "Call" },
            { kind: "mail", href: "mailto:hi@infoloop.co", label: "Email" },
          ],
          links: [
            { icon: "infoloop", title: "Founded Infoloop", sub: "We build software, then we run it", href: "/about" },
            { icon: "opsdeck", title: "Building: OpsDeck", sub: "Attendance software for manufacturing", href: "/products/opsdeck" },
            { icon: "garagezone", title: "Building: GarageZone", sub: "Garage management software for workshops", href: "/products/garagezone" },
            { icon: "loopiq", title: "Building: LoopIQ", sub: "Learning and testing platform for training providers", href: "/products/loopiq" },
            { icon: "verko", title: "Building: Verko", sub: "AI governance and compliance platform", href: "/products/verko" },
            { icon: "work", title: "Our work", sub: "Case studies with measured results", href: "/work" },
            { icon: "contact", title: "Start a conversation", sub: "A price in writing within a week", href: "/contact" },
          ],
          photoAlts: ["Photo slot: the Infoloop team at work", "Photo slot: the team together", "Photo slot: a client visit"],
          seo: { title: "Nimit Kaneria | Founder and CEO of Infoloop", description: "Nimit Kaneria founded Infoloop, the team that builds software and then runs it. Products, work and how to get in touch, on one page." },
        },
      },
      {
        name: "Rahul Kaneria",
        role: "Chief Technical Officer",
        linkedin: "https://www.linkedin.com/company/infoloop-technologies/",
        x: "https://x.com/infoloop",
        profile: {
          slug: "rahul",
          tags: ["CTO", "Build and run", "Real data, not demos", "Fixes fast"],
          bio: "Rahul Kaneria is the Chief Technical Officer at Infoloop, the team that designs and builds software and then stays to run it. Custom software, AI assistants and automation, and Webflow and Shopify websites, live in 6 countries across 50+ projects, with a fixed price in writing and a clear report every month.",
          socials: [
            { kind: "linkedin", href: "https://www.linkedin.com/company/infoloop-technologies/", label: "Infoloop on LinkedIn" },
            { kind: "x", href: "https://x.com/infoloop", label: "Infoloop on X" },
            { kind: "whatsapp", href: "https://wa.me/919726181000", label: "Message on WhatsApp" },
            { kind: "phone", href: "tel:+919726181000", label: "Call" },
            { kind: "mail", href: "mailto:hi@infoloop.co", label: "Email" },
          ],
          links: [
            { icon: "infoloop", title: "About Infoloop", sub: "We build software, then we run it", href: "/about" },
            { icon: "opsdeck", title: "Building: OpsDeck", sub: "Attendance software for manufacturing", href: "/products/opsdeck" },
            { icon: "garagezone", title: "Building: GarageZone", sub: "Garage management software for workshops", href: "/products/garagezone" },
            { icon: "loopiq", title: "Building: LoopIQ", sub: "Learning and testing platform for training providers", href: "/products/loopiq" },
            { icon: "verko", title: "Building: Verko", sub: "AI governance and compliance platform", href: "/products/verko" },
            { icon: "work", title: "Our work", sub: "Case studies with measured results", href: "/work" },
            { icon: "contact", title: "Start a conversation", sub: "A price in writing within a week", href: "/contact" },
          ],
          photoAlts: ["Photo slot: the Infoloop team at work", "Photo slot: the team together", "Photo slot: a client visit"],
          seo: { title: "Rahul Kaneria | Chief Technical Officer, Infoloop", description: "Rahul Kaneria is the Chief Technical Officer at Infoloop, the team that builds software and then runs it. Products, work and how to get in touch, on one page." },
        },
      },
      {
        name: "Riya Kaneria",
        role: "Managing Partner",
        linkedin: "https://www.linkedin.com/company/infoloop-technologies/",
        x: "https://x.com/infoloop",
        profile: {
          slug: "riya",
          tags: ["Managing Partner", "One team, one price", "Clear report every month"],
          bio: "Riya Kaneria is Managing Partner at Infoloop, the team that designs and builds software and then stays to run it. One team from the first call to launch, a price in writing before any work begins, and a clear report every month after it. Clients rate Infoloop 4.8 on average across Trustpilot, Google, Clutch and GoodFirms.",
          socials: [
            { kind: "linkedin", href: "https://www.linkedin.com/company/infoloop-technologies/", label: "Infoloop on LinkedIn" },
            { kind: "x", href: "https://x.com/infoloop", label: "Infoloop on X" },
            { kind: "whatsapp", href: "https://wa.me/919726181000", label: "Message on WhatsApp" },
            { kind: "phone", href: "tel:+919726181000", label: "Call" },
            { kind: "mail", href: "mailto:hi@infoloop.co", label: "Email" },
          ],
          links: [
            { icon: "infoloop", title: "About Infoloop", sub: "We build software, then we run it", href: "/about" },
            { icon: "opsdeck", title: "Building: OpsDeck", sub: "Attendance software for manufacturing", href: "/products/opsdeck" },
            { icon: "garagezone", title: "Building: GarageZone", sub: "Garage management software for workshops", href: "/products/garagezone" },
            { icon: "loopiq", title: "Building: LoopIQ", sub: "Learning and testing platform for training providers", href: "/products/loopiq" },
            { icon: "verko", title: "Building: Verko", sub: "AI governance and compliance platform", href: "/products/verko" },
            { icon: "work", title: "Our work", sub: "Case studies with measured results", href: "/work" },
            { icon: "contact", title: "Start a conversation", sub: "A price in writing within a week", href: "/contact" },
          ],
          photoAlts: ["Photo slot: the Infoloop team at work", "Photo slot: the team together", "Photo slot: a client visit"],
          seo: { title: "Riya Kaneria | Managing Partner, Infoloop", description: "Riya Kaneria is Managing Partner at Infoloop, the team that builds software and then runs it. Products, work and how to get in touch, on one page." },
        },
      },
    ],
  },
  closing: {
    band: ["We build.", "We run."],
    statement: "Clear advice where others add complexity. We help businesses build, modernize and run the software they depend on. Whatever your challenge, stage or goal, we build it and we run it.",
  },
  seo: {
    title: "About Infoloop: the team that builds and runs your software",
    description: "Infoloop builds and runs custom software, AI assistants and Webflow and Shopify websites from Surat, India and Dover, US. Meet the founder, values and team.",
  },
};
