/**
 * Contact page copy, 7Span's contact page adapted: hero (H1 + line + photo),
 * "Schedule a meeting" card with the form, "Up for a quick connect?" band,
 * "A glimpse into our expertise" brochure section.
 */
export const CONTACT = {
  h1: "Dedicated to guiding you to the [[next level]].",
  lede: "We are ready to transform your brand or product from great to incredible. Share your project details to kick-start the business conversation.",
  photoAlt: "Photo slot: the Infoloop team",
  form: {
    h2: "Schedule a meeting",
    sub: "Leave us a little info and we will get in touch within one business day.",
    submit: "Submit now",
    success: { h3: "Thanks. We will be in touch within one business day.", body: "You will hear from the person who would run your project, not a sales desk." },
    countries: ["United States", "Canada", "United Kingdom", "India", "United Arab Emirates", "Australia", "Germany", "Other"],
    lookingFor: [
      "Custom applications",
      "Enterprise applications",
      "eCommerce and Shopify",
      "Website on Webflow",
      "AI and automation",
      "Legacy app modernization",
      "Application maintenance and support",
      "IT staff augmentation",
      "OpsDeck (attendance)",
      "GarageZone (garage management)",
      "LoopIQ (learning and testing)",
      "Verko (AI compliance)",
      "Something else",
    ],
    budgets: ["Under $10k", "$10k to $25k", "$25k to $50k", "$50k to $100k", "$100k and above", "Not sure yet"],
    timelines: ["As soon as possible", "Within 1 to 3 months", "In 3 to 6 months", "Just exploring"],
  },
  quick: {
    h2: "Up for a quick connect?",
    sub: "Our sales team is here to simplify your next step.",
  },
  brochure: {
    h2: "A glimpse into our expertise",
    sub: "Get a closer look at what we build and run, on one page.",
    button: "Download brochure",
    file: "/downloads/infoloop-brochure.pdf",
    gate: { h3: "Where should we send it?", body: "Leave your name and work email and the brochure opens straight away.", submit: "Get the brochure" },
  },
  seo: {
    title: "Contact Infoloop: book a call or send a project brief",
    description: "Tell Infoloop what you want to build, modernize or run. A reply within one business day, a 30-minute call, then a price in writing before anyone starts.",
  },
};
