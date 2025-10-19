# Timetable Availability Feature Implementation

## Overview

This implementation adds a feature flag to control the visibility of the festival timetable throughout the website. When the timetable is not ready, SectionFive is hidden from the home page, and direct navigation to the timetable route shows a user-friendly "Coming Soon" modal.

## Files Modified

### 1. Configuration: `src/config/festival.ts`

Added a new `timetable` configuration object:

```typescript
timetable: {
  isAvailable: false, // Change to true when timetable is ready
}
```

**To enable the timetable**, simply change this value to `true`.

### 2. Translations: `messages/es.json` and `messages/de.json`

Added internationalized messages under `Sections.SectionFive.comingSoon`:

**Spanish (es.json):**

```json
"comingSoon": {
  "title": "Programa Próximamente",
  "message": "Estamos trabajando en el programa del festival. ¡Vuelve pronto para ver todos los detalles!",
  "button": "Volver al Inicio"
}
```

**German (de.json):**

```json
"comingSoon": {
  "title": "Programm Demnächst",
  "message": "Wir arbeiten am Festivalprogramm. Schaue bald wieder vorbei für alle Details!",
  "button": "Zurück zur Startseite"
}
```

### 3. New Component: `src/components/TimetableComingSoon.tsx`

A reusable, full-screen modal component that:

- Displays a centered message with the festival logo
- Shows internationalized title, message, and button text
- Provides smooth animations using Framer Motion
- Links back to the home page using the i18n-aware Link component

### 4. Section Five: `src/app/[locale]/sections/SectionFive.tsx`

Modified to check `FESTIVAL_CONFIG.timetable.isAvailable`:

- If `false`, returns `null` (section doesn't render at all)
- If `true`, renders normally with all timetable preview functionality
- Hooks are called before the conditional check to comply with React rules

### 5. Timetable Page: `src/app/[locale]/(content)/timetable/page.tsx`

Updated to show the coming soon modal when accessed directly:

- Checks `FESTIVAL_CONFIG.timetable.isAvailable`
- If `false`, shows `TimetableComingSoon` component with localized messages
- If `true`, renders the full timetable page as normal

### 6. Banner Components: `src/components/banners/CountdownBanner.tsx` and `LiveBanner.tsx`

Updated to conditionally show the "View Program" button:

- Only renders the program/timetable button when `FESTIVAL_CONFIG.timetable.isAvailable` is `true`
- Prevents users from seeing a link to a timetable that isn't ready yet
- Maintains clean banner UI during the pre-launch phase

## How to Use

### During Development (Timetable Not Ready)

Keep the configuration as:

```typescript
timetable: {
  isAvailable: false,
}
```

**Behavior:**

- ✅ SectionFive is completely hidden on the home page
- ✅ Banner "View Program" buttons are hidden
- ✅ Direct navigation to `/programa` or `/es/programa` shows the coming soon modal
- ✅ Users see a professional, friendly message instead of broken/empty content

### When Timetable is Ready

Simply change the configuration to:

```typescript
timetable: {
  isAvailable: true,
}
```

**Behavior:**

- ✅ SectionFive appears on the home page with timetable previews
- ✅ Banner "View Program" buttons are visible and functional
- ✅ Timetable page works normally when accessed directly
- ✅ All timetable functionality is enabled

## Benefits

1. **Single Source of Truth**: One config flag controls the entire feature
2. **Type-Safe**: Uses existing TypeScript configuration
3. **Internationalized**: Messages are properly translated for both ES and DE
4. **User-Friendly**: Professional coming soon screen instead of errors
5. **Easy Toggle**: Change one boolean to enable/disable the feature
6. **Clean Code**: Components simply don't render when not needed
7. **SEO Safe**: No broken links or 404 errors

## Testing

To test both states:

1. Set `isAvailable: false` and verify:

   - Home page has no SectionFive
   - Banner buttons don't show "View Program" link
   - Direct URL shows coming soon modal

2. Set `isAvailable: true` and verify:
   - Home page shows SectionFive with previews
   - Banner buttons show "View Program" link
   - Timetable page works normally
