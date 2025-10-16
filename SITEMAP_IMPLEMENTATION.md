# Sitemap Implementation with next-intl

## Summary

Updated the sitemap.ts to follow next-intl best practices for internationalized sitemaps with proper alternate language links for SEO.

## Changes Made

### Before (Issues):
1. ❌ Hardcoded paths instead of using routing configuration
2. ❌ Mixed up routes (Spanish/German paths confused)
3. ❌ No `alternates.languages` for SEO
4. ❌ Duplicate entries
5. ❌ Not using `getPathname` from next-intl

### After (Correct Implementation):

```typescript
import { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";

const host = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
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
    // ... other routes
  ];
}
```

## Key Improvements

### 1. Uses `getPathname` from next-intl
- Automatically respects your routing configuration in `i18n/routing.ts`
- Handles localized pathnames correctly (e.g., `/datenschutz`, `/privacidad`)
- No need to manually construct URLs

### 2. Proper `alternates.languages` for SEO
According to next-intl docs and Google's guidelines, each sitemap entry should include:
```typescript
alternates: {
  languages: {
    de: "https://berlinensalsa.de/impressum",
    es: "https://berlinensalsa.de/es/legal",
  },
}
```

This tells search engines that these pages are translations of each other.

### 3. Respects Routing Configuration
Your routing configuration from `i18n/routing.ts`:
```typescript
pathnames: {
  "/privacy": {
    de: "/datenschutz",
    es: "/privacidad",
  },
  "/legal": {
    de: "/impressum",
    es: "/legal",
  },
  "/timetable": {
    de: "/programm",
    es: "/programa",
  },
}
```

The sitemap now automatically uses these localized paths!

### 4. Function Signature Changed
- Changed from: `export default function sitemap()`
- Changed to: `export default async function sitemap(): Promise<MetadataRoute.Sitemap>`
- Required because `getPathname` is async

## Generated URLs

### Home Page
- **German**: `https://berlinensalsa.de/` (default, no prefix)
- **Spanish**: `https://berlinensalsa.de/es/`

### Timetable Page
- **German**: `https://berlinensalsa.de/programm`
- **Spanish**: `https://berlinensalsa.de/es/programa`

### Legal Page
- **German**: `https://berlinensalsa.de/impressum`
- **Spanish**: `https://berlinensalsa.de/es/legal`

### Privacy Page
- **German**: `https://berlinensalsa.de/datenschutz`
- **Spanish**: `https://berlinensalsa.de/es/privacidad`

## SEO Benefits

### 1. Hreflang Alternative Links
Each URL in the sitemap includes alternate language versions:
```xml
<url>
  <loc>https://berlinensalsa.de/</loc>
  <xhtml:link rel="alternate" hreflang="de" href="https://berlinensalsa.de/"/>
  <xhtml:link rel="alternate" hreflang="es" href="https://berlinensalsa.de/es/"/>
  <lastmod>2025-10-16</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
```

### 2. Search Engine Understanding
- Google, Bing, and other search engines can now understand that:
  - `/` and `/es/` are the same page in different languages
  - `/datenschutz` and `/es/privacidad` are the same page
  - Users should be directed to the appropriate language version

### 3. Prevents Duplicate Content Issues
- Search engines won't penalize you for duplicate content
- They understand these are translations, not duplicates

## Testing

### Build Test
✅ Build completed successfully with no errors

### Verification
You can verify the sitemap by:
1. Running the dev server: `npm run dev`
2. Opening: `http://localhost:3000/sitemap.xml`
3. Or in production: `https://berlinensalsa.de/sitemap.xml`

## References

- [next-intl Sitemap Documentation](https://next-intl.dev/docs/environments/actions-metadata-route-handlers#sitemap)
- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google's Multilingual Sitemap Guidelines](https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap)

## Next Steps

After deploying, submit the sitemap to:
1. Google Search Console
2. Bing Webmaster Tools

This will help search engines discover and index all your localized pages correctly.
