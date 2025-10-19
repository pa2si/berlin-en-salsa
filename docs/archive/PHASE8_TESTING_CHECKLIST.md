# Phase 8: Testing & Validation Checklist

**Status:** In Progress  
**Date:** October 18, 2025  
**Dev Server:** ✅ Running at http://localhost:3000

## Test Plan Overview

This phase validates the complete multi-day timetable refactoring across all 7 phases.

---

## Test Suite 1: Current 2-Day Setup (July 19-20, 2025)

### 1.1 Festival Configuration ✅

- **Current Config:** Saturday-Sunday (2 days)
- **Start Date:** July 19, 2025 12:30:00
- **End Date:** July 20, 2025 23:59:59

**Expected Results:**

- `FESTIVAL_CONFIG.days` should return 2 FestivalDay objects
- Day 1: `{ id: "day1", weekday: "saturday", dateShort: "Jul 19", imageSrc: "/timetable-days/day1.svg" }`
- Day 2: `{ id: "day2", weekday: "sunday", dateShort: "Jul 20", imageSrc: "/timetable-days/day2.svg" }`

**Test Steps:**

1. Navigate to http://localhost:3000/de/timetable
2. Verify 2 day buttons are displayed
3. Check button labels show "Samstag" and "Sonntag"
4. Check button images load correctly (day1.svg, day2.svg)

**Status:** ⏳ Pending

---

### 1.2 URL Navigation - German Locale

**Test URLs:**

- ✅ http://localhost:3000/de/timetable
- ✅ http://localhost:3000/de/timetable?tag=samstag
- ✅ http://localhost:3000/de/timetable?tag=sonntag

**Expected Results:**

- Default URL should show Saturday (first day)
- `?tag=samstag` should display Saturday events
- `?tag=sonntag` should display Sunday events
- Invalid tags should fall back to first day
- URL parameter should be "tag" (German)

**Status:** ⏳ Pending

---

### 1.3 URL Navigation - Spanish Locale

**Test URLs:**

- ✅ http://localhost:3000/es/timetable
- ✅ http://localhost:3000/es/timetable?dia=sabado
- ✅ http://localhost:3000/es/timetable?dia=domingo

**Expected Results:**

- Default URL should show Saturday (first day)
- `?dia=sabado` should display Saturday events
- `?dia=domingo` should display Sunday events
- Invalid dias should fall back to first day
- URL parameter should be "dia" (Spanish)

**Status:** ⏳ Pending

---

### 1.4 Day Switching Functionality

**Test Steps:**

1. Navigate to http://localhost:3000/de/timetable
2. Click on "Samstag" button
3. Verify URL updates to `?tag=samstag`
4. Verify Saturday events are displayed
5. Click on "Sonntag" button
6. Verify URL updates to `?tag=sonntag`
7. Verify Sunday events are displayed
8. Verify active button styling updates correctly

**Expected Results:**

- URL updates without page reload
- Events update dynamically
- Active button has correct styling
- No console errors

**Status:** ⏳ Pending

---

### 1.5 Event Data - All 4 Areas

**Test Steps:**
For each day (Saturday, Sunday), verify all 4 areas:

1. Main Stage
2. Dance Workshops
3. Music Workshops
4. Salsa Talks

**Expected Results:**

- All areas render with correct headers
- Events display with correct time slots
- Event modals open correctly
- Event data matches TIMELINE_CONFIG
- No missing or duplicate events

**Status:** ⏳ Pending

---

### 1.6 Translations - German

**Test Localization:**

- Navigation: "Zeitplan"
- Days: "Samstag", "Sonntag"
- Areas: Check German translations for all 4 areas
- Event details: Verify German event names/descriptions

**Status:** ⏳ Pending

---

### 1.7 Translations - Spanish

**Test Localization:**

- Navigation: "Horario"
- Days: "Sábado", "Domingo"
- Areas: Check Spanish translations for all 4 areas
- Event details: Verify Spanish event names/descriptions

**Status:** ⏳ Pending

---

## Test Suite 2: 3-Day Setup (Scalability Test)

### 2.1 Configuration Change

**Action:** Modify `/src/config/festival.ts`

```typescript
// Change from:
end: new Date("July 20, 2025 23:59:59"),

// To:
end: new Date("July 21, 2025 23:59:59"),
```

**Expected Result:** System should automatically support 3 days without any code changes

**Status:** ⏳ Pending

---

### 2.2 Dynamic Day Generation

**Expected Results:**

- `FESTIVAL_CONFIG.days` should return 3 FestivalDay objects
- Day 1: Saturday (Jul 19)
- Day 2: Sunday (Jul 20)
- Day 3: Monday (Jul 21)
- All metadata (weekday, imageSrc, labels) should be correct

**Status:** ⏳ Pending

---

### 2.3 URL Navigation - 3 Days (German)

**Test URLs:**

- ✅ http://localhost:3000/de/timetable?tag=samstag
- ✅ http://localhost:3000/de/timetable?tag=sonntag
- ✅ http://localhost:3000/de/timetable?tag=montag

**Expected Results:**

- All 3 URLs should work
- Each shows correct day's events
- Day switching works smoothly

**Status:** ⏳ Pending

---

### 2.4 URL Navigation - 3 Days (Spanish)

**Test URLs:**

- ✅ http://localhost:3000/es/timetable?dia=sabado
- ✅ http://localhost:3000/es/timetable?dia=domingo
- ✅ http://localhost:3000/es/timetable?dia=lunes

