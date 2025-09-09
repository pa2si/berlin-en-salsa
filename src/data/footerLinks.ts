// Define link types for better type safety
export type FooterLink = {
  href: string;
  labelKey: string; // Translation key instead of hardcoded label
  icon?: string;
  isExternal?: boolean;
  dynamicHref?: (locale: string) => string; // For locale-specific routes
};

// Define footer links with translation keys - matching original structure
export const footerLinks: FooterLink[] = [
  {
    href: "", // Will be set dynamically
    labelKey: "privacy",
    isExternal: false,
    dynamicHref: (locale) => (locale === "de" ? "/datenschutz" : "/privacidad"),
  },
  {
    href: "/legal",
    labelKey: "legal",
    isExternal: false,
  },
];
