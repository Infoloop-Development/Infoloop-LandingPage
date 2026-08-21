/**
 * Blog index copy, 7Span's blog page adapted ("Our Knowledge Hub" /
 * "Insights and Resources to Help Your Business Grow" / "Keep Exploring" /
 * "Scroll Down to Discover Insights and Ideas." / "Search Blog" /
 * "Top Categories" / "All Articles" / "Load More").
 */
export type BlogIndex = {
  h1: string;
  lede: string;
  exploreH2: string;
  exploreSub: string;
  searchPlaceholder: string;
  categoriesLabel: string;
  allLabel: string;
  loadMore: string;
  empty: string;
  /** Mid-article card on every post (7Span "Not sure if you're solving the right problem?"). */
  articleCta: { h3: string; body: string; button: { label: string; href: string } };
  moreH2: string;
  moreSub: string;
  seo: { title: string; description: string };
};

export const BLOG: BlogIndex = {
  h1: "Our knowledge hub",
  lede: "Insights and resources to help your business grow.",
  exploreH2: "Keep exploring",
  exploreSub: "Scroll down to discover insights and ideas.",
  searchPlaceholder: "Search blog",
  categoriesLabel: "Top categories",
  allLabel: "All articles",
  loadMore: "Load more",
  empty: "No article matches that yet. Clear the search or pick another category.",
  articleCta: {
    h3: "Not sure you are solving the right problem?",
    body: "Infoloop runs a 30-minute call before any build, then gives you a plan and a price in writing.",
    button: { label: "Talk to our experts", href: "/contact" },
  },
  moreH2: "More",
  moreSub: "An interesting read? Here is more related to it.",
  seo: {
    title: "Blog: insights on software, AI and operations | Infoloop",
    description: "Plain-English articles from Infoloop on custom software, AI in production, attendance and payroll, Webflow SEO and running software after launch.",
  },
};
