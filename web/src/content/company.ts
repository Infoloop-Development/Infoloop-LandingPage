/**
 * The three remaining Company pages: /careers, /testimonials and
 * /trust-center.
 *
 * Honesty rules for this file, because these are the three pages where it is
 * easiest to overclaim:
 * - Careers lists real openings only. `CAREERS.roles` is empty until Nimit
 *   adds one, and the page then shows the "nothing open" panel instead of
 *   pretending. No benefits are listed that have not been confirmed.
 * - Testimonials carries only the four client quotes published in work.ts,
 *   with the case study behind each one.
 * - The trust center states what is true by construction (ownership, access,
 *   agreed response times) and names what we do NOT hold. No certification is
 *   claimed. If that changes, change this file the same day.
 */

export type Role = {
  title: string;
  team: string;
  place: string;
  type: string;
  blurb: string;
  /** Where to apply. Defaults to the careers email. */
  href?: string;
};

export const CAREERS = {
  eyebrow: "Careers",
  h1: "Small team, real software, [[nothing hidden]]",
  lede: "We are a small team that builds software and then keeps it running. That shapes the job: you meet the client, you see your work used, and you are the one who fixes it on a Monday morning.",
  button: "Send us your work",
  band: ["Build it. Launch it.", "Run it."],
  life: {
    h2: "What working here is actually like",
    lede: "The same things we tell clients, from the inside.",
    items: [
      { title: "You talk to the people using it", body: "Not a spec passed down a chain. You hear the problem from the person who has it, and you see the screen they use every day." },
      { title: "You stay with what you build", body: "We run what we build, so nobody gets to ship something clever and walk away from it. It changes how carefully you work." },
      { title: "Plain words, in writing", body: "Scopes, prices and reports are written so a non-technical owner can read them. You will be asked to write that way too." },
      { title: "Small team, no politics", body: "There is no layer between you and the decision. If something is wrong, you say so, and it gets discussed rather than managed." },
    ],
  },
  how: {
    eyebrow: "How hiring works",
    h2: "Four steps, no games",
    lede: "The same process whether we are hiring an engineer, a designer or someone to run projects.",
    steps: [
      { n: "01", title: "Send us your work", body: "Code, designs, a site you shipped, a thing you fixed. A short note about what the problem was matters more than a formatted CV." },
      { n: "02", title: "A conversation, not a quiz", body: "Half an hour on what you have built and how you decided. You get to ask us the awkward questions too, and you should." },
      { n: "03", title: "A real piece of work", body: "A small task close to what the job involves, discussed together rather than marked in secret. We tell you what we are looking for before you start." },
      { n: "04", title: "An answer either way", body: "You hear back with a decision and the reason for it. Nobody is left waiting on silence." },
    ],
  },
  roles: [] as Role[],
  openings: {
    h2: "Open roles",
    lede: "Everything we are hiring for is listed here first.",
    emptyTitle: "Nothing open right now",
    emptyBody: "We hire when the work is there, not to fill a page. Send your work anyway: when something opens that fits, you are the first conversation rather than the first advert.",
    button: "Send your work",
  },
  where: {
    h2: "Where we work",
    items: [
      { title: "Surat, India", body: "Our head office, and where most of the team sits." },
      { title: "Dover, Delaware", body: "Our United States office, for clients on that side." },
    ],
  },
  cta: { h2: "Think you would fit here?", lede: "Send the work you are proudest of and one line on why it was hard. That is the whole application.", button: "Email careers" },
  seo: {
    title: "Careers at Infoloop",
    description: "Work at Infoloop: a small team that builds software and then runs it. How we hire, what the job is really like, and how to send us your work.",
  },
};

