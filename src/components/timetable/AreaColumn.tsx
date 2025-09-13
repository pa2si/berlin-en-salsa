import { motion } from "framer-motion";
import TimeSlot from "./TimeSlot";
import { Column } from "../../types/timetable";
import { SelectedEventDetails } from "./hooks/useEventModal";

interface AreaColumnProps {
  column: Column;
  columnIndex: number;
  onEventClick: (eventKey: string, eventDetails: SelectedEventDetails) => void;
  onSlideReset: () => void;
}

export default function AreaColumn({
  column,
  columnIndex,
  onEventClick,
  onSlideReset,
}: AreaColumnProps) {
  return (
    <motion.div
      key={column.area}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: columnIndex * 0.1 }}
      className="overflow-visible rounded-xl border border-white/20 bg-white/10 px-3 py-4 shadow-lg backdrop-blur-sm"
    >
      <h3 className="text-bes-red mb-3 text-center text-xl font-black tracking-wide uppercase md:text-2xl">
        {column.area}
      </h3>

      <div className="border-lg space-y-1 overflow-visible">
        {column.slots.map((slot, slotIndex) => (
          <TimeSlot
            key={slotIndex}
            slot={slot}
            slotIndex={slotIndex}
            columnSlots={column.slots}
            originalAreaKey={column.originalAreaKey}
            onEventClick={onEventClick}
            onSlideReset={onSlideReset}
          />
        ))}
      </div>
    </motion.div>
  );
}
