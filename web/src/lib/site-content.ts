/**
 * Site-wide content shape and its local defaults. Kept separate from the
 * fetch code in cms.ts so client islands (Nav) can import the defaults
 * without pulling build-time fetch logic into the browser bundle.
 */
import * as SITEDATA from "@/content/site";

export type SiteContent = {
  site: typeof SITEDATA.SITE;
  services: typeof SITEDATA.SERVICES;
  industries: typeof SITEDATA.INDUSTRIES;
  hire: typeof SITEDATA.HIRE;
  products: typeof SITEDATA.PRODUCT_LINKS;
  company: typeof SITEDATA.COMPANY_LINKS;
  offices: typeof SITEDATA.OFFICES;
  social: typeof SITEDATA.SOCIAL;
  ratings: typeof SITEDATA.RATINGS;
};

export const LOCAL_SITE: SiteContent = {
  site: SITEDATA.SITE,
  services: SITEDATA.SERVICES,
  industries: SITEDATA.INDUSTRIES,
  hire: SITEDATA.HIRE,
  products: SITEDATA.PRODUCT_LINKS,
  company: SITEDATA.COMPANY_LINKS,
  offices: SITEDATA.OFFICES,
  social: SITEDATA.SOCIAL,
  ratings: SITEDATA.RATINGS,
};