export const TESTIMONIALS = {
  eyebrow: "Testimonials",
  h1: "What clients say when the [[project is over]]",
  lede: "Every quote here comes from a project we can show you, and each one links to the case study with the numbers behind it. We do not publish a quote we cannot attach to work.",
  button: "See the work",
  band: ["Judged on what is live.", "Not on the pitch."],
  ratingsH2: "Rated by the people who paid us",
  ratingsLede: "Scores across four public review platforms, updated as they change.",
  quotesH2: "In their words",
  quotesLede: "Four clients, four projects we still run.",
  casesH2: "The work behind the words",
  casesLede: "Every quote has a case study with the measured result.",
  cta: { h2: "Want to be the next one?", lede: "Tell us the job. You get a clear recommendation, a fixed scope and a price in writing before anyone starts.", button: "Start a conversation" },
  seo: {
    title: "Client testimonials | Infoloop",
    description: "What Infoloop clients say about the software we built and still run, each quote linked to the case study and the measured result behind it.",
  },
};

export const TRUST = {
  eyebrow: "Trust center",
  h1: "How we handle your software, your data and [[your risk]]",
  lede: "The questions a careful buyer asks before signing, answered in one place. Where the answer is no, it says no.",
  button: "Ask a security question",
  band: ["Your code. Your accounts.", "Your call."],
  ownership: {
    h2: "Ownership, in your name from day one",
    lede: "The single biggest risk in hiring a software firm is what happens if you want to leave. Here is how that works with us.",
    items: [
      { title: "The code is yours", body: "It sits in your own repository and belongs to you under the agreement we sign. You do not buy it back at the end." },
      { title: "The accounts are yours", body: "Hosting, domain, platform and third-party services are in your name, paid on your card. We are users on them, not owners." },
      { title: "The data is yours", body: "Your records stay in your accounts. On request we export them in a normal format and confirm deletion of what we held." },
      { title: "You can leave", body: "Notice is written into the run arrangement. You get the instructions and a handover walkthrough whether you leave for another firm or take it in-house." },
    ],
  },
  practice: {
    h2: "How we work day to day",
    lede: "Practices, not promises. Ask us to show any of these on the call.",
    items: [
      { title: "Access is limited and reviewed", body: "People get access to what their job needs and lose it when the job changes. Access is reviewed as people join and leave a project." },
      { title: "Traffic is encrypted", body: "This website and the software we build are served over encrypted connections, and secrets live in the platform's secret storage rather than in code." },
      { title: "Changes are reviewed", body: "Work is checked by another person before it goes live, and every change is recorded, so an audit can see who changed what and when." },
      { title: "Faults have an agreed time", body: "Response times are written into your run arrangement, and the monthly report says what happened and what we fixed." },
      { title: "AI stays inside limits", body: "Where we put AI live, it has firm limits on what it may do, a record of every request and reply, a person in the loop for anything risky, and a switch that turns it off." },
      { title: "NDAs as standard", body: "We sign your NDA before the detail of a project is discussed, and we expect to." },
    ],
  },
  honest: {
    h2: "What we do not claim",
    lede: "Every security page should have this section. Ours is short and true.",
    items: [
      "We do not hold SOC 2, ISO 27001 or an equivalent certification today. If your procurement requires one, tell us on the first call so nobody wastes a month.",
      "We are not a hosting company. Your software runs on providers such as Netlify, Shopify or a cloud you choose, under their security posture as well as our practices.",
      "We do not promise a number we have not measured. The uptime we publish is for software we run, and we will show you the report behind it.",
    ],
  },
  report: {
    h2: "Found something?",
    lede: "If you believe you have found a security problem in this website or in software we run, tell us. A named person replies within one business day, and we will tell you what we did about it.",
    button: "Report it by email",
    include: {
      title: "Please include",
      items: ["What you found, in plain words", "The steps to reproduce it", "Where you saw it: the address or the screen", "How we can reach you for the answer"],
    },
  },
  cta: { h2: "Have a security questionnaire?", lede: "Send it over. We answer it ourselves rather than passing it to a form, and we tell you plainly which rows we cannot tick.", button: "Send your questionnaire" },
  seo: {
    title: "Trust center: security and ownership | Infoloop",
    description: "How Infoloop handles your code, accounts, data and risk: ownership in your name, reviewed access, agreed response times, and what we do not claim.",
  },
};
