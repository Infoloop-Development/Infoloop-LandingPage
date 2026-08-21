/**
 * Legal and utility pages: /privacy, /terms and /sitemap (7Span keeps the
 * same three in its footer). The two documents are plain-language and
 * describe what this website actually does: one contact form, one brochure
 * form, no analytics, no tracking cookies, no advertising pixels. They are
 * written to be read, not to be impressive, and they say plainly that a
 * signed agreement wins over anything here.
 *
 * These are drafts for a lawyer to review before launch (the old site
 * carried the same caveat). Facts here must stay true to the build: if the
 * site ever gains analytics, a cookie banner or a CRM, update the "What we
 * collect" and "What we do not do" sections the same day.
 */

/**
 * Set at build time by TRACKING_DISCLOSED. See the "What we do not do"
 * section below and web/docs/TRACKING.md: the privacy copy has to change in
 * the same deploy that turns a tracker on, and the build enforces it.
 */
const TRACKING_DISCLOSED = import.meta.env.TRACKING_DISCLOSED === "true";


export type LegalSection = { h2: string; paragraphs?: string[]; bullets?: string[] };
export type LegalDoc = {
  eyebrow: string;
  h1: string;
  lede: string;
  updated: string;
  contentsLabel: string;
  sections: LegalSection[];
  seo: { title: string; description: string };
};

const UPDATED = "18 August 2026";

export const PRIVACY: LegalDoc = {
  eyebrow: "Legal",
  h1: "Privacy policy",
  lede: "What we collect when you use this website, why we collect it, and how to have it removed. In plain words, because you should not need a lawyer to read it.",
  updated: UPDATED,
  contentsLabel: "On this page",
  sections: [
    {
      h2: "Who we are",
      paragraphs: [
        "Infoloop designs, builds and runs software for businesses. We work from our head office in Surat, India, and our office in Dover, Delaware. This policy covers infoloop.co and the forms on it. It does not cover software we build and run for a client, which is governed by the agreement we sign with that client.",
        "If you want anything on this page explained, or you want your details removed, email hi@infoloop.co and a named person replies within one business day.",
      ],
    },
    {
      h2: "What we collect",
      paragraphs: ["Only what you type in, plus the basic technical record every website keeps."],
      bullets: [
        "The contact form: your name, email, phone number, company, country, what you are looking for, what you tell us about the project, the budget range and timeline you pick, and how you heard about us.",
        "The brochure form: your name and work email, so we can send the brochure and answer follow-up questions.",
        "Server records kept by our host: your IP address, browser type, the pages requested and the time. These are standard hosting logs, used to keep the site up and safe.",
      ],
    },
    {
      h2: "What we do not do",
      /*
       * These two bullets are a factual claim about the build, and they are
       * TRUE ONLY WHILE NO TRACKER IS CONFIGURED. web/src/components/
       * Analytics.astro refuses to build if a PUBLIC_* tracking variable is
       * set without TRACKING_DISCLOSED=true, which is what swaps these
       * bullets for the disclosing version below. Do not edit one without
       * the other. See web/docs/TRACKING.md.
       */
      bullets: TRACKING_DISCLOSED
        ? [
            "No advertising pixels. We do not run retargeting, and nothing here follows you to other websites.",
            "We do not sell, rent or trade your details, and we do not add you to a newsletter you did not ask for.",
          ]
        : [
            "No tracking cookies. This website sets no cookies for advertising or profiling.",
            "No advertising pixels and no third-party analytics that follow you around the web.",
            "We do not sell, rent or trade your details, and we do not add you to a newsletter you did not ask for.",
          ],
    },
    ...(TRACKING_DISCLOSED
      ? [
          {
            h2: "Website analytics",
            paragraphs: [
              "We measure how the website is used so we can see which pages help people and which do not. This is about pages, not people: we look at totals, not at what any one visitor did.",
            ],
            bullets: [
              "What is collected: pages viewed, how you arrived (for example a search engine or a link), rough location from your IP address at country or city level, and the type of device and browser.",
              "What is not collected: your name, email or phone number, unless you type them into a form yourself.",
              "You can opt out with any browser setting or extension that blocks analytics, and the website works exactly the same.",
            ],
          },
        ]
      : []),
    {
      h2: "Why we use it",
      bullets: [
        "To reply to you, and to ask the questions we need in order to understand the job.",
        "To prepare a scope and a price for you, and to keep a record of what we agreed.",
        "To send the brochure or the document you asked for.",
        "To keep the website working, secure and free of abuse.",
      ],
    },
    {
      h2: "The basis we rely on",
      paragraphs: [
        "When you send us a form we rely on your consent, which you can withdraw at any time by emailing us. When we reply to a business enquiry, keep a record of an agreement, or protect the site from abuse, we rely on our legitimate interest in running the business. We do not make automated decisions about you.",
      ],
    },
    {
      h2: "Who else sees it",
      paragraphs: [
        "The people at Infoloop who need it to answer you. Beyond that, only the suppliers who run the parts of this website: our hosting provider, and the tool that delivers form messages to our inbox. They process the data on our instructions and for no other purpose.",
        "We hand over data to anybody else only when the law requires it. If we ever change a supplier in a way that changes where your data sits, this page is updated with the date it took effect.",
      ],
    },
    {
      h2: "How long we keep it",
      paragraphs: [
        "Enquiries are kept while the conversation is live and for as long as we may reasonably need the record of it. If a project follows, the agreement covers what happens to project data. If nothing follows, ask us and we will delete it.",
      ],
    },
    {
      h2: "Your choices",
      bullets: [
        "Ask what we hold about you, and get a copy.",
        "Ask us to correct anything wrong.",
        "Ask us to delete it, unless we are required to keep it.",
        "Ask us to stop contacting you, which we do straight away.",
      ],
    },
    {
      h2: "How we look after it",
      paragraphs: [
        "Traffic to this site is encrypted. Access to form messages is limited to the people who need it. For software we build, code and accounts are in the client's name from day one, and access is reviewed as people join and leave.",
      ],
    },
    {
      h2: "Children",
      paragraphs: ["This website is aimed at businesses, not children, and we do not knowingly collect details from anyone under 16. If you believe a child has sent us something, email us and we will delete it."],
    },
    {
      h2: "Changes to this policy",
      paragraphs: ["If this policy changes, the new version appears here with the date it took effect. Material changes to how we handle enquiry data will also be mentioned in our reply to you."],
    },
    {
      h2: "Contact",
      paragraphs: ["Email hi@infoloop.co, or write to Infoloop, Suite 1101, Rajhans Skylar, Surat 395007, Gujarat, India, or 8 The Green, Dover, Delaware 19901, United States."],
    },
  ],
  seo: {
    title: "Privacy policy | Infoloop",
    description: "What Infoloop collects when you use infoloop.co, why, who sees it and how to have it deleted. No tracking cookies, no advertising pixels, no selling data.",
  },
};

