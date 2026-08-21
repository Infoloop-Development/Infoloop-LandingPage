/**
 * The three "All …" hub pages the menu links to: /services, /industries and
 * /hire. Each one lists everything in its group, in the same grouping the
 * menu uses, and every card is generated from the page it links to, so a hub
 * can never advertise a page that does not exist.
 *
 * Only the hero copy and the group blurbs live here. Card titles and lines
 * come from the detail pages themselves (services from the Solutions group
 * offer list, industries from their H1, roles from their sub line).
 */

export type Hub = {
  slug: "services" | "industries" | "hire";
  eyebrow: string;
  h1: string;
  lede: string;
  button: string;
  band: [string, string];
  groupsH2: string;
  groupsLede: string;
  cta: { h2: string; lede: string; button: string };
  seo: { title: string; description: string };
};

export const HUBS: Hub[] = [
  {
    slug: "services",
    eyebrow: "Services",
    h1: "Everything we build, grow, [[transform and advise on]]",
    lede: "Fifteen services in four groups. Something new, more out of what you already run, old software made safe, or a straight answer before you spend. Each one is priced in writing before work starts, and we can keep running it afterwards.",
    button: "Tell us what you need",
    band: ["One team to build it.", "The same team to run it."],
    groupsH2: "The four groups",
    groupsLede: "Pick the one that sounds like your problem. If none of them do, the call sorts it out in half an hour.",
    cta: { h2: "Not sure which service you need?", lede: "Describe the problem in plain words. We will tell you which of these fits, what it would cost, and when the honest answer is to buy something instead.", button: "Book a 30-minute call" },
    seo: { title: "Services: build, grow, transform, consulting | Infoloop", description: "All 15 Infoloop services in four groups: build something new, get more from what you run, modernize old software and AI, or get advice before you spend." },
  },
  {
    slug: "industries",
    eyebrow: "Industries",
    h1: "The industries we know [[well enough to argue with you]]",
    lede: "Fourteen sectors, each with its own page: the problems we keep seeing there, the software we build for them, and the measured results where we have them. Where we have not worked in your sector yet, the page says so.",
    button: "Talk about your sector",
    band: ["Built for your sector.", "Run by us."],
    groupsH2: "Where we work",
    groupsLede: "Grouped the way the menu is. Every page is written for the person running that business, not for a procurement form.",
    cta: { h2: "Your sector not listed?", lede: "The work travels further than the label does. Tell us what the job is and we will say plainly whether we have done something close to it.", button: "Ask about your sector" },
    seo: { title: "Industries we build software for | Infoloop", description: "Fourteen industry pages from Infoloop: manufacturing, automotive, energy, SaaS, ecommerce, education and more, with the problems and measured results." },
  },
  {
    slug: "hire",
    eyebrow: "Hire talent",
    h1: "Hire experienced people, [[in weeks not months]]",
    lede: "Seventeen roles across frontend, backend, mobile, CMS, ecommerce and design. You meet every person before they start, they work in your tools and to your rules, and the job, the dates and the price go in writing first.",
    button: "Tell us what is stuck",
    band: ["Experienced people in weeks.", "Not months of hiring."],
    groupsH2: "Roles you can hire",
    groupsLede: "By discipline, the way you would build the team. Each page covers what that person does, how hiring works and what it costs.",
    cta: { h2: "Need a role that is not listed?", lede: "Tell us the work and the tools it sits in. If we do not have the right person, we will say so rather than send you the nearest one.", button: "Ask about a role" },
    seo: { title: "Hire developers and designers | Infoloop", description: "Hire experienced developers and designers from Infoloop in 1 to 2 weeks: React, Next.js, Node, Laravel, Flutter, Swift, Webflow, Shopify, Figma and more." },
  },
];
