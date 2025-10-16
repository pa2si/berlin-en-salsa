import { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";

// Base URL for absolute URLs
const host = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    // Home page
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          de: host + (await getPathname({ locale: "de", href: "/" })),
          es: host + (await getPathname({ locale: "es", href: "/" })),
        },
      },
    },
    // Timetable page
    {
      url: host + (await getPathname({ locale: "de", href: "/timetable" })),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          de: host + (await getPathname({ locale: "de", href: "/timetable" })),
          es: host + (await getPathname({ locale: "es", href: "/timetable" })),
        },
      },
    },
    // Legal/Impressum page
    {
      url: host + (await getPathname({ locale: "de", href: "/legal" })),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          de: host + (await getPathname({ locale: "de", href: "/legal" })),
          es: host + (await getPathname({ locale: "es", href: "/legal" })),
        },
      },
    },
    // Privacy page
    {
      url: host + (await getPathname({ locale: "de", href: "/privacy" })),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          de: host + (await getPathname({ locale: "de", href: "/privacy" })),
          es: host + (await getPathname({ locale: "es", href: "/privacy" })),
        },
      },
    },
  ];
}
