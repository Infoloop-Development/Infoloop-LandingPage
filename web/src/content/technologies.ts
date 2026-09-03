/**
 * /technologies: 7Span keeps a Technologies page in its Company group, so we
 * do too. Ours lists only what we actually build with (the same list the
 * service pages publish in "Technologies we use"), grouped the way we hire,
 * with a link from each group to the people you can hire for it.
 *
 * Rule for this file: a technology belongs here only if we would put a
 * client's production work on it today. It is a claim, not a wish list.
 */
import type { PageSeo } from "./seo-types";

export type TechItem = {
  name: string;
  /** One line a business owner understands: what this is for, not what it is. */
  what: string;
  /** Short mark shown in the tile until real logos are cleared. */
  badge: string;
  /** The hire page for this technology, when there is one. */
  hire?: string;
};

export type TechGroup = {
  key: string;
  label: string;
  h2: string;
  lede: string;
  items: TechItem[];
};

export const TECHNOLOGIES = {
  eyebrow: "Technologies",
  h1: "The tools we build on, and [[why each one]]",
  sub: "Ordinary, widely used tools. On purpose.",
  lede: "We build with technologies that plenty of teams know, so your software is never trapped with the people who wrote it. Everything on this page is something we put into production and then keep running.",
  button: "Talk about your stack",
  band: ["Ordinary tools, used well.", "Nothing you cannot hand over."],
  panel: {
    h2: "What we build with",
    lede: "Six groups, and the people you can hire for each.",
  },
  choose: {
    h2: "How we choose a technology",
    lede: "The interesting choice is rarely the right one. These are the questions we ask before anything is written.",
    items: [
      { title: "Could another team take this over?", body: "We use tools that are widely known and well documented, so your software is not tied to us. Code and accounts are in your name from day one, and we write the instructions to match." },
      { title: "Is it boring enough to run for years?", body: "We are the ones watching it after launch, so we favour the version that is stable and well supported over the one released last month." },
      { title: "Does it fit the job, or just our habits?", body: "A website that has to rank, a store that has to sell and a plant floor screen are different jobs. Sometimes the honest answer is a ready-made product, and we say so on the call." },
      { title: "What does it cost you later?", body: "Licences, hosting and the price of a change in two years are part of the recommendation, in writing, before you commit." },
    ],
  },
  groups: [
    {
      key: "frontend",
      label: "Frontend",
      h2: "Frontend",
      lede: "The screens people use: your website, your customer portal, the software your staff open every morning.",
      items: [
        { name: "JavaScript", what: "The language nearly every website runs on, from a menu opening to a total updating as you type.", badge: "JS", hire: "/hire-javascript-developers" },
        { name: "TypeScript", what: "JavaScript with type checks, so a whole class of mistakes is caught before your customers meet it.", badge: "TS", hire: "/hire-typescript-developers" },
        { name: "React", what: "The library we use most for screens that update as data changes, from dashboards to checkouts.", badge: "Re", hire: "/hire-react-developers" },
        { name: "Next.js", what: "React with pages that load fast and can be found by search engines. This website is built on it.", badge: "Nx", hire: "/hire-nextjs-developers" },
        { name: "Vue.js", what: "An alternative to React, common in teams that value a gentler learning curve for their own developers.", badge: "Vue", hire: "/hire-vue-developers" },
        { name: "Nuxt.js", what: "Vue with the same page speed and search advantages Next.js gives React.", badge: "Nu", hire: "/hire-nuxt-developers" },
      ],
    },
    {
      key: "backend",
      label: "Backend and APIs",
      h2: "Backend and APIs",
      lede: "The half nobody sees: records, logins, payments, and the connections to the other tools you already pay for.",
      items: [
        { name: "Node.js", what: "JavaScript running on a server, so the same people can work on both halves of your software.", badge: "No", hire: "/hire-nodejs-developers" },
        { name: "NestJS", what: "A tidy structure for larger Node projects, which keeps a growing product from turning into a maze.", badge: "Ne", hire: "/hire-nestjs-developers" },
        { name: "Laravel", what: "A mature PHP framework we use for business software that has to be reliable rather than fashionable.", badge: "La", hire: "/hire-laravel-developers" },
        { name: "PHP", what: "Still behind a large share of the web. We take on existing PHP software as well as writing new.", badge: "PHP", hire: "/hire-php-developers" },
      ],
    },
    {
      key: "mobile",
      label: "Mobile",
      h2: "Mobile",
      lede: "Apps for phones and tablets, for staff on the floor or customers in their pocket.",
      items: [
        { name: "Flutter", what: "One codebase that ships to both phones, which suits a first app with a budget to respect.", badge: "Fl", hire: "/hire-flutter-developers" },
        { name: "React Native", what: "Both phones from the web skills your team may already have, so one group can cover more ground.", badge: "RN", hire: "/hire-react-native-developers" },
        { name: "Swift", what: "Apple's own language, for an iPhone app that has to feel exactly right.", badge: "Sw", hire: "/hire-swift-developers" },
      ],
    },
    {
      key: "cms",
      label: "CMS and web",
      h2: "CMS and web",
      lede: "Websites your marketing person can edit without ringing us.",
      items: [
        { name: "Webflow", what: "Our default for marketing sites: fast, built to rank, and editable by your team. We are certified Webflow Partners.", badge: "Wf", hire: "/hire-webflow-developers" },
        { name: "WordPress", what: "The most common website platform there is. We repair, secure and rebuild what you already have on it.", badge: "WP", hire: "/hire-wordpress-developers" },
      ],
    },
    {
      key: "ecommerce",
      label: "eCommerce",
      h2: "eCommerce",
      lede: "Stores for the public and for trade buyers, connected to stock, accounts and delivery.",
      items: [
        { name: "Shopify", what: "Where we build and rebuild stores. We are certified Shopify Partners, and we run the store after launch.", badge: "Sh", hire: "/hire-shopify-developers" },
      ],
    },
    {
      key: "design",
      label: "Design",
      h2: "Design",
      lede: "The drawing before the building, and the parts library that keeps a product tidy as it grows.",
      items: [{ name: "Figma", what: "Where screens are designed and agreed, so you approve a real layout before anyone writes code.", badge: "Fig", hire: "/hire-figma-designers" }],
    },
  ] as TechGroup[],
  cta: {
    h2: "Not sure which of these you need?",
    lede: "Tell us the job. We will tell you what we would build it with, what it costs to run, and when a ready-made product would serve you better.",
    button: "Ask for a recommendation",
  },
  seo: {
    title: "Technologies we build with | Infoloop",
    description: "The tools Infoloop puts into production and then runs: React, Next.js, Vue, Node, NestJS, Laravel, Flutter, Swift, Webflow, WordPress, Shopify and Figma.",
  } as PageSeo,
};