export const TERMS: LegalDoc = {
  eyebrow: "Legal",
  h1: "Terms of use",
  lede: "The terms that apply to this website and to talking to us about work. What we agree in a signed proposal always comes first.",
  updated: UPDATED,
  contentsLabel: "On this page",
  sections: [
    {
      h2: "Using this website",
      paragraphs: [
        "You are welcome to read, print and share these pages. Please use the site lawfully, and do not try to break, copy wholesale or overload it.",
        "Everything here is information, not an offer. Nothing on this website forms a contract on its own. Work starts only when we have agreed a written scope, a date and a price and you have said yes to it.",
      ],
    },
    {
      h2: "What we sell",
      paragraphs: [
        "We design and build software, websites and stores, and afterwards we can keep running them for a monthly fee. Every project is quoted on its own. The price, what is included, what is deliberately left out and the delivery date are put in writing before any work begins.",
        "If the work changes while we are building, we price that change in writing and you approve it before we do it. Nothing appears on an invoice that you have not agreed first.",
      ],
    },
    {
      h2: "Quotes, invoices and stopping",
      bullets: [
        "A quote is valid for the period stated on it. After that we may need to look again.",
        "A monthly run arrangement is billed monthly and can be ended with the notice written into it. You are not tied in beyond that notice.",
        "If an invoice is unpaid we may pause work, after telling you first, until it is settled.",
      ],
    },
    {
      h2: "What is yours and what is ours",
      paragraphs: [
        "Work we build for you is yours under the agreement we sign. Code, data and accounts are in your name, and you keep them if you leave. We would rather keep you because the work is good than because leaving is hard.",
        "The Infoloop name, mark, tagline and the content of this website are ours. Our brand assets may be used within the rules on the brand assets page. Our own products, such as OpsDeck, GarageZone, LoopIQ and Verko, are licensed to you rather than sold, on the terms of the agreement that covers them.",
      ],
    },
    {
      h2: "Other companies' services",
      paragraphs: [
        "Some work involves services we do not own, such as Webflow, Shopify, hosting or a payment provider. Those services have their own terms and their own prices, which you agree with them. We tell you which ones a project depends on before you commit to it.",
      ],
    },
    {
      h2: "What we promise, and what we do not",
      paragraphs: [
        "We do the work carefully and to the standard set out in your agreement. That agreement, not this page, carries the warranties, the response times and the limits of liability for your project.",
        "This website itself is provided as it is. We keep it accurate, but we do not warrant that every page is free of error, and we are not liable for a decision made only on the strength of a web page. Case study figures are the measured results of that project and are not a promise of the same result for you.",
      ],
    },
    {
      h2: "Privacy",
      paragraphs: ["How we handle what you send us is set out in the privacy policy. Please read it alongside these terms."],
    },
    {
      h2: "Which document wins",
      paragraphs: ["If anything on this page conflicts with a proposal, order or agreement signed by both of us, the signed document takes precedence for that work."],
    },
    {
      h2: "Changes and contact",
      paragraphs: ["We may update these terms. The current version is always here with the date it took effect. Questions go to hi@infoloop.co, and a named person replies within one business day."],
    },
  ],
  seo: {
    title: "Terms of use | Infoloop",
    description: "The terms for using infoloop.co and for working with Infoloop: quotes in writing, changes priced before they happen, and your code and accounts in your name.",
  },
};

export const SITEMAP = {
  eyebrow: "Sitemap",
  h1: "Every page on this site",
  lede: "Grouped the way the site is. If a page is listed here it is live, and every link goes straight to it.",
  seo: {
    title: "Sitemap | Infoloop",
    description: "Every live page on infoloop.co in one list: solutions, services, industries, hire talent, products, work, blog, company and legal pages.",
  },
};
