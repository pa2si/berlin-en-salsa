import { Column } from "../../../types/timetable";

/**
 * Process timetable data to identify consecutive slots with the same event
 */
export const processEventContinuation = (
  timetableData: Column[],
  translateColumnArea: (area: string) => string,
  getOriginalAreaKey?: (area: string) => string,
): Column[] => {
  return timetableData.map((column) => {
    // Calculate which slots should be visually merged
    const processedSlots = column.slots.map((slot, idx) => {
      // Check if this slot has the same event as the previous slot
      const prevSlot = idx > 0 ? column.slots[idx - 1] : null;
      const isContinuation = !!(
        prevSlot &&
        prevSlot.event &&
        slot.event === prevSlot.event
      );

      // Mark slot as a continuation if it has the same event as the previous slot
      return {
        ...slot,
        isContinuation,
      };
    });

    return {
      area: translateColumnArea(column.area),
      originalAreaKey: getOriginalAreaKey
        ? getOriginalAreaKey(column.area)
        : column.area,
      slots: processedSlots,
    };
  });
};
