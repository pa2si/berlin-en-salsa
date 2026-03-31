# Timetable Link Preview Images

This directory contains preview images for the festival program links displayed in Section 5 of the homepage.

## Naming Convention

Images are named by weekday + locale + screenshot suffix:

- `friday-de-screenshot.png`, `friday-es-screenshot.png`
- `saturday-de-screenshot.png`, `saturday-es-screenshot.png`
- `sunday-de-screenshot.png`, `sunday-es-screenshot.png`

Format:

- `<weekday>-<locale>-screenshot.png`
- Weekday is lowercase English (`friday`, `saturday`, `sunday`)
- Locale is currently `de` or `es`

## Current Configuration

**Festival Dates**: July 3-5, 2026  
**Days**: 3  
**Mapping**:

- `friday-<locale>-screenshot.png` → Friday
- `saturday-<locale>-screenshot.png` → Saturday
- `sunday-<locale>-screenshot.png` → Sunday

## Image Specifications

- **Format**: PNG (with transparency support if needed)
- **Recommended Size**: 600-800px width for optimal quality
- **Aspect Ratio**: Maintain consistent aspect ratio across all day images
- **Content**: Preview/screenshot of the timetable for that specific day

## Responsive Design Considerations

**For 1-2 days (current festival):**

- Mobile (< 768px): Tab navigation + single image preview
- Tablet/Desktop (≥ 768px): Side-by-side grid layout
  - 2 columns for 2 days - efficient use of space

**For 3+ days (future scalability):**

- Mobile, Tablet & Desktop (< 1280px): Tab navigation + single image preview
  - Prevents cramped 3-column layouts
  - Better focus on individual day programs
  - Includes laptops and standard monitors
  - **Mobile (< 640px)**: Full-width images for maximum impact
  - **Tablet+ (≥ 640px)**: Images constrained to 70% width for better proportions
- Large Desktop (≥ 1280px): Multi-column grid layout
  - 3 days: 3 columns
  - 4+ days: 3 columns (xl) → 4 columns (2xl: 1536px+)

This hybrid approach ensures optimal viewing for the current 2-day festival while preventing cramped layouts if the festival expands to 3+ days.

## Adding or Changing Days

When festival dates change, ensure each generated weekday has both locale screenshots.

Example: if Monday is added, create:

- `monday-de-screenshot.png`
- `monday-es-screenshot.png`

## How It Works

The `SectionFive.tsx` component:

1. Imports `FESTIVAL_CONFIG` from `/src/config/festival.ts`
2. Reads `FESTIVAL_CONFIG.days` array
3. Dynamically generates a link card for each day
4. Uses the day number for the image path: `/timetable-links/day${n}.png`
5. Uses the weekday name for routing: `/timetable?day=${weekday}`
6. Adapts the grid layout based on the number of days
7. Selects preview image by weekday and active locale

## Migration Notes

Previously day-numbered images were replaced by weekday + locale screenshot files.

The old images in the root `/public/` directory can be removed after migration is verified.
