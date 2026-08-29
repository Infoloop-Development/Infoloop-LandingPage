/**
 * /brand-assets content. Structure follows 7Span's Brand page: hero band
 * with the mark and an overlapping white card (H1, one line, "Download
 * assets"), Logo and mark (rules + primary lockup box), a black band with
 * four asset tiles, Tagline (graphic box + rules), Founders and team images
 * (the same team cards as /about), closing statement. Rules come from the
 * brand kit README (v1.1) and Nimit's site decision on "Infoloop" in copy.
 */

export type BrandTile = { label: string; sub: string; src: string; dark?: boolean; download: string; kind: "lockup" | "mark" };

export type BrandContent = {
  hero: { h1: string; lede: string; button: { label: string; href: string } };
  logo: { h2: string; paragraphs: string[]; formatsIntro: string; formats: string[]; donts: string[] };
  tiles: BrandTile[];
  tagline: { h2: string; text: [string, string]; paragraph: string; whenH3: string; when: string[]; dontH3: string; donts: string[]; download: string };
  team: { h2: string; lede: string };
  closing: { statement: string };
  seo: { title: string; description: string; image?: { url: string; alt?: string }; llmSummary?: string; noindex?: boolean };
};

export const BRAND: BrandContent = {
  hero: {
    h1: "Brand assets",
    lede: "Official logos, tagline and team images for representing Infoloop across digital and print media.",
    button: { label: "Download assets", href: "/downloads/infoloop-brand-assets.zip" },
  },
  logo: {
    h2: "Logo and mark: two-tone vs mono",
    paragraphs: [
      "Our logo is the Infoloop mark and the wordmark together. This is the primary way the brand should appear. The mark is the five-bar symbol on its own, with the orange accent always on the second bar. It is a supporting element and must not replace the full logo.",
    ],
    formatsIntro: "Infoloop logos come in two colorways, and each has a purpose.",
    formats: [
      "Two-tone: the default. Websites, social media, presentations, print on white or light backgrounds. Reversed (white wordmark) on ink, charcoal or photography.",
      "Mono: dense contexts only. Single-color print, embossing, engraving and very small sizes.",
    ],
    donts: ["Do not recolor the bars or move the orange accent", "Do not redraw the mark by eye: export from the masters", "Do not stretch, rotate or add effects to the logo"],
  },
  tiles: [
    { label: "Logo", sub: "Light backgrounds", src: "/brand/lockup-horizontal-twotone.png", download: "/brand/lockup-horizontal-twotone.png", kind: "lockup" },
    { label: "Logo", sub: "Dark backgrounds", src: "/brand/lockup-horizontal-reversed.png", dark: true, download: "/brand/lockup-horizontal-reversed.png", kind: "lockup" },
    { label: "Mark", sub: "Light backgrounds", src: "/brand/icon-primary.svg", download: "/brand/icon-primary.svg", kind: "mark" },
    { label: "Mark", sub: "Dark backgrounds", src: "/brand/icon-reversed.svg", dark: true, download: "/brand/icon-reversed.svg", kind: "mark" },
  ],
  tagline: {
    h2: "Tagline",
    text: ["We build.", "We run."],
    paragraph: "The tagline carries the core message of Infoloop and supports the logo. It is not a replacement for it.",
    whenH3: "When to use the tagline",
    when: ["Event creatives and booth graphics", "Campaign visuals and announcements", "Marketing presentations and decks", "Brand-led communication"],
    dontH3: "Do not",
    donts: ["Modify, shorten or rewrite the tagline", "Use the tagline without the Infoloop logo", "Apply effects, animations or custom styling"],
    download: "/brand/tagline/we-build-we-run-light.png",
  },
  team: {
    h2: "Founders and team images",
    lede: "Team images represent the leadership and public face of Infoloop. They are for official, professional use across media and events.",
  },
  closing: {
    statement: "Clear advice where others add complexity. We help businesses build, modernize and run the software they depend on. Whatever your challenge, stage or goal, we build it and we run it.",
  },
  seo: {
    title: "Logos and brand assets | Infoloop",
    description: "Download the official Infoloop logo, mark, tagline and team images, with the short rules for using them across digital and print media.",
  },
};
