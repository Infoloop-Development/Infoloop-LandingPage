/**
 * Local fallback for the chatbot feature catalog when Payload is unset/unreachable.
 * CMS collection `chat-features` overrides this at runtime when PAYLOAD_URL is set.
 */

export type FeatureComplexity = "simple" | "medium" | "complex";
export type FeaturePlatform = "web" | "mobile" | "backend";

export type ChatFeature = {
  key: string;
  name: string;
  description: string;
  complexity: FeatureComplexity;
  platforms: FeaturePlatform[];
  tags?: string[];
};

export const LOCAL_CHAT_FEATURES: ChatFeature[] = [
  {
    key: "user-auth",
    name: "User accounts and login",
    description: "Email/password or social sign-in, sessions, password reset.",
    complexity: "medium",
    platforms: ["web", "mobile", "backend"],
    tags: ["general", "saas", "ecommerce"],
  },
  {
    key: "product-catalog",
    name: "Product catalog and search",
    description: "Browse, filter, and search listings with categories.",
    complexity: "medium",
    platforms: ["web", "mobile", "backend"],
    tags: ["ecommerce", "marketplace"],
  },
  {
    key: "shopping-cart-checkout",
    name: "Cart and checkout",
    description: "Add to cart, address, order review, and order confirmation.",
    complexity: "complex",
    platforms: ["web", "mobile", "backend"],
    tags: ["ecommerce"],
  },
  {
    key: "payments",
    name: "Payment gateway",
    description: "Card or wallet payments with webhooks and receipts.",
    complexity: "complex",
    platforms: ["web", "mobile", "backend"],
    tags: ["payments", "ecommerce", "saas"],
  },
  {
    key: "order-tracking",
    name: "Orders and tracking",
    description: "Order history, status updates, and basic shipment tracking.",
    complexity: "medium",
    platforms: ["web", "mobile", "backend"],
    tags: ["ecommerce"],
  },
  {
    key: "admin-dashboard",
    name: "Admin dashboard",
    description: "Staff UI to manage users, catalog, and orders.",
    complexity: "complex",
    platforms: ["web", "backend"],
    tags: ["admin", "ecommerce", "saas"],
  },
  {
    key: "push-notifications",
    name: "Push notifications",
    description: "Mobile push for orders, reminders, or engagement.",
    complexity: "medium",
    platforms: ["mobile", "backend"],
    tags: ["general", "ecommerce", "booking"],
  },
  {
    key: "booking-calendar",
    name: "Booking and calendar",
    description: "Availability, appointments, and confirmations.",
    complexity: "complex",
    platforms: ["web", "mobile", "backend"],
    tags: ["booking"],
  },
  {
    key: "messaging",
    name: "In-app messaging",
    description: "Chat or threads between users or with support.",
    complexity: "complex",
    platforms: ["web", "mobile", "backend"],
    tags: ["social", "marketplace"],
  },
  {
    key: "profiles-social",
    name: "Profiles and social feed",
    description: "User profiles, follows, and a basic activity feed.",
    complexity: "complex",
    platforms: ["web", "mobile", "backend"],
    tags: ["social"],
  },
  {
    key: "file-uploads",
    name: "Media uploads",
    description: "Image or document upload with storage and CDN delivery.",
    complexity: "medium",
    platforms: ["web", "mobile", "backend"],
    tags: ["general", "saas"],
  },
  {
    key: "analytics-basic",
    name: "Basic analytics",
    description: "Dashboards for key usage or sales metrics.",
    complexity: "medium",
    platforms: ["web", "backend"],
    tags: ["saas", "admin"],
  },
  {
    key: "ai-assistant",
    name: "AI assistant features",
    description: "LLM-backed recommendations, search, or support replies.",
    complexity: "complex",
    platforms: ["web", "mobile", "backend"],
    tags: ["ai", "saas"],
  },
  {
    key: "multi-vendor",
    name: "Multi-vendor marketplace",
    description: "Seller onboarding, catalog ownership, and payouts basics.",
    complexity: "complex",
    platforms: ["web", "mobile", "backend"],
    tags: ["marketplace"],
  },
  {
    key: "cms-content",
    name: "CMS-driven content pages",
    description: "Editable landing and content pages for marketing.",
    complexity: "simple",
    platforms: ["web", "backend"],
    tags: ["general"],
  },
  {
    key: "api-integrations",
    name: "Third-party API integrations",
    description: "Connect shipping, CRM, email, or other external APIs.",
    complexity: "medium",
    platforms: ["backend"],
    tags: ["general", "saas", "ecommerce"],
  },
];
