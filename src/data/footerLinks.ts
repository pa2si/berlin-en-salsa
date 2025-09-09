// Define link types for better type safety
export type FooterLink = {
  href: string;
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
