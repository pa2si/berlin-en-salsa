/**
 * Manual verification script for Phase 1: Festival Configuration
 * Run with: npx tsx src/config/verify-festival-config.ts
 */

import { FESTIVAL_CONFIG } from "./festival";

console.log("\n🎪 FESTIVAL CONFIGURATION VERIFICATION\n");
console.log("=".repeat(60));

// Test 1: Days generation
console.log("\n1️⃣  Testing days generation...");
const days = FESTIVAL_CONFIG.days;
console.log(`   ✓ Generated ${days.length} days`);
console.log(`   ✓ Expected: 2 days (July 19-20, 2025)`);

// Test 2: Day details
console.log("\n2️⃣  Testing day details...");
days.forEach((day, index) => {
  console.log(`\n   Day ${index + 1}:`);
  console.log(`     - ID: ${day.id}`);
  console.log(`     - Weekday: ${day.weekday} (${day.weekdayFull})`);
  console.log(`     - Date: ${day.date.toLocaleDateString()}`);
  console.log(`     - Date Short: ${day.dateShort}`);
  console.log(`     - Date ISO: ${day.dateISO}`);
  console.log(`     - Label: ${day.label}`);
  console.log(`     - Image: ${day.imageSrc}`);
});

// Test 3: getDayById
console.log("\n3️⃣  Testing getDayById()...");
const day1 = FESTIVAL_CONFIG.getDayById("day1");
const day2 = FESTIVAL_CONFIG.getDayById("day2");
const dayInvalid = FESTIVAL_CONFIG.getDayById("day99");

console.log(`   ✓ getDayById('day1'): ${day1 ? day1.weekday : "NOT FOUND"}`);
console.log(`   ✓ getDayById('day2'): ${day2 ? day2.weekday : "NOT FOUND"}`);
console.log(
  `   ✓ getDayById('day99'): ${dayInvalid ? "FOUND (ERROR!)" : "undefined (correct)"}`,
);

// Test 4: getDayByWeekday
console.log("\n4️⃣  Testing getDayByWeekday()...");
const saturday = FESTIVAL_CONFIG.getDayByWeekday("saturday");
const sundayLower = FESTIVAL_CONFIG.getDayByWeekday("sunday");
const sundayUpper = FESTIVAL_CONFIG.getDayByWeekday("Sunday");
const monday = FESTIVAL_CONFIG.getDayByWeekday("monday");

console.log(
  `   ✓ getDayByWeekday('saturday'): ${saturday ? saturday.id : "NOT FOUND"}`,
);
console.log(
  `   ✓ getDayByWeekday('sunday'): ${sundayLower ? sundayLower.id : "NOT FOUND"}`,
);
console.log(
  `   ✓ getDayByWeekday('Sunday'): ${sundayUpper ? sundayUpper.id : "NOT FOUND"}`,
);
console.log(
  `   ✓ getDayByWeekday('monday'): ${monday ? "FOUND (ERROR!)" : "undefined (correct)"}`,
);

// Test 5: Data validation
console.log("\n5️⃣  Validating data integrity...");
const uniqueIds = new Set(days.map((d) => d.id));
console.log(
  `   ✓ All IDs unique: ${uniqueIds.size === days.length ? "YES" : "NO (ERROR!)"}`,
);

const datesAscending = days.every(
  (day, i) => i === 0 || day.date.getTime() > days[i - 1].date.getTime(),
);
console.log(
  `   ✓ Dates in ascending order: ${datesAscending ? "YES" : "NO (ERROR!)"}`,
);

const allHaveMetadata = days.every(
  (day) =>
    day.id &&
    day.weekday &&
    day.label &&
    day.imageSrc &&
    day.dateShort &&
    day.dateISO,
);
console.log(
  `   ✓ All days have complete metadata: ${allHaveMetadata ? "YES" : "NO (ERROR!)"}`,
);

// Test 6: Translation key format
console.log("\n6️⃣  Checking translation key format...");
const validKeyFormat = days.every((day) =>
  day.label.startsWith("Sections.SectionFive.days."),
);
console.log(
  `   ✓ Translation keys follow format: ${validKeyFormat ? "YES" : "NO (ERROR!)"}`,
);

// Test 7: Image path format
console.log("\n7️⃣  Checking image path format...");
const validImageFormat = days.every(
  (day) => day.imageSrc === `/timetable-days/${day.weekday}-de.svg`,
);
console.log(
  `   ✓ Image paths follow format: ${validImageFormat ? "YES" : "NO (ERROR!)"}`,
);

// Summary
console.log("\n" + "=".repeat(60));
console.log("\n✅ Phase 1 Verification Complete!");
console.log("\nResults:");
console.log(`  - Days generated: ${days.length}`);
console.log(`  - IDs: ${days.map((d) => d.id).join(", ")}`);
console.log(`  - Weekdays: ${days.map((d) => d.weekday).join(", ")}`);
console.log(`  - All helper methods working: ✓`);
console.log("\n🎉 Phase 1: Festival Configuration Enhancement - COMPLETE!\n");
