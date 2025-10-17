# Timetable Day Images

This directory contains SVG images for festival day buttons in the timetable interface.

## Naming Convention

Images are named by day number, **NOT** by weekday name:
- `day1.svg` - First day of festival (currently Saturday, July 19, 2025)
- `day2.svg` - Second day of festival (currently Sunday, July 20, 2025)
- `day3.svg` - Third day if festival extends to Monday
- etc.

## Why Day Numbers?

Using day numbers instead of weekday names makes the system scalable:
- ✅ Festival dates can change without renaming files
- ✅ Adding days only requires adding `dayN.svg` files
- ✅ No confusion if festival starts on different weekdays
- ✅ Consistent with `FestivalDay.id` structure (`day1`, `day2`, etc.)

## Current Configuration

**Festival Dates**: July 19-20, 2025  
**Days**: 2  
**Mapping**:
- `day1.svg` → Saturday, July 19
- `day2.svg` → Sunday, July 20

## Adding a Third Day

If the festival extends to Monday (July 21):

1. Update `/src/config/festival.ts`:
   ```typescript
   dates: {
     start: new Date("July 19, 2025 12:30:00"),
     end: new Date("July 21, 2025 23:59:59"), // Changed from July 20 to July 21
   }
   ```

2. Add `day3.svg` to this directory:
   - Option A: Create new Monday-specific image
   - Option B: Copy from Saturday/Sunday and modify
   - Option C: Use generic "Day 3" design

3. The system will automatically:
   - Generate a third FestivalDay with `id: "day3"`, `weekday: "monday"`
   - Load `day3.svg` for the Monday button
   - Fetch Monday's timetable data
   - No code changes needed! 🎉

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
imageSrc: `/timetable-days/day${dayCounter}.svg`
```

This path is used by:
- `TimetableClient` component for day selection buttons
- Dynamic rendering via `festivalDays.map()`

## Future Enhancements

Consider adding:
- `day3.svg`, `day4.svg`, etc. for multi-day festivals
- Localized versions (e.g., `day1-de.svg`, `day1-es.svg`)
- Dark mode variants
- Animated versions for active state