**Expected Results:**

- All 3 URLs should work
- Each shows correct day's events
- Day switching works smoothly

**Status:** ⏳ Pending

---

### 2.5 UI Rendering - 3 Day Buttons

**Expected Results:**

- 3 day buttons should render
- Buttons show: "Samstag", "Sonntag", "Montag" (de)
- Buttons show: "Sábado", "Domingo", "Lunes" (es)
- Images: day1.svg, day2.svg, day3.svg
- Active state works for all 3 buttons

**Status:** ⏳ Pending

---

### 2.6 Translations - Monday

**Expected Results:**

- German: "Montag" displays correctly
- Spanish: "Lunes" displays correctly
- Translation key: `Sections.SectionFive.days.monday` resolves

**Status:** ⏳ Pending

---

## Test Suite 3: Edge Cases & Error Handling

### 3.1 Invalid URL Parameters

**Test Cases:**

- `?tag=invalid` (German)
- `?dia=invalid` (Spanish)
- `?tag=` (empty value)
- `?wrongparam=samstag` (wrong parameter name)

**Expected Results:**

- Should fall back to first day (Saturday)
- No console errors
- URL should not break the app

**Status:** ⏳ Pending

---

### 3.2 Direct URL Access

**Test Cases:**

1. Direct navigation to `http://localhost:3000/de/timetable?tag=sonntag`
2. Browser refresh on day-specific URL
3. Share URL and open in new tab

**Expected Results:**

- Correct day should load on first render
- No flash of wrong content
- SSR works correctly

**Status:** ⏳ Pending

---

### 3.3 Browser Navigation

**Test Cases:**

1. Click day button → Browser back button → Forward button
2. Verify browser history works correctly

**Expected Results:**

- Back/forward navigation works
- Correct day displays
- URL state syncs with UI

**Status:** ⏳ Pending

---

## Test Suite 4: Performance & Build

### 4.1 Build Validation

**Command:** `npm run build`

**Expected Results:**

- ✅ Build succeeds with no errors
- ✅ TypeScript compilation succeeds
- ✅ All routes generate correctly
- ✅ No warnings about dynamic imports

**Status:** ✅ Complete (verified in Phase 7)

---

### 4.2 Bundle Size

**Check:**

- Timetable page First Load JS
- Middleware size

**Expected Results:**

- No significant size increase from refactoring
- Code splitting works correctly

**Status:** ⏳ Pending

---

### 4.3 Performance Metrics

**Test:**

1. Page load time
2. Day switching speed
3. Event modal open time

**Expected Results:**

- Fast day switching (no full reload)
- Smooth animations
- No janky UI updates

**Status:** ⏳ Pending

---

## Test Suite 5: Type Safety

### 5.1 TypeScript Validation

**Verify:**

- No `any` types in timetable code
- DayType is properly typed as `string`
- FestivalDay interface is correct
- useURLParams returns correct types

**Status:** ✅ Complete (verified during refactoring)

---

### 5.2 Runtime Type Safety

**Test:**

- Pass invalid day strings to functions
- Verify graceful error handling
- Check console for type errors

**Status:** ⏳ Pending

---

## Test Suite 6: Regression Testing

### 6.1 Other Pages Still Work

**Test URLs:**

- ✅ http://localhost:3000/de
- ✅ http://localhost:3000/es
- ✅ http://localhost:3000/de/legal
- ✅ http://localhost:3000/de/privacy

**Expected Results:**

- All pages load correctly
- No timetable refactoring broke other pages

**Status:** ⏳ Pending

---

### 6.2 Language Switching

**Test:**

1. On timetable page with `?tag=samstag`
2. Switch to Spanish
3. Verify URL becomes `?dia=sabado`
4. Switch back to German
5. Verify URL becomes `?tag=samstag`

**Expected Results:**

- Day parameter updates with locale
- Correct day remains selected
- No data loss

**Status:** ⏳ Pending

---

## Test Results Summary

| Test Suite             | Total Tests | Passed | Failed | Pending |
| ---------------------- | ----------- | ------ | ------ | ------- |
| 1. Current 2-Day Setup | 7           | 0      | 0      | 7       |
| 2. 3-Day Scalability   | 6           | 0      | 0      | 6       |
| 3. Edge Cases          | 3           | 0      | 0      | 3       |
| 4. Performance         | 3           | 1      | 0      | 2       |
| 5. Type Safety         | 2           | 1      | 0      | 1       |
| 6. Regression          | 2           | 0      | 0      | 2       |
| **TOTAL**              | **23**      | **2**  | **0**  | **21**  |

---

## Testing Methodology

1. **Manual Testing:** Browser-based testing of UI and functionality
2. **Visual Inspection:** Verify UI rendering and styling
3. **Console Monitoring:** Check for errors/warnings
4. **Network Tab:** Verify no unnecessary requests
5. **Accessibility:** Basic keyboard navigation check

---

## Next Steps

1. ⏳ Execute Test Suite 1 (Current 2-Day Setup)
2. ⏳ Execute Test Suite 2 (3-Day Scalability Test)
3. ⏳ Execute remaining test suites
4. ⏳ Document all results
5. ⏳ Create final comprehensive documentation

---

**Phase 8 Progress:** 0% → In Progress  
**Ready to start manual testing!** 🧪
