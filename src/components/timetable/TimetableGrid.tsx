import { motion, AnimatePresence } from "framer-motion";
import AreaColumn from "./AreaColumn";
import { Column } from "../../types/timetable";
import { SelectedEventDetails } from "./hooks/useEventModal";

interface TimetableGridProps {
  currentDay: "saturday" | "sunday";
  timetableData: Column[];
  onEventClick: (eventKey: string, eventDetails: SelectedEventDetails) => void;
  onSlideReset: () => void;
}

export default function TimetableGrid({
  currentDay,
  timetableData,
  onEventClick,
  onSlideReset,
}: TimetableGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentDay}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {timetableData.map((column, columnIndex) => (
          <AreaColumn
            key={column.area}
            column={column}
            columnIndex={columnIndex}
            onEventClick={onEventClick}
            onSlideReset={onSlideReset}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
