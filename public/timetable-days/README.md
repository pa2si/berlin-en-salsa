# Timetable Day Images

This directory contains SVG images for festival day buttons in the timetable interface.

## Naming Convention

Images are named by weekday plus locale suffix:

- `friday-de.svg`, `friday-es.svg`
- `saturday-de.svg`, `saturday-es.svg`
- `sunday-de.svg`, `sunday-es.svg`

Format:

- `<weekday>-<locale>.svg`
- Weekday is lowercase English (`friday`, `saturday`, `sunday`)
- Locale is currently `de` or `es`

## Current Configuration

**Festival Dates**: July 3-5, 2026  
**Days**: 3  
**Mapping**:

- `friday-<locale>.svg` → Friday
- `saturday-<locale>.svg` → Saturday
- `sunday-<locale>.svg` → Sunday

## Adding or Changing Days

When festival dates change, ensure files exist for every generated weekday and locale.

Example: if Monday is added, create:

- `monday-de.svg`
- `monday-es.svg`

The system will automatically:

- Generate a FestivalDay with `weekday: "monday"`
- Load `/timetable-days/monday-<locale>.svg`
- Fetch Monday timetable data

## Image Requirements

- **Format**: SVG (scalable, sharp on all screens)
- **Dimensions**: Flexible (responsive with CSS)
- **Content**: Day name/number in festival branding style
- **Color**: Should match festival color palette
- **Accessibility**: Include meaningful alt text in component

## Legacy Images

The root `/public` directory still contains:

- `saturday.svg` - Original Saturday button (kept for backward compatibility)
- `sunday.svg` - Original Sunday button (kept for backward compatibility)

These are no longer used by the dynamic system but kept in case of rollback needs.

## Technical Details

Images are referenced in `/src/config/festival.ts`:

```typescript
imageSrc: `/timetable-days/day${dayCounter}.svg`;
```

This path is used by:

- `TimetableClient` component for day selection buttons
- Dynamic rendering via `festivalDays.map()`

## Future Enhancements

Consider adding:

- More weekday assets if the festival expands
- Additional locales beyond `de` and `es`
- Dark mode variants
- Animated versions for active state
