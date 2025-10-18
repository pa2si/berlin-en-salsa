# Timetable Link Preview Images

This directory contains preview images for the festival program links displayed in Section 5 of the homepage.

## Naming Convention

Images are named by day number, **NOT** by weekday name:

- `day1.png` - First day of festival (currently Saturday, July 19, 2025)
- `day2.png` - Second day of festival (currently Sunday, July 20, 2025)
- `day3.png` - Third day if festival extends to Monday
- etc.

## Why Day Numbers?

Using day numbers instead of weekday names makes the system scalable and consistent with the overall festival architecture:

- ✅ Festival dates can change without renaming files
- ✅ Adding days only requires adding `dayN.png` files
- ✅ No confusion if festival starts on different weekdays
- ✅ Consistent with `FestivalDay.id` structure (`day1`, `day2`, etc.)
- ✅ Matches the pattern used in `/timetable-days/` for day selection buttons

## Current Configuration

**Festival Dates**: July 19-20, 2025  
**Days**: 2  
**Mapping**:

- `day1.png` → Saturday, July 19
- `day2.png` → Sunday, July 20

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

## Adding a Third Day

If the festival extends to Monday (July 21):

1. Update `/src/config/festival.ts`:

   ```typescript
   dates: {
     start: new Date("July 19, 2025 12:30:00"),
     end: new Date("July 21, 2025 23:59:59"), // Changed from July 20 to July 21
   }
   ```

2. Add `day3.png` to this directory:

   - Create a preview image of Monday's timetable
   - Maintain the same dimensions and style as day1.png and day2.png
   - Save as `day3.png`

3. The system will automatically:
   - Display the third day in Section 5
   - Adjust the grid layout to accommodate 3 days
   - Generate the correct link to `/timetable?day=monday`
   - Use the translated day name from the i18n files

## How It Works

The `SectionFive.tsx` component:

1. Imports `FESTIVAL_CONFIG` from `/src/config/festival.ts`
2. Reads `FESTIVAL_CONFIG.days` array
3. Dynamically generates a link card for each day
4. Uses the day number for the image path: `/timetable-links/day${n}.png`
5. Uses the weekday name for routing: `/timetable?day=${weekday}`
6. Adapts the grid layout based on the number of days

## Migration Notes

Previously hardcoded images:

- `timetable-saturday.png` → Moved to `day1.png`
- `timetable-sunday.png` → Moved to `day2.png`

The old images in the root `/public/` directory can be removed after migration is verified.
