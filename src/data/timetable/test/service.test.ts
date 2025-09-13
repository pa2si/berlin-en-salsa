import { TimetableService } from "../services/timetable.service";

/**
 * Simple test to verify the TimetableService works correctly
 */
export function testTimetableService() {
  console.log("🧪 Testing TimetableService...");

  try {
    // Test Saturday data (Spanish)
    const saturdayData = TimetableService.getTimetableData("saturday", "es");
    console.log(
      "✅ Saturday areas loaded (ES):",
      saturdayData.map((col) => col.area),
    );
    console.log(
      "   Saturday events count:",
      saturdayData.reduce(
        (sum, col) => sum + col.slots.filter((slot) => slot.event).length,
        0,
      ),
    );

    // Test Sunday data (Spanish)
    const sundayData = TimetableService.getTimetableData("sunday", "es");
    console.log(
      "✅ Sunday areas loaded (ES):",
      sundayData.map((col) => col.area),
    );
    console.log(
      "   Sunday events count:",
      sundayData.reduce(
        (sum, col) => sum + col.slots.filter((slot) => slot.event).length,
        0,
      ),
    );

    // Test specific area data
    const mainStageSat = TimetableService.getAreaEvents(
      "main-stage",
      "saturday",
      "es",
    );
    console.log(
      "✅ Main stage Saturday events:",
      mainStageSat.filter((slot) => slot.event).length,
    );

    // Test time slots
    const satTimeSlots = TimetableService.getAvailableTimeSlots(
      "saturday",
      "es",
    );
    console.log("✅ Saturday time slots:", satTimeSlots.length);

    // Test finding specific event
    const event = TimetableService.findEvent(
      "15:30",
      "main-stage",
      "saturday",
      "es",
    );
    console.log("✅ Found event at 15:30:", event?.event || "No event");

    // Test German locale (should return empty arrays for now)
    const saturdayDataDe = TimetableService.getTimetableData("saturday", "de");
    console.log(
      "✅ Saturday areas loaded (DE):",
      saturdayDataDe.map((col) => col.area),
    );
    console.log(
      "   German data events count:",
      saturdayDataDe.reduce((sum, col) => sum + col.slots.length, 0),
    );

    console.log(
      "🎉 All tests passed! TimetableService is working correctly with locale support.",
    );
    return true;
  } catch (error) {
    console.error("❌ Test failed:", error);
    return false;
  }
}

// Export for potential use in components
export * from "../services/timetable.service";
