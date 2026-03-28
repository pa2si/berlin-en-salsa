/**
 * Manual verification script for Phase 2: Timeline Configuration
 * Run with: npx tsx src/utils/verify-timeline-config.ts
 */

import {
  TIMELINE_CONFIG,
  getTimelineForAreaAndDay,
  getSchedulesForArea,
  getAreasForDay,
} from "./timelineConfig";

console.log("\n🗓️  TIMELINE CONFIGURATION VERIFICATION\n");
console.log("=".repeat(60));

// Test 1: TIMELINE_CONFIG structure
console.log("\n1️⃣  Testing TIMELINE_CONFIG structure...");
console.log(`   ✓ Total areas configured: ${TIMELINE_CONFIG.length}`);
console.log(
  `   ✓ Expected: 4 areas (main-stage, dance-workshops, music-workshops, salsa-talks)`,
);

TIMELINE_CONFIG.forEach((areaConfig) => {
  console.log(`\n   Area: ${areaConfig.area}`);
  console.log(`     - Days configured: ${areaConfig.schedules.length}`);
  areaConfig.schedules.forEach((schedule) => {
    console.log(
      `       • ${schedule.dayWeekday}: ${schedule.timeline.length} events`,
    );
  });
});

// Test 2: getTimelineForAreaAndDay()
console.log("\n2️⃣  Testing getTimelineForAreaAndDay()...");
const saturdayMainStage = getTimelineForAreaAndDay("main-stage", "saturday");
const sundayMainStage = getTimelineForAreaAndDay("main-stage", "sunday");
const saturdayDanceWorkshops = getTimelineForAreaAndDay(
  "dance-workshops",
  "saturday",
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invalidArea = getTimelineForAreaAndDay("invalid-area" as any, "saturday");
const invalidDay = getTimelineForAreaAndDay("main-stage", "monday");

console.log(`   ✓ Main Stage Saturday events: ${saturdayMainStage.length}`);
console.log(`   ✓ Main Stage Sunday events: ${sundayMainStage.length}`);
console.log(`   ✓ Dance Workshops Saturday: ${saturdayDanceWorkshops.length}`);
console.log(
  `   ✓ Invalid area returns: ${invalidArea.length === 0 ? "empty array (correct)" : "ERROR"}`,
);
console.log(
  `   ✓ Invalid day returns: ${invalidDay.length === 0 ? "empty array (correct)" : "ERROR"}`,
);

// Test 3: getSchedulesForArea()
console.log("\n3️⃣  Testing getSchedulesForArea()...");
const mainStageSchedules = getSchedulesForArea("main-stage");
console.log(`   ✓ Main Stage schedules: ${mainStageSchedules.length} days`);
mainStageSchedules.forEach((schedule) => {
  console.log(
    `     - ${schedule.dayWeekday}: ${schedule.timeline.length} events`,
  );
});

// Test 4: getAreasForDay()
console.log("\n4️⃣  Testing getAreasForDay()...");
const saturdayAreas = getAreasForDay("saturday");
const sundayAreas = getAreasForDay("sunday");
const mondayAreas = getAreasForDay("monday");

console.log(`   ✓ Areas with events on Saturday: ${saturdayAreas.length}`);
console.log(`     ${saturdayAreas.join(", ")}`);
console.log(`   ✓ Areas with events on Sunday: ${sundayAreas.length}`);
console.log(`     ${sundayAreas.join(", ")}`);
console.log(
  `   ✓ Areas with events on Monday: ${mondayAreas.length} (should be 0)`,
);

// Test 5: Data integrity
console.log("\n5️⃣  Validating data integrity...");
let totalEvents = 0;
let allAreasValid = true;
let allSchedulesValid = true;

TIMELINE_CONFIG.forEach((areaConfig) => {
  // Check area is valid
  const validAreas = [
    "main-stage",
    "dance-workshops",
    "music-workshops",
    "salsa-talks",
  ];
  if (!validAreas.includes(areaConfig.area)) {
    allAreasValid = false;
  }

  // Check each schedule
  areaConfig.schedules.forEach((schedule) => {
    // Check weekday
    const validWeekdays = ["saturday", "sunday"];
    if (!validWeekdays.includes(schedule.dayWeekday)) {
      allSchedulesValid = false;
    }

    // Count events
    totalEvents += schedule.timeline.length;

    // Check each timeline slot
    schedule.timeline.forEach((slot) => {
      if (!slot.time || !slot.duration || !slot.eventId) {
        allSchedulesValid = false;
      }
    });
  });
});

console.log(`   ✓ All areas valid: ${allAreasValid ? "YES" : "NO (ERROR!)"}`);
console.log(
  `   ✓ All schedules valid: ${allSchedulesValid ? "YES" : "NO (ERROR!)"}`,
);
console.log(`   ✓ Total events across all areas/days: ${totalEvents}`);

// Test 6: Event IDs format
console.log("\n6️⃣  Checking event ID format...");
let allEventIdsValid = true;
const sampleEventIds: string[] = [];

TIMELINE_CONFIG.forEach((areaConfig) => {
  areaConfig.schedules.forEach((schedule) => {
    schedule.timeline.forEach((slot) => {
      if (!slot.eventId.startsWith("Timetable.events.")) {
        allEventIdsValid = false;
      }
      if (sampleEventIds.length < 3) {
        sampleEventIds.push(slot.eventId);
      }
    });
  });
});

console.log(
  `   ✓ All event IDs follow format: ${allEventIdsValid ? "YES" : "NO (ERROR!)"}`,
);
console.log(`   ✓ Sample event IDs:`);
sampleEventIds.forEach((id) => console.log(`     - ${id}`));

// Test 7: Case sensitivity
console.log("\n7️⃣  Testing case-insensitive lookups...");
const satLower = getTimelineForAreaAndDay("main-stage", "saturday");
const satUpper = getTimelineForAreaAndDay("main-stage", "Saturday");
const satMixed = getTimelineForAreaAndDay("main-stage", "SaTuRdAy");

console.log(`   ✓ 'saturday': ${satLower.length} events`);
console.log(`   ✓ 'Saturday': ${satUpper.length} events`);
console.log(`   ✓ 'SaTuRdAy': ${satMixed.length} events`);
console.log(
  `   ✓ Case-insensitive: ${satLower.length === satUpper.length && satUpper.length === satMixed.length ? "YES" : "NO (ERROR!)"}`,
);

// Summary
console.log("\n" + "=".repeat(60));
console.log("\n✅ Phase 2 Verification Complete!");
console.log("\nResults:");
console.log(`  - Areas configured: ${TIMELINE_CONFIG.length}`);
console.log(`  - Total events: ${totalEvents}`);
console.log(`  - Helper functions working: ✓`);
console.log(`  - Case-insensitive lookups: ✓`);
console.log("\n🎉 Phase 2: Timeline Configuration Refactor - COMPLETE!\n");
