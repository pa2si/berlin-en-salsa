import { routing } from "@/i18n/routing";

// Extract route types from the routing configuration
type RouteKeys = keyof typeof routing.pathnames;

// Define link types for better type safety
export type FooterLink = {
  href: RouteKeys; // Use dynamic route types from routing.ts
  labelKey: string; // Translation key instead of hardcoded label
  icon?: string;
  isExternal?: boolean;
};

// Define footer links with translation keys - matching original structure
export const footerLinks: FooterLink[] = [
  {
    href: "/privacy", // Use internal route name that matches routing.ts
    labelKey: "privacy",
    isExternal: false,
  },
  {
    href: "/legal",
    labelKey: "legal",
    isExternal: false,
  },
];
