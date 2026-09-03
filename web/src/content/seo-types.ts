/**
 * The seo group every page-like document and global carries (cms/src/fields
 * `seo`). Kept free of imports because the CMS seed compiles these content
 * files too, where the site's "@/..." alias does not resolve.
 *
 * Local content files fill title and description; the CMS may add the social
 * image, an answer-engine summary and the noindex flag.
 */
export type SeoImage = { url: string; alt?: string };

export type PageSeo = {
  title: string;
  description: string;
  image?: SeoImage;
  llmSummary?: string;
  noindex?: boolean;
};
