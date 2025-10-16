# Internationalized Metadata Implementation Plan

## Summary

Implementing internationalized metadata for all routes using next-intl's `getTranslations` in `generateMetadata` functions.

## Current Status

### ✅ Completed Routes

#### 1. Timetable Page (`/[locale]/timetable/page.tsx`)
- **Status**: ✅ COMPLETED & BUILD TEST PASSED
- **Implementation**: 
  - Added `Metadata.timetable` namespace to message files
  - Implemented `generateMetadata` with `getTranslations`
  - Includes localized title, description, OpenGraph, and Twitter cards
  - Proper canonical URLs and language alternates
  - German: `/programm`
  - Spanish: `/es/programa`

### 🔄 Needs Refactoring (Already has metadata but not fully internationalized)

#### 2. Home Page (`/[locale]/page.tsx`)
- **Current**: Uses `Sections.SectionOne` namespace
- **Status**: Partially internationalized (title & description only)
- **Needs**: OpenGraph titles and full metadata structure

#### 3. Legal Page (`/[locale]/legal/page.tsx`)
- **Current**: Hardcoded strings in `generateMetadata`
- **Status**: NOT internationalized
- **Needs**: Move to translation files with proper namespace

#### 4. Privacy Page (`/[locale]/privacy/page.tsx`)
- **Current**: Uses `Privacy` namespace but only for title/description
- **Status**: Partially internationalized
- **Needs**: Complete OpenGraph metadata in translations

## Implementation Pattern

### Message File Structure
```json
"Metadata": {
  "title": "Main site title",
  "description": "Main site description",
  "openGraph": {
    "title": "OpenGraph title",
    "description": "OpenGraph description"
  },
  "pageName": {
    "title": "Page title",
    "description": "Page description",
    "openGraph": {
      "title": "OpenGraph title",
      "description": "OpenGraph description"
    }
  }
}
```

### generateMetadata Function Pattern
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Metadata.pageName" as const,
  });

  const isGerman = locale === "de";
  const canonicalPath = isGerman ? "/de-path" : "/es/es-path";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        de: `${baseUrl}/de-path`,
        es: `${baseUrl}/es/es-path`,
      },
    },
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Berlin En Salsa Festival",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      images: [`${baseUrl}/twitter-image.png`],
    },
  };
}
```

## Next Steps

### Route Priority Order
1. ✅ **Timetable** - DONE
2. **Legal** - Next (currently hardcoded)
3. **Privacy** - After legal (partially done)
4. **Home** - Last (already partially done)

## Benefits of Internationalized Metadata

### SEO Benefits
- ✅ Proper localized titles and descriptions for each language
- ✅ Correct canonical URLs per locale
- ✅ Language alternates for search engines
- ✅ Localized OpenGraph data for social media sharing
- ✅ Proper Twitter card metadata

### Maintainability
- ✅ All metadata strings in translation files
- ✅ Easy to update without touching code
- ✅ Consistent structure across all pages
- ✅ Type-safe with TypeScript

### User Experience
- ✅ Proper social media previews in user's language
- ✅ Correct page titles in browser tabs
- ✅ Better search engine results in user's language

## Testing

Each route will be tested with:
1. TypeScript compilation
2. Build test (`npm run build`)
3. Verify no errors in the output

## References
- [next-intl Metadata Documentation](https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
