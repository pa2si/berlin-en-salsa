// Define link types for better type safety
export type FooterLink = {
  href: string;
  label: string;
  icon?: string;
  isExternal?: boolean;
};

// Define footer links
export const footerLinks: FooterLink[] = [
  { href: "/privacidad", label: "Política de Privacidad" },
  { href: "/legal", label: "Aviso Legal" },
  //   {
  //     href: "https://www.paypal.com/pools/c/9gEVZFeS3A",
  //     label: "Donar",
  //     icon: "/paypal.png",
  //     isExternal: true,
  //   },
];
