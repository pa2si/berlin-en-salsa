// Define link types for better type safety
export type FooterLink = {
  href: string;
  label: string;
  icon?: string;
  isExternal?: boolean;
};

// Define German footer links
export const germanFooterLinks: FooterLink[] = [
  { href: "/de/datenschutz", label: "Datenschutz" },
  { href: "/de/impressum", label: "Impressum" },
  //   {
  //     href: "https://www.paypal.com/pools/c/9gEVZFeS3A",
  //     label: "Spende",
  //     icon: "/paypal.png",
  //     isExternal: true,
  //   },
];
